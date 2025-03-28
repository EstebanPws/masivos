import { StyleSheet } from 'react-native';
import { MD3Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  contactItem: {
    marginBottom: 20,
    borderBottomColor: MD3Colors.neutral70,
    borderBottomWidth: 2,
    paddingBottom: 10
  },
  contactName: {
    color: 'white'
  },
  mb5: {
    marginBottom: 20
  },
  containerInfo: {
    padding: 20,
    borderRadius: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 230
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: 600
  },
  account:{
      paddingTop: 20,
      paddingHorizontal: 10,
      justifyContent: 'space-around',
  },
  subtitle: {
      color: MD3Colors.neutralVariant10, 
      marginTop: 20
  },
  scrollPadding: {
      paddingBottom: 30, 
      paddingHorizontal: 10
  },
  balance: {
    borderRadius: 27,
    padding: 10,
    width: '100%',
    marginVertical: 5
  },
  text:{
    color: 'white',
    textAlign: 'center'
  },
})

export default styles;
