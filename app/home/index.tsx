import React, { useState, useCallback, useRef } from "react";
import { View } from "moti";
import { Animated, Image, ImageSourcePropType, ScrollView } from "react-native";
import styles from "./home.styles";
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
import { getData, setData } from "@/utils/storageUtils";
import instanceWallet from "@/services/instanceWallet";
import InfoModalConfirm from "@/components/modals/infoModalConfirm/infoModalConfirm";
import { Icon, Text } from "react-native-paper";
import { useAuth } from "@/components/auth/context/authenticationContext";
import Constants from "expo-constants";
import axios from "axios";

const extra = Constants.expoConfig?.extra || {};
const {primaryRegular} = extra.text;

interface BntOptions {
  name: string;
  image: ImageSourcePropType;
  onPress: () => void;
}

export default function Page() {
  const {logout} = useAuth();
  const { setActiveTab, activeLoader } = useTab();
  const [showOperationsRecharge, setShowOperationsRecharge] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const { type } = useLocalSearchParams();
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const fetchInfoAccount = async (account: string): Promise<string | null> => {
    const existInfoClient = await getData('infoClient');
  
    if (!existInfoClient) {
      try {
        const accountConsult = account.startsWith('0') ? account.slice(1) : account;
        const body = { id: accountConsult }; 
        console.log("response2: ", body)
        const response = await instanceWallet.post('formView', body);
        const data = response.data;
        console.log("response1: ", response)

        
        const infoClient = {
          infoClient: true,
          id: data.id,
          numDoc: data.account[0].no_docum,
          tipoDoc: data.account[0].tipo_doc,
          firstName: data.nombres1,
          firstSurname: data.apellido1,
          names: `${data.nombres1} ${data.nombres2}`,
          surnames: `${data.apellido1} ${data.apellido2}`,
          birthDate: data.account[0].fecha_nac,
          phoneNumber: data.account[0].numero_celular,
          email: data.account[0].correo,
          ciudadRes: data.ciudadRes,
          barrio: data.account[0].barrio,
          direRes: data.dirRes.trim()
      };
        
        await setData('infoClient', infoClient);
  
        return data.cliente ? data.cliente.nombres1 : data.nombres1;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("response3: ", error.response)

          }        const infoClient = { infoClient: false };
        await setData('infoClient', infoClient);
  
        return null; 
      }
    }
  
    return existInfoClient.firstName;
  };  

  useFocusEffect(
    useCallback(() => {
      setActiveTab('/home');
      setShouldRefresh(true);

      return () => {
        setShouldRefresh(false);
      };
    }, [])
  );

  const handleCloseModal = () => {
    setShowOperationsRecharge(false);
    router.setParams({ type: '1' });
  };

  // const button1Recharge: BntOptions = {
  //   name: 'Solicitar Recarga',
  //   image: require('@/assets/images/general/bolsa-de-dinero.png'),
  //   onPress: () => router.push({
  //     pathname: '/home/recharge',
  //     params: { type: 0 }
  //   })
  // };

  const button2Recharge: BntOptions = {
    name: 'PSE',
    image: require('@/assets/images/general/pse-logo.png'),
    onPress: () => router.push({
      pathname: '/home/recharge',
      params: { type: 1 }
    })
  };

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, 200], // Ajusta el rango según la altura del scroll
    outputRange: [0, -100], // La imagen se mueve hacia arriba
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0], // La opacidad desaparece al hacer scroll
    extrapolate: "clamp",
  });

  const handleShowConfirm = (value:boolean) => {
    setShowModalConfirm(value)
  }

  if (!shouldRefresh) {
    return null;
  }

  return (
    <ViewFadeIn isWidthFull>
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={[styles.row]}>
            <Image
              source={require("@/assets/images/general/logo.webp")}
              resizeMode="contain"
              style={styles.logo}
            />
            <ButtonLogOut  showConfirm={handleShowConfirm}/>
          </View>
          {shouldRefresh && <Balance onMount={fetchInfoAccount} />}
          <View style={styles.options}>
            <OptionsMain onRecharge={() => setShowOperationsRecharge(true)} />
          </View>
        </View>
        <View style={styles.containerScroll}>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            contentContainerStyle={{ paddingBottom: 115 }}
          >
            {/*<Animated.View
              style={[
                styles.imageContainer,
                {
                  transform: [{ translateY: imageTranslateY }],
                  opacity: imageOpacity,
                },
              ]}
            >
              <Image
                source={require("@/assets/images/general/visa.png")}
                resizeMode="contain"
                style={styles.image}
              />
              <ButtonsPrimary
                label="Solicitar tarjeta"
                style={styles.mt5}
                onPress={() => router.replace("/home/cards")}
              />
            </Animated.View>*/}
            <OptionsSecondary />
          </Animated.ScrollView>
        </View>
        <View style={styles.sideBar}>
          <SideBar />
        </View>
      </View>
      {(showOperationsRecharge || type === "0") && (
        <OperationsModal
          // button1={button1Recharge}
          button2={button2Recharge}
          onPress={handleCloseModal}
        />
      )}
      {showModalConfirm && (
        <InfoModalConfirm 
            onPress={() => logout()}
            onCancel={() => setShowModalConfirm(false)}
            label1='Si'
            label2='No'>
            <View style={styles.centerContainer}>
                <Icon source={'information'} size={50} color={'#f8971d'} />
                <Text variant="labelLarge" style={primaryRegular}>¿Quieres cerrar sesión?</Text>
            </View>
        </InfoModalConfirm>
      )}
    </ViewFadeIn>
  );
}