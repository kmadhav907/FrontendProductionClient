import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
// import {SliderBox} from 'react-native-image-slider-box';

import {SliderBox} from 'react-native-image-slider-box';
const numColumns = 3;
const data = [
  {id: 'a', value: 'A'},
  {id: 'b', value: 'B'},
  {id: 'c', value: 'C'},
  {id: 'd', value: 'D'},
  {id: 'e', value: 'E'},
  {id: 'f', value: 'F'},
];

class DashBoardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        'https://source.unsplash.com/1024x768/?nature',
        'https://source.unsplash.com/1024x768/?water',
        'https://source.unsplash.com/1024x768/?girl',
        'https://source.unsplash.com/1024x768/?tree',
      ],
    };
  }
  render() {
    return (
      <>
        <View style={Styles.container}>
          <View style={Styles.showBarMain}>
            <View style={Styles.showBarIconOuter}>
              <Image
                source={require('../assets/placeholder.png')}
                style={Styles.showBarImageStyle}
              />
            </View>
            <View style={Styles.showBarTextStyle}>
              <Text>Show Bar</Text>
            </View>
          </View>
          <View style={Styles.searchBarStyle}>
            <View style={Styles.searchBarInputStyle}>
              <TextInput
                keyboardType="default"
                placeholder="What Are you looking For"
              />
            </View>
            <View style={Styles.searchBarSearchIconStyle}>
              <Image
                style={Styles.icons}
                source={require('../assets/search.png')}
              />
            </View>
          </View>

          <View>
            <View style={Styles.row}>
              <View style={Styles.column}>
                <Image
                  style={Styles.innerIconStyle}
                  source={require('../assets/icons/1-01.png')}
                />
                <Text style={{color: 'white'}}>Cars</Text>
              </View>
              <View style={Styles.column}>
                <Image
                  style={Styles.innerIconStyle}
                  source={require('../assets/icons/2-01.png')}
                />
                <Text style={{color: 'white'}}>Bike</Text>
              </View>
              <View style={Styles.column}>
                <Image
                  style={Styles.innerIconStyle}
                  source={require('../assets/icons/3-01.png')}
                />
                <Text style={{color: 'white'}}>Towing</Text>
              </View>
            </View>
            <View style={Styles.row}>
              <View style={Styles.column}>
                <Image
                  style={Styles.innerIconStyle}
                  source={require('../assets/icons/4-01.png')}
                />
                <Text style={{color: 'white'}}>Water Wash & Spa</Text>
              </View>
              <View style={Styles.column}>
                <Image
                  style={Styles.innerIconStyle}
                  source={require('../assets/icons/5-01.png')}
                />
                <Text style={{color: 'white'}}>Accessories</Text>
              </View>
              <View style={Styles.column}>
                <Image
                  style={Styles.innerIconStyle}
                  source={require('../assets/icons/6-01.png')}
                />
                <Text style={{color: 'white'}}>ASK Membership</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={Styles.bottomView}>
          <TouchableOpacity>
            <Image
              source={require('../assets/2-01.png')}
              style={Styles.iconStyle}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={require('../assets/3-01.png')}
              style={Styles.iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../assets/4-01.png')}
              style={Styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const size = Dimensions.get('window').width / numColumns;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    width: width,
    zIndex: 2,
    flex: 0.94,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
  innerIconStyle: {
    width: 60,
    height: 60,
    padding: 10,
    backgroundColor: '#353535',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  column: {
    width: width / 3,
    height: height / 7,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  searchBarStyle: {
    backgroundColor: '#353535',
    width: width / 1.2,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
  },
  icons: {
    width: 30,
    height: 30,
  },
  searchBarInputStyle: {},
  searchBarSearchIconStyle: {
    justifyContent: 'center',
    paddingRight: 10,
  },
  showBarMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#353535',
    width: width / 1.2,
    marginBottom: 20,
    borderRadius: 15,
  },
  showBarIconOuter: {
    justifyContent: 'center',
    borderStartColor: 'red',
    padding: 10,
  },
  showBarTextStyle: {
    padding: 10,
    width: width,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },

  showBarImageStyle: {
    width: 20,
    height: 20,
  },
  bottomView: {
    backgroundColor: '#f9d342',
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 7,
    elevation: 10,
  },
});

export default DashBoardView;
