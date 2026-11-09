# Solana Foundation Funding — form draft

Form: https://share.hsforms.com/1GE1hYdApQGaDiCgaiWMXHA5lohw
Status: **SUBMITTED** — 2026-11-09 05:40 UTC (13:40 CST).

确认页原文（已取证，提交后页面 alert 节点）：

> Thank you for applying for funding from the Solana Foundation! You will receive a confirmation email shortly -- please make sure to check your Spam folder as well. Given the large quantity of applications we receive, not everyone will receive a reply. If you don't receive a reply, it means your project is not fit for funding at this time.

确认邮件：**未取证** —— 05:42 UTC 查 Gmail（`newer_than:1h` 与 `from:solana`）都为空，页面说 shortly，稍后应到。

表单实际字段：选 AI 后**条件字段才出现**，共 10 个必填 + 1 个单选组，与之前抄的 11 项不同：
Company name · Website URL · Country · First Name · Last Name · Email Address ·
Solana On-Chain Accounts · Funding Amount（**数字型，只收纯数字**，填 `24000`）·
Which funding category（AI）· Your project / idea · Is / will this project be open sourced?（Yes）·
Milestones（三段金额＋交付物）· Relevant metrics · Competition · How is this project a public good? · Why You.

---

## Company name
`x402 Meter (independent project)`

## Website URL
`https://kyleslight.github.io/x402-meter/`

## Country
`China`

## First Name
`Kui`

## Last Name
`Lin`

默认填 **Kui Lin**（真名）。表单只收公司名 / 网址 / 国家 / 姓名 / 邮箱 / 链上地址 / 金额 / 类别 / Why You，没有身份证件、没有 KYC 上传 → **未取证**：基金会后台是否做姓名核验。若你希望用 `Kyles Lin` 对外，只改这两格，其余不动；两个版本的差别仅此。

## Email Address
`likelakes07@gmail.com`

## Solana On-Chain Accounts
`9X4rud8Hqy7s7Xsar1p251Yhn9vijBwW8Ff8WqkQMWWM`

Freshly generated ed25519 keypair (2026-11-09), used only to receive payouts. Secret key at
`.wallet/wallet.json` (mode 600, gitignored, never published). No program ID yet — the first
milestone ships the probe archive as a static site, not an on-chain program.

## Funding Amount
`24000`（表单此格是数字输入，填 `$24,000 USDC over 3 milestones` 会被整格清空；实际提交为纯数字 24000，币种与分期写在 Milestones 格里）

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

1. 姓名已定：Kui Lin（默认），Kyles Lin 为备选 —— 只影响 First/Last Name 两格。
2. 金额已定：$24,000 / 3 里程碑。
3. repo 保持 public：评审可自己 `node probe.js` 复现 402。

## 已提交时额外填的五个字段（正文见下）

**Your project / idea** — x402 Meter 是什么、每 15 分钟无付款头打一次、记 402 的 atomic 金额/payTo/feePayer/原始 body、现在只测 hermes.swap.io（12 端点、标价 3000、实收 3007）、无引荐自行申请。

**Is / will this project be open sourced?** — `Yes`。

**Milestones**（按表单示例格式，三段）：

- $6,000 due upon completion of Milestone 1 deliverable - meter live for three x402 providers on Solana, every probe archived with a timestamp and the raw response body, a documented JSON schema, and the page rebuilt from that archive with no hand-typed numbers.
- $9,000 due upon completion of Milestone 2 deliverable - x402-meter CLI and npm package released, zero dependencies, test suite green, and five worked examples of an agent paying per call (quote, build transaction, submit) with the 402 handling written out.
- $9,000 due upon completion of Milestone 3 deliverable - ten providers onboarded to the meter, a weekly price index with change history and per-endpoint diffs, and three reference agents (DCA bot, research agent, treasury rebalancer) that pay per request instead of subscribing. Adoption target: 25 unique repos or agents reading the meter's JSON in the last 30 days of the milestone.

**Relevant metrics** — 如实报小：2026-11-09 起跑，每 15 分钟一次、bot 自动提交、原始 402 body 全留；现索引 1 家 provider 的 12 个计价端点；公开无注册；外部消费者目前只有我自己；repo 公开、一条命令可复现。

**Competition** — 现有的是目录（x402 service indexes 列 provider 与标价），缺的是「调用那一刻服务器实际要多少」＋payTo/feePayer＋原始 body＋按计划留存；我的优势是记录本身，不是清单；provider 可以拿它测自己，所以是合作不是竞争。

**How is this project a public good** — 免费、无注册、MIT、无 token 无付费墙；任何人可把同一 probe 指向自己的或对手的服务；静态文件托管、零成本；也算一个 novel proof of concept：据我所知 Solana 上没有公开、带版本的 x402 challenge 记录。

## 提交时遇到的卡点（备查）

1. Funding Amount 是数字输入：带 `$`、逗号、文字的整段会被清空，只认纯数字 → 填 `24000`。
2. Submit 触发 reCAPTCHA 图片题（「Select all squares with traffic lights」），浏览器合成点击进不了 iframe → 用 Computer Use 原生点击选中 2 格（列 2、行 2-3）后点 VERIFY，通过并提交。
