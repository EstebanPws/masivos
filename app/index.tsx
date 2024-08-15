import { Image, View, Platform, TouchableOpacity } from "react-native";
import { Icon, Text } from "react-native-paper";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import Inputs from "@/components/forms/inputs/inputs";
import Constants from "expo-constants";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import ButtonsSecondary from "@/components/forms/buttons/buttonSecondary/button";
import { useRouter } from "expo-router";
import { useAuth } from "@/components/auth/context/authenticationContext";
import { useState } from "react";
import InfoModal from "@/components/modals/infoModal/infoModal";
import { styles  } from "./styles";
import HeaderSecondary from "@/components/headers/headerSecondary/headerSecondary";

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;
const { primaryBold, primaryRegular } = extra.text;

export default function Page() {
  const { authenticate, documentNumber, password } = useAuth();
  const [inputDocument, setInputDocument] = useState(`${documentNumber ? documentNumber : ''}`);
  const [showAlertAuth, setShowAlertAuth] = useState(false);

  const router = useRouter();

  const handleAuthenticate = async () => {  
    if(inputDocument === documentNumber){
      await authenticate(documentNumber!, password!);
    } else {
      setShowAlertAuth(true);
    }
  };

  const handleLogin = () => {
    router.push({ pathname: 'auth/pin/', params: { document: inputDocument } });
  }

  const handleRegister = () => {
    router.push('auth/signUp/');
  }

  return (
    <ViewFadeIn>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        extraHeight={Platform.select({ ios: 100, android: 120 })}
      >
        <View style={styles.containerImage}>
          <Image source={require('../assets/images/general/home.webp')} resizeMode="cover" style={styles.image} />
          <HeaderSecondary type={0}/>
          <View style={styles.containerText}>
            <Text style={{ ...primaryBold, ...styles.textWhite }} variant="headlineMedium">¡Bienvenido!</Text>
            <Text style={{ ...primaryRegular, ...styles.textWhite }} variant="titleLarge">Por favor identificate para entrar en tu cuenta.</Text>
          </View>
          <View style={styles.containerForm}>
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
          <View style={{...styles.row, ...styles.mt5}}>
            {documentNumber  ? (
              <TouchableOpacity onPress={handleAuthenticate}>
                <View style={styles.row}>
                  <View style={styles.icon}>
                    <Icon
                      source="account"
                      color={colorPrimary}
                      size={20}
                    />
                  </View>
                  <Text style={{ ...primaryBold, color: colorPrimary }}>Face ID</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View />
            )}
            <ButtonsSecondary
              label="Registrarse"
              onPress={handleRegister}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      {showAlertAuth && (
        <InfoModal
            isVisible={showAlertAuth}
            type="info"
            message={`El número de documento ingresado no coincide con el de la sesión guradada. ${'\n\n'} Por favor verifique los datos e intentelo nuevamente.`}
            onPress={() => setShowAlertAuth(false)}
        />
      )}
    </ViewFadeIn>
  );
}