import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    back: {
        position: 'absolute', 
        top: 25,
        left: -55,
        padding: 50,
        zIndex: 2
    },
    backIos: {
        transform: [{ rotate: '-90deg' }]
    },
    row: {
        flexDirection: "row",
        justifyContent: "center"
    },
    logo: {
        marginTop: 30,
        width: 200
    },
})