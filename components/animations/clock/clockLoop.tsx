import React from 'react';
import { View } from 'react-native';
import { AnimatePresence, MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import styles from './clockLoop.styles';
import { Text } from 'react-native-paper';
import Constants from 'expo-constants';
import { BlurView } from 'expo-blur';

interface ClockAnimationProps {
  visible: boolean;
}

const extra = Constants.expoConfig?.extra || {};
const { primaryBold, primaryRegular } = extra.text;

export default function ClockAnimation({ visible }: ClockAnimationProps) {
  return (
    <AnimatePresence>
      {visible && (
          <BlurView intensity={80} tint="light" style={[styles.blurView]}>
              <MotiView
                  from={{ opacity: 0, translateY: -50 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: -50 }}
                  transition={{ type: 'timing', duration: 300 }}
                  style={[styles.modalContainer]}
              >
                <View style={styles.contentContainer}>
                    <Text variant='titleLarge' style={[styles.messageText, primaryBold]}>
                      Procesando información
                    </Text>
                    <View style={styles.clockContainer}>
                      <View style={styles.clockCenter} />
                      <MotiView 
                          from={{ rotate: '0deg' }}
                          animate={{ rotate: '360deg' }}
                          transition={{
                              loop: true,
                              repeatReverse: false,
                              type: 'timing',
                              duration: 60000,
                              easing: Easing.linear,
                          }}
                          style={styles.containerClock}
                      >
                          <MotiView
                        
                          style={styles.clockHand}
                          />
                      </MotiView>
                      <View style={styles.clockHand1} />
                    </View>
                    <Text style={[styles.messageText, primaryRegular]}>
                      Por favor espera, estamos validando tu información.
                    </Text>
                  </View>
              </MotiView>
          </BlurView>
      )}
    </AnimatePresence>
  );
}