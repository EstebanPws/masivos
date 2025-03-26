import React, { useEffect, useRef, useState } from "react";
import { BlurView } from "expo-blur";
import { AnimatePresence, MotiView, View } from "moti";
import OtpInputs from "@/components/otp/otpInputs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NumericKeyboard from "@/components/numericKeyboard/numericKeyboard";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { TextInput, TouchableOpacity } from "react-native";
import styles from "./otpExistProcessModal.styles";
import Constants from "expo-constants";
import ButtonsSecondary from "@/components/forms/buttons/buttonSecondary/button";
import { Text } from "react-native-paper";
import instanceWallet from "@/services/instanceWallet";
import { getData } from "@/utils/storageUtils";
import { useAuth } from "@/components/auth/context/authenticationContext";
import CountdownTimerOtp from "@/components/amount/countdownTimer/countdownTimerOtp";

const extra = Constants.expoConfig?.extra || {};
const { idApp } = extra;
const { primaryBold, primaryRegular } = extra.text;

interface OtpExistProcessModalProps {
    tipoDoc: string;
    numeroDoc: string;
    correo: string;
    celular: string;
    typePerson: number;
    onClose: (message: string, type: "info" | "success" | "error") => void;
    onView: () => void;
    onFinish: () => void;
}

export default function OtpExistProcessModal({ typePerson, onClose, onView, onFinish, tipoDoc,numeroDoc,correo,celular }: OtpExistProcessModalProps) {
    const {activeLoader, desactiveLoader} = useAuth();
    const [step, setStep] = useState(0);
    const [visible, setVisible] = useState(true);
    const inputRefs = useRef<TextInput[]>([]);
    const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
    const [isSecure, setIsSecure] = useState(false);
    const [disabledBtn, setDisbaledBtn] = useState(true);
    const [timerKey, setTimerKey] = useState(0);

    useEffect(() => {
        inputRefs.current[0]?.focus();
        fetchRequestCode(0);
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

    const handleViewPin = () => {
        setIsSecure(!isSecure);
    }

    const fetchRequestCode = async (type: number) => {
        activeLoader();
        let message;
        let responseType: "info" | "success" | "error" = "info";

        const body = { 
            tipo_doc: tipoDoc,
            no_doc: numeroDoc,
            correo: "",
            numero_celular: "",
            idApp: idApp
        }
        
        if (type === 0) { 
            if (correo === '') {
                message = 'El correo electrónico no es valido.';
                responseType = "error";
            } else {
                body.correo = correo;
            }
        } else {
            const tel = celular;
            
            if (tel === '') {
                message = 'El número de celular no es valido.';
                responseType = "error";
            } else {
                body.numero_celular = celular;
            }
        }

        try {
            console.log(body);
            
            const response = await instanceWallet.post('preRegistro', body);
            console.log(response.data);
            
            setOtpValues(['', '', '', '', '', '']);
        } catch (error) {
            message = `Hubo un error al intentar enviar el código de verificación por ${type === 0 ? "correo electrónico" : 'sms'} , por favor inténtalo de nuevo en unos minutos.`;
            responseType = "error";
        }
        desactiveLoader();
        return { message, responseType };
    }

    const fetchValidateCode = async (type: number) => {
        activeLoader();
        let message;
        let responseType: "info" | "success" | "error" = "info";
        const code = Number(otpValues.join(''));

        const bodyValidate = {
            tipo_doc: tipoDoc,
            no_doc: numeroDoc,
            codeVer: code,
            type: type
        }

        try {
            const codeEmailValidateResponse = await instanceWallet.post('VerficacionOTP', bodyValidate);
            message = codeEmailValidateResponse.data.message;
            responseType = "success";
        } catch (error) {               
            message = "Hubo un error al intentar verificar el código";
            responseType =  "error";
        }

        desactiveLoader();
        return { message, responseType };
    }

    const handleNext = async () => {
        let response;
        const next = step + 1;
        if (next === 1) {
            response = await fetchValidateCode(0);  
            if (response!.responseType !== 'error') {
                response = await fetchRequestCode(1);
            }
           
        }

        if (next === 2) {
            response = await fetchValidateCode(1);  
            if (response!.responseType !== 'error') {
                onFinish();
            }          
        }

        if (response!.message) {
            onClose(response!.message, response!.responseType);
            return;
        }

        setStep(next);
        setTimerKey(timerKey + 1);
        setDisbaledBtn(true)
    }

    const handleBack = () => {  
        if (step === 0) {
            onView();
        } else {
            const back = step - 1;
            setStep(back);
        }
    }
    
    const handleResendCode = (type: number) => {
        fetchRequestCode(type);
        setTimerKey(timerKey + 1);
        setDisbaledBtn(true)
    };
    
    return (
        <AnimatePresence>
            {visible && (
                <BlurView intensity={80} tint="light" style={styles.blurView}>
                    <MotiView
                        from={{ opacity: 0, translateY: -50 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: -50 }}
                        transition={{ type: 'timing', duration: 300 }}
                        style={styles.modalContainer}
                    >   
                        {step === 0 &&(
                            <>
                                <Text variant='bodyLarge' style={[primaryBold, styles.textCenter]}>Ingresa el código enviado a tu correo electrónico.</Text>
                                <View style={[styles.row, styles.ml5]}>
                                    {otpValues.map((value, index) => (
                                        <OtpInputs
                                            key={index}
                                            style={index === 5 ? null : styles.otp}
                                            editable={false}
                                            value={value}
                                            isSecure={isSecure}
                                            isCode
                                        />
                                    ))}
                                </View>
                            </>
                        )}
                        {step === 1 && (
                           <>
                                <Text variant='bodyLarge' style={[primaryBold, styles.textCenter]}>Ingresa el código enviado a tu número de celular.</Text>
                                <View style={[styles.row, styles.ml5]}>
                                    {otpValues.map((value, index) => (
                                        <OtpInputs
                                            key={index}
                                            style={index === 5 ? null : styles.otp}
                                            editable={false}
                                            value={value}
                                            isSecure={isSecure}
                                            isCode
                                        />
                                    ))}
                                </View>
                            </>
                        )}
                        <GestureHandlerRootView style={styles.center}>
                            {(step === 0 || step === 1) &&(
                                <>
                                    <NumericKeyboard onKeyPress={handleKeyPress} onDeletePress={handleDeletePress} onView={handleViewPin}/>
                                    <CountdownTimerOtp key={timerKey} onFinish={() => setDisbaledBtn(false)} />
                                    <View style={styles.row}> 
                                        <TouchableOpacity onPress={() => handleResendCode(step === 0 ? 0 : 1)} disabled={disabledBtn}>
                                            <Text style={[disabledBtn ? styles.linkDisabled : styles.link, primaryBold]}>Reenviar código.</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                            <View style={styles.rowButtons}>
                                <ButtonsSecondary
                                    label="Volver"
                                    onPress={handleBack}
                                />
                                <ButtonsPrimary
                                    label={"Aceptar"}
                                    onPress={handleNext}
                                />
                            </View>
                        </GestureHandlerRootView>
                    </MotiView>
                </BlurView>
            )}
        </AnimatePresence>
    );
}