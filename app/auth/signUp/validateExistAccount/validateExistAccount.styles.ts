import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import { MD2Colors } from "react-native-paper";

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;

const styles = StyleSheet.create({
    mt5: {
        width: "100%",
        height: "80%",
    },
    headerContainer: {
        width:'90%',
        top: 0,
        left: 20,
        right: 0,
        zIndex: 1000,
     },
    containerText: { 
        paddingTop: 20,
        height: '100%',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
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
        justifyContent: 'space-around',
        marginTop: -150,
        marginBottom: 40
    },
    rowCheckbox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
    mb5:{
        marginBottom: 20
    },
    link: {
        color: colorPrimary,
        textAlign: 'center',
        fontSize: 16,
        textDecorationColor: colorPrimary,
        textDecorationLine: 'underline'
    },
    image:{
        maxWidth: 200,
        maxHeight: 100,
        marginHorizontal: 'auto'
    },
    ml5: {
        marginLeft: -18
    },
    mr5: {
        marginLeft: 18
    },
    bgIos: {
        height: 25,
        width: 25,
        left: 27,
        borderWidth: 2,
        borderColor: MD2Colors.grey500,
        position: 'absolute',
    }
 });

export default styles;