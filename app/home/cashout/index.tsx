import React, { Dispatch, SetStateAction, useState } from "react";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import Balance from "@/components/balance/balance";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { useFocusEffect } from "expo-router";
import { ScrollView, View, Image, Platform } from "react-native";
import { styles } from "./cashout.styles";
import SelectAmount from "@/components/amount/selectAmount/selectAmount";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InfoModal from "@/components/modals/infoModal/infoModal";
import { validateNumber } from "@/utils/validationForms";
import CountdownTimer from "@/components/amount/countdownTimer/countdownTimer";
import Constants from "expo-constants";


interface Input {
    onChangeText?: Dispatch<SetStateAction<string>>;
    value: string;
}

const expo = Constants.expoConfig?.name || '';

export default function Page() {
    const { setActiveTab, goBack } = useTab();
    const [valRecharge, setValRecharge] = useState('');
    const [valMax] = useState('2000000');
    const [valMin] = useState('10000');
    const [comision] = useState('4300');
    const [showCountDown, setShowCountDown] = useState(false);
    const [showError, setShowError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [step, setStep] = useState(0);
    const [typeModal, setTypeModal] = useState<'error' | 'info' | 'success'>('error');
    const [titleModal, setTitleModal] = useState<string | null>(null);
    const [typeCloseModal, setTypeCloseModal] = useState(1);

    const inputAmount: Input = {
        onChangeText: setValRecharge,
        value: valRecharge
    }
    
    useFocusEffect(() => {
        setActiveTab('/home/cashout/');
    });
    
    const handleBack = () => {
        handleBackStep();
        goBack();
    }; 

    const handleNext = () => {
        const valueFinal = validateNumber(valRecharge);
        
        if(!valRecharge){
            setMessageError('Por favor ingresa un monto valido.');
            setShowError(true);
            setTypeModal('error');
            setTypeCloseModal(1);
            setTitleModal(null);
            return;
        } 

        if(valueFinal > valMax){
            setMessageError('El valor ingresado no puede ser mayor al valor máximo.');
            setShowError(true);
            setTypeModal('error');
            setTypeCloseModal(1);
            setTitleModal(null);
            return;
        } 

        if(valueFinal < valMin){
            setMessageError('El valor ingresado no puede ser menor al valor mínimo.');
            setShowError(true);
            setTypeModal('error');
            setTypeCloseModal(1);
            setTitleModal(null);
            return;
        }

        setShowCountDown(true);
        setStep(1);
    }

    const handleBackStep = () => {
        setValRecharge('');
        setStep(0);
        setShowCountDown(false);
    }

    const handleErrorCode = (response: any) => {
        setTypeModal(response.type);
        setMessageError(response.message);
        setShowError(true);
        setTypeCloseModal(0);
    }

    const handelCloseModal = (type: number) => {
        if(type === 0){
            handleBackStep();
        }
        setShowError(false);
    }

    const handleLimits = () => {
        setTitleModal('Límites transaccionales');
        setMessageError(`¿Cuáles son los topes y límites transaccionales?\n\n ${expo} opera como corresponsal digital del Banco Cooperativo Coopcentral, entidad que a través de ${expo}, el saldo máximo como el monto acumulado de las operaciones (entradas y salidas) no podrán exceder en ningún momento los $9,907,182, es decir, 210.50 UVT.\n\n Estos topes no son establecidos por ${expo} ni por el Banco Cooperativo Coopcentral, son establecidos por normatividad legal, según el decreto 222 del 2020 Por ser un depósito de bajo monto (DBM) con ${expo} puedes realizar transacciones acumuladas por mes de 210.5 UVT.\n\n ¿Mi depósito está exento de 4xmil (Gravamen a los movimientos financieros- GMF)? Con ${expo} puedes realizar transacciones exentas de 4xmil hasta por 65 Unidades de Valor Tributario (UVT) equivalentes a 3,059,000 de manera mensual. Una vez superes este monto, deberás realizar el pago del GMF por las transacciones realizadas`);
        setShowError(true);
        setTypeCloseModal(1);
        setTypeModal('info');
    }
    
    return(
        <ViewFadeIn isWidthFull>
            <HeaderForm
                onBack={() => handleBack()}
                title="Retirar Fondos"
            />
            <View style={styles.mV1}>
                <Balance
                    isWelcome={false}
                />
            </View>
            <View style={[styles.container]}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    extraHeight={Platform.select({ ios: 100, android: 120 })}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {!showCountDown &&(
                            <SelectAmount
                                valMax={valMax}
                                valMin={valMin}
                                comision={comision}
                                amount={inputAmount}
                                type={3}
                                onShowLimits={handleLimits}
                            />
                        )}
                        {(showCountDown) &&(
                           <CountdownTimer
                                amount={valRecharge}
                                onError={handleErrorCode}
                                onFinish={handleBackStep}
                           />
                        )}
                    </ScrollView>
                    <Image style={styles.image} source={require('@/assets/images/general/logo_coopcentral.png')} resizeMode="contain"/>
                    {!showCountDown ? (
                        <ButtonsPrimary 
                            label={'Continuar'}
                            onPress={handleNext}
                        />
                    ): (
                        <ButtonsPrimary 
                            label={'Volver'}
                            onPress={handleBackStep}
                        />
                    )}
                </KeyboardAwareScrollView>
            </View>
            {showError &&(
                <InfoModal 
                    title={titleModal!}
                    type={typeModal} 
                    message={messageError} 
                    onPress={() => handelCloseModal(typeCloseModal)} 
                    isVisible={showError}                    
                />
            )}
        </ViewFadeIn>
    );
}