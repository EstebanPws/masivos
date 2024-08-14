import React from "react";
import { Text } from "react-native-paper";
import { styles } from "./profile.styles";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import { router, useFocusEffect } from "expo-router";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { ScrollView, View } from "react-native";
import OptionsProfile from "@/components/options/optionsProfile/optionsProfile";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { useAuth } from "@/components/auth/context/authenticationContext";

const extra = Constants.expoConfig?.extra || {};
const {colorPrimary, colorSecondary} = extra;
const {primaryBold, primaryRegular} = extra.text;
const expo = Constants.expoConfig?.name || '';

export default function Page() {
  const { setActiveTab, goBack } = useTab();
  const { logout } = useAuth();
  
  useFocusEffect(() => {
    setActiveTab('/home/profile/');
  });
  
  const handleBack = () => {
      goBack();
  };  

  const handleLogout = async () => {
    await logout();
  }

  return (
    <ViewFadeIn isWidthFull>
      <HeaderForm
          onBack={() => handleBack()}
          isBorder={false}
          title="Perfil"
      />
      <LinearGradient
          colors={[colorPrimary, colorSecondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
      >
        <View style={styles.container}>
          <Text variant='labelSmall' style={[primaryBold, styles.text, styles.mt1]}>Juan Baquero</Text>
          <View style={[styles.mt1, styles.id]}>
            <Text variant='labelSmall' style={[primaryBold, styles.text]}>ID: 1321</Text>
          </View>
          <LinearGradient
            colors={[colorPrimary, colorSecondary]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.account}
          >
            <Text variant='labelSmall' style={[primaryBold, styles.text]}>Número de cuenta: <Text  style={[primaryRegular, styles.text]}>873000016</Text></Text>
          </LinearGradient>
        </View> 
      </LinearGradient>
      <View style={styles.center}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mb5}>
            <Text variant="labelLarge" style={[primaryBold]}>Listado de tarjetas</Text>
            <OptionsProfile
              onPress={() => router.replace('/home/cards/')}
              title="Gestión de tarjetas"
            />
          </View>
          <View style={styles.mb5}>
            <Text variant="labelLarge" style={[primaryBold]}>Cuentas bancarias</Text>
            <OptionsProfile
              onPress={() => router.replace('/home/profile/adminAccounts')}
              title="Administración de cuentas"
            />
          </View>
          <View style={styles.mb5}>
            <Text variant="labelLarge" style={[primaryBold]}>Detalles personales</Text>
            <OptionsProfile
              onPress={() => router.replace('/home/profile/personalInfo')}
              title="Datos personales"
            />
            <OptionsProfile
              onPress={() => router.replace('/home/profile/addressInfo')}
              title="Dirección"
            />
          </View>
          <View style={styles.mb5}>
            <Text variant="labelLarge" style={[primaryBold]}>Seguridad</Text>
            <OptionsProfile
              onPress={() => router.replace('/home/profile/pinSecurity')}
              title="PIN"
            />
          </View>
          <View style={styles.mb5}>
            <Text variant="labelLarge" style={[primaryBold]}>Información y contacto</Text>
            <OptionsProfile
              onPress={() => router.replace('/home/profile/canalAttention')}
              title="Canales de atención"
            />
            <OptionsProfile
              onPress={() => router.replace('/home/profile/defenderConsumer')}
              title="Defensor del consumidor"
            />
            <OptionsProfile
              onPress={() => router.replace('/home/profile/comissions')}
              title="Tarifas"
            />
            <OptionsProfile
              onPress={() => router.replace('/home/profile/')}
              title={`Darse de baja de ${expo}`}
            />
          </View>
          <View style={styles.mb5}>
            <ButtonsPrimary 
              label="Salir de la billetera"
              onPress={handleLogout}
            />
          </View>
        </ScrollView>
      </View>
    </ViewFadeIn>
  );
}