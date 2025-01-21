import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './loader.styles';
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary, colorSecondary } = extra;

const Loader = () => {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#ffffff", "#ffffff"]}
          style={styles.gradient}
        >
            <MotiView
                from={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'timing', duration: 800, loop: true }}
                style={styles.imageContainer}
                >
                <Image
                    source={require('@/assets/images/general/icon.webp')}
                    style={styles.image}
                />
            </MotiView>
        </LinearGradient>
      </View>
    );
};

export default Loader;
  