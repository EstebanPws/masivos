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
    id: string;
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
    isDisabled?: boolean;
    type?: boolean;
    selectAccount: (account: ListAccounts, type: number) => void; 
}

export default function addAccount({names, surnames,  alias, accountNumber, document, banks, typeBank, isDisabled =false, type = false, selectAccount}:addAccountProps) {
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
                console.log('1', error);
                desactiveLoader();
            });
        }
        
    }

    const fetchBankListContact = async () => {
        activeLoader();

        const account = await getNumberAccount();
        const doc = await getData('infoClient');

        const body = {
            numberAccount: account?.startsWith('0') ? account.slice(1) : account,
            numberDoc: doc.numDoc
        }

        await instanceWallet.post('listAccount', body)
        .then(async (response) => {
            const data = response.data;
 
            const banks = data.data.map((bank: any) => {
                const item: ListAccounts = {
                    id: bank.id,
                    name: `${eliminarCaracteresEspeciales(bank.firstName)}\n${eliminarCaracteresEspeciales(bank.lastName)}`,
                    firstName: bank.firstName,
                    surname: bank.lastName,
                    alias: eliminarCaracteresEspeciales(bank.nickname),
                    document: bank.holderDocumentNumber,
                    numberAccount: bank.holderAccountNumber,
                    bank: bank.bankCode,
                    bankName: bank.bank,
                    digit: bank.digit,
                    typeAccount: bank.accountType
                };

                return item;
            });

            setListAccounts(banks);
            desactiveLoader();
        })
        .catch((error) => {
            console.log('2', error);
            desactiveLoader();
        });
    }

    useEffect(() => {
        fetchBankListContact();
        fetchBankList();
    }, []);

    const handleAddAccount = async () => {
        activeLoader();

        const account = await getNumberAccount();
        const doc = await getData('infoClient');

        const body = {
            docNumber: doc.numDoc,
            accountNumber: account?.startsWith('0') ? account.slice(1) : account,
            firstName: names.value,
            lastName: surnames.value,
            nickname: alias.value,
            holderAccountNumber: accountNumber.value,
            holderDocumentNumber: document.value,
            bankCode: banks.selectedValue,
            bank: banks.name,
            accountType: typeBank.selectedValue,
            digit: banks.digit
        }

        await instanceWallet.post('regisInterbank', body)
        .then(async (response) => {
            const data = response.data;
            const newAccount: ListAccounts = {
                id: data.status,
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
            };
    
            setListAccounts([...listAccounts, newAccount]);
            setAddAccount(false);
            desactiveLoader();
        })
        .catch((error) => {
            console.log('3', error.response.data);
            desactiveLoader();
        });
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

    const handleClearInputs = () => {
        names.onChangeText?.("");
        surnames.onChangeText?.("");
        alias.onChangeText?.("");
        accountNumber.onChangeText?.("");
        document.onChangeText?.("");
        banks.onSelect('');
        typeBank.onSelect('');
        setAddAccount(true)
    }

    return(
        <View style={styles.container}>
            {!type &&   (
                <View style={styles.mb5}>
                    <Text variant="titleMedium" style={[primaryBold, {color: colorPrimary}]}>{addAccount ? 'Agregar cuenta' : 'Lista de cuentas'}</Text>
                </View>
            )}
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
                        <TouchableOpacity key={account.id} style={styles.mV5} onPress={() => selectAccount(account, 0)} disabled={type}>
                            <LinearGradient
                                colors={[colorPrimary, colorSecondary]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.accountContainer}
                            >
                            <View style={styles.row}>
                                <View style={{width: '60%'}}>
                                    <Text numberOfLines={2} style={[primaryBold, styles.text]}>{account.name}</Text>
                                    <Text style={[primaryBold, styles.text]}>{account.alias}</Text>
                                    <Text style={[primaryBold, styles.text]}>{account.numberAccount}</Text>
                                    <Text numberOfLines={2} style={[primaryBold, styles.text]}>{account.bankName}</Text>
                                </View>
                                <View style={styles.rowButtons}>
                                    <TouchableOpacity style={[styles.touchable, isDisabled ? {opacity: .7} : null]} onPress={() => selectAccount(account, 1)} disabled={isDisabled}>
                                        <Icon
                                            source={'content-save-edit'}
                                            size={24}
                                            color={colorPrimary}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.touchable, isDisabled ? {opacity: .7} : null]} onPress={() => selectAccount(account, 2)} disabled={isDisabled}>
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
                            onPress={handleClearInputs}
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
                            value={eliminarCaracteresEspeciales(names.value)}  
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
                            value={eliminarCaracteresEspeciales(surnames.value)}  
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
                            value={eliminarCaracteresEspeciales(alias.value)}  
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
                    <View style={styles.mb5}>
                        <ButtonsPrimary
                            label="Agregar cuenta"
                            onPress={handleAddAccount}
                        />
                    </View>
                    {type && (
                       <View style={styles.mb5}>
                            <ButtonsPrimary
                                label="Volver"
                                onPress={() => setAddAccount(false)}
                            />
                       </View>
                    )}
                </>
            )}
        </View>
    );
}