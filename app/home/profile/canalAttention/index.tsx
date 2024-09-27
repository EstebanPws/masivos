import React from "react";
import { styles } from "./canalAttention.styles";
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
    setActiveTab('/home/profile/canalAttention/');
  });
  
  const handleBack = () => {
      goBack();
  };

  return (
    <ViewFadeIn isWidthFull>
        <HeaderForm
            onBack={() => handleBack()}
            title="Canales de atención"
        />
        <View style={styles.info}>
          <ScrollView contentContainerStyle={[styles.container]} showsVerticalScrollIndicator={false}>
            <View style={styles.center}>
              <View style={styles.mb5}>
                <Text variant="titleSmall" style={[primaryRegular]}>Los canales de atención del Banco Cooperativo Coopcentral para peticiones, quejas, reclamos y/o sugerencias son:</Text>
              </View>
              <View style={styles.mb5}>
                <Text variant="titleSmall" style={[primaryBold]}>Correo electrónico:</Text>
                <Link href={`mailto:sac@coopcentral.com.co`} style={{...styles.link, ...primaryRegular}}>sac@coopcentral.com.co</Link>
                <Text variant="titleSmall" style={[primaryRegular]}>PBX: 6017431088</Text>
                <Text variant="titleSmall" style={[primaryRegular]}>Celular: 3232540456</Text>
                <Text variant="titleSmall" style={[primaryRegular]}>Página Web:<Link href={'https://www.coopcentral.com.co/apps_web/pqrs/'} style={{...styles.link, ...primaryRegular}}>{'\n'}https://www.coopcentral.com.co/apps_web/pqrs/</Link></Text>
              </View>
            </View>
            <View style={styles.mb5}>
                <Text variant="titleSmall" style={[primaryBold]}>Reglamentos:</Text>
                <Link href={'https://paynopain-changeit-test.s3.eu-west-1.amazonaws.com/documents/payments-way/PW_Reglamento_deposito_bajo_monto.pdf'} style={{...styles.link, ...primaryRegular}}>Reglamento depósito ordinario.</Link>
                <Link href={'https://paynopain-changeit-test.s3.eu-west-1.amazonaws.com/documents/payments-way/PW_Instructivo_uso_tarjeta_debito.pdf'} style={{...styles.link, ...primaryRegular}}>Instructivo de uso de tarjeta débito física o virtual.</Link>
            </View>
            <View style={styles.mb5}>
                <Text variant="titleSmall" style={[primaryBold]}>Contacto {expo}:</Text>
                <Link href={`mailto:${correo}`} style={{...styles.link, ...primaryRegular}}>{correo}</Link>
                <View style={styles.mb5}>
                  <Image style={styles.image} source={require('@/assets/images/general/logo_coopcentral.png')} resizeMode="contain"/>
                </View>
            </View>
           
          </ScrollView>
        </View>
    </ViewFadeIn>
  );
}