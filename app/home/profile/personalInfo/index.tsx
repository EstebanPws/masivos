import React, { useState } from "react";
import { styles } from "./personalInfo.styles";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import { useFocusEffect } from "expo-router";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import Constants from "expo-constants";
import { ScrollView, View } from "react-native";
import Inputs from "@/components/forms/inputs/inputs";

const extra = Constants.expoConfig?.extra || {};

export default function Page() {
  const { setActiveTab, goBack } = useTab();
  const [names] = useState('Juan Sebastian');
  const [surnames] = useState('Baquero Moreno');
  const [birthDate] = useState('2002/07/03');
  const [phone] = useState('3214915456');
  const [email] = useState('test@gmail.com');
  
  useFocusEffect(() => {
    setActiveTab('/home/profile/personalInfo/');
  });
  
  const handleBack = () => {
      goBack();
  };

  return (
    <ViewFadeIn isWidthFull>
        <HeaderForm
            onBack={() => handleBack()}
            title="Datos Personales"
        />
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View style={[styles.center]}>
              <View style={styles.mb5}>
                <Inputs
                  label="Nombres"
                  placeholder="Escribe tus nombres completos"
                  isSecureText={false}
                  isRequired={false}
                  keyboardType="default"
                  value={names}
                  readonly
                />
              </View>
              <View style={styles.mb5}>
                <Inputs
                  label="Apellidos"
                  placeholder="Escribe tus nombres completos"
                  isSecureText={false}
                  isRequired={false}
                  keyboardType="default"
                  value={surnames}
                  readonly
                />
              </View>
              <View style={styles.mb5}>
                <Inputs
                  label="Fecha de nacimiento"
                  placeholder="Escribe tus nombres completos"
                  isSecureText={false}
                  isRequired={false}
                  keyboardType="default"
                  value={birthDate}
                  readonly
                />
              </View>
              <View style={styles.mb5}>
                <Inputs
                  label="Celular"
                  placeholder="Escribe tus nombres completos"
                  isSecureText={false}
                  isRequired={false}
                  keyboardType="default"
                  value={phone}
                  readonly
                />
              </View>
              <View style={styles.mb5}>
                <Inputs
                  label="Correo electrónico"
                  placeholder="Escribe tus nombres completos"
                  isSecureText={false}
                  isRequired={false}
                  keyboardType="default"
                  value={email}
                  readonly
                />
              </View>
            </View>
        </ScrollView>
    </ViewFadeIn>
  );
}