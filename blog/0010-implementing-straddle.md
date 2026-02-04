---
title: Implementing Straddle
date: 2024-08-25
authorSlugs: [animesh]
devlogNumber: 6
tags: ['post', 'devlog']
---
<div style="padding: 16px; font-size: .9em; margin-bottom: 20px; border-top: #be9a4e solid 1px; border-bottom: #be9a4e solid 1px">
<p>
Chips of Fury is a Poker app for playing privately with friends.
</p>
This is a stream of thought on how we are thinking implementing <em>Straddle</em> - an optional, voluntary bet 
by a player after the posting of the small and big blinds, but before cards are dealt 
(<a href="https://en.wikipedia.org/wiki/Betting_in_poker#Straddle_and_sleeper_bets">more on wikipedia</a>). This might
be too long drawn for the casual reader, but if you're looking for some background on how we develop certain features
it might be an interesting read. Mostly, this is for our own internal consumption and archives.
</div>

In casinos, the Straddle bet must be posted after the small and big blinds are posted, 
and before the dealer starts dealing the cards. If you post a bet after the cards have been dealt, 
but you have not seen the cards yet, then that bet is a normal raise.

Why is one different than the other? It comes down to who gets to take the last action.

### Case 1 
#### Dan (UTG) Straddles by putting in 2xbb before cards are dealt
<img src="/images/posts/straddle/straddle_setup.png" class="post_image" width="75%"/>

Action:
- Bob posts SB - 1
- Cat posts BB - 2
- Dan posts Straddle (2xbb) - 4
- <strong>Hole cards are dealt</strong>
- Alice folds
- Bob calls - 3
- Cat calls - 2
- <em>Dan gets to decide whether to raise or not</em>

Without straddle, the BB is the last to take action. By straddling, the UTG gains the advantage of being the last 
to act in the pre-flop betting.

### Case 2
#### Dan (UTG) does a voluntary blind bet after the hole cards are dealt
<img src="/images/posts/straddle/blind_bet_setup.png" class="post_image" width="75%"/>

Action:
- Bob posts SB - 1
- Cat posts BB - 2
- <strong>Hole cards are dealt</strong>
- Dan posts voluntary blind bet (that is, without seeing cards) (2xbb) - 4
- Alice folds
- Bob calls - 3
- Cat calls - 2
- <strong>FLOP</strong>

In this case, the BB is the last to take action. Dan does not get to decide whether to raise or not.

### Straddle UX to mimic casino style of play

#### Option 1: Introduce a straddle timer

This will add some time between the blinds being posted and the hole cards being dealt. This will give
players time to decide whether to straddle or not.
<img src="/images/posts/straddle/straddle_timer.png" width="75%" class="post_image"/>

Pros:
- Closely mimics the real world style of play
- Single call to action on the screen makes the UX pretty straightforward

Cons:
- Adds a delay to all hands, slows down the pace of the game
- Re-straddle will add even more delay, as we may want to give some time for re-straddling as well

#### Option 2: Ask for straddle intent before the hand even starts

We have a next hand timer, which gives some time for players to see the result of the current hand,
before a new one is dealt. If we are clever about it, it may be possible to do a decent UX to let
player show straddle intent before the hand even starts.
<img src="/images/posts/straddle/straddle_hand_timer.png" width="75%" class="post_image"/>

Pros:
- Does not add an extra delay to the hands

Cons:
- Adds nuances around what happens if a player sits out before the hand starts (thus changing the blind order)
- The onscreen table is still showing the result of the just concluded hand, so it becomes a little confusing 
  to see who is the next button and who all can straddle.
- Re-straddle continues to be problematic

#### Re-straddle - should we even care about it?

If there was no re-straddle, it would make things easier, but it runs contrary to how we design CoF.

> One of the philosophies we like to stick to when building CoF is that we want to support a large variety of
> gameplay styles. This is because most of our user base plays home games, and these tend to have a much larger
> range of gameplay elements. If a group really likes playing a certain way, then we do not want to take
> away that fun if they choose to go online and play using CoF instead.

So yes, we should care. Many home games would have re-re-re-straddles as well.

### Another solution with a departure from strict rules

What if we treated blind bets as straddles?

If a game has straddling enabled, hole cards will be dealt face down to any players who _can_ straddle. 
The raise widget can then show specific controls for straddling. If the player looks at their cards, their 
ability to straddle goes away.

<img src="/images/posts/straddle/straddle_raise_dialog.png" width="75%" class="post_image"/>

If the bet is played within the configured straddling limits/rules, it would count as a straddle, else as 
a simple blind bet.

IMO, there is elegance in this solution. While it departs from the order of play (straddling is done before
hole cards are dealt), it does not break the game.

Pros:
- Does not add any delay to the game
- Would handle re-straddles quite well, once the players get used to the idea that they should not see
  their cards if they want to keep their ability to straddle / re-straddle
- Has a new game mechanic to boot, playing blind. This is a funny tactic in some variations and can be 
  deployed to great effect to psych out the table.

Cons:
- Is a departure from the traditional order of play, so might take a few hands to get used to

I'm leaning towards this solution. Will update this post if there is a change in thought process.


