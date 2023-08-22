import React, {useContext} from 'react';
import {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RTCView} from 'react-native-webrtc';
import {OmnitalkContext} from '../utils/OmnitalkContext';
import {DEFAULT_ROOM_TYPE} from 'omnitalk-rn-sdk';
import {TRACK} from 'omnitalk-rn-sdk/dist/types/enums';

function VideoConference({navigation}: any) {
  const omnitalk = useContext(OmnitalkContext);
  const [meetingRoom, setMeetingRoom] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [session, setSession] = useState('');
  const [roomId, setRoomId] = useState('');
  const [toggle, setToggle] = useState(true);
  const [audioToggle, setAudioToggle] = useState(true);
  const [joinBtn, setJoinBtn] = useState(false);
  //   const localStreamRef = useRef<RTCViewProps>();
  //   const streamRef = useRef<RTCViewProps[]>([]);
  const [localStreamRef, setLocalStreamRef] = useState<typeof RTCView>({
    streamURL: '',
  });
  const remoteStreamRef1: typeof RTCView = {streamURL: ''};
  const remoteStreamRef2: typeof RTCView = {streamURL: ''};
  const remoteStreamRef3: typeof RTCView = {streamURL: ''};
  const [remoteStreamRef, setRemoteStreamRef] = useState<(typeof RTCView)[]>([
    remoteStreamRef1,
    remoteStreamRef2,
    remoteStreamRef3,
  ]);

  let count = 0;

  const countUp = () => {
    count++;
  };

  let [localOn, setLocalOn] = useState(false);
  let [remoteOn, setRemoteOn] = useState(false);

  useEffect(() => {
    const eventListener = async (msg: any) => {
      console.log('Event Message : ', msg);
      switch (msg.cmd) {
        case 'CONNECTED_EVENT':
          break;
        case 'BROADCASTING_EVENT':
          console.log('remote count is ...', count);
          await omnitalk
            ?.subscribe(msg.session, remoteStreamRef[count])
            .then(() => {
              countUp();
              if (remoteStreamRef[count].streamURL.length > 1) {
                setRemoteOn(true);
              }
            });

          break;
      }
    };

    omnitalk?.on('event', eventListener);
    return () => {
      omnitalk?.off('event', eventListener);
    };
  }, []);

  return (
    <View style={styles.container}>
      {!meetingRoom ? (
        <View style={{flex: 1, marginVertical: 50}}>
          <View style={styles.title}>
            <Text style={{fontSize: 20}}>Welcome!!</Text>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
              await omnitalk!
                .createSession()
                .then((session: any) => setSession(session.session));
              const device = await omnitalk!.getDeviceList();
              console.log(`createsession : ${session}`);
              console.log(`devices : ${JSON.stringify(device)}`);
            }}>
            <Text style={{color: '#fff', fontSize: 20}}>create session</Text>
          </TouchableOpacity>
          <View style={styles.inputForm}>
            <TextInput
              style={styles.input}
              onChangeText={text => setRoomName(text)}
              placeholder="Enter Room Name"
              placeholderTextColor={'gray'}
            />

            <TouchableOpacity
              style={styles.btn}
              onPress={async () => {
                const room = await omnitalk
                  ?.createRoom(DEFAULT_ROOM_TYPE.VIDEO_ROOM, roomName)
                  .then((res: any) => {
                    setRoomId(res.room_id);
                    setJoinBtn(true);
                  });
                console.log('create room result is..', room);
              }}>
              <Text style={{color: '#fff', fontSize: 20}}>Create Room</Text>
            </TouchableOpacity>
          </View>
          {/* ================== */}

          {joinBtn && (
            <View>
              <TouchableOpacity
                style={styles.btn}
                onPress={async () => {
                  setMeetingRoom(true);
                  await omnitalk!.joinRoom(roomId);
                }}>
                <Text style={{color: '#fff', fontSize: 20}}>JoinRoom</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.inputForm}>
            <TouchableOpacity
              style={styles.btn}
              onPress={async () => {
                console.log(`session1 : ${session}`);
                await omnitalk!.leave(session);
                console.log(`session2 : ${session}`);
                navigation.navigate('Home');
              }}>
              <Text style={{color: '#fff', fontSize: 20}}>Leave</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.roomContainer}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={async () => {
                  // leave(sessionIdRef.current, roomId);
                  console.log(`session1 : ${session}`);
                  await omnitalk!.leave(session);

                  navigation.navigate('Home');
                }}>
                <Text>나가기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={async () => {
                  await omnitalk?.publish(localStreamRef as typeof RTCView);
                  setLocalStreamRef(localStreamRef);
                  setLocalOn(true);
                }}>
                <Text>Publish</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={async () => {
                  let partilist = [];
                  await omnitalk
                    ?.partiList(roomId)
                    .then(res => (partilist = res.list));

                  console.log(partilist);
                  const pubIdxList = (partilist as any).list.map(
                    (parti: any) => parti.session,
                  );
                  console.log(pubIdxList);
                  for (let i = 0; i < pubIdxList.length; i++) {
                    await omnitalk!.subscribe(
                      pubIdxList[i],
                      remoteStreamRef[count],
                    );
                    setRemoteStreamRef([...remoteStreamRef]);
                    countUp();
                  }
                }}>
                <Text>PartiList & Subscribe</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={async () => {
                  await omnitalk?.setMute(TRACK.VIDEO);
                }}>
                <Text>VideoMute</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={async () => {
                  await omnitalk?.setUnmute(TRACK.VIDEO);
                }}>
                <Text>VideoUnmute</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={async () => {
                  await omnitalk?.switchVideoDevice();
                }}>
                <Text>Switch Camera</Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                  {localOn && (
                    <RTCView
                      style={{
                        width: '30%',
                        height: 100,
                        backgroundColor: 'gray',
                      }}
                      streamURL={localStreamRef?.streamURL}
                      objectFit={'cover'}
                    />
                  )}
                  {remoteStreamRef.map(
                    (item, index) =>
                      remoteOn && (
                        <RTCView
                          key={index}
                          streamURL={item.streamURL}
                          style={{
                            width: '20%',
                            height: '100%',
                          }}
                          objectFit={'cover'}
                        />
                      ),
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
export default VideoConference;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 40,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginBottom: 12,
  },
  btn: {
    width: 300,
    height: 40,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    backgroundColor: 'tomato',
  },

  roomContainer: {
    flex: 1,
    width: '100%',
  },

  inputForm: {
    width: 300,
  },

  title: {
    width: 300,
  },
});
