import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import Balance from "@/components/balance/balance";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { ScrollView, View, Image, Platform, Linking, Alert, PanResponder, TouchableOpacity } from "react-native";
import styles from "./recharge.styles";
import SelectAmount from "@/components/amount/selectAmount/selectAmount";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Pse from "@/components/amount/pse/pse";
import RequestRecharge from "@/components/amount/requestRecharge/requestRecharge";
import InfoModal from "@/components/modals/infoModal/infoModal";
import { validateNumber } from "@/utils/validationForms";
import Constants from "expo-constants";
import { getBalance, getData, getNumberAccount } from "@/utils/storageUtils";
import { generateUniqueId } from "@/utils/fomatDate";
import instanceWallet from "@/services/instanceWallet";
import { AnimatePresence, MotiView } from "moti";
import WebView from "react-native-webview";
import { ShouldStartLoadRequest, WebViewErrorEvent } from "react-native-webview/lib/WebViewTypes";
import { useBackHandler } from "@react-native-community/hooks";
import { Icon } from "react-native-paper";
import ButtonsSecondary from "@/components/forms/buttons/buttonSecondary/button";

interface Input {
    onChangeText?: Dispatch<SetStateAction<string>>;
    value: string;
}

interface Select {
    onSelect: (item: any) => void;
    selectedValue: any;
}

const expo = Constants.expoConfig?.name || '';
const extra = Constants.expoConfig?.extra || {};
const {colorPrimary} = extra;


export default function Page() {
    const { setActiveTab, goBack, activeLoader, desactiveLoader, activeTab} = useTab();
    const [valRecharge, setValRecharge] = useState('');
    const [valMax] = useState('2000000');
    const [valMin] = useState('10000');
    const [comision] = useState('0');
    const [showPse, setShowPse] = useState(false);
    const [names, setNames] = useState('');
    const [surnames, setSurnames] = useState('');
    const [document, setDocument] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [banks, setBanks] = useState('');
    const [bankName, setBankName] = useState('');
    const { type } = useLocalSearchParams();
    const [showError, setShowError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [typeModal, setTypeModal] = useState<'error' | 'info' | 'success'>('error');
    const [titleModal, setTitleModal] = useState<string | null>(null);
    const [urlPse, setUrlPse] = useState('');
    const [finalTransaction, setFinalTransaction] = useState(false);
    const [nullView, setNullView] = useState(true); 
    const [viewBalanceComplete, setViewBalanceComplete] = useState(true);

    const fetchInfoClient = async () => {
        const infoClient = await getData('infoClient');
        setNames(infoClient.names);
        setSurnames(infoClient.surnames);
        setDocument(infoClient.numDoc);
        setEmail(infoClient.email);
        setPhone(infoClient.phoneNumber);
        setAddress(infoClient.direRes);
    };

    const fetchCrateTransaction = async () => {
        const account = await getNumberAccount();
        let accountFinal = account?.startsWith('0') ? account.slice(1) : account;
        const body = {
            amount : validateNumber(valRecharge),
            no_cuenta: accountFinal,
            identification_type : 4,
            Documento : document,
            Correo : email,
            Nombres : names,
            Apellidos : surnames,
            Celular : Number(phone),
            Direccion : address,
            external_order : generateUniqueId(),
            CodigoBanco : banks,
            NombreBanco : bankName,
            additionalData : {
                additionalData : "Recarga PSE"
            }
        }

        await instanceWallet.post('PSE', body)
        .then((response) => {
            const data = response.data;
            setUrlPse(data.data);
        })
        .catch((err) => {
            console.log(err.response.data);
            
            setTitleModal(null);
            setMessageError('Hubo un error al intentar realizar la transacción.');
            setTypeModal('error');
            setShowError(true);
        })
    }

    useEffect(() => {
        fetchInfoClient();
    }, []);

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

    const handleSelectBanks = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
        setBankName(item.name);
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
        onSelect: handleSelectBanks(setBanks),
        selectedValue: banks
    }

    const handleGesture = (event: any) => {
        if (event.nativeEvent.translationX > 100) {
            setShowPse(false);
        }
      };

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            handleGesture(gestureState);
        },
    });

    useBackHandler(() => {
        setShowPse(false);
        if(!showPse){
            router.push('/home');
        }
        return true;
    });

    useEffect(() => {
        setNullView(true);
        if(activeTab === '/home/recharge/'){
            setShowPse(false);
            setNullView(false);
        }
     }, [activeTab]) 
    
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

    const handleNext = async (type: number) => {
       if(type === 0){
        if(!valRecharge){
            setTitleModal(null);
            setMessageError('Por favor ingresa un monto valido.');
            setShowError(true);
            setTypeModal('error');
            return;
        }
        
        setShowPse(true);
       } else {
            if(inputNames.value == '' || inputSurnames.value === '' || inputDocument.value === '' || inputEmail.value === '' || inputAddress.selectedValue === '' || inputPhone.value === '' || inputBanks.selectedValue == ''){
                setTitleModal(null);
                setMessageError('Por favor ingresa todos los datos');
                setShowError(true);
                return;
            }

            fetchCrateTransaction();
       }
    }

    const handleLimits = () => {
        setTitleModal('Límites transaccionales');
        setMessageError(`¿Cuáles son los topes y límites de mi Deposito de bajo monto?\n\n ${expo} opera como corresponsal digital del Banco Cooperativo Coopcentral, entidad que a través de ${expo}, ofrece un depósito de bajo monto (DBM), por lo tanto, en tu Billetera ${expo} puedes contar un saldo de 210.50 UVT mensuales legales vigentes, es decir 10,482,689.50 pesos colombianos. Estos montos, son establecidos por normatividad legal, según el decreto 222 del 2020, de igual forma por ser un depósito de bajo monto (DBM), puedes realizar movimientos acumulados por por mes hasta 210.50 UVT.\n\n¿Mi billetera ${expo} está exento de 4xmil (Gravamen a los movimientos financieros- GMF)?\n\nCon ${expo} puedes realizar transacciones exentas de 4xmil hasta por 65 Unidades de Valor Tributario (UVT) equivalentes a 3,236,935 de manera mensual. Una vez superes este monto, deberás realizar el pago del GMF por las transacciones realizadas.`);
        setShowError(true);
        setTypeModal('info');
    }

    const handleShouldStartLoadWithRequest = (request: ShouldStartLoadRequest) => { 
        if (request.url) {
            if(request.url.includes('https://backend.paymentsway.co/pse/response/')) {
                setFinalTransaction(true);
            }
        }
        return true;
    };

    const handleError = (syntheticEvent: WebViewErrorEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.log(nativeEvent);
    };

    const handleSslError = (event: { preventDefault: any; }) => {
        Alert.alert(
            'SSL Certificate Error',
            'An SSL error occurred. Do you want to continue anyway?',
            [
                { text: 'Cancel', onPress: () => event.preventDefault(), style: 'cancel' },
                { text: 'Continue', onPress: () => event.preventDefault() },
            ],
            { cancelable: false }
        );
    };

    const handelFinalTransaction = () => {
        setUrlPse('');
        setValRecharge('');
        setShowPse(false);
        setFinalTransaction(false);
    }

    if(nullView){
        return null;
    }

    return(
        <ViewFadeIn {...panResponder.panHandlers} isWidthFull>
            <HeaderForm
                onBack={() => handleBack()}
                title={`Recargar - ${type === '0'? 'Solicitar recarga' : 'PSE'}`}
            />
            {urlPse  === '' && (
                <>
                    <View style={styles.mV1}>
                        <AnimatePresence>
                            {viewBalanceComplete && (
                                <MotiView
                                    from={{ opacity: 0, translateY: 0 }}
                                    animate={{ opacity: 1, translateY: 20 }}
                                    exit={{ opacity: 0, translateY: 0 }}
                                    transition={{ type: 'timing', duration: 300 }}
                                    style={{ width: '100%' }}
                                >
                                     <TouchableOpacity style={{position: 'absolute', right: 30, top: 10, zIndex: 9}} onPress={() => setViewBalanceComplete(!viewBalanceComplete)}>
                                        <Icon 
                                            source={'eye-off'}
                                            size={24}
                                            color={viewBalanceComplete ? "#fff" : colorPrimary}
                                        />
                                    </TouchableOpacity>
                                     <Balance
                                        isWelcome={false}
                                    />
                                </MotiView>
                            )}
                        </AnimatePresence>
                    </View>
                    <View style={[{height: viewBalanceComplete ? "52%" : "75%"}, styles.container]}>
                        <AnimatePresence>
                            {!viewBalanceComplete && (
                                <MotiView
                                    from={{ opacity: 0, translateY: 0 }}
                                    animate={{ opacity: 1, translateY: 20 }}
                                    exit={{ opacity: 0, translateY: 0 }}
                                    transition={{ type: 'timing', duration: 300 }}
                                    style={{ width: '100%', alignItems: 'flex-end', marginBottom: 50, marginTop: -20}}
                                >
                                    <ButtonsSecondary 
                                        label="Ver mi saldo"
                                        onPress={() => setViewBalanceComplete(!viewBalanceComplete)}
                                    />
                                </MotiView>
                            )}
                        </AnimatePresence>
                        <KeyboardAwareScrollView
                            enableOnAndroid={true}
                            extraHeight={Platform.select({ ios: 100, android: 120 })}
                        >
                            <ScrollView showsVerticalScrollIndicator={false}>
                            {type === '1' && (
                                    <>
                                        {!showPse &&(
                                            <SelectAmount
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
                </>
            )}
            {urlPse && (
                <MotiView
                    from={{ opacity: 0, translateY: -50 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 500 }}
                    style={styles.containerPSE}
                >
                    <WebView
                        style={{flex: 1}}
                        javaScriptEnabled={true}
                        cacheEnabled={false}
                        allowFileAccess={true}
                        javaScriptCanOpenWindowsAutomatically={true}
                        domStorageEnabled={true}
                        allowFileAccessFromFileURLs={true}
                        allowUniversalAccessFromFileURLs={true}
                        allowsInlineMediaPlayback={true}
                        originWhitelist={['*']}
                        mixedContentMode="always"
                        geolocationEnabled={true}
                        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
                        source={{ uri: urlPse }}
                        onShouldStartLoadWithRequest={(request) => handleShouldStartLoadWithRequest(request)}
                        onError={(syntheticEvent) => handleError(syntheticEvent)}
                        onSslError={(event: { preventDefault: () => void; }) => handleSslError(event)}
                    />
                    {finalTransaction && (
                        <ButtonsPrimary 
                            label={'Volver'}
                            onPress={handelFinalTransaction}
                        />
                    )}
                </MotiView>
            )}
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