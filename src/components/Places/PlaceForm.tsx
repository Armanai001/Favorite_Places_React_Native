import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {colors} from "../../constants/colors";
import ImagePicker from "../NativeFunctions/ImagePicker";

export default function PlaceForm() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Title
                </Text>
                <TextInput style={styles.input}/>
                <View style={styles.imagePicker}>
                    <ImagePicker/>
                </View>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        flex: 1
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
    }
})