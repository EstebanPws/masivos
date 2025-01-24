import React, { useEffect, useRef, useState } from "react";
import { TextInput, View, Image, TouchableOpacity, Platform } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import NumericKeyboard from "@/components/numericKeyboard/numericKeyboard";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import OtpInputs from "@/components/otp/otpInputs";
import Constants from "expo-constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styles from "./signUp.styles";
import InfoModal from "@/components/modals/infoModal/infoModal";
import HeaderSecondary from "@/components/headers/headerSecondary/headerSecondary";
import { getData, setData } from '@/utils/storageUtils';
import { esConsecutivo } from "@/utils/validationForms";
import InfoModalConfirm from "@/components/modals/infoModalConfirm/infoModalConfirm";
import instanceWallet from "@/services/instanceWallet";
import Inputs from "@/components/forms/inputs/inputs";
import OtpExistProcessModal from "@/components/modals/otpExistProcessModal/otpExistProcessModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold, primaryRegular } = extra.text;
const { idApp } = extra;

export default function Page() {
  const inputRefs = useRef<TextInput[]>([]);
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '']);
  const [pinEmpty, setPinEmpty] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const [step, setStep] = useState(0);
  const [showErrorPin, setShowErrorPin] = useState(false);
  const [showConfirmInfo, setShowConfirmInfo] = useState(false);
  const [showMessErrorPin, setShowMessErrorPin] = useState('');
  const [firstPin, setFirstPin] = useState('');
  const [validateAfterSettingPin, setValidateAfterSettingPin] = useState(false);
  const [showProcessAccountExist, setShowProcessAccountExist] = useState(false);
  const [validationModal, setValidationModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [typeResponse, setTypeResponse] = useState<'info' | 'error' | 'success'>("info");
  const [type, setType] = useState("0");
  const [tipoDoc, setTipoDoc] = useState("");
  const [numeroDoc, setNumeroDoc] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [responseSuccess, setResponseSucces] = useState<boolean | undefined>(undefined);
  const router = useRouter();
  const [saveDocument, setSaveDocument] = useState("");
  const [formData, setFormData] = useState({
    pin: ''
  });
  const [count, setCount] = useState(0);

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
    if (step === 1) {
      setStep(0);
    } else {
      router.back();
    }
  }

  const handleNext = () => {
    if (step === 0) {
      const otpIsEmpty = otpValues.some((val) => val === '');
      const consecutivo = esConsecutivo(Number(otpValues.join('')));
      if (consecutivo) {
        setShowMessErrorPin('El PIN no puede ser consecutivo ó los 4 dígitos no pueden ser iguales.');
        setShowErrorPin(true);
        return;
      }

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
      const consecutivo = esConsecutivo(Number(otpValues.join('')));
      if (consecutivo) {
        setShowMessErrorPin('El PIN no puede ser consecutivo ó los 4 dígitos no pueden ser iguales.');
        setShowErrorPin(true);
        return;
      }

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
        const updatedFormData = { ...formData, pin: otpValues.join('') };
        const fetchFormData = async () => {
          const savedData = await getData('registrationForm');
          const newFormData = { ...savedData, ...updatedFormData };
          await setData('registrationForm', newFormData);
        };

        fetchFormData();
        //setShowConfirmInfo(true);
        const fetchGetProccessAccount = async () => {
          const doc = await AsyncStorage.getItem("numberDocument");
          setSaveDocument(doc!);
          const bodyFirst = {
            no_doc: doc,
            idApp: idApp
          };
          await instanceWallet.post('api/responses/adotech-data', bodyFirst)
            .then(async (resp) => {
              if (resp.data.data.length !== 0) {
                const sortedData = resp.data.data.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                const lastData = resp.data.data[sortedData.length - 1];
                const dateCreated = lastData ? lastData.createdAt : resp.data.data.createdAt;
                const createdAtDate = new Date(dateCreated);
                const today = new Date();
                const isToday =
                  createdAtDate.getFullYear() === today.getFullYear() &&
                  createdAtDate.getMonth() === today.getMonth() &&
                  createdAtDate.getDate() === today.getDate();
                const state = lastData ? lastData.response.Extras.IdState : resp.data.data.response.Extras.IdState;
console.log(state)
                if (state === "2" && isToday) {
                  const body = {
                    docCli: doc,
                    id: idApp
                  }
                  console.log(body)
                  await instanceWallet.post('api/clients/view', body)
                    .then(async (response) => {
                      console.log(response.data)
                      if (response.data.account.length !== 0) {
                        const lastAccount = response.data.account[response.data.account.length - 1];
                        setTipoDoc(lastAccount.tipo_doc);
                        setNumeroDoc(lastAccount.no_docum);
                        setCorreo(lastAccount.correo);
                        setCelular(lastAccount.numero_celular);
                        const names = {
                          nombre1: response.data.nombres1,
                          nombre2: response.data.nombres2,
                          apellido1: response.data.apellido1,
                          apellido2: response.data.apellido2
                        }
                        const savedData = await getData('registrationForm');
                        const finalData = { ...savedData, ...lastAccount, ...names };
                        await setData('registrationForm', finalData);
                      }
                    })
                    .catch((err) => {
                      console.log(err.response)
                      if (err && err.response && err.response.data) {
                        if (err.response.data.message === "No se encontró cuenta") {
                          setShowConfirmInfo(true);
                        }
                      }
                    });

                  setShowProcessAccountExist(true);
                } else {
                  setShowConfirmInfo(true);
                }
              } else {
                setShowConfirmInfo(true);
              }
            })
            .catch((err) => {
              setShowConfirmInfo(true);
            });
        }

        fetchGetProccessAccount();
      } else {
        setShowMessErrorPin(`Los datos ingresados no coinciden. ${'\n\n'} Por favor verifique los datos e intentelo nuevamente.`);
        setShowErrorPin(true);
      }
      setValidateAfterSettingPin(false);
    }
  }, [firstPin, validateAfterSettingPin]);

  const handleViewPin = () => {
    setIsSecure(!isSecure);
  }

  const handleOtpValidationResponse = (message: string, type: "info" | "success" | "error") => {
    setMessageError(message);
    setTypeResponse(type);
    if (type === "error") {
      setCount((prevCount) => {
        const updatedCount = prevCount + 1;
        if (updatedCount === 3) {
          setResponseSucces(false);
        } else {
          setResponseSucces(undefined);
        }

        return updatedCount;
      });
    }
    setShowError(true);
  };

  const handleOnViewOtp = () => {
    setValidationModal(false);
  }

  const handleFinishOtp = async () => {
    const body = {
      no_doc: numeroDoc ? numeroDoc : await AsyncStorage.getItem("numberDocument"),
      idApp: idApp
    };
    await instanceWallet.post('api/responses/adotech-data', body)
      .then(async (resp) => {
        if (resp.data.data.length !== 0) {
          const lastData = resp.data.data[resp.data.data.length - 1];
          const dateCreated = lastData ? lastData.createdAt : resp.data.data.createdAt;
          const createdAtDate = new Date(dateCreated);
          const today = new Date();
          const isToday =
            createdAtDate.getFullYear() === today.getFullYear() &&
            createdAtDate.getMonth() === today.getMonth() &&
            createdAtDate.getDate() === today.getDate();
          const state = lastData ? lastData.response.Extras.IdState : resp.data.data.response.Extras.IdState;

          if (state === "2" && isToday) {
            setResponseSucces(true);
            await setData('existVinculacion', true);
          } else {
            setResponseSucces(undefined);
            await setData('existVinculacion', false);
          }
        }
      })
      .catch((err) => {
        setShowConfirmInfo(true);
      });
    setValidationModal(false);
  }

  return (
    <>
      <View style={styles.headerContainer}>
        <HeaderSecondary type={1} onBack={handleBack} />
      </View>

      <ViewFadeIn>
        <View style={[styles.mt5, styles.contentContainer]}>
          <GestureHandlerRootView style={styles.gesture}>
            <View style={styles.containerText}>
              <Text variant="titleLarge" style={{ ...primaryBold, ...styles.title }}>Configurar un nuevo PIN</Text>
              <Text variant="titleMedium" style={{ ...primaryRegular }}>{step === 0 ? 'Selecciona un código de 4 dígitos' : 'Confirmar nuevo PIN'}</Text>
            </View>
            <View style={[styles.row, (pinEmpty ? styles.mrnPinEmpty : styles.mrn)]}>
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
            <NumericKeyboard onKeyPress={handleKeyPress} onDeletePress={handleDeletePress} onView={handleViewPin} />
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
          message={showMessErrorPin}
          onPress={() => setShowErrorPin(false)}
        />
      )}
      {showConfirmInfo && (
        <InfoModalConfirm
          title="Información importante"
          onPress={() => {
            //router.push('/auth/signUp/selectTypeAccount');
            //router.push({pathname: '/auth/signUp/formRegister', params: { type: 8 }});
            router.push('/auth/signUp/videoIdentification');
            setShowConfirmInfo(false)
          }}
        >
          <Text variant="titleSmall" style={{ ...primaryRegular }}>
            Antes de comenzar el proceso de validación de identidad, asegúrate de activar los servicios de ubicación (GPS) en la configuración de tu dispositivo. {'\n\n'}Además, verifica que cuentas con una conexión a internet estable.{'\n\n'}Gracias.
          </Text>
        </InfoModalConfirm>
      )}
      {showProcessAccountExist && (
        <InfoModal
          isVisible={showProcessAccountExist}
          type={'error'}
          message={`Hemos identificado que ya tienes un proceso de vinculación en curso.\n\nPara continuar, necesitamos validar tu correo electrónico y número de celular.\n\nTe enviaremos un código tanto a tu correo como a tu celular.\n\nPor favor, ingresa ambos códigos cuando los recibas para retomar el proceso.`}
          onPress={() => { setShowProcessAccountExist(false); setValidationModal(true) }}
          label="Aceptar"
        />
      )}
      {validationModal && (
        <View style={styles.modalOtps}>
          <OtpExistProcessModal
            tipoDoc={tipoDoc}
            numeroDoc={numeroDoc}
            correo={correo}
            celular={celular}
            onClose={handleOtpValidationResponse}
            onView={handleOnViewOtp}
            onFinish={handleFinishOtp}
            typePerson={Number(type)}
          />
        </View>
      )}
      {showError && (
        <View style={styles.modalOtps}>
          <InfoModal
            isVisible={showError}
            type={typeResponse}
            message={messageError}
            onPress={() => {
              setShowError(false);
              if (responseSuccess === true) {
                router.push({pathname: '/auth/signUp/formRegister', params: { type: 8 }});
              } else if (responseSuccess === false) {
                setCount(0);
                setValidationModal(false);
                //router.push('/auth/signUp/selectTypeAccount');
                //router.push({pathname: '/auth/signUp/formRegister', params: { type: 8 }});
                router.push('/auth/signUp/videoIdentification');
                //router.replace('/')
              }
            }
            }
            label="Aceptar"
          />
        </View>
      )}
    </>
  );
}