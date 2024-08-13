import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        borderRadius: 27,
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: '90%',
        height: 180,
        marginHorizontal: 20
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10
    },
    touchable: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    }
});
