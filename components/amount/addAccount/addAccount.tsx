import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper"; 
import Inputs from "../../forms/inputs/inputs";
import { styles } from "./addAccount.styles";
import Constants from "expo-constants";
import SearchSelect from "@/components/forms/select/searchSelect/select";
import { LinearGradient } from "expo-linear-gradient";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import instanceExternal from "@/services/instanceExternal";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import { getData, setData } from "@/utils/storageUtils";

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
    name?: any
}

interface ListAccounts {
    id: number;
    name: string;
    alias: string;
    numberAccount: string;
    bank: string;
    bankName: string;
}
interface List {
    name: string;
    value: string
}

interface addAccountProps {
    names: Input;
    surnames: Input;
    alias: Input;
    accountNumber: Input;
    document: Input;
    banks: Select;
    typeBank: Select;
    isDisabled?: boolean;
    selectAccount: () => void;
}

export default function addAccount({names, surnames,  alias, accountNumber, document, banks, typeBank, isDisabled =false, selectAccount}:addAccountProps) {
    const {activeLoader, desactiveLoader} = useTab();
    const [addAccount, setAddAccount] = useState(false);
    const [listAccounts, setListAccounts] = useState<ListAccounts[]>([]);
    const [listBanksComplete, setListBanksComplete] = useState<any>();
    const [listBanks, setListBanks] = useState<List[]>([]);
    const [listTypeBank, setListTypeBank] = useState<List[]>([]);

    const fetchBankList = async () => {
        const existListBanks = await getData('listBanks');

        if (existListBanks) {
            const banks = existListBanks.map((bank: any) => {
                const item: List = {
                    name: bank.name,
                    value: bank.code
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
                        value: bank.code
                    };

                    return item;
                });

                await setData('listBanks', data.data);
                setListBanksComplete(data.data);
                setListBanks(banks);
                desactiveLoader();
            })
            .catch((error) => {
                console.log(error.response.data);
                desactiveLoader();
            });
        }
        
    }

    useEffect(() => {
        fetchBankList();
    }, []);

    const handleAddAccount = () => {
        const addAccount: ListAccounts = {
            id: 0,
            name: names.value,
            alias: alias.value,
            numberAccount: accountNumber.value,
            bank: banks.selectedValue,
            bankName: banks.name
        }

        setListAccounts([addAccount])
        setAddAccount(false);
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
             <Text variant="titleMedium" style={[primaryBold, {color: colorPrimary}]}>{addAccount ? 'Agregar cuenta' : 'Lista de cuentas'}</Text>
           </View>
            {(listAccounts.length === 0 && !addAccount) && (
                <View style={[styles.mb5, styles.center]}>
                    <Icon
                        source={'toolbox'}
                        size={28}
                    />
                    <Text style={primaryRegular}>No hay resultados</Text>
                    <View style={styles.mV5}>
                        <ButtonsPrimary
                            label="Agregar cuenta"
                            onPress={() => setAddAccount(true)}
                        />
                    </View>
                </View>
            )}
            {(listAccounts.length > 0 && !addAccount) && (
                <>
                    {listAccounts.map((account) => (
                        <TouchableOpacity key={account.id} style={styles.mV5} onPress={selectAccount}>
                            <LinearGradient
                                colors={[colorPrimary, colorSecondary]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.accountContainer}
                            >
                            <View style={styles.row}>
                                <View>
                                    <Text style={[primaryBold, styles.text]}>{account.name}</Text>
                                    <Text style={[primaryBold, styles.text]}>{account.alias}</Text>
                                    <Text style={[primaryBold, styles.text]}>{account.numberAccount}</Text>
                                    <Text numberOfLines={2} style={[primaryBold, styles.text]}>{account.bankName}</Text>
                                </View>
                                <View style={styles.rowButtons}>
                                    <TouchableOpacity style={[styles.touchable, isDisabled ? {opacity: .7} : null]} disabled={isDisabled}>
                                        <Icon
                                            source={'content-save-edit'}
                                            size={24}
                                            color={colorPrimary}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.touchable, isDisabled ? {opacity: .7} : null]} disabled={isDisabled}>
                                        <Icon
                                            source={'trash-can'}
                                            size={24}
                                            color={colorPrimary}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                     <View style={styles.mV5}>
                        <ButtonsPrimary
                            label="Agregar cuenta"
                            onPress={() => setAddAccount(true)}
                        />
                    </View>
                </>
            )}
            {addAccount && (
                <>
                    <View style={styles.mb5}>
                        <Inputs 
                            label="Nombres"
                            placeholder="Ingrese el valor"
                            isSecureText={false} 
                            isRequired 
                            onChangeText={names.onChangeText}
                            value={names.value}  
                            keyboardType="default"          
                        />
                    </View>
                    <View style={styles.mb5}>
                        <Inputs 
                            label="Apellidos"
                            placeholder="Ingrese el valor"
                            isSecureText={false} 
                            isRequired 
                            onChangeText={surnames.onChangeText}
                            value={surnames.value}  
                            keyboardType="default"          
                        />
                    </View>
                    <View style={styles.mb5}>
                        <Inputs 
                            label="Alias"
                            placeholder="Ingrese el valor"
                            isSecureText={false} 
                            isRequired 
                            onChangeText={alias.onChangeText}
                            value={alias.value}  
                            keyboardType="default"          
                        />
                    </View>
                    <View style={styles.mb5}>
                        <Inputs 
                            label="Número de cuenta"
                            placeholder="Ingrese el valor"
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
                                placeholder="Ingrese el valor"
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
                            placeholder="Seleccione una opción"
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
                            placeholder="Seleccione una opción"
                            onSelect={typeBank.onSelect}
                            selectedValue={''}
                        />
                    </View>
                    <ButtonsPrimary
                        label="Agregar cuenta"
                        onPress={handleAddAccount}
                    />
                </>
            )}
        </View>
    );
}