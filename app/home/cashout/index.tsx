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


interface Input {
    onChangeText?: Dispatch<SetStateAction<string>>;
    value: string;
}

interface Select {
    onSelect: (item: any) => void;
    selectedValue: any;
}

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

    const inputAmount: Input = {
        onChangeText: setValRecharge,
        value: valRecharge
    }
    
    useFocusEffect(() => {
        setActiveTab('/home/cashout/');
    });
    
    const handleBack = () => {
        goBack();
    }; 

    const handleNext = () => {
        const valueFinal = validateNumber(valRecharge);
        
        if(!valRecharge){
            setMessageError('Por favor ingresa un monto valido.');
            setShowError(true);
            return;
        } 

        if(valueFinal > valMax){
            setMessageError('El valor ingresado no puede ser mayor al valor máximo.');
            setShowError(true);
            return;
        } 

        if(valueFinal < valMin){
            setMessageError('El valor ingresado no puede ser menor al valor mínimo.');
            setShowError(true);
            return;
        }

        setShowCountDown(true);
        setStep(1);
    }

    const handleBackStep = () => {
        setShowCountDown(false);
        setValRecharge('');
        setStep(0);
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
                            />
                        )}
                        {(showCountDown) &&(
                           <CountdownTimer
                                amount={valRecharge}
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
                    type={"error"} 
                    message={messageError} 
                    onPress={() => setShowError(false)} 
                    isVisible={showError}                    
                />
            )}
        </ViewFadeIn>
    );
}