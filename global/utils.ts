import { Alert, Platform, ToastAndroid } from "react-native";

export const modifyPhoneNumber = (phoneNumber: string) => {
    if (phoneNumber.startsWith("+91")) {
      phoneNumber = phoneNumber.slice(3);
      console.log(phoneNumber);
    }
    return phoneNumber;
  };
  export const checkValidPhoneNumber = (phoneNumber: string) => {
    const regex = new RegExp(
      "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
    );
    return regex.test(phoneNumber);
  };
  export const errorMessage = (message: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  };