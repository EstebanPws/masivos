import Constants from "expo-constants";
import { StyleSheet } from "react-native";

const extra = Constants.expoConfig?.extra || {};
const {colorPrimary} = extra;

export const styles = StyleSheet.create({
    info: {
        flex: 1,
        justifyContent: 'center',
        maxHeight: '80%',
        overflow: 'hidden', 
    },  
    container: {
        backgroundColor: 'white',
        borderRadius: 15,
        marginHorizontal: 30,
        padding: 20,
        marginTop: 15,
        flexGrow: 1,
        overflow: 'hidden', 
    },
    center: {
        justifyContent: 'center',
        flexGrow: 1,
    },
    mb5: {
        marginBottom: 20,
    },
    link: {
        color: colorPrimary,
        textDecorationColor: colorPrimary,
        textDecorationLine: 'underline',
        marginTop: 5
    },
    image:{
        width: 150,
        height: 100,
        margin: 'auto',
        padding: 20
    },
    mt1:{
        marginTop: 5
    }
});
