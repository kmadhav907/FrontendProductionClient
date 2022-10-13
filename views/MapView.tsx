import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Dimensions, Text, ToastAndroid, Touchable, View} from 'react-native';
import {saveLocation} from '../apiServices/locationApi';
import {requestLocationPermission} from '../global/utils';
import Geolocation from 'react-native-geolocation-service';
import MapView from '../components/Maps/Map';
import {CommonActions} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

interface RequestMapViewProps {
  navigation: any;
}
interface RequestMapViewState {
  isMapLoaded: boolean;
  loading: boolean;
  latitude: number | undefined;
  longitude: number | undefined;
  showAlertDialog: boolean;
  activityDetails: any;
}
class RequestMapView extends React.Component<
  RequestMapViewProps,
  RequestMapViewState
> {
  constructor(props: RequestMapViewProps) {
    super(props);
    this.state = {
      isMapLoaded: false,
      loading: false,
      latitude: undefined,
      longitude: undefined,
      showAlertDialog: false,
      activityDetails: '',
    };
  }
  componentDidMount = async () => {
    this.setState({loading: true});

    const currentActivity = await AsyncStorage.getItem('currentActivity');
    if (currentActivity != null) {
      this.setState({activityDetails: JSON.parse(currentActivity)}, () => {});
    }

    try {
      const permissionStatus = await requestLocationPermission();
      if (permissionStatus === true) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            this.setState({latitude: latitude, longitude: longitude});
          },
          error => {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
        Geolocation.watchPosition(
          position => {
            const {latitude, longitude} = position.coords;
            this.setState(
              {
                latitude: latitude,
                longitude: longitude,
              },
              async () => {
                this.saveLocation();
              },
            );
          },
          error => {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
          },
          {
            showLocationDialog: true,
            enableHighAccuracy: true,
          },
        );
      }
    } catch (err) {
      console.log(err);
    }
    this.setState({loading: false});
  };
  saveLocation = async () => {
    const userObject = await AsyncStorage.getItem('userObject');
    const userId = JSON.parse(userObject!).userId;
    const latitude = this.state.latitude;
    const longitude = this.state.longitude;
    saveLocation(userId, latitude as number, longitude as number).then(
      (response: any) => {
        console.log(response.data);
      },
    );
  };
  handleAlertDialog = () => {
    this.setState({showAlertDialog: true});
    // Do something
  };
  getActivity = () => {
    // if (this.state.activityDetails!['typeOfActivity']) {
    //   console.log(this.state.activityDetails!['typeOfActivity']);
    // }
    switch (this.state.activityDetails!['typeOfActivity']) {
      case 'CarActivity':
        return (
          <>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                marginTop: 5,
                marginBottom: 5,
              }}>
              {'Car Details'}
            </Text>
            <Text style={{color: 'black', fontSize: 22, fontWeight: '500'}}>
              {this.state.activityDetails['selectedCar']}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '300',
                marginTop: 5,
                marginBottom: 2,
              }}>
              {this.state.activityDetails['carRegisterationNumber'] &&
                this.state.activityDetails[
                  'carRegisterationNumber'
                ].toUpperCase()}
            </Text>
          </>
        );
      case 'BikeActivity':
        return (
          <>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                marginTop: 5,
                marginBottom: 5,
              }}>
              {'Bike Details'}
            </Text>
            <Text style={{color: 'black', fontSize: 22, fontWeight: '500'}}>
              {this.state.activityDetails['selectedBike']}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '300',
                marginTop: 5,
                marginBottom: 2,
              }}>
              {this.state.activityDetails['bikeRegisterationNumber'] &&
                this.state.activityDetails[
                  'bikeRegisterationNumber'
                ].toUpperCase()}
            </Text>
          </>
        );
      default:
        return <></>;
    }
  };
  render() {
    if (this.state.loading) {
      return (
        <View style={{height: height, width: width, backgroundColor: 'yellow'}}>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={{height: height, width: width, backgroundColor: 'yellow'}}>
        <MapView
          latitude={this.state.latitude as number}
          longitude={this.state.longitude as number}
          // navigate={this.navigateToBillingHandler}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            margin: 10,
            width: width - 20,
            alignSelf: 'center',
            backgroundColor: 'yellow',
            zIndex: 30,
            padding: 10,
          }}>
          <>{this.getActivity()}</>
        </View>
      </View>
    );
  }
}
export default RequestMapView;
