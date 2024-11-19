import { Platform, StyleSheet } from "react-native";
import { MD3Colors } from "react-native-paper";

const styles = StyleSheet.create({
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
        width: Platform.OS === 'ios' ? 70 : 60,
        height: Platform.OS === 'ios' ? 70 : 60,
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
        width: Platform.OS == 'ios' ? '100%' : '91%',
        marginLeft: Platform.OS === 'ios' ? 0 : 5,
    },
    textPackage: {
        textAlign: 'right',
        flexWrap: 'wrap',
        width: '85%',
        marginLeft: 5
    }
})

export default styles;;