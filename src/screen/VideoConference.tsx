// import React, {useContext} from 'react';
// import {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {RTCView, RTCViewProps} from 'react-native-webrtc';
// import {OmnitalkContext} from '../utils/OmnitalkContext';
// import {VIDEOROOM_TYPE} from 'omnitalk-rn-test2-sdk/lib/typescript/public-types/common';

// function VideoConference({navigation}: any) {
//   const [meetingRoom, setMeetingRoom] = useState(false);
//   const [roomName, setRoomName] = useState('');
//   const [session, setSession] = useState('');
//   const [roomId, setRoomId] = useState('');
//   const [toggle, setToggle] = useState(true);
//   const [audioToggle, setAudioToggle] = useState(true);
//   const [joinBtn, setJoinBtn] = useState(false);
//   //   const localStreamRef = useRef<RTCViewProps>();
//   //   const streamRef = useRef<RTCViewProps[]>([]);
//   const [localStreamRef, setLocalStreamRef] = useState<RTCViewProps>();
//   const remoteStreamRef1: RTCViewProps = {streamURL: ''};
//   const remoteStreamRef2: RTCViewProps = {streamURL: ''};
//   const remoteStreamRef3: RTCViewProps = {streamURL: ''};
//   const [remoteStreamRef, setRemoteStreamRef] = useState<RTCViewProps[]>([
//     remoteStreamRef1,
//     remoteStreamRef2,
//     remoteStreamRef3,
//   ]);

//   let count = 0;
//   const omnitalk = useContext(OmnitalkContext);
//   const countUp = () => {
//     count++;
//   };

//   const [subResult, setSubResult] = useState(0);
//   let [localOn, setLocalOn] = useState(false);
//   let [remoteOn, setRemoteOn] = useState(false);

//   function _onCallback() {
//     omnitalk?.on('event', async e => {
//       switch (e.cmd) {
//         case 'SESSION_EVENT':
//           // console.log("SESSION_EVENT sesson id is...", e.session);
//           break;
//         case 'BROADCASTING_EVENT':
//           await omnitalk!
//             .subscribe(e.publish_idx, remoteStreamRef[count])
//             .then(result => {
//               setSubResult(result.publish_idx);
//               console.log(subResult);
//               countUp();
//               setRemoteOn(true);
//             });

//           break;
//       }
//     });
//   }
//   useEffect(() => {
//     _onCallback();
//   });
//   useEffect(() => {
//     setLocalStreamRef({streamURL: ''});
//   }, []);

//   return (
//     <View style={styles.container}>
//       {!meetingRoom ? (
//         <View style={{flex: 1, marginVertical: 50}}>
//           <View style={styles.title}>
//             <Text style={{fontSize: 20}}>Welcome!!</Text>
//           </View>
//           <TouchableOpacity
//             style={styles.btn}
//             onPress={async () => {
//               await omnitalk!
//                 .createSession()
//                 .then(session => setSession(session.session));
//               const device = await omnitalk!.getDeviceList();
//               console.log(`createsession : ${session}`);
//               console.log(`devices : ${JSON.stringify(device)}`);
//             }}>
//             <Text style={{color: '#fff', fontSize: 20}}>create session</Text>
//           </TouchableOpacity>
//           <View style={styles.inputForm}>
//             <TextInput
//               style={styles.input}
//               onChangeText={text => setRoomName(text)}
//               placeholder="Enter Room Name"
//               placeholderTextColor={'gray'}
//             />

//             <TouchableOpacity
//               style={styles.btn}
//               onPress={async () => {
//                 const room = await omnitalk!
//                   .createRoom(VIDEOROOM_TYPE.VIDEO_ROOM, roomName)
//                   .then(res => {
//                     console.log('create room result is..', JSON.stringify(res));
//                     setRoomId(res.room_id);
//                     setJoinBtn(true);
//                   });
//                 console.log('create room result is..', room);
//               }}>
//               <Text style={{color: '#fff', fontSize: 20}}>Create Room</Text>
//             </TouchableOpacity>
//           </View>
//           {/* ================== */}

//           {joinBtn && (
//             <View>
//               <TouchableOpacity
//                 style={styles.btn}
//                 onPress={async () => {
//                   setMeetingRoom(true);
//                   await omnitalk!.joinRoom(roomId);
//                 }}>
//                 <Text style={{color: '#fff', fontSize: 20}}>JoinRoom</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//           <View style={styles.inputForm}>
//             <TouchableOpacity
//               style={styles.btn}
//               onPress={async () => {
//                 console.log(`session1 : ${session}`);
//                 await omnitalk!.leave(session);
//                 console.log(`session2 : ${session}`);
//                 navigation.navigate('Home');
//               }}>
//               <Text style={{color: '#fff', fontSize: 20}}>Leave</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ) : (
//         <View style={styles.roomContainer}>
//           <View style={{alignItems: 'center'}}>
//             <TouchableOpacity
//               style={styles.btn}
//               onPress={async () => {
//                 // leave(sessionIdRef.current, roomId);
//                 console.log(`session1 : ${session}`);
//                 await omnitalk!.leave(session);

//                 navigation.navigate('Home');
//               }}>
//               <Text>나가기</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.btn}
//               onPress={async () => {
//                 await omnitalk!.publish(localStreamRef as RTCViewProps);
//                 console.log('------ ppppppppppppp--------');
//                 // console.log(localStreamRef);
//                 // await omnitalk!.testPublish(localStreamRef as RTCViewProps);
//                 setLocalStreamRef(localStreamRef);
//                 setLocalOn(true);

//                 console.log('------ ppppppppppppp--------');
//                 console.log(localStreamRef!.streamURL);
//               }}>
//               <Text>Publish</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.btn}
//               onPress={async () => {
//                 const partiResult = await omnitalk!.partiList(roomId);
//                 const pubIdxList = partiResult.parti_list.map(
//                   parti => parti.publish_idx,
//                 );
//                 for (let i = 0; i < pubIdxList.length; i++) {
//                   await omnitalk!.subscribe(
//                     pubIdxList[i],
//                     remoteStreamRef[count],
//                   );
//                   setRemoteStreamRef([...remoteStreamRef]);
//                   countUp();
//                 }
//               }}>
//               <Text>PartiList</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.btn}
//               onPress={async () => {
//                 await omnitalk!.setVideoMute(toggle);
//                 setToggle(!toggle);
//               }}>
//               <Text>VideoMute</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.btn}
//               onPress={async () => {
//                 await omnitalk!.setAudioMute(audioToggle);
//                 setAudioToggle(!audioToggle);
//               }}>
//               <Text>AudioMute</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.btn}
//               onPress={async () => {
//                 // await omnitalk.setVideoDevice();
//                 // await omnitalk.setResolution("FHD");
//                 // await omnitalk!.setLocalVolume(7);
//                 // console.log(
//                 //   `subResult["pub_session"] : ${subResult.pub_session}`,
//                 // );
//                 // await omnitalk!.setRemoteVolume(subResult.pub_session, 0.5);
//               }}>
//               {/* <Text>Switch Camera</Text> */}
//               <Text>set volume</Text>
//             </TouchableOpacity>
//             <View style={{flexDirection: 'column', alignItems: 'center'}}>
//               <View style={{flexDirection: 'row'}}>
//                 {localOn && (
//                   <RTCView
//                     style={{
//                       width: '30%',
//                       height: 100,
//                       backgroundColor: 'gray',
//                     }}
//                     streamURL={localStreamRef!.streamURL}
//                     objectFit={'cover'}
//                   />
//                 )}
//                 {remoteStreamRef.map(
//                   (item, index) =>
//                     remoteOn && (
//                       <RTCView
//                         key={index}
//                         streamURL={item.streamURL}
//                         style={{
//                           width: '20%',
//                           height: '100%',
//                         }}
//                         objectFit={'cover'}
//                       />
//                     ),
//                 )}
//               </View>
//             </View>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }
// export default VideoConference;

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

//   inputForm: {
//     width: 300,
//   },

//   title: {
//     width: 300,
//   },
// });
