import React, { Dispatch, SetStateAction, useState } from "react";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import Balance from "@/components/balance/balance";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { ScrollView, View, Image, Platform, Linking } from "react-native";
import { styles } from "./recharge.styles";
import SelectAmount from "@/components/amount/selectAmount/selectAmount";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Pse from "@/components/amount/pse/pse";
import RequestRecharge from "@/components/amount/requestRecharge/requestRecharge";
import InfoModal from "@/components/modals/infoModal/infoModal";
import { validateNumber } from "@/utils/validationForms";

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
    const [showPse, setShowPse] = useState(false);
    const [names, setNames] = useState('');
    const [surnames, setSurnames] = useState('');
    const [document, setDocument] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [banks, setBanks] = useState('');
    const { type } = useLocalSearchParams();
    const [showError, setShowError] = useState(false);
    const [messageError, setMessageError] = useState('');

    const inputAmount: Input = {
        onChangeText: setValRecharge,
        value: valRecharge
    }

    const inputNames: Input = {
        onChangeText: setNames,
        value: names
    }

    const inputSurnames: Input = {
        onChangeText: setSurnames,
        value: surnames
    }

    const inputDocument: Input = {
        onChangeText: setDocument,
        value: document
    }

    const inputEmail: Input = {
        onChangeText: setEmail,
        value: email
    }

    const handleSelect = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
        setter(item.value);
    };

    const inputAddress: Select = {
        onSelect: handleSelect(setAddress),
        selectedValue: address
    }

    const inputPhone: Input = {
        onChangeText: setPhone,
        value: phone
    }

    const inputBanks: Select = {
        onSelect: handleSelect(setBanks),
        selectedValue: banks
    }
    
    useFocusEffect(() => {
        setActiveTab('/home/recharge/');
    });
    
    const handleBack = () => {
        goBack();
    }; 

    const handleSendWhatsApp = () => {
        if (phone) {
            const phoneNumber = phone.replace(/\D/g, '');
            const message = `Hola, estoy interesado en recargar fondos.`;
            const url = `https://api.whatsapp.com/send?phone=+57${phoneNumber}&text=${encodeURIComponent(message)}`;

            Linking.canOpenURL(url)
                .then(supported => {  
                    if (supported) {
                        return Linking.openURL(url);
                    } else {
                        setMessageError('No se puede abrir WhatsApp.');
                        setShowError(true);
                    }
                })
                .catch(err => console.error('Error al abrir WhatsApp:', err));
        } else {
            setMessageError('Por favor, ingresa un número de teléfono válido.');
            setShowError(true);
        }
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
        
        setShowPse(true)
    }
    
    return(
        <ViewFadeIn isWidthFull>
            <HeaderForm
                onBack={() => handleBack()}
                title={`Recargar - ${type === '0'? 'Solicitar recarga' : 'PSE'}`}
            />
            <View style={styles.mV1}>
                <Balance
                    isWelcome={false}
                />
            </View>
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    extraHeight={Platform.select({ ios: 100, android: 120 })}
                >
                    <ScrollView showsHorizontalScrollIndicator={false}>
                       {type === '1' && (
                            <>
                                {!showPse &&(
                                    <SelectAmount
                                        valMax={valMax}
                                        valMin={valMin}
                                        comision="0"
                                        amount={inputAmount}
                                        type={0}
                                    />
                                )}
                                {showPse &&(
                                    <Pse 
                                        names={inputNames}
                                        surnames={inputSurnames}
                                        document={inputDocument}
                                        email={inputEmail}
                                        address={inputAddress}
                                        phone={inputPhone}
                                        banks={inputBanks}
                                    />
                                )}
                            </>
                       )}
                       {type == '0' && (
                        <RequestRecharge 
                            phone={inputPhone}
                        />
                       )}
                    </ScrollView>
                    <Image style={styles.image} source={require('@/assets/images/general/logo_coopcentral.png')} resizeMode="contain"/>
                    {type === '1' && (
                        <>
                            {!showPse ? (
                                <ButtonsPrimary 
                                    label={'Continuar'}
                                    onPress={handleNext}
                                />
                            ): (
                                <View style={styles.row}>
                                    <ButtonsPrimary 
                                        label={'Volver'}
                                        onPress={() => setShowPse(false)}
                                    />
                                    <ButtonsPrimary 
                                        label={'Continuar'}
                                        onPress={() => setShowPse(true)}
                                    />
                                </View>
                            )}
                        </>
                    )}
                    {type === '0' &&(
                        <ButtonsPrimary 
                            label={'Enviar'}
                            onPress={handleSendWhatsApp}
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