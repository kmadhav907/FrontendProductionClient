import React from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Text, } from 'react-native';
import Carousel from "pinar";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IntroState {
  index: number;
}
interface IntroProps {
  navigation: any;
}
const NUMBER_OF_SLIDES = 2;
class IntroView extends React.Component<IntroProps, IntroState> {
  constructor(props: any) {
    super(props);
    this.state = {
      index: 0,
    }
  }

  componentDidMount() { }
  handleNextPage = async () => {
    try {
      await AsyncStorage.setItem("introCheck", JSON.stringify(true));
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "LoginView" }],
        })
      );
    } catch (error) {
      console.log("Something went wrong")
    }

  }
  render() {
    return <ScrollView contentContainerStyle={styles.container}>
      <Carousel contentContainerStyle={styles.carousel} containerStyle={{ borderRadius: 10 }}
        width={width * 0.8} height={height * 0.8}
        dotStyle={{ backgroundColor: "#DEDEDE", height: 10, width: 10, borderRadius: 10, marginLeft: 5, marginRight: 5 }}
        activeDotStyle={{ backgroundColor: "white", height: 15, width: 15, borderRadius: 50 }}
        onIndexChanged={({ index, total }) => {
          console.log(index + total.toString())
          this.setState({ index: index })

        }}
        showsControls={false} showsDots={true}
      >
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
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} disabled={this.state.index !== NUMBER_OF_SLIDES} onPress={this.handleNextPage}>
          <Text style={{ fontSize: height / 40, color: "black", fontWeight: "bold" }}>Next</Text>
        </TouchableOpacity>
      </View>
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
  },
  buttonGroup: {
    width: width - 10,
    padding: 5,
    marginTop: 10,
    height: height / 10,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: "90%",
    width: width * 0.8,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  }
})
export default IntroView;
