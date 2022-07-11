import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Carousel from "pinar";
import { TextInput } from 'react-native-gesture-handler';


class DashBoardView extends React.Component {
    render(): React.ReactNode {
        return <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Carousel containerStyle={{ borderRadius: 10 }} contentContainerStyle={styles.carousel}
                    width={width * 0.90} height={height * 0.30}
                    dotsContainerStyle={{ padding: 0, margin: 0, alignItems: "center", flexDirection: "row", justifyContent: "center", marginTop: 10 }}
                    dotStyle={{ backgroundColor: "#DEDEDE", height: 8, width: 8, borderRadius: 10, marginLeft: 5, marginRight: 5 }}
                    activeDotStyle={{ backgroundColor: "white", height: 12, width: 12, borderRadius: 50 }}
                    horizontal={true}
                    // onIndexChanged={({ index, total }) => {
                    //     console.log(index + total.toString())
                    //     this.setState({ index: index })

                    // }}
                    showsControls={false} showsDots={true}
                >
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
                <View style={styles.placeCard}></View>
                <View style={styles.searchSection}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        // onChangeText={(searchString) => {this.setState({searchString})}}
                        underlineColorAndroid="transparent"
                        placeholderTextColor={"#ddd"}
                    />
                </View>
                <View style={styles.servicesContainer}>
                    <View style={styles.service}>
                        <Image
                            style={styles.iconStyle}
                            source={require('../assets/icons/4-01.png')}
                        />
                        <Text style={{ color: 'white', fontSize: 12, }}>Water Wash & Spa</Text>
                    </View>
                    <View style={styles.service}>
                        <Image
                            style={styles.iconStyle}
                            source={require('../assets/icons/4-01.png')}
                        />
                        <Text style={{ color: 'white', fontSize: 12, }}>Water Wash & Spa</Text>
                    </View>
                    <View style={styles.service}>
                        <Image
                            style={styles.iconStyle}
                            source={require('../assets/icons/4-01.png')}
                        />
                        <Text style={{ color: 'white', fontSize: 12, }}>Water Wash & Spa</Text>
                    </View>
                    <View style={styles.service}>
                        <Image
                            style={styles.iconStyle}
                            source={require('../assets/icons/4-01.png')}
                        />
                        <Text style={{ color: 'white', fontSize: 12, }}>Water Wash & Spa</Text>
                    </View>
                    <View style={styles.service}>
                        <Image
                            style={styles.iconStyle}
                            source={require('../assets/icons/4-01.png')}
                        />
                        <Text style={{ color: 'white', fontSize: 12, }}>Water Wash & Spa</Text>
                    </View>
                    <View style={styles.service}>
                        <Image
                            style={styles.iconStyle}
                            source={require('../assets/icons/4-01.png')}
                        />
                        <Text style={{ color: 'white', fontSize: 12, }}>Water Wash & Spa</Text>
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
    }
}

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#e6c532',

    },
    scrollContainer: {
        zIndex: 2,
        height: height - 20,
        width: width,
        backgroundColor: "black",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        flexDirection: "column",
        alignItems: "center",
    },
    carousel: {
        marginTop: height * 0.05,
    },
    slide: {
        height: height * 0.4,
        width: "100%",
        backgroundColor: "white"
    },
    searchSection: {
        marginTop: 15,
        flexDirection: 'row',
        width: width * 0.8,
    },
    placeCard: {
        marginTop: 25,
        flexDirection: 'row',
        width: width * 0.8,
        backgroundColor: "#adadad",
        height: height / 15,
        borderRadius: 10
    },
    servicesContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
        flexDirection: "row",
        marginTop: 25,
    },
    service: {
        width: width * 0.3,
        backgroundColor: "#343434",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: width * 0.3,
        marginLeft: "2%",
        marginTop: 10,
        borderRadius: 10,
    },
    iconStyle: {
        height: "80%",
        width: "80%",
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#454545',
        color: '#fff',
        borderRadius: 15,
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
    }
})
export default DashBoardView;