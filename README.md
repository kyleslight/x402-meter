# x402 Meter

A live meter for **x402-priced APIs on Solana**. It calls a paid endpoint with no payment
header, records the exact `HTTP 402` challenge that comes back, and publishes the raw
response so anyone can check the number for themselves.

Live: **https://kyleslight.github.io/x402-meter/**

## Why

An x402 API advertises a price. The only number that matters is the one the server actually
demands when you knock: `maxAmountRequired`, in atomic USDC, plus the `payTo` and `feePayer`
addresses you must use. Today you find that out by writing a client. This project makes it
public and timestamped, so a builder can see what an agent call really costs before writing
any code — and can re-check the claim a month later.

## What is on the page

| Element | Where it comes from |
| --- | --- |
| `$0.003007 per call` | `maxAmountRequired` in the live 402 body, ÷ 1e6 |
| `payTo` / `feePayer` / `asset` | the same 402 body, untouched |
| Price list (12 endpoints) | `GET /v1/info`, the service's own price document |
| "last probe" timestamp | `data/latest.json`, committed by CI |
| Raw request + response | `data/latest.json`, verbatim |

Nothing on the page is typed by hand.

## How it works

```
probe.js  ──(no payment header)──▶  hermes.swap.io
    │                                  │
    │◀──────── HTTP 402 + JSON ────────┘
    ▼
data/latest.json  ──commit──▶  GitHub Actions (every 15 min)  ──▶  GitHub Pages
```

- `probe.js` — zero-dependency Node script. One free `GET /v1/info`, one unpaid
  `POST /v1/swap/quote`. Writes `data/info.json` and `data/latest.json`.
- `.github/workflows/probe.yml` — runs it every 15 minutes and commits the result.
- `index.html` — one static page, reads the committed JSON, renders it.

## Run locally

```bash
node probe.js                  # writes data/*.json
python3 -m http.server 8787    # then open http://127.0.0.1:8787/
```

No build step, no dependencies, no API key.

## Data format

`data/latest.json`

```json
{
  "generated_at": "2026-11-09T05:23:17.767Z",
  "api": "https://hermes.swap.io",
  "challenge": {
    "x402Version": 1,
    "network": "solana",
    "scheme": "exact",
    "asset": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "payTo": "BPz2u6eoWLervxEqfpsMCVmKk7h6fEVsd7L5rvEibMfD",
    "feePayer": "2wKupLR9q6wXYppw8Gr2NvWxKBUqm4PPJKkQfoxHDBg4",
    "atomicAmount": "3007",
    "humanAmount": 0.003007
  },
  "checks": [ { "name": "...", "status": 402, "ms": 344, "body": { } } ]
}
```

## Wallet

This project holds no funds. A fresh ed25519 keypair was generated for receiving grant
payouts; only the public address appears here:

```
9X4rud8Hqy7s7Xsar1p251Yhn9vijBwW8Ff8WqkQMWWM
```

The secret key lives outside the repo and is never published.

## Scope of the first milestone

Three x402 providers on Solana, a public archive of every probe, and a documented schema
so other people can run the same check against their own service.

## License

MIT.
