// These values are public, replaced at build time by Next.js.
export const chatEndpoint = process.env.NEXT_PUBLIC_CHAT_ENDPOINT?.trim() || '';
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const resumeUrl =
  process.env.NEXT_PUBLIC_RESUME_URL || `${basePath}/Saleh-Alomair-Resume.pdf`;
