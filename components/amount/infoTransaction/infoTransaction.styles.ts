import { StyleSheet } from "react-native";
import { MD2Colors } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        backgroundColor: 'white',
        margin: 20,
        height: 580,
        overflow: 'hidden',
    },
    touchable: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        height: 580,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerInfo: {
        padding: 15,
        borderRadius: 15
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 20
    },
    success: {
        backgroundColor: MD2Colors.lightGreen500,
        borderRadius: 50,
        padding: 5,
        marginTop: 2,
        width: 100
    },
    error: {
        backgroundColor: MD2Colors.red700,
        borderRadius: 50,
        padding: 5,
        marginTop: 2,
        width: 100
    },
    textCenter: {
        color: 'white',
        textAlign: 'right'
    }
})

export default styles;;