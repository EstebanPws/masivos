import React, { useEffect, useRef, useState } from "react";
import { BlurView } from "expo-blur";
import { AnimatePresence, MotiView, View } from "moti";
import OtpInputs from "@/components/otp/otpInputs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NumericKeyboard from "@/components/numericKeyboard/numericKeyboard";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { TextInput, TouchableOpacity } from "react-native";
import { styles } from "./otpValidationModal.styles";
import Constants from "expo-constants";
import ButtonsSecondary from "@/components/forms/buttons/buttonSecondary/button";
import { Text } from "react-native-paper";
import instanceWallet from "@/services/instanceWallet";
import { getData } from "@/utils/storageUtils";
import { useAuth } from "@/components/auth/context/authenticationContext";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold, primaryRegular } = extra.text;

interface OtpValidationModalProps {
    typePerson: number;
    onClose: (message: string, type: "info" | "success" | "error") => void;
    onView: () => void;
    onFinish: () => void;
}

export default function OtpValidationModal({ typePerson, onClose, onView, onFinish }: OtpValidationModalProps) {
    const {activeLoader, desactiveLoader} = useAuth();
    const [step, setStep] = useState(0);
    const [visible, setVisible] = useState(true);
    const inputRefs = useRef<TextInput[]>([]);
    const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
    const [isSecure, setIsSecure] = useState(false);
    const [data, setData] = useState<any>();

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

    const fetchRequestCode = async (type: number) => {
        activeLoader();
        const savedData = await getData('registrationForm');
        setData(savedData);
        let message;
        let responseType: "info" | "success" | "error" = "info";

        if (savedData) {

            const body = { 
                tipo_doc: typePerson === 1 ? savedData.r_l_tipo_doc : savedData.tipo_doc,
                no_doc: typePerson === 1 ? savedData.r_l_ced : savedData.no_docum,
                correo: "",
                numero_celular: ""
            }

            if (type === 0) { 
                if (typePerson === 1 ? savedData.r_l_email === '' : savedData.correo === '') {
                    message = 'El correo electrónico no es valido.';
                    responseType = "error";
                } else {
                    body.correo = typePerson === 1 ? savedData.r_l_email : savedData.correo;
                }
            } else {
                if (typePerson === 1 ? savedData.r_l_tel : savedData.numero_celular === '') {
                    message = 'El número de celular no es valido.';
                    responseType = "error";
                } else {
                    body.numero_celular = typePerson === 1 && type === 0 ? savedData.r_l_tel : savedData.numero_celular;
                }
            }

            try {
                await instanceWallet.post('preRegistro', body);
                setOtpValues(['', '', '', '', '', '']);
            } catch (error) {
                message = `Hubo un error al intentar enviar el código de verificación por ${type === 0 ? "correo electrónico" : 'sms'} , por favor intentelo de nuevo en unos minutos.`;
                responseType = "error";
            }
        }
        
        desactiveLoader();
        return { message, responseType };
    }

    const fetchValidateCode = async () => {
        activeLoader();
        let message;
        let responseType: "info" | "success" | "error" = "info";
        const code = Number(otpValues.join(''));

        const bodyValidate = {
            tipo_doc: typePerson === 1 ? data.r_l_tipo_doc : data.tipo_doc,
            no_doc: typePerson === 1 ? data.r_l_ceds : data.no_docum,
            codeVer: code
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
        const next = step + 1;
        let response;
        if (step === 0) {
            response = await fetchRequestCode(0);
        }

        if (step === 1) {
            response = await fetchValidateCode();  
            if (response!.responseType !== 'error') {
                response = await fetchRequestCode(1);
            }
           
        }

        if (step === 2) {
            response = await fetchValidateCode();  
            if (response!.responseType !== 'error') {
                onFinish();
            }          
        }

        if (response!.message) {
            onClose(response!.message, response!.responseType);
            return;
        }

        setStep(next);
    }

    const handleBack = () => {  
        if (step === 0) {
            onView();
        } else {
            const back = step - 1;
            setStep(back);
        }
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
                        {step === 0 &&(
                            <Text variant='bodyLarge' style={primaryRegular}>Al continuar, acepta recibir correos electrónicos y mensajes de texto relacionados con el proceso. {'\n\n'} A tu dirección de correo electrónico y número de teléfono se enviará un código de verificación. {'\n\n'}Debes verificar primero el código enviado a tu correo electrónico. {'\n\n'}Por favor, revisa tu bandeja de entrada y ingresa el código enviado dando continuar para completar la verificación.</Text>
                        )}
                        {step === 1 && (
                           <>
                                <Text variant='bodyLarge' style={[primaryBold, styles.textCenter]}>Validar código enviado a su correo electrónico.</Text>
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
                        {step === 2 && (
                           <>
                                <Text variant='bodyLarge' style={[primaryBold, styles.textCenter]}>Validar código enviado a su número de celular.</Text>
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
                            {(step === 1 || step === 2) &&(
                                <>
                                    <NumericKeyboard onKeyPress={handleKeyPress} onDeletePress={handleDeletePress} onView={handleViewPin}/>
                                    <View style={styles.row}> 
                                        <TouchableOpacity onPress={() => fetchRequestCode(step === 1 ? 0 : 1)}>
                                            <Text style={{...styles.link, ...primaryBold}}>No llego el código ¿Reenviar código?</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                            <View style={styles.rowButtons}>
                                <ButtonsPrimary
                                    label={step !== 0 ? "Validar" : "Siguiente"}
                                    onPress={handleNext}
                                />
                                <ButtonsSecondary
                                    label="Volver"
                                    onPress={handleBack}
                                />
                            </View>
                        </GestureHandlerRootView>
                    </MotiView>
                </BlurView>
            )}
        </AnimatePresence>
    );
}