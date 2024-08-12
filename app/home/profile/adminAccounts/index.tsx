import React from "react";
import { Icon, Text } from "react-native-paper";
import { styles } from "./adminAccounts.styles";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import { useFocusEffect } from "expo-router";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import Constants from "expo-constants";
import { ScrollView, View } from "react-native";

const extra = Constants.expoConfig?.extra || {};
const {primaryBold, primaryRegular} = extra.text;

export default function Page() {
  const { setActiveTab, goBack } = useTab();
  
  useFocusEffect(() => {
    setActiveTab('/home/profile/adminAccounts/');
  });
  
  const handleBack = () => {
      goBack();
  };

  return (
    <ViewFadeIn isWidthFull>
        <HeaderForm
            onBack={() => handleBack()}
            title="Administración de cuentas"
        />
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View style={[styles.mb5, styles.center]}>
                <Icon
                    source={'toolbox'}
                    size={28}
                />
                <Text style={primaryRegular}>No hay resultados</Text>
            </View>
        </ScrollView>
    </ViewFadeIn>
  );
}