import Constants from "expo-constants";
import { Dimensions, StyleSheet } from "react-native";

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container:{
      position: 'absolute',
      top: -700,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 3,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    blurView: {
      width: '100%',
      height: '120%',
       justifyContent: 'flex-end',
      alignItems: 'center'
    },
    modalContainer: {
      width: width * 0.8,
      padding: 30,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colorPrimary,
      alignItems: 'flex-end',
      marginBottom: 80
    },
    message: {
      fontSize: 16,
      textAlign: 'center',
      marginVertical: 20,
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    row:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    touch:{
        paddingVertical: 10
    },
    toggleButton: {
        width: '105%',
        padding: 10,
        borderRadius: 50,
        marginRight: -8
    },
    text: {
        color: 'white'
    }
})

export default styles;;
  