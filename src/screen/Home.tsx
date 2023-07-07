import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';

interface HomeProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

interface RootStackParamList extends ParamListBase {
  Home: undefined;
  VideoConference: undefined;
  VideoCall: undefined;
  AudioCall: undefined;
  FunctionTest: undefined;
  ChattingRoom: undefined;
}

const Home: React.FC<HomeProps> = ({navigation}) => {
  const handleNavigation = (screen: any) => {
    console.log('Navigating to:', screen);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => handleNavigation('AudioConference')}>
        <Text style={styles.title}>AudioConference</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => handleNavigation('VideoConference')}>
        <Text style={styles.title}>VideoConference</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => handleNavigation('AudioCall')}>
        <Text style={styles.title}>AudioCall</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => handleNavigation('VideoCall')}>
        <Text style={styles.title}>VideoCall</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => handleNavigation('ChattingRoom')}>
        <Text style={styles.title}>ChattingRoom</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.funcBtn}
        onPress={() => handleNavigation('FunctionTest')}>
        <Text style={styles.title}>Function Test</Text>
      </TouchableOpacity>
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  startBtn: ViewStyle;
  funcBtn: ViewStyle;
  title: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  startBtn: {
    width: 300,
    height: 50,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    backgroundColor: 'tomato',
  },
  funcBtn: {
    width: 300,
    height: 50,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,

    borderRadius: 30,
    borderCurve: 'circular',
    backgroundColor: 'purple',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#fff',
  },
});

export default Home;
