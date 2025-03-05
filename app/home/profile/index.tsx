import React, { useEffect, useState } from "react";
import { Icon, MD2Colors, Text } from "react-native-paper";
import styles from "./profile.styles";
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
import { getBalance, getData, getNumberAccount } from "@/utils/storageUtils";
import instanceWallet from "@/services/instanceWallet";
import InfoModal from "@/components/modals/infoModal/infoModal";
import InfoModalConfirm from "@/components/modals/infoModalConfirm/infoModalConfirm";
import { errorCancelAccount } from "@/utils/listUtils";

const extra = Constants.expoConfig?.extra || {};
const {colorPrimary, colorSecondary} = extra;
const {primaryBold, primaryRegular} = extra.text;
const expo = Constants.expoConfig?.name || '';

export default function Page() {
  const { setActiveTab, goBack, activeLoader, desactiveLoader } = useTab();
  const { logout } = useAuth();
  const [numberAccount, setNumberAccount] = useState('');
  const [info, setInfo] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalConfirmLogout, setShowModalConfirmLogout] = useState(false);
  const [typeModal, setTypeModal] = useState<'error' | 'success'>('error');
  const [lastLogin, setLastLogin] = useState('');

  useEffect(() => {
    const fetchInfo = async () => {
      const infoClient = await getData('infoClient');
      const lastLog = await getData('lastLogin');
      let utcDate;
      if(lastLog){
        utcDate = new Date(lastLog);
      } else {
        utcDate = new Date();
      }

      const lastLogFinal = utcDate.toLocaleString('es-CO', { 
        hour12: true, 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      const account = await getNumberAccount();

      setInfo(infoClient);
      setLastLogin(lastLogFinal);
      setNumberAccount(account!);
    }

    fetchInfo();
  }, []);

  useFocusEffect(() => {
    setActiveTab('/home/profile/');
  });

  const fetchDeleteAccount = async () => {
    const rawBalance = String(await getBalance());
    
    const balance = parseFloat(rawBalance.replace(/,/g, '').trim());

    console.log("balance limpio: ", balance);

    if (balance === 0) {
      activeLoader();
      const infoClient = await getData('infoClient');
      const account = await getNumberAccount();
      const body = {
        tipo_doc : infoClient.tipoDoc,
        no_doc: infoClient.numDoc,
        cuenta: account?.startsWith('0') ? account.slice(1) : account,
        tipo_oper_cta:"3"
      }

      await instanceWallet.post('accountOperations', body)
      .then(async (response) => {        
        const data = response.data;
       
        if(data.status === 200){
          setTypeModal('success');
          setMessageModal('Tu cuenta ha sido cancelada con éxito.');
          setShowModal(true);
        }
        desactiveLoader();
      })
      .catch((err) => {
        const error = err.response.data.message;
        const errorCode = extractErrorCode(error);
        if (errorCancelAccount[errorCode as keyof typeof errorCancelAccount]) {
            setMessageModal(errorCancelAccount[errorCode as keyof typeof errorCancelAccount]);
        } else {
            setMessageModal("Hubo un error al intentar enviar el formulario");
        }
        setTypeModal('error');
        setShowModal(true);
        desactiveLoader();
      });
    } else {
      setTypeModal('error');
      setMessageModal('Para cancelar tu cuenta, asegúrate de que el saldo esté en $0 primero.');
      setShowModal(true);
    }
  }

  const extractErrorCode = (message: string) => {
    const regex = /\[(\d+)\]/;
    const match = message.match(regex);
    return match ? match[1] : null;
  };

  const handleCloseModal = async (type: number) => {
    if(type === 0) {
      await logout();
    }

    setShowModal(false);
  }
  
  const handleBack = () => {
      goBack();
  };

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
          <Text variant='labelSmall' style={[primaryBold, styles.text, styles.mt1]}>{info ? `${info.names} ${info.surnames}` : 'Cargando...'}</Text>
          <View style={[styles.mt1, styles.id]}>
            <Text variant='labelSmall' style={[primaryBold, styles.text]}>ID: {info ? info.id : 'Cargando...'}</Text>
          </View>
          <LinearGradient
            colors={[colorPrimary, colorSecondary]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.account}
          >
            <Text variant='labelSmall' style={[primaryBold, styles.text]}>Número de cuenta: <Text  style={[primaryRegular, styles.text]}>{numberAccount}</Text></Text>
          </LinearGradient>
        </View> 
      </LinearGradient>
      <View style={styles.center}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mb5}>
            <Text variant="labelLarge" style={[primaryBold]}>Cuentas bancarias</Text>
            <OptionsProfile
              onPress={() => router.replace('/home/profile/adminAccounts')}
              title="Administración de Contactos de Transferencias"
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
              onPress={() => setShowModalConfirm(true)}
              title={`Darse de baja de ${expo}`}
            />
            <View style={styles.lastLogin}>
              <Text style={primaryBold}>Fecha y hora de última conexión:</Text>
              <Text style={primaryRegular}>{lastLogin}</Text>
            </View>
          </View>
          <View style={styles.mb5}>
            <ButtonsPrimary 
              label="Salir de la billetera"
              onPress={() => setShowModalConfirmLogout(true)}
            />
          </View>
        </ScrollView>
      </View>
      {showModal && (
        <InfoModal 
          type={typeModal}
          message={messageModal}
          onPress={() => {handleCloseModal(typeModal === 'success' ? 0 : 1); setShowModalConfirm(false)}} 
          isVisible={showModal}       
        />
      )}
      {showModalConfirm && (
        <InfoModalConfirm 
          onPress={() => fetchDeleteAccount()}
          onCancel={() => setShowModalConfirm(false)}>
            <View style={styles.centerContainer}>
              <Icon source={'information'} size={50} color={`${MD2Colors.blue700}`} />
              <Text variant="labelLarge" style={primaryRegular}>¿Estás seguro de eliminar la cuenta?</Text>
            </View>
        </InfoModalConfirm>
      )}
      {showModalConfirmLogout&& (
        <InfoModalConfirm 
            onPress={() => logout()}
            onCancel={() => setShowModalConfirmLogout(false)}
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