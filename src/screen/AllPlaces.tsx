import {View} from "react-native";
import PlacesList from "../components/Places/PlacesList";
import {useEffect, useState} from "react";
import {Place} from "../models/place";
import {useIsFocused} from "@react-navigation/native";

export default function AllPlaces({route}: { route: any }) {

    const [placesList, setPlacesList] = useState<Place[]>([])
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && route.params) {
            setPlacesList(preValue => [...preValue, route.params])
            route.params = undefined
        }
    }, [isFocused, route])


    return <>

        <View>
            <PlacesList places={placesList}/>
        </View>
    </>
}