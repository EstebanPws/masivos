import React, { useState } from "react";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, Text } from "react-native-paper";
import { styles } from "./contactSend.styles";
import Inputs from "@/components/forms/inputs/inputs";
import { ScrollView, TouchableOpacity, View } from "react-native";
import instanceWallet from "@/services/instanceWallet";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import Modal from "react-native-modal";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";

const extra = Constants.expoConfig?.extra || {};
const expo = Constants.expoConfig?.name || '';
const {primaryBold, primaryRegular} = extra.text;
const {colorPrimary, colorSecondary} = extra;

interface ListAccounts {
    number: number;
    estado: string;
}

interface ContactSendProps {
    onResponseContact: (response: any) => void;
}

export default function ContactSend({onResponseContact }: ContactSendProps) {
    const {activeLoader, desactiveLoader} = useTab();
    const [number, setNumber] = useState('');
    const [listAccounts, setListAccounts] = useState<any>([]);
    const [isVisible, setIsVisible] = useState(false);

    const fetchListContacts = async () => {
        let body;
        if (number) {
            body = { numero_celular: number }
        } else {
            return "Debe ingresar el número de celular.";
        }

        try {
            const response = await instanceWallet.post('getcelularP2P', body);
            let final;
            if(response.data.length !== 0) {
                const data = response.data;
                const document = response.data[0].cliente.docCli;
                const account = response.data[0].no_cuenta;
                if(account.startsWith('73000') || account.startsWith('87300')){
                    const stateAccounts = await fetchListAccounts(document, account);
                    const activeAccounts = stateAccounts.filter((account: { estado: string; }) => account.estado === "A");
                    const uniqueAccounts = new Set<number>();

                    const result = data.filter((item: { no_cuenta: string; }) => {
                        const accountNumber = parseInt(item.no_cuenta);
                        const isActiveAccount = activeAccounts.some((activeAccount: { number: number; }) => activeAccount.number === accountNumber);
                        
                        if (isActiveAccount && !uniqueAccounts.has(accountNumber)) {
                            uniqueAccounts.add(accountNumber); 
                            return true; 
                        }

                        return false;
                    });

                    setListAccounts(result);
                    setIsVisible(true);
                    final= 'success';
                } else {
                    final = `El número de celular ingresado no tiene cuenta o depósito en ${expo}`;
                }
            } else {
                final = `El número de celular ingresado no tiene cuenta o depósito en ${expo}`;
            }
            return final;
        } catch (error) {
            console.log(error);
            
            return "Hubo un error al intentar consultar los datos del número ingresado, por favor intentelo de nuevo en unos minutos.";
        }
    };

    const fetchListAccounts = async (document: string, account: string) => {
        activeLoader();
        const bodyAccount = {
            no_doc : document,
            modalidad : account.startsWith('7') ? '0' : '8',
            oficina: "73",
            estado: "T"
        }

        let accounts: any = [];
        await instanceWallet.post('getAccounts', bodyAccount)
        .then(async (response) => {
            const data = response.data;
            
            if(response.data.data[0]){
                accounts = data.data.map((account: any) => {
                    const numberAccounts: ListAccounts = {
                        number: account.CUENTA,
                        estado: account.ESTADO
                    }
    
                    return numberAccounts;
                });
    
            } else {
                const accountsMap = [data.data];
                accounts = accountsMap.map((account: any) => {
                    const numberAccounts: ListAccounts = {
                        number: account.CUENTA,
                        estado: account.ESTADO
                    }
    
                    return numberAccounts;
                });
            }
        })
        .catch((err) => {
            console.log(err.response.data);
        });
        desactiveLoader();

        return accounts;
    }

    const handleErrorList = async () => {
        const contact = await fetchListContacts();
        if(contact !== 'success') {
            onResponseContact(contact);
        }
    }

    const handleResult = async (contact: any) => {
        onResponseContact(contact);
    };

    return (
        <>
            <LinearGradient
                colors={[colorPrimary, colorSecondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.container}
            >
                <Text variant='labelSmall' style={[primaryBold, styles.text]}>
                    Ingresa el número de celular al que quieres enviar dinero
                </Text>
                <View style={styles.row}>
                    <View style={{width: '80%'}}>
                        <Inputs
                            isSecureText={false}
                            isRequired={false}
                            value={number}
                            onChangeText={setNumber}
                            placeholder="Ingresa el número de celular"
                            keyboardType="numeric"
                            maxLength={10}
                        />
                    </View>
                    <TouchableOpacity style={styles.touchable} onPress={async () =>  handleErrorList()}>
                        <Icon
                            source={'arrow-right'}
                            size={24}
                        />
                    </TouchableOpacity>
                </View>
                <Text variant='labelSmall' style={[primaryBold, styles.text]}>
                    ó busque el contacto a continuación:
                </Text>
            </LinearGradient>
            <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
                <View style={styles.modalContainer}>
                    <ScrollView>
                        <View style={styles.scrollPadding}>
                            <Text variant="titleSmall" style={[primaryBold, styles.text, styles.subtitle]}>Por favor selecciona la cuenta a la que quieres enviar el dinero.</Text>
                            {listAccounts.map((account: any, index: React.Key | null | undefined) => (
                                <View key={index} style={styles.account}>
                                    <TouchableOpacity onPress={() => handleResult(account)}>
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
                                                <Text variant="titleMedium" style={[primaryBold, styles.text]}>{account.no_cuenta.startsWith('7') ? `0${account.no_cuenta}` : account.no_cuenta}</Text>
                                            </LinearGradient>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                    <ButtonsPrimary
                        label='Cerrar'
                        onPress={() => setIsVisible(false)}
                    />
                </View>
            </Modal>
        </>
    );
}