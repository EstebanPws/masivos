import Constants from "expo-constants";
import { Dimensions, StyleSheet } from "react-native";

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    blurView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3
    },
    modalContainer: {
        width: width * 0.8,
        padding: 30,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colorPrimary,
        alignItems: 'center',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    mt5: {
        marginTop: 30
    },
    row: {
        flexDirection: "row",
        justifyContent: "center"
    },
    center: {
        justifyContent: "center"
    },
    rowButtons: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 30,
        width: '100%'
    },
    otp: {
        marginRight: 10,
    },
    link: {
        color: colorPrimary,
        marginTop: 20,
        fontSize: 13
    },
    ml5: {
        marginLeft: 15
    },
    textCenter: {
        textAlign: 'center'
    }
})

export default styles;;