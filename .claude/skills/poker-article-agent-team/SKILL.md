---
name: poker-article-agent-team
description: Orchestrate an agent team to expand and refine beginner poker articles from existing outlines/drafts, with SEO alignment, web and Reddit research, writer-editor revision loops, and final fact checks. Use when given a markdown article path (especially learn/*.md) and asked to produce a simple, non-redundant, beginner-friendly final draft.
---

# Poker Article Agent Team

## Overview

Run a repeatable multi-agent workflow for beginner poker blog articles where the draft already exists. Coordinate SEO, research, writing, editing, and fact-checking so the final article is simple for RICP beginners and grounded in real beginner questions from Reddit and the broader web.

## Inputs

Collect these inputs before starting:
- `article_path` (required): markdown file to improve, for example `learn/0021-texas-holdem-rules-beginner-guide.md`
- `primary_keyword` (optional): main target keyword if not obvious in draft
- `secondary_keywords` (optional): supporting SEO terms
- `audience` (default): RICP beginner poker players
- `complexity_cap` (default): beginner-friendly, no advanced strategy depth unless explicitly requested

## Team Structure

Use one lead plus five teammates:
1. `SEO Lead`: check search intent, heading coverage, keyword placement, internal link opportunities, and metadata recommendations.
2. `Community Researcher`: gather real beginner questions and confusion points from Reddit plus supporting web sources.
3. `Writer`: expand and rewrite article in simple language; must use the `blog-writer` skill.
4. `Beginner Editor`: enforce clarity and simplicity, remove redundancy, and provide revision feedback to writer.
5. `Fact Checker`: verify poker rules/terms and spot factual mistakes or overclaims.

Do not add a publisher/content-ops role in this workflow.

## Setup Steps

1. Confirm `article_path` exists and contains frontmatter + draft body.
2. Ensure agent teams are enabled (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in environment or settings).
3. Create an agent team with the five teammates above.
4. Keep lead focused on orchestration and synthesis; avoid lead doing the writing pass.
5. Read `references/team-prompts.md` and use those prompts when spawning teammates.

## Kickoff Prompt Template

Use this starter prompt for the lead:

```text
Create an agent team to refine this article: {{article_path}}.

Team roles:
- SEO Lead
- Community Researcher
- Writer (must use blog-writer skill)
- Beginner Editor
- Fact Checker

Process requirements:
- Research beginner questions from Reddit first, plus web sources.
- Keep writing simple for RICP beginner poker players.
- Run writer/editor revision loops until no major clarity or redundancy issues remain.
- Run final fact-check and SEO gate before finalizing.
- Return final updated article and a concise completion summary with sources used.
```

## Workflow

Run phases in order:

1. `Intake`
- Lead reads article and extracts current structure, gaps, and difficulty level.
- Lead creates a task list with clear deliverables per teammate.

2. `Parallel research`
- SEO Lead maps target intent and identifies missing sections/subtopics.
- Community Researcher collects beginner questions from Reddit and corroborating web sources.
- Fact Checker notes obvious rule/terminology risks in current draft.

3. `Draft expansion`
- Writer applies `blog-writer` skill and produces the first full rewrite/expansion using research findings.
- Keep tone practical and simple. Avoid advanced jargon unless defined inline.

4. `Editor-writer loop`
- Beginner Editor reviews for clarity, simplicity, flow, and redundancy.
- Editor returns structured feedback: `Must Fix`, `Should Fix`, `Nice to Have`.
- Writer revises based on feedback.
- Repeat until editor marks article as acceptable or no further material improvements remain.

5. `Fact and SEO gate`
- Fact Checker verifies rules and claims after final rewrite.
- SEO Lead runs final on-page check to ensure intent coverage without keyword stuffing.

6. `Finalize`
- Lead merges approved edits into the target article.
- Lead produces final summary report using the template in `references/team-prompts.md`.

## Quality Gates

Do not finish until all gates pass:
1. Beginner-first clarity: a new poker player can follow each section.
2. No redundancy: repeated explanations are merged or removed.
3. SEO quality: headings and content match search intent naturally.
4. Research-grounded: major beginner concerns from Reddit/web are addressed.
5. Accuracy: poker rules/terminology are fact-checked.

## Output Contract

Return:
1. Updated article content in `article_path`.
2. A concise summary with:
- What changed (top structural/content improvements).
- Which Reddit/web beginner questions were incorporated.
- SEO improvements made.
- Fact corrections made.
- Remaining risks or unresolved questions (if any).

## Notes

- Prioritize practical examples over theory-heavy explanations.
- Prefer short paragraphs and concrete language for beginners.
- If teammate outputs conflict, lead chooses the simpler wording that remains accurate.
