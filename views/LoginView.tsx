import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { checkValidPhoneNumber, errorMessage, modifyPhoneNumber } from '../global/utils';

interface LoginViewState {
  phoneNumber: string;
  stepsForLogin: number;
  loading: boolean;
}
interface LoginViewProps {
  navigation: any;
}
class LoginView extends React.Component<LoginViewProps, LoginViewState> {
  constructor(props: LoginViewProps) {
    super(props);
    this.state = {
      phoneNumber: '',
      stepsForLogin: 0,
      loading: false,
    }
  }
  handleLogin = async () => {
    this.setState({ loading: true });
    if (!checkValidPhoneNumber(this.state.phoneNumber)) {
      this.setState({
        loading: false,
      });
      errorMessage("Enter a valid Phone Number");
      return;
    }
    const modifiedPhoneNumber = modifyPhoneNumber(this.state.phoneNumber);
    this.setState({
      loading: false,
      stepsForLogin: this.state.stepsForLogin + 1,
      phoneNumber: modifiedPhoneNumber,
    });
  }
  render() {
    if (this.state.loading === true) {
      return <View></View>
    }
    if (!this.state.loading && this.state.stepsForLogin === 0) {
      return (<ScrollView contentContainerStyle={styles.container}>
        <View style={styles.loginContainer}>
          <View style={styles.inputContainer}>
            <Text style={{
              fontSize: height / 35, color: "white", fontWeight: "bold", textAlign: "left",
              width: "100%",

            }}>
              Continue with Mobile Number
            </Text>
            <TextInput
              style={styles.inputStyle}
              defaultValue={"+91"}
              keyboardType="phone-pad"
              onChangeText={(number: any) => {
                this.setState({ phoneNumber: number });
                // console.log(this.state.phoneNumber);
              }}
            />
            <Text style={{ color: "white", fontSize: 14, textAlign: "left", width: "100%", margin: 5, paddingLeft: 5 }}>OTP will be sent to this Number</Text>
            <View style={{ height: height / 10, width: width, marginTop: height / 2.2, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 12, color: "white", margin: 10, }}>
                By clicking you are agreeing to terms and conditon
              </Text>
              <TouchableOpacity style={{ backgroundColor: "#e6c532", height: "85%", width: "70%", borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: height / 35, color: "black", fontWeight: "bold" }}>Send OTP</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>)
    }
  }
}
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width
const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: "#e6c532",
    flex: 1
  },
  loginContainer: {
    flex: 0.95,
    height: height,
    width: width,
    backgroundColor: "black",
    zIndex: 2,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    alignContent: "center",
    flexDirection: "column"
  },
  inputContainer: {
    minHeight: height / 5,
    width: width - 40,
    marginLeft: 20, marginRight: 20,
    paddingTop: height / 5,
    alignItems: "center",
  },
  inputStyle: {
    marginTop: 25,
    backgroundColor: "#454545",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
    fontSize: 18,
    width: width - 40,
    color: "white",
    height: 50,
    fontWeight: "bold",
    paddingLeft: 10,
  },
})
export default LoginView;
