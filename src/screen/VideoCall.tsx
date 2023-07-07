import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RTCView} from 'react-native-webrtc';
import {debounce} from 'lodash';
import {CALL_TYPE} from 'omnitalk-rn-ellie-sdk';
import {TRACK} from 'omnitalk-rn-ellie-sdk/dist/types/enum';
import {OmnitalkContext} from '../utils/OmnitalkContext';

function VideoCall({navigation}: any) {
  const omnitalk = useContext(OmnitalkContext);
  const [session, setSession] = useState('');

  const [localStreamRef, setLocalStreamRef] = useState<typeof RTCView>({
    streamURL: '',
  });
  const [remoteStreamRef, setRemoteStreamRef] = useState<typeof RTCView>({
    streamURL: '',
  });
  let [audioToggle, setAudioToggle] = useState(true);
  let [remoteOn, setRemoteOn] = useState(false);
  let [localOn, setLocalOn] = useState(false);
  const [callList, setCallList] = useState<{}>([]);

  const [callee, setCallee] = useState('');
  const [caller, setCaller] = useState('');

  const handleCalleeChange = debounce(text => {
    setCallee(text);
  }, 300);

  useEffect(() => {
    const eventListener = async (msg: any) => {
      console.log('Event Message : ', msg);
      switch (msg.cmd) {
        case 'RINGING_EVENT':
          setCaller(msg.caller);
          setCallee(msg.callee);
          break;
        case 'CONNECTED_EVENT':
          // setRemoteOn(true);
          setLocalOn(true);
          break;
        case 'BROADCASTING_EVENT':
          if (remoteStreamRef?.streamURL.length > 1) {
            setRemoteOn(true);
          }
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
      <View style={{flex: 1, marginVertical: 30}}>
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
              await omnitalk?.sessionList().then((list: any) => {
                setCallList(list.list);
              });
              console.log(`audio call list : ${JSON.stringify(callList)}`);
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
              console.log('callee in offercall is... ', callee);
              console.log(typeof localStreamRef);

              await omnitalk!.offerCall(
                CALL_TYPE.VIDEO_CALL,
                callee,
                localStreamRef,
                remoteStreamRef,
                false,
              );

              setLocalStreamRef(localStreamRef);
              setRemoteStreamRef(remoteStreamRef);
              setLocalOn(true);

              console.log(localOn, remoteOn);
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
            await omnitalk!.answerCall(
              CALL_TYPE.VIDEO_CALL,
              caller,
              localStreamRef,
              remoteStreamRef,
            );
            setLocalStreamRef(localStreamRef);
            setRemoteStreamRef(remoteStreamRef);
            setLocalOn(true);
            // setRemoteOn(true);
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Answer Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            await omnitalk!.setMute(TRACK.VIDEO);
            setAudioToggle(!audioToggle);
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>VideoMute</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            await omnitalk!.setUnmute(TRACK.VIDEO);
            setAudioToggle(!audioToggle);
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>VideoUnmute</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            await omnitalk!.switchVideoDevice();
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>SwitchVideoDevice</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            await omnitalk!.leave(session);

            navigation.navigate('Home');
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Leave</Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {localOn && (
            <RTCView
              style={{
                width: '50%',
                height: 100,
                backgroundColor: 'gray',
              }}
              streamURL={localStreamRef?.streamURL}
              objectFit={'cover'}
            />
          )}

          {remoteOn && (
            <RTCView
              style={{
                width: '50%',
                height: 100,
                backgroundColor: 'lightgray',
              }}
              streamURL={remoteStreamRef?.streamURL}
              objectFit={'cover'}
            />
          )}
        </View>
      </View>
    </View> //container
  );
}

export default VideoCall;

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
