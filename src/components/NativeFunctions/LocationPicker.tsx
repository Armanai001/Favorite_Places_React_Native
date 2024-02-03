import {Alert, StyleSheet, Text, View} from "react-native";
import OutlineButton from "../Ui/OutlineButton";
import {getCurrentPositionAsync, useForegroundPermissions} from "expo-location";
import {PermissionStatus} from "expo-image-picker";

export default function LocationPicker() {

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()

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
    }

    function mapHandler() {

    }


    return (
        <View style={styles.container}>
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
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'
    },
    orText: {
        fontSize: 20,
        color: 'white'
    }
})