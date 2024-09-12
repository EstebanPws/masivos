import React, { useState, useCallback, useEffect } from "react";
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
import instanceWallet from "@/services/instanceWallet";
import { getData, setData } from "@/utils/storageUtils";

interface BntOptions {
  name: string;
  image: ImageSourcePropType;
  onPress: () => void;
}

export default function Page() {
  const { setActiveTab } = useTab();
  const [showOperationsRecharge, setShowOperationsRecharge] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const { type } = useLocalSearchParams();

  const fetchInfoAccount = async (account: string): Promise<string | null> => {
    const existInfoClient = await getData('infoClient');
  
    if (!existInfoClient) {
      try {
        const accountConsult = account.startsWith('0') ? account.slice(1) : account;
        const body = { id: accountConsult }; 
        const response = await instanceWallet.post('formView', body);
        const data = response.data;
  
        const infoClient = {
          infoClient: true,
          id: data.id,
          numDoc: data.cliente.docCli,
          tipoDoc: data.tipo_doc,
          firstName: data.cliente.nombres1,
          names: `${data.cliente.nombres1} ${data.cliente.nombres2}`,
          surnames: `${data.cliente.apellido1} ${data.cliente.apellido2}`,
          birthDate: data.cliente.fechaNac,
          phoneNumber: data.numero_celular,
          email: data.correo,
          ciudadRes: data.cliente.ciudadRes,
          barrio: data.barrio,
          direRes: data.cliente.dirRes.trim()
        };
        
        await setData('infoClient', infoClient);
  
        return data.cliente.nombres1;
      } catch (error) {
        const infoClient = { infoClient: false };
        await setData('infoClient', infoClient);
        return null; 
      }
    }
  
    return existInfoClient.firstName;
  };  

  useFocusEffect(
    useCallback(() => {
      setActiveTab('/home/');
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

  const button1Recharge: BntOptions = {
    name: 'Solicitar Recarga',
    image: require('@/assets/images/general/bolsa-de-dinero.png'),
    onPress: () => router.push({
      pathname: '/home/recharge',
      params: { type: 0 }
    })
  };

  const button2Recharge: BntOptions = {
    name: 'PSE',
    image: require('@/assets/images/general/pse-logo.png'),
    onPress: () => router.push({
      pathname: '/home/recharge',
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
          {shouldRefresh && <Balance onMount={fetchInfoAccount}/>}
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
            onPress={() => router.replace('/home/cards')}
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