/**
 * CaretCoders - Cloudflare Worker Decap CMS OAuth Gateway
 * 
 * Provides secure server-side GitHub OAuth 2.0 authentication for Decap CMS
 * on GitHub Pages (caretcoders.com/admin/) with strict identity whitelist enforcement.
 */

export interface Env {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  ADMIN_USERNAMES: string; // Comma-separated list of authorized GitHub logins (e.g. "caretcoders,username2")
  ALLOWED_ORIGINS?: string; // Comma-separated allowed origins (e.g. "https://caretcoders.com,http://localhost:3000")
}

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_API = 'https://api.github.com/user';

function corsHeaders(origin: string = '*'): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY'
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '*';

    // Handle OPTIONS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    // Health Check Endpoint
    if (url.pathname === '/' || url.pathname === '/health') {
      return new Response(
        JSON.stringify({
          status: 'online',
          service: 'CaretCoders Decap CMS OAuth Gateway',
          version: '1.0.0',
          timestamp: new Date().toISOString()
        }),
        {
          headers: {
            ...corsHeaders(origin),
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Step 1: Initiate OAuth (/auth)
    if (url.pathname === '/auth') {
      if (!env.GITHUB_CLIENT_ID) {
        return new Response('Server Configuration Error: GITHUB_CLIENT_ID is not configured.', {
          status: 500,
          headers: corsHeaders(origin)
        });
      }

      // Generate random anti-CSRF state token
      const state = crypto.randomUUID();
      const redirectUri = `${url.origin}/callback`;

      const authParams = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        redirect_uri: redirectUri,
        scope: 'repo',
        state: state
      });

      // Redirect browser to GitHub authorization screen
      return Response.redirect(`${GITHUB_AUTH_URL}?${authParams.toString()}`, 302);
    }

    // Step 2: Handle GitHub OAuth Callback (/callback)
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');

      if (!code) {
        const error = url.searchParams.get('error_description') || 'Authorization was cancelled or rejected by user.';
        return renderErrorResponse(error);
      }

      if (!env.GITHUB_CLIENT_SECRET || !env.GITHUB_CLIENT_ID) {
        return renderErrorResponse('Server Configuration Error: OAuth credentials missing in Worker secrets.');
      }

      try {
        // Exchange authorization code for GitHub access token
        const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'CaretCoders-OAuth-Gateway'
          },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code: code,
            redirect_uri: `${url.origin}/callback`
          })
        });

        const tokenData = (await tokenResponse.json()) as {
          access_token?: string;
          error?: string;
          error_description?: string;
        };

        if (tokenData.error || !tokenData.access_token) {
          const detail = tokenData.error_description || tokenData.error || 'Failed to exchange authorization code.';
          return renderErrorResponse(`GitHub token exchange failed: ${detail}`);
        }

        const accessToken = tokenData.access_token;

        // Step 3: IDENTITY VALIDATION & SECURITY WHITELIST CHECK
        // Fetch authenticated user profile from GitHub API
        const userResponse = await fetch(GITHUB_USER_API, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'User-Agent': 'CaretCoders-OAuth-Gateway',
            'Accept': 'application/vnd.github.v3+json'
          }
        });

        if (!userResponse.ok) {
          return renderErrorResponse('Failed to verify GitHub user profile.');
        }

        const userData = (await userResponse.json()) as { login: string; id: number };
        const authenticatedUsername = (userData.login || '').trim().toLowerCase();

        // Enforce administrator whitelist
        const rawWhitelist = env.ADMIN_USERNAMES || 'caretcoders';
        const whitelistedUsers = rawWhitelist
          .split(',')
          .map(u => u.trim().toLowerCase())
          .filter(Boolean);

        const isAuthorized = whitelistedUsers.includes(authenticatedUsername);

        if (!isAuthorized) {
          // Reject unauthorized user immediately
          return renderErrorResponse(
            `Access Denied: GitHub account @${userData.login} is not on the authorized CaretCoders administrator whitelist.`
          );
        }

        // Step 4: Transmit authorized postMessage handshake to Decap CMS
        return renderSuccessResponse(accessToken, userData.login);
      } catch (err: any) {
        return renderErrorResponse(`Internal server error during authentication: ${err.message || 'Unknown error'}`);
      }
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders(origin) });
  }
};

/**
 * Renders Decap CMS / Netlify CMS postMessage success HTML payload
 */
function renderSuccessResponse(token: string, username: string): Response {
  const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Authentication Approved | CaretCoders</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #EBEFEE;
      color: #4A413C;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      text-align: center;
      padding: 24px;
    }
    .card {
      background: #FFFFFF;
      border: 1px solid #DED8D0;
      border-radius: 8px;
      padding: 28px;
      max-width: 400px;
      box-shadow: 0 4px 12px rgba(74, 65, 60, 0.05);
    }
    .check {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #E8F5E9;
      color: #2E7D32;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-size: 20px;
      font-weight: bold;
    }
    h2 { font-size: 18px; margin-bottom: 8px; }
    p { font-size: 13px; color: #746860; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="check">&#10003;</div>
    <h2>Identity Verified</h2>
    <p>Logged in as <strong>@${escapeHtml(username)}</strong>.</p>
    <p>Transmitting session to Decap CMS dashboard...</p>
  </div>
  <script>
    (function() {
      function receiveMessage(e) {
        window.opener.postMessage(
          'authorization:github:success:' + JSON.stringify({
            token: ${JSON.stringify(token)},
            provider: 'github'
          }),
          e.origin
        );
        window.removeEventListener("message", receiveMessage, false);
        window.close();
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script>
</body>
</html>`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}

/**
 * Renders Decap CMS error response payload
 */
function renderErrorResponse(errorMessage: string): Response {
  const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Access Denied | CaretCoders</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #EBEFEE;
      color: #4A413C;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      text-align: center;
      padding: 24px;
    }
    .card {
      background: #FFFFFF;
      border: 1px solid #DED8D0;
      border-radius: 8px;
      padding: 28px;
      max-width: 440px;
      box-shadow: 0 4px 12px rgba(74, 65, 60, 0.05);
    }
    .icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #FDF2F0;
      color: #9E2A2B;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-size: 20px;
      font-weight: bold;
    }
    h2 { font-size: 18px; margin-bottom: 8px; color: #9E2A2B; }
    p { font-size: 13px; color: #746860; line-height: 1.5; margin-bottom: 16px; }
    .btn {
      display: inline-block;
      padding: 8px 16px;
      background: #4A413C;
      color: #FFFFFF;
      text-decoration: none;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">&#10005;</div>
    <h2>Authentication Error</h2>
    <p>${escapeHtml(errorMessage)}</p>
    <button class="btn" onclick="window.close()">Close Window</button>
  </div>
  <script>
    (function() {
      if (window.opener) {
        window.opener.postMessage('authorization:github:error:' + ${JSON.stringify(errorMessage)}, '*');
      }
    })();
  </script>
</body>
</html>`;

  return new Response(content, {
    status: 403,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
