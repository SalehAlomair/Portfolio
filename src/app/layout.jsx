import './globals.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const siteUrl = 'https://salehalomair.github.io/Portfolio/';

export const metadata = {
  title: 'Saleh Alomair — AI Engineer',
  description:
    'Saleh Alomair, an AI Engineer in Riyadh. Explore retrieval-augmented generation, governed agents, machine learning, and the code behind them.',
  alternates: { canonical: siteUrl },
  openGraph: {
    title: 'Saleh Alomair — AI Engineer',
    description:
      'RAG, agentic systems and applied machine learning. Projects, implementation notes and source code.',
    type: 'website',
    url: siteUrl,
  },
  icons: { icon: `${basePath}/favicon.svg` },
};

export const viewport = { themeColor: '#171716' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
