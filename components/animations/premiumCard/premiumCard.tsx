import React from "react";
import { View, Image } from "react-native";
import { MotiView } from "moti";
import styles from "./premiumCard.styles";

export default function PremiumCard() {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <MotiView style={styles.card}>
          <Image
            source={require('@/assets/images/general/visa.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </MotiView>
        <MotiView
          style={styles.glowContainer}
          from={{
            transform: [{ translateX: -1000}],
            opacity: 0.5
          }}
          animate={{
            transform: [{ translateX: 2000 }],
            opacity: 0.5
          }}
          transition={{
            duration: 5000,
            type: "timing",
            repeat: Infinity,
            repeatReverse: false,
          }}
        >
          <Image
            source={require('@/assets/images/general/brillo.png')}
            style={styles.glow}
          />
        </MotiView>
      </View>
    </View>
  );
}