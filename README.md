<p align="center">
  <img src="https://github.com/Luna-omni/readmdtest/assets/125844802/a910cb80-de3b-44d8-9f37-0ccd08b9dd19" width="500" height="100">
</p><br/>

# Omnitalk React-Native SDK

[옴니톡](omnitalk.io)은 webRTC 표준 기술을 이용하여 web/app에서 쉽고 간편하게 실시간 통신을 구현할 수 있는 SDK입니다.<br/>

## Demo 코드 실행 방법
0. service id, service key 얻기 ( src > App.tsx )

1. 소스 코드 다운로드

2. `npm install`

3. `npm run android` for android

4. xcode -> `SdkTestTS.xcworkspace` for ios

* 프로젝트 파일은 패키지 지원 설정과 장치 권한 설정, ios pod install이 자동 실행되도록 세팅되어 있습니다. 

* 일부 리스트 조회 코드를 주석처리했습니다. 확인하고 싶은 리스트를 주석 해제하시면 됩니다.

* subscibe는 같은 방에 들어와 방송을 시작한 사용자의 BROADCASTING_EVENT를 받아 구독하는 예시로 작성되었습니다.

### Function Test

    * create session, device list, room list 및 모든 리스트 , create room, join room, publish, subscribe, unsubscribe, destroy room

### Audio Call

    * create session, session list, offer call, answer call, audio mute/unmute, make sip number

### Video Call

    * create session, participants list, offer call, answer call, video mute/unmute, switch camera

### Chatting Room

    * create session, create room, join room, get message user list, send message, send whisper
