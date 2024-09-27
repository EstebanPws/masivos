import React from "react";
import { styles } from "./comission.styles";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import { Link, useFocusEffect } from "expo-router";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { ScrollView, View, Image } from "react-native";
import { Text } from "react-native-paper";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold, primaryRegular } = extra.text;
const expo = Constants.expoConfig?.name || '';
const { correo } = extra.contacto;

export default function Page() {
  const { setActiveTab, goBack } = useTab();
  
  useFocusEffect(() => {
    setActiveTab('/home/profile/comissions/');
  });
  
  const handleBack = () => {
    goBack();
  };

  const tarifas = [
    { label: "Cuota de manejo", amount: "$0" },
    { label: "Recarga billetera desde redes aliados de puntos físicos", amount: "$0" },
    { label: "Recargar billetera desde PSE", amount: "$0" },
    { label: "Retiro dinero puntos físicos aliados", amount: "$0" },
    { label: "Retiro de dinero en cajeros automáticos (ATM's)", amount: "$6.000" },
    { label: "Transferencias entre billeteras", amount: "$0" },
    { label: "Transferencias interbancarias (otros bancos)", amount: "$0" },
    { label: "Compras en plataformas de contenidos digital", amount: "$0" },
    { label: "Pagos de servicios y recargas móviles", amount: "$0" }
  ];

  return (
    <ViewFadeIn isWidthFull>
      <HeaderForm onBack={() => handleBack()} title="Tarifas" />
      <View style={styles.info}>
        <ScrollView contentContainerStyle={[styles.container]} showsVerticalScrollIndicator={false}>
          <View style={styles.center}>
            {tarifas.map((tarifa, index) => (
              <View key={index} style={[styles.mb5, styles.row]}>
                <Text variant="titleSmall" style={[primaryRegular, styles.label]}>
                  {tarifa.label}
                </Text>
                <Text variant="titleSmall" style={[primaryBold, styles.amount]}>
                  {tarifa.amount}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.mb5}>
            <Image 
              style={styles.image} 
              source={require('@/assets/images/general/logo_coopcentral.png')} 
              resizeMode="contain" 
            />
          </View>
        </ScrollView>
      </View>
    </ViewFadeIn>
  );
}