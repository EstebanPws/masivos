import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '82%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    imageContainer:{
        position: 'relative'
    },
    text: {
        color: 'white',
        position: 'absolute',
        fontSize: Platform.OS === 'android'? 14 : 16
    },
    typeCardText:{
        right: 45,
        bottom: 200,
    },
    nameCardText:{
        left: 55,
        bottom: 58,
    },
    numberCardText:{
        left: 55,
        bottom: 150,
    },
    dateCardText:{
        left: 55,
        bottom: 100,
    },
    cvvCardText:{
        right: 150,
        bottom: 100,
    },
    titleDateCardText: {
        fontSize: Platform.OS === 'android' ? 8 : 10,
        left: 55,
        bottom: 115,
    },
    titleCvvCardText:{
        fontSize: Platform.OS === 'android' ? 8 : 10,
        right: Platform.OS === 'android' ? 158 : 154,
        bottom: 115,
    },
    image: {
        width: 400,
        height: 210,
        marginVertical: 30
    }, 
    containerScroll:{
        backgroundColor: 'white',
        borderRadius: 27,
        maxHeight: 280,
        paddingBottom: 20
    }
})

export default styles;;