import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

class LoginView extends React.Component {
  render() {
    return <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.loginContainer}></View>
    </ScrollView>;
  }
}
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width
const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: "yellow",
    flex: 1
  },
  loginContainer: {
    height: height - 0.01 * height,
    width: width,
    backgroundColor: "black",
    zIndex: 2,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  }
})
export default LoginView;
