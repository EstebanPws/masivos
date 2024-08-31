import React, { Dispatch, SetStateAction, useState } from "react";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import Balance from "@/components/balance/balance";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { useFocusEffect } from "expo-router";
import { ScrollView, View, Image, Platform } from "react-native";
import { styles } from "./bankTransfer.styles";
import SelectAmount from "@/components/amount/selectAmount/selectAmount";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InfoModal from "@/components/modals/infoModal/infoModal";
import { validateNumber } from "@/utils/validationForms";
import AddAccount from "@/components/amount/addAccount/addAccount";
import ConfirmBankTransfer from "@/components/amount/confirmBankTransfer/confirmBankTransfer";
import Constants from "expo-constants";

interface Input {
    onChangeText?: Dispatch<SetStateAction<string>>;
    value: string;
}

interface Select {
    onSelect: (item: any) => void;
    selectedValue: any;
    name?: string;
}

const expo = Constants.expoConfig?.name || '';

export default function Page() {
    const { setActiveTab, goBack, activeLoader, desactiveLoader } = useTab();
    const [valRecharge, setValRecharge] = useState('');
    const [concepto, setConcepto] = useState('');
    const [valMax] = useState('2000000');
    const [valMin] = useState('10000');
    const [comision] = useState('4300');
    const [showAddAccount, setShowAddAccount] = useState(false);
    const [showError, setShowError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [names, setNames] = useState('');
    const [surnames, setSurnames] = useState('');
    const [document, setDocument] = useState('');
    const [alias, setAlias] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [typeBank, setTypeBank] = useState('');
    const [banks, setBanks] = useState('');
    const [bankName, setBankName] = useState('');
    const [disableContinue, setDisableContinue] = useState(true);
    const [step, setStep] = useState(0);
    const [confirmInfo, setConfirmInfo] = useState(false);
    const [typeModal, setTypeModal] = useState<'error' | 'info' | 'success'>('error');
    const [titleModal, setTitleModal] = useState<string | null>(null);

    const inputAmount: Input = {
        onChangeText: setValRecharge,
        value: valRecharge
    }

    const inputConcepto: Input = {
        onChangeText: setConcepto,
        value: concepto
    }

    const inputNames: Input = {
        onChangeText: setNames,
        value: names
    }

    const inputSurnames: Input = {
        onChangeText: setSurnames,
        value: surnames
    }

    const inputAlias: Input = {
        onChangeText: setAlias,
        value: alias
    }

    const inputAccountNumber: Input = {
        onChangeText: setAccountNumber,
        value: accountNumber
    }

    const inputDocument: Input = {
        onChangeText: setDocument,
        value: document
    }

    const handleSelectBank = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
        setBankName(item.name)
        setter(item.value);
    };

    const handleSelect = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
        setter(item.value);
    };

    const inputBanks: Select = {
        onSelect: handleSelectBank(setBanks),
        selectedValue: banks,
        name: bankName
    }

    const inputTypeBank: Select = {
        onSelect: handleSelect(setTypeBank),
        selectedValue: typeBank
    }
    
    useFocusEffect(() => {
        setActiveTab('/home/bankTransfer/');
    });
    
    const handleBack = () => {
        goBack();
    }; 

    const handleNext = () => {
        const valueFinal = validateNumber(valRecharge);
        
        if(!valRecharge){
            setTypeModal('error');
            setTitleModal(null);
            setMessageError('Por favor ingresa un monto valido.');
            setShowError(true);
            return;
        } 

        if(valueFinal > valMax){
            setTypeModal('error');
            setTitleModal(null);
            setMessageError('El valor ingresado no puede ser mayor al valor máximo.');
            setShowError(true);
            return;
        } 

        if(valueFinal < valMin){
            setTypeModal('error');
            setTitleModal(null);
            setMessageError('El valor ingresado no puede ser menor al valor mínimo.');
            setShowError(true);
            return;
        }

        setShowAddAccount(true);
        setStep(1);
    }

    const handleBackStep = () => {
        if (step === 1) {
            setShowAddAccount(false);
        } else if (step === 2) {
            setShowAddAccount(true);
            setDisableContinue(true);
            setConfirmInfo(false);
            setStep(1)
        }
    }

    const handleFinal = () => {
        activeLoader();
        setMessageError('Hubo un error al intentar realizar la transacción.');
        setShowError(true);
        setTypeModal('error');
        setTitleModal(null);
        desactiveLoader();
        /**setShowAddAccount(false);
        setDisableContinue(true);
        setConfirmInfo(false);
        setStep(0);
        setValRecharge('');
        setConcepto('');
        setNames('');
        setSurnames('');
        setAlias('');
        setAccountNumber('');
        setDocument('');
        setBanks('');
        setTypeBank('');*/
    };

    const handleLimits = () => {
        setTitleModal('Límites transaccionales');
        setMessageError(`¿Cuáles son los topes y límites transaccionales?\n\n ${expo} opera como corresponsal digital del Banco Cooperativo Coopcentral, entidad que a través de ${expo}, el saldo máximo como el monto acumulado de las operaciones (entradas y salidas) no podrán exceder en ningún momento los $9,907,182, es decir, 210.50 UVT.\n\n Estos topes no son establecidos por ${expo} ni por el Banco Cooperativo Coopcentral, son establecidos por normatividad legal, según el decreto 222 del 2020 Por ser un depósito de bajo monto (DBM) con ${expo} puedes realizar transacciones acumuladas por mes de 210.5 UVT.\n\n ¿Mi depósito está exento de 4xmil (Gravamen a los movimientos financieros- GMF)? Con ${expo} puedes realizar transacciones exentas de 4xmil hasta por 65 Unidades de Valor Tributario (UVT) equivalentes a 3,059,000 de manera mensual. Una vez superes este monto, deberás realizar el pago del GMF por las transacciones realizadas`);
        setShowError(true);
        setTypeModal('info');
    }
    
    return(
        <ViewFadeIn isWidthFull>
            <HeaderForm
                onBack={() => handleBack()}
                title="Transferir Fondos"
            />
            {!showAddAccount && (
                <View style={styles.mV1}>
                    <Balance
                        isWelcome={false}
                    />
                </View>
            )}
            <View style={[styles.container, showAddAccount ? (styles.h100) : null]}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    extraHeight={Platform.select({ ios: 100, android: 120 })}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {!showAddAccount &&(
                            <SelectAmount
                                valMax={valMax}
                                valMin={valMin}
                                comision={comision}
                                isConcepto
                                concepto={inputConcepto}
                                amount={inputAmount}
                                type={1}
                                onShowLimits={handleLimits}
                            />
                        )}
                        {(showAddAccount && disableContinue) &&(
                            <AddAccount 
                                names={inputNames}
                                surnames={inputSurnames}
                                alias={inputAlias}
                                accountNumber={inputAccountNumber}
                                document={inputDocument}
                                banks={inputBanks}
                                typeBank={inputTypeBank}
                                isDisabled
                                selectAccount={() => {
                                    setDisableContinue(false);
                                    setConfirmInfo(true);
                                    setStep(2);
                                }}
                            />
                        )}
                        {(confirmInfo && !disableContinue) && (
                            <ConfirmBankTransfer 
                                amount={valRecharge} 
                                comision={comision} 
                                names={names} 
                                document={document} 
                                account={accountNumber} 
                                bank={banks}
                                concepto={concepto} 
                            />
                        )}
                    </ScrollView>
                    <Image style={styles.image} source={require('@/assets/images/general/logo_coopcentral.png')} resizeMode="contain"/>
                    {!showAddAccount ? (
                        <ButtonsPrimary 
                            label={'Continuar'}
                            onPress={handleNext}
                        />
                    ): (
                        <View style={styles.row}>
                            <ButtonsPrimary 
                                label={'Volver'}
                                onPress={handleBackStep}
                            />
                            <ButtonsPrimary 
                                label={'Continuar'}
                                onPress={handleFinal}
                                disabled={disableContinue}
                            />
                        </View>
                    )}
                </KeyboardAwareScrollView>
            </View>
            {showError &&(
                <InfoModal 
                    title={titleModal!}
                    type={typeModal} 
                    message={messageError} 
                    onPress={() => setShowError(false)} 
                    isVisible={showError}                    
                />
            )}
        </ViewFadeIn>
    );
}