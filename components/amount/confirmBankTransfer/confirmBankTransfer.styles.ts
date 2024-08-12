import { StyleSheet } from "react-native";
import { MD2Colors } from "react-native-paper";

export const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: MD2Colors.grey300,
        borderRadius: 18
    },
    container:{
        backgroundColor: MD2Colors.grey300,
        borderRadius: 18,
        marginVertical: 20
    },
    line:{
        borderBottomColor: MD2Colors.grey500,
        borderBottomWidth: 2
    }
});