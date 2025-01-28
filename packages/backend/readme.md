# ACC backend

*You need to enable udp port on broadcast.json on your windows documents folder*

## TODOs ##

- Need to re-implement connection to frontend
    - It was using socket.io - Replace this with websocket to be more standard (don't think socket.io is really needed for this)
- Replace binutils with something else that allows type checking
- Make an offline testing tool to test without a running instance of ACC

## Some old readme stuff ##

This backend connects to ACC UDP port (default 9000) and following the API of 0.4. It exposes via websocket on port 6767 the following info:
- gear
- kmh
- delta

For the moment is only implemented partially `REALTIME_CAR_UPDATE` to get the following:
- carIndex
- driverIndex
- gear
- worldPosX
- worldPosY
- yaw
- carLocation
- kmh
- position
- cupPosition
- trackPosition
- splinePosition
- laps
- delta

This was tested on practice mode, so on a race it might not work ¯\_(ツ)_/¯

## Build and start
`npm install`

`npm run start`

