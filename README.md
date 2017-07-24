# Fullstack Plays

Inspired by Twitch Plays Pokemon, this is an app where users can collaboratively control a game character via chat commands.

[Watch a demo with ~20 players!](http://www.youtube.com/watch?v=OtQwlBppBYY)

## Main Features
- Collaborative Item Collection Game
  - Players path-find as a group to collect all items before time runs out
  - Time pressure + free movement introduce chaos as players make conflicting decisions
  - Majority-rules gameplay: On an interval, executes most popular command in a time window
- Real-time Chat App
  - Recognizes game-related keywords
  - Only auto-scrolls when users are scrolled to the bottom of all messages
  - Supports anonymity via free renaming (though names must be unique)
  - Individuals can customize their chat color if unhappy with defaults
  - Inline emotes via chat keywords

## Setup

To run this on your own machine:
```
npm install
npm start
```

