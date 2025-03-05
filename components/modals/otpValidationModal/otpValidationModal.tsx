import React, { useEffect, useRef, useState } from "react";
import { BlurView } from "expo-blur";
import { AnimatePresence, MotiView, View } from "moti";
import OtpInputs from "@/components/otp/otpInputs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NumericKeyboard from "@/components/numericKeyboard/numericKeyboard";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { TextInput, TouchableOpacity } from "react-native";
import styles from "./otpValidationModal.styles";
import Constants from "expo-constants";
import ButtonsSecondary from "@/components/forms/buttons/buttonSecondary/button";
import { Text } from "react-native-paper";
import instanceWallet from "@/services/instanceWallet";
import { getData } from "@/utils/storageUtils";
import { useAuth } from "@/components/auth/context/authenticationContext";
import CountdownTimerOtp from "@/components/amount/countdownTimer/countdownTimerOtp";
import { AxiosError } from "axios";
import InfoModal from "../infoModal/infoModal";

const extra = Constants.expoConfig?.extra || {};
const { idApp } = extra;
const { primaryBold, primaryRegular } = extra.text;

interface OtpValidationModalProps {
    typePerson: number;
    onClose: (message: string, type: "info" | "success" | "error") => void;
    onView: () => void;
    onFinish: () => void;
}

export default function OtpValidationModal({ typePerson, onClose, onView, onFinish }: OtpValidationModalProps) {
    const { activeLoader, desactiveLoader } = useAuth();
    const [step, setStep] = useState(0);
    const [visible, setVisible] = useState(true);
    const inputRefs = useRef<TextInput[]>([]);
    const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
    const [isSecure, setIsSecure] = useState(false);
    const [data, setData] = useState<any>();
    const [disabledBtn, setDisbaledBtn] = useState(true);
    const [timerKey, setTimerKey] = useState(0);
    const [validationModal, setValidationModal] = useState(false);
    const [isOtpValidated, setIsOtpValidated] = useState(false);

    const [typeResponse, setTypeResponse] = useState<"info" | "success" | 'error'>('info');
    const [showError, setShowError] = useState(false);
    const [messageError, setMessageError] = useState('');

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
        let message;
        let responseType: "info" | "success" | "error" = "info";

        if (savedData) {
            const body = {
                tipo_doc: savedData.tipo_doc,
                no_doc: savedData.no_docum,
                correo: "",
                numero_celular: "",
                idApp: idApp
            }

            if (type === 0) {
                if (savedData.correo === '') {
                    message = 'El correo electrónico no es valido.';
                    responseType = "error";
                } else {
                    body.correo = savedData.correo;
                }
            } else {
                const tel = savedData.numero_celular;

                if (tel === '') {
                    message = 'El número de celular no es valido.';
                    responseType = "error";
                } else {
                    body.numero_celular = savedData.numero_celular;
                }
            }
            try {
                setData(savedData);
                await instanceWallet.post('preRegistro', body);
                setOtpValues(['', '', '', '', '', '']);
            } catch (error) {
                if (error instanceof AxiosError && error.response) {
                    console.log(error.response);
                }
                message = `Hubo un error al intentar enviar el código de verificación por ${type === 0 ? "correo electrónico" : 'sms'} , por favor inténtalo de nuevo en unos minutos.`;
                responseType = "error";
            }
        }

        desactiveLoader();
        return { message, responseType };
    }

    const fetchValidateCode = async (type: number) => {
        activeLoader();

        const code = Number(otpValues.join(''));
        const bodyValidate = {
            tipo_doc: typePerson === 1 ? data.r_l_tipo_doc : data.tipo_doc,
            no_doc: typePerson === 1 ? data.r_l_ced : data.no_docum,
            codeVer: code,
            type: type
        };

        return instanceWallet.post('VerficacionOTP', bodyValidate)
            .then(response => {
                desactiveLoader();
                const { status, message } = response.data;

                let responseType: "info" | "success" | "error";

                if (status === 200) {
                    setValidationModal(true);
                    responseType = "success";
                    return { message, responseType };
                }

                responseType = "info";
                return { message: "Respuesta inesperada del servidor", responseType };
            })
            .catch(error => {
                desactiveLoader();
                console.error("Error en VerficacionOTP:", error);

                const responseType: "error" = "error";
                if (error.status === 404) {
                    setValidationModal(true);
                    error.responseType = "error";
                    return { message: "Código incorrecto. Inténtalo nuevamente.", responseType };
                }

                return {
                    message: error.response?.data?.message || "Hubo un error al intentar verificar el código. Por favor, inténtalo de nuevo.",
                    responseType
                };
            });
    }


    const handleNext = async () => {
        const next = step + 1;
        let response;

        if (step === 0) {
            response = await fetchRequestCode(0);
            setValidationModal(false);
            setIsOtpValidated(true);
        }

        if (step === 1) {
            response = await fetchValidateCode(0);
            if (response.responseType === 'error') {
                setTypeResponse('error');
                setMessageError('Código incorrecto. Inténtalo nuevamente.');
                setShowError(true);
                setValidationModal(true);
                
                //response = await fetchRequestCode(1);
                return;
            } 

            response = await fetchRequestCode(1);
        }

        if (step === 2) {
            response = await fetchValidateCode(1);
            /*if (response.responseType === 'success') {
                setValidationModal(false);
                setIsOtpValidated(true);
                onFinish();
            } */
            if (response.responseType !== 'success') {
                setTypeResponse('error');
                setMessageError('Código incorrecto. Inténtalo nuevamente.');
                setShowError(true);
                setValidationModal(true);
                
                //response = await fetchRequestCode(1);
                //return;
            } else {
                onFinish();
                setValidationModal(true);
            }
        }

        if (response!.message) {
            onClose(response!.message, response!.responseType);
            return;
        }

        setStep(next);
        setTimerKey(timerKey + 1);
        setDisbaledBtn(true);
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
                        {step === 0 && (
                            // Para continuar con el proceso de vinculación, primero enviaremos un código a tu correo electrónico y, a continuación, otro a tu número de celular.{'\n\n'}Si no encuentras el mensaje en tu bandeja de entrada, revisa la carpeta de SPAM o correos no deseados.
                            <Text variant='bodyLarge' style={primaryRegular}>Para continuar con el proceso de vinculación, primero enviaremos un código a tu correo electrónico y, a continuación, otro a tu número de celular.{'\n\n'}Si no encuentras el mensaje en tu bandeja de entrada, revisa la carpeta de SPAM o correos no deseados.</Text>
                        )}
                        {step === 1 && (
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
                        {step === 2 && (
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
                            {/* {(step === 1) &&( */}
                            {(step === 1 || step === 2) && (
                                <>
                                    <NumericKeyboard onKeyPress={handleKeyPress} onDeletePress={handleDeletePress} onView={handleViewPin} />
                                    <CountdownTimerOtp key={timerKey} onFinish={() => setDisbaledBtn(false)} />
                                    <View style={styles.row}>
                                        <TouchableOpacity onPress={() => handleResendCode(step === 1 ? 0 : 1)} disabled={disabledBtn}>
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
                                    label={step !== 0 ? "Aceptar" : "Siguiente"}
                                    onPress={handleNext}
                                />
                            </View>
                        </GestureHandlerRootView>
                    </MotiView>
                </BlurView>
            )}
            {showError && (
                            <InfoModal
                                isVisible={showError}
                                type={typeResponse}
                                message={messageError}
                                onPress={() => {
                                    
                                }}
                            />
                        )}
        </AnimatePresence>
    );
}