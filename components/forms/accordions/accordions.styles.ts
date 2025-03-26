import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10,
    },
    header: {
        borderRadius: 8,
        padding: 10,
        marginTop: 20
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        color: '#fff',
    },
    content: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 8,
        padding: 10,
        
    },
    item: {
        paddingVertical: 5,
        fontSize: 16,
    },
})

export default styles