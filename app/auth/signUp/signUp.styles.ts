import Constants from "expo-constants";
import { StyleSheet } from "react-native";

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;

export const styles = StyleSheet.create({
    mt5: {
      marginTop: 20
    },
    row: {
        flexDirection: "row",
        justifyContent: "center"
    },
    otp: {
        marginRight: 10
    },
    otpError: {
        borderWidth: 1,
        borderColor: 'red',
        marginRight: 10
    },
    link: {
        color: colorPrimary,
        marginTop: 20,
        fontSize: 13
    },
    containerText: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    title: {
        marginBottom: 5
    },
    mrn: {
        marginRight: -10
    }
 });