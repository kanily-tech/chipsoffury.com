---
title: Considering hand writing the authentication code 😱
date: 2024-01-24
author: Animesh
devlogNumber: 3
tags: ['post', 'devlog']
---
It seems the internet gets upset at the idea of rolling your own auth code. I get it, it is a complex problem, 
and there are many well written authentication providers out there. 

I was even [delving into a few of them](/blog/researching-passkey-auth/) yesterday. I was flabbergasted to see
how large these repos are. For instance, at the time of writing 
- Ory Kratos has a [quarter of a million lines of code](https://ghloc.vercel.app/ory/kratos?branch=master)
- Hanko comes in slightly lighter at about [120K LOC](https://ghloc.vercel.app/teamhanko/hanko?branch=main) 
- Zitadel repo is 500MB, and I do not dare question what lies inside it, the LOC counter website refuses to 
  load that big a repo 😬.

Not to mention, these services need to be run as a separate service, they need their own datastore, and will
need some upkeep and monitoring. Unfortunately, the pricing models of all auth providers seem prohibitively
expensive for b2c apps with simple needs, so using their cloud offering is out of the question.

I feel the needs for Chips of Fury are simple. We don't want the whole kitchen sink of authN and authZ 
features. So let's see...

### What are the authentication needs for Chips of Fury

#### Phase 1
- I want to depend on Oauth2 providers for authentication. I'll start with Google and Apple. Adding more Oauth2 
  providers should be much less of an effort in future anyway.
- As a fallback, I want to support email based auth using magic links / email OTPs.
- I want to skip email/password based auth completely. Advantages are
  - avoid dealing with password resets 
  - avoid dealing with password storage

#### Phase 2
- Passkey based auth
- Some way to track logged in devices and revoke logins

#### Some nitty-gritties to keep in mind...
Logins are optional. So the app would continue to work with anonymous users like it does now. I do not
want to change that.

*Verified* email addresses would be the unique identifier for a user. Oauth providers should usually provide
info on whether the email is verified or not. This should help in making sure that a user who initially logs in via Google, can later login
using email magic links into the same account. And vice versa. Apple allows anonymizing emails, so I'm not sure how useful it will be for Apple users. But if an Apple user
has shared their original email, then the above flow would work for them as well.

Some issues might happen in email delivery for magic links / OTPs, but having three options to login should
give a fairly high coverage in case something does go wrong.

### My guess for custom code to handle these requirements
It is surely non-trivial, but I think it will be in the order of magnitude of thousands of LOC. If my guess is 
right, and I have a good understanding of what I'm doing, it might just be better to hand roll the auth code.

So off I go to read about Oauth2. [This book](https://www.oauth.com/) looks nice. I'll post on how this goes.


