import {Alert, PermissionsAndroid, Platform, ToastAndroid} from 'react-native';

export const modifyPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.startsWith('+91')) {
    phoneNumber = phoneNumber.slice(3);
    console.log(phoneNumber);
  }
  return phoneNumber;
};
export const checkValidPhoneNumber = (phoneNumber: string) => {
  const regex = new RegExp(
    '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$',
  );
  return regex.test(phoneNumber);
};
export const errorMessage = (message: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert(message);
  }
};

export const requestLocationPermission = async () => {
  const granted = PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Require Location Access',
      message: 'Need Permission for location Access',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
  console.log('granted---------', granted);
  if ((await granted) === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('You can use the device location');
    return true;
  } else {
    console.log('device location permission denied');
    return false;
  }
};
