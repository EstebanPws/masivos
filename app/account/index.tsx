import React, { useEffect, useState } from "react";
import { View } from "moti";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { Icon, MD3Colors, Text } from "react-native-paper"
import styles from "./account.styles";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import ButtonLogOut from "@/components/forms/buttons/buttonLogOut/buttonLogOut";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { useAuth } from "@/components/auth/context/authenticationContext";
import instanceWallet from "@/services/instanceWallet";
import { getData, setData, setNumberAccount } from "@/utils/storageUtils";
import { router, useFocusEffect } from "expo-router";
import InfoModal from "@/components/modals/infoModal/infoModal";
import InfoModalConfirm from "@/components/modals/infoModalConfirm/infoModalConfirm";

const extra = Constants.expoConfig?.extra || {};
const {primaryBold, primaryRegular} = extra.text;
const {colorPrimary, colorSecondary, idApp} = extra;

interface ListAccounts {
    number: number;
    estado: string;
}

export default function Page() {
    const {documentNumber, modalidad, activeLoader, desactiveLoader, isAuthenticated, logout} = useAuth();
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [listAccounts, setListAccounts] = useState<ListAccounts[]>([]);
    const [typeResponse, setTypeResponse] = useState<"info" | "success" | 'error'>('error');
    const [message, setMessage] = useState("Hubo un error al intentar realizar la petición.");
    const [name, setName] = useState('');
    const [showModalConfirm, setShowModalConfirm] = useState(false);

    useFocusEffect(() => {
        if (!isAuthenticated) {
            router.replace('/');
        }
    });

    const fetchInfoAccount = async (account: string) => {
        const existInfoClient = await getData('infoClient');
        if (!existInfoClient) {
            const accountConsult = account;
            const body = { id: String(accountConsult) }; 
            await instanceWallet.post('formView', body)
            .then(async (response) => {
                const data = response.data;

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

                setName(`${data.nombres1} ${data.apellido1}`);
                await setData('infoClient', infoClient);
            })
            .catch(async (err) => {
                if (err && err.message) {
                    setMessage(err.response.data.message);
                }  else {
                    setMessage("Hubo un error al realizar la petición.");
                }
                setShowErrorModal(true);
                setTypeResponse('error');
                const infoClient = { infoClient: false };
                await setData('infoClient', infoClient);
            })
        } else {
            setName(`${existInfoClient.firstName} ${existInfoClient.firstSurname}`);
        }

        desactiveLoader();
    };  

    const fetchListAccounts = async () => {
        activeLoader();
        const bodyAccount = {
            no_doc : documentNumber,
            modalidad : modalidad,
            estado: "T"
        }

        await instanceWallet.post('getAccounts', bodyAccount)
        .then(async (response) => {
            const data = response.data;
            let  accounts;
            
            if(response.data.data[0]){
                accounts = data.data.map((account: any) => {
                    const numberAccounts: ListAccounts = {
                        number: account.CUENTA,
                        estado: account.ESTADO
                    }
    
                    return numberAccounts;
                });
 
                await fetchInfoAccount(response.data.data[0].CUENTA);
            } else {
                const accountsMap = [data.data];
                accounts = accountsMap.map((account: any) => {
                    const numberAccounts: ListAccounts = {
                        number: account.CUENTA,
                        estado: account.ESTADO
                    }
    
                    return numberAccounts;
                });
                await fetchInfoAccount(response.data.data.CUENTA)
            }

            setListAccounts(accounts);
        })
        .catch((err) => {
            if (err && err.message) {
                setMessage(err.response.data.message);
            }  else {
                setMessage("Hubo un error al realizar la petición.");
            }
            setShowErrorModal(true);
            setTypeResponse('error');
        });
    }

    useEffect(() =>{
        fetchListAccounts();
    }, []);

    const handleSelectAccount = async (item: ListAccounts) => {
        await setNumberAccount(item.number.toString().startsWith('8') ? `${item.number}` : `0${item.number}`);
        router.push('/home');
    }

    const handleShowConfirm = (value:boolean) => {
        setShowModalConfirm(value)
    }
    
    return (
        <ViewFadeIn isWidthFull>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Image source={require('@/assets/images/general/logo.webp')} resizeMode="contain" style={styles.logo} />
                    <ButtonLogOut showConfirm={handleShowConfirm}/>
                </View>
                <View style={{marginTop: -50}}>
                    <Text variant="headlineSmall" numberOfLines={5} style={[primaryBold, styles.text, {color: MD3Colors.neutralVariant10}]}>¡Bienvenido {name}!</Text>
                    <Text variant="titleSmall" style={[primaryBold, styles.text, styles.subtitle]}>Por favor selecciona la cuenta a la que quieres ingresar.</Text>
                </View>
                <ScrollView>
                    <View style={styles.scrollPadding}>
                        {listAccounts.map((account, index) => (
                            (account.estado === 'A' && (
                                <View key={index} style={styles.account}>
                                <TouchableOpacity onPress={() => handleSelectAccount(account)}>
                                    <LinearGradient
                                        colors={[colorPrimary, colorSecondary]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.balance}
                                    >
                                        <Text variant="titleSmall" style={[primaryRegular, styles.text]}>Número de 
                                            <Text variant="titleSmall" style={[primaryBold, styles.text]}> cuenta</Text>
                                        </Text>
                                        <LinearGradient
                                            colors={[colorPrimary, colorSecondary]}
                                            start={{ x: 1, y: 0 }}
                                            end={{ x: 0, y: 0 }}
                                            style={styles.balance}
                                        >
                                            <Text variant="titleMedium" style={[primaryBold, styles.text]}>{account.number.toString().startsWith('8') ? `${account.number}` : `0${account.number}`}</Text>
                                        </LinearGradient>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            ))
                        ))}
                    </View>
                </ScrollView>
            </View>
            {showErrorModal && (
                <InfoModal
                    isVisible={showErrorModal}
                    type={typeResponse}
                    message={message}
                    onPress={() => logout()}
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