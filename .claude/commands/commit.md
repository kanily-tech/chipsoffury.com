---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git branch:*), Bash(git commit:*)
description: Create a git commit with smart selection of files 
argument-hint: staged | all | relevant (default)
---

## Context

- Current git status: !`git status --porcelain`
- Current branch: !`git branch --show-current`
- Staged changes: !`git diff --cached --stat`
- Unstaged changes: !`git diff --stat`
- Full diff of changes: !`git diff HEAD`
- Recent commits for style reference: !`git log --oneline -5`

## Your task

Create a git commit based on the mode: $ARGUMENTS

Commit modes:
- **staged**: Only commit currently staged files
- **all**: Stage and commit all modified files (`git add -A`)
- **relevant** (default): Intelligently select files related to our session's work

Instructions:
1. Analyze the changes and our session discussion
2. For "relevant" mode, identify which files are related to the work we've done
3. Stage the appropriate files based on the selected mode
4. Create a commit message that:
   - Summarizes the changes concisely in the subject line
   - Has a detailed body ONLY for complex changes that need explanation (multiple features, breaking changes, non-obvious refactors)
   - For simple fixes and straightforward changes, use a single line that includes the "why" if not obvious
   - Follows the repository's commit message style
5. Show the commit message in a clearly highlighted format and ask for user confirmation before committing
   - Format:
     ```
     **COMMIT MESSAGE:**
     <actual commit message here>

     Proceed?
     ```
   - Do not include any explanation of the commit message

Don't add any co-authors or signatures.
