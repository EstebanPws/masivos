import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    mb5:{
        marginBottom: 20
    },
    services:{
        backgroundColor: 'white',
        borderRadius: 27,
        width: '100%',
        maxHeight: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        paddingHorizontal: Platform.OS === 'android' ? 10 : 0
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 500
    },
    centerJ: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    containerBtn: {
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        marginBottom: 10
    },
    back: {
        paddingTop: 20,
        marginLeft: 0
    }
})