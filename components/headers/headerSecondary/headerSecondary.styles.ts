import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: [{ translateX: -125 }],
        backgroundColor: '#fff',
        width: 250,
        height: 150,
        zIndex: 2,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        alignItems: 'center',
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
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    back: {
        position: 'absolute', 
        top: 25,
        left: -55,
        padding: 50,
        zIndex: 2
    },
    backIos: {
        transform: [{ rotate: '-90deg' }],
    },
})

export default styles