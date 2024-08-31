import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native-paper";
import { formatCurrency } from "@/utils/validationForms";
import { styles } from "./balance.styles";
import { useAuth } from "../auth/context/authenticationContext";
import { useTab } from "../auth/tabsContext/tabsContext";
import instanceWallet from "@/services/instanceWallet";
import { getBalance, getData, getNumberAccount, setBalance, setNumberAccount } from "@/utils/storageUtils";
import { usePathname } from "expo-router";

const extra = Constants.expoConfig?.extra || {};
const {primaryBold, primaryRegular} = extra.text;
const {colorPrimary, colorSecondary} = extra;

interface BalanceProps {
    isWelcome?: boolean;
    onMount?: (account: string) => Promise<string | null>;
}

export default function Balance({isWelcome = true, onMount}: BalanceProps) {
    const { documentNumber, modalidad } = useAuth();
    const { activeLoader , desactiveLoader } = useTab();
    const [viewSaldo, setViewSaldo] = useState('0');
    const [name, setName] = useState<string | null>('');
    const pathname = usePathname();

    const fetchComplianceData = async () => {
        if(pathname === '/home') {
            activeLoader();
            try {
                const existNumber = await getNumberAccount();
                let myNumberAccount;
                
                if(!existNumber || existNumber === ""){
                    const bodyAccount = {
                        no_doc : documentNumber,
                        modalidad : modalidad,
                        oficina: "73",
                        estado: "T"
                    }

                    const account = await instanceWallet.post('getAccounts', bodyAccount);
                    const cuenta = account.data.data.cuenta;

                    setNumberAccount(cuenta);
                    myNumberAccount = cuenta
                }

                if (onMount) {
                    const existFirstName = await getData('infoClient');

                    if(existFirstName) {
                        setName(existFirstName.firstName);
                    } else {
                        onMount(existNumber ? existNumber : myNumberAccount)
                        .then(firstName => {
                            setName(firstName);
                        })
                        .catch(error => {
                            setName('Nuevo usuario');
                        });
                    }
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
                        await setBalance(saldoFinal);
                        setViewSaldo(saldoFinal);
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
        } else {
            const existBalance = await getBalance();
            if (existBalance) {
                setViewSaldo(existBalance!);
            }
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
                    <Text variant="titleSmall" style={[primaryBold, styles.text]}> {name}!</Text>
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