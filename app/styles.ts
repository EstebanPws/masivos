import Constants from "expo-constants";
import {StyleSheet} from "react-native";

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    containerImage: {
      flex: 1,
      width: '100%',   
      height: '100%',
      position: 'relative',
      zIndex: 1, 
    },
    containerImage1: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      position: 'absolute',
      width: '100%',
      top: 0,
      height: '100%',
      borderBottomStartRadius: 30, 
    },
    
    containerText: {
      position: 'relative',
      marginBottom: 10,
      paddingHorizontal: 5,
      zIndex: 2,
    },
    containerForm: {
      position: 'absolute',
      bottom: -30,
      left: 0,
      right: 0,
      padding: 20, 
      borderRadius: 20,
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      marginVertical: 20, 
      paddingHorizontal: 20, 

    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    icon: {
      borderWidth: 2,
      borderColor: colorPrimary,
      padding: 5,
      borderRadius: 5,
      marginRight: 5
    },
    mt5: {
      marginTop: 30
    },
    mt3: {
      marginTop: 10
    },
    faceId: {
      marginTop: -10, 
      paddingLeft: 0, 
      marginLeft: 0
    },
  });

  export default styles;