import { useId } from "react";

function Icon({ name, x = 0, y = 0, size = 26 }) {
  const paths = {
    paper: (
      <>
        <path d="M5 2h9l5 5v15H5zM14 2v6h5M8 12h8M8 16h8M8 19h6" />
      </>
    ),
    shield: (
      <>
        <path d="M12 2 21 6v6c0 5-9 10-9 10S3 17 3 12V6zM8 12l3 3 5-6" />
      </>
    ),
    search: (
      <>
        <circle cx="10" cy="10" r="7" />
        <path d="m15 15 7 7" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 4 16 4 16 0V5M4 10c0 4 16 4 16 0M4 15c0 4 16 4 16 0" />
      </>
    ),
    router: (
      <>
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="19" r="3" />
        <circle cx="19" cy="19" r="3" />
        <path d="M12 8v5m0 0-5 4m5-4 5 4" />
      </>
    ),
    qa: (
      <>
        <path d="M3 3h18v14H9l-5 4v-4H3z" />
        <path d="M7 8h10M7 12h7" />
      </>
    ),
    tools: (
      <>
        <path d="m4 21 8-8a7 7 0 0 0 8-9l-5 5-3-3 5-5a7 7 0 0 0-9 8L1 17z" />
      </>
    ),
    support: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M4 22v-3a8 8 0 0 1 16 0v3z" />
      </>
    ),
    escalate: (
      <>
        <path d="m12 2 11 20H1zM12 8v6M12 18v1" />
      </>
    ),
    agent: (
      <>
        <path d="m12 1 3 4 5 1v5l3 4-4 4-1 4h-5l-4-3-5 1-2-5 2-5-1-5 5-1z" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 6 10 8L22 6" />
      </>
    ),
  };
  return (
    <svg
      x={x}
      y={y}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.paper}
    </svg>
  );
}
export default function ProjectDiagrams({ kind }) {
  const titleId = useId();
  if (kind === "baseerah")
    return (
      <svg
        className="project-diagram"
        role="img"
        aria-labelledby={titleId}
        viewBox="-12 -8 474 136"
      >
        <title id={titleId}>
          Baseerah workflow: papers, candidate gaps, verification, evidence
        </title>
        {[
          ["paper", "Papers"],
          ["search", "Candidate gaps"],
          ["shield", "Verification"],
          ["paper", "Evidence"],
        ].map(([icon, label], i) => (
          <g key={label}>
            <Icon name={icon} x={12 + i * 116} y={28} size={32} />
            <text x={28 + i * 116} y={83} textAnchor="middle">
              {label}
            </text>
            {i < 3 && (
              <path
                className="graph-line"
                pathLength="1"
                d={`M${59 + i * 116} 44h33m-6-5 6 5-6 5`}
              />
            )}
          </g>
        ))}
      </svg>
    );
  if (kind === "support")
    return (
      <svg
        className="project-diagram"
        role="img"
        aria-labelledby={titleId}
        viewBox="-12 -8 474 196"
      >
        <title id={titleId}>
          A hybrid router selects QA, tools, support or escalation
        </title>
        <text x="42" y="95">
          Router
        </text>
        {[
          ["qa", "QA"],
          ["tools", "Tools"],
          ["support", "Support"],
          ["escalate", "Escalation"],
        ].map(([icon, label], i) => (
          <g key={label}>
            <path
              className="graph-line"
              pathLength="1"
              d={`M105 90C165 90 164 ${23 + i * 44} 226 ${23 + i * 44}`}
            />
            <circle cx="227" cy={23 + i * 44} r="3.5" className="graph-dot" />
            <rect
              className="graph-node"
              x="248"
              y={6 + i * 44}
              width="163"
              height="34"
              rx="4"
            />
            <Icon name={icon} x={261} y={14 + i * 44} size={18} />
            <text x="294" y={28 + i * 44}>
              {label}
            </text>
          </g>
        ))}
      </svg>
    );
  return (
    <svg
      className="project-diagram"
      role="img"
      aria-labelledby={titleId}
      viewBox="-12 -8 512 154"
    >
      <title id={titleId}>
        Portfolio context and DeepSeek connect to a Python agent with contact
        tools
      </title>
      <g>
        <rect
          className="graph-node"
          x="139"
          y="5"
          width="173"
          height="38"
          rx="4"
        />
        <Icon name="paper" x={151} y={14} size={20} />
        <text x="180" y="29">
          Portfolio context
        </text>
        <path
          className="graph-line"
          pathLength="1"
          d="M225 45v25m-4-5 4 5 4-5M225 45l-4 5m4-5 4 5"
        />
      </g>
      <rect
        className="graph-node"
        x="4"
        y="81"
        width="120"
        height="43"
        rx="4"
      />
      <text x="64" y="107" textAnchor="middle">
        DeepSeek
      </text>
      <rect
        className="graph-node"
        x="158"
        y="81"
        width="135"
        height="43"
        rx="4"
      />
      <Icon name="agent" x={170} y={94} size={19} />
      <text x="195" y="107">
        Python agent
      </text>
      <rect
        className="graph-node"
        x="328"
        y="81"
        width="144"
        height="43"
        rx="4"
      />
      <Icon name="mail" x={338} y={94} size={18} />
      <text x="363" y="107">
        Contact tools
      </text>
      <path
        className="graph-line"
        pathLength="1"
        d="M125 102h31m-5-4 5 4-5 4M125 102l5-4m-5 4 5 4M295 102h31m-5-4 5 4-5 4M295 102l5-4m-5 4 5 4"
      />
    </svg>
  );
}
