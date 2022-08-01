import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import Carousel from 'pinar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {errorMessage} from '../global/utils';

interface IntroState {
  index: number;
}
interface IntroProps {
  navigation: any;
}
const NUMBER_OF_SLIDES = 2;
const IntroSlide1 = require('../assets/Intro1.png');
const IntroSlide2 = require('../assets/Intro2.png');
const IntroSlide3 = require('../assets/Intro3.png');
class IntroView extends React.Component<IntroProps, IntroState> {
  constructor(props: any) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {}
  handleNextPage = async () => {
    if (this.state.index < NUMBER_OF_SLIDES) {
      errorMessage('Please do check all Intro');
      return;
    }
    try {
      await AsyncStorage.setItem('introCheck', JSON.stringify(true));
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'LoginView'}],
        }),
      );
    } catch (error) {
      console.log('Something went wrong');
    }
  };
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Carousel
          contentContainerStyle={styles.carousel}
          containerStyle={{borderRadius: 10}}
          width={width * 0.8}
          height={height * 0.8}
          dotStyle={{
            backgroundColor: '#DEDEDE',
            height: 10,
            width: 10,
            borderRadius: 10,
            marginLeft: 5,
            marginRight: 5,
          }}
          activeDotStyle={{
            backgroundColor: 'white',
            height: 15,
            width: 15,
            borderRadius: 50,
          }}
          onIndexChanged={({index, total}) => {
            console.log(index + total.toString());
            this.setState({index: index});
          }}
          showsControls={false}
          showsDots={true}>
          <View style={styles.slide}>
            <Image source={IntroSlide1} style={{width: '98%', height: '98%'}} />
          </View>
          <View style={styles.slide}>
            <Image source={IntroSlide2} style={{width: '98%', height: '98%'}} />
          </View>
          <View style={styles.slide}>
            <Image source={IntroSlide3} style={{width: '98%', height: '98%'}} />
          </View>
        </Carousel>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={this.handleNextPage}>
            <Text
              style={{
                fontSize: height / 35,
                color: 'black',
                fontWeight: 'bold',
              }}>
              START
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    width: width,
  },
  carousel: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.8,
    height: height * 0.6,
    backgroundColor: 'white',
  },
  buttonGroup: {
    width: width - 10,
    padding: 5,
    marginTop: 10,
    height: height / 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: '90%',
    width: width * 0.8,
    backgroundColor: '#e6c532',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
export default IntroView;
