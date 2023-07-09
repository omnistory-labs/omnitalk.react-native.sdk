# omnitalk.react-native.sdk
<p align="center">
  <img src="https://github.com/Luna-omni/readmdtest/assets/125844802/a910cb80-de3b-44d8-9f37-0ccd08b9dd19" width="500" height="100">
</p><br/>

# Omnitalk React-Native SDK

[옴니톡](omnitalk.io) webRTC 표준 기술을 이용하여 web/app에서 쉽고 간편하게 실시간 통신을 구현할 수 있는 SDK입니다.<br/>


## Feature Overview

| feature          | implemented | ios | android |
| ---------------- | :---------: | :-: | :-----: |
| Audio Call       |     ✔️      | ✔️  |   ✔️    |
| Video Call       |     ✔️      | ✔️  |   ✔️    |
| Chatting room    |     ✔️      | ✔️  |   ✔️    |
| AudioMute        |     ✔️      | ✔️  |   ✔️    |
| VideoMute        |     ✔️      | ✔️  |   ✔️    |
| Video Switch     |     ✔️      |  ✔️ |   ✔️    |

<br/>

## Installation
```
npm i omnitalk-rn-sdk
```

## Documentation

쉽고 자세한 [문서](https://docs.omnitalk.io/react-native)를 제공하고 있습니다. 

<br/>

## Issue

옴니톡을 사용하면서 발생하는 이슈나 궁금점은 [issue](https://github.com/omnistory-labs/omnitalk.react-native.sdk/issues) 탭를 이용해 주세요.


## Example Projects

옴니톡 SDK로 구현된 간단한 [기능 테스트 데모](https://github.com/omnistory-labs/omnitalk.react-native.sdk/tree/demo)를 제공합니다.

- 기본 기능 Function Test
	* create session, room list, create room, join room, publish, subscribe, unsubscribe, destroy room
- Audio Call
	* create session, session list, offer call, answer call, audio mute/unmute, make sip number
- Video Call
	* create session, participants list, offer call, answer call, video mute/unmute, switch camera
- Chatting Room
	* create session, create room, join room, get message user list, send message, send whisper
