import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {debounce} from 'lodash';
import {CALL_TYPE} from 'omnitalk-rn-sdk';
import {TRACK} from 'omnitalk-rn-sdk/dist/types/enums';
import {OmnitalkContext} from '../utils/OmnitalkContext';

interface CallList {}

function AudioCall({navigation}: any) {
  const omnitalk = useContext(OmnitalkContext);
  const [session, setSession] = useState('');
  const [audioToggle, setAudioToggle] = useState(true);
  const [callList, setCallList] = useState<CallList[]>([]);
  const [callee, setCallee] = useState('');
  const [caller, setCaller] = useState('');
  const [sipNumber, setSipNumber] = useState('');

  const handleCalleeChange = debounce((text: string) => {
    setCallee(text);
  }, 300);

  useEffect(() => {
    const eventListener = async (msg: any) => {
      console.log('Event Message : ', msg);
      switch (msg.cmd) {
        case 'RINGING_EVENT':
          setCaller(msg.caller);
          break;
        case 'CONNECTED_EVENT':
          console.log('Audio on');
          break;
        case 'RINGBACK_EVENT':
          console.log('');
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
      <View style={{flex: 1, marginVertical: 50}}>
        <View>
          <Text style={{fontSize: 20}}>Welcome!!</Text>
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            await omnitalk?.createSession().then((res: any) => {
              setSession(res.session);
              setCaller(res.user_id);
            });
            const device = await omnitalk!.getDeviceList();

            console.log(`devices : ${JSON.stringify(device)}`);
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Create Session</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
              await omnitalk?.sessionList().then((list: any) => {
                setCallList(list.list);
              });
            }}>
            <Text style={{color: '#fff', fontSize: 20}}>Get Session List</Text>
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
              try {
                //pass CALL_TYPE.SIPCALL to make a sip call
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
            await omnitalk?.answerCall();
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
