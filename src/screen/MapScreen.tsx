import MapView from "react-native-maps";
import {StyleSheet} from "react-native";

export default function MapScreen() {
    const initialRegion = {
        latitude: 29.1501,
        longitude: 75.7176,
        latitudeDelta: 0.8499,
        longitudeDelta: 0.2824
    }
    return <>
        <MapView initialRegion={initialRegion}
                 style={styles.map}
        />
    </>
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})