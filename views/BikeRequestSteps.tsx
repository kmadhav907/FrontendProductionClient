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
import {ScrollView} from 'react-native-gesture-handler';
import {
  getBikeDetailsList,
  getBikeProblems,
  sendNotifications,
  getFixitStatus
} from '../apiServices/brandsApis';
import {BikeBrandList} from '../global/constant';
import {errorMessage} from '../global/utils';

import {CommonActions} from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {requestLocationPermission} from '../global/utils';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveLocation} from '../apiServices/locationApi';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import RequestMapView from './MapView';

interface BikeRequestProps {
  navigation: any;
}
interface BikeRequestState {
  currentStepsForRequest: number;
  loading: boolean;
  bikeBrands: any;
  searchKeyWord: string;
  bikeList: any[];
  selectedBikeBrand: string;
  selectedBike: string;
  showBikeRequestModal: boolean;
  selectedRequest: string;
  bikeProblems: any[];
  bikeProblemsLabel: any[];
  selectedProblems: any[];
  showBikeProblemsModal: boolean;
  mechanicStatus: any[];
  bikeRegisterationNumber: string;
  problemDescription: string;
  vehicleFetchStatus: string;
  latitude: number | undefined;
  longitude: number | undefined;
}

class BikeRequestSteps extends React.Component<
  BikeRequestProps,
  BikeRequestState
> {
  constructor(props: BikeRequestProps) {
    super(props);
    this.state = {
      currentStepsForRequest: 0,
      bikeBrands: BikeBrandList,
      loading: false,
      searchKeyWord: '',
      bikeList: [],
      selectedBikeBrand: '',
      selectedBike: '',
      showBikeRequestModal: false,
      selectedRequest: '',
      bikeProblems: [],
      bikeProblemsLabel: [],
      selectedProblems: [],
      showBikeProblemsModal: false,
      mechanicStatus: ['Mechanic Should Come.', "I'l take bike to Mechanic."],
      bikeRegisterationNumber: '',
      problemDescription: '',
      vehicleFetchStatus: '',
      latitude: undefined,
      longitude: undefined,
    };
  }
  componentDidMount = async () => {
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
      let currentActivity = await AsyncStorage.getItem('currentActivity');
      if (currentActivity != null) {
        let vehicleFetchStatus = JSON.parse(currentActivity).vehicleFetchStatus;
        console.log(vehicleFetchStatus);
        this.setState({
          currentStepsForRequest: 5,
          vehicleFetchStatus: vehicleFetchStatus,
        });
      }
    } catch (err) {
      console.log(err);
    }
    this.setState({loading: false});
  };
  componentDidUpdate = async(prevProps: any, prevState: any) => {
    console.log(prevState.currentStepsForRequest);
    const userObject = await AsyncStorage.getItem('userObject');
    const userId = JSON.parse(userObject!).userId;
    if (this.state.currentStepsForRequest === 5) {
      let timeOut = setInterval(() => {
        getFixitStatus(userId).then((response:any) => {
          console.log(response.data);
          if(response.data == 'true' || response.data == true){
            this.setState({
              currentStepsForRequest: 6,
            });
          }
        })
      }, 10000);
      // clearTimeout(timeOut);
    }
    // if (this.state.currentStepsForRequest === 5) {
    //   timeoutId = setTimeout(() => {
    //     this.setState({
    //       currentStepsForRequest: this.state.currentStepsForRequest + 1,
    //     });
    //   }, 5000);
    // }
    // if (this.state.currentStepsForRequest === 6) {
    //   clearTimeout(timeoutId);
    // }
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
  // getBikeBrands()
  //     .then((response: any) => {
  //         console.log(response.data);
  //         this.setState({ bikeBrands: response.data });
  //     })
  //     .catch(err => errorMessage('Something went wrong'));

  getVariousBikeDetails = async (bike: any) => {
    console.log(bike);
    this.setState({loading: true});
    getBikeDetailsList(bike.bikebrandid)
      .then((response: any) => {
        console.log('respon  of brand api', JSON.stringify(response));
      })
      .catch(err => {
        console.log('err is get bike', err);
      });
    //     console.log(response.data);
    //     this.setState({ bikeList: items, currentStepsForRequest: this.state.currentStepsForRequest + 1, searchKeyWord: "" })
    // })
    this.setState({
      selectedBikeBrand: bike,
      bikeList: this.state.bikeBrands[bike],
      currentStepsForRequest: this.state.currentStepsForRequest + 1,
      searchKeyWord: '',
    });

    setTimeout(() => {
      this.setState({loading: false});
    }, 500);
  };
  handleConfirmation = async () => {
    this.setState({loading: true});
    getBikeProblems()
      .then((response: any) => {
        const bikeProblems = response.data;
        const bikeProblemsLabel = response.data!.map((item: any) => {
          return {value: item.problemname, label: item.problemname};
        });
        console.log(bikeProblemsLabel);
        this.setState({
          bikeProblems: bikeProblems,
          currentStepsForRequest: this.state.currentStepsForRequest + 1,
          bikeProblemsLabel: bikeProblemsLabel,
        });
      })
      .catch(error => errorMessage('Something went wrong'));
    this.setState({loading: false});
  };
  onSelectedItemsChange = (selectedItems: boolean, item: string) => {
    let newSelectedProblems = this.state.selectedProblems;
    if (selectedItems === true) {
      newSelectedProblems = newSelectedProblems.concat(item);
      this.setState({selectedProblems: newSelectedProblems}, () =>
        console.log(this.state.selectedProblems),
      );
    } else {
      newSelectedProblems.splice(newSelectedProblems.indexOf(item), 1);
      this.setState({selectedProblems: newSelectedProblems}, () =>
        console.log(this.state.selectedProblems),
      );
    }
  };
  checkRegistrationNumber = (number: string) => {
    return number.length === 9 || number.length === 10;
  };
  navigateToMapHandler = async () => {
    // console.log(this.state.currentStepsForRequest);
    // this.setState({
    //   currentStepsForRequest: this.state.currentStepsForRequest + 1,
    // });
    const userObject = await AsyncStorage.getItem('userObject');
    const userId = JSON.parse(userObject!).userId;
    this.setState({showBikeProblemsModal: false});
    if (
      !this.state.problemDescription ||
      !this.state.vehicleFetchStatus ||
      !this.state.bikeRegisterationNumber
    ) {
      errorMessage('Fill up all the detials');
      return;
    }
    if (this.checkRegistrationNumber(this.state.bikeRegisterationNumber)) {
      errorMessage('Registration number is not in format');
      return;
    }
    console.log(
      this.state.problemDescription +
        ' ' +
        this.state.vehicleFetchStatus +
        ' ' +
        this.state.bikeRegisterationNumber,
    );

    console.log('Notification sent');
    sendNotifications(
      userId,
      this.state.problemDescription,
      this.state.selectedBike,
      this.state.vehicleFetchStatus,
      this.state.bikeRegisterationNumber,
    )
      .then(response => {
        console.log(JSON.stringify(response));
        if (response.status === 200) {
          const activity = {
            problemDescription: this.state.problemDescription,
            selectedBike: this.state.selectedBike,
            vehicleFetchStatus: this.state.vehicleFetchStatus,
            bikeRegisterationNumber: this.state.bikeRegisterationNumber,
            typeOfActivity: 'BikeActivity',
          };
          AsyncStorage.setItem(
            'currentActivity',
            JSON.stringify(activity),
          ).then(() => {
            console.log('Activity Saved successfully');
          });
          errorMessage('Notification sent succesfully wait');
          this.setState({
            currentStepsForRequest: this.state.currentStepsForRequest + 1,
          });
          // this.props.navigation.dispatch(
          //   CommonActions.reset({
          //     index: 1,
          //     routes: [{name: 'MapView'}],
          //   }),
          // );
        } else {
          throw Error('Something went wrong');
        }
      })
      .catch(err => {
        console.log('error ins resss', err);
        errorMessage(err);
      });
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
            <View style={styles.bikeContainer}>
              <Image
                source={require('../assets/icons/2-01.png')}
                style={styles.bikeImageStyles}
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
                  // onChangeText={(searchString) => {this.setState({searchString})}}
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
              {Object.keys(this.state.bikeBrands)
                .filter((bike: any) => {
                  if (this.state.searchKeyWord === '') return bike;
                  else if (
                    bike
                      .toLowerCase()
                      .includes(this.state.searchKeyWord.toLowerCase())
                  ) {
                    return bike;
                  }
                })
                .map((bike: any, index: number) => (
                  <View style={styles.listItem} key={index}>
                    <View style={styles.itemIcon} />
                    <TouchableOpacity
                      onPress={() => {
                        this.getVariousBikeDetails(bike);
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
                        {bike}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>
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

    if (!this.state.loading && this.state.currentStepsForRequest === 1) {
      return (
        <View style={styles.container}>
          <View style={styles.bikeContainer}>
            <Image
              source={require('../assets/icons/2-01.png')}
              style={styles.bikeImageStyles}
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
                // onChangeText={(searchString) => {this.setState({searchString})}}
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
          <ScrollView contentContainerStyle={{paddingBottom: 60}}>
            <View style={styles.listContainer}>
              {this.state
                .bikeList!.filter((bike: any) => {
                  if (this.state.searchKeyWord === '') {
                    return bike;
                  } else if (
                    bike
                      .toLowerCase()
                      .includes(this.state.searchKeyWord.toLowerCase())
                  ) {
                    return bike;
                  }
                })
                .map((bike: any, index: number) => (
                  <View style={styles.listItem} key={index}>
                    <View style={styles.itemIcon} />
                    <TouchableOpacity
                      onPress={() => {
                        // this.getVariousBikeDetails(bike);
                        this.setState({
                          currentStepsForRequest:
                            this.state.currentStepsForRequest + 1,
                          selectedBike: bike,
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
                        {bike}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
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
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.bikeContainer}>
              <Image
                source={require('../assets/icons/2-01.png')}
                style={styles.bikeImageStyles}
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
            {this.state.bikeProblemsLabel!.map((item: any, index: number) => {
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
                    this.state.selectedProblems.indexOf(item.value) !== -1
                      ? true
                      : false
                  }
                  text={item.label}
                  fillColor="#D35C13"
                  textStyle={{
                    textDecorationLine: 'none',
                    color: '#fff',
                  }}
                  onPress={(selected: boolean) =>
                    this.onSelectedItemsChange(selected, item.value)
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
                this.state.selectedProblems.length === 0
                  ? errorMessage('Please select some problems')
                  : this.setState({
                      currentStepsForRequest:
                        this.state.currentStepsForRequest + 1,
                    });
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
    if (!this.state.loading && this.state.currentStepsForRequest === 4) {
      return (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={{paddingBottom: 70}}>
            <View
              style={{
                marginTop: height * 0.15,
                padding: 10,
                flexDirection: 'column',
                backgroundColor: '#787878',
                alignItems: 'flex-end',
              }}>
              <Text style={{fontSize: 18, color: 'white', fontWeight: '400'}}>
                {this.state.selectedBike}
              </Text>
              <Text style={{fontSize: 22, color: 'yellow', fontWeight: '600'}}>
                {this.state.selectedRequest}
              </Text>
            </View>
            <View style={{alignItems: 'center', marginTop: 15}}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                Enter your Vehicle reg no.
              </Text>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  width: width * 0.6,
                  padding: 0,
                  height: 45,
                  borderRadius: 5,
                  marginTop: 8,
                  paddingLeft: 5,
                  color: 'black',
                }}
                placeholderTextColor="#666666"
                placeholder="KA05ABCD"
                onChangeText={(regNo: string) => {
                  this.setState({
                    bikeRegisterationNumber: regNo,
                  });
                }}
              />
            </View>
            <View
              style={{
                minHeight: 5,
                padding: 5,
                marginTop: 25,
                backgroundColor: '#454545',
                marginLeft: width * 0.05,
                width: width * 0.8,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  fontWeight: '400',
                  padding: 3,
                }}>
                Selected Problems
              </Text>
              {this.state.selectedProblems.map(
                (problems: string, index: number) => {
                  return (
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '400',
                        fontSize: 18,
                        padding: 2,
                      }}
                      key={index}>
                      {(index + 1).toString() + ') ' + problems}
                    </Text>
                  );
                },
              )}
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                marginTop: 30,
                fontWeight: '500',
                color: 'white',
                margin: 5,
              }}>
              Describe your Problem
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={{
                width: '85%',
                borderRadius: 7,
                fontSize: 15,
                color: 'black',
                paddingLeft: 5,
                backgroundColor: 'white',
                textAlignVertical: 'top',
                alignSelf: 'center',
              }}
              onChangeText={(problemDescription: string) => {
                this.setState({
                  problemDescription: problemDescription,
                });
              }}
            />
            <View style={{marginTop: 25}}>
              <RadioGroup
                onSelect={(index: any, value: any) => {
                  if (value === "I'l take bike to Mechanic.") {
                    this.setState({
                      vehicleFetchStatus: 'TravelToMechanic',
                    });
                  } else {
                    this.setState({
                      vehicleFetchStatus: 'NeedMechanicToCome',
                    });
                  }
                }}
                color="orange">
                {this.state.mechanicStatus.map((item: any, index: number) => {
                  return (
                    <RadioButton value={item} color="orange">
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 16,
                          fontWeight: '700',
                        }}>
                        {item}
                      </Text>
                    </RadioButton>
                  );
                })}
              </RadioGroup>
            </View>
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: 'yellow',
                padding: 10,
                width: width * 0.8,
                alignSelf: 'center',
              }}
              onPress={this.navigateToMapHandler}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontWeight: '500',
                  textAlign: 'center',
                }}>
                Confirm
              </Text>
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
    if (!this.state.loading && this.state.currentStepsForRequest === 5) {
      return <RequestMapView navigation={this.props.navigation} />;
    }
    if (!this.state.loading && this.state.currentStepsForRequest === 6) {
      if (this.state.vehicleFetchStatus === 'TravelToMechanic') {
        return (
          <View style={styles.container}>
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={{paddingBottom: 70}}>
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
              <Text style={styles.handedOverVehicle}>
                You Have Successfully Hand Over your Vehicle to our Mechanic
              </Text>
              <View style={styles.jobContainer}>
                <View>
                  <Text style={styles.jobEachContainer}>Job Card No</Text>
                  <Text style={styles.jobEachContainer}>Date/Time</Text>
                  <Text style={styles.jobEachContainer}>
                    Estimated Delivery
                  </Text>
                </View>
                <View>
                  <Text style={styles.jobEachContainer}>le20156</Text>
                  <Text style={styles.jobEachContainer}>
                    02/02/2022 10:40AM
                  </Text>
                  <Text style={styles.jobEachContainer}>05 Hrs</Text>
                </View>
              </View>
              <Text style={styles.digitBillNoPay}>
                Without Digital Bill do not pay
              </Text>
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
      } else {
        return (
          <View style={styles.container}>
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={{paddingBottom: 70}}>
              <Text style={{color: 'white'}}>NeedMechanicToCome</Text>
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
    if (!this.state.loading && this.state.currentStepsForRequest === 7) {
      return (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={{paddingBottom: 70}}>
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
            <View>
              <Text
                style={{
                  color: '#e6c532',
                  textAlign: 'center',
                  alignContent: 'center',
                  marginTop: 10,
                  fontSize: 15,
                }}>
                You Have a Notification from AskMechanic
              </Text>
              <Text
                style={{
                  color: '#e6c532',
                  textAlign: 'center',
                  alignContent: 'center',
                  marginTop: 10,
                  fontSize: 25,
                }}>
                Job is done!
              </Text>
              <Text
                style={{
                  color: '#e6c532',
                  textAlign: 'center',
                  alignContent: 'center',
                  marginTop: 10,
                  fontSize: 20,
                }}>
                Your Vehicle is Ready for delivery!
              </Text>
            </View>
            <View style={styles.billContainer}>
              <Text
                style={{
                  padding: 10,
                  justifyContent: 'center',
                  textAlign: 'center',
                  backgroundColor: '#454545',
                  fontSize: 20,
                  color: 'white',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}>
                Bill
              </Text>
              <View style={styles.billSection}>
                <View style={styles.billSubSection}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      alignContent: 'center',
                      marginTop: 5,
                      fontSize: 15,
                    }}>
                    1)Chain Setting
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      alignContent: 'center',
                      marginTop: 5,
                      fontSize: 15,
                    }}>
                    2)Break Issue
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      alignContent: 'center',
                      marginTop: 5,
                      fontSize: 15,
                    }}>
                    3)Battery
                  </Text>
                </View>
                <View style={styles.billSubSection}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      alignContent: 'center',
                      marginTop: 5,
                      fontSize: 15,
                    }}>
                    20.00
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      alignContent: 'center',
                      marginTop: 5,
                      fontSize: 15,
                    }}>
                    40.00
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      alignContent: 'center',
                      marginTop: 5,
                      fontSize: 15,
                    }}>
                    1200.00
                  </Text>
                </View>
              </View>
              <View style={styles.totalSection}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    alignContent: 'center',
                    marginTop: 5,
                    fontSize: 15,
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    alignContent: 'center',
                    marginTop: 5,
                    fontSize: 15,
                  }}>
                  1260.00
                </Text>
              </View>
            </View>
            <View style={styles.paythorugh}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  alignContent: 'center',
                  fontSize: 25,
                }}>
                Pay Through
              </Text>
              <View style={styles.selectVehiclButtonContainer}>
                <TouchableOpacity>
                  <Text style={styles.selectVehicleButtonStyleonClick}>
                    Cash
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.selectVehicleButtonStyleonClick}>
                    Online Payment
                  </Text>
                </TouchableOpacity>
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
  bikeContainer: {
    width: width,
    marginTop: 80,
    backgroundColor: '#343434',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  bikeImageStyles: {
    height: 77.87,
    width: 120,
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
  placeCardTextMain: {
    alignSelf: 'center',
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
  handedOverVehicle: {
    width: width * 0.7,
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#e6c532',
    marginTop: height / 20,
  },
  jobContainer: {
    marginTop: 25,
    flexDirection: 'row',
    width: width * 0.9,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  jobEachContainer: {
    padding: 10,
    marginBottom: 5,
    marginRight: 5,
    backgroundColor: '#454545',
    color: 'white',
  },
  digitBillNoPay: {
    width: width * 0.5,
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#e6c532',
    marginTop: height / 20,
  },
  billContainer: {
    flexDirection: 'column',
    width: width * 0.9,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: height / 10,
    borderRadius: 10,
  },
  billSection: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: width * 0.9,
    backgroundColor: '#454545',
    marginBottom: 5,
    padding: 20,
  },
  billSubSection: {
    marginRight: 5,
  },
  totalSection: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: width * 0.9,
    backgroundColor: '#454545',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  paythorugh: {
    marginTop: height / 20,
  },
  selectVehiclButtonContainer: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: width * 0.1,
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
export default BikeRequestSteps;
