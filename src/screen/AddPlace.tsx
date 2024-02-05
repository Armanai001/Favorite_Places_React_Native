import {View} from "react-native";
import PlaceForm from "../components/Places/PlaceForm";
import {Place} from "../models/place";

export default function AddPlace({navigation}: { navigation: any }) {
    function submitPlace(data: Place) {
        navigation.navigate('AllPlaces', data)
    }

    return <>
        <View>
            <PlaceForm submitPlace={submitPlace}/>
        </View>
    </>
}

