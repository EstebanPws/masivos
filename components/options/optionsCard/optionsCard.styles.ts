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
    text: {
        textAlign: 'center',
        flexWrap: 'wrap',
        width: '100%',
    }
});