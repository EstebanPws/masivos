import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  toggleButton: {
    padding: 10,
    borderRadius: 50,
    marginBottom: 20,
  },
  toggleButtonClose: {
    padding: 10,
    borderRadius: 50,
    marginBottom: 20
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 16,
  },
  slideBar: {
    position: 'absolute',
    top: -70,
    right: 0,
    left:  -10,
    width: 300,
    height: 800,
    backgroundColor: 'lightgrey',
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 1000,
    overflow: 'hidden', 
  },
  slideBarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rowOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12
  }
})

export default styles;;
