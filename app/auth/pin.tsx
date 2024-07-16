import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View, Image, TouchableOpacity, TouchableHighlight, Platform } from "react-native"
import { Link, useRouter } from "expo-router";
import ViewFadeIn from "@/components/viewFadeIn";
import NumericKeyboard from "@/components/numericKeyboard/numericKeyboard";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import OtpInputs from "@/components/otp/otpInputs";
import Constants from "expo-constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;
const { primaryBold } = extra.text;

export default function Page() {
    const inputRefs = useRef<TextInput[]>([]);
    const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '']);
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

    const handleLogin = () => {
        router.push('/');
    }

    const handleBack = () => {
        router.back();
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
            <Image source={require('../../assets/images/general/logo.webp')} resizeMode="contain" style={styles.logo} />
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
            <NumericKeyboard onKeyPress={handleKeyPress} onDeletePress={handleDeletePress } onPress={() => console.log('faceId')} />
            <ButtonsPrimary
                label="Acceder a la billetera"
                style={styles.mt5}
                onPress={handleLogin}
            />
        </GestureHandlerRootView>
      </ViewFadeIn>
    );
}

const styles = StyleSheet.create({
    mt5: {
      marginTop: 30
    },
    row: {
        flexDirection: "row",
        justifyContent: "center"
    },
    otp: {
        marginRight: 10,
    },
    logo: {
        marginTop: 30,
        width: 200
    },
    link: {
        color: colorPrimary,
        marginTop: 20,
        fontSize: 13
    },
    back: {
        position: 'absolute', 
        top: 25,
        left: -55,
        padding: 50,
        zIndex: 2
    },
    backIos: {
        transform: [{ rotate: '-90deg' }]
    }
 });