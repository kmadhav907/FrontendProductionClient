import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getBikeBrands, getBikeDetailsList } from '../apiServices/brandsApis';
import { errorMessage } from '../global/utils';

interface BikeRequestProps {
    navigation: any;
}
interface BikeRequestState {
    currentStepsForRequest: number;
    loading: boolean;
    bikeBrands: any[];
    searchKeyWord: string;
    bikeList: any[];
}
const items = [
    { id: 'Chocolate', value: 'Chocolate' },
    { id: 'Coconut', value: 'Coconut' },
    { id: 'Mint', value: 'Mint' },
    { id: 'Strawberry', value: 'Strawberry' },
    { id: 'Vanilla', value: 'Vanilla' },
]
class BikeRequestSteps extends React.Component<
    BikeRequestProps,
    BikeRequestState
> {
    constructor(props: BikeRequestProps) {
        super(props);
        this.state = {
            currentStepsForRequest: 0,
            bikeBrands: [],
            loading: false,
            searchKeyWord: '',
            bikeList: [],
        };
    }
    componentDidMount = async () => {
        this.setState({ loading: true });
        getBikeBrands()
            .then((response: any) => {
                console.log(response.data);
                this.setState({ bikeBrands: response.data });
            })
            .catch(err => errorMessage('Something went wrong'));
        this.setState({ loading: false });
    };
    getVariousBikeDetails = async (bike: any) => {
        this.setState({ loading: true });
        getBikeDetailsList(bike.bikebrandid).then((response: any) => {
            console.log(response.data);
            this.setState({ bikeList: items, currentStepsForRequest: this.state.currentStepsForRequest + 1, searchKeyWord: "" })
        })
        setTimeout(() => {
            this.setState({ loading: false })
        }, 500)

    };
    render() {
        if (this.state.loading) {
            return (
                <View>
                    <Text>Loading</Text>
                </View>
            );
        }
        if (!this.state.loading && this.state.currentStepsForRequest === 0)
            return (
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.bikeContainer}>
                            <Image
                                source={require('../assets/icons/2-01.png')}
                                style={styles.bikeImageStyles}
                            />
                        </View>
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
                                    onChangeText={(searchString: string) => {
                                        this.setState({ searchKeyWord: searchString });
                                        console.log(searchString);
                                    }}
                                />
                            </View>
                            <View style={styles.searchSectionIconView}>
                                <Image
                                    style={styles.searchSectionIcon}
                                    source={require('../assets/search.png')}
                                />
                            </View>
                        </View>
                        <View style={styles.listContainer}>
                            {this.state.bikeBrands
                                .filter((bike: any) => {
                                    if (this.state.searchKeyWord === '') return bike;
                                    else if (
                                        bike.bikebrandname
                                            .toLowerCase()
                                            .includes(this.state.searchKeyWord.toLowerCase())
                                    ) {
                                        return bike;
                                    }
                                })
                                .map((bike: any, index: number) => (
                                    <View style={styles.listItem} key={index}>
                                        <View style={styles.itemIcon}></View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.getVariousBikeDetails(bike);
                                            }}
                                            style={{
                                                width: width * 0.9 - 60,
                                                height: '100%',
                                                backgroundColor: 'white',
                                                borderRadius: 5,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingLeft: 15,
                                            }}>
                                            <Text
                                                style={{
                                                    textAlign: 'left',
                                                    color: 'black',
                                                    fontSize: 16,
                                                }}>
                                                {bike.bikebrandname}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
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
        if (!this.state.loading && this.state.currentStepsForRequest === 1) {
            return <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.bikeContainer}>
                        <Image
                            source={require('../assets/icons/2-01.png')}
                            style={styles.bikeImageStyles}
                        />
                    </View>
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
                                onChangeText={(searchString: string) => {
                                    this.setState({ searchKeyWord: searchString });
                                    console.log(searchString);
                                }}
                            />
                        </View>
                        <View style={styles.searchSectionIconView}>
                            <Image
                                style={styles.searchSectionIcon}
                                source={require('../assets/search.png')}
                            />
                        </View>
                    </View>
                    <View style={styles.listContainer}>
                        {this.state.bikeList
                            .filter((bike: any) => {
                                if (this.state.searchKeyWord === '') return bike;
                                else if (
                                    bike.id
                                        .toLowerCase()
                                        .includes(this.state.searchKeyWord.toLowerCase())
                                ) {
                                    return bike;
                                }
                            })
                            .map((bike: any, index: number) => (
                                <View style={styles.listItem} key={index}>
                                    <View style={styles.itemIcon}></View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // this.getVariousBikeDetails(bike);
                                        }}
                                        style={{
                                            width: width * 0.9 - 60,
                                            height: '100%',
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingLeft: 15,
                                        }}>
                                        <Text
                                            style={{
                                                textAlign: 'left',
                                                color: 'black',
                                                fontSize: 16,
                                            }}>
                                            {bike.id}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
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
    bikeContainer: {
        width: width,
        marginTop: 80,
        backgroundColor: '#343434',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    bikeImageStyles: {
        height: 77.87,
        width: 120,
    },

    placeCard: {
        marginTop: 25,
        flexDirection: 'row',
        width: width * 0.8,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
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
    listContainer: {
        alignItems: 'center',
        marginTop: 15,
    },
    listItem: {
        marginTop: 10,
        padding: 5,
        width: width * 0.9,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemIcon: {
        height: 32,
        width: 32,
        backgroundColor: 'white',
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
export default BikeRequestSteps;
