import {useCallback, useLayoutEffect, useState} from "react";
import {Alert, StyleSheet} from "react-native";
import MapView, {MapPressEvent, Marker} from "react-native-maps";

import IconButton from "../components/Ui/IconButton";

export default function MapScreen({navigation}: { navigation: any }) {
    const initialRegion = {
        latitude: 30.1501,
        longitude: 75.7176,
        latitudeDelta: 0.8499,
        longitudeDelta: 0.2824
    }

    const [selectedLocation, setSelectedLocation] = useState<mapObject>({
        latitude: 0,
        longitude: 0
    })

    function locationHandler(event: MapPressEvent) {
        setSelectedLocation({...event.nativeEvent.coordinate})
    }

    const saveLocation = useCallback(() => {
        if (selectedLocation.longitude === 0 && selectedLocation.latitude === 0) {
            Alert.alert('Location Not selected', 'Please select a location to add.')
        } else {
            navigation.navigate('AddPlace', selectedLocation)
        }
    }, [navigation, selectedLocation])

    useLayoutEffect(() => {
        navigation.setOptions({
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
                selectedLocation.latitude !== 0 &&
                selectedLocation.longitude !== 0 &&
                <Marker
                    title="Picked location"
                    coordinate={{...selectedLocation}}/>
            }
        </MapView>
    </>
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})