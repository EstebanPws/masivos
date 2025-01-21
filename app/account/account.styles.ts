import { StyleSheet } from "react-native";
import { MD3Colors } from "react-native-paper";

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        paddingHorizontal: 10
    },
    row:{
        flexDirection: 'row',
        paddingTop: 60,
        paddingHorizontal: 10,
        justifyContent: 'space-around',
    },
    account:{
        paddingTop: 20,
        paddingHorizontal: 10,
        justifyContent: 'space-around',
    },
    logo: {
        width: 100,
        marginTop: -100
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
    subtitle: {
        color: MD3Colors.neutralVariant10, 
        marginTop: 20
    },
    scrollPadding: {
        paddingBottom: 30, 
        paddingHorizontal: 10
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default styles;