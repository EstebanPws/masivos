import React, { useEffect, useRef, useState } from "react";
import { BlurView } from "expo-blur";
import { AnimatePresence, MotiView, View } from "moti";
import OtpInputs from "@/components/otp/otpInputs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NumericKeyboard from "@/components/numericKeyboard/numericKeyboard";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { TextInput } from "react-native";
import styles from "./otpValidationRegisterModal.styles";
import Constants from "expo-constants";
import ButtonsSecondary from "@/components/forms/buttons/buttonSecondary/button";
import { Text } from "react-native-paper";
import instanceWallet from "@/services/instanceWallet";
import { setSessionToken } from "@/utils/storageUtils";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;
const idApp = extra.idApp;

interface OtpValidationRegisterModalProps {
    type: number;
    numberDocument?: string;
    id?: string;
    onClose: (message: string, type: "info" | "success" | "error") => void;
    onView: () => void;
    onFinish: (modalidad?: string) => void;
}

export default function OtpValidationRegisterModal({ type, numberDocument, id, onClose, onView, onFinish }: OtpValidationRegisterModalProps) {
    const [visible] = useState(true);
    const inputRefs = useRef<TextInput[]>([]);
    const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
    const [isSecure, setIsSecure] = useState(false);

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

    const handleViewPin = () => {
        setIsSecure(!isSecure);
    }

    const fetchValidateCodeP2P = async () => {
        let message;
        let responseType: "info" | "success" | "error" = "info";
        let modalidad = "";
        const code = otpValues.join('');
        const bodyValidate = {
            id_tx_entidad: id,
            codeOtp: code
        }

        try {
            const codeEmailValidateResponse = await instanceWallet.post('code', bodyValidate);
            const responseMessage = codeEmailValidateResponse.data.message;
           
            if (responseMessage.includes('completó con éxito')) {
                modalidad = "1";
            } else {
                message = "El código ingresado es incorrecto.";
                responseType = "error";
            }
        } catch (error) {    
            message = "Hubo un error al intentar verificar el código";
            responseType =  "error";
        }

        return { message, responseType, modalidad };
    }

    const fetchValidateCodeInter = async () => {
        let message;
        let responseType: "info" | "success" | "error" = "info";
        let modalidad = "";
        const code = otpValues.join('');
        const bodyValidate = {
            header: {},
            transaction: {
                AdditionalInformation: {
                    UniqueCode: id,
                    code: code
                }
            
            }
        }
        
        try {
            const codeEmailValidateResponse = await instanceWallet.post('interBankTx', bodyValidate);
            const responseMessage = codeEmailValidateResponse.data.message;
            if (responseMessage.includes('Proceso exitoso')) {
                modalidad = "1";
            } else {
                message = "El código ingresado es incorrecto.";
                responseType = "error";
            }
        } catch (error) {    
            console.log(error);
            
            message = "Hubo un error al intentar verificar el código";
            responseType =  "error";
        }

        return { message, responseType, modalidad };
    }

    const fetchValidateCode = async () => {
        let message;
        let responseType: "info" | "success" | "error" = "info";
        let modalidad = "";
        const code = Number(otpValues.join(''));

        const bodyValidate = {
            no_doc: numberDocument,
            code: code,
            idApp: idApp
        }
        try {
            const codeEmailValidateResponse = await instanceWallet.post('codeCheck', bodyValidate);
            const responseMessage = codeEmailValidateResponse.data.message;
            if (responseMessage.includes('es correcto')) {
                const token = codeEmailValidateResponse.data.data.token;
                modalidad = codeEmailValidateResponse.data.data.modalidad;
                setSessionToken(token);
            } else {
                message = "El código ingresado es incorrecto.";
                responseType = "error";
            }
        } catch (error) {    
            message = "Hubo un error al intentar verificar el código";
            responseType =  "error";
        }

        return { message, responseType, modalidad };
    }

    const handleNext = async () => {
        let response = type === 0 ? await fetchValidateCode() : type === 1 ? await fetchValidateCodeInter() : await fetchValidateCodeP2P();  
        if (response!.responseType !== 'error') {
            const modalidad = response!.modalidad;
            onFinish(modalidad);
        }  

        if (response!.message) {
            onClose(response!.message, response!.responseType);
            return;
        }
    }

    const handleBack = () => {  
        onView();
    }
    
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
                        <Text variant='bodyLarge' style={[primaryBold, styles.textCenter]}>Hemos enviado un código a tu correo electrónico por favor ingresalo a continuación</Text>
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
                        <GestureHandlerRootView style={styles.center}>
                            <NumericKeyboard onKeyPress={handleKeyPress} onDeletePress={handleDeletePress} onView={handleViewPin}/>
                            <View style={styles.rowButtons}>
                                <ButtonsSecondary
                                    label="Volver"
                                    onPress={handleBack}
                                />
                                <ButtonsPrimary
                                    label={"Validar"}
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