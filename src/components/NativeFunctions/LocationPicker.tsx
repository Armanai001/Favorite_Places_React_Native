import {Alert, Image, StyleSheet, Text, View} from "react-native";
import OutlineButton from "../Ui/OutlineButton";
import {getCurrentPositionAsync, useForegroundPermissions} from "expo-location";
import {PermissionStatus} from "expo-image-picker";
import {useState} from "react";

export default function LocationPicker() {

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()
    const [currentLocation, setCurrentLocation] = useState<any>('')

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
        setCurrentLocation({lat: location.coords.latitude, lng: location.coords.longitude})
    }

    function mapHandler() {

    }

    function getMapPreview(lat: number, lng: number) {
        const googleMapApiKey = ''
        return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${googleMapApiKey}`
    }


    return (
        <View style={styles.container}>
            {
                currentLocation !== '' && <Image style={styles.mapPreview}
                                                 source={{uri: getMapPreview(currentLocation.lat, currentLocation.lng)}}/>
            }
            {
                currentLocation && <Text>{currentLocation.lat} and {currentLocation.lng}</Text>
            }

            <View style={styles.buttonContainer}>
                <OutlineButton icon="location" onPress={locationHandler}>
                    User Location
                </OutlineButton>

                <Text style={styles.orText}>
                    Or
                </Text>

                <OutlineButton icon="map" onPress={mapHandler}>
                    Pick on Map
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