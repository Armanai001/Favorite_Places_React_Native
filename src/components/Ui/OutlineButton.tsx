import {Pressable, StyleSheet, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {colors} from "../../constants/colors";
import {ReactNode} from "react";

export default function OutlineButton({icon, children, onPress}: {
    icon: any | string,
    children: ReactNode,
    onPress: () => void
}) {
    return (
        <Pressable android_ripple={{color: colors.primary500}} onPress={onPress} style={
            ({pressed}) => [styles.container, pressed && styles.pressedButton]
        }>
            <Ionicons name={icon} size={18} color={colors.primary500}/>
            <Text style={styles.title}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 5,
        padding: 3,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: colors.primary500,
        flex: 1,
        height: 40
    },
    pressedButton: {
        opacity: 0.7,
    },
    title: {
        color: colors.primary500
    }
})