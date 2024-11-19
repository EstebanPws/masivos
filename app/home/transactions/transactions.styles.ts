import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 27,
        height: '80%',
        marginHorizontal: 20,
        marginVertical: 20
    },
    image:{
        width: 150,
        height: 100,
        margin: 'auto',
        padding: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    noResults: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    filter: {
        padding: 10,
        borderRadius: 27,
        backgroundColor: 'white',
        marginBottom: 20
    },
    mb5: {
        marginTop: 20,
        marginBottom: 10
    },
    text: {
        textAlign: 'center'
    }
})

export default styles;;