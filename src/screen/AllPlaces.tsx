import {Text} from "react-native";
import PlacesList from "../components/Places/PlacesList";

export default function AllPlaces() {
    return <>
        <Text style={{color: 'white'}}>
            <PlacesList places={[]}/>
        </Text>
    </>
}