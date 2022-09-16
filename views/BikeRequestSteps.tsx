import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal/dist/modal';
import {
  getBikeBrands,
  getBikeDetailsList,
  getBikeProblems,
  sendNotifications,
} from '../apiServices/brandsApis';
import { BikeBrandList } from '../global/constant';
import { errorMessage } from '../global/utils';

import { CommonActions } from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { requestLocationPermission } from '../global/utils';

import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      mechanicStatus: ['Should mechanic come', 'I ll take the bike'],
      bikeRegisterationNumber: '',
      problemDescription: '',
      vehicleFetchStatus: '',
    };
  }
  componentDidMount = async () => {
    this.setState({ loading: true });
    // getBikeBrands()
    //     .then((response: any) => {
    //         console.log(response.data);
    //         this.setState({ bikeBrands: response.data });
    //     })
    //     .catch(err => errorMessage('Something went wrong'));
    this.setState({ loading: false });
  };
  getVariousBikeDetails = async (bike: any) => {
    console.log(bike)
    this.setState({ loading: true });
    getBikeDetailsList(bike.bikebrandid)
      .then((response: any) => {
        console.log('respon  of brand api', JSON.stringify(response));
      })
      .catch(err => {
        console.log('err is get bije', err);
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
      this.setState({ loading: false });
    }, 500);
  };
  handleConfirmation = async () => {
    this.setState({ loading: true });
    getBikeProblems()
      .then((response: any) => {
        const bikeProblems = response.data;
        const bikeProblemsLabel = response.data!.map((item: any) => {
          return { value: item.problemname, label: item.problemname };
        });
        console.log(bikeProblemsLabel);
        this.setState({
          bikeProblems: bikeProblems,
          currentStepsForRequest: this.state.currentStepsForRequest + 1,
          bikeProblemsLabel: bikeProblemsLabel,
        });
      })
      .catch(error => errorMessage('Something went wrong'));
    this.setState({ loading: false });
  };
  onSelectedItemsChange = (selectedItems: boolean, item: string) => {
    let newSelectedProblems = this.state.selectedProblems;
    if (selectedItems === true) {
      newSelectedProblems = newSelectedProblems.concat(item);
      this.setState({ selectedProblems: newSelectedProblems }, () =>
        console.log(this.state.selectedProblems),
      );
    } else {
      newSelectedProblems.splice(newSelectedProblems.indexOf(item), 1);
      this.setState({ selectedProblems: newSelectedProblems }, () =>
        console.log(this.state.selectedProblems),
      );
    }
  };
  checkRegistrationNumber = (number: string) => {
    return number.length === 9 || number.length === 10;
  }
  navigateToMapHandler = async () => {
    const userObject = await AsyncStorage.getItem('userObject');
    const userId = JSON.parse(userObject!).userId;
    this.setState({ showBikeProblemsModal: false })
    if (!this.state.problemDescription || !this.state.vehicleFetchStatus || !this.state.bikeRegisterationNumber) {
      errorMessage("Fill up all the detials");
      return;
    }
    if (!this.checkRegistrationNumber(this.state.bikeRegisterationNumber)) {
      errorMessage("Registration number is not in format");
      return;
    }

    console.log("Notification sent");
    // sendNotifications(
    //   userId,
    //   this.state.problemDescription,
    //   this.state.selectedBike,
    //   this.state.vehicleFetchStatus,
    //   this.state.bikeRegisterationNumber,
    // )
    //   .then(response => {
    //     console.log(JSON.stringify(response));
    //     this.props.navigation.dispatch(
    //       CommonActions.reset({
    //         index: 1,
    //         routes: [{ name: 'MapView' }],
    //       }),
    //     );
    //   })
    //   .catch(err => {
    //     console.log('error ins resss', err);
    //   });
  };
  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <ActivityIndicator
            animating={this.state.loading}
            color="blue"
            size="large"
            style={{ height: 120, alignItems: "center" }}
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
                    this.setState({ searchKeyWord: searchString });
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
                  this.setState({ searchKeyWord: searchString });
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
          <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
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
            contentContainerStyle={{ paddingBottom: 70 }}>
            <View
              style={{
                width: width,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: 50,
              }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                Select your requirements
              </Text>
            </View>

            <View style={{ height: height * 0.75 }}>
              <ScrollView
                nestedScrollEnabled={true}
                contentContainerStyle={{
                  justifyContent: 'center',
                  paddingBottom: 10,
                }}
                style={{
                  width: width,
                  flexDirection: 'column',
                  marginTop: 20,
                }}>
                {this.state.bikeProblemsLabel!.map(
                  (item: any, index: number) => {
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
                  },
                )}
              </ScrollView>
            </View>
            <View
              style={{
                width: width * 0.9,
                alignSelf: 'center',
                marginTop: 25,
                alignItems: 'center',
              }}>

              {/* <Text style={{ textAlign: "left", fontSize: 16, fontWeight: "500", color: "white", width: "100%", margin: 5 }}>Describe your Problem</Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={{
                  width: '95%',
                  borderRadius: 7,
                  fontSize: 15,
                  color: 'black',
                  paddingLeft: 5,
                  backgroundColor: 'white',
                  textAlignVertical: 'top'
                }}
                onChangeText={(problemDescription: string) => {
                  this.setState({
                    problemDescription: problemDescription,
                  });
                }}
              /> */}
            </View>

            <RadioGroup

              onSelect={(index: any, value: any) => {
                if (value === 'I ll take the bike') {
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
                      style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>
                      {item}
                    </Text>
                  </RadioButton>
                );
              })}

            </RadioGroup>
            <View
              style={{
                width: width,
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.state.selectedProblems.length === 0
                    ? errorMessage('Select the problems you are facing')
                    : this.setState({ showBikeProblemsModal: true });
                }}
                style={{
                  width: width * 0.6,
                  padding: 8,
                  backgroundColor: '#f0f70f',
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: 16,
                    fontWeight: '700',
                  }}>
                  Confirm
                </Text>
              </TouchableOpacity>
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
          {this.state.showBikeProblemsModal && (
            <Modal isVisible={this.state.showBikeProblemsModal}>
              <View
                style={{
                  width: width * 0.9,
                  backgroundColor: 'white',
                  borderRadius: 20,
                  marginTop: 20,
                  alignItems: 'center',
                  padding: 5,
                  minHeight: height / 4,
                  paddingBottom: 10,
                }}>
                <View
                  style={{
                    width: width,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
                  }}>
                  <Text style={{ fontSize: 16, color: 'black', fontWeight: '500', }}>
                    Enter your register Number
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: '#989898',
                      width: width * 0.8,
                      padding: 0,
                      height: 45,
                      borderRadius: 5,
                      marginTop: 8,
                      paddingLeft: 5,
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
                <Text
                  style={{
                    width: '100%',
                    fontSize: 16,
                    fontWeight: '600',
                    lineHeight: 24,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 15,
                  }}>
                  Your selected problems List
                </Text>
                {this.state.selectedProblems.map((item: any, index: number) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: '100%',
                        padding: 5,
                        backgroundColor: '#989898',
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5
                      }}>
                      <Text
                        style={{
                          width: '100%',
                          color: 'black',
                          padding: 5,
                          fontSize: 14,
                          fontWeight: '600',
                        }}>
                        {item}
                      </Text>

                    </View>
                  );
                })}
                <Text style={{ textAlign: "left", fontSize: 16, marginTop: 15, fontWeight: "500", color: "black", width: "100%", margin: 5 }}>Describe your Problem</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={{
                    width: '95%',
                    borderRadius: 7,
                    fontSize: 15,
                    color: 'black',
                    paddingLeft: 5,
                    backgroundColor: '#989898',
                    textAlignVertical: 'top'
                  }}
                  onChangeText={(problemDescription: string) => {
                    this.setState({
                      problemDescription: problemDescription,
                    });
                  }}
                />

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
                    onPress={this.navigateToMapHandler}>
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          )}
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
    height: height + 2000,
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
    // width: width * 0.09,
    // height: height / 20,
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
