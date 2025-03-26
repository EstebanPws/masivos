import Constants from "expo-constants";
import { StyleSheet } from "react-native";

const extra = Constants.expoConfig?.extra || {};
const {colorPrimary} = extra;

const styles = StyleSheet.create({
    btn: {
        borderRadius: 50,
        borderColor: colorPrimary,
        borderWidth: 2,
    },
    btnText: {
        color: colorPrimary
    }
})

export default styles;;