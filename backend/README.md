# Website digital twin

This is a small adaptation of `/Users/saleh/Projects/agents/1_foundations/twin/`.
The original project is unchanged.

- `app.py` adapts the original DeepSeek chat loop, system-prompt approach and
  `record_user_details` / `record_unknown_question` tools into `POST /chat`.
- `profile.md` contains the public career information selected from the original
  `summary.txt` and checked against the portfolio. The original private summary,
  its embedded operating instructions and `linkedin.pdf` are not copied or served.
- `data/records.jsonl` is created when a tool saves a record. There is no database.
  It is ignored by Git and never served by the website.
- Contact records require both the checkbox and an email in the current message.
  Discord forwarding is optional and off by default. Unanswered questions are
  saved locally, without Discord forwarding.
- For a hosted function, set `TWIN_RECORD_MODE=discord`. With a valid webhook,
  consented contacts go directly to Discord; unanswered questions are not saved.
  No temporary server file is used in this mode.

## Start

From the portfolio folder, with Python 3.11 or newer:

```sh
python3 -m venv backend/.venv
backend/.venv/bin/pip install -r backend/requirements.txt
cp backend/.env.example backend/.env
```

Set `DEEPSEEK_API_KEY` in `backend/.env`. To reuse an existing environment file
instead, set `TWIN_ENV_FILE=/absolute/path/to/your/.env` in `backend/.env`.
Credentials belong here, never in `NEXT_PUBLIC_*` variables or frontend files.

```sh
backend/.venv/bin/python -m uvicorn backend.app:app --host 127.0.0.1 --port 8000
```

In a separate terminal, set `.env.local` to:

```dotenv
NEXT_PUBLIC_CHAT_ENDPOINT=http://127.0.0.1:8000/chat
```

Then run `pnpm build` and `pnpm preview` (or `pnpm dev`). The local chat accepts
loopback HTTP while the website itself is on loopback. Hosted websites require
an HTTPS endpoint. `GET http://127.0.0.1:8000/health` checks configuration; it does
not claim the external model provider is reachable.

If the provider times out on a machine with a broken IPv6 route, set
`TWIN_IPV4_ONLY=true` in `backend/.env` and restart the backend. This is enabled
for the current local setup; HTTPS verification remains enabled.

## Test

```sh
backend/.venv/bin/python -m unittest backend.test_app -v
pnpm test
```

The backend tests mock DeepSeek and disable Discord. They check validation,
conversation context, tool handling, contact permission, retry deduplication,
bounded execution and provider errors. No test sends a Discord notification.

## Hosting

The website remains a static export. Host the Python API separately and set
`NEXT_PUBLIC_CHAT_ENDPOINT` to its complete HTTPS `/chat` URL before rebuilding.
Add the website origin to `TWIN_ALLOWED_ORIGINS`.

For a Vercel FastAPI project, choose `backend` as the root directory of this
repository. The `app.py` entrypoint and `requirements.txt` are then at that
project root. Set `DEEPSEEK_API_KEY`, `DISCORD_WEBHOOK_URL`,
`TWIN_RECORD_MODE=discord`, and
`TWIN_ALLOWED_ORIGINS=https://salehalomair.github.io` as server environment
variables. Do not use the local `TWIN_ENV_FILE` path on the hosted service.

This deliberately simple backend runs as one process and keeps a small retry
cache in memory. Tool records are deduplicated in the JSONL file. For an exposed
public service, configure rate limits at your hosting gateway. The JSONL file
needs persistent private storage if you want records to survive redeployment;
the hosted Discord mode bypasses this file.
