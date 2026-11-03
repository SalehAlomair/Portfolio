import { useId, useLayoutEffect, useRef, useState } from "react";

const routes = ["QA", "Tools", "Agent", "Human"];

// An interactive illustration, not a simulated backend execution.
export default function LandingDiagram({ kind, onOpenChat }) {
  const titleId = useId();
  const svgRef = useRef(null);
  const [width, setWidth] = useState(520);
  const [step, setStep] = useState(0);
  useLayoutEffect(() => {
    const update = () => setWidth(Math.max(360, Math.round(svgRef.current.getBoundingClientRect().width)));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(svgRef.current);
    return () => observer.disconnect();
  }, []);
  const center = width * 0.5;
  // The conversation bubble needs room for both lines plus 12px side padding.
  const output = width - (kind === "digital-twin" ? 116 : 96);
  const route = step % routes.length;
  const routeY = 20 + route * 22;
  const inputPath = `M76 52C${center * 0.65} 52 ${center - 60} 52 ${center - 32} 52`;
  const evidencePath = `M${center + 30} 52C${center + 70} 52 ${output - 40} 52 ${output} 52`;
  const routingPath = `M${center + 18} 52C${center + 68} 52 ${output - 40} ${routeY} ${output} ${routeY}`;
  const conversationPath = `M${center + 30} 42C${center + 75} 6 ${output - 55} 6 ${output} 35`;
  const title = kind === "baseerah"
    ? "Research flows through verification into evidence. Activate to trace the workflow."
    : kind === "support"
      ? `LangGraph routes requests to ${routes[route]}. Activate to preview the next route.`
      : "Portfolio context becomes a conversation. Open Saleh’s portfolio assistant.";
  function activate() {
    if (kind === "digital-twin") onOpenChat();
    else setStep((value) => value + 1);
  }
  return (
    <button className={`diagram-control control-${kind}`} onClick={activate} aria-label={title} aria-haspopup={kind === "digital-twin" ? "dialog" : undefined}>
      <svg ref={svgRef} className={`landing-diagram diagram-${kind}`} viewBox={`0 0 ${width} 108`} role="img" aria-labelledby={titleId} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <title id={titleId}>{title}</title>
        {kind === "baseerah" ? (
          <>
            <path className="system-rail" d={`M76 32C${center - 65} 32 ${center - 70} 44 ${center - 32} 52M76 72C${center - 65} 72 ${center - 70} 60 ${center - 32} 52`} />
            <path className="system-rail" d={inputPath} />
            <path className="system-rail" d={evidencePath} />
            <g className="research-sheets">
              <path className="system-paper paper-back" d="M20 18h33l10 10v48H20Z" />
              <path className="system-paper paper-middle" d="M27 23h33l10 10v48H27Z" />
              <path className="system-paper" d="M34 28h31l10 10v48H34Z" />
              <path className="system-ink" d="M65 28v11h10M43 49h22m-22 8h22m-22 8h14" />
            </g>
            <g transform={`translate(${center} 52)`}>
              <path className="system-core" d="m0-31 31 31L0 31-31 0Z" />
              <circle className="system-aperture" r="15" strokeDasharray="68 26" transform="rotate(-35)" />
              <circle className="system-point" r="3" />
            </g>
            <g transform={`translate(${output} 0)`}>
              <path className="system-paper" d="M0 22h35l12 12v48H0Z" />
              <path className="system-ink" d="M35 22v13h12M9 44h22m-22 8h16m-16 8h13" />
              <circle className="system-gold" cx="46" cy="71" r="15" />
              <path key={`check-${step}`} className="system-check" pathLength="1" d="m39 71 5 5 10-11" />
            </g>
            <g key={`trace-${step}`} className="system-trace">
              <path className="system-current" pathLength="1" d={inputPath} />
              <path className="system-current current-later" pathLength="1" d={evidencePath} />
              <circle className="system-packet" r="3" style={{ offsetPath: `path('${inputPath}')` }} />
              <circle className="system-packet packet-later" r="3" style={{ offsetPath: `path('${evidencePath}')` }} />
            </g>
            <text className="system-caption" x="20" y="104">Research</text>
            <text className="system-caption system-invitation" x={width - 20} textAnchor="end" y="104">Trace evidence ↻</text>
          </>
        ) : kind === "support" ? (
          <>
            <path className="system-rail" d={inputPath} />
            <g>
              <rect className="system-paper" x="21" y="30" width="54" height="43" rx="6" />
              <path className="system-ink" d="M32 43h30M32 51h24M32 59h15" />
            </g>
            <g transform={`translate(${center} 52)`}>
              <path className="system-gold" d="m0-22 22 22L0 22-22 0Z" />
              <path className="system-dark" d="M-8 0H8M2-6l6 6-6 6" />
            </g>
            {routes.map((name, index) => {
              const y = 20 + index * 22;
              return (
                <g key={name} className={index === route ? "system-route is-selected" : "system-route"}>
                  <path className="system-rail" d={`M${center + 18} 52C${center + 68} 52 ${output - 40} ${y} ${output} ${y}`} />
                  <rect className="system-terminal" x={output} y={y - 9} width="74" height="18" rx="4" />
                  <circle className="route-light" cx={output + 10} cy={y} r="2.5" />
                  <text className="route-label" x={output + 21} y={y + 4}>{name}</text>
                </g>
              );
            })}
            <g className="system-trace" key={`route-${step}`}>
              <path className="system-current" pathLength="1" d={routingPath} />
              <circle className="system-packet" r="3" style={{ offsetPath: `path('${routingPath}')` }} />
            </g>
            <text className="system-caption" x="21" y="104">One request</text>
            <text className="system-caption system-invitation" x={width - 20} textAnchor="end" y="104">Switch route ↻</text>
          </>
        ) : (
          <>
            <path className="system-rail" d={inputPath} />
            <path className="system-rail" d={conversationPath} />
            <path className="system-rail" d={`M${output} 69C${output - 55} 103 ${center + 75} 103 ${center + 30} 62`} />
            <g>
              <rect className="system-paper" x="21" y="25" width="54" height="54" rx="6" />
              <circle className="system-ink" cx="48" cy="42" r="7" />
              <path className="system-ink" d="M35 61c0-15 26-15 26 0M36 69h24" />
            </g>
            <g transform={`translate(${center} 52)`}>
              <circle className="system-core" r="29" />
              <circle className="system-aperture" r="23" strokeDasharray="80 65" transform="rotate(-40)" />
              <text className="system-ai" textAnchor="middle" y="7">AI</text>
            </g>
            <g transform={`translate(${output} 0)`}>
              <path className="system-message" d="M0 26h96v48H25l-12 10V74H0Z" />
              <text className="system-message-title" x="12" y="47">Ask me</text>
              <text className="system-message-copy" x="12" y="63">about work</text>
            </g>
            <g className="system-trace">
              <path className="system-current" pathLength="1" d={conversationPath} />
              <circle className="system-packet" r="3" style={{ offsetPath: `path('${conversationPath}')` }} />
            </g>
            <text className="system-caption" x="21" y="104">Portfolio context</text>
            <text className="system-caption system-invitation" x={width - 20} textAnchor="end" y="104">Say hello ↗</text>
          </>
        )}
      </svg>
    </button>
  );
}
