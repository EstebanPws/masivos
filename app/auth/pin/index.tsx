import React, { useEffect, useRef, useState } from "react";
import { TextInput, View, Image, TouchableOpacity, Platform } from "react-native"
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import ViewFadeIn from "@/components/viewFadeIn";
import NumericKeyboard from "@/components/numericKeyboard/numericKeyboard";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import OtpInputs from "@/components/otp/otpInputs";
import Constants from "expo-constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";
import { useAuth } from "@/components/auth/context/authenticationContext";
import { styles } from "./pin.styles";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;

export default function Page() {
    const { authenticate } = useAuth();
    const inputRefs = useRef<TextInput[]>([]);
    const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '']);
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

    return (
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
        <View style={styles.row}>
            {otpValues.map((value, index) => (
                <OtpInputs
                    key={index}
                    style={index === 3 ? null : styles.otp}
                    editable={false}
                    value={value}
                />
            ))}
        </View>
        <View style={styles.row}> 
            <Link href={'/'} style={{...styles.link, ...primaryBold}}>¿Olvidaste tu PIN?</Link>
        </View>
        <GestureHandlerRootView>
            <NumericKeyboard onKeyPress={handleKeyPress} onDeletePress={handleDeletePress } onPress={handleAuthenticate} />
            <ButtonsPrimary
                label="Acceder a la billetera"
                style={styles.mt5}
                onPress={handleLogin}
            />
        </GestureHandlerRootView>
      </ViewFadeIn>
    );
}