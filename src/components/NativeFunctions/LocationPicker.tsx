import {useEffect} from "react";
import {Alert, StyleSheet, Text, View} from "react-native";
import {getCurrentPositionAsync, useForegroundPermissions} from "expo-location";
import {PermissionStatus} from "expo-image-picker";
import MapView, {Marker} from "react-native-maps";

import {useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

import OutlineButton from "../Ui/OutlineButton";


export default function LocationPicker({location, setLocation}: {
    location: mapObject,
    setLocation: (data: mapObject) => void
}) {

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()

    const navigation = useNavigation<NativeStackNavigationProp<{ Map: undefined }>>()
    const isFocused = useIsFocused()
    const route = useRoute()

    async function verifyPermissions() {
        if (!locationPermissionInformation) {
            return false;
        } else if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        } else if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Permission Not Granted', 'Give access to your current location.')
            return false;
        } else return true;
    }


    async function locationHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) return;
        const location = await getCurrentPositionAsync();
        setLocation({...location.coords})
    }

    function mapHandler() {
        navigation.navigate('Map')
    }


    useEffect(() => {
        if (isFocused && route.params) {
            setLocation({latitude: null, longitude: null, ...route.params})
        }

    }, [isFocused, route])


    return (
        <View style={styles.container}>
            {
                location.latitude !== null &&
                location.longitude !== null &&
                <MapView
                    style={styles.mapPreview}
                    scrollEnabled={false}
                    initialRegion={{
                        latitude: location.latitude as number,
                        longitude: location.longitude as number,
                        latitudeDelta: 0.8499,
                        longitudeDelta: 0.2824
                    }}
                >
                    <Marker coordinate={{
                        latitude: location.latitude as number,
                        longitude: location.longitude as number
                    }}/>
                </MapView>
            }

            <View style={styles.buttonContainer}>
                <OutlineButton icon="location" onPress={locationHandler}>
                    Current Location
                </OutlineButton>

                <Text style={styles.orText}>
                    Or
                </Text>

                <OutlineButton icon="map" onPress={mapHandler}>
                    Pick from Map
                </OutlineButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'
    },
    mapPreview: {
        width: '100%',
        height: 200
    },
    orText: {
        fontSize: 20,
        color: 'white'
    }
})