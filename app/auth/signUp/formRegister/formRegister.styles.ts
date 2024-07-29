import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import { MD2Colors } from "react-native-paper";


const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;

export const styles  = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    text:{
      marginTop: 20,
      marginBottom: 10, 
      textAlign: 'center',
    },
    line:{
      borderBottomColor: `${colorPrimary}`,
      borderBottomWidth: 2,
    },
    ph2:{
      paddingHorizontal: 30
    },
    containerProgressBar:{
      position: 'relative',
      marginTop: 30,
      marginBottom: 20
    },
    stepsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
      marginTop: -3
    },
    step: {
      backgroundColor: colorPrimary,
      borderRadius: 50,
      width: 24,
      height: 24,
      top: -10
    },
    textStep:{
      textAlign: 'center',
      color: MD2Colors.white
    },
})