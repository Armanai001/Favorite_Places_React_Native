import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Place} from "../../models/place";

export default function PlaceItem({place, onPress}: { place: Place, onPress: () => void }) {
    return <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={{uri: place.imageUri}} style={styles.image}/>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{place.title}</Text>
            <Text style={styles.address}>{place.address}</Text>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        margin: 5,
        backgroundColor: '#5d87e3',
        height: 90
    },
    imageContainer: {
        width: 90,
        height: 75,
        borderRadius: 3,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 3,
    },
    textContainer: {
        marginHorizontal: 5,
        marginLeft: 10
    },
    title: {
        fontSize: 20,
        marginBottom: 7
    },
    address: {
        fontStyle: 'italic',
        width: '70%',
    }
})