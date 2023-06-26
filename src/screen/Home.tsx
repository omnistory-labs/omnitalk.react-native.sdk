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
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  startBtn: ViewStyle;
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
    alignItems: 'center',
    backgroundColor: 'tomato',
    padding: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#fff',
  },
});

export default Home;
