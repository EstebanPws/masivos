import React, { Dispatch, SetStateAction, useState } from "react";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import Balance from "@/components/balance/balance";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { router, useFocusEffect } from "expo-router";
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
import { getData, getNumberAccount } from "@/utils/storageUtils";
import { generateUniqueId } from "@/utils/fomatDate";
import instanceWallet from "@/services/instanceWallet";
import Constants from "expo-constants";

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
    const { setActiveTab, goBack, activeLoader, desactiveLoader } = useTab();
    const [valRecharge, setValRecharge] = useState('');
    const [valMax] = useState('2000000');
    const [valMin] = useState('10000');
    const [comision] = useState('4300');
    const [showContactList, setShowContactList] = useState(true);
    const [showError, setShowError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [typeMessage, setTypeMessage] = useState<"error" | "info" | "success">('error');
    const [step, setStep] = useState(0);
    const [contactSelect, setContactSelect] = useState<ContactSelect>();
    const [contactInfo, setContactInfo] = useState<any>(null);
    const [typeFinish, setTypeFinish] = useState(0);
    const [titleModal, setTitleModal] = useState<string | null>(null);

    const fetchSendTransaction = async () => {
        activeLoader();
        const infoClient = await getData('infoClient');
        const account = await getNumberAccount();
        const body = {
           tipo_oper_tx:"3",
           orig_ope:"13",
           tipo_mov_ori:"",
           tipo_mov_des:"",
           prod_orig:`${account?.startsWith('8') ? account : `0${account}`}`,
           doc_prod_orig: `${infoClient.numDoc}`,
           nom_orig:`${infoClient.names} ${infoClient.surnames}`,
           id_tx_entidad: generateUniqueId(),
           prod_dest:`${contactInfo.contact.no_cuenta.startsWith('8') ? contactInfo.contact.no_cuenta : `0${contactInfo.contact.no_cuenta}`}`,
           doc_prod_dest: `${contactInfo.contact.cliente.docCli}`,
           nom_dest:`${`${contactInfo.contact.cliente.nombres1} ${contactInfo.contact.cliente.nombres2} ${contactInfo.contact.cliente.apellido1} ${contactInfo.contact.cliente.apellido2}`}`,
           descrip_tx: "Envio de billetera a billetera",
           valor_tx: validateNumber(valRecharge),
           tipo_canal_proce:"04",
           valor_comision: Number(comision)
        }

        await instanceWallet.post('atc', body)
        .then((response) => {
            const data = response.data;
            if(!data.message.includes('[')){
                setTitleModal(null);
                setMessageError('Transacción completada con éxito.');
                setShowError(true);
                setTypeMessage('success');

                setValRecharge('');
                setShowContactList(true);
                setStep(0);
                setTypeFinish(1)
            } else {
                setTitleModal(null);
                setMessageError('La transacción ha sido rechazada. Por favor intetelo de nuevo más tarde.');
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
                setTypeFinish(0);
                setTitleModal(null);
                return;
            }

            if(valueFinal > valMax){
                setMessageError('El valor ingresado no puede ser mayor al valor máximo.');
                setShowError(true);
                setTypeFinish(0);
                setTitleModal(null);
                return;
            }

            if(valueFinal < valMin){
                setMessageError('El valor ingresado no puede ser menor al valor mínimo.');
                setShowError(true);
                setTypeFinish(0);
                setTitleModal(null);
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
            setShowContactList(true);
        } else if (step === 2) {
            setStep(1);
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
                name: `${response.contact.cliente.nombres1} ${response.contact.cliente.nombres2} ${response.contact.cliente.apellido1} ${response.contact.cliente.apellido2}`,
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
        setMessageError(`¿Cuáles son los topes y límites transaccionales?\n\n ${expo} opera como corresponsal digital del Banco Cooperativo Coopcentral, entidad que a través de ${expo}, el saldo máximo como el monto acumulado de las operaciones (entradas y salidas) no podrán exceder en ningún momento los $9,907,182, es decir, 210.50 UVT.\n\n Estos topes no son establecidos por ${expo} ni por el Banco Cooperativo Coopcentral, son establecidos por normatividad legal, según el decreto 222 del 2020 Por ser un depósito de bajo monto (DBM) con ${expo} puedes realizar transacciones acumuladas por mes de 210.5 UVT.\n\n ¿Mi depósito está exento de 4xmil (Gravamen a los movimientos financieros- GMF)? Con ${expo} puedes realizar transacciones exentas de 4xmil hasta por 65 Unidades de Valor Tributario (UVT) equivalentes a 3,059,000 de manera mensual. Una vez superes este monto, deberás realizar el pago del GMF por las transacciones realizadas`);
        setShowError(true);
        setTypeMessage('info');
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
                                valMax={valMax}
                                valMin={valMin}
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