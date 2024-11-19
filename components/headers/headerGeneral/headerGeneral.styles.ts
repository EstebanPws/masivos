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
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        paddingTop: 30,
        alignItems: 'center',
    },
    logo: {
        width: 200
    },
})

export default styles