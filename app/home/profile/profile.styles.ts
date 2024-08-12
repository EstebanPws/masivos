import { StyleSheet } from "react-native";
import { MD3Colors } from "react-native-paper";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 80
    },
    header:{
        paddingTop: 12,
        borderBottomLeftRadius: 27,
        borderBottomRightRadius: 27
    },
    account:{
        padding: 8,
        marginTop: 15,
        borderRadius: 50,
        width: '80%'
    },
    id: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 50,
        backgroundColor: MD3Colors.neutral30
    },
    text: {
        color: 'white',
        fontSize: 16,
         textAlign: 'center'
    },
    mt1:{
        marginTop: 15
    },
    center:{
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: -50,
        marginHorizontal: 30,
        height:'60%',
        padding: 20
    },
    mb5:{
        marginBottom: 20
    }
})