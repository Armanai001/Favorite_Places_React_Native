import {FlatList, StyleSheet, Text, View} from "react-native";
import PlaceItem from "./PlaceItem";
import {Place} from "../../models/place";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export default function PlacesList({places}: { places: Place[] }) {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    function handleClick(id: string) {
        navigation.navigate('Detail', {id: id})
    }

    return <View>
        {
            places.length === 0 ? <Text style={styles.notFount}>No Places found</Text> :
                <FlatList data={places}
                          keyExtractor={({id}) => id}
                          renderItem={({item}) => (
                              <PlaceItem place={item} onPress={() => {
                                  handleClick(item.id)
                              }}/>
                          )}/>
        }
    </View>
}

const styles = StyleSheet.create({
    notFount: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        margin: 10,
    }
})