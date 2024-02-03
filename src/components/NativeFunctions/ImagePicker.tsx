import {Alert, Image, StyleSheet, View} from "react-native";
import {launchCameraAsync, PermissionStatus, useCameraPermissions} from "expo-image-picker";
import {useState} from "react";
import OutlineButton from "../Ui/OutlineButton";

export default function ImagePicker() {

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [takenImage, setTakenImage] = useState('')

    async function verifyPermissions() {
        if (!cameraPermissionInformation) {
            return false;
        } else if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        } else if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Permission Not Granted', 'Give your camera permission to take photos.')
            return false;
        } else return true;
    }

    async function addImage() {

        // Getting permission for ios
        const hasPermission = await verifyPermissions()

        if (!hasPermission) return;

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        })
        image.assets && setTakenImage(image.assets[0].uri)
    }

    return <View>
        <View>
            {
                takenImage !== "" && <Image style={styles.image} source={{uri: takenImage}}/>
            }
        </View>
        <OutlineButton icon='camera' onPress={addImage}>
            {takenImage === "" ? "Add Image" : "Add another Image"}
        </OutlineButton>
    </View>
}

const styles = StyleSheet.create({

    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 5,
    }
})