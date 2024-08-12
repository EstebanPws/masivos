import React, { useState } from "react";
import { View } from "moti";
import { Image, ImageSourcePropType } from "react-native";
import { styles } from "./home.styles";
import SideBar from "@/components/sideBar/sideBar";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import ButtonLogOut from "@/components/forms/buttons/buttonLogOut/buttonLogOut";
import Balance from "@/components/balance/balance";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import OptionsMain from "@/components/options/optionsMain/optionsMain";
import OptionsSecondary from "@/components/options/optionsSecondary/optionsSecondary";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import OperationsModal from "@/components/modals/operationsModal/operationsModal";

interface BntOptions {
  name: string;
  image: ImageSourcePropType;
  onPress: () => void;
}

export default function Page() {
  const { setActiveTab } = useTab();
  const [showOperationsRecharge, setShowOperationsRecharge] = useState(false);
  const { type } = useLocalSearchParams();

  useFocusEffect(() => {
    setActiveTab('/home/');
  });

  const handleCloseModal = () => {
    setShowOperationsRecharge(false);
    router.setParams({ type: '1' });
  };

  const button1Recharge: BntOptions = {
    name: 'Solicitar Recarga',
    image: require('@/assets/images/general/bolsa-de-dinero.png'),
    onPress: () => router.push({
      pathname: '/home/recharge/',
      params: { type: 0 }
    })
  };

  const button2Recharge: BntOptions = {
    name: 'PSE',
    image: require('@/assets/images/general/pse-logo.png'),
    onPress: () => router.push({
      pathname: '/home/recharge/',
      params: { type: 1 }
    })
  };

  return (
    <ViewFadeIn isWidthFull>
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.row}>
            <Image source={require('@/assets/images/general/logo.webp')} resizeMode="contain" style={styles.logo} />
            <ButtonLogOut />
          </View>
          <Balance />
          <View style={styles.options}>
            <OptionsMain
              onRecharge={() => setShowOperationsRecharge(true)}
            />
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('@/assets/images/general/visa.png')} resizeMode="contain" style={styles.image} />
          <ButtonsPrimary
            label="Solicitar tarjeta"
            style={styles.mt5}
            onPress={() => router.push('/home/cards/')}
          />
        </View>
        <OptionsSecondary />
        <View style={styles.sideBar}>
          <SideBar />
        </View>
      </View>
      {(showOperationsRecharge || type === '0') && (
        <OperationsModal
          button1={button1Recharge}
          button2={button2Recharge}
          onPress={handleCloseModal}
        />
      )}
    </ViewFadeIn>
  );
}