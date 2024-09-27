import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import Balance from "@/components/balance/balance";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { router, useFocusEffect } from "expo-router";
import { ScrollView, View, Image, Platform, PanResponder } from "react-native";
import { styles } from "./sendMoney.styles";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InfoModal from "@/components/modals/infoModal/infoModal";
import { validateNumber } from "@/utils/validationForms";
import ContactList from "@/components/amount/contactList/contactList";
import ContactSend from "@/components/amount/contactSend/contactSend";
import SelectAmount from "@/components/amount/selectAmount/selectAmount";
import ConfirmBankTransfer from "@/components/amount/confirmBankTransfer/confirmBankTransfer";
import { getBalance, getData, getNumberAccount } from "@/utils/storageUtils";
import { generateUniqueId } from "@/utils/fomatDate";
import instanceWallet from "@/services/instanceWallet";
import Constants from "expo-constants";
import { useBackHandler } from "@react-native-community/hooks";
import OtpValidationRegisterModal from "@/components/modals/otpValidationRegisterModal/otpValidationRegisterModal";

interface Input {
    onChangeText?: Dispatch<SetStateAction<string>>;
    value: string;
}

interface ContactSelect {
    name: string;
    phone: string | undefined;
}

const expo = Constants.expoConfig?.name || '';

export default function Page() {
    const { setActiveTab, goBack, activeLoader, desactiveLoader, activeTab} = useTab();
    const [valRecharge, setValRecharge] = useState('');
    const [valMax] = useState('2000000');
    const [valMin] = useState('10000');
    const [comision] = useState('0');
    const [showContactList, setShowContactList] = useState(true);
    const [showError, setShowError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [typeMessage, setTypeMessage] = useState<"error" | "info" | "success">('error');
    const [step, setStep] = useState(0);
    const [contactSelect, setContactSelect] = useState<ContactSelect>();
    const [contactInfo, setContactInfo] = useState<any>(null);
    const [typeFinish, setTypeFinish] = useState(0);
    const [titleModal, setTitleModal] = useState<string | null>(null);
    const [nullView, setNullView] = useState(true); 
    const [showOtpValidation, setShowOtpValidation] = useState(false);
    const [idTx, setIdTx] = useState('');

    const fetchSendTransaction = async () => {
        activeLoader();
        const infoClient = await getData('infoClient');
        const account = await getNumberAccount();
        const body = {
           tipo_oper_tx:"3",
           orig_ope:"13",
           tipo_mov_ori:"",
           tipo_mov_des:"",
           prod_orig: account?.startsWith('0') ? account.slice(1) : account,
           doc_prod_orig: `${infoClient.numDoc}`,
           nom_orig:`${infoClient.names} ${infoClient.surnames}`,
           id_tx_entidad: generateUniqueId(),
           prod_dest:`${contactInfo.no_cuenta}`,
           doc_prod_dest: `${contactInfo.docCli}`,
           nom_dest:`${`${contactInfo.nombres1} ${contactInfo.nombres2} ${contactInfo.apellido1} ${contactInfo.apellido2}`}`,
           descrip_tx: "Envio de billetera a billetera",
           valor_tx: validateNumber(valRecharge),
           tipo_canal_proce:"04",
           valor_comision: Number(comision)
        }
        
        await instanceWallet.post('atc', body)
        .then((response) => {
            const data = response.data;
            if(data.status === 200 && data.message.includes('éxito')){
                setIdTx(data.data.ID);
                setShowOtpValidation(true);
            } else {
                setTitleModal(null);
                setMessageError('La transacción ha sido rechazada. Por favor intentelo de nuevo más tarde.');
                setShowError(true);
                setTypeMessage('error');
                setTypeFinish(0);
            }
            desactiveLoader();
        })
        .catch((error) => {
            setTitleModal(null);
            setMessageError('Hubo un error al intentar realizar la transacción.');
            setShowError(true);
            setTypeMessage('error');
            setTypeFinish(0);
            desactiveLoader();
        });
    }

    const inputAmount: Input = {
        onChangeText: setValRecharge,
        value: valRecharge
    }

    useFocusEffect(() => {
        setActiveTab('/home/sendMoney/');
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
        handleBackStep();
        return true;
    });

    useEffect(() => {
        setNullView(true);
        if(activeTab === '/home/sendMoney/'){
            setShowContactList(true);
            setStep(0);
            setNullView(false);
        }
     }, [activeTab]) 

    const handleBack = () => {
        goBack();
    };

    const handleNext = async (type: number) => {
        if(type === 0){
            setShowContactList(false);
            setStep(1);
        } else if (type === 1){
            const balance = await getBalance();

            if(!valRecharge){
                setMessageError('Por favor ingresa un monto valido.');
                setShowError(true);
                setTypeFinish(0);
                setTitleModal(null);
                return;
            }

            if((Number(validateNumber(valRecharge)) + Number(comision)) > Number(balance) ){
                setTypeMessage('error');
                setTitleModal(null);
                setMessageError('Saldo insuficiente');
                setShowError(true);
                return;
            }

            setStep(2);
        } else if (type === 2) {
            fetchSendTransaction();
        }else {
            setValRecharge('');
            setShowContactList(true);
            setStep(0);
        }
    }

    const handleBackStep = () => {
        if (step === 1) {
            setValRecharge('');
            setShowContactList(true);
            setStep(0);
        } else if (step === 2) {
            setStep(1);
        } else {
            setValRecharge('');
            setShowContactList(true);
            setStep(0);
            router.push('/home')
        }
    }

    const handleResponseContact = (response: any) => {
        if (typeof response === 'string') {
            setMessageError(response);
            setShowError(true);
            setTypeMessage('error');
            setTitleModal(null);
        } else {
            const contact: ContactSelect = {
                name: `${response.nombres1} ${response.nombres2} ${response.apellido1} ${response.apellido2}`,
                phone: response.phone
            }
            setContactSelect(contact);
            setContactInfo(response);
            handleNext(0);
        }
    }

    const handleFinishTransaction = (type: number) => {
        if(type === 1){
            router.push('/home');
        }

        setShowError(false);
    }

    const handleLimits = () => {
        setTitleModal('Límites transaccionales');
        setMessageError(`¿Cuáles son los topes y limites de mi Deposito ordinario?\n\n ${expo} opera como corresponsal digital del Banco Cooperativo Coopcentral, entidad que a través de ${expo}, ofrece un depósito de bajo monto (DBM), por lo tanto, en tu Billetera puedes contar  un saldo  de 210.50 UVT mensuales legales vigentes, es decir 9,907,182 pesos colombianos. Estos montos, son establecidos por normatividad legal, según el decreto 222 del 2020, de igual forma por ser un depósito de bajo monto (DBM), puedes realizar movimientos acumulados por por mes hasta 210.50 UVT.\n\n¿Mi billetera está exento de 4xmil (Gravamen a los movimientos financieros- GMF)?\n\nCon ${expo} puedes realizar transacciones exentas de 4xmil hasta por 65 Unidades de Valor Tributario (UVT) equivalentes a 3,059,225 de manera mensual. Una vez superes este monto, deberás realizar el pago del GMF por las transacciones realizadas.`);
        setShowError(true);
        setTypeMessage('info');
    }

    const handleOtpValidationResponse = (message: string, type: "info" | "success" | "error") => {
        setMessageError(message);
        setTypeMessage(type);
        setShowError(true);
    };

    const handleOnFinish = (modalidad?:string) => {
        if(modalidad === '1') {
         setShowOtpValidation(false);
         setTitleModal(null);
         setMessageError('Transacción completada con éxito.');
         setShowError(true);
         setTypeMessage('success');

         setValRecharge('');
         setShowContactList(true);
         setStep(0);
         setTypeFinish(1)
        }
     }

    if(nullView){
        return null;
    }

    return(
        <ViewFadeIn  {...panResponder.panHandlers} isWidthFull>
            <HeaderForm
                onBack={() => handleBackStep()}
                title="Enviar fondos a otra moradita"
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
                        onResponseContact={handleResponseContact}
                    />
                </View>
            )}
            <View style={[styles.container]}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    extraHeight={Platform.select({ ios: 100, android: 120 })}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {showContactList &&(
                            <ContactList 
                                onResponseContact={handleResponseContact} 
                            />
                        )}
                        {(!showContactList && step === 1) &&(
                            <SelectAmount
                                comision={comision}
                                amount={inputAmount}
                                type={2}
                                onShowLimits={handleLimits}
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
                                    onPress={() => handleNext(step === 1 ? 1 : step === 2 ? 2 : 3)}
                                />
                            </View>
                        </>
                    )}
                </KeyboardAwareScrollView>
            </View>
            {showOtpValidation && (
                <OtpValidationRegisterModal 
                    type={2}
                    id={idTx}
                    onClose={handleOtpValidationResponse} 
                    onView={()  =>  setShowOtpValidation(false)} 
                    onFinish={handleOnFinish}                    
                />
            )}
            {showError &&(
                <InfoModal 
                    type={typeMessage} 
                    message={messageError} 
                    onPress={() => handleFinishTransaction(typeFinish)} 
                    isVisible={showError}                    
                />
            )}
        </ViewFadeIn>
    );
}