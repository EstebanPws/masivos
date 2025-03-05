import React, { useState } from "react";
import styles from "./pinSecurity.styles";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import { useFocusEffect } from "expo-router";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { ScrollView, View } from "react-native";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import Inputs from "@/components/forms/inputs/inputs";
import InfoModal from "@/components/modals/infoModal/infoModal";
import instanceWallet from "@/services/instanceWallet";
import { getData } from "@/utils/storageUtils";
import { useAuth } from "@/components/auth/context/authenticationContext";
import { esConsecutivo } from "@/utils/validationForms";

export default function Page() {
  const { setActiveTab, goBack } = useTab();
  const { logout } = useAuth();
  const [pin, setPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [messageModal, setMessageModal] = useState('');
  const [typeModal, setTypeModal] = useState<'error' | 'success'>('error');
  const [showModal, setShowModal] = useState(false);
  const [typeResponse, setTypeResponse] = useState(0);

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

    if (pin.length !== 4 || confirmPin.length !== 4 || newPin.length !== 4)  {
      setTypeModal('error');
      setMessageModal('El PIN debe ser de 4 dígitos.');
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

    const info = await getData('infoClient');

    const body = {
      no_doc: info.numDoc,
      contrasena: pin,
      newPaswword: confirmPin
    }

    await instanceWallet.put('updatePassword', body)
    .then((response) => {
      const data = response.data;
      if (data.message){
        setTypeResponse(1);
        setTypeModal('success');
        setMessageModal('Se actualizo tu PIN con éxito.\n\nPor favor inicia sesión nuevamente.');
        setShowModal(true);
      }
    })
    .catch((err) => {
      if (err.response) {
        const error = err.response.data.message;
        error ? setMessageModal(error) : setMessageModal('Hubo un error al intentar actualizar tu PIN en este momento.\n\nPor favor intentalo de nuevo en unos minutos.')
      } else {
        setMessageModal('Hubo un error al intentar actualizar tu PIN en este momento.\n\nPor favor intentalo de nuevo en unos minutos.')
      }

      setTypeResponse(0);
      setTypeModal('error');
      setShowModal(true);
    })

  }

  const handleFinishResetPassword = (type: number) => {
    if (type === 1) {
      logout();
    }

    setShowModal(false);
  }
  
  useFocusEffect(() => {
    setActiveTab('/home/profile/pinSecurity/');
  });
  
  const handleBack = () => {
      goBack();
  };

  return (
    <ViewFadeIn isWidthFull>
        <HeaderForm
            onBack={() => handleBack()}
            title="PIN de seguridad"
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.info}>
            <View style={styles.container}>
              <View style={styles.center}>
                <View style={styles.mb5}>
                  <Inputs
                    label="PIN actual"
                    placeholder="Escribe el pin actual"
                    isSecureText={true}
                    isRequired={true}
                    keyboardType="numeric"
                    maxLength={4}
                    onChangeText={setPin}
                    value={pin}
                  />
                </View>
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
              </View>
              <ButtonsPrimary
                label={'Cambiar PIN'} 
                onPress={fetchResetPin}
              />
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
    </ViewFadeIn>
  );
}