import Constants from "expo-constants";
import {StyleSheet} from "react-native";

const extra = Constants.expoConfig?.extra || {};

const { colorPrimary } = extra;
const styles = StyleSheet.create({
    containerForm: {
      marginVertical: 30,
      paddingHorizontal: 40,
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 30
    },
    mb5:{
      marginBottom: 20
    },
    mV2:{
      marginVertical: 20
    },
    text: {
        textAlign: 'center'
    },
    textLeft: {
      textAlign: 'justify'
    },
    link: {
      color: colorPrimary,
      textAlign: 'center',
      fontSize: 16,
      textDecorationColor: colorPrimary,
      textDecorationLine: 'underline'
    },
    image:{
      maxWidth: 200,
      maxHeight: 100,
      margin: 'auto'
    }
})

export default styles;;