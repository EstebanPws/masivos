import React from "react";
import { View } from "moti";
import { Image, TouchableOpacity } from "react-native";
import { styles } from "./home.styles";
import SideBar from "@/components/sideBar/sideBar";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import ButtonLogOut from "@/components/forms/buttons/buttonLogOut/buttonLogOut";
import Balance from "@/components/balance/balance";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import OptionsMain from "@/components/options/optionsMain/optionsMain";
import OptionsSecondary from "@/components/options/optionsSecondary/optionsSecondary";

export default function Page() {  
  return (
    <ViewFadeIn isWidthFull>
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.row}>
            <Image source={require('@/assets/images/general/logo.webp')} resizeMode="contain" style={styles.logo} />
            <ButtonLogOut/>
          </View>
          <Balance/>
          <OptionsMain />
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('@/assets/images/general/visa.png')} resizeMode="contain" style={styles.image}/>
          <ButtonsPrimary 
            label="Solicitar tarjeta"
            style={styles.mt5}
            onPress={() => console.log('rger')}
          />
        </View>
        <OptionsSecondary />
        <View style={styles.sideBar}>
          <SideBar/>
        </View>
      </View>
    </ViewFadeIn>
  );
}