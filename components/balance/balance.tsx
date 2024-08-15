import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native-paper";
import { formatCurrency } from "@/utils/validationForms";
import { styles } from "./balance.styles";
import { useAuth } from "../auth/context/authenticationContext";
import { useTab } from "../auth/tabsContext/tabsContext";
import instanceWallet from "@/services/instanceWallet";
import { getNumberAccount, setNumberAccount } from "@/utils/storageUtils";

const extra = Constants.expoConfig?.extra || {};
const {primaryBold, primaryRegular} = extra.text;
const {colorPrimary, colorSecondary} = extra;

interface BalanceProps {
    isWelcome?: boolean;
}

export default function Balance({isWelcome = true}: BalanceProps) {
    const { documentNumber, modalidad } = useAuth();
    const { activeLoader , desactiveLoader } = useTab();
    const [myNumberAccount, setMyNumberAccount] = useState('');
    const [viewSaldo, setViewSaldo] = useState('0');

    const fetchComplianceData = async () => {
        activeLoader();
        try {
            const existNumber = await getNumberAccount();

            if(!existNumber){
                const bodyAccount = {
                    no_doc : documentNumber,
                    modalidad : modalidad,
                    oficina: "73",
                    estado: "T"
                }
                
                const account = await instanceWallet.post('getAccounts', bodyAccount);
                const cuenta = account.data.data.cuenta;

                setNumberAccount(cuenta);
                setMyNumberAccount(cuenta);
            }

            try {
                const bodySaldo = {
                    entidad: "9011569983",
                    no_cuenta: existNumber ? existNumber : myNumberAccount,
                    no_docum: documentNumber,
                    valor_comision: 0
                }

                const response = await instanceWallet.post('getBalance', bodySaldo);
                
                const data = response.data.message;
                if(data.includes('Saldo:')){
                    const saldo = data.split(',');
                    const saldoFinal = saldo[1].replace('Saldo: ', '');
                    setViewSaldo(saldoFinal)
                }
                desactiveLoader();
            } catch (error) {
                desactiveLoader();
                console.log('Error fetching compliance data account:', error);
            }
        } catch (error) {
            desactiveLoader();
            console.log('Error fetching compliance data:', error);
        }
    };

    useEffect(() => {
        fetchComplianceData();
    }, []);

    return(
        <LinearGradient
            colors={[colorPrimary, colorSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            {isWelcome && (
                <Text variant="titleSmall" style={[primaryRegular, styles.text]}>¡Bienvenido 
                    <Text variant="titleSmall" style={[primaryBold, styles.text]}> Juan!</Text>
                </Text>
            )}
            <LinearGradient
                colors={[colorPrimary, colorSecondary]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={styles.balance}
            >
                <Text variant="headlineSmall" style={[primaryBold, styles.text]}>{formatCurrency(viewSaldo)} COP</Text>
            </LinearGradient>
            <Text variant="titleSmall" style={[primaryRegular, styles.text]}>Tu saldo</Text>
        </LinearGradient>

    );
}