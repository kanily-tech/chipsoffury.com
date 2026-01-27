# Hand Replay Component Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a visual hand-replay component and rewrite three beginner-friendly poker hands that teach the "Three Questions" decision framework.

**Architecture:** A WebC container (`hand-replay.webc`) holds multiple frame components (`hand-frame.webc`). Each frame shows one street of poker action with cards, pot, stacks, and a thought bubble. CSS in `tailwind-full.css` handles all styling using existing patterns.

**Tech Stack:** Eleventy WebC, Tailwind CSS with @apply directives, existing card images from `/images/cards/`

---

## Task 1: Create the hand-frame.webc Component

**Files:**
- Create: `_includes/components/hand-frame.webc`

**Step 1: Create the component file**

```html
<div class="hand-frame" :class="'hand-frame--' + street">
  <div class="hand-frame__header">
    <span class="hand-frame__street" @text="street.charAt(0).toUpperCase() + street.slice(1)"></span>
    <span class="hand-frame__pot">Pot: $<span @text="pot"></span></span>
  </div>

  <div class="hand-frame__table">
    <div class="hand-frame__board" webc:if="board">
      <img webc:for="card of board.split(',')"
           :src="'/images/cards/' + card.trim() + '.png'"
           :alt="card.trim()"
           class="hand-frame__card">
    </div>
    <div class="hand-frame__board hand-frame__board--empty" webc:if="!board">
      <span class="hand-frame__no-cards">No community cards yet</span>
    </div>

    <div class="hand-frame__players">
      <div class="hand-frame__player hand-frame__player--villain">
        <div class="hand-frame__position" @text="villainPosition || 'Villain'"></div>
        <div class="hand-frame__cards">
          <template webc:if="villainCards === 'hidden' || !villainCards">
            <img src="/images/cards/card_back.png" alt="Hidden" class="hand-frame__card">
            <img src="/images/cards/card_back.png" alt="Hidden" class="hand-frame__card">
          </template>
          <template webc:if="villainCards && villainCards !== 'hidden'">
            <img webc:for="card of villainCards.split(',')"
                 :src="'/images/cards/' + card.trim() + '.png'"
                 :alt="card.trim()"
                 class="hand-frame__card">
          </template>
        </div>
        <div class="hand-frame__stack">$<span @text="villainStack"></span></div>
      </div>

      <div class="hand-frame__player hand-frame__player--hero">
        <div class="hand-frame__position">YOU (<span @text="yourPosition"></span>)</div>
        <div class="hand-frame__cards">
          <img webc:for="card of yourCards.split(',')"
               :src="'/images/cards/' + card.trim() + '.png'"
               :alt="card.trim()"
               class="hand-frame__card">
        </div>
        <div class="hand-frame__stack">$<span @text="yourStack"></span></div>
      </div>
    </div>
  </div>

  <div class="hand-frame__thought" webc:if="thought">
    <span class="hand-frame__thought-icon">💭</span>
    <p @html="thought"></p>
  </div>

  <div class="hand-frame__actions">
    <div class="hand-frame__action" webc:if="action">
      <span class="hand-frame__action-icon">✓</span>
      <span @text="action"></span>
    </div>
    <div class="hand-frame__result" webc:if="result">
      <span class="hand-frame__result-icon">→</span>
      <span @text="result"></span>
    </div>
  </div>
</div>
```

**Step 2: Verify the file was created**

Run: `cat _includes/components/hand-frame.webc | head -20`
Expected: First 20 lines of the component

**Step 3: Commit**

```bash
git add _includes/components/hand-frame.webc
git commit -m "feat: add hand-frame.webc component skeleton"
```

---

## Task 2: Create the hand-replay.webc Container

**Files:**
- Create: `_includes/components/hand-replay.webc`

**Step 1: Create the container component**

```html
<div class="hand-replay">
  <h4 class="hand-replay__title" webc:if="title" @text="title"></h4>
  <div class="hand-replay__frames">
    <slot></slot>
  </div>
</div>
```

**Step 2: Verify the file was created**

Run: `cat _includes/components/hand-replay.webc`
Expected: The full container component

**Step 3: Commit**

```bash
git add _includes/components/hand-replay.webc
git commit -m "feat: add hand-replay.webc container component"
```

---

## Task 3: Add Component Styles to tailwind-full.css

**Files:**
- Modify: `css/tailwind-full.css` (append to end of file, before any closing comments)

**Step 1: Add the hand-replay styles**

Append the following CSS to `css/tailwind-full.css`:

```css
/* Hand Replay Component - Visual poker hand walkthroughs */
.hand-replay {
  @apply my-8;
}

.hand-replay__title {
  @apply text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200;
}

.hand-replay__frames {
  @apply space-y-4;
}

.hand-frame {
  @apply rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm;
}

.hand-frame__header {
  @apply flex justify-between items-center px-4 py-2 bg-gray-50 border-b border-gray-200;
}

.hand-frame__street {
  @apply text-sm font-semibold text-gray-600 uppercase tracking-wide;
}

.hand-frame__pot {
  @apply text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full;
}

.hand-frame__table {
  @apply p-4;
  background: linear-gradient(135deg, #1e5631 0%, #2d7a46 100%);
}

.hand-frame__board {
  @apply flex justify-center gap-1 mb-4 min-h-[52px] items-center;
}

.hand-frame__board--empty {
  @apply border-2 border-dashed border-white/30 rounded-lg py-3;
}

.hand-frame__no-cards {
  @apply text-white/60 text-sm italic;
}

.hand-frame__players {
  @apply flex justify-between items-start px-2;
}

.hand-frame__player {
  @apply text-center;
}

.hand-frame__position {
  @apply text-xs text-white/80 font-medium mb-1 uppercase tracking-wide;
}

.hand-frame__player--hero .hand-frame__position {
  @apply text-yellow-300 font-bold;
}

.hand-frame__cards {
  @apply flex gap-0.5 justify-center mb-1;
}

.hand-frame__card {
  width: 40px;
  height: auto;
  @apply rounded shadow-md;
}

.hand-frame__stack {
  @apply text-xs text-white font-medium bg-black/30 px-2 py-0.5 rounded-full inline-block;
}

.hand-frame__thought {
  @apply flex gap-3 p-4 bg-amber-50 border-t border-amber-200;
}

.hand-frame__thought-icon {
  @apply text-xl flex-shrink-0;
}

.hand-frame__thought p {
  @apply text-sm text-gray-700 leading-relaxed m-0;
}

.hand-frame__actions {
  @apply px-4 py-3 bg-gray-50 border-t border-gray-200 space-y-1;
}

.hand-frame__action,
.hand-frame__result {
  @apply flex items-center gap-2 text-sm;
}

.hand-frame__action-icon {
  @apply text-emerald-600 font-bold;
}

.hand-frame__result-icon {
  @apply text-gray-400;
}

/* Street-specific header colors */
.hand-frame--preflop .hand-frame__street {
  @apply text-blue-600;
}

.hand-frame--flop .hand-frame__street {
  @apply text-emerald-600;
}

.hand-frame--turn .hand-frame__street {
  @apply text-amber-600;
}

.hand-frame--river .hand-frame__street {
  @apply text-red-600;
}

/* Responsive: larger cards on bigger screens */
@media (min-width: 640px) {
  .hand-frame__card {
    width: 48px;
  }
}

@media (min-width: 768px) {
  .hand-frame__card {
    width: 56px;
  }

  .hand-frame__table {
    @apply p-6;
  }

  .hand-frame__thought {
    @apply p-5;
  }
}
```

**Step 2: Verify the styles were added**

Run: `grep -c "hand-frame" css/tailwind-full.css`
Expected: A number greater than 30 (confirming many rules were added)

**Step 3: Commit**

```bash
git add css/tailwind-full.css
git commit -m "feat: add hand-replay component styles"
```

---

## Task 4: Test Component with a Simple Example

**Files:**
- Create: `test-hand-replay.html` (temporary test file)

**Step 1: Create a test page**

```html
---
layout: layouts/base-tailwind.html
title: Hand Replay Test
---

<div class="max-w-2xl mx-auto py-8 px-4">
  <h1 class="text-2xl font-bold mb-6">Hand Replay Component Test</h1>

  <div class="not-prose">
    {% renderTemplate "webc" %}
    <hand-replay title="Test Hand: Pocket Aces">
      <hand-frame
        street="preflop"
        pot="3"
        board=""
        your-cards="as,ah"
        villain-cards="hidden"
        your-stack="200"
        villain-stack="200"
        your-position="BTN"
        villain-position="MP"
        thought="Pocket aces - the best starting hand in poker. I want to build a pot."
        action="You raise to $8"
        result="Villain calls">
      </hand-frame>

      <hand-frame
        street="flop"
        pot="19"
        board="kd,7c,2s"
        your-cards="as,ah"
        villain-cards="hidden"
        your-stack="192"
        villain-stack="192"
        your-position="BTN"
        villain-position="MP"
        thought="Great flop! No ace, but my aces are still the best hand. The board is dry - no flush draws, no obvious straights. I'm ahead."
        action="You bet $12"
        result="Villain calls">
      </hand-frame>
    </hand-replay>
    {% endrenderTemplate %}
  </div>
</div>
```

**Step 2: Run the dev server and verify**

Run: `npm start`
Then visit: `http://localhost:8080/test-hand-replay/`
Expected: A styled hand replay with two frames showing preflop and flop

**Step 3: Delete the test file (don't commit)**

Run: `rm test-hand-replay.html`

---

## Task 5: Write Hand 1 Content - "I'm Ahead — Bet for Value"

**Files:**
- Modify: `posts/0016-beginner-poker-strategy-how-to-win.md` (lines 552-589 approximately)

**Step 1: Replace Hand 1 section**

> **IMPORTANT:** Use the blog-writer skill when writing the thought bubbles and setup text.

Find the section starting with `### Hand 1: Value Betting a Premium (Pocket Kings)` and replace it with:

```markdown
### Hand 1: I'm Ahead — Bet for Value

You're playing a $1/$2 cash game with $200. You're on the [button](glossary:button) — the best seat at the table because you act last after the flop.

You look down at A♠A♥. Pocket aces. The best starting hand in poker.

A player in middle position calls the $2 [big blind](glossary:big-blind). Now it's your turn.

<div class="not-prose">
{% renderTemplate "webc" %}
<hand-replay title="Hand 1: I'm Ahead — Bet for Value">
  <hand-frame
    street="preflop"
    pot="3"
    board=""
    your-cards="as,ah"
    villain-cards="hidden"
    your-stack="200"
    villain-stack="200"
    your-position="BTN"
    villain-position="MP"
    thought="Pocket aces — the best possible starting hand. Some players try to be sneaky and just call here, hoping to trap. That's a mistake. With a hand this strong, I want to build a big pot. Raise."
    action="You raise to $8"
    result="Villain calls">
  </hand-frame>

  <hand-frame
    street="flop"
    pot="19"
    board="kd,7c,2s"
    your-cards="as,ah"
    villain-cards="hidden"
    your-stack="192"
    villain-stack="192"
    your-position="BTN"
    villain-position="MP"
    thought="This is a great flop for my aces. There's a king, but I still have the best pair possible — an <a href='glossary:overpair'>overpair</a>. The board is 'dry': no flush possible, no obvious straight draws. My opponent probably has a king, a smaller pair, or nothing. Any of those hands will call a bet. I'm ahead — bet for value."
    action="You bet $12"
    result="Villain calls">
  </hand-frame>

  <hand-frame
    street="turn"
    pot="43"
    board="kd,7c,2s,5h"
    your-cards="as,ah"
    villain-cards="hidden"
    your-stack="180"
    villain-stack="180"
    your-position="BTN"
    villain-position="MP"
    thought="The 5 changes nothing. My aces are still best. If my opponent had a set (three of a kind), they probably would have raised the flop. They likely have a king or a medium pair. Keep betting."
    action="You bet $28"
    result="Villain calls">
  </hand-frame>

  <hand-frame
    street="river"
    pot="99"
    board="kd,7c,2s,5h,3d"
    your-cards="as,ah"
    villain-cards="ks,js"
    your-stack="152"
    villain-stack="152"
    your-position="BTN"
    villain-position="MP"
    thought="Another blank. My aces are almost certainly winning. My opponent has called three bets — they have something. A king makes sense. One more value bet to get paid."
    action="You bet $50"
    result="Villain calls and shows K♠J♠">
  </hand-frame>
</hand-replay>
{% endrenderTemplate %}
</div>

**Result:** You win a $199 pot with pocket aces. Your opponent had top pair with a decent kicker — exactly the kind of hand that will call you down.

> **The lesson:** When you have the best hand, bet. Don't get fancy. Don't slowplay. Strong hands make money by building pots, not by trapping. If your opponent wants to call with worse, let them pay for it.
```

**Step 2: Verify the changes**

Run: `grep -A 5 "Hand 1: I'm Ahead" posts/0016-beginner-poker-strategy-how-to-win.md`
Expected: The new section header and opening lines

**Step 3: Commit**

```bash
git add posts/0016-beginner-poker-strategy-how-to-win.md
git commit -m "content: rewrite Hand 1 with visual component - value betting"
```

---

## Task 6: Write Hand 2 Content - "I'm Drawing — Check the Math"

**Files:**
- Modify: `posts/0016-beginner-poker-strategy-how-to-win.md`

**Step 1: Replace Hand 2 section**

> **IMPORTANT:** Use the blog-writer skill when writing the thought bubbles and setup text.

Find the section starting with `### Hand 2: Playing a Flush Draw With Pot Odds` and replace it with:

```markdown
### Hand 2: I'm Drawing — Check the Math

Same $1/$2 game. You're on the button with $180 and look down at 9♠8♠ — suited connectors.

A solid player raises to $6 from early position. One player calls. You call too — suited connectors play well in position with deep stacks.

Three players see the flop. Pot: $21.

<div class="not-prose">
{% renderTemplate "webc" %}
<hand-replay title="Hand 2: I'm Drawing — Check the Math">
  <hand-frame
    street="flop"
    pot="21"
    board="ks,5s,2c"
    your-cards="9s,8s"
    villain-cards="hidden"
    your-stack="174"
    villain-stack="174"
    your-position="BTN"
    villain-position="EP"
    thought="I don't have a made hand — just nine-high. But I have four spades, which means I need one more spade to make a <a href='glossary:flush'>flush</a>. That's called a <a href='glossary:flush-draw'>flush draw</a>. There are 9 spades left in the deck, so I have 9 '<a href='glossary:outs'>outs</a>' — cards that complete my hand."
    action="Villain bets $14"
    result="Other player folds">
  </hand-frame>

  <hand-frame
    street="flop"
    pot="35"
    board="ks,5s,2c"
    your-cards="9s,8s"
    villain-cards="hidden"
    your-stack="174"
    villain-stack="160"
    your-position="BTN"
    villain-position="EP"
    thought="Now I need to do the math. The pot is $35 and I need to call $14. That's getting about 2.5-to-1 on my money. My flush draw hits about 19% on the next card (9 outs × 2 = 18%). The direct <a href='glossary:pot-odds'>pot odds</a> say I need 29% to call... but if I hit, I'll probably win more money. That's called <a href='glossary:implied-odds'>implied odds</a>. With position and a hidden draw, it's worth a call."
    action="You call $14"
    result="Pot is now $49">
  </hand-frame>

  <hand-frame
    street="turn"
    pot="49"
    board="ks,5s,2c,4s"
    your-cards="9s,8s"
    villain-cards="hidden"
    your-stack="160"
    villain-stack="160"
    your-position="BTN"
    villain-position="EP"
    thought="The 4♠! I made my flush — the third-best hand in poker. But I need to get paid. If I bet big, my opponent might fold. If they check, I can bet smaller and maybe get a call."
    action="Villain checks"
    result="Your turn to act">
  </hand-frame>

  <hand-frame
    street="turn"
    pot="49"
    board="ks,5s,2c,4s"
    your-cards="9s,8s"
    villain-cards="hidden"
    your-stack="160"
    villain-stack="160"
    your-position="BTN"
    villain-position="EP"
    thought="They checked — probably scared of the flush. I have the goods, but a huge bet will scare them away. A smaller bet looks like I might be stealing. Let's try to get some value."
    action="You bet $25"
    result="Villain calls">
  </hand-frame>

  <hand-frame
    street="river"
    pot="99"
    board="ks,5s,2c,4s,jd"
    your-cards="9s,8s"
    villain-cards="kd,qd"
    your-stack="135"
    villain-stack="135"
    your-position="BTN"
    villain-position="EP"
    thought="The J♦ doesn't change anything — I still have my flush. One more bet to extract value. They called the turn, so they have something worth calling with."
    action="You bet $45. Villain calls with K♦Q♦"
    result="You win with a flush">
  </hand-frame>
</hand-replay>
{% endrenderTemplate %}
</div>

**Result:** You win a $189 pot with a flush. Your opponent had top pair with a good kicker and couldn't let it go.

> **The lesson:** Drawing hands require math, not hope. Count your outs, check your pot odds, and only continue if the price is right. When you hit, extract value — opponents who've invested chips rarely find folds.
```

**Step 2: Verify the changes**

Run: `grep -A 5 "Hand 2: I'm Drawing" posts/0016-beginner-poker-strategy-how-to-win.md`
Expected: The new section header and opening lines

**Step 3: Commit**

```bash
git add posts/0016-beginner-poker-strategy-how-to-win.md
git commit -m "content: rewrite Hand 2 with visual component - drawing hands"
```

---

## Task 7: Write Hand 3 Content - "I'm Behind — Save My Chips"

**Files:**
- Modify: `posts/0016-beginner-poker-strategy-how-to-win.md`

**Step 1: Replace Hand 3 section**

> **IMPORTANT:** Use the blog-writer skill when writing the thought bubbles and setup text.

Find the section starting with `### Hand 3: The Disciplined Fold (Pocket Queens)` and replace it with:

```markdown
### Hand 3: I'm Behind — Save My Chips

Same $1/$2 game. You're in the cutoff with $200 and pick up Q♠J♠ — a decent hand, but not premium.

A tight player raises to $6 from early position. You call. Everyone else folds.

Heads-up to the flop. Pot: $15.

<div class="not-prose">
{% renderTemplate "webc" %}
<hand-replay title="Hand 3: I'm Behind — Save My Chips">
  <hand-frame
    street="flop"
    pot="15"
    board="qd,7c,3h"
    your-cards="qs,js"
    villain-cards="hidden"
    your-stack="194"
    villain-stack="194"
    your-position="CO"
    villain-position="EP"
    thought="Top pair with a jack <a href='glossary:kicker'>kicker</a>. That's a solid hand. But wait — this opponent raised from early position. That usually means a strong hand: big pairs or big cards like AK, AQ, KQ. If they have AQ or KQ, my jack kicker loses to their ace or king."
    action="Villain bets $10"
    result="Your turn to act">
  </hand-frame>

  <hand-frame
    street="flop"
    pot="25"
    board="qd,7c,3h"
    your-cards="qs,js"
    villain-cards="hidden"
    your-stack="194"
    villain-stack="184"
    your-position="CO"
    villain-position="EP"
    thought="One pair is usually good enough to call one bet. I'm not folding yet — they could have AK and missed, or a smaller pair. But I'm not raising either. Just call and see what they do next."
    action="You call $10"
    result="Pot is now $35">
  </hand-frame>

  <hand-frame
    street="turn"
    pot="35"
    board="qd,7c,3h,9s"
    your-cards="qs,js"
    villain-cards="hidden"
    your-stack="184"
    villain-stack="184"
    your-position="CO"
    villain-position="EP"
    thought="The 9 doesn't help me. They're betting again — and bigger this time. That's two bets now. Most players at this level don't bluff twice. They usually have something. My top pair with a jack kicker is looking weaker."
    action="Villain bets $25"
    result="Your turn to act">
  </hand-frame>

  <hand-frame
    street="turn"
    pot="60"
    board="qd,7c,3h,9s"
    your-cards="qs,js"
    villain-cards="hidden"
    your-stack="184"
    villain-stack="159"
    your-position="CO"
    villain-position="EP"
    thought="I'll call one more time, but I'm not happy about it. If they fire a third barrel on the river, I'm probably beat. A queen with a jack kicker just isn't strong enough against a range that raised preflop and bet twice."
    action="You call $25"
    result="Pot is now $85">
  </hand-frame>

  <hand-frame
    street="river"
    pot="85"
    board="qd,7c,3h,9s,2d"
    your-cards="qs,js"
    villain-cards="hidden"
    your-stack="159"
    villain-stack="159"
    your-position="CO"
    villain-position="EP"
    thought="Blank river. Now they're betting $55 — almost two-thirds of the pot. That's three streets of betting. At low stakes, this almost always means a real hand. What could they have that I beat? A bluff with AK? Maybe. But AQ, KQ, QQ, 99, 77, 33 — all these hands crush me. The math doesn't add up."
    action="Villain bets $55"
    result="Decision time">
  </hand-frame>

  <hand-frame
    street="river"
    pot="140"
    board="qd,7c,3h,9s,2d"
    your-cards="qs,js"
    villain-cards="qh,kh"
    your-stack="159"
    villain-stack="104"
    your-position="CO"
    villain-position="EP"
    thought="This is the hardest part of poker: folding a hand that looks good. Top pair feels strong. But three big bets from a tight player? They're not bluffing. I'm behind. Save the $55 for a better spot."
    action="You fold"
    result="Villain shows Q♥K♥ — same pair, better kicker">
  </hand-frame>
</hand-replay>
{% endrenderTemplate %}
</div>

**Result:** You lose $35 instead of $90. Your opponent had the same top pair with a king kicker — exactly what their betting line represented.

> **The lesson:** One pair is a marginal hand. When a tight opponent bets three streets, believe them. The money you save by folding is just as valuable as the money you win. Discipline isn't exciting, but it's profitable.
```

**Step 2: Verify the changes**

Run: `grep -A 5 "Hand 3: I'm Behind" posts/0016-beginner-poker-strategy-how-to-win.md`
Expected: The new section header and opening lines

**Step 3: Commit**

```bash
git add posts/0016-beginner-poker-strategy-how-to-win.md
git commit -m "content: rewrite Hand 3 with visual component - disciplined folding"
```

---

## Task 8: Update the Section Introduction

**Files:**
- Modify: `posts/0016-beginner-poker-strategy-how-to-win.md`

**Step 1: Update the intro paragraph**

Find the line `## Putting It Together: Three Real Hands` and the paragraph that follows. Replace with:

```markdown
## Putting It Together: Three Real Hands

Reading about poker strategy is one thing. Seeing it in action is another.

These three hands show the "Three Questions" framework from Step 3 in real situations. Each hand focuses on one question:

1. **Am I ahead?** → Bet for value
2. **Am I drawing?** → Check the math
3. **Am I behind?** → Save my chips

Follow the thought bubbles — they show exactly how a beginner should think through each decision.
```

**Step 2: Verify the changes**

Run: `grep -A 10 "## Putting It Together" posts/0016-beginner-poker-strategy-how-to-win.md`
Expected: The updated introduction

**Step 3: Commit**

```bash
git add posts/0016-beginner-poker-strategy-how-to-win.md
git commit -m "content: update Three Real Hands section introduction"
```

---

## Task 9: Visual Testing and Polish

**Files:**
- Potentially modify: `css/tailwind-full.css`, `_includes/components/hand-frame.webc`

**Step 1: Run the dev server**

Run: `npm start`

**Step 2: Navigate to the blog post**

Visit: `http://localhost:8080/posts/beginner-poker-strategy-how-to-win/`
Scroll to the "Putting It Together: Three Real Hands" section.

**Step 3: Verify on desktop and mobile**

Check:
- [ ] Cards render correctly at all sizes
- [ ] Thought bubbles are readable
- [ ] Street labels show correct colors
- [ ] Pot amounts update correctly per frame
- [ ] Glossary links work within thought bubbles
- [ ] Mobile layout stacks properly (use browser dev tools)

**Step 4: Fix any visual issues**

If cards are too small, spacing is off, or colors need adjustment, modify `css/tailwind-full.css`.

**Step 5: Commit any polish**

```bash
git add -A
git commit -m "fix: polish hand-replay visual styling"
```

---

## Task 10: Final Review and Cleanup

**Step 1: Run the build**

Run: `npm run build`
Expected: Build completes without errors

**Step 2: Review the output**

Check `_site/posts/beginner-poker-strategy-how-to-win/index.html` exists and contains the hand-replay components.

**Step 3: Verify glossary links work**

In the browser, click on glossary terms within the thought bubbles. They should open the glossary modal.

**Step 4: Final commit if any changes**

```bash
git add -A
git commit -m "chore: final cleanup for hand-replay feature"
```

---

## Summary

| Task | Description |
|------|-------------|
| 1 | Create `hand-frame.webc` component |
| 2 | Create `hand-replay.webc` container |
| 3 | Add CSS styles to `tailwind-full.css` |
| 4 | Test with temporary test page |
| 5 | Write Hand 1: "I'm Ahead — Bet for Value" |
| 6 | Write Hand 2: "I'm Drawing — Check the Math" |
| 7 | Write Hand 3: "I'm Behind — Save My Chips" |
| 8 | Update section introduction |
| 9 | Visual testing and polish |
| 10 | Final review and cleanup |
