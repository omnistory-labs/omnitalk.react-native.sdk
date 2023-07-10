import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Omnitalk from 'omnitalk-rn-sdk';
import {OmnitalkContext} from './utils/OmnitalkContext';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screen/Home';
import AudioCall from './screen/AudioCall';
import VideoCall from './screen/VideoCall';
import VideoConference from './screen/VideoConference';
import FunctionTest from './screen/FunctionTest';
import ChattingRoom from './screen/ChattingRoom';
import AudioConference from './screen/AudioConference';
const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  // 발급받은 Service id, Service key를 넣으세요.
  Omnitalk.init('Service id', 'Service key');
  const omnitalk = Omnitalk.getInstance();

  return (
    <OmnitalkContext.Provider value={omnitalk}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AudioCall"
            component={AudioCall}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="VideoCall"
            component={VideoCall}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AudioConference"
            component={AudioConference}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="VideoConference"
            component={VideoConference}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChattingRoom"
            component={ChattingRoom}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FunctionTest"
            component={FunctionTest}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </OmnitalkContext.Provider>
  );
};

export default App;