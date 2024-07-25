import Constants from "expo-constants";
import { StyleSheet } from "react-native";


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
})