import { StyleSheet } from "react-native";
import { MD3Colors } from "react-native-paper";

export const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    containerBtn: {
        borderRadius: 50,
        backgroundColor: MD3Colors.neutral90,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        marginHorizontal: 20,
        marginBottom: 10
    },
    text: {
        textAlign: 'center'
    }
});