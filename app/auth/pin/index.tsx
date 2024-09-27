import React, { useEffect, useRef, useState } from "react";
import { TextInput, View, Image, TouchableOpacity, Text } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import NumericKeyboard from "@/components/numericKeyboard/numericKeyboard";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import OtpInputs from "@/components/otp/otpInputs";
import Constants from "expo-constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "@/components/auth/context/authenticationContext";
import { styles } from "./pin.styles";
import HeaderGeneral from "@/components/headers/headerGeneral/headerGeneral";
import InfoModal from "@/components/modals/infoModal/infoModal";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;

export default function Page() {
    const { authenticate, authenticateWithoutFaceId } = useAuth();
    const inputRefs = useRef<TextInput[]>([]);
    const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '']);
    const [isSecure, setIsSecure] = useState(true);
    const router = useRouter();
    const { document } = useLocalSearchParams();
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');

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
        router.replace('/');
    }

    const handleAuthenticate = async () => {
        const otpIsEmpty = otpValues.some((val) => val === '');

        if (otpIsEmpty) {
            setMessage('Por favor ingrese su pin.');
            setShowError(true);
            return;
        }

        const otpConcatenated = otpValues.join('');

        await authenticate(document!.toString(), otpConcatenated);
    };

    const handleLogin = async () => {
        const otpIsEmpty = otpValues.some((val) => val === '');

        if (otpIsEmpty) {
            setMessage('Por favor ingrese su pin.');
            setShowError(true);
            return;
        }

        const otpConcatenated = otpValues.join('');

        await authenticateWithoutFaceId(document!.toString(), otpConcatenated);
    }

    const handleViewPin = () => {
        setIsSecure(!isSecure);
    }

    return (
      <ViewFadeIn isWidthFull>
        <HeaderGeneral onBack={handleBack}/>
        <GestureHandlerRootView style={styles.gesture}>
            <View style={styles.row}>
                {otpValues.map((value, index) => (
                    <OtpInputs
                        key={index}
                        style={index === 3 ? null : styles.otp}
                        editable={false}
                        value={value}
                        isSecure={isSecure}
                    />
                ))}
            </View>
            <View style={styles.rowPin}> 
                <TouchableOpacity style={styles.pReset}  onPress={() => router.push('/auth/pin/recoverPin/recoverPin')}>
                    <Text style={{...styles.link, ...primaryBold}}>
                        ¿Olvidaste tu PIN?
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.mAuto}>
                <NumericKeyboard onKeyPress={handleKeyPress} onDeletePress={handleDeletePress } onPress={handleAuthenticate}onView={handleViewPin}/>
                <ButtonsPrimary
                    label="Acceder a la billetera"
                    style={styles.mt5}
                    onPress={handleLogin}
                />
            </View>
        </GestureHandlerRootView>
        {showError && (
            <InfoModal
                isVisible={showError}
                type="error"
                message={message}
                onPress={() => setShowError(false)}
            />
        )}
      </ViewFadeIn>
    );
}