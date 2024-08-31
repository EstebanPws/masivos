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
import Constants from "expo-constants";

interface Input {
    onChangeText?: Dispatch<SetStateAction<string>>;
    value: string;
}

interface Select {
    onSelect: (item: any) => void;
    selectedValue: any;
}

const expo = Constants.expoConfig?.name || '';

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
    const [typeModal, setTypeModal] = useState<'error' | 'info' | 'success'>('error');
    const [titleModal, setTitleModal] = useState<string | null>(null);

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
                        setTitleModal(null);
                        setMessageError('No se puede abrir WhatsApp.');
                        setTypeModal('error');
                        setShowError(true);
                    }
                })
                .catch(err => console.error('Error al abrir WhatsApp:', err));
        } else {
            setTitleModal(null);
            setMessageError('Por favor, ingresa un número de teléfono válido.');
            setShowError(true);
            setTypeModal('error');
        }
    };

    const handleNext = (type: number) => {
       if(type === 0){
        const valueFinal = validateNumber(valRecharge);
        
        if(!valRecharge){
            setTitleModal(null);
            setMessageError('Por favor ingresa un monto valido.');
            setShowError(true);
            setTypeModal('error');
            return;
        } 

        if(valueFinal > valMax){
            setTitleModal(null);
            setMessageError('El valor ingresado no puede ser mayor al valor máximo.');
            setShowError(true);
            setTypeModal('error');
            return;
        } 

        if(valueFinal < valMin){
            setTitleModal(null);
            setMessageError('El valor ingresado no puede ser menor al valor mínimo.');
            setShowError(true);
            setTypeModal('error');
            return;
        }
        
        setShowPse(true);
       } else {
            if(inputNames.value == '' || inputSurnames.value === '' || inputDocument.value === '' || inputEmail.value === '' || inputAddress.selectedValue === '' || inputPhone.value === '' || inputBanks.selectedValue == ''){
                setTitleModal(null);
                setMessageError('Por favor ingrese todos los datos');
                setShowError(true);
                return;
            }

            setTitleModal(null);
            setMessageError('Hubo un error al intetar realizar la transacción.');
            setTypeModal('error');
            setShowError(true);
       }
    }

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
                    <ScrollView showsVerticalScrollIndicator={false}>
                       {type === '1' && (
                            <>
                                {!showPse &&(
                                    <SelectAmount
                                        valMax={valMax}
                                        valMin={valMin}
                                        comision="0"
                                        amount={inputAmount}
                                        type={0}
                                        onShowLimits={handleLimits}
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
                            onPress={handleLimits}
                        />
                       )}
                    </ScrollView>
                    <Image style={styles.image} source={require('@/assets/images/general/logo_coopcentral.png')} resizeMode="contain"/>
                    {type === '1' && (
                        <>
                            {!showPse ? (
                                <ButtonsPrimary 
                                    label={'Continuar'}
                                    onPress={() => handleNext(0)}
                                />
                            ): (
                                <View style={styles.row}>
                                    <ButtonsPrimary 
                                        label={'Volver'}
                                        onPress={() => setShowPse(false)}
                                    />
                                    <ButtonsPrimary 
                                        label={'Continuar'}
                                        onPress={() => handleNext(1)}
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