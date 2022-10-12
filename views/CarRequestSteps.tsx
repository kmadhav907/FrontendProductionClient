import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {saveLocation} from '../apiServices/locationApi';
import {CarBrandList} from '../global/constant';
import {errorMessage, requestLocationPermission} from '../global/utils';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import {getBikeProblems} from '../apiServices/brandsApis';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface CarRequestStepState {
  currentStepsForRequest: number;
  loading: boolean;
  carBrands: any;
  searchKeyWord: string;
  selectedCarBrand: string;
  selectedCar: string;
  carList: any;
  latitude: number | undefined;
  longitude: number | undefined;
  selectedRequest: string;
  carProblems: any[];
  carProblemsLabel: any[];
}
interface CarRequestStepProps {}

class CarRequestSteps extends React.Component<
  CarRequestStepProps,
  CarRequestStepState
> {
  constructor(props: CarRequestStepProps) {
    super(props);
    this.state = {
      currentStepsForRequest: 0,
      loading: false,
      carBrands: CarBrandList,
      searchKeyWord: '',
      selectedCarBrand: '',
      selectedCar: '',
      carList: [],
      latitude: undefined,
      longitude: undefined,
      selectedRequest: '',
      carProblems: [],
      carProblemsLabel: [],
    };
  }
  async componentDidMount() {
    this.setState({loading: true});
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
            this.setState({latitude: latitude, longitude: longitude}, () => {
              this.saveLocation();
            });
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
  }
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
  getVariousCarList = (car: string) => {
    this.setState({
      carList: this.state.carBrands[car],
      selectedCarBrand: car,
      currentStepsForRequest: this.state.currentStepsForRequest + 1,
    });
  };

  handleConfirmation = async () => {
    this.setState({loading: true});
    getBikeProblems()
      .then((response: any) => {
        const bikeProblems = response.data;
        const carProblemsLabel = response.data!.map((item: any) => {
          return {value: item.problemname, label: item.problemname};
        });
        console.log(carProblemsLabel);
        this.setState({
          carProblems: bikeProblems,
          currentStepsForRequest: this.state.currentStepsForRequest + 1,
          carProblemsLabel: carProblemsLabel,
        });
      })
      .catch(error => errorMessage('Something went wrong'));
    this.setState({loading: false});
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            animating={this.state.loading}
            color="blue"
            size="large"
            style={{height: 120}}
          />
        </View>
      );
    }
    if (!this.state.loading && this.state.currentStepsForRequest === 0) {
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.carContainer}>
              <Image
                source={require('../assets/icons/1-01.png')}
                style={styles.carImageStyles}
              />
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
            <View style={styles.searchSection}>
              <View style={styles.searchSectionInputView}>
                <TextInput
                  style={styles.input}
                  placeholder="Search"
                  underlineColorAndroid="transparent"
                  placeholderTextColor={'#ddd'}
                  onChangeText={(searchString: string) => {
                    this.setState({searchKeyWord: searchString});
                    console.log(searchString);
                  }}
                />
              </View>
              <View style={styles.searchSectionIconView}>
                <Image
                  style={styles.searchSectionIcon}
                  source={require('../assets/search.png')}
                />
              </View>
            </View>
            <ScrollView contentContainerStyle={styles.listContainer}>
              {Object.keys(this.state.carBrands)
                .filter((car: any) => {
                  if (this.state.searchKeyWord === '') return car;
                  else if (
                    car
                      .toLowerCase()
                      .includes(this.state.searchKeyWord.toLowerCase())
                  ) {
                    return car;
                  }
                })
                .map((car: any, index: number) => (
                  <View style={styles.listItem} key={index}>
                    <View style={styles.itemIcon} />
                    <TouchableOpacity
                      onPress={() => {
                        this.getVariousCarList(car);
                      }}
                      style={{
                        width: width * 0.9 - 60,
                        height: '100%',
                        backgroundColor: '#353535',
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 15,
                      }}>
                      <Text
                        style={{
                          textAlign: 'left',
                          color: 'white',
                          fontSize: 16,
                        }}>
                        {car}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>
          </ScrollView>
        </View>
      );
    }
    if (!this.state.loading && this.state.currentStepsForRequest === 1) {
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.carContainer}>
              <Image
                source={require('../assets/icons/1-01.png')}
                style={styles.carImageStyles}
              />
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
            <View style={styles.searchSection}>
              <View style={styles.searchSectionInputView}>
                <TextInput
                  style={styles.input}
                  placeholder="Search"
                  underlineColorAndroid="transparent"
                  placeholderTextColor={'#ddd'}
                  onChangeText={(searchString: string) => {
                    this.setState({searchKeyWord: searchString});
                    console.log(searchString);
                  }}
                />
              </View>
              <View style={styles.searchSectionIconView}>
                <Image
                  style={styles.searchSectionIcon}
                  source={require('../assets/search.png')}
                />
              </View>
            </View>
            <ScrollView contentContainerStyle={styles.listContainer}>
              {this.state.carList
                .filter((car: any) => {
                  if (this.state.searchKeyWord === '') return car;
                  else if (
                    car
                      .toLowerCase()
                      .includes(this.state.searchKeyWord.toLowerCase())
                  ) {
                    return car;
                  }
                })
                .map((car: any, index: number) => (
                  <View style={styles.listItem} key={index}>
                    <View style={styles.itemIcon} />
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          selectedCar: car,
                          currentStepsForRequest:
                            this.state.currentStepsForRequest + 1,
                        });
                      }}
                      style={{
                        width: width * 0.9 - 60,
                        height: '100%',
                        backgroundColor: '#353535',
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 15,
                      }}>
                      <Text
                        style={{
                          textAlign: 'left',
                          color: 'white',
                          fontSize: 16,
                        }}>
                        {car}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>
          </ScrollView>
        </View>
      );
    }
    if (!this.state.loading && this.state.currentStepsForRequest === 2) {
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.carContainer}>
              <Image
                source={require('../assets/icons/2-01.png')}
                style={styles.carImageStyles}
              />
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
            <View style={styles.searchSection}>
              <View style={styles.searchSectionInputView}></View>
              <View style={styles.searchSectionIconView}>
                <Image
                  style={styles.searchSectionIcon}
                  source={require('../assets/search.png')}
                />
              </View>
            </View>

            <View style={styles.listContainer}>
              <View style={styles.listItem}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState(
                      {
                        selectedRequest: 'General Service',
                      },
                      () => this.handleConfirmation(),
                    )
                  }
                  style={{
                    width: width - 60,
                    height: '100%',
                    backgroundColor: '#353535',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 15,
                  }}>
                  <Text
                    style={{
                      textAlign: 'left',
                      fontSize: 16,
                      color: 'white',
                    }}>
                    General service
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.listItem}>
                <TouchableOpacity
                  style={{
                    width: width - 60,
                    height: '100%',
                    backgroundColor: '#353535',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 15,
                  }}>
                  <Text
                    style={{
                      textAlign: 'left',
                      color: 'white',
                      fontSize: 16,
                    }}>
                    Schedule your service
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
    if (!this.state.loading && this.state.currentStepsForRequest === 3) {
      return (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={{paddingBottom: 70}}>
            <View
              style={{
                width: width,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: 50,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                Select your requirements
              </Text>
            </View>
            {this.state.carProblemsLabel!.map((item: any, index: number) => {
              return (
                <BouncyCheckbox
                  key={index}
                  style={{
                    marginTop: 10,
                    marginLeft: width * 0.05,
                    backgroundColor: '#353535',
                    padding: 5,
                    borderRadius: 4,
                    width: width * 0.9,
                    alignItems: 'center',
                    paddingLeft: 10,
                  }}
                  isChecked={
                    // this.state.selectedProblems.indexOf(item.value) !== -1
                    //   ? true
                    //   : false
                    true
                  }
                  text={item.label}
                  fillColor="#D35C13"
                  textStyle={{
                    textDecorationLine: 'none',
                    color: '#fff',
                  }}
                  onPress={
                    (selected: boolean) => {}
                    // this.onSelectedItemsChange(selected, item.value)
                  }
                />
              );
            })}
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: 'yellow',
                padding: 10,
                width: width * 0.8,
                alignSelf: 'center',
                borderRadius: 5,
              }}
              onPress={() => {
                //   this.state.selectedProblems.length === 0 ? errorMessage("Please select some problems") : this.setState({ currentStepsForRequest: this.state.currentStepsForRequest + 1 })
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                  textAlign: 'center',
                }}>
                Next
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: width * 0.9,
                alignSelf: 'center',
                marginTop: 25,
                alignItems: 'center',
              }}></View>
          </ScrollView>
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
    backgroundColor: 'black',
    height: height,
    alignItems: 'center',
  },
  scrollContainer: {
    width: width,
    backgroundColor: 'black',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'column',
  },
  carContainer: {
    width: width,
    marginTop: 80,
    backgroundColor: '#343434',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  carImageStyles: {
    height: 77.87,
    width: 120,
  },
  placeCardTextMain: {
    alignSelf: 'center',
  },
  iconStyle: {
    height: '80%',
    width: '80%',
    resizeMode: 'contain',
  },
  placeCard: {
    marginTop: 25,
    flexDirection: 'row',
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  placeCardIconView: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  placheCardIcon: {
    width: 20,
    height: 20,
  },
  searchSection: {
    marginTop: 15,
    flexDirection: 'row',
    width: width * 0.8,
    backgroundColor: '#454545',
    color: '#fff',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  searchSectionInputView: {
    justifyContent: 'center',
    marginRight: 20,
    width: '100%',
  },
  listContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  listItem: {
    marginTop: 10,
    height: 30,
    width: width * 0.9,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  itemIcon: {
    height: 32,
    width: 32,
    backgroundColor: '#353535',
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
});
export default CarRequestSteps;
