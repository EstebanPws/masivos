import Constants from "expo-constants";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./confirmBankTransfer.styles";
import { formatCurrency } from "@/utils/validationForms";

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
}

export default function ConfirmBankTransfer({amount, comision, names, document, account, bank, concepto, phone}: ConfirmBankTransferProps) {
    const cleanNames = names?.replace(/undefined/g, '').trim();

    return(
        <View>
            <View style={styles.row}>
                <Text style={primaryBold}>Valor:</Text>
                <Text style={primaryRegular}>{amount} COP</Text>
            </View>
            <View style={styles.container}>
                <View style={[styles.row, styles.line]}>
                    <Text style={primaryBold}>Comisión:</Text>
                    <Text style={primaryRegular}>{formatCurrency(comision)} COP</Text>
                </View>
                <View style={[styles.row, styles.line]}>
                    <Text style={primaryBold}>Titular:</Text>
                    <Text numberOfLines={2} style={[primaryRegular, styles.text]}>{cleanNames}</Text>
                </View>
                {document && (
                    <View style={[styles.row, styles.line]}>
                        <Text style={primaryBold}>Número de{'\n'}documento:</Text>
                        <Text style={primaryRegular}>{document}</Text>
                    </View>
                )}
                {account && (
                    <View style={[styles.row, styles.line]}>
                        <Text style={primaryBold}>Número de{'\n'}cuenta:</Text>
                        <Text style={primaryRegular}>{account}</Text>
                    </View>
                )}
                {bank && (
                    <View style={[styles.row]}>
                        <Text style={primaryBold}>Entidad:</Text>
                        <Text style={primaryRegular}>{bank}</Text>
                    </View>
                )}
                {phone && (
                    <View style={[styles.row]}>
                        <Text style={primaryBold}>Número de{'\n'}celular:</Text>
                        <Text style={primaryRegular}>{phone}</Text>
                    </View>
                )}
            </View>
            {concepto && (
                <View style={styles.row}>
                    <Text style={primaryBold}>Concepto:</Text>
                    <Text style={primaryRegular}>{concepto}</Text>
                </View>
            )}
        </View>
    );
}