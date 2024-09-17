import React, { useEffect, useState } from "react";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { useFocusEffect } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from "./transactions.styles";
import InfoModal from "@/components/modals/infoModal/infoModal";
import TypeTransaction from "@/components/amount/typeTransaction/typeTransaction";
import { Icon, Text } from "react-native-paper";
import Constants from "expo-constants";
import DateSelect from "@/components/forms/select/dateSelect/dateSelect";
import { formatDate, formatDateGuion } from "@/utils/fomatDate";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import ButtonsSecondary from "@/components/forms/buttons/buttonSecondary/button";
import TitleLine from "@/components/titleLine/titleLine";
import { getData, getNumberAccount } from "@/utils/storageUtils";
import instanceWallet from "@/services/instanceWallet";
import InfoTransaction from "@/components/amount/infoTransaction/infoTransaction";
import { typeTransactionResponse } from "@/utils/listUtils";

const extra = Constants.expoConfig?.extra || {};
const {primaryBold, primaryRegular} = extra.text;

interface Transaction {
    merchant: string;
    amount: string;
    date: string;
    time: string;
    type: string;
    infoType: string;
    onPress: () => void;
}

export default function Page() {

    const { setActiveTab, goBack, activeLoader, desactiveLoader, activeTab } = useTab();
    const [showError, setShowError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [startDate, setStartDate] = useState(''); 
    const [endDate, setEndDate] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [initialTransactions, setInitialTransactions] = useState<Transaction[]>([]);
    const [showFilter, setShowFilter] = useState(true);
    const [transactionSelected, setTransactionSelected] = useState<any>(null);

    const fetchGetTransactions = async () => {
        const today = new Date();
        const todayFormat = formatDate(today);
        const todayFinal = todayFormat.replaceAll('/', '');
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - 7);
        const oldSevenDate = formatDate(pastDate);
        const oldSevenDateFinal = oldSevenDate.replaceAll('/', '');
        
        activeLoader();
        const account = await getNumberAccount();
        const infoClient = await getData('infoClient');
        const body = {
            entidad: "9011569983",
            no_cuenta: account,
            no_docum: infoClient.numDoc,
            fecha_inicio: oldSevenDateFinal,
            fecha_final : todayFinal
        }

        await instanceWallet.post('getMovements', body)
        .then((response) => {
            const data = response.data.data;
            const sortedTransactions = data.sort((a: any, b: any) => {
                if (b.fecha_aplicacion_conta === a.fecha_aplicacion_conta) {
                    return b.hora_tx - a.hora_tx;
                }
                return b.fecha_aplicacion_conta - a.fecha_aplicacion_conta;
            });
    

            const filterTransaction = sortedTransactions.map((transactions: any) => {
                const date = String(transactions.fecha_aplicacion_conta);
                const year = date.substring(0, 4);
                const month = date.substring(4, 6);
                const day = date.substring(6, 8);

                const time = String(transactions.hora_tx);
                const hour = time.substring(0, 2);
                const minutes = time.substring(2, 4);
                const seconds = time.substring(4, 6);
                const zoneTime = Number(hour) >= 13 ? 'P.M' : 'A.M';

                const dataType = typeTransactionResponse.filter((type: any) => {
                    if(type.tipoMov === transactions.tipo_movimiento && type.docMov === transactions.docu_asoci_Tipo_movi){
                        return type.desc;
                    } else if (type.tipoMov === transactions.tipo_movimiento && type.docMov !== transactions.docu_asoci_Tipo_movi) {
                        return type.desc
                    }
                });

                const transaction: Transaction = {
                    merchant: transactions.descri_tx,
                    amount: String(transactions.valor_tx),
                    date: `${year}/${month}/${day}`,
                    time: `${hour}:${minutes}:${seconds} ${zoneTime}`,
                    type: transactions.tipo_operacion_movi === 'A' ? "Recibido" : "Enviado",
                    infoType: dataType[0].desc,
                    onPress: () => {
                        setTransactionSelected(transactions);
                    }
                };

                return transaction;
            });
            
            setFilteredTransactions(filterTransaction);
            setInitialTransactions(filterTransaction);
            desactiveLoader();
        })
        .catch((err) => {
            console.log(err.response.data);
            
            desactiveLoader();
            setFilteredTransactions([]);
        });   
    }
 
    useEffect(() => {
       if(activeTab === '/home/transactions/'){
        fetchGetTransactions();
       }
    }, [activeTab])

    useFocusEffect(() => {
        setActiveTab('/home/transactions/');
    });
    
    const handleBack = () => {
        goBack();
    };

    const handleFilter = async () => {
        if (!startDate || !endDate) {
            setMessageError('Por favor, seleccione ambas fechas.');
            setShowError(true);
            return;
        }

        const start = new Date(startDate.replaceAll('/', '-'));
        const end = new Date(endDate.replaceAll('/', '-'));

        if (end < start) {
            setMessageError('La fecha de fin no puede ser anterior a la fecha de inicio.');
            setShowError(true);
            return;
        }

        const diffDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
        if (diffDays > 7) {
            setMessageError('El rango de fechas no puede ser mayor a 7 días.');
            setShowError(true);
            return;
        }

        activeLoader();
        const account = await getNumberAccount();
        const infoClient = await getData('infoClient');
        const body = {
            entidad: "9011569983",
            no_cuenta: account,
            no_docum: infoClient.numDoc,
            fecha_inicio: startDate.replaceAll('-', ''),
            fecha_final : endDate.replaceAll('-', '')
        }

        await instanceWallet.post('getMovements', body)
        .then((response) => {
            const data = response.data.data;
            const sortedTransactions = data.sort((a: any, b: any) => {
                return b.fecha_aplicacion_conta - a.fecha_aplicacion_conta;
            });

            const filterTransaction = sortedTransactions.map((transactions: any) => {
                const date = String(transactions.fecha_aplicacion_conta);
                const year = date.substring(0, 4);
                const month = date.substring(4, 6);
                const day = date.substring(6, 8);

                const time = String(transactions.hora_tx);
                const hour = time.substring(0, 2);
                const minutes = time.substring(2, 4);
                const seconds = time.substring(4, 6);
                const zoneTime = Number(hour) >= 13 ? 'P.M' : 'A.M';

                const dataType = typeTransactionResponse.filter((type: any) => {
                    if(type.tipoMov === transactions.tipo_movimiento && type.docMov === transactions.docu_asoci_Tipo_movi){
                        return type.desc;
                    } else if (type.tipoMov === transactions.tipo_movimiento && type.docMov !== transactions.docu_asoci_Tipo_movi) {
                        return type.desc
                    }
                });

                const transaction: Transaction = {
                    merchant: transactions.descri_tx,
                    amount: String(transactions.valor_tx),
                    date: `${year}/${month}/${day}`,
                    time: `${hour}:${minutes}:${seconds} ${zoneTime}`,
                    type: transactions.tipo_operacion_movi === 'A' ? "Recibido" : "Enviado",
                    infoType: dataType[0].desc,
                    onPress: () => {
                        setTransactionSelected(transactions);
                    }
                };

                return transaction;
            });
            setFilteredTransactions(filterTransaction);
            desactiveLoader();
        })
        .catch((err) => {
            setFilteredTransactions([]);
            desactiveLoader();
        });
    };

    const handleDateSelect = (setter: { (value: React.SetStateAction<string>): void }) => (date: any) => {
        setter(formatDateGuion(date));
    };

    const handleBorrar = () => {
        setStartDate('');
        setEndDate('');
        setFilteredTransactions(initialTransactions);
    }

    return(
        <ViewFadeIn isWidthFull>
            <HeaderForm
                onBack={() => handleBack()}
                title="Transacciones"
            />
            {!transactionSelected ? (
                <View style={[styles.container]}>
                    <View style={styles.filter}>
                        <TouchableOpacity onPress={() => setShowFilter(!showFilter)}>
                            <View style={styles.row}>
                                <Text variant='bodyLarge' style={[primaryBold, styles.text]}>Filtros</Text>
                                
                                    <Icon
                                        source={!showFilter ? 'eye' : 'eye-off'}
                                        size={24}
                                    />
                                
                            </View>
                        </TouchableOpacity>
                        {showFilter && (
                            <>
                                <TitleLine/>
                                <View style={styles.row}>
                                    <View style={styles.mb5}>
                                        <DateSelect 
                                            label={"Fecha de inicio"} 
                                            placeholder={"Fecha Inicio"} 
                                            icon={false}
                                            onSelect={handleDateSelect(setStartDate)}
                                            value={startDate}
                                        />
                                    </View>
                                    <View style={styles.mb5}>
                                        <DateSelect 
                                            label={"Fecha de fin"} 
                                            placeholder={"Fecha Fin"} 
                                            icon={false}
                                            onSelect={handleDateSelect(setEndDate)}
                                            value={endDate}
                                        />
                                    </View>
                                </View>
                                <View style={styles.row}>
                                    <ButtonsPrimary
                                        label="Filtrar"
                                        onPress={() => handleFilter()}
                                    />
                                    <ButtonsSecondary
                                        label="Borrar"
                                        onPress={() => handleBorrar()}
                                    />
                                </View>
                            </>
                        )}
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((transaction, index) => (
                                <TypeTransaction
                                    key={index}
                                    merchant={transaction.merchant}
                                    amount={transaction.amount}
                                    date={transaction.date}
                                    time={transaction.time}
                                    type={transaction.type}
                                    infoType={transaction.infoType}
                                    onPress={transaction.onPress}
                                />
                            ))
                        ) : (
                            <View style={styles.noResults}>
                                <Icon source={'toolbox'} size={28} />
                                <Text style={primaryRegular}>No hay resultados</Text>
                            </View>
                        )}
                    </ScrollView>
                </View>
            ) : (
                <InfoTransaction 
                    transaction={transactionSelected}
                    onPress={() => setTransactionSelected(null)}
                />
            )}
            {showError &&(
                <InfoModal 
                    type={"error"} 
                    message={messageError} 
                    onPress={() => setShowError(false)} 
                    isVisible={showError}                    
                />
            )}
        </ViewFadeIn>
    );
}