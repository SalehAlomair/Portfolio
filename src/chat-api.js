// This module owns the wire contract. API keys and notification tools stay on the server.
export const MAX_INPUT = 2000;
export function validateEndpoint(value, development = false) {
  const url = new URL(value);
  if (url.username || url.password) throw new Error('Endpoint must not contain credentials.');
  if (url.protocol !== 'https:' && !(development && url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname))) {
    throw new Error('The assistant needs an HTTPS endpoint.');
  }
  return url.href;
}
export async function requestReply({ endpoint, development = false, messages, requestId, signal, contactConsent = false, fetcher = fetch }) {
  const url = validateEndpoint(endpoint, development);
  const history = messages.filter(m => ['user', 'assistant'].includes(m.role)).slice(-24).map(({ role, content }) => ({ role, content }));
  if (!history.length || history.at(-1).role !== 'user' || history.some(m => typeof m.content !== 'string' || !m.content.trim() || m.content.length > (m.role === 'user' ? MAX_INPUT : 20000))) {
    throw new Error('Please enter a question of up to 2,000 characters.');
  }
  const response = await fetcher(url, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Request-ID': requestId }, credentials: 'omit', signal,
    body: JSON.stringify({ message: history.at(-1).content, history: history.slice(0, -1), ...(contactConsent ? { contact_consent: true } : {}) }),
  });
  if (!response.ok) {
    if (response.status === 504) throw new Error('DeepSeek did not respond in time. Please retry or email Saleh.');
    throw new Error(response.status === 429 ? 'The assistant is busy. Please wait a moment and retry.' : 'The assistant could not answer right now. Please retry or email Saleh.');
  }
  const data = await response.json();
  if (!data || typeof data.response !== 'string' || !data.response.trim() || data.response.length > 20000) throw new Error('The assistant returned an unreadable response. Please retry.');
  return data.response;
}
export function previewReply(question) {
  const q = question.toLowerCase();
  if (/contact|opportunit|hire|email/.test(q)) return 'Saleh is open to AI Engineer roles in Saudi Arabia. You can [email Saleh](mailto:salehomair1424@gmail.com) or visit his [LinkedIn profile](https://www.linkedin.com/in/salehalomair/). This preview cannot send a notification.';
  if (/baseerah/.test(q)) return 'Baseerah is Saleh’s Tuwaiq Academy team capstone. It combines bilingual AI content with research-gap discovery and verification. His resume records work on gap verification, fine-tuned search embeddings and AWS deployment. The source repository is not publicly accessible. [Read about Baseerah](#case-baseerah) or [ask for a walkthrough](mailto:salehomair1424@gmail.com).';
  if (/metro|rag|arabic/.test(q)) return 'The [Metro RAG project](https://github.com/SalehAlomair/riyadh-metro-rag-ai-assistant) answers Arabic and English questions using multilingual E5 embeddings, FAISS retrieval and Amazon Bedrock. Its knowledge base includes station, route and district summaries. [Read the source](https://github.com/SalehAlomair/riyadh-metro-rag-ai-assistant).';
  if (/evidence|govern|research/.test(q)) return '[EvidenceOps](https://github.com/SalehAlomair/evidenceops-agent) is a LlamaIndex research agent. Python enforces per-request tool budgets, safe report paths and an approval gate: the save tool is unavailable until approval. [Inspect the tools](https://github.com/SalehAlomair/evidenceops-agent/blob/main/app/tools/research_tools.py).';
  if (/skill|technolog|stack/.test(q)) return 'Saleh’s verified projects use Python, LlamaIndex, LangGraph, AWS Bedrock, FAISS, scikit-learn, FastAPI and Docker. His background also includes PyTorch and TensorFlow. [Explore his work](#work) for implementation details.';
  if (/experience|background|education/.test(q)) return 'Saleh is a Computer Science graduate of Qassim University (2026), based in Riyadh. He completed an AI Engineer internship at Smart Methods in June–August 2025, working on an Arabic voice assistant and fatigue detection. His background is available from About in the main navigation.';
  return 'Start with [Baseerah](#case-baseerah) for research-gap discovery, [Support agents](#case-support) for multi-model orchestration, or [AI Digital Twin](#case-digital-twin) for a portfolio assistant with tool calling. This is a curated preview using portfolio facts, not a live model response.';
}
