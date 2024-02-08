import {useCallback, useLayoutEffect, useState} from "react";
import {Alert, StyleSheet} from "react-native";
import MapView, {MapPressEvent, Marker} from "react-native-maps";

import IconButton from "../components/Ui/IconButton";

export default function MapScreen({navigation, route}: { navigation: any, route: any }) {
    const initialRegion = {
        latitude: route.params.latitude || 30.1501,
        longitude: route.params.longitude || 75.7176,
        latitudeDelta: 0.8499,
        longitudeDelta: 0.2824
    }

    const [selectedLocation, setSelectedLocation] = useState<mapObject>({
        latitude: null,
        longitude: null
    })

    function locationHandler(event: MapPressEvent) {
        !route.params && setSelectedLocation({...event.nativeEvent.coordinate})
    }

    const saveLocation = useCallback(() => {
        if (selectedLocation.longitude === null && selectedLocation.latitude === null) {
            Alert.alert('Location Not selected', 'Please select a location to add.')
        } else {
            navigation.navigate('AddPlace', selectedLocation)
        }
    }, [navigation, selectedLocation])

    useLayoutEffect(() => {
        !route.params && navigation.setOptions({
            headerRight: ({tintColor}: { tintColor: string }) => (
                <IconButton name="save" color={tintColor} size={24} onPress={saveLocation}/>)
        })
    }, [navigation, saveLocation])


    return <>
        <MapView initialRegion={initialRegion}
                 style={styles.map}
                 onPress={locationHandler}
        >
            {
                selectedLocation.latitude !== null &&
                selectedLocation.longitude !== null &&
                <Marker
                    title="Picked location"
                    coordinate={{
                        latitude: selectedLocation.latitude as number,
                        longitude: selectedLocation.longitude as number
                    }}/>
            }
            {
                route.params.latitude &&
                route.params.longitude &&
                <Marker
                    title={"Saved Location"}
                    coordinate={{
                        latitude: route.params.latitude as number,
                        longitude: route.params.longitude as number
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