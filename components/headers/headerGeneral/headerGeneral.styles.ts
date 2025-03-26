import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    back: {
        position: 'absolute', 
        top: 25,
        left: -25,
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
    headerRelative:{
        backgroundColor: '#fff',
        width: 250,
        height: 150,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        alignItems: 'center',
    },
    logo: {
        marginTop: -40,
        width: 130
    },
})

export default styles