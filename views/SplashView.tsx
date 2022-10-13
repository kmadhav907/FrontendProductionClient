import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';

interface SplashViewState {
  animating: boolean;
}
interface SplashViewProps {
  navigation: any;
}
const splashViewImage = require('../assets/SplashScreen.png');
class SplashView extends React.Component<SplashViewProps, SplashViewState> {
  constructor(props: SplashViewProps) {
    super(props);
    this.state = {
      animating: true,
    };
  }
  async componentDidMount() {
    setTimeout(async () => {
      try {
        const introCheck = await AsyncStorage.getItem('introCheck');
        const userObject = await AsyncStorage.getItem('userObject');
        if (introCheck != null) {
          if (userObject != null) {
            const currentActivity = await AsyncStorage.getItem(
              'currentActivity',
            );
            if (currentActivity == null) {
              this.props.navigation.navigate('DashBoardView');
            } else {
              this.props.navigation.navigate('MapView');
            }
          } else {
            this.props.navigation.navigate('LoginView');
          }
        } else {
          this.props.navigation.navigate('IntroView');
        }
      } catch (error) {
        console.log(error);
      }
    }, 2000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={splashViewImage}
          style={{width: '100%', resizeMode: 'contain', height: 170}}
        />
        <View
          style={{
            width: '100%',
            margin: 20,
          }}>
          <Text style={{textAlign: 'center', fontSize: 16}}>By</Text>
          <Text style={{textAlign: 'center', color: '#f9d342', fontSize: 18}}>
            SIMPLE MECHANIAL SOLUTIONS
          </Text>
        </View>
        <ActivityIndicator
          animating={this.state.animating}
          color="yellow"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
    margin: 15,
  },
});
export default SplashView;
