import React, { Dispatch, SetStateAction, useState } from "react";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import Balance from "@/components/balance/balance";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { useFocusEffect } from "expo-router";
import { ScrollView, View, Image, Platform } from "react-native";
import { styles } from "./sendMoney.styles";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InfoModal from "@/components/modals/infoModal/infoModal";
import { validateNumber } from "@/utils/validationForms";
import ContactList from "@/components/amount/contactList/contactList";
import ContactSend from "@/components/amount/contactSend/contactSend";
import SelectAmount from "@/components/amount/selectAmount/selectAmount";
import ConfirmBankTransfer from "@/components/amount/confirmBankTransfer/confirmBankTransfer";

interface Input {
    onChangeText?: Dispatch<SetStateAction<string>>;
    value: string;
}

interface ContactSelect {
    name: string;
    phone: string | undefined;
}

export default function Page() {
    const { setActiveTab, goBack } = useTab();
    const [valRecharge, setValRecharge] = useState('');
    const [valMax] = useState('2000000');
    const [valMin] = useState('10000');
    const [comision] = useState('4300');
    const [showContactList, setShowContactList] = useState(true);
    const [showError, setShowError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [step, setStep] = useState(0);
    const [contactSelect, setContactSelect] = useState<ContactSelect>();

    const inputAmount: Input = {
        onChangeText: setValRecharge,
        value: valRecharge
    }

    useFocusEffect(() => {
        setActiveTab('/home/sendMoney/');
    });

    const handleBack = () => {
        goBack();
    };

    const handleNext = (type: number) => {

        if(type === 0){
            setShowContactList(false);
            setStep(1);
        } else if (type === 1){
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

            setStep(2);
        } else {
            setValRecharge('');
            setShowContactList(true);
            setStep(0);
        }
    }

    const handleBackStep = () => {
        if (step === 1) {
            setShowContactList(true);
        } else if (step === 2) {
            setStep(1);
        }
    }

    return(
        <ViewFadeIn isWidthFull>
            <HeaderForm
                onBack={() => handleBack()}
                title="Enviar Fondos"
            />
            {!showContactList && (
                <View style={styles.mV1}>
                    <Balance
                        isWelcome={false}
                    />
                </View>
            )}
            {showContactList && (
                <View style={styles.mV1}>
                    <ContactSend
                        isWelcome={false}
                    />
                </View>
            )}
            <View style={[styles.container]}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    extraHeight={Platform.select({ ios: 100, android: 120 })}
                >
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        {showContactList &&(
                            <ContactList 
                                onPress={() => handleNext(0)}
                                setContact={setContactSelect} 
                            />
                        )}
                        {(!showContactList && step === 1) &&(
                            <SelectAmount
                                valMax={valMax}
                                valMin={valMin}
                                comision={comision}
                                amount={inputAmount}
                                type={2}
                            />
                        )}
                        {step === 2 && (
                            <ConfirmBankTransfer 
                                amount={valRecharge} 
                                comision={comision} 
                                names={contactSelect?.name} 
                                phone={contactSelect?.phone}
                            />
                        )}
                    </ScrollView>
                    {!showContactList && (
                        <>
                            <Image style={styles.image} source={require('@/assets/images/general/logo_coopcentral.png')} resizeMode="contain"/>
                            <View style={styles.row}>
                                <ButtonsPrimary 
                                    label={'Volver'}
                                    onPress={handleBackStep}
                                />
                                <ButtonsPrimary 
                                    label={'Continuar'}
                                    onPress={() => handleNext(step === 1 ? 1 : 2)}
                                />
                            </View>
                        </>
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