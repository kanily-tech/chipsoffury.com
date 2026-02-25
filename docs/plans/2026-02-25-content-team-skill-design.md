# Content Team Skill — Design Document

Date: 2026-02-25

## Overview

A generic agent team skill for content creation and optimization. The team is orchestrated by a Content Director (the main Claude instance) who spawns up to 5 specialized teammates. The skill is task-agnostic — it handles new articles, SEO reworks, visual refreshes, and any other content project through a plan-first workflow.

Coexists alongside `poker-article-agent-team`, which remains the specialized skill for poker article writing. `content-team` is the general-purpose content production skill.

## Team Architecture

```
Main Instance = Content Director
├── Teammate: Researcher         (general-purpose agent)
├── Teammate: SEO Specialist     (general-purpose agent)
├── Teammate: Writer             (general-purpose agent, uses blog-writer skill)
├── Teammate: Editor             (general-purpose agent)
└── Teammate: Visual Designer    (general-purpose agent, uses generate-image command)
```

All 5 roles are **teammates** (not subagents). This gives them:
- Context continuity for follow-up requests ("dig deeper into X")
- Ability to participate in iterative discussions
- Persistent memory of their prior work within the session

All teammates write key outputs to a **shared workspace** so any role can read any other role's work without the Director relaying everything.

### Shared Workspace

Location: `.content-team/<task-slug>/`

```
.content-team/<task-slug>/
├── plan.md              ← Director's task plan (written before spawning)
├── research.md          ← Researcher's findings
├── seo-brief.md         ← SEO Specialist's analysis
├── editor-notes.md      ← Editor's feedback per round (appended)
└── visual-concepts.md   ← Designer's proposals (before generation)
```

Final deliverables go to their proper project locations — articles in `learn/` or `blog/`, images in `images/<post_url>/`.

The workspace directory should be gitignored.

## Role Definitions

### Content Director (Main Instance)

- Reads requirements, references existing files, understands full scope
- Writes the task plan and gets user approval before spawning anyone
- Spawns teammates, assigns initial tasks via messages
- Routes information between roles (sends research summary to writer, content outline to designer, etc.)
- Reviews all outputs — acts as quality gate
- Does final integration (assembling everything into the article file)
- **Never writes article content directly** — delegates to Writer
- Holds the **"standout resource" quality bar** (see Quality Culture below)

### Researcher

- Expert at discovering **user intent** — what real people actually want to know
- Primary sources: Reddit threads, forums, Quora, community discussions
- Secondary: competitor articles, YouTube comments, "People Also Ask" boxes
- Writes findings to `research.md` with structure:
  - Top questions/pain points found (with source links)
  - Common misconceptions
  - Gaps in existing content (what competitors miss)
  - Suggested angles/hooks
- Can be asked follow-ups ("dig deeper into X", "find examples of Y")

### SEO Specialist

- Keyword research: primary, secondary, long-tail opportunities
- SERP analysis: who ranks, what they cover, where the gaps are
- Title tag and meta description recommendations
- Schema markup suggestions (FAQ, HowTo, etc.)
- Internal linking opportunities
- Content structure recommendations (H2/H3 hierarchy for SEO)
- Writes findings to `seo-brief.md`

### Writer

- Uses the **blog-writer skill** for voice and style rules
- Works from research + SEO brief + Director's content plan
- Handles both new writing and restructuring existing content
- Implements structural changes (moving sections, adding TL;DR boxes, etc.)
- Writes directly to the target article file
- Participates in revision loop with Editor (up to 3 rounds)
- Has access to all project skills — Director can instruct use of glossarize, ymyl-editor, etc. as needed

### Editor

- Reviews Writer's output for: clarity, flow, voice consistency, redundancy, audience fit
- Provides structured feedback:
  - **Must Fix**: factual issues, confusing passages, voice violations
  - **Should Fix**: awkward phrasing, pacing issues, redundancy
  - **Nice to Have**: polish suggestions
- Writes feedback to `editor-notes.md` (each round appended)
- After 3 rounds, remaining issues escalate to Director

### Visual Designer

- Analyzes content to identify where visuals add value (not decoration)
- Proposes concepts in `visual-concepts.md` with:
  - What the image communicates
  - Where it goes in the article
  - Detailed generation prompt
  - Suggested alt text
- **Waits for Director approval** before generating anything
- Follows brand guidelines from `ai_docs/article-image-style.md`
- Uses `generate-image` command (default model)
- Converts PNG to WebP via `cwebp` at quality 85, removes original PNG
- Saves images to `images/<post_url>/<image_name>.webp`
- Saves prompts to `images/<post_url>/<image_name>.prompt.md`

## Quality Culture

### Director: "Standout Resource" Standard

The Director doesn't just coordinate — they hold the quality bar. Two specific behaviors:

- **Proactive research trigger**: If the Director senses a section relies on generic knowledge that any AI could produce, they should ask the Researcher to dig deeper — even if the original requirements didn't explicitly ask for research. Common knowledge doesn't create standout content. The Director's judgment call: "Would a knowledgeable reader learn something new here, or is this just filler?"
- **Explicit research requests**: When the prompt specifically asks for research, the Researcher is always invoked. No shortcuts.

### Visual Designer: "Diverge Then Converge"

The Designer's creative process has two distinct modes:

- **Ideation (diverge)**: Generate ideas freely. Weird angles, unexpected visual metaphors, unconventional formats. No self-editing during brainstorming. Put everything in `visual-concepts.md`.
- **Refinement (converge)**: Director reviews the ideas, discusses with Designer, and they narrow down together. Some ideas get killed, some get combined, the best ones get polished into generation prompts.

The Designer should never show up with just one safe, predictable idea. The Director should never kill ideas without explaining why.

## Workflow: Plan-First with Guardrails

### Director Playbook

```
1. INTAKE
   Director reads requirements + referenced files
   Director identifies task type and scope

2. PLAN
   Director writes plan.md:
     - Goal summary
     - Which roles are needed (and which aren't)
     - What each role should produce
     - Execution order and dependencies
     - Success criteria
   Director presents plan to user → waits for approval

3. SPAWN & RESEARCH (parallel where possible)
   Director creates team, spawns needed roles
   Researcher + SEO Specialist start in parallel (if both needed)
   Each writes to their shared file when done
   Director reviews outputs, may ask follow-ups

4. BRIEF THE WRITER
   Director sends Writer a synthesis message:
     - Content plan (what to write/restructure)
     - Key points from research.md
     - SEO requirements from seo-brief.md
     - Structural directives (move sections, add TL;DR, etc.)
   Writer begins working on the article file

5. WRITER ↔ EDITOR LOOP (max 3 rounds)
   Writer completes draft → messages Director
   Director messages Editor to review
   Editor reads article, writes feedback to editor-notes.md
   Editor messages Writer with feedback
   Writer revises → loop repeats (up to 3 rounds)
   Remaining issues after round 3 go to Director

6. VISUAL DESIGN (can overlap with writing)
   Director messages Designer with content context
   Designer reads the article, proposes concepts in visual-concepts.md
   Designer messages Director with proposals
   Director approves/rejects/adjusts via discussion
   Designer generates approved images, converts to WebP
   Designer messages Director with file paths

7. FINAL INTEGRATION
   Director reads the final article + reviews all outputs
   Director makes final edits (image references, meta tags, schema, etc.)
   Director does a quality check against the original requirements
   Director reports results to user
   Director shuts down teammates
```

### Parallel Execution Windows

```
Timeline:
─────────────────────────────────────────────────
Phase    │ Researcher    │ SEO         │ Writer   │ Editor   │ Designer
─────────────────────────────────────────────────
Research │ ████████████  │ ████████████│          │          │
Brief    │              │             │          │          │
Write R1 │              │             │ ████████ │          │
Edit R1  │              │             │          │ ████████ │
Write R2 │              │             │ ████████ │          │
Edit R2  │              │             │          │ ████████ │
Visuals  │              │             │          │          │ ████████████
Approve  │              │             │          │          │    ██
Generate │              │             │          │          │ ████████
─────────────────────────────────────────────────
```

- Research and SEO run in parallel
- Visual design can start once the first draft exists (doesn't need final copy)
- Researcher can be pulled back for follow-ups during writing if needed

### Guardrails

Soft rules the Director enforces regardless of task type:

1. Research completes before writing begins (when research is needed)
2. SEO brief available before writer starts (when SEO work is needed)
3. Designer shares concepts and prompts → Director approves → then generates images
4. Writer ↔ Editor revision loop capped at 3 rounds
5. Director reviews all final outputs before declaring done

### Handling Different Task Types

**"Implement this SEO review":**
- Skip or minimize Researcher (the review IS the research)
- SEO Specialist: validate/expand keyword recommendations
- Writer + Editor: restructure and rewrite per the review
- Designer: create infographics called for in the review

**"Write a new article about X":**
- Full pipeline: Researcher + SEO → Writer + Editor → Designer

**"Add visuals to this existing article":**
- Skip Researcher, SEO, Writer, Editor
- Designer only, working from existing content

**"Refresh/update this old article":**
- Researcher: what's changed since publication?
- SEO: current ranking, keyword shifts
- Writer + Editor: targeted updates
- Designer: if visuals are stale

## Skill File Structure

```
.claude/skills/content-team/
├── SKILL.md                    ← Main skill file (Director's playbook)
└── references/
    ├── role-prompts.md         ← Teammate spawn prompts for each role
    └── plan-template.md        ← Template for task plan
```

### What the Skill Does NOT Contain

- No poker-specific logic (that stays in `poker-article-agent-team`)
- No hardcoded phase order (Director decides via plan)
- No specific article structure requirements (comes from the task input)
- No glossarize or YMYL integration baked in (Writer can use them when the Director's plan says to)

The skill is generic; the plan makes it specific.

### Prerequisites

- `ai_docs/article-image-style.md` must have brand guidelines content before the Visual Designer role can be effective for image generation.

## Communication Rules for Teammates

Each teammate prompt should include:
1. Their role description and responsibilities
2. The shared workspace path (so they know where to read/write)
3. The task plan (so they understand the bigger picture)
4. Instruction to write outputs to their designated file
5. Instruction to message the Director when they complete a deliverable or need input
