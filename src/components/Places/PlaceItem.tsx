import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Place} from "../../models/place";

export default function PlaceItem({place, onPress}: { place: Place, onPress: () => void }) {
    return <Pressable onPress={onPress}>
        <Image source={{uri: place.imageUri}}/>
        <View>
            <Text style={styles.text}>{place.title}</Text>
            <Text style={styles.text}>{place.address}</Text>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    text: {
        color: 'white'
    }
})