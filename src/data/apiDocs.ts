import { ApiEndpoint, ChangelogItem } from '../types';

export const apiEndpointsData: ApiEndpoint[] = [
  // Getting Started & Auth
  {
    id: 'auth-generate',
    method: 'POST',
    path: '/v1/auth/keys',
    title: 'Generate Production API Key',
    description: 'Generates a scoped JWT Bearer key for authenticating requests across CaretCoders API microservices.',
    category: 'Authentication',
    parameters: [
      { name: 'client_id', type: 'string', required: true, desc: 'Your CaretCoders organization client ID' },
      { name: 'scopes', type: 'array', required: true, desc: 'Array of permissions: ["mint:write", "farm:read", "docs:generate"]' }
    ],
    requestBody: `{\n  "client_id": "org_caret_99a81",\n  "scopes": ["mint:write", "farm:read", "docs:generate"]\n}`,
    responseBody: `{\n  "status": "success",\n  "access_token": "cc_live_99f2a0d182e04f9812a4b89001",\n  "token_type": "Bearer",\n  "expires_in": 2592000,\n  "scopes": ["mint:write", "farm:read", "docs:generate"]\n}`,
    curlExample: `curl -X POST https://api.caretcoders.com/v1/auth/keys \\\n  -H "Content-Type: application/json" \\\n  -d '{"client_id": "org_caret_99a81", "scopes": ["mint:write"]}'`
  },

  // DetailMint API
  {
    id: 'detailmint-create-hash',
    method: 'POST',
    path: '/v1/detailmint/assets/anchor',
    title: 'Anchor Asset Provenance Hash',
    description: 'Cryptographically hashes and anchors raw asset payload metadata onto the DetailMint zk-provenance ledger.',
    category: 'DetailMint API',
    parameters: [
      { name: 'asset_id', type: 'string', required: true, desc: 'Unique physical or digital SKU identifier' },
      { name: 'payload_data', type: 'object', required: true, desc: 'Key-value map of asset specifications' },
      { name: 'generate_zk_proof', type: 'boolean', required: false, desc: 'Generate Groth16 zero-knowledge proof (default: true)' }
    ],
    requestBody: `{\n  "asset_id": "SKU_VINTAGE_CHIP_902",\n  "payload_data": {\n    "manufacturer": "CaretCoders Micro",\n    "batch_no": "2026-Q3-098",\n    "purity_pct": 99.98\n  },\n  "generate_zk_proof": true\n}`,
    responseBody: `{\n  "status": "ANCHORED",\n  "asset_id": "SKU_VINTAGE_CHIP_902",\n  "sha256_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",\n  "zk_proof_snark": "0x19a82b09c8112...",\n  "anchor_timestamp": "2026-07-27T11:04:00Z",\n  "latency_ms": 7.4\n}`,
    curlExample: `curl -X POST https://api.caretcoders.com/v1/detailmint/assets/anchor \\\n  -H "Authorization: Bearer cc_live_99f2a0d182e04f9812a4b89001" \\\n  -H "Content-Type: application/json" \\\n  -d '{"asset_id": "SKU_VINTAGE_CHIP_902", "payload_data": {"batch_no": "2026-Q3"}}'`
  },

  // AgriTech Telemetry API
  {
    id: 'farm-node-telemetry',
    method: 'GET',
    path: '/v1/farm/nodes/{node_id}/telemetry',
    title: 'Fetch LoRaWAN Node Telemetry',
    description: 'Retrieves real-time soil pH, nitrogen levels, moisture content, and micro-dosing spray recommendations for a specified IoT sensor node.',
    category: 'AgriTech Telemetry',
    parameters: [
      { name: 'node_id', type: 'string', required: true, desc: 'IoT sensor mesh node ID (e.g. node-alpha-42)' },
      { name: 'timeframe', type: 'string', required: false, desc: 'Time range: 1h, 24h, 7d (default: 24h)' }
    ],
    requestBody: '',
    responseBody: `{\n  "node_id": "node-alpha-42",\n  "solar_battery_v": 3.82,\n  "signal_rssi_dbm": -84,\n  "soil_ph": 6.85,\n  "soil_moisture_pct": 34.2,\n  "nitrogen_npk_ppm": 142.5,\n  "chemical_reduction_savings_pct": 71.2,\n  "ai_recommendation": "MICRO_DOSE_NITROGEN_0.2L_PER_ACRE",\n  "timestamp": "2026-07-27T11:00:00Z"\n}`,
    curlExample: `curl -X GET https://api.caretcoders.com/v1/farm/nodes/node-alpha-42/telemetry \\\n  -H "Authorization: Bearer cc_live_99f2a0d182e04f9812a4b89001"`
  },

  // InkSquirel AI API
  {
    id: 'inksquirel-synthesize',
    method: 'POST',
    path: '/v1/inksquirel/synthesize',
    title: 'Synthesize Repository Documentation',
    description: 'Triggers AST code parsing and Gemini AI documentation synthesis for a Git repository or code snippet.',
    category: 'InkSquirel AI',
    parameters: [
      { name: 'repo_url', type: 'string', required: false, desc: 'GitHub/GitLab repository URL' },
      { name: 'source_code', type: 'string', required: false, desc: 'Direct code string to parse' },
      { name: 'output_format', type: 'string', required: false, desc: 'markdown, openapi_v3, or diagram (default: markdown)' }
    ],
    requestBody: `{\n  "source_code": "export async function getSensorData(id: string) { return await db.query(id); }",\n  "output_format": "markdown"\n}`,
    responseBody: `{\n  "status": "COMPLETED",\n  "markdown_doc": "### \`getSensorData(id: string)\`\\n\\nRetrieves telemetry record matching the provided sensor identifier.\\n\\n- **Parameters**: \`id\` (string) - Unique sensor UUID\\n- **Returns**: Promise<SensorRecord>",\n  "ast_parsed_nodes": 4,\n  "tokens_used": 182\n}`,
    curlExample: `curl -X POST https://api.caretcoders.com/v1/inksquirel/synthesize \\\n  -H "Authorization: Bearer cc_live_99f2a0d182e04f9812a4b89001" \\\n  -H "Content-Type: application/json" \\\n  -d '{"source_code": "function hello() {}", "output_format": "markdown"}'`
  }
];

export const sdkExamples = {
  javascript: `// CaretCoders Official JavaScript / TypeScript SDK
import { CaretCodersClient } from '@caretcoders/sdk';

const client = new CaretCodersClient({
  apiKey: process.env.CARETCODERS_API_KEY
});

// 1. Anchor Asset on DetailMint
const asset = await client.detailmint.anchor({
  assetId: 'SKU_CHIP_902',
  payload: { batch: '2026-Q3' }
});
console.log('DetailMint Hash:', asset.sha256_hash);

// 2. Query Precision Farming IoT Node
const telemetry = await client.farm.getNodeTelemetry('node-alpha-42');
console.log('Soil pH:', telemetry.soil_ph, 'Reduction:', telemetry.chemical_reduction_savings_pct);

// 3. Generate Docs with InkSquirel
const doc = await client.inksquirel.synthesize({
  sourceCode: 'function compute() { return true; }'
});
console.log('Doc Output:\\n', doc.markdown_doc);`,

  python: `# CaretCoders Official Python SDK
from caretcoders import CaretCodersClient
import os

client = CaretCodersClient(api_key=os.getenv("CARETCODERS_API_KEY"))

# 1. DetailMint Provenance
proof = client.detailmint.anchor(
    asset_id="SKU_CHIP_902",
    payload={"batch": "2026-Q3"}
)
print(f"DetailMint Hash: {proof.sha256_hash}")

# 2. AgriTech Telemetry
node = client.farm.get_telemetry(node_id="node-alpha-42")
print(f"Soil Moisture: {node.soil_moisture_pct}%")`,

  go: `// CaretCoders Official Go SDK
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/caretcoders/caretcoders-go"
)

func main() {
	client := caretcoders.NewClient("cc_live_99f2a0d182e04f9812a4b89001")
	
	telemetry, err := client.Farm.GetNodeTelemetry(context.Background(), "node-alpha-42")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Node %s Soil pH: %.2f\\n", telemetry.NodeID, telemetry.SoilPH)
}`,

  rust: `// CaretCoders Official Rust SDK
use caretcoders_sdk::Client;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new(std::env::var("CARETCODERS_API_KEY")?);
    
    let proof = client.detailmint()
        .anchor("SKU_CHIP_902", serde_json::json!({"batch": "2026-Q3"}))
        .await?;
        
    println!("ZK Proof Snark: {:?}", proof.zk_proof_snark);
    Ok(())
}`
};

export const changelogData: ChangelogItem[] = [
  {
    version: 'v2.4.0',
    date: 'July 24, 2026',
    title: 'DetailMint zk-SNARK Acceleration & InkSquirel AST Engine Upgrade',
    changes: [
      { type: 'feature', description: 'DetailMint sub-10ms WebAssembly zk-SNARK Groth16 circuit verifier deployment.' },
      { type: 'improvement', description: 'Upgraded InkSquirel AI engine to Gemini 2.5 Flash for 3x faster documentation synthesis.' },
      { type: 'security', description: 'Implemented OAuth2 PKCE challenge endpoints for mobile client applications.' }
    ]
  },
  {
    version: 'v2.2.1',
    date: 'June 12, 2026',
    title: 'AgriTech LoRaWAN Mesh V2 Protocol Release',
    changes: [
      { type: 'feature', description: 'Added Soil Health Microbiome & NPK Nitrogen Prediction micro-service.' },
      { type: 'improvement', description: 'Reduced LoRaWAN payload packet header overhead by 40% for low-power solar nodes.' },
      { type: 'fix', description: 'Resolved TimescaleDB hypertable query latency spikes during peak sensor bursts.' }
    ]
  },
  {
    version: 'v2.0.0',
    date: 'April 05, 2026',
    title: 'Major Platform Architecture Unification',
    changes: [
      { type: 'feature', description: 'Unified API Gateway consolidating DetailMint, Precision Farming, and InkSquirel endpoints.' },
      { type: 'feature', description: 'Real-time WebSocket telemetry channels for node event streaming.' }
    ]
  }
];
