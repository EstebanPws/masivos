import Constants from "expo-constants";
import { StyleSheet } from "react-native";

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        width:'100%',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
     },
     pReset:{
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10
     },
     contentContainer:{
        paddingHorizontal: 16,
        flex: 1,
     },
    mt5: {
      marginTop: 5
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        marginRight:-5,
    },
    rowPin: {
        flexDirection: "row",
        justifyContent: "center",
    },
    otp: {
        marginRight: 10,
    },
    link: {
        color: colorPrimary,
        fontSize: 13
    },
    mAuto: {
        paddingHorizontal: 20,
    },
    gesture:{
        alignSelf: 'center',
        width: '80%', 
        height: '80%' ,
        justifyContent: 'center',
        alignItems: 'center'
    }
 });

export default styles;