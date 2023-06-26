// import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import {OmnitalkContext} from '../utils/OmnitalkContext';
// import {NavigationContainer} from '@react-navigation/native';
// import Home from './screen/Home';
// const Stack = createNativeStackNavigator();
// export default function App() {
//   const omnitalk = new Omnitalk('FM51-HITX-IBPG-QN7H', 'FWIWblAEXpbIims');
//   return (
//     <OmnitalkContext.Provider value={omnitalk}>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Home">
//           <Stack.Screen name="Home" component={Home} options={} />

//           <Stack.Screen name="AudioCall" component={AudioCall} options={} />
//           <Stack.Screen name="VideoCall" component={VideoCall} options={} />
//           <Stack.Screen
//             name="videoConference"
//             component={VideoConference}
//             options={}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </OmnitalkContext.Provider>
//   );
// }
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Omnitalk} from 'omnitalk-rn-test2-sdk';
import {OmnitalkContext} from './utils/OmnitalkContext';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screen/Home';
import AudioCall from './screen/AudioCall';
// import VideoCall from './screen/VideoCall';
// import VideoConference from './screen/VideoConference';
const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const omnitalk = new Omnitalk('FM51-HITX-IBPG-QN7H', 'FWIWblAEXpbIims');

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
          {/* <Stack.Screen
            name="VideoCall"
            component={VideoCall}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="VideoConference"
            component={VideoConference}
            options={{headerShown: false}}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </OmnitalkContext.Provider>
  );
};

export default App;