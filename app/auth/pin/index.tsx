import React, { useEffect, useRef, useState } from "react";
import { TextInput, View, Image, TouchableOpacity, Platform } from "react-native"
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import NumericKeyboard from "@/components/numericKeyboard/numericKeyboard";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import OtpInputs from "@/components/otp/otpInputs";
import Constants from "expo-constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";
import { useAuth } from "@/components/auth/context/authenticationContext";
import { styles } from "./pin.styles";
import HeaderGeneral from "@/components/headers/headerGeneral/headerGeneral";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;

export default function Page() {
    const { authenticate } = useAuth();
    const inputRefs = useRef<TextInput[]>([]);
    const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '']);
    const [isSecure, setIsSecure] = useState(true);
    const router = useRouter();
    const { document } = useLocalSearchParams();

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
        router.back();
    }

    const handleAuthenticate = async () => {
        const otpIsEmpty = otpValues.some((val) => val === '');

        if (otpIsEmpty) {
            alert('Por favor ingresa el pin.');
            return;
        }

        const otpConcatenated = otpValues.join('');

        await authenticate(document!.toString(), otpConcatenated);
    };

    const handleLogin = () => {
       router.push('/');
    }

    const handleViewPin = () => {
        setIsSecure(!isSecure);
    }

    return (
      <ViewFadeIn>
        <HeaderGeneral onBack={handleBack}/>
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
        <View style={styles.row}> 
            <Link href={'/'} style={{...styles.link, ...primaryBold}}>¿Olvidaste tu PIN?</Link>
        </View>
        <GestureHandlerRootView>
            <NumericKeyboard onKeyPress={handleKeyPress} onDeletePress={handleDeletePress } onPress={handleAuthenticate}onView={handleViewPin}/>
            <ButtonsPrimary
                label="Acceder a la billetera"
                style={styles.mt5}
                onPress={handleLogin}
            />
        </GestureHandlerRootView>
      </ViewFadeIn>
    );
}