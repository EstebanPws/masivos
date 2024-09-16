import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  buttonClose: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  toggleButtonClose: {
    padding: 10,
    borderRadius: 50,
    marginBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 16,
  },
  slideBar: {
    position: 'absolute',
    top: -60,
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
    marginTop: -50,
    fontSize: 18,
    fontWeight: 'bold',
  },
  rowOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30
  }
});
