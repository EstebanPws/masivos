import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    containerHeader: {
        marginHorizontal: Platform.OS === 'android' ? 30 : 40
    },
    container: {
        flex: 1,
        marginHorizontal: 0,
    },
});