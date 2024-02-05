import {useState} from "react";
import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";

import {colors} from "../../constants/colors";
import ImagePicker from "../NativeFunctions/ImagePicker";
import LocationPicker from "../NativeFunctions/LocationPicker";
import OutlineButton from "../Ui/OutlineButton";
import {coordinatesToAddress} from "../../Utility/MapUtil";
import {Place} from "../../models/place";

export default function PlaceForm({submitPlace}: { submitPlace: (data: Place) => void }) {

    const [title, setTile] = useState('')

    const [takenImage, setTakenImage] = useState('')

    const [location, setLocation] = useState<mapObject>({
        latitude: 0,
        longitude: 0
    })

    async function submitData() {
        const address = await coordinatesToAddress(location)
        const data = new Place(title, takenImage, address, location)
        submitPlace(data)
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Title
                </Text>

                <TextInput
                    value={title}
                    onChangeText={setTile}
                    style={styles.input}
                    placeholder="Enter Place Name"
                />

                <View style={styles.imagePicker}>
                    <ImagePicker takenImage={takenImage} setTakenImage={setTakenImage}/>
                </View>

                <View style={styles.locationPicker}>
                    <LocationPicker location={location} setLocation={setLocation}/>
                </View>

                <View style={styles.save}>
                    <OutlineButton icon='save' onPress={submitData}>
                        Save to your place
                    </OutlineButton>
                </View>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        flex: 1,
    },
    title: {
        color: colors.primary50,
        marginBottom: 5
    },
    input: {
        backgroundColor: colors.primary50,
        borderRadius: 3,
        paddingHorizontal: 5,
        minHeight: 30
    },
    imagePicker: {
        marginVertical: 10
    },
    locationPicker: {
        paddingVertical: 5
    },
    save: {
        marginTop: 20
    }

})