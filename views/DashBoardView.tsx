import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel from 'pinar';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestLocationPermission } from '../global/utils';
import Geolocation from "react-native-geolocation-service";

import { saveLocation } from '../apiServices/locationApi';

interface DashBoardViewProps {
  navigation: any;
}
interface DashBoardViewState {
  latitude: number | undefined;
  longitude: number | undefined;
  loading: boolean;
}
class DashBoardView extends React.Component<
  DashBoardViewProps,
  DashBoardViewState
> {
  constructor(props: DashBoardViewProps) {
    super(props);
    this.state = {
      latitude: undefined,
      longitude: undefined,
      loading: false
    };
  }
  componentDidMount = async () => {
    console.log(this.props);
    this.setState({ loading: true })

    try {
      const permissionStatus = await requestLocationPermission();
      if (permissionStatus === true) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.setState({ latitude: latitude, longitude: longitude });
          },
          (error) => {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        Geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.setState({ latitude: latitude, longitude: longitude }, () => {
              this.saveLocation();
            });
          },
          (error) => {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
          },
          {
            showLocationDialog: true,
            enableHighAccuracy: true,
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
  saveLocation = async () => {
    const userObject = await AsyncStorage.getItem("userObject");
    const userId = JSON.parse(userObject!).userId;
    const latitude = this.state.latitude;
    const longitude = this.state.longitude;
    saveLocation(userId, latitude as number, longitude as number).then((response: any) => {
      console.log(response.data)
    })
  }
  navigateToBikeRequest = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'BikeRequestPage' }],
      }),
    );
  };
  navigateToCarRequest = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'CarRequestPage' }],
      }),
    );
  }
  navigateToTowRequest = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'TowRequest' }],
      }),
    );
  };
  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <View style={styles.menu}>
          <TouchableOpacity>
            <Image
              source={require('../assets/icons/13-01.png')}
              style={styles.menuIconStyle}
            />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Carousel
            containerStyle={{ borderRadius: 10 }}
            contentContainerStyle={styles.carousel}
            width={width * 0.9}
            height={height * 0.3}
            dotsContainerStyle={{
              padding: 0,
              margin: 0,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}
            dotStyle={{
              backgroundColor: '#DEDEDE',
              height: 8,
              width: 8,
              borderRadius: 10,
              marginLeft: 5,
              marginRight: 5,
            }}
            activeDotStyle={{
              backgroundColor: 'white',
              height: 12,
              width: 12,
              borderRadius: 50,
            }}
            horizontal={true}
            // onIndexChanged={({ index, total }) => {
            //     console.log(index + total.toString())
            //     this.setState({ index: index })

            // }}
            showsControls={false}
            showsDots={true}>
            <View style={styles.slide}>
              <Text>STYLE1</Text>
            </View>
            <View style={styles.slide}>
              <Text>STYLE1</Text>
            </View>
            <View style={styles.slide}>
              <Text>STYLE1</Text>
            </View>
            <View style={styles.slide}>
              <Text>STYLE1</Text>
            </View>
          </Carousel>
          <View style={styles.placeCard}>
            <View style={styles.placeCardIconView}>
              <Image
                style={styles.placheCardIcon}
                source={require('../assets/placeholder.png')}
              />
            </View>
            <View style={styles.placeCardTextMain}>
              <Text>Name , Location</Text>
            </View>
          </View>
          <View style={styles.searchSection}>
            <View style={styles.searchSectionInputView}>
              <TextInput
                style={styles.input}
                placeholder="Search"
                // onChangeText={(searchString) => {this.setState({searchString})}}
                underlineColorAndroid="transparent"
                placeholderTextColor={'#ddd'}
              />
            </View>
            <View style={styles.searchSectionIconView}>
              <Image
                style={styles.searchSectionIcon}
                source={require('../assets/search.png')}
              />
            </View>
          </View>
          <View style={styles.servicesContainer}>
            <TouchableOpacity onPress={this.navigateToCarRequest} style={styles.service}>
              <Image
                style={styles.iconStyle}
                source={require('../assets/icons/1-01.png')}
              />
              <Text style={{ color: 'white', fontSize: 12 }}>
                Car
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.service}
              onPress={this.navigateToBikeRequest}>
              <Image
                style={styles.iconStyle}
                source={require('../assets/icons/2-01.png')}
              />
              <Text style={{ color: 'white', fontSize: 12 }}>Bike</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navigateToTowRequest} style={styles.service}>
              <Image
                style={styles.iconStyle}
                source={require('../assets/icons/3-01.png')}
              />
              <Text style={{ color: 'white', fontSize: 12 }}>
                Towing
              </Text>
            </TouchableOpacity>
            <View style={styles.service}>
              <Image
                style={styles.iconStyle}
                source={require('../assets/icons/4-01.png')}
              />
              <Text style={{ color: 'white', fontSize: 12 }}>
                Water Wash & Spa
              </Text>
            </View>
            <View style={styles.service}>
              <Image
                style={styles.iconStyle}
                source={require('../assets/icons/5-01.png')}
              />
              <Text style={{ color: 'white', fontSize: 12 }}>
                Accessories
              </Text>
            </View>
            <View style={styles.service}>
              <Image
                style={styles.iconStyle}
                source={require('../assets/icons/6-01.png')}
              />
              <Text style={{ color: 'white', fontSize: 12 }}>
                Ask Membership
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomView}>
          <TouchableOpacity>
            <Image
              source={require('../assets/2-01.png')}
              style={styles.bottomIconStyle}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={require('../assets/3-01.png')}
              style={styles.bottomIconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("UserScreen")}>
            <Image
              source={require('../assets/4-01.png')}
              style={styles.bottomIconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#e6c532',
  },
  menu: {
    backgroundColor: 'black',
    paddingTop: height - 750,
    paddingLeft: width - 380,
  },
  menuIconStyle: {
    width: 30,
    height: 30,
  },

  scrollContainer: {
    zIndex: 2,
    height: height - 20,
    width: width,
    backgroundColor: 'black',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  carousel: {
    marginTop: height * 0.05,
  },
  slide: {
    height: height * 0.4,
    width: '100%',
    backgroundColor: 'white',
  },

  placeCard: {
    marginTop: 25,
    flexDirection: 'row',
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  placeCardIconView: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  placheCardIcon: {
    // width: width * 0.09,
    // height: height / 20,
    width: 20,
    height: 20,
  },
  placeCardTextMain: {
    alignSelf: 'center',
  },
  servicesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    flexDirection: 'row',
    marginTop: 25,
  },
  service: {
    width: width * 0.3,
    backgroundColor: '#343434',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: width * 0.3,
    marginLeft: '3%',
    marginTop: 20,
    borderRadius: 10,
  },

  iconStyle: {
    height: '80%',
    width: '80%',
    resizeMode: 'contain',
  },
  searchSection: {
    marginTop: 15,
    flexDirection: 'row',
    width: width * 0.8,
    backgroundColor: '#454545',
    color: '#fff',
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  searchSectionInputView: {
    justifyContent: 'center',
    marginRight: 20,
    width: '100%',
  },
  input: {
    backgroundColor: '#454545',
    color: '#fff',
    padding: 10,
    borderRadius: 15,
  },
  searchSectionIconView: {
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: -60,
  },
  searchSectionIcon: {
    width: 30,
    height: 30,
  },
  bottomView: {
    backgroundColor: '#e6c532',
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 7,
    elevation: 10,
  },
  bottomIconStyle: {
    height: 35,
    width: 35,
  },
});
export default DashBoardView;
