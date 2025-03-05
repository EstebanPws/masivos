import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import Balance from "@/components/balance/balance";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { router, useFocusEffect } from "expo-router";
import { ScrollView, View, Image, Platform, PanResponder } from "react-native";
import styles from "./cashout.styles";
import SelectAmount from "@/components/amount/selectAmount/selectAmount";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InfoModal from "@/components/modals/infoModal/infoModal";
import { validateNumber } from "@/utils/validationForms";
import CountdownTimer from "@/components/amount/countdownTimer/countdownTimer";
import Constants from "expo-constants";
import { useBackHandler } from "@react-native-community/hooks/lib/useBackHandler";
import { getBalance } from "@/utils/storageUtils";


interface Input {
    onChangeText?: Dispatch<SetStateAction<string>>;
    value: string;
}

const expo = Constants.expoConfig?.name || '';

export default function Page() {
    const { setActiveTab, goBack, activeTab} = useTab();
    const [valRecharge, setValRecharge] = useState('');
    const [valMax] = useState('2000000');
    const [valMin] = useState('10000');
    const [comision] = useState('0');
    const [showCountDown, setShowCountDown] = useState(false);
    const [showError, setShowError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [step, setStep] = useState(0);
    const [typeModal, setTypeModal] = useState<'error' | 'info' | 'success'>('error');
    const [titleModal, setTitleModal] = useState<string | null>(null);
    const [typeCloseModal, setTypeCloseModal] = useState(1);
    const [nullView, setNullView] = useState(true); 

    const inputAmount: Input = {
        onChangeText: setValRecharge,
        value: valRecharge
    }
    
    useFocusEffect(() => {
        setActiveTab('/home/cashout/');
    });
    
    const handleGesture = (event: any) => {
        if (event.nativeEvent.translationX > 100) {
           handleBackStep
        }
      };

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            handleGesture(gestureState);
        },
    });

    useBackHandler(() => {
        setShowCountDown(false);
        return true;
    });

    useEffect(() => {
        setNullView(true);
        if(activeTab === '/home/cashout/'){
            setShowCountDown(false);
            setNullView(false);
        }
     }, [activeTab]);

    const handleNext = async () => {        
        const rawBalance = String(await getBalance());
            
        const balance = parseFloat(rawBalance.replace(/,/g, '').trim());

        if(!valRecharge){
            setMessageError('Por favor ingresa un monto valido.');
            setShowError(true);
            setTypeModal('error');
            setTypeCloseModal(1);
            setTitleModal(null);
            return;
        } 

        if((Number(validateNumber(valRecharge)) + Number(comision)) > Number(balance) ){
            setTypeModal('error');
            setTitleModal(null);
            setMessageError('Saldo insuficiente');
            setShowError(true);
            return;
        }

        if(Number(balance) === 0 || (Number(validateNumber(valRecharge)) + Number(comision)) === 0 ){
            setTypeModal('error');
            setTitleModal(null);
            setMessageError('Saldo insuficiente');
            setShowError(true);
            return;
        }

        setShowCountDown(true);
        setStep(1);
    }

    const handleBackStep = (type: number) => {
        setValRecharge('');
        setStep(0);
        setShowCountDown(false);
        if(type === 1){
            router.replace('/home')
        }
    }

    const handleErrorCode = (response: any) => {
        setTypeModal(response.type);
        setMessageError(response.message);
        setShowError(true);
        setTypeCloseModal(0);
    }

    const handelCloseModal = (type: number) => {
        if(type === 0){
            handleBackStep(0);
        }
        setShowError(false);
    }

    const handleLimits = () => {
        setTitleModal('Límites transaccionales');
        setMessageError(`¿Cuáles son los topes y límites de mi Deposito de bajo monto?\n\n ${expo} opera como corresponsal digital del Banco Cooperativo Coopcentral, entidad que a través de ${expo}, ofrece un depósito de bajo monto (DBM), por lo tanto, en tu Billetera ${expo} puedes contar un saldo de 210.50 UVT mensuales legales vigentes, es decir 10,482,689.50 pesos colombianos. Estos montos, son establecidos por normatividad legal, según el decreto 222 del 2020, de igual forma por ser un depósito de bajo monto (DBM), puedes realizar movimientos acumulados por por mes hasta 210.50 UVT.\n\n¿Mi billetera ${expo} está exento de 4xmil (Gravamen a los movimientos financieros- GMF)?\n\nCon ${expo} puedes realizar transacciones exentas de 4xmil hasta por 65 Unidades de Valor Tributario (UVT) equivalentes a 3,236,935 de manera mensual. Una vez superes este monto, deberás realizar el pago del GMF por las transacciones realizadas.`);

        setShowError(true);
        setTypeCloseModal(1);
        setTypeModal('info');
    }
    
    if(nullView){
        return null;
    }

    return(
        <ViewFadeIn {...panResponder.panHandlers} isWidthFull>
            <HeaderForm
                onBack={() => handleBackStep(step === 0 ? 1 : 0)}
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
                                onFinish={() => handleBackStep(1)}
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
                            label={'Finalizar'}
                            onPress={() => handleBackStep(1)}
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