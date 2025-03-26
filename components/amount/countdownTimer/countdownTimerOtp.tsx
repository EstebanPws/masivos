import React, { useState, useEffect } from 'react';
import { View, AppState, AppStateStatus } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './countdownTimer.styles';
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra || {};
const { primaryBold, primaryRegular } = extra.text;
const { colorPrimary, colorSecondary} = extra;

interface CountdownTimerOtpProps {
  onFinish: () => void;
}

export default function CountdownTimerOtp({ onFinish }: CountdownTimerOtpProps) {
  const [timeLeft, setTimeLeft] = useState(90);
  const [appState, setAppState] = useState(AppState.currentState);
  const [timePausedAt, setTimePausedAt] = useState<number | null>(null);

  useEffect(() => {
    // Timer logic
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setTimeout(onFinish, 0);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        if (timePausedAt) {
          const timePaused = Math.floor((Date.now() - timePausedAt) / 1000);
          setTimeLeft((prevTime) => Math.max(prevTime - timePaused, 0));
        }
      } else if (nextAppState.match(/inactive|background/)) {
        setTimePausedAt(Date.now());
      }
      setAppState(nextAppState);
    });

    return () => {
      appStateListener.remove();
    };
  }, [appState, timePausedAt]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.mv1}>
      <Text variant="labelLarge" style={[primaryRegular, styles.text]}>
        Por favor, espera {formatTime(timeLeft)} antes de solicitar un nuevo código.
      </Text>
    </View>  
  );
}