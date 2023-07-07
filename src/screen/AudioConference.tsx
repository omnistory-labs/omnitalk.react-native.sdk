import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {debounce} from 'lodash';

// import {OmnitalkContext} from '../utils/OmnitalkContext';
import {CALL_TYPE, DEFAULT_ROOM_TYPE} from 'omnitalk-rn-ellie-sdk';
import {TRACK} from 'omnitalk-rn-ellie-sdk/dist/types/enum';

interface CallList {
  // Define your call list item type here
}

function AudioConference({navigation}: any, {omnitalk}: any) {
  // const omnitalk = useContext(OmnitalkContext);

  const [session, setSession] = useState('');
  const [roomId, setRoomId] = useState('');
  const [roomList, setRoomList] = useState<CallList[]>([]);
  const [partiList, setPartiList] = useState<CallList[]>([]);
  const [publishIdx, setPublishIdx] = useState('');
  const [audioToggle, setAudioToggle] = useState(true);

  const [callList, setCallList] = useState<CallList[]>([]);
  const [callee, setCallee] = useState('');
  const [caller, setCaller] = useState('');
  const [sipNumber, setSipNumber] = useState('');

  // const handleSipCall = debounce(res => {
  //   setSipNumber(res);
  // }, 300);

  const handleCalleeChange = debounce((text: string) => {
    setCallee(text);
  }, 300);

  // useEffect(() => {
  //   omnitalk?.on('event', async (msg: any) => {
  //     console.log('Event Message : ', msg);
  //     switch (msg.cmd) {
  //       case 'SESSION_EVENT':
  //         // console.log("SESSION_EVENT session id is...", e.session);
  //         break;
  //       case 'RINGING_EVENT':
  //         setRoomId(msg.room_id);
  //         setPublishIdx(msg.publish_idx);
  //         setCaller(msg.caller);
  //         break;
  //     }
  //   });
  //   omnitalk?.on('event', async (msg: any) => {});
  //   omnitalk?.on('event', async (msg: any) => {});
  // }, [omnitalk]);
  omnitalk?.on('event', async (msg: any) => {
    console.log('Event Message : ', msg);
    switch (msg.cmd) {
      case 'SESSION_EVENT':
        // console.log("SESSION_EVENT session id is...", e.session);
        break;
      case 'RINGING_EVENT':
        setRoomId(msg.room_id);
        setPublishIdx(msg.publish_idx);
        setCaller(msg.caller);
        break;
    }
  });

  return (
    <View style={styles.container}>
      <View style={{flex: 1, marginVertical: 50}}>
        <View>
          <Text style={{fontSize: 20}}>Welcome!!</Text>
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            await omnitalk!
              .createSession()
              .then((session: any) => setSession(session.session));
            const device = await omnitalk!.getDeviceList();

            console.log(`devices : ${JSON.stringify(device)}`);
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Create Session</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
              // await omnitalk?.sessionList().then((list: any) => {
              //   setCallList(list.list);
              // });
              await omnitalk
                ?.roomList(DEFAULT_ROOM_TYPE.AUDIO_ROOM)
                .then((list: any) => {
                  setRoomList(list.list);
                });
              // await omnitalk.partiList().then((list: any) => {
              //   setPartiList(list.list);
              // });
            }}>
            <Text style={{color: '#fff', fontSize: 20}}>Get Call List</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.textContainer}>
            {`${JSON.stringify(partiList)}`}
            {/* {`${JSON.stringify(callList)}`} */}
            {/* {`${JSON.stringify(roomList)}`} */}
          </Text>
        </View>
        <View style={styles.inputForm}>
          <TextInput
            style={styles.input}
            onChangeText={handleCalleeChange}
            placeholder="Enter Callee Num"
            placeholderTextColor={'gray'}
          />

          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
              try {
                // CALL_TYPE.SIPCALL
                await omnitalk!.offerCall(CALL_TYPE.AUDIO_CALL, callee);
              } catch (err) {
                console.error(err);
              }
            }}>
            <Text style={{color: '#fff', fontSize: 20}}>Offer Call</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.textContainer}>
            {`Caller ${caller} is calling to you`}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            await omnitalk!.answerCall();
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Answer Call</Text>
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
              await omnitalk!.setMute(TRACK.AUDIO);
              setAudioToggle(!audioToggle);
            }}>
            <Text style={{color: '#fff', fontSize: 20}}>AudioMute</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
              await omnitalk!.setUnmute(TRACK.AUDIO);
              setAudioToggle(!audioToggle);
            }}>
            <Text style={{color: '#fff', fontSize: 20}}>AudioUnmute</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.textContainer}>
            {`Audio mute is ${!audioToggle}`}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            await omnitalk!
              .makeSipNumber(sipNumber)
              .then((res: any) => setSipNumber(res));
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Make a Sip Number</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.textContainer}>
            {`${JSON.stringify(sipNumber)}`}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
              await omnitalk!.leave(session);

              navigation.navigate('Home');
            }}>
            <Text style={{color: '#fff', fontSize: 20}}>Leave</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default AudioConference;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    backgroundColor: 'tomato',
  },

  roomContainer: {
    flex: 1,
    width: '100%',
  },

  textContainer: {
    width: 300,
    fontSize: 13,
    backgroundColor: 'lightgray',
    marginBottom: 10,
  },

  inputForm: {
    width: 300,
  },
});
