import React from "react";
import styles from "./defenderConsumer.styles";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import { Link, useFocusEffect } from "expo-router";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { ScrollView, View, Image } from "react-native";
import { Text } from "react-native-paper";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || {};
const {primaryBold, primaryRegular} = extra.text;
const expo = Constants.expoConfig?.name || '';
const {correo} = extra.contacto;

export default function Page() {
  const { setActiveTab, goBack } = useTab();
  
  useFocusEffect(() => {
    setActiveTab('/home/profile/defenderConsumer/');
  });
  
  const handleBack = () => {
      goBack();
  };

  return (
    <ViewFadeIn isWidthFull>
        <HeaderForm
            onBack={() => handleBack()}
            title="Defensor del consumidor"
        />
        <View style={styles.info}>
          <ScrollView contentContainerStyle={[styles.container]} showsVerticalScrollIndicator={false}>
            <View style={styles.center}>
              <View style={styles.mb5}>
                <Text variant="titleSmall" style={[primaryBold]}>DEFENSORÍA DEL CONSUMIDOR FINANCIERO DE BANCO COOPERATIVO COOPCENTRAL</Text>
              </View>
              <View style={styles.mb5}>
                <Text variant="titleSmall" style={[primaryRegular, styles.mt1]}>Principal: Dr. Darío Laguado Monsalve.</Text>
                <Text variant="titleSmall" style={[primaryRegular, styles.mt1]}>Suplente: Dr. Gonzalo Méndez Morales.</Text>
                <Text variant="titleSmall" style={[primaryRegular, styles.mt1]}>Dirección: Calle 70ª No 11- 83 Bogotá D.C.</Text>
                <Text variant="titleSmall" style={[primaryRegular, styles.mt1]}>Horario: 9:00 AM a 4:00 PM (jornada continua) de lunes a viernes.</Text>
                <Text variant="titleSmall" style={[primaryRegular, styles.mt1]}>Teléfonos: (601)5970412 y (601)3736697 - 320 3981187.</Text>
                <Text variant="titleSmall" style={[primaryBold, styles.mt1]}>Página Web:<Link href={'https://www.defensorialg.com.co'} style={{...styles.link, ...primaryRegular}}>{'\n'}www.defensorialg.com.co</Link></Text>
              </View>
            </View>
            <View style={styles.mb5}>
                <Text variant="titleSmall" style={[primaryBold]}>Correo electrónico:</Text>
                <Link href={'mailto:reclamaciones@defensorialg.com.co'} style={{...styles.link, ...primaryRegular}}>reclamaciones@defensorialg.com.co</Link>
            </View>
            <View style={styles.mb5}>
              <Image style={styles.image} source={require('@/assets/images/general/logo_coopcentral.png')} resizeMode="contain"/>
            </View>      
          </ScrollView>
        </View>
    </ViewFadeIn>
  );
}