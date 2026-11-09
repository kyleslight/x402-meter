# Solana Foundation Funding — form draft

Form: https://share.hsforms.com/1GE1hYdApQGaDiCgaiWMXHA5lohw
Status: **filled, NOT submitted** (waiting for Kyle).
Required fields: Company name · Website URL · Country · First Name · Last Name · Email Address ·
Solana On-Chain Accounts · Funding Amount · Category · Why You.

---

## Company name
`x402 Meter (independent project)`

## Website URL
`https://kyleslight.github.io/x402-meter/`

## Country
`China`

## First Name
`Kyle`

## Last Name
`Light`  ← **未确认**：GitHub 是 `kyleslight`，邮箱 `likelakes07`，真实姓氏未取证，Kyle 拍板。

## Email Address
`likelakes07@gmail.com`

## Solana On-Chain Accounts
`9X4rud8Hqy7s7Xsar1p251Yhn9vijBwW8Ff8WqkQMWWM`

Freshly generated ed25519 keypair (2026-11-09), used only to receive payouts. Secret key at
`.wallet/wallet.json` (mode 600, gitignored, never published). No program ID yet — the first
milestone ships the probe archive as a static site, not an on-chain program.

## Funding Amount
`$24,000 USDC over 3 milestones`

| # | Weeks | Amount | Deliverable |
| --- | --- | --- | --- |
| M1 | 4 | $6,000 | Live meter for 3 x402 providers on Solana; every probe archived with a timestamp and raw body; documented JSON schema; public page at the URL above. |
| M2 | 6 | $9,000 | `x402-meter` CLI + npm package (zero deps): probe any x402 endpoint, verify the 402 challenge, diff two records; 5 worked examples of an agent paying per call. |
| M3 | 8 | $9,000 | 10 providers onboarded, weekly price index with change history, 3 reference agents (DCA bot, research agent, treasury rebalancer) that pay per request instead of subscribing. |

Total 18 weeks. Paid per milestone on delivery, no advance.

## Category
`AI`

## Why You

`I build agents that pay per call, and I hit the same wall every time: the price an x402 API
advertises and the price it actually demands are two different numbers, and neither is
written down anywhere you can check later.`

`For this application I ran the check myself against hermes.swap.io — a paid swap API for AI
agents. GET /v1/info returns the price table for free (12 endpoints, 3000 atomic USDC for a
quote). POST /v1/swap/quote without a payment header returns HTTP 402 with
maxAmountRequired 3007 — 7 atomic units more than the advertised 3000, because the fee payer
takes a cut. That gap is invisible until you build a client, and it is exactly the kind of
thing an agent's budget model gets wrong. The recorded request and response are committed in
the repo, so the number can be re-checked, not taken on trust.`

`The edge is not a new protocol. x402 already works on Solana. The edge is a neutral,
timestamped record: the same probe run every 15 minutes, the raw body kept, the diff between
today's price and last month's price visible to anyone. I am one person, so the scope is
deliberately small — one page, one probe script, one schema — and it is already running at
https://kyleslight.github.io/x402-meter/ with no server and no cost to operate.`

---

## Evidence behind the numbers (for Kyle, not for the form)

- 已确认：`GET https://hermes.swap.io/v1/info` → 200，12 个计价端点，quote 标价 3000 atomic。
- 已确认：`POST /v1/swap/quote`（无付款头）→ **HTTP 402**，`maxAmountRequired: "3007"`，
  `network: solana`，`asset: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`（USDC），
  `payTo: BPz2u6eoWLervxEqfpsMCVmKk7h6fEVsd7L5rvEibMfD`，
  `feePayer: 2wKupLR9q6wXYppw8Gr2NvWxKBUqm4PPJKkQfoxHDBg4`。
- 已确认：页面在 https://kyleslight.github.io/x402-meter/ 返回 200，`data/latest.json` 200。
- 已确认：钱包 `9X4rud8…MWWM` 由本地 ed25519 生成，私钥可推导出同一公钥；未上链、未收过钱。
- 未取证：Solana Foundation 的打款币种与到账时长（表单页未写）；评审通过率。

## Open questions for Kyle

1. Last Name 用 `Light` 还是别的？
2. 金额 $24,000 是否合适（可改 $12,000 两里程碑或 $40,000 加一个链上索引里程碑）？
3. 提交前要不要把 repo 从 public 改 private？（现在是 public，评审能看到代码，对可信度有利）
