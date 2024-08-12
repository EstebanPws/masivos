import React, { useState } from "react";
import { styles } from "./pinSecurity.styles";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import { useFocusEffect } from "expo-router";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { ScrollView, View } from "react-native";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import Inputs from "@/components/forms/inputs/inputs";

export default function Page() {
  const { setActiveTab, goBack } = useTab();
  const [pin, setPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  
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
        <View style={styles.info}>
          <ScrollView contentContainerStyle={[styles.container]} showsVerticalScrollIndicator={false}>
            <View style={styles.center}>
              <View style={styles.mb5}>
                <Inputs
                  label="PIN actual"
                  placeholder="Escribe el pin actual"
                  isSecureText={false}
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
                  isSecureText={false}
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
                  isSecureText={false}
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
            />
          </ScrollView>
        </View>
    </ViewFadeIn>
  );
}