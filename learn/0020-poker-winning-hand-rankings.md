---
title: "Poker Hand Rankings Explained (With Chart)"
date: 2026-01-01
description: "Complete poker hand rankings from Royal Flush to High Card. Visual chart, examples, and the memory tricks that actually stick."
tags: [ 'post', 'learn-poker' ]
authorSlugs: [mayank]
showAuthorBio: true
---

{% include "components/beginner-help-notice.html" %}

New to poker? This is the one page you need to bookmark. Hand rankings determine who wins every single pot, and getting
them wrong means losing money to players who know them cold.

There are only ten hand types, and they follow a logical pattern. After a few sessions, you'll recognize them without
thinking. The tricky part is the middle of the list - most people confuse straights, flushes, and full houses at least
once before it clicks.

---

## The Complete Poker Hand Rankings Chart

Here's every poker hand ranked from strongest to weakest, with visual examples:

<div class="not-prose">
{% renderTemplate "webc" %}
<hand-rankings></hand-rankings>
{% endrenderTemplate %}
</div>

---

## Understanding Each Hand

### 1. Royal Flush

**A-K-Q-J-10, all the same suit.**

The rarest hand in poker. In Texas Hold'em, you'll see one roughly once every 31,000 hands. Some players go their entire
lives without hitting one. When you do, take a picture - it's that rare.

The royal flush is just the highest possible straight flush. If you have one, you cannot lose (though you can tie if the
board shows the royal flush and both players play it).

### 2. Straight Flush

**Five sequential cards of the same suit.**

Any straight where all five cards share a suit. The highest card determines strength - a 9-high straight flush beats a
7-high straight flush. A royal flush is technically just the ace-high straight flush, but it gets its own name because
poker players love drama.

### 3. Four of a Kind (Quads)

**Four cards of the same rank.**

When two players both have quads (which almost never happens), the higher rank wins. Four Aces beats four Kings.

The fifth card (the "kicker") only matters in the astronomically rare case where the four-of-a-kind is on the board and
both players are playing it.

### 4. Full House (Boat)

**Three of a kind plus a pair.**

"Jacks full of fours" means three Jacks and two fours. The three-of-a-kind part determines strength first. Jacks full of
fours beats tens full of aces, because Jacks beat tens.

Full houses happen often enough that you'll see several per session in a typical home game. They're strong - but not
invincible. Watch out for the flush and straight flush possibilities.

### 5. Flush

**Five cards of the same suit, any order.**

All hearts, all spades, all diamonds, or all clubs. The suits don't rank against each other (spades aren't "higher" than
hearts), so when two players have flushes, compare the highest card. K-J-8-4-2 of hearts beats Q-J-10-9-8 of clubs
because King beats Queen.

### 6. Straight

**Five sequential cards, mixed suits.**

10-9-8-7-6 is a straight. 

So is A-2-3-4-5 (called "the wheel" - the lowest possible straight). Here the Ace counts as a 1.

And A-K-Q-J-10 (the "broadway" straight, which becomes a royal flush if suited). Here the Ace counts as a 14.

**Ace does not wrap-around**: The ace can be high (A-K-Q-J-10) or low (A-2-3-4-5). It cannot wrap around. 
K-A-2-3-4 is NOT a straight. 

### 7. Three of a Kind (Trips/Set)

**Three cards of the same rank.**

Poker players distinguish between a "set" (when you have a pocket pair and hit the third card on the board) and "
trips" (when there's a pair on the board and you have the third card in your hand). Sets are generally stronger because
they're better hidden.

### 8. Two Pair

**Two different pairs.**

Aces and sixes. Kings and threes. The higher pair determines strength first. Aces and twos beats Kings and Queens
because Aces beat Kings.

Two pair is a hand that feels strong but gets cracked more than you'd expect. Be careful when there are three cards to a
straight or flush on the board.

### 9. One Pair

**Two cards of the same rank.**

The most common "made hand" you'll see. Pair of Aces beats pair of Kings. When both players have the same pair, kickers
determine the winner (see below).

At most home game tables, a big pair (tens or higher) wins the majority of pots that go to showdown.

### 10. High Card

**Nothing. Zip. Nada.**

When nobody has any of the above, the highest card wins. A-K-Q-J-8 beats A-K-Q-J-7. You'll win some pots with high card,
but don't count on it.

---

## The Memory Trick That Actually Works

The part that trips up most beginners is the middle section: Full House, Flush, and Straight. Which beats which?

We've come up with a memory device. It is lame, but seems to work for beginners.

**A house contains plumbing.** Picture a house. Inside, it has flushing toilets connected by straight pipes. The house
contains the flush, which contains the straight.

```
🏠 Full House
 └─ 💧 Flush
     └─ ➡️ Straight
```

So: **Full House > Flush > Straight**. The container beats what's inside it.

Once this image sticks, you'll never mix them up again.

---

## When Two Players Have the Same Hand

Two players both have a pair of Aces. Who wins? This is where "kickers" come in - the side cards that break ties.

Your hand gets compared card by card until one player has a higher card. The highlighted card in each example below is where the hands differ.

<div class="not-prose">
{% renderTemplate "webc" %}
<tie-breakers></tie-breakers>
{% endrenderTemplate %}
</div>

**Note:** Kickers only matter for pairs, two pair, three of a kind, and high card hands. With straights, flushes, and full houses, all five cards are part of the hand itself - there's nothing left over to act as a kicker. If two players have the exact same five-card hand, the pot splits.

---

## Building Your Best Five Cards

Your final poker hand uses exactly five cards - the best combination you can make from your two hole cards plus the five
community cards.

**You can use:**

- Both hole cards + 3 from the board
- One hole card + 4 from the board
- Just the board ("playing the board")

**Example of playing the board:** The board shows A♠ K♠ Q♠ J♠ 10♠. That's a royal flush. Everyone plays it, regardless
of hole cards. Split pot.

This confuses new players because you don't have to use your hole cards. If the board has a better hand than anything
your cards can make, you play the board.

---

## What You'll Actually See at the Table

Forget about royal flushes - they're poster material, not practical poker.

At casual home games, here's what wins most pots:

| Hand Type       | Odds*        | How Often You'll See It Win |
|-----------------|--------------|---------------------------|
| High Card       | 1 in 6       | Sometimes (weak tables)   |
| One Pair        | 1 in 2       | Very often                |
| Two Pair        | 1 in 4       | Often                     |
| Three of a Kind | 1 in 21      | Regularly                 |
| Straight        | 1 in 22      | Occasionally              |
| Flush           | 1 in 33      | Occasionally              |
| Full House      | 1 in 39      | Sometimes                 |
| Four of a Kind  | 1 in 595     | Rarely                    |
| Straight Flush  | 1 in 3,600   | Almost never              |
| Royal Flush     | 1 in 31,000  | Once in a lifetime        |

*Probabilities for Texas Hold'em (best 5 of 7 cards). Source: [Wikipedia](https://en.wikipedia.org/wiki/Poker_probability).

If you make three of a kind, you're usually ahead. A full house at a friendly table wins almost everything. Don't chase
the monster hands - focus on playing solid cards and making better pairs than your opponents.

---

Ready to play? [Chips of Fury](https://chipsoffury.com) tracks hand rankings for you while you're learning.
