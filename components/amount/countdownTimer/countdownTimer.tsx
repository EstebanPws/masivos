import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './countdownTimer.styles';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { validateNumber } from '@/utils/validationForms';
import { getData, getNumberAccount } from '@/utils/storageUtils';
import instanceWallet from '@/services/instanceWallet';
import { useTab } from '@/components/auth/tabsContext/tabsContext';

const extra = Constants.expoConfig?.extra || {};
const {primaryBold, primaryRegular} = extra.text;
const {colorPrimary, colorSecondary} = extra;

interface CountdownTimerProps{
    onError?: (response: any) => void;
    onFinish: () => void;
    amount: string;
}

export default function CountdownTimer({onError, onFinish, amount}: CountdownTimerProps) {
  const {activeLoader, desactiveLoader} = useTab();
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [otp, setOtp] = useState('');

  const fetchCashout = async () => {
    activeLoader();
    const infoClient = await getData('infoClient');
    const account = await getNumberAccount();
    const body = {
      cuenta: account,
      no_doc: infoClient.numDoc,
      valor_tx: validateNumber(amount)
    }

    try {
      const response = await instanceWallet.post('getOtp', body);
      const data = response.data.message;
      const otp = data.split(' ');
      setOtp(otp[3]);
      desactiveLoader();
    } catch (error) {
      if(onError){
        const response = {
          message: 'Hubo un error al intentar generar el código.\n\nPor favor intentelo de nuevo en unos minutos.',
          type: 'error'
        }
        onError(response);
      }
      desactiveLoader();
      console.log(error);  
    }
    
  }
  
  useEffect(() => {
    const fetchOtp = async () => {
      await fetchCashout();
    }
    fetchOtp();

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onFinish();
          return 0;
        }
        return prevTime - 1;
      });
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
                <Text variant='headlineSmall' style={[primaryBold, styles.textCode]}>{otp}</Text>
            </LinearGradient>
        </View>
        <View style={styles.mv1}>
            <Text variant='labelLarge' style={[primaryRegular, styles.text]}>Su código para retiro vence en: {formatTime(timeLeft)}</Text>
        </View>
    </View>
  );
}
