import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    mb5:{
        marginBottom: 20
    },
    mb5Form:{
        marginBottom: 20,
        width: Platform.OS === 'ios' ? 300 : '100%',
    },
    mV5:{
        marginTop: 10
    },
    view: {
        width: '95%'
    },
    viewSearch: {
        width: '70%'
    },
    pH5:{
        paddingHorizontal: 10
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
    centerInvoice: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200
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
    rowPackage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    containerBtnPackage: {
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    text: {
        textAlign: 'center',
        flexWrap: 'wrap',
        width: '100%',
        paddingTop: 20
    },
    textPackage: {
        textAlign: 'right',
        flexWrap: 'wrap',
        width: '85%',
        marginLeft: 5
    },
    back: {
        paddingTop: 20,
        marginLeft: 0
    }
})

export default styles;