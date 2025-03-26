import React, { useState } from "react";
import styles from "./recoverPin.styles";
import { router } from "expo-router";
import { Text } from "react-native-paper";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import { ScrollView, View } from "react-native";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import Inputs from "@/components/forms/inputs/inputs";
import InfoModal from "@/components/modals/infoModal/infoModal";
import instanceWallet from "@/services/instanceWallet";
import HeaderGeneral from "@/components/headers/headerGeneral/headerGeneral";
import InfoModalConfirm from "@/components/modals/infoModalConfirm/infoModalConfirm";
import Constants from "expo-constants";
import ButtonsSecondary from "@/components/forms/buttons/buttonSecondary/button";
import { esConsecutivo } from "@/utils/validationForms";

const extra = Constants.expoConfig?.extra || {};
const { idApp } = extra;
const { primaryRegular } = extra.text;

export default function Page() {
  const [pin, setPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [messageModal, setMessageModal] = useState('');
  const [typeModal, setTypeModal] = useState<'error' | 'success'>('error');
  const [showModal, setShowModal] = useState(false);
  const [typeResponse, setTypeResponse] = useState(0);
  const [showModalConfirm, setShowModalConfirm] = useState(true);
  const [documentNumber, setDocumentNumber] = useState('');

  const fetchResetPin = async () => {
    if (!pin || !confirmPin || !newPin) {
        setTypeModal('error');
        setMessageModal('Por favor ingresa todos los datos obligatorios (*)');
        setShowModal(true);
        return;
    }

    if (newPin !== confirmPin) {
        setTypeModal('error');
        setMessageModal('El nuevo PIN y la confirmación del PIN no coinciden.');
        setShowModal(true);
        return;
    }

    if (confirmPin.length !== 4 || newPin.length !== 4)  {
        setTypeModal('error');
        setMessageModal('El PIN debe ser de 4 dígitos.');
        setShowModal(true);
        return;
    }

    if (pin.length !== 6)  {
        setTypeModal('error');
        setMessageModal('El código no puede ser menor a 6 dígitos.');
        setShowModal(true);
        return;
    }

    const consecutivo = esConsecutivo(Number(confirmPin));
    if (consecutivo) {
      setTypeModal('error');
      setMessageModal('El PIN no puede ser consecutivo ó los 4 dígitos no pueden ser iguales.');
      setShowModal(true);
      return;
    }

    const body = { 
        codiReset: Number(pin),
        newPassword: confirmPin,
        no_doc: documentNumber,
        idApp: idApp
    }

    await instanceWallet.post('confirmCode', body)
    .then((response) => {
        const data = response.data;
        if (data.message){
            setTypeResponse(1);
            setTypeModal('success');
            setMessageModal('Se recuperó tu PIN con éxito.');
            setShowModal(true);
        }
        
    })
    .catch((err) => {
        if (err.response) {
            const error = err.response.data.message;
            error ? setMessageModal(error.includes('coiciden') ? 'El código de verificación enviado al correo eletrónico es incorrecto.' : error): setMessageModal('Hubo un error al intentar recuperar tu PIN en este momento\n\nPor favor intentalo de nuevo en unos minutos.')
        } else {
            setMessageModal('Hubo un error al intentar recuperar tu PIN en este momento\n\nPor favor intentalo de nuevo en unos minutos.')
        }

        setTypeResponse(0);
        setTypeModal('error');
        setShowModal(true);
    })

  }

  const fetchSendCode = async () => {
    if (!documentNumber) {
      setShowModalConfirm(false);
      setTypeModal('error');
      setMessageModal('Por favor ingresa número de identificación');
      setShowModal(true);
      setTypeResponse(2);
      return;
    }

    const body = {
      no_doc: documentNumber,
      idApp: idApp
    }

    await instanceWallet.put('resetPassword', body)
    .then((response) => {
      const data = response.data;
      if (data.message){
        setShowModalConfirm(false);
        setTypeModal('success');
        setMessageModal(data.message);
        setShowModal(true);
      }
      
    })
    .catch((err) => {
      if (err.response) {
        const error = err.response.data.message;
        error ? setMessageModal(error) : setMessageModal('Hubo un error al intentar enviar el código de verificación a tu correo.\n\nPor favor intentalo de nuevo en unos minutos.')
      } else {
        setMessageModal('Hubo un error al intentar enviar el código de verificación a tu correo.\n\nPor favor intentalo de nuevo en unos minutos.')
      }

      setShowModalConfirm(false);
      setTypeResponse(2);
      setTypeModal('error');
      setShowModal(true);
    })

  }

  const handleFinishResetPassword = (type: number) => {
    if (type === 1) {
      router.replace('/');
    }

    if (type === 2) {
        setShowModalConfirm(true);
    }

    setShowModal(false);
  }
  
  const handleBack = () => {
    router.back();
  }

  return (
    <ViewFadeIn isWidthFull>
         <HeaderGeneral onBack={handleBack}/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.info}>
            <View style={styles.container}>
              <View style={styles.center}>
                <View style={styles.mb5}>
                  <Inputs
                    label="Nuevo PIN"
                    placeholder="Escribe el pin nuevo"
                    isSecureText={true}
                    isRequired={true}
                    keyboardType="numeric"
                    maxLength={4}
                    onChangeText={setNewPin}
                    value={newPin}
                  />
                </View>
                <View style={styles.mb5}>
                  <Inputs
                    label="Confirmar PIN"
                    placeholder="Escribe el pin de nuevo"
                    isSecureText={true}
                    isRequired={true}
                    keyboardType="numeric"
                    maxLength={4}
                    onChangeText={setConfirmPin}
                    value={confirmPin}
                  />
                </View>
                <View style={styles.mb5}>
                  <Inputs
                    label="Ingresa el código enviado a tu correo"
                    placeholder="Escribe el código"
                    isSecureText={false}
                    isRequired={true}
                    keyboardType="numeric"
                    maxLength={6}
                    onChangeText={setPin}
                    value={pin}
                  />
                </View>
              </View>
              <View style={styles.mb5}>
                <ButtonsPrimary
                    label={'Cambiar PIN'} 
                    onPress={fetchResetPin}
                />
              </View>
              <View style={styles.mb5}>
                <ButtonsSecondary
                    label={'Reenviar código'} 
                    onPress={fetchSendCode}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        {showModal && (
          <InfoModal 
            type={typeModal}
            message={messageModal} 
            onPress={() => handleFinishResetPassword(typeResponse)} 
            isVisible={showModal}          />
        )}
        {showModalConfirm && (
          <InfoModalConfirm 
            view={showModalConfirm}
            onPress={fetchSendCode} 
            onCancel={() => router.replace('/auth/pin')}> 
              <Text style={primaryRegular}>Para recuperar tu PIN, por favor ingresa tu número de identificación{'\n\n'}Te enviaremos a tu correo electrónico un código de confirmación.{'\n\n'}</Text>
              <View style={styles.mb5}>
                <Inputs
                    label="Número de identificación"
                    placeholder="Escribe número de identificación"
                    isSecureText={false}
                    isRequired={true}
                    keyboardType="numeric"
                    onChangeText={setDocumentNumber}
                    value={documentNumber}
                />
              </View>
          </InfoModalConfirm>
        )}
    </ViewFadeIn>
  );
}