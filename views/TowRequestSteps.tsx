import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {errorMessage} from '../global/utils';
interface BillingScreenProps {
  navigation: any;
}

interface BillingScreenState {
  towingVehicle: string;
  vehicleNumber: string;
  currentStepsForRequest: number;
  loading: boolean;
  showPLeaseFillVehicleNoModal: boolean;
}

class BillingScreen extends React.Component<
  BillingScreenProps,
  BillingScreenState
> {
  constructor(props: BillingScreenProps) {
    super(props);
    this.state = {
      vehicleNumber: '',
      towingVehicle: '',
      currentStepsForRequest: 0,
      loading: false,
      showPLeaseFillVehicleNoModal: false,
    };
  }


  setShowModalFalse = async() => {
    this.setState({
      showPLeaseFillVehicleNoModal: false,
    })
  }

  render(): React.ReactNode {
    if (this.state.loading) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }

    if (!this.state.loading && this.state.currentStepsForRequest === 0) {
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
            <View style={styles.vehicleSelectTextContainer}>
              <Text style={styles.vehicleSelectText}>Towing</Text>
            </View>
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

            <View style={styles.selectVehicleContainer}>
              <Text style={styles.selectVehicleText}>Select Your Vehicle</Text>
            </View>

            <View style={styles.selectVehiclButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({towingVehicle: 'CAR'});
                }}>
                <Text
                  style={
                    this.state.towingVehicle === 'CAR'
                      ? styles.selectVehicleButtonStyleonClick
                      : styles.selectVehicleButtonStyle
                  }>
                  Car
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({towingVehicle: 'BIKE'});
                }}>
                <Text
                  style={
                    this.state.towingVehicle === 'BIKE'
                      ? styles.selectVehicleButtonStyleonClick
                      : styles.selectVehicleButtonStyle
                  }>
                  Bike
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: width,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: height / 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  fontWeight: '500',
                  marginBottom: 10,
                }}>
                Enter your Vehicle Number
              </Text>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  width: width * 0.8,
                  paddingLeft: 5,
                  height: 45,
                  borderRadius: 5,
                  marginTop: 8,
                }}
                placeholderTextColor="#ABABAB"
                placeholder="KA-05-ABCD"
                onChangeText={(vehicleNo: string) => {
                  this.setState({
                    vehicleNumber: vehicleNo,
                  });
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.state.vehicleNumber.length !== 0 &&
                this.state.vehicleNumber.length <= 10
                  ? this.state.towingVehicle === 'CAR'
                    ? this.setState({currentStepsForRequest: 2})
                    : this.setState({currentStepsForRequest: 1})
                  : this.setState({
                      showPLeaseFillVehicleNoModal: true,
                    });
              }}
              style={{
                width: width * 0.3,
                padding: 8,
                backgroundColor: '#e6c532',
                borderRadius: 5,
                marginTop: height / 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 20,
                  fontWeight: '700',
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </ScrollView>
          {this.state.showPLeaseFillVehicleNoModal && (
            <Modal isVisible={this.state.showPLeaseFillVehicleNoModal} >
              <View
                style={{
                  width: width * 0.9,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 20,
                  marginTop: 20,
                  alignItems: 'center',
                  padding: 5,
                  height: height / 4,
                  paddingBottom: 10,
                }}>
                <Text>Please Fill All Details</Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#f7e520',
                    padding: 10,
                    width: width * 0.6,
                    marginTop: 30,
                  }}>
                  <Text
                    style={{
                      width: '100%',
                      fontSize: 16,
                      fontWeight: '600',
                      lineHeight: 24,
                      color: 'black',
                      textAlign: 'center',
                    }}
                    onPress={this.setShowModalFalse}>
                    Ok
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          )}
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
            <TouchableOpacity>
              <Image
                source={require('../assets/4-01.png')}
                style={styles.bottomIconStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (!this.state.loading && this.state.currentStepsForRequest === 1) {
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
            <View style={styles.headingContainer}>
              <Text style={styles.headingTextSubtitle}>Bike Towing</Text>
            </View>
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

            <View style={styles.registerNumberContainer}>
              <Text style={styles.registerBumberHeading}>
                Enter Vehicle Registeration Number
              </Text>
              <TextInput
                style={styles.registerInput}
                keyboardType="default"
                onChangeText={() => {}}
              />
            </View>
            <View style={styles.yourLocationContainer}>
              <Text style={styles.locationHeading}>Select Your Loaction</Text>
              <TextInput
                style={styles.loactionInput}
                keyboardType="default"
                onChangeText={() => {}}
              />
              <Text style={styles.currentLocation}>. Current Location</Text>
            </View>
            <View>
              <Text style={styles.locationHeading}>Enter Your Destination</Text>
              <TextInput
                style={styles.loactionInput}
                keyboardType="default"
                onChangeText={() => {}}
              />
            </View>
            <View>
              <Text style={styles.estimatedText}>
                Estimated Towing Charge 300/-
              </Text>
            </View>

            <TouchableOpacity style={styles.confirmTouchStyle}>
              <Text style={styles.confirmButtonStyle}>Confirm</Text>
            </TouchableOpacity>
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
            <TouchableOpacity>
              <Image
                source={require('../assets/4-01.png')}
                style={styles.bottomIconStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (!this.state.loading && this.state.currentStepsForRequest === 2) {
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
            <View style={styles.headingContainer}>
              <Text style={styles.headingTextSubtitle}>Car Towing</Text>
            </View>
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
            <View style={styles.yourLocationContainerCar}>
              <Text style={styles.locationHeading}>Select Your Loaction</Text>
              <TextInput
                style={styles.loactionInput}
                keyboardType="default"
                onChangeText={() => {}}
              />
              <Text style={styles.currentLocation}>. Current Location</Text>
            </View>
            <View>
              <Text style={styles.locationHeading}>Enter Your Destination</Text>
              <TextInput
                style={styles.loactionInput}
                keyboardType="default"
                onChangeText={() => {}}
              />
            </View>
            <View style={styles.carEstimateChargeContainer}>
              <Text style={styles.estimatedText}>
                Estimated Towing Charge 300/-
              </Text>
            </View>

            <TouchableOpacity style={styles.confirmTouchStyle}>
              <Text style={styles.confirmButtonStyle}>Confirm</Text>
            </TouchableOpacity>
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
            <TouchableOpacity>
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
  vehicleSelectTextContainer: {
    width: width,
    backgroundColor: 'grey',
    marginTop: 10,
    alignItems: 'center',
  },
  vehicleSelectText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#e6c532',
    marginBottom: 10,
  },

  selectVehicleContainer: {
    marginTop: height / 6,
  },
  selectVehiclButtonContainer: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: height / 8,
    paddingRight: height / 8,
  },
  selectVehicleButtonStyle: {
    width: '100%',
    fontSize: 16,
    backgroundColor: 'white',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 15,
    lineHeight: 24,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  selectVehicleButtonStyleonClick: {
    width: '100%',
    fontSize: 16,
    backgroundColor: '#e6c532',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 15,
    lineHeight: 24,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  selectVehicleText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    marginBottom: 10,
  },

  headingContainer: {
    backgroundColor: 'grey',
    width: width,
    marginTop: 20,
    padding: 5,
    alignItems: 'center',
    paddingRight: 10,
    justifyContent: 'center',
  },

  headingTextSubtitle: {
    fontSize: 25,
    color: '#e6c532',
  },

  placeCard: {
    marginTop: 25,
    flexDirection: 'row',
    width: width * 0.7,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  placeCardIconView: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  placheCardIcon: {
    width: 20,
    height: 20,
  },
  placeCardTextMain: {
    alignSelf: 'center',
  },
  registerNumberContainer: {
    backgroundColor: 'grey',
    width: width,
    height: height / 14,
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  registerBumberHeading: {
    width: width / 2.5,
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
  },
  registerInput: {
    padding: 8,
    width: width / 2,
    borderRadius: 25,
    backgroundColor: 'white',
  },

  yourLocationContainer: {
    marginTop: 20,
  },
  yourLocationContainerCar: {
    marginTop: height / 9,
  },

  currentLocation: {
    color: '#051dfa',
    fontSize: 15,
    textAlign: 'center',
  },

  locationHeading: {
    marginTop: 10,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10,
    fontWeight: 'bold',
  },

  loactionInput: {
    width: width / 1.2,
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'white',
  },

  carEstimateChargeContainer: {
    marginTop: height / 10,
  },

  confirmTouchStyle: {
    backgroundColor: '#e6c532',
    padding: 10,
    width: width * 0.5,
    marginTop: 30,
  },

  estimatedText: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },

  confirmButtonStyle: {
    width: '100%',
    fontSize: 16,
    // fontWeight: '600',
    lineHeight: 24,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
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

export default BillingScreen;
