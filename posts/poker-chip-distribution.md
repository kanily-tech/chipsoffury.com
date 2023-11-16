---
layout: layouts/blog-post.html
title: Poker Chips - Flexible distribution and management
date: 2023-11-16
author: Animesh
tags: ['post', 'feature-spotlight']
---

Chips of Fury offers unlimited chips, and a few simple settings to manage chip distribution.

### Option 1 - players get chips automatically
This is a great option for games in _trusted_ groups, where typically the settlement will be done after the game has been
played. Players trust each other to make these settlements.

While creating the game, the admin can set **self loading wallet** option to enabled.

<img src="/images/screenshots/chip_management_screenshot_2.png" width="400">

When enabled, players can join the table with any buy-in amount. The computer will credit the required chips to
their wallet automatically to complete the buy-in.

This option frees up the admin from having to manage chip distribution.

### Option 2 - players get a fixed number of chips on joining the game
This is good for tournament style games where each player would get a fixed number of chips to start with. Here's what
the setting looks like, and how the player join request will appear for the admin.

<img src="/images/screenshots/chip_management_screenshot_1.png" width="400">

If the admin wants to accept the player into the game, but not give them chips, they can unselect the checkbox before 
accepting their join request.

### Option 3 - admin manually credits chips to players
This option is always available to the admin. Admin can add, as well as deduct chips from a player's wallet.

<img src="/images/screenshots/chip_management_screenshot_3.png" width="400">

If option 1 and option 2 are disabled, then admin will have to manually give chips to each player.

With these options, most use-cases seem to get covered. If you have a different use-case, or a better idea
on how to manage chips, we'd love to hear from you.

{% include "components/comments.html" %}
