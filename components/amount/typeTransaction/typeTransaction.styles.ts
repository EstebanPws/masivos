import { StyleSheet } from "react-native";
import { MD2Colors } from "react-native-paper";

const styles = StyleSheet.create({
    touchable: {
        padding: 15,
        borderRadius: 15,
        backgroundColor: 'white',
        marginBottom: 20
    },
    containerInfo: {
        padding: 15,
        borderRadius: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        paddingHorizontal: 10
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
    text: {
        width: '50%',
    },
    textCenter: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'capitalize'
    }
})

export default styles;;