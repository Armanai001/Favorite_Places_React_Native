import {Image, Pressable, Text, View} from "react-native";

export default function PlaceItem({place, onPress}: { place: placeType, onPress: () => void }) {
    return <Pressable onPress={onPress}>
        <Image source={{uri: place.imageUri}}/>
        <View>
            <Text>{place.title}</Text>
            <Text>{place.address}</Text>
        </View>
    </Pressable>
}