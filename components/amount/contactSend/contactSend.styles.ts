import { StyleSheet } from "react-native"
import { MD3Colors } from "react-native-paper";

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
    }
});
