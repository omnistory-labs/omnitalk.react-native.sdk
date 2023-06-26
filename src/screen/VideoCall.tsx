// import React, {useContext, useEffect, useState} from 'react';
// // import { useEffect, useRef, useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {RTCView, RTCViewProps} from 'react-native-webrtc';
// import {OmnitalkContext} from '../utils/OmnitalkContext';
// import {debounce} from 'lodash';
// import {
//   CALL_TYPE,
//   VIDEOROOM_TYPE,
// } from 'omnitalk-rn-test2-sdk/lib/typescript/public-types/common';

// function VideoCall({navigation}: any) {
//   const [session, setSession] = useState('');
//   const [roomId, setRoomId] = useState('');
//   const [publishIdx, setPublishIdx] = useState('');

//   const [localStreamRef, setLocalStreamRef] = useState<RTCViewProps>();
//   const [remoteStreamRef, setRemoteStreamRef] = useState<RTCViewProps>();
//   let [audioToggle, setAudioToggle] = useState(true);
//   let [remoteOn, setRemoteOn] = useState(false);
//   let [localOn, setLocalOn] = useState(false);

//   const omnitalk = useContext(OmnitalkContext);

//   // const [callList, setCallList] = useState([]);
//   const [callee, setCallee] = useState('');
//   const [caller, setCaller] = useState('');

//   const handleCalleeChange = debounce(text => {
//     setCallee(text);
//   }, 300);

//   useEffect(() => {
//     omnitalk?.on('event', async msg => {
//       console.log('Event Message : ', msg);
//       switch (msg.cmd) {
//         case 'RINGING_EVENT':
//           setRoomId(msg.room_id);
//           setPublishIdx(msg.publish_idx);
//           break;
//         case 'CONNECTED_EVENT':
//           setRemoteOn(true);
//           break;
//         case 'BROADCASTING_EVENT':
//           setRemoteOn(true);
//           setCaller(msg.caller);
//           break;
//       }
//     });
//   }, [omnitalk]);

//   useEffect(() => {
//     setLocalStreamRef({streamURL: ''});
//     setRemoteStreamRef({streamURL: ''});
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={{flex: 1, marginVertical: 30}}>
//         <View>
//           <Text style={{fontSize: 20}}>Welcome!!</Text>
//         </View>

//         <TouchableOpacity
//           style={styles.btn}
//           onPress={async () => {
//             await omnitalk!
//               .createSession()
//               .then(session => setSession(session.session));
//             const device = await omnitalk!.getDeviceList();

//             console.log(`devices : ${JSON.stringify(device)}`);
//           }}>
//           <Text style={{color: '#fff', fontSize: 20}}>Create Session</Text>
//         </TouchableOpacity>
//         <View style={styles.inputForm}>
//           <TextInput
//             style={styles.input}
//             onChangeText={handleCalleeChange}
//             placeholder="Enter Callee Num"
//             placeholderTextColor={'gray'}
//           />

//           <TouchableOpacity
//             style={styles.btn}
//             onPress={async () => {
//               console.log('callee in offercall is... ', callee);
//               console.log(typeof localStreamRef);

//               await omnitalk!
//                 .offerCall(
//                   CALL_TYPE.VIDEO_CALL,
//                   callee,
//                   localStreamRef,
//                   remoteStreamRef,
//                   false,
//                 )
//                 .then(() => {
//                   setLocalOn(true);
//                   setRemoteOn(true);
//                 });
//               setLocalStreamRef(localStreamRef);
//               setRemoteStreamRef(remoteStreamRef);
//               console.log('.......uuuuuuuuu........ ');
//               console.log(localStreamRef);
//               console.log(remoteStreamRef);
//               setLocalOn(true);

//               console.log(localOn, remoteOn);
//             }}>
//             <Text style={{color: '#fff', fontSize: 20}}>Offer Call</Text>
//           </TouchableOpacity>
//         </View>
//         <View>
//           <Text style={styles.textContainer}>
//             {`Caller ${caller} is calling to you`}
//           </Text>
//         </View>
//         <TouchableOpacity
//           style={styles.btn}
//           onPress={async () => {
//             localStreamRef!.streamURL = '';
//             remoteStreamRef!.streamURL = '';
//             await omnitalk!.answerCall(
//               roomId,
//               VIDEOROOM_TYPE.VIDEO_CALL,
//               Number(publishIdx),
//               localStreamRef,
//               remoteStreamRef,
//             );
//             setLocalStreamRef(localStreamRef);
//             setRemoteStreamRef(remoteStreamRef);
//             setLocalOn(true);
//             setRemoteOn(true);
//           }}>
//           <Text style={{color: '#fff', fontSize: 20}}>Answer Call</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.btn}
//           onPress={async () => {
//             await omnitalk!.setAudioMute(audioToggle);
//             setAudioToggle(!audioToggle);
//           }}>
//           <Text style={{color: '#fff', fontSize: 20}}>AudioMute</Text>
//         </TouchableOpacity>

//         <View>
//           <Text style={styles.textContainer}>
//             {`Audio mute is ${!audioToggle}`}
//           </Text>
//         </View>

//         <TouchableOpacity
//           style={styles.btn}
//           onPress={async () => {
//             await omnitalk!.leave(session);

//             navigation.navigate('Home');
//           }}>
//           <Text style={{color: '#fff', fontSize: 20}}>Leave</Text>
//         </TouchableOpacity>

//         <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//           {localOn && (
//             <RTCView
//               style={{
//                 width: '50%',
//                 height: 100,
//                 backgroundColor: 'gray',
//               }}
//               streamURL={localStreamRef!.streamURL}
//               objectFit={'cover'}
//             />
//           )}

//           {remoteOn && (
//             <RTCView
//               style={{
//                 width: '50%',
//                 height: 100,
//                 backgroundColor: 'lightgray',
//               }}
//               streamURL={remoteStreamRef!.streamURL}
//               objectFit={'cover'}
//             />
//           )}
//         </View>
//       </View>
//     </View> //container
//   );
// }

// export default VideoCall;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   input: {
//     width: 300,
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#999',
//     padding: 10,
//     marginBottom: 12,
//   },
//   btn: {
//     width: 300,
//     height: 40,
//     marginBottom: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontSize: 22,
//     backgroundColor: 'tomato',
//   },

//   roomContainer: {
//     flex: 1,
//     width: '100%',
//   },

//   textContainer: {
//     width: 300,
//     fontSize: 13,
//     backgroundColor: 'lightgray',
//     marginBottom: 10,
//   },

//   inputForm: {
//     width: 300,
//   },
// });
