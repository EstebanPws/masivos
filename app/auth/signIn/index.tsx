import React, { useState } from "react";
import { Image, View, Platform, TouchableOpacity, ImageBackground } from "react-native";
import { Icon, Text } from "react-native-paper";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import Inputs from "@/components/forms/inputs/inputs";
import Constants from "expo-constants";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { useRouter } from "expo-router";
import { useAuth } from "@/components/auth/context/authenticationContext";
import InfoModal from "@/components/modals/infoModal/infoModal";
import styles from "./styles";
import HeaderSecondary from "@/components/headers/headerSecondary/headerSecondary";

const extra = Constants.expoConfig?.extra || {};
const expo = Constants.expoConfig?.name || '';
const { colorPrimary, version } = extra;
const { primaryBold, primaryRegular } = extra.text;
const { nit, correo, ciudad, departamento} = extra.contacto;

export default function Page() {
  const { authenticate, documentNumber, password } = useAuth();
  const [inputDocument, setInputDocument] = useState(`${documentNumber ? documentNumber : ''}`);
  const [showAlertAuth, setShowAlertAuth] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const imageSource = Platform.OS === 'android' 
  ? require('@/assets/images/general/huella.png') 
  : require('@/assets/images/general/id-facial.png');

  const router = useRouter();

  const handleAuthenticate = async () => {  
    if(inputDocument === documentNumber){
      await authenticate(documentNumber!, password!);
    } else {
      setShowAlertAuth(true);
    }
  };

  const handleLogin = () => {
    router.push({ pathname: '/auth/pin', params: { document: inputDocument } });
  }

  return (
    <ViewFadeIn isWidthFull>
  <ImageBackground
    source={require("@/assets/images/general/home2.webp")}
    style={styles.backgroundImage}
    resizeMode="cover" // Ajusta la imagen sin deformarla
  >
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={false}
      extraHeight={Platform.select({ ios: 100, android: 0 })}
    >
      <HeaderSecondary type={0} />

      {/* Contenedor del formulario con fondo transparente */}
      <View style={styles.containerForm}>
        <View style={styles.containerText}>
          <Text style={{ ...primaryBold }} variant="headlineMedium">Ingresa a tu cuenta</Text>
          <Text style={{ ...primaryRegular }} variant="titleLarge">Introduce tu número de documento para continuar.</Text>
        </View>
        <View>
          <Inputs
            label="Número del documento"
            placeholder="Escribe tu número de documento"
            isSecureText={false}
            isRequired={false}
            keyboardType="numeric"
            onChangeText={setInputDocument}
            value={inputDocument}
          />
          <ButtonsPrimary
            label="Acceder a la billetera"
            style={styles.mt5}
            onPress={handleLogin}
          />
        </View>
        <View style={{ ...styles.row, ...styles.mt5 }}>
          {password ? (
            <TouchableOpacity onPress={handleAuthenticate}>
              <View style={[styles.row, styles.faceId]}>
                <Icon
                  source={imageSource}
                  color={colorPrimary}
                  size={32}
                />
                <Text style={{ ...primaryRegular, color: colorPrimary, marginLeft: 10 }}>
                  {Platform.OS === "android" ? "Ingresa con huella" : "Face ID"}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  </ImageBackground>

  {showAlertAuth && (
    <InfoModal
      isVisible={showAlertAuth}
      type="info"
      message={`El número de documento ingresado no coincide con el de la sesión guardada. ${"\n\n"} Por favor, verifique los datos e inténtelo nuevamente.`}
      onPress={() => setShowAlertAuth(false)}
    />
  )}
</ViewFadeIn>
  );
}