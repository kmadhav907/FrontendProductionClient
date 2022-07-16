import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel from 'pinar';
import {TextInput} from 'react-native-gesture-handler';

class DashBoardView extends React.Component {
  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Carousel
            containerStyle={{borderRadius: 10}}
            contentContainerStyle={styles.carousel}
            width={width * 0.9}
            height={height * 0.3}
            dotsContainerStyle={{
              padding: 0,
              margin: 0,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}
            dotStyle={{
              backgroundColor: '#DEDEDE',
              height: 8,
              width: 8,
              borderRadius: 10,
              marginLeft: 5,
              marginRight: 5,
            }}
            activeDotStyle={{
              backgroundColor: 'white',
              height: 12,
              width: 12,
              borderRadius: 50,
            }}
            horizontal={true}
            // onIndexChanged={({ index, total }) => {
            //     console.log(index + total.toString())
            //     this.setState({ index: index })

            // }}
            showsControls={false}
            showsDots={true}>
            <View style={styles.slide}>
              <Text>STYLE1</Text>
            </View>
            <View style={styles.slide}>
              <Text>STYLE1</Text>
            </View>
            <View style={styles.slide}>
              <Text>STYLE1</Text>
            </View>
            <View style={styles.slide}>
              <Text>STYLE1</Text>
            </View>
          </Carousel>
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
              />
            </View>
            <View style={styles.searchSectionIconView}>
              <Image
                style={styles.searchSectionIcon}
                source={require('../assets/search.png')}
              />
            </View>
          </View>
          <View style={styles.servicesContainer}>
            <View style={styles.service}>
              <Image
                style={styles.iconStyle}
                source={require('../assets/icons/1-01.png')}
              />
              <Text style={{color: 'white', fontSize: 12}}>
                Water Wash & Spa
              </Text>
            </View>
            <View style={styles.service}>
              <Image
                style={styles.iconStyle}
                source={require('../assets/icons/2-01.png')}
              />
              <Text style={{color: 'white', fontSize: 12}}>
                Water Wash & Spa
              </Text>
            </View>
            <View style={styles.service}>
              <Image
                style={styles.iconStyle}
                source={require('../assets/icons/3-01.png')}
              />
              <Text style={{color: 'white', fontSize: 12}}>
                Water Wash & Spa
              </Text>
            </View>
            <View style={styles.service}>
              <Image
                style={styles.iconStyle}
                source={require('../assets/icons/4-01.png')}
              />
              <Text style={{color: 'white', fontSize: 12}}>
                Water Wash & Spa
              </Text>
            </View>
            <View style={styles.service}>
              <Image
                style={styles.iconStyle}
                source={require('../assets/icons/5-01.png')}
              />
              <Text style={{color: 'white', fontSize: 12}}>
                Water Wash & Spa
              </Text>
            </View>
            <View style={styles.service}>
              <Image
                style={styles.iconStyle}
                source={require('../assets/icons/6-01.png')}
              />
              <Text style={{color: 'white', fontSize: 12}}>
                Water Wash & Spa
              </Text>
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

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#e6c532',
  },
  scrollContainer: {
    zIndex: 2,
    height: height - 20,
    width: width,
    backgroundColor: 'black',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  carousel: {
    marginTop: height * 0.05,
  },
  slide: {
    height: height * 0.4,
    width: '100%',
    backgroundColor: 'white',
  },

  placeCard: {
    marginTop: 25,
    flexDirection: 'row',
    width: width * 0.8,
    backgroundColor: '#adadad',
    height: height / 25,
    borderRadius: 10,
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
  servicesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    flexDirection: 'row',
    marginTop: 25,
  },
  service: {
    width: width * 0.3,
    backgroundColor: '#343434',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: width * 0.3,
    marginLeft: '3%',
    marginTop: 20,
    borderRadius: 10,
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
  },
  searchSectionInputView: {
    justifyContent: 'center',
    marginRight: 20,
    width: '100%',
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
export default DashBoardView;
