import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper"; 
import Inputs from "../../forms/inputs/inputs";
import styles from "./editAccount.styles";
import Constants from "expo-constants";
import SearchSelect from "@/components/forms/select/searchSelect/select";
import { LinearGradient } from "expo-linear-gradient";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import instanceExternal from "@/services/instanceExternal";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import { getData, getNumberAccount, setData } from "@/utils/storageUtils";
import { eliminarCaracteresEspeciales } from "@/utils/validationForms";
import instanceWallet from "@/services/instanceWallet";

const extra = Constants.expoConfig?.extra || {};
const {primaryBold, primaryRegular} = extra.text;
const {colorPrimary, colorSecondary} = extra;

interface Input {
    onChangeText?: Dispatch<SetStateAction<string>>;
    value: string;
}

interface Select {
    onSelect: (item: any) => void;
    selectedValue: any;
    name?: any;
    digit?: string;
}

interface ListAccounts {
    id?: string;
    name: string;
    firstName: string;
    surname: string;
    alias: string;
    numberAccount: string;
    document: string;
    bank: string;
    bankName: string;
    digit: string;
    typeAccount: string;
}
interface List {
    name: string;
    value: string;
    digit: string;
}

interface addAccountProps {
    names: Input;
    surnames: Input;
    alias: Input;
    accountNumber: Input;
    document: Input;
    banks: Select;
    typeBank: Select;
    selectAccount: (account: ListAccounts) => void; 
}

export default function editAccount({names, surnames,  alias, accountNumber, document, banks, typeBank, selectAccount}:addAccountProps) {
    const {activeLoader, desactiveLoader} = useTab();
    const [listBanksComplete, setListBanksComplete] = useState<any>();
    const [listBanks, setListBanks] = useState<List[]>([]);
    const [listTypeBank, setListTypeBank] = useState<List[]>([]);

    const fetchBankList = async () => {
        const existListBanks = await getData('listBanks');
        if (existListBanks) {
            const banks = existListBanks.map((bank: any) => {
                const item: List = {
                    name: bank.name,
                    value: bank.code,
                    digit: bank.digit
                };

                return item;
            });

            setListBanksComplete(existListBanks);
            setListBanks(banks);
        } else {
            activeLoader();
            await instanceExternal.get('banks/list')
            .then(async (response) => {
                const data = response.data;
                const banks = data.data.map((bank: any) => {
                    const item: List = {
                        name: bank.name,
                        value: bank.code,
                        digit: bank.digit
                    };

                    return item;
                });

                await setData('listBanks', data.data);
                setListBanksComplete(data.data);
                setListBanks(banks);
                desactiveLoader();
            })
            .catch((error) => {
                desactiveLoader();
            });
        }
        
    }

    useEffect(() => {
        const fetchInfoPreview = async () => {
            await fetchBankList();
            initTypeAccount(banks.selectedValue);
        }
        fetchInfoPreview();
    }, []);

    const initTypeAccount = async (item: any) => {
        const banks = await getData('listBanks');
        const selectedBank = banks.find((bank: any) => bank.code === item);
        
        if (selectedBank) {
            const filteredTypeBank = selectedBank.accountTypes.map((type: any) => ({
                name: type === 'CURRENT' ? 'Corriente' : type === 'ELECTRONIC' ? 'Eletrónico' : 'Ahorros',
                value: type
            }));
            setListTypeBank(filteredTypeBank);
        }
    }

    const handleEditAccount = async () => {
        const account: ListAccounts = {
            name: `${eliminarCaracteresEspeciales(names.value)}\n${eliminarCaracteresEspeciales(surnames.value)}`,
            firstName: names.value,
            surname: surnames.value,
            alias: eliminarCaracteresEspeciales(alias.value),
            document: document.value,
            numberAccount: accountNumber.value,
            bank: banks.selectedValue,
            bankName: banks.name,
            digit: banks.digit!,
            typeAccount: typeBank.selectedValue
        }

        selectAccount(account)
    }

    const handleSelectedOption = (item: any) => {
        banks.onSelect(item);
        const selectedBank = listBanksComplete.find((bank: any) => bank.code === item.value);
        
        if (selectedBank) {
            const filteredTypeBank = selectedBank.accountTypes.map((type: any) => ({
                name: type === 'CURRENT' ? 'Corriente' : type === 'ELECTRONIC' ? 'Eletrónico' : 'Ahorros',
                value: type
            }));
            setListTypeBank(filteredTypeBank);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.mb5}>
                <Inputs 
                    label="Nombres"
                    placeholder="Ingresa el valor"
                    isSecureText={false} 
                    isRequired 
                    onChangeText={names.onChangeText}
                    value={eliminarCaracteresEspeciales(names.value)}  
                    keyboardType="default"          
                />
            </View>
            <View style={styles.mb5}>
                <Inputs 
                    label="Apellidos"
                    placeholder="Ingresa el valor"
                    isSecureText={false} 
                    isRequired 
                    onChangeText={surnames.onChangeText}
                    value={eliminarCaracteresEspeciales(surnames.value)}  
                    keyboardType="default"          
                />
            </View>
            <View style={styles.mb5}>
                <Inputs 
                    label="Alias"
                    placeholder="Ingresa el valor"
                    isSecureText={false} 
                    isRequired 
                    onChangeText={alias.onChangeText}
                    value={eliminarCaracteresEspeciales(alias.value)}  
                    keyboardType="default"          
                />
            </View>
            <View style={styles.mb5}>
                <Inputs 
                    label="Número de cuenta"
                    placeholder="Ingresa el valor"
                    isSecureText={false} 
                    isRequired 
                    onChangeText={accountNumber.onChangeText}
                    value={accountNumber.value}  
                    keyboardType="numeric"          
                />
            </View>
            <View style={styles.mb5}>
                <View style={styles.mb5}>
                    <Inputs 
                        label="Número de documento del titular"
                        placeholder="Ingresa el valor"
                        isSecureText={false} 
                        isRequired 
                        onChangeText={document.onChangeText}
                        value={document.value}  
                        keyboardType="numeric"          
                    />
                </View>
                    <Text variant='bodySmall' style={primaryRegular}><Text variant='bodySmall' style={[primaryBold, {color: colorPrimary}]}>Nota:</Text> Si el número de  documento es NIT, ingréselo con el dígito de verificación y sin guiones.</Text>
            </View>
            <View style={styles.mb5}>
                <SearchSelect
                    isRequired
                    label="Bancos"
                    data={listBanks}
                    placeholder="Selecciona una opción"
                    onSelect={handleSelectedOption}
                    selectedValue={banks.selectedValue}
                />
            </View>
            <View style={styles.mb5}>
                <SearchSelect
                    isRequired
                    label="Tipo de cuenta"
                    data={listTypeBank}
                    disabled={listTypeBank.length !== 0 ? false : true}
                    placeholder="Selecciona una opción"
                    onSelect={typeBank.onSelect}
                    selectedValue={typeBank.selectedValue}
                />
            </View>
            <View style={styles.mb5}>
                <ButtonsPrimary
                    label="Editar cuenta"
                    onPress={handleEditAccount}
                />
            </View> 
        </View>
    );
}