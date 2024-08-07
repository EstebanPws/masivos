import { Platform, StyleSheet } from 'react-native';
import { MD2Colors } from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingBottom: Platform.OS === 'android' ? 10 : 20
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 50,
    marginTop: 0
  },
  tabActive: {
    backgroundColor: MD2Colors.grey200,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 50,
    marginTop: -20,
    width: 60,
    height: 60,
  },
  gradientContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  gradient: {
    borderRadius: 50,
    padding: 10
  },
  tabText: {
    fontSize: 16,
  },
  activeIndicator: {
    marginTop: 5,
    width: '100%',
    height: 4,
    backgroundColor: 'blue',
    borderRadius: 2,
  },
});
