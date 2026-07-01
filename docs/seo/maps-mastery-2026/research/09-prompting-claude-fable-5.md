# Research 09 — How to Best Prompt Claude Fable 5

> **Stream:** How to prompt **Claude Fable 5** (`claude-fable-5`) for complex, long-horizon build/research work — so the maps-mastery template can be executed by a Fable-5 agent at the highest quality.
> **Compiled:** 2026-07 · Primary source: Anthropic's official model + migration guidance (the in-product `claude-api` skill / `platform.claude.com` docs). Supplemented with Anthropic's published prompt-engineering guidance. **Anthropic-official guidance is marked [ANTHROPIC]; general/inferred is marked [GEN].**
> **Status:** Evidence dossier. Feeds → `prompts/09-fable5-master-execution-prompt.md`.

---

## Executive summary — 10 bullets

1. **[ANTHROPIC] Fable 5 is Anthropic's most capable widely-released model** — built for "the most demanding reasoning and long-horizon agentic work." 1M-token context (default), 128K max output. Use it for the hardest, longest builds; it is *above* Opus-tier, not the default upgrade.
2. **[ANTHROPIC] Thinking is always on.** Omit the `thinking` parameter entirely (or send `{type:"adaptive"}`). `{type:"disabled"}` and `{type:"enabled", budget_tokens:N}` both return a 400. Control depth with **`output_config.effort`** (`low`→`xhigh`, plus `max`).
3. **[ANTHROPIC] The single biggest structural shift is longer turns.** A hard task at high effort can run *many minutes* in one request. Plan for streaming, generous timeouts, and async check-ins — and write prompts that give the full task up front so the model doesn't stall mid-run.
4. **[ANTHROPIC] "Prompts written for prior models are often too prescriptive and reduce output quality."** De-prescribe: state the **goal + constraints**, not a rigid step list. This is the counter-intuitive headline — with Fable 5 you often get *better* results by removing scaffolding.
5. **[ANTHROPIC] Instruction-following is strong — invest in an explicit communication-style section** rather than fighting output style downstream. A short, direct instruction is as effective as a long enumerated one.
6. **[ANTHROPIC] Run long-horizon/agentic work at `high` (or `xhigh`), with the full spec in one well-specified first turn.** Effort is a dimension to *test*: sweep `low`/`medium`/`high` — lower settings on Fable 5 often exceed prior models' `xhigh`.
7. **[ANTHROPIC] Give the *reason*, not just the request.** "I'm working on [larger task] for [who]. They need [what the output enables]. With that in mind: [request]." Fable 5 connects the task to the right context instead of guessing intent.
8. **[ANTHROPIC] Ground progress claims and state boundaries explicitly.** Tell it to audit each progress claim against a tool result, and to report findings and stop when the user is describing a problem rather than requesting a change (it otherwise takes unrequested-but-adjacent actions).
9. **[ANTHROPIC] Let it delegate to sub-agents (asynchronously) and give it a memory surface.** Use sub-agents frequently with explicit "when to delegate" guidance; give it a file to record learnings and tell it to consult that file next session.
10. **[ANTHROPIC] No assistant prefill; no `temperature`/`top_p`/`top_k`; requires 30-day data retention.** Steer format with a system-prompt instruction or structured outputs (`output_config.format`), not prefill. Handle the `refusal` stop reason and opt into a server-side fallback to Opus 4.8.

---

## 1. What Fable 5 is (authoritative facts)

[ANTHROPIC] From Anthropic's current model guidance:

| Property | Value |
|---|---|
| Model ID | `claude-fable-5` (Project Glasswing equivalent: `claude-mythos-5`) |
| Positioning | Most capable widely-released model; most demanding reasoning + long-horizon agentic work |
| Context / output | 1M tokens (max is also the default) / 128K max output |
| Thinking | **Always on.** Omit `thinking`, or `{type:"adaptive"}`. `disabled`/`budget_tokens` → 400 |
| Depth control | `output_config.effort`: `low` · `medium` · `high` (default) · `xhigh` · `max` |
| Reasoning visibility | Raw CoT never returned; `display:"summarized"` for a readable summary (default `"omitted"`) |
| Sampling params | `temperature`/`top_p`/`top_k` **removed** (400 if sent) — steer by prompting |
| Prefill | **Not supported** — use `output_config.format` or a system instruction |
| Refusals | Safety classifiers can return `stop_reason:"refusal"` — handle it; opt into `fallbacks` |
| Data retention | Requires 30-day retention (not available under ZDR) |
| Tokenizer | Same as Opus 4.8 (counts ≈ unchanged migrating from Opus 4.7/4.8) |

---

## 2. The three shifts that change how you prompt Fable 5

[ANTHROPIC] These are the deltas that matter most versus prior models.

**Shift 1 — Longer turns by default.** Individual requests on hard tasks can run many minutes at higher effort (gather context → build → self-verify). Structure work so the human checks in *asynchronously* rather than blocking inside one request. On ambiguous tasks, add an **anti-overplanning** nudge so it acts once it has enough information (snippet in §5).

**Shift 2 — More literal, and more autonomous.** Fable 5 follows explicit instructions closely and won't silently generalize intent — so vague or under-specified prompts land worse. It also takes unrequested-but-adjacent actions unless boundaries are stated. Give it the full spec + the *reason*, and state what it should *not* do.

**Shift 3 — Less is more (de-prescribe).** Anthropic explicitly: prompts/skills written for prior models are "often too prescriptive and reduce output quality." A/B the workload with older step-by-step scaffolding removed. Prefer **goal + constraints + success criteria** over an enumerated procedure. This is the opposite of the instinct built up on weaker models.

---

## 3. Universal prompting principles (Anthropic) — with Fable 5 deltas

[ANTHROPIC] Anthropic's standing prompt-engineering guidance still applies; note the Fable-5-specific deltas.

- **Be clear and direct; give context and motivation.** Explain *why* a rule exists — Fable 5 uses intent to make better choices. (Delta: this matters more, not less, on Fable 5.)
- **Use a system prompt for role/persona.** Put durable identity, standards, and constraints in the system prompt; keep it frozen for prompt-cache efficiency.
- **Structure with XML-style tags** (`<task>`, `<constraints>`, `<context>`, `<output_format>`, `<verification>`). Improves parse-ability and lets you reference sections. [GEN] Long documents go near the *top* of the prompt, task/question after them.
- **Examples (multishot)** steer format and edge-case handling. (Delta: Fable 5 can often match a described format *without* examples — describe the format; add 1–2 examples only for genuinely ambiguous shapes.)
- **Control output format** by instruction or structured outputs (`output_config.format`). (Delta: **no prefill** — do not force format with a trailing assistant turn.)
- **Chain-of-thought = `effort`, not a token budget.** Raise `effort` for harder reasoning instead of `budget_tokens` (which 400s). Set `thinking.display:"summarized"` if you surface reasoning to a user.
- **Positive instructions beat negative ones** — tell it what to do; when you must forbid something, be concrete about the bar (not "don't be verbose" but "lead with the outcome; drop details that don't change what the reader does next").

---

## 4. Structuring a long-horizon agentic master prompt (Anthropic)

[ANTHROPIC] For long, autonomous work Fable 5 does best with **the full task specification up front, in one well-specified first turn, at `high`/`xhigh` effort.** The recommended shape:

1. **Role / standards** (system prompt) — who it is, the quality bar, the guardrails.
2. **The goal + the reason** — the outcome and *what it enables for whom* (§5 "give the reason").
3. **Constraints & boundaries** — what it must not touch; when to stop and report vs. act.
4. **Resources & tools** — where the data/spec/files are; sub-agent + memory availability.
5. **Success criteria / "definition of done"** — gradeable, not vibes. (In Claude Code this is `/goal`; in Managed Agents it's an **Outcome** with a rubric — an iterate→grade→revise loop.)
6. **Self-verification** — tell it to establish and run its own checking harness on a cadence; separate fresh-context verifier sub-agents beat self-critique.
7. **Communication style** — how the final report should read (outcome-first, re-grounded for a reader who didn't watch).

Keep it goal-and-constraints, not a micromanaged step list (Shift 3).

---

## 4b. Long-context + coding-harness techniques (Anthropic)

[ANTHROPIC] Corroborated by Anthropic's dedicated "Prompting Claude Fable 5" doc and the engineering blog (harnesses / context engineering):

- **Long documents go at the TOP** of the prompt, above the task/question, each wrapped in `<document index="n"><source>…</source><document_content>…</document_content></document>`. Anthropic reports queries-at-the-end can improve quality **up to ~30%** on complex multi-doc inputs.
- **Quote-first grounding:** ask the model to extract the relevant passages into `<quotes>` *before* answering — cuts hallucination on long inputs.
- **Investigate before answering (code):** *"Never speculate about code you have not opened; you must read the file before answering."* Reduces confident-but-wrong claims.
- **Tests-first, one feature at a time:** put tests in a structured file (e.g. `tests.json`), mark features "failing", implement one at a time, **commit after each**, and never edit/remove tests to make them pass. Mandate **end-to-end** verification — without it the model can call a feature done that doesn't actually work.
- **Git + progress files as state:** Fable 5 is strong at discovering state from the filesystem and using git across sessions — often prefer a fresh window + progress file over compaction.
- **Fresh-context verifier sub-agents beat self-critique;** return distilled 1–2K-token summaries from sub-agents to keep the orchestrator's context lean ("smallest set of high-signal tokens").
- **"Right altitude" system prompt:** specific enough to guide, flexible enough to leave heuristics — avoid both brittle hardcoded logic and vague generalities.

---

## 5. The prompt-tunable behavioral snippets (paste these)

[ANTHROPIC] Anthropic publishes these near-verbatim as the Fable-5 prompt levers. Include the ones your task needs.

**Anti-overplanning (ambiguous tasks):**
> When you have enough information to act, act. Do not re-derive facts already established in the conversation, re-litigate a decision already made, or narrate options you won't pursue. If you're weighing a choice, give a recommendation, not an exhaustive survey. (This does not apply to thinking blocks.)

**No-tidying / YAGNI (higher effort can over-build):**
> Don't add features, refactor, or introduce abstractions beyond what the task requires. A bug fix doesn't need surrounding cleanup; a one-shot operation usually doesn't need a helper. Do the simplest thing that works well. Don't add error handling or validation for scenarios that can't happen; only validate at system boundaries.

**Lead with the outcome (readability):**
> Lead with the outcome. Your first sentence should answer "what happened" or "what did you find." Supporting detail comes after. Readability matters more than brevity; keep it short by being selective about what you include, not by compressing into fragments, arrow-chains, or jargon.

**Ground progress claims (long runs):**
> Before reporting progress, audit each claim against a tool result from this session. Only report work you can point to evidence for; if something isn't verified, say so. If tests fail, say so with the output; if a step was skipped, say that.

**State boundaries (stop vs act):**
> When the user is describing a problem, asking a question, or thinking out loud rather than requesting a change, the deliverable is your assessment — report findings and stop; don't apply a fix until asked. Before a state-changing command (restart, delete, config edit), check the evidence supports that specific action.

**Autonomy on small choices (cut ask-rate):**
> For minor choices (naming, formatting, defaults, which of two equivalent approaches), pick a reasonable option and note it rather than asking. For scope changes or destructive actions, still ask first.

**Give the reason (frame every request):**
> I'm working on [the larger task] for [who it's for]. They need [what the output enables]. With that in mind: [request].

**Delegation (async sub-agents):**
> Delegate independent subtasks to sub-agents and keep working while they run. Intervene if a sub-agent goes off track or is missing context.

**Memory surface:**
> Store one lesson per file with a one-line summary at the top. Record corrections and confirmed approaches alike, and why they mattered. Don't save what the repo or chat history already records; update an existing note rather than duplicating; delete notes that turn out wrong.

**Autonomous no-early-stop (unattended pipelines):**
> You are operating autonomously; the user isn't watching in real time. For reversible actions that follow from the request, proceed without asking. Before ending your turn, check your last paragraph — if it's a plan, a question, or a promise ("I'll…"), do that work now with tool calls. End only when the task is complete or you're blocked on input only the user can provide.

---

## 6. Parameters cheat-sheet (Fable 5)

[ANTHROPIC]
- **Model:** `claude-fable-5`.
- **Effort:** `output_config: { effort: "high" }` for most; `xhigh` for the hardest coding/agentic; sweep `low`/`medium` for routine sub-tasks. Default is `high`.
- **Thinking:** omit it, or `thinking: { type: "adaptive", display: "summarized" }` if you show reasoning. Never `disabled`/`budget_tokens`.
- **No** `temperature`/`top_p`/`top_k` (400). **No** assistant prefill.
- **Long output:** `max_tokens` up to 128K → **stream** (`.stream()` + `.get_final_message()`), or you'll hit HTTP timeouts.
- **Refusal safety net:** `betas:["server-side-fallback-2026-06-01"]` + `fallbacks:[{model:"claude-opus-4-8"}]`; always check `stop_reason` before reading `content`.
- **Task budget (optional, agentic):** `output_config.task_budget:{type:"tokens", total:N}` (beta `task-budgets-2026-03-13`, min 20K) so it self-paces a long loop.
- **Retention:** org must allow ≥30-day retention or every request 400s.

---

## 7. Anti-patterns (what *reduces* Fable 5 quality)

[ANTHROPIC] / [GEN]
- ❌ Porting a prior-model prompt full of `CRITICAL: YOU MUST` / enumerated micro-steps → over-triggers and lowers quality. **De-prescribe.**
- ❌ Under-specifying the goal and dribbling context across turns → worse output *and* more tokens. **Full spec, one turn, plus the reason.**
- ❌ Forcing format with a trailing assistant prefill → 400. Use a format instruction / structured outputs.
- ❌ `temperature`/`budget_tokens`/`thinking:disabled` → 400.
- ❌ Blocking synchronously on a minutes-long turn with a short timeout → truncated/timeout. Stream + async.
- ❌ Suppressing sub-agents (a common prior-model guardrail) → wastes Fable 5's strong parallel delegation. Instead say *when* to delegate.
- ❌ Showing an explicit remaining-token countdown → can trigger "context anxiety." Avoid, or add the "you have ample context" reassurance.
- ❌ **Asking the model to echo/transcribe its reasoning as response text** → can trigger a `reasoning_extraction` refusal (and fallback). Read the summarized `thinking` blocks instead of prompting for reasoning.

---

## 8. Reusable master-prompt skeleton (Fable 5)

```
[SYSTEM PROMPT]
You are <role> operating at <quality bar>. <Durable standards / guardrails.>
Communication style: lead with the outcome; audit progress claims against tool
results; report findings and stop when I'm describing a problem rather than
requesting a change. For minor choices, pick a reasonable option and note it.

[FIRST USER TURN — the whole task, one turn]
<why> I'm working on <larger task> for <who>. They need <what it enables>.

<goal> <One-paragraph outcome — what "done" looks like.>

<constraints>
- <what must NOT be touched>
- <hard rules / non-negotiables>
</constraints>

<resources>
- Spec/data/files at: <paths>
- You may spawn sub-agents for independent subtasks and keep working.
- Record learnings to <memory file> and consult it next session.
</resources>

<definition_of_done>
- <gradeable criterion 1>
- <gradeable criterion 2>
- Verify: <the exact command/check that proves done>
</definition_of_done>

<scope_discipline>
Do the simplest thing that meets the goal; don't add abstractions, features, or
error handling for cases that can't happen. State the goal is met with evidence.
</scope_discipline>
```
Run at `effort:"high"` (or `xhigh`), stream, opt into the Opus-4.8 fallback.

---

## Sources

- [ANTHROPIC] **Prompting Claude Fable 5** (dedicated doc) — `https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5`
- [ANTHROPIC] Prompting best practices — `https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices`
- [ANTHROPIC] Introducing Claude Fable 5 — `https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5.md`
- [ANTHROPIC] Models Overview (Fable 5 identity, context, pricing) — `https://platform.claude.com/docs/en/about-claude/models/overview.md`
- [ANTHROPIC] Migration Guide → "Migrating to Claude Fable 5" (breaking changes + the behavioral-shift prompt snippets) — `https://platform.claude.com/docs/en/about-claude/models/migration-guide.md`
- [ANTHROPIC] Adaptive Thinking / Effort — `https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking.md`, `.../effort.md`
- [ANTHROPIC] Effective harnesses for long-running agents — `https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents`
- [ANTHROPIC] Effective context engineering for AI agents — `https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents`
- [ANTHROPIC] Best practices for Claude Code — `https://www.anthropic.com/engineering/claude-code-best-practices`
- [ANTHROPIC] Claude Fable (product/positioning) — `https://www.anthropic.com/claude/fable`
- [ANTHROPIC] Task Budgets, refusal fallbacks, structured outputs — Migration Guide + `build-with-claude` docs (as above)

> **Unverified flag:** a secondary web-search summary alleged a later export-control suspension of Fable 5/Mythos 5 for foreign nationals. This is **not corroborated in Anthropic's own docs** and should be treated as unconfirmed.

> **Note on sourcing:** the highest-signal, most-actionable guidance here is Anthropic's own Fable-5 migration/behavior section (the prompt snippets in §5 are published near-verbatim by Anthropic). General prompt-engineering principles (§3) are long-standing Anthropic guidance; where Fable 5 changes them, the delta is flagged. Fable-5-specific claims should be re-verified against the live docs above, since model guidance evolves.
