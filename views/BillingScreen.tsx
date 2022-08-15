import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface BillingScreenProps {
  navigation: any;
}

interface BillingScreenState {
  loading: boolean;
}

class BillingScreen extends React.Component<
  BillingScreenProps,
  BillingScreenState
> {
  constructor(props: BillingScreenProps) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render(): React.ReactNode {
    if (this.state.loading) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }
    if (!this.state.loading) {
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
              <Text style={styles.headingTextTitle}>Bike Name</Text>
              <Text style={styles.headingTextSubtitle}>Request Type</Text>
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

  headingContainer: {
    backgroundColor: 'grey',
    width: width,
    height: height / 8.5,
    marginTop: 20,
    alignItems: 'flex-end',
    paddingRight: 10,
    justifyContent: 'center',
  },
  headingTextTitle: {
    fontSize: 25,
    color: 'white',
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

  confirmTouchStyle: {
    backgroundColor: '#f7e520',
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
