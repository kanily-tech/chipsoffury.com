# Pre-Game Checklist Tool: Problem Space Research

## Problem Statement

Every poker home game requires the host to communicate a surprising amount of information before the first card is
dealt: stakes, buy-in limits, rebuy rules, payment method, house rules, start/stop times, format, and who is banking. In
practice, this communication almost never happens comprehensively. Hosts either send a bare-bones group text ("poker
Saturday 7pm") or dump a wall of text that nobody reads. The result is the same: players show up with mismatched
expectations about stakes, rebuys, and rules, and the first 30 minutes of the game are spent negotiating details that
should have been settled days ago.

The existing blog content on Chips of Fury already addresses this gap with two complementary resources: the Pre-Game
Checklist in the buy-ins article (learn/0017) and the House Rules Card in the house rules article (learn/0018). Both are
static text templates designed to be copied into a group chat or printed. They cover the right information but in a
format that requires manual assembly -- the host has to mentally merge two different checklists, fill in blanks, and
format the result for their messaging app. Most hosts will not do this.

An interactive tool that walks the host through all the necessary decisions, pre-fills sensible defaults, and outputs a
clean, shareable summary would bridge the gap between "knowing what to communicate" and "actually communicating it."
This tool would serve as a natural conversion funnel from the two existing articles and as a standalone utility that
drives search traffic for queries like "poker night setup checklist" and "home game rules template."

## Key Pain Points

These pain points are synthesized from forum discussions on Poker Chip Forum, Reddit r/poker, poker strategy sites, and
community Q&A threads.

### 1. Mismatched Expectations About Stakes

The single most common source of home game friction. One player expects $20 stakes, the host announces $50, and someone
is immediately uncomfortable. Players with tighter budgets rarely speak up -- they just stop coming. Multiple forum
threads on Poker Chip
Forum ([home-game-cash-game-structure](https://www.pokerchipforum.com/threads/home-game-cash-game-structure.99612/), [home-game-rules](https://www.pokerchipforum.com/threads/home-game-rules.57803/))
confirm that stake communication is the number one thing hosts get wrong.

### 2. Unclear Rebuy and Add-On Rules

A perennial argument: can you rebuy? How many times? For how much -- the original buy-in or up to the big stack? Forums
document two opposing philosophies ("earn your stack" vs. "buy freedom") and the disputes that arise when the rule is
not explicit. Hosts
on [Poker Chip Forum](https://www.pokerchipforum.com/threads/what-are-your-rebuy-rules-for-cash-games.3723/) report that
rebuy ambiguity has caused players to leave mid-session and not return.

### 3. Settlement and Payment Confusion

The shift from cash to digital payments (Venmo, Zelle, Cash App) has introduced new friction: who sends to whom, when,
and using which payment category (friends/family vs. goods/services for tax implications). Forum threads
on [Venmo buy-ins](https://www.pokerchipforum.com/threads/venmo-buy-ins-and-cash-outs.44392/)
and [banking in a cashless society](https://www.pokerchipforum.com/threads/how-i-bank-at-a-home-game-in-an-increasingly-cashless-society.96935/)
show hosts struggling with end-of-night accounting. IOUs that linger are a recurring friendship-destroyer.

### 4. No Designated Floor / Dispute Resolution

When a rule question arises mid-hand and nobody has been designated as the decision-maker, play stops and arguments
start. Poker Chip
Forum's [hosting resources thread](https://www.pokerchipforum.com/threads/hosting-resources-posted-rules-etiquette.36508/)
emphasizes that naming a floor person (and a backup when the floor is in the hand) is critical but almost always
forgotten.

### 5. Timing and Logistics Gaps

Late arrivals, no hard stop, no break schedule. Players show up at different times, the game drags past midnight, and
regulars burn out.
The [home game dos and don'ts thread](https://www.pokerchipforum.com/threads/home-game-dos-and-donts.109287/) cites "not
posting a hard stop time" as a top hosting mistake.

### 6. House Rules Discovered Mid-Hand

String bets, verbal-is-binding, one-chip-rule, show-one-show-all -- these rules exist in the background until they cause
a dispute.
The [Upswing Poker guide](https://upswingpoker.com/10-things-you-must-know-before-playing-in-your-next-poker-home-game/)
lists 10 things to agree on before playing, and most home games address zero of them in advance.

### 7. Information Overload in Group Chats

Hosts who do try to communicate everything report that players simply do not read long messages. The Poker Chip
Forum [poker night message thread](https://www.pokerchipforum.com/threads/poker-night-message-text.85590/) documents
hosts reducing their invite text after realizing nobody reads multi-paragraph messages. One host noted they still get "
what's the address?" replies after sending messages that included the address.

## Existing Solutions

### Tournament Management Apps

| Tool                                                                                | Platform        | Focus                                      | Pre-Game Setup?           | Shareable Summary? |
|-------------------------------------------------------------------------------------|-----------------|--------------------------------------------|---------------------------|--------------------|
| [Poker Home Games](https://www.pokerhomegames.app/en/)                              | Web             | Tournament timer, blind structure, seating | Blind structure generator | No                 |
| [Home Poker Tournament Manager (HPTM)](https://hptm.eu/)                            | Windows/Mac/iOS | Full tournament management                 | Player/seat management    | No                 |
| [The Poker Timer](https://www.thepokertimer.com/)                                   | Web (cloud)     | Tournament clock                           | Saved structures          | No                 |
| [PokerBoss](https://apps.apple.com/us/app/pokerboss-tournament-manager/id647386788) | iOS             | Tournament timer + Airplay                 | Buy-in tracking           | No                 |
| [Blind Valet](https://blindvalet.com/)                                              | Web             | Multi-screen tournament clock              | Leaderboards              | No                 |
| [The Tournament Director](https://thetournamentdirector.net/)                       | Desktop         | Professional tournament management         | Full setup                | No                 |

**Gap:** These tools are designed for *during* the game (clocks, blind levels, seating). None of them generate a
pre-game communication summary that a host can share with players before the session.

### Settlement / Tracking Apps

| Tool                                                                                        | Platform | Focus                                    | Pre-Game? | Shareable?           |
|---------------------------------------------------------------------------------------------|----------|------------------------------------------|-----------|----------------------|
| [PokerSplit](https://www.pokersplit.org/)                                                   | Web      | End-of-night settlement calculator       | No        | Yes (game codes, QR) |
| [PokerBank](https://apps.apple.com/us/app/pokerbank-home-game-tracker/id6747364224)         | iOS      | Buy-in/cash-out tracking                 | No        | No                   |
| [Home Poker](https://apps.apple.com/us/app/home-poker-track-buy-ins/id6747361420)           | iOS      | Buy-in tracking with Venmo/CashApp links | No        | No                   |
| [HomeGame Poker Tracker](https://apps.apple.com/us/app/homegame-poker-tracker/id6749866036) | iOS      | Session management, ledger               | No        | No                   |
| [Bink](https://apps.apple.com/us/app/bink-poker-bankroll-tracker/id6445878829)              | iOS      | Bankroll tracking                        | No        | No                   |

**Gap:** These tools focus on *after* the game (settlement, tracking results). None help the host communicate game
parameters before the session.

### Invitation / Scheduling Tools

| Tool                                                                   | Type             | Poker-Specific?   | Game Details?             |
|------------------------------------------------------------------------|------------------|-------------------|---------------------------|
| [Hobnob](https://hobnob.io/invites/text-message-invitations-for-poker) | Text invite app  | Templates only    | No rules/stakes           |
| [Partiful](https://partiful.com)                                       | Event invite app | No                | Generic event fields      |
| [Band](https://band.us)                                                | Group app        | No                | Scheduling + RSVP         |
| Canva/PosterMyWall                                                     | Design tools     | Templates         | Visual only, no structure |
| Greetings Island                                                       | Invite cards     | Poker themes      | No game details           |
| Etsy templates                                                         | Printable PDFs   | Poker house rules | Static, not customizable  |

**Gap:** Invitation tools handle the social coordination (date, time, RSVP) but have no concept of poker-specific game
parameters. The Etsy printable PDFs are the closest to what we want, but they are static documents that cannot be
customized interactively or shared digitally as a formatted summary.

### Static Content (Articles/Guides)

| Source                                                                                                                                 | What It Offers                             |
|----------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| [Chips of Fury: Pre-Game Checklist](/learn/how-to-handle-poker-buy-ins-with-friends/)                                                  | Fill-in-the-blank text template            |
| [Chips of Fury: House Rules Card](/learn/poker-house-rules-to-keep-the-game-moving/)                                                   | Checkbox-style rules list                  |
| [Robert's Rules of Poker (PDF)](https://www.pagat.com/docs/RobsPkrRulesHome.pdf)                                                       | Comprehensive rulebook (too long to share) |
| [PokerListings: How to Run a Home Game](https://www.pokerlistings.com/blog/how-to-run-a-home-poker-game)                               | Long-form guide                            |
| [888poker: Setting Up the Perfect Home Game](https://www.888poker.com/magazine/poker-world/setting-up-the-perfect-home-game)           | Long-form guide                            |
| [Automatic Poker: Home Cash Game Setup](https://automaticpoker.com/lifestyle/home-poker-cash-game-setup-supplies-structure-and-rules/) | Supplies + structure guide                 |

**Gap:** Plenty of advice exists, but it lives in long articles that people read once and forget. Nobody copies a
checklist from a blog post into their group chat every session.

## What's Missing

The entire landscape reveals a clear gap: **no tool exists that bridges pre-game communication and poker-specific game
parameters.**

Specifically, what is missing:

1. **An interactive form that covers all pre-game decisions** -- stakes, rebuys, payment, house rules, timing, format --
   with sensible defaults so the host does not have to think from scratch.

2. **A shareable output optimized for group chats** -- a clean, concise, mobile-friendly summary that can be copy-pasted
   into iMessage, WhatsApp, Discord, or any group chat. Not a link to an app. Not a PDF. A block of formatted text that
   looks good in a chat bubble.

3. **Consolidation of the Pre-Game Checklist and House Rules Card** -- our two existing articles cover complementary
   aspects of pre-game setup, but a host would need to manually visit both pages, read through them, and assemble the
   relevant pieces. A single tool that merges both into one flow eliminates that friction.

4. **Smart defaults based on game type** -- cash games and tournaments have different parameter sets. A tool that
   shows/hides relevant sections based on the selected format avoids overwhelming the host with tournament-specific
   options when they are running a cash game.

5. **Education embedded in the tool** -- brief explainers on *why* each item matters (e.g., "Rebuy caps protect players
   who can't match deeper pockets") that link back to the full articles. This turns the tool into a learning experience,
   not just a form.

## User Behavior Insights

Research into how poker hosts actually communicate game details reveals several patterns:

1. **Group text/chat is the dominant medium.** WhatsApp, iMessage, Discord, and Facebook Messenger groups are where game
   details live. Dedicated poker apps (Band, Partiful) are used by a minority. Most hosts do not want to introduce a new
   app to their group.

2. **Less text is more.** Hosts who send detailed multi-paragraph messages report that players do not read them. The
   most effective invites are short: date, time, stakes, format, one or two house rule reminders. Detailed rules should
   be available but not forced into the initial message.

3. **Established groups need less information per session.** First-time or new-player games need the full checklist.
   Recurring games with the same group only need what has changed ("same as last time, but we're bumping blinds to
   0.50/1.00").

4. **RSVP is the host's biggest logistical headache.** Getting a headcount is harder than setting rules. Many forum
   threads focus more on "how do I get people to confirm?" than on rule-setting. A tool that integrates a headcount
   prompt would address a real pain point.

5. **Hosts want a "professional" look without effort.** Several forum members mention wanting their game to feel
   organized and well-run. A cleanly formatted rules summary gives the impression of a serious, well-hosted game --
   which attracts and retains players.

6. **Mobile-first is mandatory.** Game details are consumed on phones, in chat apps, while commuting or during lunch.
   Any output format must render well on a phone screen without requiring a click-through or app download.

## Recommended Tool Direction

The pre-game checklist tool should be a single-page interactive form on chipsoffury.com that walks the host through
every decision point for their upcoming game -- stakes, buy-in, rebuys, payment method, house rules, timing, and
format -- with smart defaults and collapsible sections. The primary output is a formatted text block optimized for
copy-pasting into any group chat, styled to look clean in a chat bubble on mobile. A secondary output could be a
shareable link or image for hosts who prefer that format. The tool should consolidate the Pre-Game Checklist (article
0017) and the House Rules Card (article 0018) into a single unified flow, with inline micro-explanations that link back
to the full articles for SEO and educational value. The scope should be deliberately limited to *pre-game
communication* -- not tournament clocks, not settlement calculators, not bankroll tracking. This focused scope avoids
competing with established tools and instead fills the gap that none of them address.
