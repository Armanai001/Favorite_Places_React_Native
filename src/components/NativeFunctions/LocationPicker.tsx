import {StyleSheet, View} from "react-native";
import OutlineButton from "../Ui/OutlineButton";

export default function LocationPicker() {
    return (
        <View style={styles.container}>
            <OutlineButton icon="location" onPress={() => {
            }}>
                User Location
            </OutlineButton>

            <OutlineButton icon="map" onPress={() => {
            }}>
                Pick on Map
            </OutlineButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10
    }
})