import Constants from "expo-constants";
import {StyleSheet} from "react-native";

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;

export const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    containerImage: {
      position: 'relative',
      flex: 1,
    },
    image: {
      height: 500,
      paddingBottom: 50,
      borderBottomEndRadius: 30,
      borderBottomStartRadius: 30,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: [{ translateX: -125 }],
      backgroundColor: '#fff',
      width: 250,
      zIndex: 2,
      borderBottomEndRadius: 20,
      borderBottomStartRadius: 20,
      paddingTop: 30,
      alignItems: 'center',
    },
    logo: {
      width: 200
    },
    containerText: {
      position: 'absolute',
      bottom: '46%',
      left: 30,
      right: 30,
      zIndex: 2,
    },
    containerForm: {
      marginVertical: 30,
      paddingHorizontal: 40
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 30
    },
    textWhite: {
      color: '#fff'
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
    }
  });