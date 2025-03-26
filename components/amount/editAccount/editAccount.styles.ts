import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%'
    },
    mV5: {
        marginVertical: 10
    },
    mb5: {
        marginBottom: 10
    },
    text:{
        color: 'white',
        width: '100%'
    },
    accountContainer:{
        padding: 20,
        borderRadius: 27,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchable:{
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 5
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 370
    },
})

export default styles;