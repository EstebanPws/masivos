import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { View, Image} from "react-native";
import { MD2Colors, Text } from "react-native-paper";
import styles from "./confirmBankTransferSuccess.styles";
import { formatCurrency } from "@/utils/validationForms";
import { getData, getNumberAccount } from "@/utils/storageUtils";

const extra = Constants.expoConfig?.extra || {};
const {primaryBold, primaryRegular} = extra.text;

interface ConfirmBankTransferProps{
    amount: string;
    comision: string;
    names: string | undefined;
    document?: string;
    account?: string;
    bank?: string;
    concepto?: string;
    phone?: string | undefined;
    viewRef?: React.LegacyRef<View> | undefined
}

export default function confirmBankTransferSuccess({amount, comision, names, account, bank, concepto, viewRef}: ConfirmBankTransferProps) {
    const cleanNames = names?.replace(/undefined/g, '').trim();
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}  ${hours}:${minutes}`;
    const [dataAccount, setDataAccount] = useState<any>();
    const [accountOr, setAccountOr] = useState('');

    useEffect(() => {
       const fetchInfo = async () => {
        const info = await getData('infoClient');
        const account = await getNumberAccount();
        const dismissAcc = String(account).slice(-4);
        setAccountOr(`****${dismissAcc}`);
        setDataAccount(info);
       }

       fetchInfo();
    }, []);

    return(
        <View style={styles.container} ref={viewRef} collapsable={false}>
            <View style={[styles.row, styles.line]}>
                <Text style={primaryBold}>Operación:</Text>
                <Text style={[primaryBold, {color: MD2Colors.indigo900}]}>EN PROCESO</Text>
            </View>
            <View style={[styles.row, styles.line]}>
                <Text style={primaryBold}>Fecha operación:</Text>
                <Text style={[primaryRegular, {textAlign: 'right'}]}>{formattedDate}</Text>
            </View>
            <View style={[styles.row, styles.line]}>
                <Text style={primaryBold}>Valor:</Text>
                <Text style={primaryRegular}>{amount} COP</Text>
            </View>
            <View style={[styles.row, styles.line]}>
                <Text style={primaryBold}>Comisión:</Text>
                <Text style={primaryRegular}>{formatCurrency(comision)} COP</Text>
            </View>
            <View style={[styles.row, styles.line]}>
                <Text style={primaryBold}>Origen:</Text>
                <Text numberOfLines={2} style={[primaryRegular, styles.text]}>{dataAccount ? dataAccount.names : ''}{'\n'}{dataAccount ? dataAccount.surnames : ''}</Text>
            </View>
            <View style={[styles.row, styles.line]}>
                <Text style={primaryBold}>Banco origen:</Text>
                <Text numberOfLines={2} style={[primaryRegular, styles.text]}>BANCO COOPERATIVO COOPCENTRAL</Text>
            </View>
            <View style={[styles.row, styles.line]}>
                <Text style={primaryBold}>Cuenta origen:</Text>
                <Text numberOfLines={2} style={[primaryRegular, styles.text]}>{accountOr}</Text>
            </View>
            <View style={[styles.row, styles.line]}>
                <Text style={primaryBold}>Destino:</Text>
                <Text numberOfLines={2} style={[primaryRegular, styles.text]}>{cleanNames}</Text>
            </View>
            {bank && (
                <View style={[styles.row, styles.line]}>
                    <Text style={primaryBold}>Entidad destino:</Text>
                    <Text numberOfLines={2} style={[primaryRegular, styles.text]}>{bank}</Text>
                </View>
            )}
            {account && (
                <View style={[styles.row, styles.line]}>
                    <Text style={primaryBold}>Cuenta destino:</Text>
                    <Text style={primaryRegular}>****{account.slice(-4)}</Text>
                </View>
            )}
            {concepto && (
                <View style={[styles.row, styles.line]}>
                    <Text style={primaryBold}>Concepto:</Text>
                    <Text style={primaryRegular}>{concepto}</Text>
                </View>
            )}
            <View style={styles.mb5}>
              <Image style={styles.image} source={require('@/assets/images/general/logo_coopcentral.png')} resizeMode="contain"/>
            </View> 
        </View>
    );
}