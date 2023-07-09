import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {OmnitalkContext} from '../utils/OmnitalkContext';
import {debounce} from 'lodash';
import {DEFAULT_ROOM_TYPE, MESSAGE_ACTION} from 'omnitalk-rn-sdk';

function ChattingRoom({navigation}: any) {
  const omnitalk = useContext(OmnitalkContext);
  const [session, setSession] = useState('');
  const [roomId, setRoomId] = useState('');
  const [text, setText] = useState('');
  const [whisper, setWhisper] = useState('');
  const [target, setTarget] = useState('');
  const handleTextChange = debounce(text => {
    setText(text);
  }, 300);
  const handleWhisper = debounce(whisper => {
    setWhisper(whisper);
  });
  const handleTarget = debounce(target => {
    setTarget(target);
  });

  const [msgArr, setMsgArr] = useState<string[]>(['']);
  const [msgUsers, setMsgUsers] = useState<Array<{}>>([{}]);
  const [chatOff, setChatOff] = useState(true);

  useEffect(() => {
    const eventListener = async (msg: any) => {
      console.log('Event Message : ', msg);
      switch (msg.cmd) {
        case 'MESSAGE_EVENT':
          if (msg.action === 'whisper') {
            const updated = [
              ...msgArr,
              `${msg.user_id}의 귓속말 : ${msg.message}`,
            ];
            setMsgArr(updated);
          } else if (msg.message) {
            const updated = [...msgArr, `${msg.user_id} : ${msg.message}`];
            setMsgArr(updated);
          }
          break;
        case 'CONNECTED_EVENT':
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
        {/* <View>
          <Text style={{fontSize: 20}}>Welcome!!</Text>
        </View> */}

        {chatOff && (
          <>
            <TouchableOpacity
              style={styles.btn}
              onPress={async () => {
                await omnitalk!
                  .createSession()
                  .then((session: any) => setSession(session.session));
                await omnitalk!
                  .createRoom(DEFAULT_ROOM_TYPE.VIDEO_ROOM)
                  .then((res: any) => {
                    setRoomId(res.room_id);
                    omnitalk!.joinRoom(res.room_id);
                  })
                  .then(() => setChatOff(false));
              }}>
              <Text style={{color: '#fff', fontSize: 20}}>Create Session</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={async () => {
                await omnitalk!
                  .createRoom(DEFAULT_ROOM_TYPE.VIDEO_ROOM)
                  .then((res: any) => setRoomId(res.room_id));
              }}>
              <Text style={{color: '#fff', fontSize: 20}}>Create Room</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.textContainer}>{`${roomId}`}</Text>
            </View>

            <TouchableOpacity
              style={styles.btn}
              onPress={async () => {
                await omnitalk!.joinRoom(roomId).then(() => setChatOff(false));
              }}>
              <Text style={{color: '#fff', fontSize: 20}}>Join Room</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            await omnitalk!
              .getAvailableMessageUsers()
              .then(res => setMsgUsers(res.list));
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>
            Get Message User List
          </Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.textContainer}>
            {`${JSON.stringify(msgUsers)}`}
          </Text>
        </View>
        <View style={styles.inputForm}>
          <TextInput
            style={styles.input}
            onChangeText={handleTextChange}
            placeholder="Enter Message"
            placeholderTextColor={'gray'}
          />

          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
              await omnitalk
                ?.sendMessage(MESSAGE_ACTION.SEND, text)
                .then(() => {
                  const updated = [...msgArr, `나: ${text}`];
                  setMsgArr(updated);
                });
            }}>
            <Text style={{color: '#fff', fontSize: 20}}>Send Message</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={handleWhisper}
            placeholder="Enter Whisper Message"
            placeholderTextColor={'gray'}
          />
          <TextInput
            style={styles.input}
            onChangeText={handleTarget}
            placeholder="To whom: "
            placeholderTextColor={'gray'}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
              await omnitalk?.sendMessage(
                MESSAGE_ACTION.WHISPER,
                whisper,
                target,
              );
              const updated = [...msgArr, `@${target}: ${whisper}`];
              setMsgArr(updated);
            }}>
            <Text style={{color: '#fff', fontSize: 20}}>Send Whisper</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={msgArr}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => <Text style={{padding: 4}}> {item}</Text>}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            await omnitalk!.leave(session);

            navigation.navigate('Home');
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Leave</Text>
        </TouchableOpacity>
      </View>
    </View> //container
  );
}

export default ChattingRoom;

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
