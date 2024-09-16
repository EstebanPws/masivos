import React, { useEffect, useState } from "react";
import { styles } from "./personalInfo.styles";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import { useFocusEffect } from "expo-router";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { ScrollView, View } from "react-native";
import Inputs from "@/components/forms/inputs/inputs";
import { getData } from "@/utils/storageUtils";

export default function Page() {
  const { setActiveTab, goBack } = useTab();
  const [info, setInfo] = useState<any>();
  const [birthDate, setBirthDate] = useState('');

  useEffect(() => {
    const fetchInfo = async () => {
      const infoClient = await getData('infoClient');
      const year = infoClient.birthDate.slice(0, 4);
      const month = infoClient.birthDate.slice(4, 6);
      const day = infoClient.birthDate.slice(6, 8);
      setBirthDate(`${year}/${month}/${day}`);
      setInfo(infoClient);
    }

    fetchInfo();
  }, [])
  
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
                  value={info ? info.names : 'Cargando..'}
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
                  value={info ? info.surnames : 'Cargando..'}
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
                  value={info ? info.phoneNumber : 'Cargando...'}
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
                  value={info ? info.email : 'Cargando..'}
                  readonly
                />
              </View>
            </View>
        </ScrollView>
    </ViewFadeIn>
  );
}