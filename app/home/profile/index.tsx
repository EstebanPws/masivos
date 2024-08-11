import React from "react";
import { Text } from "react-native-paper";
import { styles } from "./profile.styles";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import { useFocusEffect } from "expo-router";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import HeaderForm from "@/components/headers/headerForm/headerForm";

export default function Page() {
  const { setActiveTab, goBack } = useTab();
  
  useFocusEffect(() => {
    setActiveTab('/home/profile/');
  });
  
  const handleBack = () => {
      goBack();
  };  

  return (
    <ViewFadeIn isWidthFull>
      <HeaderForm
          onBack={() => handleBack()}
          title="Perfil"
      />
    </ViewFadeIn>
  );
}