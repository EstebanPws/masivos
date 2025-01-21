import React, { Fragment, useEffect, useState } from "react";
import { View, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Text } from "react-native-paper";
import styles from "./validateExistAccount.styles";
import { useRouter } from "expo-router";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import Constants from "expo-constants";
import HeaderSecondary from "@/components/headers/headerSecondary/headerSecondary";
import { AnimatePresence, MotiView } from "moti";
import { getData, setData } from "@/utils/storageUtils";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import ButtonsSecondary from "@/components/forms/buttons/buttonSecondary/button";
import Inputs from "@/components/forms/inputs/inputs";
import SearchSelect from "@/components/forms/select/searchSelect/select";
import { listDocumentType } from "@/utils/listUtils";
import { useAuth } from "@/components/auth/context/authenticationContext";
import instanceWallet from "@/services/instanceWallet";
import InfoModal from "@/components/modals/infoModal/infoModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const extra = Constants.expoConfig?.extra || {};
const { primaryRegular } = extra.text;
const { idApp } = extra

export default function Page() {
    const { activeLoader, desactiveLoader } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [typeDocument, setTypeDocument] = useState('C');
    const [inputDocument, setInputDocument] = useState('');
    const [message, setMessage] = useState('');
    const [typeResponse, setTypeResponse] = useState<"info" | "success" | 'error'>('error');
    const [responseConsultAccounts, setResponseConsultAccounts] = useState<number>(1);

    useEffect(() => {
        const fetchEmtyData = async () => {
            await setData('registrationForm', '');
        }

        fetchEmtyData();
    }, [])

    const [formData] = useState({
        modalidad: ''
    });

    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handleConfirm = (type: number) => {
        router.replace('/');
        setShowModal(false);
    }

    const handleNext = async () => {
        router.push('/auth/signUp');
        await setData('existVinculacion', false);
        setShowModal(false);
    }

    const handleSelect = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
        setter(item.value);
    };

    const fetchListAccounts = async () => {
        activeLoader();

        await AsyncStorage.setItem("numberDocument", inputDocument)
        const bodyAccount = {
            no_doc: inputDocument,
            modalidad: "8",
            estado: "T",
            idApp: idApp
        }

        await instanceWallet.post('getAccountsByClient', bodyAccount)
            .then(async (response) => {
                const datos = response.data;
                console.log("DATOS: ", datos)
                if(datos.data){
                    const data = datos.data;
                    if(data.ESTADO === 'A' || data.ESTADO === 'B' || data.ESTADO === 'I'){
                        setMessage('El número de documento ya se encuentra registrado. \n\n Por favor inicia sesión con tus credenciales.');
                        setTypeResponse('error');
                        setShowModal(true);
                        setResponseConsultAccounts(0);
                    }else if(Array.isArray(data)){
                        const accounts = data.filter((acc: { ESTADO: string; }) => {
                            return acc.ESTADO === 'A' || acc.ESTADO === 'B' || acc.ESTADO === 'I';
                        });

                        if (accounts.length > 0) {
                            setMessage('El número de documento ya se encuentra registrado. \n\n Por favor inicia sesión con tus credenciales.');
                            setTypeResponse('error');
                            setShowModal(true);
                            setResponseConsultAccounts(0);
                        } else {
                            handleNext();
                        }
                    } else {
                        handleNext();
                    }
                }
            })
            .catch((err) => {
                console.log(err)
                if (err && err.response && err.response.data) {
                    if (err.response.data.status !== 404) {
                        setShowModal(true);
                        setMessage('Hubo un error al intentar realizar tu registro en este momento.\n\nPor favor intentalo más tarde.');
                        setTypeResponse('error');
                        setResponseConsultAccounts(0);
                    }  else {
                        handleNext();
                    }
                } else {
                    setMessage("Hubo un error al realizar la petición.");
                    setShowModal(true);
                    setResponseConsultAccounts(0);
                }
            })
            .finally(() => {
                desactiveLoader();
            });
    }

    return (
        <>
            <ViewFadeIn isWidthFull>
                <View style={styles.headerContainer}>
                    <HeaderSecondary type={1} onBack={handleBack} />
                </View>
                <View style={styles.mt5}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.containerText}>
                            <Text variant="titleMedium" style={{ ...styles.text, ...primaryRegular, ...styles.mb5 }}>
                                Al continuar estás creando un depósito en el Banco Cooperativo Coopcentral.
                            </Text>
                            <View style={styles.mb5}>
                                <SearchSelect
                                    isRequired
                                    label="Tipo de documento"
                                    data={listDocumentType}
                                    placeholder="Selecciona una opción"
                                    onSelect={handleSelect(setTypeDocument)}
                                    selectedValue={typeDocument}
                                    disabled
                                />
                            </View>
                            <View style={styles.mb5}>
                                <Inputs
                                    label="Número de documento"
                                    placeholder="Escribe tu número de documento"
                                    isSecureText={false}
                                    isRequired={true}
                                    keyboardType="numeric"
                                    onChangeText={setInputDocument}
                                    value={inputDocument}
                                />
                            </View>
                            <Text variant="titleMedium" style={[styles.text, primaryRegular, styles.mb5]}>
                                Masivos es corresponsal digital del Banco Cooperativo Coopcentral
                            </Text>
                            <View style={styles.mb5}>
                                <Image style={styles.image} source={require('@/assets/images/general/logo_coopcentral.png')} resizeMode="contain" />
                            </View>
                            <View style={[styles.row]}>
                                <ButtonsSecondary
                                    label="Rechazar"
                                    onPress={() => { router.replace('/') }}
                                />
                                <ButtonsPrimary
                                    label="Aceptar"
                                    onPress={() => { fetchListAccounts() }}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ViewFadeIn>
            <AnimatePresence>
                {(showModal) && (
                    <Fragment key={'errorAccounts'}>
                        <InfoModal
                            title=""
                            onPress={() => { handleConfirm(responseConsultAccounts); }}
                            type={typeResponse}
                            message={message}
                            isVisible={showModal}
                        />
                    </Fragment>
                )}
            </AnimatePresence>
        </>

    );
}