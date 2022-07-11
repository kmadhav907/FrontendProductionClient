import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import OTPField from '../components/otpField/OtpField';
import Geolocation from 'react-native-geolocation-service';
import {
  checkValidPhoneNumber,
  errorMessage,
  modifyPhoneNumber,
  requestLocationPermission,
} from '../global/utils';
import { CommonActions } from '@react-navigation/native';
import { getOTPForAuthorization, verifyOTPForAuthorization } from '../apiServices/loginApis';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginViewState {
  phoneNumber: string;
  stepsForLogin: number;
  loading: boolean;
  otpToVerify: string;
}
interface LoginViewProps {
  navigation: any;
}


const CELL_COUNT = 6;
class LoginView extends React.Component<LoginViewProps, LoginViewState> {
  constructor(props: LoginViewProps) {
    super(props);
    this.state = {
      phoneNumber: '',
      stepsForLogin: 0,
      loading: false,
      otpToVerify: '',
    };
  }
  async componentDidMount() {
    try {
      const permissionStatus = await requestLocationPermission();
      if (permissionStatus === true) {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
          },
          (error: any) => {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }
  handleLogin = async () => {
    this.setState({ loading: true });
    if (!checkValidPhoneNumber(this.state.phoneNumber)) {
      this.setState({
        loading: false,
      });
      errorMessage('Enter a valid Phone Number');
      return;
    }

    const modifiedPhoneNumber = modifyPhoneNumber(this.state.phoneNumber);
    getOTPForAuthorization(modifiedPhoneNumber).then((response: any) => {
      console.log(response);
      if (response.status === 200) {
        this.setState({
          loading: false,
          stepsForLogin: this.state.stepsForLogin + 1,
          phoneNumber: modifiedPhoneNumber,
        });
      } else {
        this.setState({ loading: false });
        errorMessage('Something went bad :(');
      }
    });
  };
  handleVerifyOtp = async () => {
    if (this.state.otpToVerify.length < CELL_COUNT) {
      errorMessage("Invalid OTP, please try again")
      return;
    }
    verifyOTPForAuthorization(this.state.phoneNumber, this.state.otpToVerify).then(async (response: any) => {
      if (response.data.OtpVerification === true) {
        console.log(response.data)
        const userObject = {
          userId: response.data.userId,
          newUser: response.data.newUserFlag,
          userPhoneNumber: this.state.phoneNumber,
        }
        console.log(userObject)
        AsyncStorage.setItem("userObject", JSON.stringify(userObject)).then(() => {
          console.log("USER OBJECT IS SET")
        })
        const permissionStatus = await requestLocationPermission();
        if (permissionStatus === true) {
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: 'DashBoardView' }],
            }),
          );
        } else {
          errorMessage('Allow Permission status to the application');
          return;
        }
      }
      else {
        errorMessage("Enter Valid OTP")
      }
    }).catch(error => errorMessage("Something went wrong :("))

  };
  render() {
    if (this.state.loading === true) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
    if (!this.state.loading && this.state.stepsForLogin === 0) {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.loginContainer}>
            <View style={styles.inputContainer}>
              <Text
                style={{
                  fontSize: height / 35,
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'left',
                  width: '100%',
                }}>
                Continue with Mobile Number
              </Text>
              <TextInput
                style={styles.inputStyle}
                defaultValue={'+91'}
                keyboardType="phone-pad"
                onChangeText={(number: any) => {
                  this.setState({ phoneNumber: number });
                  // console.log(this.state.phoneNumber);
                }}
              />
              <Text style={styles.sentOtpText}>
                OTP will be sent to this Number
              </Text>
              <View style={styles.buttonContainer}>
                <Text style={{ fontSize: 12, color: 'white', margin: 10 }}>
                  By clicking you are agreeing to terms and conditon
                </Text>
                <TouchableOpacity
                  onPress={this.handleLogin}
                  style={styles.buttonStyle}>
                  <Text
                    style={{
                      fontSize: height / 35,
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    Send OTP
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    } else if (!this.state.loading && this.state.stepsForLogin === 1) {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.loginContainer}>
            <View style={[styles.inputContainer, { width: width }]}>
              <Text
                style={{
                  fontSize: height / 35,
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'left',
                  width: '100%',
                }}>
                Enter the OTP
              </Text>
              <Text
                style={{
                  fontSize: height / 55,
                  color: 'white',
                  textAlign: 'left',
                  width: '100%',
                  marginTop: 10,
                }}>
                We have sent the OTP to {this.state.phoneNumber}
              </Text>
              <OTPField
                otp={this.state.otpToVerify}
                setOtp={(otp: any) => {
                  this.setState({ otpToVerify: otp });
                }}
              />
              <Text
                onPress={() => { }}
                style={{
                  marginLeft: width / 2,
                  color: 'white',
                  marginTop: 5,
                  fontSize: height / 50,
                }}>
                Resend OTP
              </Text>
            </View>
            <View style={[styles.buttonContainer, { marginTop: height / 3 }]}>
              <TouchableOpacity
                onPress={this.handleVerifyOtp}
                style={styles.buttonStyle}>
                <Text
                  style={{
                    fontSize: height / 35,
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  Verify OTP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: '#e6c532',
    flex: 1,
  },
  loginContainer: {
    flex: 0.95,
    height: height,
    width: width,
    backgroundColor: 'black',
    zIndex: 2,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    alignContent: 'center',
    flexDirection: 'column',
  },
  inputContainer: {
    minHeight: height / 5,
    width: width - 40,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: height / 5,
    alignItems: 'center',
  },
  inputStyle: {
    marginTop: 25,
    backgroundColor: '#353535',
    borderRadius: 10,
    fontSize: 18,
    width: width - 40,
    color: 'white',
    height: 50,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  sentOtpText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'left',
    width: '100%',
    margin: 5,
    paddingLeft: 5,
  },
  buttonContainer: {
    height: height / 10,
    width: width,
    marginTop: height / 2.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#e6c532',
    height: '85%',
    width: '70%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default LoginView;
