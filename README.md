# jsjsj

**JavaScript Johann Sebastian Joust** is a very raw, dependency slim, opensource implementation of the funny multiplayer not-video game Johann Sebastian Joust.

It's meant to be for illustrative purposes only: you'll find a slim server implementation, an HTML5 accelerometer monitor and audio player with variable pitch support, vibration and a simple technique to obtain synced audio and gameplay on multiple devices.

Obviously you can also have fun playing it - but I suggest you to [buy and play the full game](http://www.jsjoust.com/), which is way better! ;)

## Setup

Make sure you've `openssl` installed. Clone this repository and run:

```
# npm install
...
# openssl genrsa -out certs/key.pem
...
# openssl req -new -key certs/key.pem -out certs/csr.pem
[Hit enter to the end]
# openssl x509 -req -days 9999 -in certs/csr.pem -signkey certs/key.pem -out certs/cert.pem
...
# node server.js
Starting server on port 5001
```

Find some friends connected to the same server network, point your modern browser&copy; to `https://<server address>:5001`, accept the security warning, and you're ready.

## How to play

- After loading the game, join a game room.
- Wait for your friends. In the meanwhile you can fiddle with options:
  - **Always play audio**: always plays music on your device.
  - **Disable blink**: disable screen blinking when you're moving too much
  - **Disable vibrate**: disable vibration when you're moving too much
- When you're ready, press the OK button. The clients will sync - once they're ready, hit the OK button once again to start.
- Try to shake your opponent device but don't move your one too fast! You've to move accordingly to the music: when it's slow, you've to move slowly but when it's played fast, you can move faster!
- The last man standing wins!

## Thanks

Thanks to [pascalbros](https://github.com/pascalbros/) for suggesting the game in first place!
