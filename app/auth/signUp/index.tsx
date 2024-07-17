import React, { useEffect, useRef, useState } from "react";
import { TextInput, View, Image, TouchableOpacity, Platform } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";
import ViewFadeIn from "@/components/viewFadeIn";
import NumericKeyboard from "@/components/numericKeyboard/numericKeyboard";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import OtpInputs from "@/components/otp/otpInputs";
import Constants from "expo-constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";
import { styles } from "./signUp.styles";
import InfoModal from "@/components/modals/infoModal/infoModal";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold, primaryRegular } = extra.text;

export default function Page() {
    const inputRefs = useRef<TextInput[]>([]);
    const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '']);
    const [pinEmpty, setPinEmpty] = useState(false);
    const [isSecure, setIsSecure] = useState(true);
    const [step, setStep] = useState(0);
    const [showErrorPin, setShowErrorPin] = useState(false);
    const [firstPin, setFirstPin] = useState('');
    const [validateAfterSettingPin, setValidateAfterSettingPin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []); 

    const handleKeyPress = (value: string) => {
        const newOtpValues = [...otpValues];
        const nextIndex = newOtpValues.findIndex((val) => val === '');
        if (nextIndex !== -1) {
            newOtpValues[nextIndex] = value;
            setOtpValues(newOtpValues);
        }
    };

    const handleDeletePress = () => {
        const newOtpValues = [...otpValues];
        for (let i = newOtpValues.length - 1; i >= 0; i--) {
            if (newOtpValues[i] !== '') {
                newOtpValues[i] = '';
                setOtpValues(newOtpValues);
                break;
            }
        }
    };

    const handleBack = () => {
        if(step === 1) {
          setStep(0);
        } else {
          router.back();
        }
    }

    const handleNext = () => {
      if (step === 0) {
        const otpIsEmpty = otpValues.some((val) => val === '');
        setPinEmpty(otpIsEmpty);
        if (otpIsEmpty) {
          return;
        }
  
        const oldPin = otpValues.join('');
        setFirstPin(oldPin);
        setOtpValues(['', '', '', '']);
        setStep(1);
        setValidateAfterSettingPin(false);
      } else if (step === 1) {
        const otpIsEmpty = otpValues.some((val) => val === '');
        setPinEmpty(otpIsEmpty);
        if (otpIsEmpty) {
          return;
        }
        setValidateAfterSettingPin(true);
      }
    };

    useEffect(() => {
      if (validateAfterSettingPin) {
        if (firstPin === otpValues.join('')) {
          router.push('/');
        } else {
          setShowErrorPin(true);
        }
        setValidateAfterSettingPin(false);
      }
    }, [firstPin, validateAfterSettingPin]); 

    const handleViewPin = () => {
      setIsSecure(!isSecure);
    }

    return (
      <>
        <ViewFadeIn>
          <TouchableOpacity onPress={handleBack} style={[styles.back, Platform.OS === 'android' ? styles.back : styles.backIos]}>
              <Icon 
                  source={Platform.OS === 'android' ? 'arrow-left' : 'apple-keyboard-control'}
                  size={25}
              />
          </TouchableOpacity>
          <View style={styles.row}>
              <Image source={require('../../../assets/images/general/logo.webp')} resizeMode="contain" style={styles.logo} />
          </View>
          <View style={styles.mt5}>
            <View style={styles.containerText}>
              <Text variant="titleLarge" style={{...primaryBold, ...styles.title}}>Configurar un nuevo PIN</Text>
              <Text variant="titleMedium" style={{...primaryRegular}}>{step === 0 ? 'Selecciona un código de 4 dígitos' : 'Confirmar nuevo PIN'}</Text>
            </View>
            <View style={[styles.row, (pinEmpty ? styles.mrn : null)]}>
                {otpValues.map((value, index) => (
                    <OtpInputs
                        key={index}
                        style={index === 3 ? (pinEmpty ? styles.otpError : null) : (pinEmpty ? styles.otpError : styles.otp)}
                        editable={false}
                        isSecure={isSecure}
                        value={value}
                    />
                ))}
            </View>
            <GestureHandlerRootView>
                <NumericKeyboard onKeyPress={handleKeyPress} onDeletePress={handleDeletePress} onView={handleViewPin}/>
                <ButtonsPrimary
                    label="Siguiente"
                    style={styles.mt5}
                    onPress={handleNext}
                />
            </GestureHandlerRootView>
          </View>
        </ViewFadeIn>
        {showErrorPin && (
          <InfoModal
              isVisible={showErrorPin}
              type="info"
              message={`Los datos ingresados no coinciden. ${'\n\n'} Por favor verifique los datos e intentelo nuevamente.`}
              onPress={() => setShowErrorPin(false)}
          />
        )}
      </>
    );
}