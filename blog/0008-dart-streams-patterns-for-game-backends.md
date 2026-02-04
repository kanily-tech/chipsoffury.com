---
title: Dart streaming pattern with stream splitting
description: "How to route WebSocket events to multiple game controllers in Dart. Covers stream splitting, handling async initialization, and synchronizing event processing."
date: 2024-03-15
authorSlugs: [animesh]
devlogNumber: 4
tags: ['post', 'devlog']
---
<style>
/* center iframes horizontally */
iframe {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
<div style="padding: 16px; font-size: .9em; border-top: #be9a4e solid 1px; border-bottom: #be9a4e solid 1px">
Chips of Fury is a Poker app for playing privately with friends. It is written in Dart - Flutter on the
frontend and a Dart server on the backend. Dart is not popular on the backend, so these tidbits serve as 
notes to self, and hopefully others writing Dart stuff.
</div>

### Some context

We run regionally distributed game servers to host games close to users (thanks to Fly.io). 
Each game server instance is designed to host multiple tables concurrently.

The client and server communicate over WebSockets. Multiple tables can share the same underlying WebSocket connection - 
assuming that they are running on the same game server instance. Although the client does not yet support playing
on multiple tables concurrently.

### High Level Game Event Flow (Incoming)

- The user's device sends events over the WebSocket connection to the game server.
- A WebSocket listener on the HTTP server listens for incoming messages, and passes valid ones to a `Switch`
- The job of the `Switch` is to route the incoming message to the correct `GameStateController`
  The `GameStateController` is a class that manages the state of a single game table 
  - If a controller does not exist for the `gameId`, a new one is created
  - Messages are then passed to the `GameStateController` for processing 

<img src="/images/data-streams/game_state_controller.png" class="post_image"/>

#### Some Nuances

The `GameStateController` can be heavy to initialize. For new games not so much, but let's say a group decides to 
continue playing on a table they left off from the previous day. The `GameStateController` will have to load the
game state from the database, and then initialize itself. Or simply if the game server crashes, then the `GameStateController`
needs to be re-initialized from the database with the last known state. This point will add a wrinkle to the pattern
which would be interesting to discuss.

Also, if you notice, the incoming stream of events from a single WebSocket connection is being split into multiple
streams. This is because the game server can host multiple tables concurrently. There is a 
[StreamSplitter](https://api.flutter.dev/flutter/async/StreamSplitter-class.html) class in Dart async library, but
that does not fit our use case well. So we approach it differently.

### Let's code

Let's start with a simple example and build from there. Here's how simple stream processing looks like in Dart.

<script src="https://gist.github.com/animeshjain/daf1f2c2193aee46b5ca991fc3300571.js"></script>

#### Output
```
received event (1, 1a)
received event (2, 2a)
received event (1, 1b)
received event (2, 2b)
```

Here's a bare-bones `GameStateController`. As of now, it is skeletal and prints the incoming events to the console.

<script src="https://gist.github.com/animeshjain/6d4d2a71a0f2687e5b329de62f3550fb.js"></script>

Now the interesting part. Let's make this `Switch` thingy work. As mentioned above, the `Switch` is responsible for routing
incoming messages to the correct `GameStateController`. We would also like to create a new `GameStateController` if one 
does not exist for the incoming message's `gameId`. Combining all the code for convenience...

<script src="https://gist.github.com/animeshjain/5ccc2ebc9ae320b9e4ceddecc6e51814.js"></script>

#### Output

```
Switch: received event (1, 1a)
Unhandled exception:
Bad state: Stream has already been listened to.
#0      _StreamController._subscribe (dart:async/stream_controller.dart:686:7)
#1      _ControllerStream._createSubscription (dart:async/stream_controller.dart:836:19)
#2      _StreamImpl.listen (dart:async/stream_impl.dart:471:9)
...
```

Lesson 1: Dart streams can only be listened to once. The moment the switch tries to create the second `GameStateController`, 
it tries to listen to the same stream again. We'll need to fix this. Fortunately, Dart has broadcast streams. These can be
listened to by multiple listeners. Let's try that and see what happens. (Changes are in line 23-24)

<script src="https://gist.github.com/animeshjain/2f42a525385f1a97b043ec29ea6ece53.js"></script>

#### Output

```
Switch: received event (1, 1a)
Switch: received event (2, 2a)
Switch: received event (1, 1b)
GameStateController1: received event (1, 1b)
Switch: received event (2, 2b)
GameStateController2: received event (2, 2b)
```

Well, well, well. The switch is getting all the messages, but the controllers are for some reason not getting the first message
of the game. The reason is, a _normal_ Stream keeps a store of events till a listener is attached. Once the listener is attached,
the events are dispatched to the listener in the order in which they were produced.

A broadcast stream, on the other hand, will dispatch events to all listeners that are attached at the time of the event. If no 
listeners were attached at the time the event was produced, the event is lost.

<iframe src="https://giphy.com/embed/AgiLrrdcs75ujfnhg2" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p class="image_caption"><a href="https://giphy.com/gifs/darksideofthering-dark-side-of-the-ring-kanyon-chris-AgiLrrdcs75ujfnhg2">via GIPHY</a></p>

No problemo. We can fix that by creating a new stream for each `GameStateController`. And we will manually push the first event
of that game into this stream that we control. Let's see how that looks like.

<script src="https://gist.github.com/animeshjain/af377086cc83e613dbb2f5a10e29cd5d.js"></script>

#### Output

```
Switch: received event (1, 1a)
GameStateController1: received event (1, 1a)
Switch: received event (2, 2a)
GameStateController2: received event (2, 2a)
Switch: received event (1, 1b)
GameStateController1: received event (1, 1b)
Switch: received event (2, 2b)
GameStateController2: received event (2, 2b)
```

This is finally correct. It has some added advantages, which can be illustrated with some more nuance from a real 
world perspective. 

In our case, the game server controllers are created on-demand. Once a server has been allocated to a game, the client
connects to the server and tries to do a handshake. On receiving the handshake messages, the server props up a 
`GameStateController` for the game. Like we discussed earlier, the `GameStateController` can be heavy to initialize - 
it might need some network / DB calls to initialize itself.

Another difference in a more real-world scenario is that the event processing might also involve network / IO calls.
So out current `processEvent` method will need to be async as well.

Here's the code with some delays added to simulate network / DB calls
- we've added a `Future<void> initialize()` method to the `GameStateController` to simulate the heavy initialization
- this is called explicitly from the `Switch` after a new `GameStateController` is created
- we've made the `processEvent` method async and added a delay to simulate network / IO calls

<script src="https://gist.github.com/animeshjain/cd3fde066e4f89d7c85eeab32d6b7287.js"></script>

#### Output

```
Switch: received event (1, 1a)
GameStateController1: initializing...
Switch: received event (2, 2a)
GameStateController2: initializing...
Switch: received event (1, 1b)
Switch: received event (2, 2b)
GameStateController1: initialized
GameStateController1: received event (1, 1a)
GameStateController1: received event (1, 1b)
GameStateController2: initialized
GameStateController2: received event (2, 2a)
GameStateController2: received event (2, 2b)
GameStateController1: processed event (1, 1a)
GameStateController1: processed event (1, 1b)
GameStateController2: processed event (2, 2a)
GameStateController2: processed event (2, 2b)
```

If you look closely, now we have a problem. The `GameStateController` is receiving the next event, even before it has finished
processing the previous one. This is not what we want as this will result in bad state.

The problem is that the `processEvent` listener is async, and therefore the `StreamController` is not waiting for the
`processEvent` to complete before it sends the next event. 

This can be fixed by using an alternative way to consume events from the stream. Instead of using the `listen` method, we can
use the `await for` construct. Using this we can await on each `processEvent` call to complete before the next event is 
processed.

<script src="https://gist.github.com/animeshjain/bcb222531b36d159d4611c4ef63cee5f.js"></script>

#### Output

```
Switch: received event (1, 1a)
GameStateController1: initializing...
Switch: received event (2, 2a)
GameStateController2: initializing...
Switch: received event (1, 1b)
Switch: received event (2, 2b)
GameStateController1: initialized
GameStateController1: received event (1, 1a)
GameStateController2: initialized
GameStateController2: received event (2, 2a)
GameStateController1: processed event (1, 1a)
GameStateController1: received event (1, 1b)
GameStateController2: processed event (2, 2a)
GameStateController2: received event (2, 2b)
GameStateController1: processed event (1, 1b)
GameStateController2: processed event (2, 2b)
```

This is perfect. The `GameStateController` is now processing events one at a time. It also starts receiving events only after
the `initialize` method has completed. We've managed to synchronize the event processing on the split streams.

There are some simplifications here that I've made for the sake of example, but this pattern is what I wanted to demonstrate.
In a very generic sense, it can be useful for event-sourced state machine type of backends, with support for multiple such
state machines running in the same process.
