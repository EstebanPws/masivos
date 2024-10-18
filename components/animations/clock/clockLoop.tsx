import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { styles } from './clockLoop.styles';
import { Text } from 'react-native-paper';
import Modal from 'react-native-modal';
import Constants from 'expo-constants';

interface ClockAnimationProps {
  visible: boolean;
}

const extra = Constants.expoConfig?.extra || {};
const { primaryBold, primaryRegular } = extra.text;

export default function ClockAnimation({ visible }: ClockAnimationProps) {
  return (
    <Modal isVisible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <Text variant='titleLarge' style={[styles.messageText, primaryBold]}>
            Validando la información
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
            Por favor espere un momento, estamos validando el estado de su operación
          </Text>
        </View>
      </View>
    </Modal>
  );
}