import Constants from "expo-constants";
import { StyleSheet } from "react-native";

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;

export const styles = StyleSheet.create({
    mt5: {
      marginTop: 30
    },
    row: {
        flexDirection: "row",
        justifyContent: "center"
    },
    otp: {
        marginRight: 10,
    },
    link: {
        color: colorPrimary,
        marginTop: 20,
        fontSize: 13
    }
 });