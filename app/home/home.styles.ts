import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
        width: 110,
        height: 110,
        marginTop: -20,
        marginLeft: 130
    },
    sideBar:{
        position: 'absolute',
        left: 10,
        top: 60,
    },
    options:{
        position: 'relative',
        zIndex: 1
    },
    imageContainer:{
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image:{
        width: 280,
        height: 200
    },
    mt5:{
        marginTop: -50,
        width: '80%'
    },
    containerScroll: {
        position: "relative", 
        marginTop: -70, 
        height: "40%"
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default styles;