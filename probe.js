#!/usr/bin/env node
/**
 * x402 Meter probe.
 *
 * Hits a live x402-priced API on Solana and records the *unpaid* response:
 * the 402 challenge that a client must answer before it gets data.
 * Writes data/info.json (public price table) and data/latest.json (last probe).
 *
 * No dependencies. Node >= 18.
 */

const fs = require("node:fs");
const path = require("node:path");

const API = "https://hermes.swap.io";
const OUT = path.join(__dirname, "data");

// A quote request for 0.1 SOL -> USDC. Small enough to be a realistic agent call.
const QUOTE_BODY = {
  inputMint: "So11111111111111111111111111111111111111112", // wrapped SOL
  outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
  amount: "100000000", // 0.1 SOL, 9 decimals
  slippageBps: 50,
};

async function timed(name, url, init) {
  const t0 = Date.now();
  const res = await fetch(url, init);
  const ms = Date.now() - t0;
  const text = await res.text();
  let body = text;
  try {
    body = JSON.parse(text);
  } catch {
    /* keep raw text */
  }
  return {
    name,
    method: (init && init.method) || "GET",
    url,
    status: res.status,
    ms,
    headers: {
      "content-type": res.headers.get("content-type"),
      "cf-ray": res.headers.get("cf-ray"),
    },
    body,
  };
}

function parse402(check) {
  const b = check.body;
  if (!b || !Array.isArray(b.accepts) || !b.accepts.length) return null;
  const a = b.accepts[0];
  const atomic = Number(a.maxAmountRequired);
  return {
    x402Version: b.x402Version ?? null,
    network: a.network,
    scheme: a.scheme,
    asset: a.asset,
    payTo: a.payTo,
    feePayer: (a.extra && a.extra.feePayer) || null,
    maxTimeoutSeconds: a.maxTimeoutSeconds ?? null,
    atomicAmount: a.maxAmountRequired,
    // USDC has 6 decimals on Solana
    humanAmount: Number.isFinite(atomic) ? atomic / 1e6 : null,
  };
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  const info = await timed("GET /v1/info", `${API}/v1/info`);
  const quote = await timed("POST /v1/swap/quote", `${API}/v1/swap/quote`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(QUOTE_BODY),
  });

  const checks = [info, quote];
  const challenge = parse402(quote);

  fs.writeFileSync(
    path.join(OUT, "info.json"),
    JSON.stringify({ generated_at: new Date().toISOString(), check: info }, null, 2) + "\n"
  );

  const latest = {
    generated_at: new Date().toISOString(),
    api: API,
    challenge,
    request: { method: "POST", url: `${API}/v1/swap/quote`, body: QUOTE_BODY },
    checks,
  };
  fs.writeFileSync(path.join(OUT, "latest.json"), JSON.stringify(latest, null, 2) + "\n");

  console.log(
    `[probe] ${latest.generated_at}  info=${info.status} (${info.ms}ms)  quote=${quote.status} (${quote.ms}ms)` +
      (challenge ? `  price=${challenge.atomicAmount} atomic = $${challenge.humanAmount}` : "")
  );
})().catch((err) => {
  console.error("[probe] failed:", err.message);
  process.exit(1);
});
