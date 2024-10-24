import Constants from "expo-constants";
import { StyleSheet } from "react-native";

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;

export const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        width:'90%',
        top: 0,
        left: 20,
        right: 0,
        zIndex: 1000,
     },

     contentContainer:{
        paddingHorizontal: 16,
        flex: 1,
        justifyContent: 'center'
     },
    
    mt5: {
      marginTop: 10
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
        marginVertical: 10
    },
    title: {
        marginBottom: 5
    },
    mrn: {
        marginRight: -15
    },
    mrnPinEmpty: {
        marginRight: -25
    },
    gesture:{
        marginTop: 100,
        width: '100%', 
        height: '78%' ,
        justifyContent: 'space-between',
    }
 });