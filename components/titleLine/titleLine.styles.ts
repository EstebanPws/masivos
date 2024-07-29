import { StyleSheet } from 'react-native';
import { MD2Colors } from 'react-native-paper';
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    color: MD2Colors.black,
    fontSize: 14,
    marginLeft: 5,
    marginBottom: 10,
    textAlign: 'center'
  },
  line:{
    borderWidth: 1,
    borderColor: colorPrimary,
    marginBottom: 20
  }
});
