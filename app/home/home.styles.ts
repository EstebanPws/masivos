import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
    },
    main:{
        backgroundColor: 'white',
        borderBottomLeftRadius: 27,
        borderBottomRightRadius: 27,
        paddingBottom: 80,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5
    }, 
    row:{
        flexDirection: 'row',
        paddingTop: 60,
        paddingHorizontal: 10,
        justifyContent: 'space-around',
    },
    logo: {
        width: 150,
        marginTop: -40,
        marginLeft: 110
    },
    sideBar:{
        position: 'absolute',
        left: 10,
        top: 60,
    },
    imageContainer:{
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    image:{
        width: 280,
        marginTop: -290
    },
    mt5:{
        marginTop: -270,
        width: '80%'
    }
})