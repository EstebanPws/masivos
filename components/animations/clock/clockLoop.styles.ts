import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: colorPrimary,
        borderWidth: 2,
        paddingBottom: 30
    },
    clockContainer: {
        marginVertical: 40,
        borderRadius: 100,
        borderColor: colorPrimary,
        borderWidth: 4,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', 
        overflow: 'hidden'
    },
    clockCenter: {
        position: 'absolute',
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: colorPrimary,
        zIndex: 1,
        top: 29,
        left: 28
    },
    clockHand: {
        position: 'absolute',
        width: 3,
        height: 30,
        backgroundColor: colorPrimary,
        top: 6,
        left: 30,
        zIndex: 0,
        borderRadius: 50,
    },
    clockHand1: {
        position: 'absolute',
        width: 3,
        height: 25,
        backgroundColor: colorPrimary,
        top: 5,
        left: 31,
        zIndex: 0,
        borderRadius: 50
    },
    messageText: {
        marginTop: 10,
        textAlign: 'center',
    },
    containerClock: {
        height: 65, 
        width: 65, 
        left: 0,  
        top: 0, 
        position: 'absolute', 
        overflow: 'hidden'
    }
});
