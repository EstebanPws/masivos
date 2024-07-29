import { Platform, StyleSheet } from 'react-native';
import { MD2Colors } from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    color: MD2Colors.black,
    fontSize: 14,
    marginLeft: 5,
    marginBottom: 10
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  gradientContainer: {
    maxWidth: 100,
    minWidth: 50,
    padding: 10,
    borderRadius: 8,
  },
  greyContainer: {
    maxWidth: 100,
    minWidth: 50,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
  },
  paragraph: {
    fontSize: Platform.OS === 'android' ? 11: 13,
    color: MD2Colors.white,
  }
});
