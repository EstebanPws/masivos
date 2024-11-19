import Constants from "expo-constants";
import { Platform, StyleSheet } from "react-native";

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary, colorSecondaryDark } = extra;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: Platform.OS === 'android' ? 28 : 25,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 50,
        backgroundColor: colorSecondaryDark
    },
    buttonIcon: {
        paddingVertical: 25,
        paddingHorizontal: 10,
        marginRight: 15,
        marginLeft: -85,
        borderRadius: 10,
    },
    buttonView: {
        paddingVertical: 25,
        paddingHorizontal: 10,
        marginRight: 20,
        marginLeft: -72,
        borderRadius: 10,
    },
    buttonDelete: {
        paddingVertical: 25,
        paddingHorizontal: 10,
        marginRight: -70,
        marginLeft: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 30,
    },
    icon1: {
        width: 50,
        height: 50
    },
    icon: {
        width: 24,
        height: 24
    },
    faceIcon: {
        borderWidth: 2,
        borderColor: colorPrimary,
        padding: 5,
        borderRadius: 5,
        marginRight: 5
    },
    containerFeceId: {
        marginTop: 20
    }
})

export default styles;;