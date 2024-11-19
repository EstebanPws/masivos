import Constants from "expo-constants";
import { StyleSheet } from "react-native";

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1.5,
    borderColor: '#949494',
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  inputText: {
    color: '#000',
    fontSize: 14
  },
  label: {
    color: '#000',
    fontSize: 14,
    marginLeft: 5,
    marginBottom: 5
  },
  searchInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 10,
  },
  item: {
    padding: 10,
  },
  itemText: {
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
  },
  containerIcon:{
    right: 5,
    top: 7,
    position: 'absolute',
    padding: 5,
    borderRadius: 50
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    margin: 5,
  },
  dateTimePicker: {
    width: 320,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

export default styles;
  