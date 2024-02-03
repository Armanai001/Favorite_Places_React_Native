import MapView, {MapPressEvent, Marker} from "react-native-maps";
import {StyleSheet} from "react-native";
import {useState} from "react";

export default function MapScreen() {
    const initialRegion = {
        latitude: 29.1501,
        longitude: 75.7176,
        latitudeDelta: 0.8499,
        longitudeDelta: 0.2824
    }

    const [selectedLocation, setSelectedLocation] = useState<{ lat: number, lng: number }>({lat: 0, lng: 0})

    function locationHandler(event: MapPressEvent) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude
        setSelectedLocation({lat, lng})
    }

    return <>
        <MapView initialRegion={initialRegion}
                 style={styles.map}
                 onPress={locationHandler}
        >
            {
                selectedLocation.lat !== 0 &&
                selectedLocation.lng !== 0 &&
                <Marker
                    title="Picked location"
                    coordinate={{
                    latitude: selectedLocation.lat,
                    longitude: selectedLocation.lng
                }}/>
            }
        </MapView>
    </>
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})