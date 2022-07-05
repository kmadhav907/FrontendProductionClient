import React from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Text, } from 'react-native';
import Carousel from "pinar";
class IntroView extends React.Component {
  render() {
    return <ScrollView contentContainerStyle={styles.container}>
      <Carousel contentContainerStyle={styles.carousel} containerStyle={{ borderRadius: 10 }} width={width * 0.8} height={height * 0.8} dotStyle={{ backgroundColor: "#DEDEDE", height: 10, width: 10, borderRadius: 10, marginLeft: 5, marginRight: 5 }} activeDotStyle={{ backgroundColor: "white", height: 15, width: 15, borderRadius: 50 }}
        showsControls={false} showsDots={true}>
        <View style={styles.slide}>
          <Text>Slide Me</Text>
        </View>
        <View style={styles.slide}>
          <Text>Slide Me</Text>
        </View>
        <View style={styles.slide}>
          <Text>Slide Me</Text>
        </View>
      </Carousel>
    </ScrollView>;
  }
}

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: height,
    width: width
  },
  carousel: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.8,
    height: height * 0.6,
    backgroundColor: "white",

  }
})
export default IntroView;
