import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error saving data:', e);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error retrieving data:', e);
  }
};

export const setSessionToken = async (token) => {
  try {
    await AsyncStorage.setItem('session_token', token);
  } catch (e) {
    console.error('Error saving token:', e);
  }
};

export const getSessionToken = async () => {
  try {
    const token = await AsyncStorage.getItem('session_token');
    return token !== null ? token : null;
  } catch (e) {
    console.error('Error retrieving token:', e);
  }
};

export const setNumberAccount = async (numberAccount) => {
  try {
    await AsyncStorage.setItem('number_account', String(numberAccount));
  } catch (e) {
    console.error('Error saving numberAccount:', e);
  }
};

export const getNumberAccount = async () => {
  try {
    const numberAccount = await AsyncStorage.getItem('number_account');
    return numberAccount !== null ? numberAccount : null;
  } catch (e) {
    console.error('Error retrieving numberAccount:', e);
  }
};