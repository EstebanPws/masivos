import { StyleSheet } from "react-native";
import { MD2Colors } from "react-native-paper";

export const styles = StyleSheet.create({
    mt5: {
        width: '90%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerText: {
        paddingHorizontal: 20,
    },
    text: {
        textAlign: 'center'
    },
    textBtn: {
        fontSize: 18,
        flexWrap: 'wrap'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    btn: {
        width: 270,
        paddingVertical: 30,
        paddingHorizontal: 50,
        marginBottom: 10,
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 23,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5
    },
    box: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'flex-end',
    },
    overlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: `${MD2Colors.black}`,
        opacity: .2
    },
    gradient: {
        width: '100%',
        height: '30%',
        borderTopLeftRadius: 27,
        borderTopRightRadius: 27,
        padding: 30
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    btnAccount: {
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: `${MD2Colors.white}`,
        padding: 25,
        borderRadius: 27
    },
    btnClose: {
        top: '65%',
        left: '45%',
        right: '45%',
        position: 'absolute', 
        backgroundColor: `${MD2Colors.white}`,
        padding: 5,
        borderRadius: 50
    },
    textBtnAccount: {
        fontSize: 12,
        textAlign: 'center',
        color: `${MD2Colors.white}`
    },
    textBtnLine: {
        paddingBottom: 10,
        fontSize: 12,
        textAlign: 'center',
        color: `${MD2Colors.white}`
    },
    line: {
        borderBottomColor: `${MD2Colors.white}`,
        borderBottomWidth: 2,
        marginBottom: 20,
    },
 });