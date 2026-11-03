# Saleh Alomair — AI engineering portfolio

Next.js App Router, React 19, Tailwind CSS 4 and pnpm. Migrated using `pnpm create next-app@latest` and initialized with shadcn/ui, following the [Spectrum UI installation guide](https://ui.spectrumhq.in/docs/installation). `components.json` uses New York, Zinc and CSS variables; the utilities map to the approved charcoal-and-champagne palette. The repository archive uses [Spectrum UI's Accordion](https://ui.spectrumhq.in/docs/accordion), installed with `pnpm dlx shadcn@latest add @spectrumui/accordion` and adapted to the portfolio palette. Its expansion and plus/minus indicator respect reduced motion. Component source is kept in `src/components/ui/accordion.jsx`.

The site exports static HTML and assets to `out/`, compatible with GitHub Pages, including `/Portfolio/` hosting. Project descriptions are backed by repository source; evaluation numbers are attributed to their project reports and include limitations. Baseerah is credited as a team capstone and has no public source link.

## Full portfolio

The charcoal-and-champagne landing adapts its spacing to the viewport so the header, hero, three featured projects and bottom strip are visible together at standard desktop and phone sizes. Each project has a concise summary and its own interactive SVG illustration in `src/LandingDiagram.jsx`: trace Baseerah’s research-to-evidence flow, cycle Support agents through QA / tools / agent / human routes, or open the portfolio assistant from the Digital Twin. The first two diagrams illustrate workflows; the Digital Twin opens the connected chat panel, labeled according to its live or curated mode. The original detailed diagrams remain in the full case studies. The large sans-serif name returns in the closing footer. The layout can grow naturally on unusually short screens or with enlarged text rather than clipping content. Native mandatory scroll snapping settles at complete chapter boundaries. About includes its navigation and each case study includes its introduction in the same snap area. Long chapters remain readable within their area; no wheel or touch gestures are intercepted.

The page continues into on-page About, three detailed featured-project case studies, additional repositories, experience and education, technical expertise, and contact. Explore buttons link to each full case study; About links to its own section. The repository archive stays mounted and uses an interruptible 480ms grid transition; closed links are inert and hidden from assistive technology. Reduced motion disables the transition. The Digital Twin can be opened from its case study, the contact area, or the lower-right launcher.

## Run locally

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Build and review

```sh
pnpm build
pnpm preview
pnpm test
```

Use Node.js 22 or newer and the pnpm version in `package.json`. Development and production preview both use `http://127.0.0.1:4175/`; run one at a time. `pnpm start` is an alias for the static production preview. Build before previewing. The build output is `out/`; `next start` is not used because this project is a static export.

The selected charcoal-and-champagne design uses system sans-serif typography, accessible SVG workflow diagrams and the supplied self-hosted resume. `src/app/layout.jsx` owns metadata and global styles; `src/app/page.jsx` renders the existing portfolio. The old Vite entry and configuration remain in `archive/vite/` for reference, alongside older pages under `archive/legacy/` and `page/`.

## AI Digital Twin

The website now includes a small Python/FastAPI adapter based on the supplied
`agents/1_foundations/twin` project. It keeps DeepSeek Flash, the career prompt,
conversation history and the two tool names. The original source is unchanged.
See `backend/README.md` for setup and the exact additions. The backend has one
application file and a public profile file; contact and unanswered-question
records use a private JSONL file rather than a database. Contact saving requires
the visitor's checkbox permission. Discord forwarding is off by default.

Without configuration, the chat is a **clearly labeled curated portfolio preview**. It uses fixed answers from verified portfolio information, makes no inference request and cannot send notifications. Completed conversation turns are kept in sessionStorage for the current tab (up to 48 messages), so closing the panel or reloading retains them. New chat clears them; closing the tab ends the session. No localStorage is used. Preview and live-backend conversations use separate storage keys. If storage is blocked, the chat falls back to memory.

Copy `.env.example` to `.env.local` and set:

```dotenv
NEXT_PUBLIC_CHAT_ENDPOINT=https://YOUR-BACKEND.example/chat
```

Set the complete endpoint, including `/chat`. The existing `VITE_CHAT_ENDPOINT` is also supported as a compatibility alias; `NEXT_PUBLIC_CHAT_ENDPOINT` takes precedence when nonempty. Restart the dev server or rebuild after changing it. These are public build-time URLs. Never put keys, tokens or Discord webhooks in them. Chat history is restored after the page mounts, keeping server HTML and browser hydration consistent.

### API contract

The adapter in `src/chat-api.js` sends:

```http
POST /chat
Content-Type: application/json
X-Request-ID: <client-generated UUID>
```

```json
{
  "message": "Tell me about Saleh's projects",
  "history": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi!" }
  ]
}
```

The current message is **not** duplicated in history. Response:

```json
{ "response": "Saleh has built…" }
```

The implementation in `backend/app.py` owns DeepSeek inference, tool calling and recording. Add `"contact_consent": true` to the request only when the visitor has checked the contact permission box. No automatic retries occur. Manual retries reuse `X-Request-ID`; the backend caches completed replies and deduplicates tool records. Optional Discord forwarding applies only to consented contact records.

Configure `TWIN_ALLOWED_ORIGINS` to allow the portfolio origin `https://salehalomair.github.io` when hosting the API. Development origins are allowed by default. Credentials are omitted by the client. The backend validates input, caps tool rounds and has a 25-second execution timeout. Configure public rate limits at the hosting gateway before exposing the API.

HTTPS is required, except loopback HTTP when the website itself runs locally. The client rejects blank/oversized questions, prevents duplicate in-flight submissions, caps the outbound context at 24 messages including the current question and times out after 30 seconds. Answers are limited to 20,000 characters. A safe React renderer handles paragraphs, lists, emphasis, links and fenced code; raw HTML and unsafe link protocols are never rendered.

## Resume and content

The supplied CV is bundled as `public/Saleh-Alomair-Resume.pdf`. Replace it to update the download. An optional `NEXT_PUBLIC_RESUME_URL` (or existing `VITE_RESUME_URL`) can point to a trusted alternate HTTPS file. The bundled URL and favicon respect `NEXT_PUBLIC_BASE_PATH`. The current LinkedIn URL follows the resume. Featured project data lives in `src/featured-projects.js`; the additional repository archive lives in `src/projects.js`; image source credits live in `public/images/SOURCES.md`. Keep team attribution and evaluation caveats when editing.

## Deploy

Pushing to `main` builds and deploys the static website with GitHub Actions.
The workflow can also be run manually.

1. Review the local preview and commit/push the changes to `main`.
2. In repository **Settings → Pages**, select **GitHub Actions** as the source.
3. If connecting the live backend, set the repository variable `NEXT_PUBLIC_CHAT_ENDPOINT` to its complete HTTPS `/chat` URL. The existing `VITE_CHAT_ENDPOINT` repository variable is also supported. Otherwise leave both unset for preview mode.
4. Monitor **Actions → Build and deploy**, or choose **Run workflow** for a manual deployment.
5. Verify the resume, source links and chat at `https://salehalomair.github.io/Portfolio/`.

The workflow installs with `pnpm install --frozen-lockfile`, builds with `NEXT_PUBLIC_BASE_PATH=/Portfolio` and uploads `out/`. GitHub Pages serves the static frontend; it cannot run the Python backend. Deploy that separately and verify its CORS and tool behavior before enabling the live endpoint.
