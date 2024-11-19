import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      cardContainer: {
        position: 'relative',
        overflow: 'hidden'
      },
      card: {
        width: 400,
        height: 210,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      },
      image: {
        width: 400,
        height: 210,
        elevation: 5
      },
      glowContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'transparent',
      },
      glow: {
        width: '200%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
      },
})

export default styles;