import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerText: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', 
        height: '80%'
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10
    },
    textBtn: {
        fontSize: 14,
        textAlign: 'center',
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
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 23,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5
    },
 });

 export default styles;