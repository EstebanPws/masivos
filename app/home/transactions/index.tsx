import React, { useState } from "react";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { useFocusEffect } from "expo-router";
import { Button, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./transactions.styles";
import InfoModal from "@/components/modals/infoModal/infoModal";
import TypeTransaction from "@/components/amount/typeTransaction/typeTransaction";
import { Icon, Text } from "react-native-paper";
import Constants from "expo-constants";
import DateSelect from "@/components/forms/select/dateSelect/dateSelect";
import { formatDate } from "@/utils/fomatDate";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import ButtonsSecondary from "@/components/forms/buttons/buttonSecondary/button";
import TitleLine from "@/components/titleLine/titleLine";

const extra = Constants.expoConfig?.extra || {};
const {primaryBold, primaryRegular} = extra.text;

const transactions = [
    {
        "merchant": "Tienda 1",
        "amount": "50000",
        "date": "2024/08/13",
        "type": "recibido"
    },
    {
        "merchant": "Supermercado ABC",
        "amount": "150000",
        "date": "2024/08/12",
        "type": "enviado"
    },
    {
        "merchant": "Restaurante La Esquina",
        "amount": "80000",
        "date": "2024/08/11",
        "type": "recibido"
    },
    {
        "merchant": "Cafetería Delicias",
        "amount": "12000",
        "date": "2024/08/10",
        "type": "enviado"
    },
    {
        "merchant": "Panadería Mi Pan",
        "amount": "25000",
        "date": "2024/08/09",
        "type": "recibido"
    },
    {
        "merchant": "Librería Estudio",
        "amount": "42000",
        "date": "2024/08/08",
        "type": "enviado"
    },
    {
        "merchant": "Farmacia Salud",
        "amount": "30000",
        "date": "2024/08/07",
        "type": "recibido"
    },
    {
        "merchant": "Gasolinera Fuelle",
        "amount": "60000",
        "date": "2024/08/06",
        "type": "enviado"
    },
    {
        "merchant": "Zapatería El Paso",
        "amount": "75000",
        "date": "2024/08/05",
        "type": "recibido"
    },
    {
        "merchant": "Tienda de Ropa Modas",
        "amount": "120000",
        "date": "2024/08/04",
        "type": "enviado"
    }
]; 


export default function Page() {
    const { setActiveTab, goBack } = useTab();
    const [showError, setShowError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [startDate, setStartDate] = useState(''); 
    const [endDate, setEndDate] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);
    const [showFilter, setShowFilter] = useState(true);
 
    
    useFocusEffect(() => {
        setActiveTab('/home/transactions/');
    });
    
    const handleBack = () => {
        goBack();
    };

    const handleFilter = () => {
        const filtered = transactions.filter((transaction) => {
            const transactionDate = transaction.date;
            const start = startDate;
            const end = endDate;
            
            if (start && end) {
                return transactionDate >= start && transactionDate <= end;
            } else if (start) {
                return transactionDate >= start;
            } else if (end) {
                return transactionDate <= end;
            }
            return true;
        });

        setFilteredTransactions(filtered);
    };

    const handleDateSelect = (setter: { (value: React.SetStateAction<string>): void }) => (date: any) => {
        setter(formatDate(date));
    };

    const handleBorrar = () => {
        setStartDate('');
        setEndDate('');
        setFilteredTransactions(transactions);
    }

    return(
        <ViewFadeIn isWidthFull>
            <HeaderForm
                onBack={() => handleBack()}
                title="Transacciones"
            />
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
                                        placeholder={"Selecione una fecha"} 
                                        icon={false}
                                        onSelect={handleDateSelect(setStartDate)}
                                    />
                                </View>
                                <View style={styles.mb5}>
                                    <DateSelect 
                                        label={"Fecha de fin"} 
                                        placeholder={"Selecione una fecha"} 
                                        icon={false}
                                        onSelect={handleDateSelect(setEndDate)}
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
                                type={transaction.type}
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