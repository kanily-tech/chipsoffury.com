---
layout: layouts/blog-post-tailwind.html
title: Can we go all in on Passkey based authentication?
date: 2024-01-23
author: Animesh
devlogNumber: 2
tags: ['post', 'devlog']
---
Passkeys are good - more secure, arguably better UX (only reason I feel it is arguable is that it is still new, 
and uncommon for users to use it)

Here I am logging some questions and notes as I research the possibility of doing passkey based authentication on CoF.

### Questions

#### Can passkeys be the only authentication mechanism for CoF?
Probably not. We are about to launch a web based version. And browser support is not there on some browsers. 
Linux based desktops / laptops also might not have native support. So a fallback will be needed. Also, passkeys
are not yet popular, so less tech savvy users might not be comfortable with it.

#### What happens if a user has an Android/iOS device and a Windows laptop? How seamless is the experience? 
Windows has "Hello", which can do biometric / face ID / PIN based authentication. Current convention seems to 
be to let users register via a more traditional mechanism, and then let them add passkeys as an additional
authentication mechanism.

#### A community post asking some great questions 
[Passkeys, multiple devices and having no biometric reader](https://1password.community/discussion/140654/passkeys-multiple-devices-and-having-no-biometric-reader)

1password's response is interesting - they are only assuming the scenario where a user has 1password (or some other 
password manager with passkey support) on all their devices. Also, this makes me further confused about how the UX
is in choosing where to store the passkey. 

Here's a scenario where on the same device (my mac), things become confusing. I was playing around with this nice
demo site - [https://www.passkeys.io/](https://www.passkeys.io/):
- I first opened the site on chrome, and registered using a passkey.
- Then I opened the site on Safari, but now my passkey is nowhere to be found. Because Google stores passkeys 
  in their Google password manager, and Safari stores passkeys in their iCloud keychain.
- For a layman user this can be really confusing. How the hell do I login to my account on a different 
  browser now!
- The video linked below - Passkeys: The Good, the Bad, and the Ugly - talks about this problem (starting around the 
  27:30 mark), and how it is being solved by some browsers. But the UX can be confusing nevertheless.

### Research

Some useful introductory content on passkeys:
- [Chrome developers channel intro to passkeys](https://www.youtube.com/watch?v=SF8ueIn2Nlc)
- [How to implement passkeys with form autofill in a web app](https://www.youtube.com/watch?v=_qSCYiU_Yr4)
- [Passkeys: The Good, the Bad, and the Ugly](https://www.youtube.com/watch?v=knrEje81f68)

### Open source authentication servers that support passkeys

I am considering the following relatively modern ones:
- [Zitadel](https://github.com/zitadel/zitadel)
- [Ory Kratos](https://github.com/ory/kratos)
- [Hanko](https://github.com/teamhanko/hanko)

Keycloak seems to be the most popular one, but not considering it as it is quite heavy to run (JVM based) and
perhaps quite complex for our simple needs
- [Keycloak](https://github.com/keycloak/keycloak)

### What should be the way forward for auth on CoF

- We don't want to deal with passwords. So we can do OAuth2 based authentication with Google, Apple etc.
- We can have a fallback on Email Magic Link or Email OTP based login.
- We should prompt after signup or first login for the user to associate their account with a passkey.

#### [2024-08-21] Update: [Follow up article](/posts/passkeys-wtf)
