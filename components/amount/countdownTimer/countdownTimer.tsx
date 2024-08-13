import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './countdownTimer.styles';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';

const extra = Constants.expoConfig?.extra || {};
const {primaryBold, primaryRegular} = extra.text;
const {colorPrimary, colorSecondary} = extra;

interface CountdownTimerProps{
    amount: string;
}

export default function CountdownTimer({amount}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
        <View style={styles.mv1}>
            <Text variant='titleMedium' style={[primaryBold, styles.text]}>Valor a retirar</Text>
            <Text variant='titleLarge' style={[primaryRegular, styles.text]}>{amount} COP</Text>
        </View>
        <View  style={styles.mv1}>
            <LinearGradient
                colors={[colorPrimary, colorSecondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.caontainerCode}
            >
                <Text variant='titleMedium' style={[primaryBold, styles.textNameCode]}>Código de retiro</Text>
                <Text variant='headlineSmall' style={[primaryBold, styles.textCode]}>123456</Text>
            </LinearGradient>
        </View>
        <View style={styles.mv1}>
            <Text variant='labelLarge' style={[primaryRegular, styles.text]}>Su código para retiro vence en: {formatTime(timeLeft)}</Text>
        </View>
    </View>
  );
}
