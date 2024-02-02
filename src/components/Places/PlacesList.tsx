import {FlatList, StyleSheet, Text, View} from "react-native";
import PlaceItem from "./PlaceItem";

export default function PlacesList({places}: { places: any[] }) {

    function handleClick() {

    }

    return <View style={styles.container}>
        {
            places.length === 0 ? <Text style={styles.notFount}>No Places found</Text> :
                <FlatList data={places}
                          keyExtractor={({item}) => item}
                          renderItem={({item}) => (
                              <PlaceItem place={item.item} onPress={handleClick}/>
                          )}/>
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    notFount: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        margin: 10,
    }
})