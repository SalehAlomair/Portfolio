export const featuredProjects = [
  {
    slug: "baseerah",
    name: "Baseerah",
    subtitle: "Multi-agent research platform",
    description:
      "Tuwaiq Academy team capstone. Discovers research gaps and verifies them against newer literature.",
    overview:
      "A team-built platform combining bilingual AI content with research-gap discovery. The research pipeline retrieves papers, extracts limitations and checks candidate gaps against newer literature.",
    contribution:
      "I developed gap verification, fine-tuned search embeddings and worked on AWS deployment with CI/CD.",
    decisions: [
      "Retrieve and rank scientific papers, then extract stated limitations and recurring candidate gaps.",
      "Run fresh, targeted searches to check whether each candidate remains open, is partially solved, solved or uncertain.",
      "Attach supporting sources and a verdict so researchers can inspect the evidence.",
    ],
    stack: [
      "Python",
      "Multi-agent systems",
      "Search embeddings",
      "AWS",
      "CI/CD",
    ],
    limit:
      "Team capstone. The source is not publicly accessible. The local project documents staged execution and mock recommendation paths; no independent benchmark or current public-service availability is claimed.",
    cta: "Request a walkthrough",
    href: "mailto:salehomair1424@gmail.com?subject=Baseerah%20project%20walkthrough",
  },
  {
    slug: "support",
    name: "Support agents",
    subtitle: "LangGraph routing",
    description:
      "Routes support requests to QA, diagnostic tools, a specialist model or human escalation.",
    overview:
      "A LangGraph workflow routes technical-support requests between extractive question answering, diagnostic tools, a LoRA support model and human escalation. A typed state carries the context and tool results through the workflow.",
    contribution:
      "Built the multi-model support assistant, fine-tuned Qwen with LoRA and connected routing, diagnostic demo tools and conversation tracing.",
    decisions: [
      "Explicit conditional graph edges make routing decisions and escalation paths inspectable.",
      "Tool requests flow into the specialist model; QA and escalation have their own terminal paths.",
      "Optional Langfuse traces capture execution. The local FastAPI service exposes an OpenAI-compatible interface.",
    ],
    stack: ["Python", "LangGraph", "Qwen", "LoRA", "FastAPI", "Docker"],
    limit:
      "The repository contains component tests, training artifacts and router evaluation outputs. Diagnostic tools are demonstration tools; no production support traffic or unverified aggregate accuracy is claimed.",
    cta: "View repository",
    href: "https://github.com/SalehAlomair/multi-agent-teq-support",
    source:
      "https://github.com/SalehAlomair/multi-agent-teq-support/blob/main/src/agent.py",
  },
  {
    slug: "digital-twin",
    name: "AI Digital Twin",
    subtitle: "Portfolio AI assistant",
    description:
      "A DeepSeek-powered assistant that answers questions about my background and projects using tool calling.",
    overview:
      "A career assistant adapted from my Python / Gradio digital twin. A small FastAPI backend connects the portfolio chat to DeepSeek Flash and keeps its career context, agent loop and tools server-side.",
    contribution:
      "Built a local portfolio agent with tools for recruiter notifications through Discord and recording questions it cannot answer. This portfolio provides the custom web frontend and integration adapter.",
    decisions: [
      "Model keys, Discord webhooks and all tool execution remain on the server.",
      "The frontend sends a message and prior history to a configurable /chat endpoint and safely renders returned text.",
      "A hosted FastAPI /chat endpoint serves live answers and sends contact details through Discord only with visitor permission.",
    ],
    stack: [
      "Python",
      "DeepSeek",
      "Tool calling",
      "Gradio",
      "React",
      "FastAPI",
    ],
    limit:
      "The API runs locally and is not publicly deployed. An unconfigured website still uses clearly labeled curated answers. Discord notifications are optional and disabled by default.",
    cta: "Ask about this project",
    href: "mailto:salehomair1424@gmail.com?subject=AI%20Digital%20Twin%20project",
  },
];
