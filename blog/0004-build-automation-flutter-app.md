---
title: What a mess it is to automate Flutter app builds
date: 2024-01-22
authorSlugs: [animesh]
devlogNumber: 1
tags: ['post', 'devlog']
---
The web build for Chips of Fury is due any time soon! While developing and testing, I had to build and publish manually 
a few times, and it was a good glimpse into the future. So.. enough is enough, it is about time to automate the whole 
build and publish process. It was already tedious work, but with three platforms, I don't think it will be a good idea
to keep it manual.

I'd heard of this tool called `fastlane`, which looks like exactly what I was looking for, but boy does it have some rough
edges. It would work without much effort on a standard android / ios app. But when you introduce a flutter app, with 
multiple flavors, it starts to show the cracks.

I've finally gotten things to work, but it's a hotchpotch of `fastlane`, `make` and `bash` scripts. It finally works 
though!

> Note to self:
> `make` is not a general purpose scripting tool. I kept butting my head with it trying to _make_ it do things which 
just seem so simple.

In the end I just resorted to writing some bash scripts that run a bunch of commands to get the build artifacts out. 
And then I use `fastlane` to publish them to the respective app stores. `make` serves as a handy place to keep all
the commands/scripts that need to be run in a central place. 
