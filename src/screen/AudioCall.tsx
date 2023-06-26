import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {debounce} from 'lodash';

import {OmnitalkContext} from '../utils/OmnitalkContext';
// import {
//   CALL_TYPE,
//   VIDEOROOM_TYPE,
// } from 'omnitalk-rn-test2-sdk/types/public-types/common';

interface CallList {
  // Define your call list item type here
}

function AudioCall({navigation}: any) {
  const [session, setSession] = useState('');
  const [roomId, setRoomId] = useState('');
  const [publishIdx, setPublishIdx] = useState('');
  const [audioToggle, setAudioToggle] = useState(true);

  const omnitalk = useContext(OmnitalkContext);

  const [callList, setCallList] = useState<CallList[]>([]);
  const [callee, setCallee] = useState('');
  const [caller, setCaller] = useState('');

  const handleCalleeChange = debounce((text: string) => {
    setCallee(text);
  }, 300);

  useEffect(() => {
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
  }, [omnitalk]);

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
              .then(session => setSession(session.session));
            const device = await omnitalk!.getDeviceList();

            console.log(`devices : ${JSON.stringify(device)}`);
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Create Session</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
              await omnitalk?.callList().then(list => {
                setCallList(list);
              });
              console.log(`audio call list : ${JSON.stringify(callList)}`);
            }}>
            <Text style={{color: '#fff', fontSize: 20}}>Get Call List</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.textContainer}>
            {`${JSON.stringify(callList)}`}
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
              {
                console.log('callee in offercall is... ', callee);
              }
              try {
                // const offerResult = await omnitalk!.offerCall(
                //   CALL_TYPE.AUDIO_CALL,
                //   callee,
                // );
                // console.log('offerResult is ...', offerResult);
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
            console.log('---------- rrrrrr 2222222-------');
            console.log(roomId, publishIdx);
            // await omnitalk!.answerCall(
            //   roomId,
            //   VIDEOROOM_TYPE.AUDIO_CALL,
            //   Number(publishIdx),
            // );
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Answer Call</Text>
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
              await omnitalk!.setAudioMute(audioToggle);
              setAudioToggle(!audioToggle);
            }}>
            <Text style={{color: '#fff', fontSize: 20}}>AudioMute</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.textContainer}>
            {`Audio mute is ${!audioToggle}`}
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
export default AudioCall;

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
