# CaretCoders - Cloudflare Worker Decap CMS OAuth Gateway

This directory contains the production-ready serverless OAuth gateway for CaretCoders administrator authentication on GitHub Pages.

---

## Architecture Overview

```
[Administrator at caretcoders.com/admin/]
                  │
                  ▼ (Popup)
      [Cloudflare Worker /auth]
                  │
                  ▼ (302 Redirect)
        [GitHub Authorization]
                  │
                  ▼ (Redirect /callback)
     [Cloudflare Worker /callback]
       ├─ Exchange code for access_token with GITHUB_CLIENT_SECRET
       ├─ Fetch GitHub user profile (GET https://api.github.com/user)
       ├─ Verify user.login in ADMIN_USERNAMES whitelist
       └─ If Authorized: postMessage token to Decap CMS
          If Unauthorized: 403 Forbidden (No token returned)
```

---

## Step-by-Step Deployment Instructions

### 1. Register a GitHub OAuth App
1. Go to your GitHub account: **Settings** > **Developer settings** > **OAuth Apps** > **New OAuth App**
   (Direct link: `https://github.com/settings/applications/new`)
2. Fill in the application details:
   - **Application name**: `CaretCoders CMS Gateway`
   - **Homepage URL**: `https://caretcoders.com`
   - **Authorization callback URL**:
     `https://<your-worker-subdomain>.workers.dev/callback`
     *(or `https://auth.caretcoders.com/callback` if using a custom domain)*
3. Click **Register application**.
4. Generate and copy your **Client ID** and **Client Secret**.

---

### 2. Deploy to Cloudflare Workers

#### Option A: Using Wrangler CLI (Recommended)
From this directory (`/oauth-backend`):
```bash
# 1. Install Wrangler if needed
npm install -g wrangler

# 2. Authenticate with Cloudflare
wrangler login

# 3. Set encrypted secrets
wrangler secret put GITHUB_CLIENT_ID
# (Paste your GitHub OAuth Client ID)

wrangler secret put GITHUB_CLIENT_SECRET
# (Paste your GitHub OAuth Client Secret)

wrangler secret put ADMIN_USERNAMES
# (Type comma-separated authorized GitHub usernames, e.g.: caretcoders,yourusername)

# 4. Deploy worker to the edge
wrangler deploy
```

#### Option B: Using Cloudflare Dashboard (No CLI needed)
1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Create Worker**.
3. Name it `caretcoders-oauth-gateway` and click **Deploy**.
4. Click **Quick Edit**, paste the contents of `worker.ts` into the editor, and click **Save and Deploy**.
5. Go to **Settings** > **Variables and Secrets** > **Add Secret**:
   - `GITHUB_CLIENT_ID`: Your GitHub OAuth App Client ID
   - `GITHUB_CLIENT_SECRET`: Your GitHub OAuth App Client Secret
   - `ADMIN_USERNAMES`: Comma-separated list of authorized logins (e.g. `caretcoders`)
6. Copy your Worker URL (e.g. `https://caretcoders-oauth-gateway.<subdomain>.workers.dev`).

---

### 3. Connect Decap CMS to your Worker

In `/public/admin/config.yml` (and in the `/admin` Gateway Settings tray):
Update `base_url` to match your deployed Cloudflare Worker URL:
```yaml
backend:
  name: github
  repo: CaretCoders/CaretCoders-Website
  branch: main
  base_url: https://<your-worker-subdomain>.workers.dev # or https://auth.caretcoders.com
  auth_endpoint: auth
```

---

## Security Verification

1. **Whitelisting**: Only accounts listed in `ADMIN_USERNAMES` will receive an authorization handshake. Unauthorized users will see `Access Denied: GitHub account @username is not on the authorized CaretCoders administrator whitelist`.
2. **Zero Client Secrets**: `GITHUB_CLIENT_SECRET` is kept exclusively within Cloudflare encrypted environment secrets and is never transmitted to the browser or committed to git.
3. **Least Privilege**: The OAuth scope is limited to `repo` permissions required to push content updates to `CaretCoders/CaretCoders-Website`.
