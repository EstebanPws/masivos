import React, { useState } from "react";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, Text } from "react-native-paper";
import styles from "./contactSend.styles";
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
    const [contactSelect, setContactSelect] = useState<any>();
    
    const fetchListContacts = async () => {
        let body;
        if (number) {
            body = { 
                numero_celular: number
            }
        } else {
            return "Debe ingresar el número de celular.";
        }

        try {
            const response = await instanceWallet.post('getcelularP2P', body);
            let final;
            if(response.data.length !== 0) {
                const data = response.data;
                const accountValid = data.filter((account: any) => {
                    let accValid
                    if(account.account[0].no_cuenta.startsWith('73000') || account.account[0].no_cuenta.startsWith('87300')){
                        accValid = account.account[0].no_cuenta;
                    }
                    return accValid
                })

                const document = accountValid[0].docCli;
                const account = accountValid[0].account[0].no_cuenta;
                
                if(account.startsWith('73000') || account.startsWith('87300')){
                    const stateAccounts = await fetchListAccounts(document, account);
                    const activeAccounts = stateAccounts.filter((account: { estado: string; }) => account.estado === "A");
                    const uniqueAccounts = new Set<number>();
                    const result = data.filter((item: { account: any; }) => {
                        let accountNumbers = item.account.filter((accounts: { no_cuenta: string; }) => parseInt(accounts.no_cuenta)); 
                        
                        const listAccountNumbers = accountNumbers.filter((accountNumber: any) => {
                            const isActiveAccount = activeAccounts.some((activeAccount: { number: number; }) => { 
                                return activeAccount.number === parseInt(accountNumber.no_cuenta);
                            });

                            if (isActiveAccount && !uniqueAccounts.has(accountNumber.no_cuenta)) {
                                uniqueAccounts.add(accountNumber.no_cuenta); 
                                return true; 
                            }

                            return false;
                        })
                        
                        return listAccountNumbers.length > 0;
                        
                    });
                                      
                    let contactSelectInfo = {
                        docCli: data[0].docCli,
                        nombres1: data[0].nombres1,
                        nombres2: data[0].nombres2,
                        apellido1: data[0].apellido1,
                        apellido2: data[0].apellido2,
                        phone: data[0].account[0].numero_celular
                    };

                    setContactSelect(contactSelectInfo);
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
        contactSelect.no_cuenta = contact.no_cuenta;
        onResponseContact(contactSelect);
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
                            {listAccounts.length !== 0 && (
                                <>
                                    {listAccounts.map((account: any, index: React.Key | null | undefined) => (
                                        <View  key={index}  >
                                            {account.account.map((accounts: any, index: React.Key | null | undefined) => (
                                                <View key={index} style={styles.account}>
                                                    <TouchableOpacity onPress={() => handleResult(accounts)}>
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
                                                                <Text variant="titleMedium" style={[primaryBold, styles.text]}>{accounts.no_cuenta.startsWith('7') ? `0${accounts.no_cuenta}` : account.no_cuenta}</Text>
                                                            </LinearGradient>
                                                        </LinearGradient>
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </View>
                                    ))}
                                </>
                            )}
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