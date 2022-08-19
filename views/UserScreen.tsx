import React from 'react'
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface UserScreenProps {
    navigation: any;
}
interface UserScreenState {
    loading: boolean;
}
class UserScreen extends React.Component<UserScreenProps, UserScreenState> {
    constructor(props: any) {
        super(props);
        this.state = { loading: false }
    }
    render() {
        if (this.state.loading) {
            return <View style={styles.userProfileContainer}>
                <ActivityIndicator
                    animating={this.state.loading}
                    color="blue"
                    size="large"
                    style={styles.activityIndicator}
                />
            </View>
        }
        return <View style={styles.userProfileContainer}>
            <View style={styles.menu}>
                <TouchableOpacity>
                    <Image
                        source={require('../assets/icons/13-01.png')}
                        style={styles.menuIconStyle}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                nestedScrollEnabled={true}
                style={styles.scrollContainer}
            >

                <View style={{ height: 130, backgroundColor: "white", width: 130, borderRadius: 65, alignSelf: "center", marginTop: 25 }}></View>
                <View style={styles.inputContainer}>
                    <View style={{ backgroundColor: "#353535", padding: 4, paddingLeft: "2%", paddingRight: 0, width: "98%", borderRadius: 4, alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>Name:</Text>
                        <TextInput style={{
                            marginLeft: 10,
                            borderBottomColor: '#000',
                            fontSize: 16,
                            padding: 4,
                            minWidth: "85%",
                            color: "white"
                        }} underlineColorAndroid="transparent"
                            placeholder="Enter your name"
                            placeholderTextColor="#ABABAB"
                            autoCapitalize="none" />
                    </View>
                    <View style={{ backgroundColor: "#353535", padding: 4, marginTop: 10, paddingLeft: "2%", paddingRight: 0, width: "98%", borderRadius: 4, alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>Email:</Text>
                        <TextInput style={{
                            marginLeft: 10,
                            borderBottomColor: '#000',
                            fontSize: 16,
                            padding: 4,
                            minWidth: "85%",
                            color: "white"
                        }} underlineColorAndroid="transparent"
                            placeholder="Enter your Email"
                            placeholderTextColor="#ABABAB"
                            autoCapitalize="none" />
                    </View>
                    <View style={{ backgroundColor: "#353535", padding: 4, marginTop: 10, paddingLeft: "2%", paddingRight: 0, width: "98%", borderRadius: 4, alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>Phone:</Text>
                        <TextInput style={{
                            marginLeft: 10,
                            borderBottomColor: '#000',
                            fontSize: 16,
                            padding: 4,
                            minWidth: "85%",
                            color: "white"
                        }} underlineColorAndroid="transparent"
                            placeholder="Enter your phone"
                            placeholderTextColor="#ABABAB"
                            autoCapitalize="none" />
                    </View>
                    <TouchableOpacity style={{ backgroundColor: "#e6c532", padding: 15, paddingTop: 5, paddingBottom: 5, alignSelf: "flex-start", marginTop: 15, borderRadius: 5, marginLeft: 5 }}>
                        <Text style={{ color: "black", fontSize: 14, fontWeight: "500" }}>Save</Text>
                    </TouchableOpacity>
                    <View style={{ width: width * 0.9, marginTop: 15, backgroundColor: "#353535", minHeight: 50, borderRadius: 5, flexDirection: "column", paddingBottom: 10, alignItems: "center" }}>
                        <Text style={{ textAlign: "center", fontWeight: "500", fontSize: 18, color: "white" }}>Your Vehicles</Text>
                        <View style={{ backgroundColor: "white", padding: 2.5, borderRadius: 5, marginTop: 5, width: "95%" }}>
                            <Text style={{ color: "black", fontSize: 16, fontWeight: "600", textAlign: "center" }}>
                                Vitara Brezza
                            </Text>
                        </View>
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
    userProfileContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#e6c532',
    },
    activityIndicator: {
        alignItems: "center",
        height: 80,
    }, bottomView: {
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
    menu: {
        backgroundColor: 'black',
        paddingTop: height - 750,
        paddingLeft: width - 380,
    },
    scrollContainer: {
        height: height - 250,
        width: width,
        backgroundColor: 'black',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    menuIconStyle: {
        width: 30,
        height: 30,
    },
    inputContainer: {
        width: width * 0.9,
        alignSelf: "center",
        minHeight: 200,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "flex-start"
    }
})
export default UserScreen;