import { StyleSheet } from "react-native";
import { MD2Colors } from "react-native-paper";

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 18
    },
    container:{
        borderRadius: 18,
        width: '100%',
        marginBottom: 10
    },
    line:{
        borderBottomColor: MD2Colors.grey500,
        borderBottomWidth: 2
    },
    text: {
        flexShrink: 1,
        maxWidth: '70%',
        textAlign: 'right'
    },
    image:{
        width: 150,
        height: 100,
        margin: 'auto',
        padding: 20
    },
    mb5: {
        marginBottom: 20,
    },
})

export default styles;