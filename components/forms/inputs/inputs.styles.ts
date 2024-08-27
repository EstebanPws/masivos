import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;
const { primaryRegular } = extra.text;

export const styles = StyleSheet.create({
    inputCustom: {
        backgroundColor: '#F5F5F5',
        fontSize: 14,
        fontFamily: primaryRegular,
        borderRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    label: {
        marginBottom: 5,
        marginRight: 5,
        marginLeft: 5
    },
    labelActive: {
        color: `${colorPrimary}`,
        marginBottom: 5,
        marginRight: 5,
        marginLeft: 5
    },
    outlined:{
        borderColor: 'transparent', 
        borderWidth: 0, 
        borderRadius: 50
    }
});