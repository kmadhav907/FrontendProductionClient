import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { Dimensions, Text, ToastAndroid, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { saveLocation } from '../apiServices/locationApi';
import { requestLocationPermission } from '../global/utils';
import Geolocation from "react-native-geolocation-service";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
interface RequestMapViewState {
    isMapLoaded: boolean;
    loading: boolean;
    latitude: number | undefined;
    longitude: number | undefined;
}
class RequestMapView extends React.Component<{}, RequestMapViewState>{
    constructor(props: any) {
        super(props);
        this.state = {
            isMapLoaded: false,
            loading: false,
            latitude: undefined,
            longitude: undefined,
        }
    }
    componentDidMount = async () => {
        this.setState({ loading: true })

        try {
            const permissionStatus = await requestLocationPermission();
            if (permissionStatus === true) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        this.setState({ latitude: latitude, longitude: longitude });
                    },
                    (error) => {
                        ToastAndroid.show(error.message, ToastAndroid.SHORT);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
                Geolocation.watchPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        this.setState({ latitude: latitude, longitude: longitude }, () => {
                            this.saveLocation();
                        });
                    },
                    (error) => {
                        ToastAndroid.show(error.message, ToastAndroid.SHORT);
                    },
                    {
                        showLocationDialog: true,
                        enableHighAccuracy: true,
                    }
                );
            }
        } catch (err) {
            console.log(err);
        }
        this.setState({ loading: false })
    }
    saveLocation = async () => {
        const userObject = await AsyncStorage.getItem("userObject");
        const userId = JSON.parse(userObject!).userId;
        const latitude = this.state.latitude;
        const longitude = this.state.longitude;
        saveLocation(userId, latitude as number, longitude as number).then((response: any) => {
            console.log(response.data)
        })
    }
    onMapLayout = () => {
        this.setState({ isMapLoaded: true });
    };
    render() {
        if (this.state.loading) {
            return <View style={{ height: height, width: width, backgroundColor: "yellow" }}>
                <Text>Loading...</Text>
            </View>
        }
        return <View style={{ height: height, width: width, backgroundColor: "yellow" }}>
            {<MapView
                style={{ height: "100%", width: "100%" }}
                zoomEnabled={true}
                onMapReady={this.onMapLayout}
                zoomControlEnabled={false}
                initialRegion={{
                    latitude: 28.579660,
                    longitude: 77.321110,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>

                <Marker
                    coordinate={{ latitude: 28.579660, longitude: 77.321110 }}

                />
            </MapView>}
        </View>
    }
}
export default RequestMapView;