import React, {useContext, useEffect, useState} from 'react';
// import { useEffect, useRef, useState } from "react";
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RTCView} from 'react-native-webrtc';
import {OmnitalkContext} from '../utils/OmnitalkContext';
import {debounce} from 'lodash';
import {CALL_TYPE} from 'omnitalk-rn-ellie-sdk';
import {DEFAULT_ROOM_TYPE} from 'omnitalk-rn-ellie-sdk';

function FunctionTest({navigation}: any) {
  const omnitalk = useContext(OmnitalkContext);
  const [session, setSession] = useState('');
  const [roomId, setRoomId] = useState('');
  const [publisherSession, setpublisherSession] = useState('');
  const [partiList, setPartiList] = useState([]);
  const [roomList, setRoomList] = useState([]);

  const [localStreamRef, setLocalStreamRef] = useState<typeof RTCView>();
  const [remoteStreamRef, setRemoteStreamRef] = useState<typeof RTCView>();
  // let [audioToggle, setAudioToggle] = useState(true);
  let [remoteOn, setRemoteOn] = useState(false);
  let [localOn, setLocalOn] = useState(false);

  // const [callList, setCallList] = useState([]);
  const [callee, setCallee] = useState('');
  const [caller, setCaller] = useState('');

  const handleRoomId = debounce(r => {
    setRoomId(r);
  }, 300);

  useEffect(() => {
    omnitalk?.on('event', async (msg: any) => {
      console.log('Event Message : ', msg);
      switch (msg.cmd) {
        case 'RINGING_EVENT':
          setRoomId(msg.room_id);
          // setPublishIdx(msg.publish_idx);
          setCaller(msg.caller);
          break;
        case 'CONNECTED_EVENT':
          // setRemoteOn(true);
          break;
        case 'BROADCASTING_EVENT':
          // await omnitalk.subscribe(msg.subscribe, remoteStreamRef);
          setpublisherSession(msg.session);
          // if (remoteStreamRef?.streamURL.length > 1) {
          //   setRemoteOn(true);
          // }

          break;
      }
    });
  }, []);
  // omnitalk?.on('event', async (msg: any) => {
  //   console.log('Event Message : ', msg);
  //   switch (msg.cmd) {
  //     case 'RINGING_EVENT':
  //       setRoomId(msg.room_id);
  //       // setPublishIdx(msg.publish_idx);
  //       setCaller(msg.caller);
  //       break;
  //     case 'CONNECTED_EVENT':
  //       // setRemoteOn(true);
  //       break;
  //     case 'BROADCASTING_EVENT':
  //       // await omnitalk.subscribe(msg.subscribe, remoteStreamRef);
  //       setpublisherSession(msg.session);

  //       setRemoteOn(true);
  //       break;
  //   }
  // });

  useEffect(() => {
    setLocalStreamRef({streamURL: ''});
    setRemoteStreamRef({streamURL: ''});
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
              // await omnitalk?.sessionList().then((list: any) => {
              //   setCallList(list.list);
              // });
              await omnitalk
                ?.roomList(DEFAULT_ROOM_TYPE.VIDEO_ROOM)
                .then((list: any) => {
                  setRoomList(list.list);
                });
              // await omnitalk.partiList(roomId).then((list: any) => {
              //   setPartiList(list.list);
              // });
              // console.log(`audio call list : ${JSON.stringify(callList)}`);
              console.log(`room list: ${JSON.stringify(roomList)}`);
              // console.log(`participants: ${JSON.stringify(partiList)}`);
            }}>
            <Text style={{color: '#fff', fontSize: 20}}>Get Room List</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            await omnitalk!
              .createRoom(DEFAULT_ROOM_TYPE.VIDEO_ROOM)
              .then((res: any) => setRoomId(res.room_id));
            const device = await omnitalk!.getDeviceList();

            console.log(`devices : ${JSON.stringify(device)}`);
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Create Room</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.textContainer}>{`${roomId}`}</Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            console.log('dkdkdkdkdkdk');
            await omnitalk!
              .joinRoom(roomId)
              .then(res => console.log('111111111', res));
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Join Room</Text>
        </TouchableOpacity>
        {/* <View style={styles.inputForm}>
          <TextInput
            style={styles.input}
            onChangeText={handleCalleeChange}
            placeholder="Enter Callee Num"
            placeholderTextColor={'gray'}
          />
        </View> */}

        <View>
          <Text style={styles.textContainer}>
            {`${JSON.stringify(partiList)}`}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            // console.log('callee in offercall is... ', callee);
            // console.log(typeof localStreamRef);

            //   await omnitalk!.offerCall(
            //     CALL_TYPE.VIDEO_CALL,
            //     callee,
            //     localStreamRef,
            //     remoteStreamRef,
            //     false,
            //   );
            //   // .then(call => {
            //   //   setLocalOn(prev => true);
            //   //   setRemoteOn(prev => true);
            //   // });
            await omnitalk
              ?.publish(localStreamRef)
              .then((res: any) => setpublisherSession(res.session));
            setLocalStreamRef(localStreamRef);
            setRemoteStreamRef(remoteStreamRef);
            console.log('.......uuuuuuuuu........ ');
            console.log(localStreamRef);
            console.log(remoteStreamRef);
            console.log(publisherSession);
            setLocalOn(true);

            console.log(localOn, remoteOn);
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Publish</Text>
        </TouchableOpacity>

        {/* <View>
          <Text style={styles.textContainer}>
            {`Caller ${caller} is calling to you`}
          </Text>
        </View> */}
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            await omnitalk?.subscribe(publisherSession, remoteStreamRef);

            console.log('#################');
            console.log(remoteStreamRef?.streamURL.length);
            if (remoteStreamRef?.streamURL.length > 1) {
              setRemoteOn(true);
            }
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Subscribe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            await omnitalk!.unsubscribe(publisherSession);
            // setRemoteStreamRef(undefined); // TypeError: Cannot read property 'streamURL' of undefined
            setRemoteStreamRef({streamURL: ''});
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Unsubscribe</Text>
        </TouchableOpacity>
        {/* <TextInput
          style={styles.input}
          onChangeText={handleRoomId}
          placeholder="Enter Room Id to Destroy"
          placeholderTextColor={'gray'}
        /> */}
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            await omnitalk.destroyRoom(roomId);
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>DestroyRoom</Text>
        </TouchableOpacity>

        {/*
        <View>
          <Text style={styles.textContainer}>
            {`Audio mute is ${!audioToggle}`}
          </Text>
        </View> */}

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
              streamURL={localStreamRef!.streamURL}
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
              streamURL={remoteStreamRef!.streamURL}
              objectFit={'cover'}
            />
          )}
        </View>
      </View>
    </View> //container
  );
}

export default FunctionTest;

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
