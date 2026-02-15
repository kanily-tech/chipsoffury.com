---
name: poker-article-agent-team
description: Orchestrate an agent team to expand and refine beginner poker articles from existing outlines/drafts, with SEO alignment, web and Reddit research, writer-editor revision loops, and final fact checks. Use when given a markdown article path (especially learn/*.md) and asked to produce a simple, non-redundant, beginner-friendly final draft.
---

# Poker Article Agent Team

## Overview

Run a repeatable multi-agent workflow for beginner poker blog articles where the draft already exists. Coordinate research, writing, editing, and quality checks so the final article is a standout resource that ranks above competing content — simple for beginners, grounded in real questions, and written with genuine voice.

## Inputs

Collect these inputs before starting:
- `article_path` (required): markdown file to improve, for example `learn/0021-texas-holdem-rules-beginner-guide.md`
- `primary_keyword` (optional): main target keyword if not obvious in draft
- `secondary_keywords` (optional): supporting SEO terms
- `audience` (default): RICP beginner poker players — casual players, not casino grinders
- `complexity_cap` (default): beginner-friendly, no advanced strategy depth unless explicitly requested

## Architecture: Hybrid Subagent + Agent Team

Not every role needs peer-to-peer collaboration. Use agent teams only where back-and-forth discussion adds value (the writer-editor loop). Use subagents for focused tasks that produce a deliverable and report back.

### Why hybrid?

- Agent teams use significantly more tokens — each teammate is a separate Claude instance.
- Subagents are cheaper and faster for fire-and-forget research tasks.
- The writer-editor revision loop is the one place genuine collaboration matters.

### Roles

| Role | Type | Why |
|---|---|---|
| **Lead** | Orchestrator (delegate mode) | Coordinates phases, synthesizes research, merges final output. Does NOT write the article. |
| **SEO + Competitive Analyst** | Subagent (Phase 1) | Produces a research report and is done. No collaboration needed. |
| **Community Researcher** | Subagent (Phase 1) | Produces a research report and is done. No collaboration needed. |
| **Writer** | Teammate (Phase 2) | Needs back-and-forth with Editor. Must use `blog-writer` skill. |
| **Beginner Editor** | Teammate (Phase 2) | Needs back-and-forth with Writer. Enforces clarity and simplicity. |
| **Fact Checker + YMYL Reviewer** | Subagent (Phase 3) | Reviews final draft and reports issues. No collaboration needed. |

## Setup Steps

1. Confirm `article_path` exists and contains frontmatter + draft body.
2. Ensure agent teams are enabled (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in environment or settings).
3. Read `references/team-prompts.md` and use those prompts when spawning subagents and teammates.
4. Use **delegate mode** for the lead (Shift+Tab after team creation) to prevent the lead from writing the article itself.

## Workflow

### Phase 1: Parallel Research (subagents)

Spawn three subagents in parallel. Each reports back to the lead.

**1a. SEO + Competitive Analysis** (`subagent_type: Explore`)
- Search the primary keyword and read the top 3-5 ranking articles.
- Identify table-stakes content (what every competitor covers — must include).
- Identify content gaps (what competitors miss — differentiation opportunity).
- Map search intent, heading coverage gaps, and natural keyword placement.
- Identify internal linking opportunities, including `glossary:term` links.

**1b. Community Research** (`subagent_type: Explore`)
- Research beginner questions about the article's specific topic (not hardcoded to Texas Hold'em).
- Search Reddit and broader web for recurring confusion points.
- Deliver: top questions, source links, suggested placement in article, plain-language resolutions.

**1c. Initial Draft Review** (`subagent_type: Explore`)
- Read the current draft and flag obvious factual errors, terminology mistakes, or overclaims.
- Note areas where the draft is too advanced for beginners.
- Deliver: list of issues with locations and suggested corrections.

**Lead waits for all three subagents to complete before proceeding.**

### Phase 2: Writing (agent team — Writer + Editor)

Create the agent team with two teammates. Pass all Phase 1 research findings into the Writer's spawn prompt as context.

**2a. Writer produces first full rewrite**
- Use the `blog-writer` skill (invoke it before writing).
- Use the `glossarize` skill to add glossary links for poker terms.
- Incorporate competitive gaps as differentiation opportunities.
- Address the top beginner questions from community research.
- Follow the voice guidance below.

**2b. Editor-Writer revision loop**
- Beginner Editor reviews for clarity, simplicity, flow, and redundancy.
- Editor returns structured feedback: `Must Fix`, `Should Fix`, `Nice to Have`.
- Writer revises based on feedback.
- **Cap at 3 rounds.** If Must Fix items remain after round 3, the lead intervenes to resolve.

**Writer and Editor communicate via direct messaging.** The lead monitors but does not write.

### Phase 3: Final Gates (subagents)

After the editor approves the draft, spawn two subagents in parallel:

**3a. Fact Checker** (`subagent_type: Explore`)
- Verify all poker rules, hand flows, terminology, and claims in the final draft.
- Flag inaccuracies, ambiguities, and overclaims with exact corrections.

**3b. YMYL Reviewer** (`subagent_type: general-purpose`)
- Run the `ymyl-editor` skill on the final draft.
- Check E-E-A-T quality signals, responsible gambling language, and beginner protection.
- Return structured review with pass/fail and specific issues.

### Phase 4: Finalize (lead)

- Apply fact-check corrections and YMYL fixes to the article.
- Verify glossary links are applied (run `glossarize` if the Writer missed any).
- Produce the final summary report using the template in `references/team-prompts.md`.
- Shut down teammates and clean up the team.

## Voice Guidance for Writer

The Writer MUST follow these principles:

**DO:**
- Write with specificity. Real cards, real amounts, real situations. "You're holding A-7 offsuit in middle position and someone raises to 3x" beats "consider your hand strength."
- Have opinions when they're earned. If something is a bad idea, say so and say why. Don't hedge everything.
- Be honest about what's hard, what's boring, and what's beyond a beginner's concern right now.
- Let the topic dictate the structure. A rules explainer reads differently than a strategy piece. Don't force a single format.
- Write at the paragraph level. Some paragraphs are short, some aren't. Let the content decide, not a rhythm formula.

**DON'T:**
- Don't narrate what the article is doing. No "In this section we'll cover..." or "Now that we've discussed X, let's move to Y."
- Don't contrast yourself with other guides. The reader came here to learn poker, not to hear about other websites.
- Don't force a home-game framing where it doesn't fit. Know the audience (casual players, not grinders) but don't shoehorn every example into someone's kitchen.
- Don't write in staccato one-liners. That's LinkedIn, not a poker guide. Vary sentence length naturally.
- Don't soften everything with "you may want to consider" or "it can be helpful to." Just say it.

## Quality Gates

Do not finish until all gates pass:
1. **Beginner-first clarity**: a new poker player can follow each section.
2. **No redundancy**: repeated explanations are merged or removed.
3. **Competitive edge**: the article covers something the top-ranking competitors miss.
4. **Research-grounded**: major beginner concerns from Reddit/web are addressed.
5. **Accuracy**: poker rules/terminology are fact-checked.
6. **SEO quality**: headings and content match search intent naturally, glossary links are applied.
7. **YMYL compliance**: E-E-A-T signals present, no irresponsible claims.

## Output Contract

Return:
1. Updated article content in `article_path`.
2. A concise summary with:
   - What changed (top structural/content improvements).
   - Competitive differentiation (what this article covers that top competitors don't).
   - Which Reddit/web beginner questions were incorporated.
   - SEO improvements made (including glossary links added).
   - Fact corrections made.
   - YMYL review result.
   - Remaining risks or unresolved questions (if any).

## Notes

- Prioritize practical examples over theory-heavy explanations.
- If teammate outputs conflict, lead chooses the simpler wording that remains accurate.
- The lead should NOT write the article. Use delegate mode to enforce this.
- If the article topic is not Texas Hold'em, research prompts must target the actual topic.
