import { TechItem } from '../types';

export const techStackData: TechItem[] = [
  // Frontend
  {
    name: 'React 19 & Vite',
    category: 'Frontend',
    description: 'Blazing-fast client architecture with React Concurrent features, Server Components support, and Vite ESM bundler.',
    icon: 'Code2',
    logoUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg'
    ],
    proficiencyLevel: 98,
    version: '19.0.1 / 6.2.3',
    sampleCode: `import { useState, useTransition } from 'react';\n\nexport function CyberCounter() {\n  const [count, setCount] = useState(0);\n  const [isPending, startTransition] = useTransition();\n  return (\n    <button onClick={() => startTransition(() => setCount(c => c + 1))}>\n      COUNTER: {count} {isPending && '...'}\n    </button>\n  );\n}`
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    description: 'Strict type safety across full-stack applications with custom generic decorators and zero runtime overhead.',
    icon: 'FileCode',
    logoUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
    ],
    proficiencyLevel: 96,
    version: '5.8.2',
    sampleCode: `type CyberResult<T> = { success: true; data: T } | { success: false; error: string };\n\nasync function fetchNodeState<T>(nodeId: string): Promise<CyberResult<T>> {\n  // Type-safe terminal telemetry\n  return { success: true, data: {} as T };\n}`
  },
  {
    name: 'Tailwind CSS v4 & Motion',
    category: 'Frontend',
    description: 'Utility-first CSS styling paired with hardware-accelerated fluid motion transitions.',
    icon: 'Layout',
    logoUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      'https://cdn.simpleicons.org/framer/0055FF'
    ],
    proficiencyLevel: 95,
    version: '4.1.14 / 12.23',
    sampleCode: `<motion.div \n  initial={{ opacity: 0, y: 12 }} \n  animate={{ opacity: 1, y: 0 }} \n  className="border-2 border-[#E8E8C6] bg-[#252525] p-4 shadow-[4px_4px_0px_#474744]"\n/>`
  },

  // Backend
  {
    name: 'Node.js & Express / TSX',
    category: 'Backend',
    description: 'Scalable event-driven RESTful microservices and WebSockets routing on high-efficiency v8 engines.',
    icon: 'Server',
    logoUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'https://cdn.simpleicons.org/express/ffffff'
    ],
    proficiencyLevel: 95,
    version: '22.14 / 4.21',
    sampleCode: `import express from 'express';\nconst app = express();\n\napp.get('/api/v1/telemetry', (req, res) => {\n  res.json({ status: 'ONLINE', latency: '4ms', nodes: 42 });\n});`
  },
  {
    name: 'Rust & WebAssembly',
    category: 'Backend',
    description: 'Memory-safe low-level systems for ultra-fast cryptographic hashing and WASM client-side computation.',
    icon: 'Cpu',
    logoUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',
      'https://cdn.simpleicons.org/webassembly/654FF0'
    ],
    proficiencyLevel: 90,
    version: '1.82.0',
    sampleCode: `#[wasm_bindgen]\npub fn generate_proof(data: &[u8]) -> Vec<u8> {\n    let mut hasher = blake3::Hasher::new();\n    hasher.update(data);\n    hasher.finalize().as_bytes().to_vec()\n}`
  },
  {
    name: 'Go (Golang)',
    category: 'Backend',
    description: 'Concurrent high-throughput microservices, LoRaWAN IoT packet brokers, and RPC proxy routines.',
    icon: 'Boxes',
    logoUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg'
    ],
    proficiencyLevel: 92,
    version: '1.23',
    sampleCode: `package main\n\nimport "net/http"\n\nfunc main() {\n    http.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {\n        w.Write([]byte("PONG [SYS_OK]"))\n    })\n    http.ListenAndServe(":3000", nil)\n}`
  },

  // Mobile
  {
    name: 'React Native & Expo',
    category: 'Mobile',
    description: 'Cross-platform native iOS & Android applications with native C++ turbomodules and offline Bluetooth syncing.',
    icon: 'Smartphone',
    logoUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'https://cdn.simpleicons.org/expo/ffffff'
    ],
    proficiencyLevel: 90,
    version: '0.76.0',
    sampleCode: `import { View, Text } from 'react-native';\n\nexport default function App() {\n  return (\n    <View style={{ flex: 1, backgroundColor: '#252525', justifyContent: 'center' }}>\n      <Text style={{ color: '#E8E8C6', fontFamily: 'ShareTech' }}>MOBILE TELEMETRY ONLINE</Text>\n    </View>\n  );\n}`
  },
  {
    name: 'Kotlin Multiplatform',
    category: 'Mobile',
    description: 'Shared business logic, database queries, and crypto algorithms across native mobile platforms.',
    icon: 'Layers',
    logoUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg'
    ],
    proficiencyLevel: 88,
    version: '2.0',
    sampleCode: `class SharedRepository {\n    fun fetchSensorLogs(): List<SensorLog> {\n        return database.sensorQueries.selectAll().executeAsList()\n    }\n}`
  },

  // Cloud & DevOps
  {
    name: 'Docker & Kubernetes',
    category: 'Cloud & DevOps',
    description: 'Containerized microservice architecture with auto-scaling cluster orchestration.',
    icon: 'Container',
    logoUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg'
    ],
    proficiencyLevel: 94,
    version: 'v1.30',
    sampleCode: `FROM node:22-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "dist/server.cjs"]`
  },
  {
    name: 'Cloud Run & GCP Infrastructure',
    category: 'Cloud & DevOps',
    description: 'Serverless deployment with instant scale-to-zero, regional edge caching, and isolated containers.',
    icon: 'Cloud',
    logoUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg'
    ],
    proficiencyLevel: 96,
    version: 'GCP Enterprise',
    sampleCode: `gcloud run deploy caretcoders-app \\\n  --image gcr.io/caretcoders/core:v1.4 \\\n  --platform managed \\\n  --region us-central1 \\\n  --allow-unauthenticated`
  },

  // Database
  {
    name: 'PostgreSQL & TimescaleDB',
    category: 'Database',
    description: 'Relational ACID compliance combined with time-series partitioning for high-frequency IoT sensor telemetry.',
    icon: 'Database',
    logoUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
    ],
    proficiencyLevel: 95,
    version: 'PostgreSQL 16',
    sampleCode: `CREATE TABLE sensor_telemetry (\n  time TIMESTAMPTZ NOT NULL,\n  node_id UUID NOT NULL,\n  soil_ph NUMERIC(3,2),\n  moisture_pct NUMERIC(5,2)\n);\nSELECT create_hypertable('sensor_telemetry', 'time');`
  },
  {
    name: 'Redis & Firestore',
    category: 'Database',
    description: 'Sub-millisecond memory caching paired with real-time reactive document synchronization.',
    icon: 'Zap',
    logoUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg'
    ],
    proficiencyLevel: 92,
    version: '7.2 / Firebase v11',
    sampleCode: `import { doc, onSnapshot } from 'firebase/firestore';\n\nonSnapshot(doc(db, 'nodes', 'node-01'), (snapshot) => {\n  console.log('Realtime Node Telemetry:', snapshot.data());\n});`
  },

  // AI & Automation
  {
    name: 'Gemini 2.5 & @google/genai SDK',
    category: 'AI & Automation',
    description: 'Server-side Generative AI integration for intelligent agent workflows, natural language code parsing, and structured JSON synthesis.',
    icon: 'Bot',
    logoUrls: [
      'https://cdn.simpleicons.org/googlegemini/8E75B2'
    ],
    proficiencyLevel: 98,
    version: '2.4.0',
    sampleCode: `import { GoogleGenAI } from '@google/genai';\nconst ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });\n\nconst response = await ai.models.generateContent({\n  model: 'gemini-2.5-flash',\n  contents: 'Analyze codebase AST for optimization vectors.'\n});`
  },
  {
    name: 'PyTorch & LangChain',
    category: 'AI & Automation',
    description: 'Deep neural network training for Agricultural imagery classification and multi-agent AI orchestration.',
    icon: 'BrainCircuit',
    logoUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
      'https://cdn.simpleicons.org/langchain/ffffff'
    ],
    proficiencyLevel: 90,
    version: '2.5 / 0.3',
    sampleCode: `import torch\nimport torch.nn as nn\n\nclass CropHealthClassifier(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.conv = nn.Conv2d(3, 32, kernel_size=3)\n    def forward(self, x):\n        return self.conv(x)`
  }
];
