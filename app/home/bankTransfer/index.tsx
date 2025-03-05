import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import Balance from "@/components/balance/balance";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { router, useFocusEffect } from "expo-router";
import { useBackHandler } from '@react-native-community/hooks';
import { ScrollView, View, Image, Platform, PanResponder, TouchableOpacity } from "react-native";
import styles from "./bankTransfer.styles";
import SelectAmount from "@/components/amount/selectAmount/selectAmount";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InfoModal from "@/components/modals/infoModal/infoModal";
import AddAccount from "@/components/amount/addAccount/addAccount";
import ConfirmBankTransfer from "@/components/amount/confirmBankTransfer/confirmBankTransfer";
import Constants from "expo-constants";
import InfoModalConfirm from "@/components/modals/infoModalConfirm/infoModalConfirm";
import ConfirmBankTransferSuccess from "@/components/amount/confirmBankTransferSuccess/confirmBankTransferSuccess";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { PDFDocument } from "pdf-lib";
import { captureRef } from "react-native-view-shot";
import { getBalance, getData, getNumberAccount } from "@/utils/storageUtils";
import { validateNumber } from "@/utils/validationForms";
import instanceWallet from "@/services/instanceWallet";
import OtpValidationRegisterModal from "@/components/modals/otpValidationRegisterModal/otpValidationRegisterModal";
import { AnimatePresence, MotiView } from "moti";
import { Icon } from "react-native-paper";
import ButtonsSecondary from "@/components/forms/buttons/buttonSecondary/button";

interface Input {
    onChangeText?: Dispatch<SetStateAction<string>>;
    value: string;
}

interface Select {
    onSelect: (item: any) => void;
    selectedValue: any;
    name?: string;
    digit?: string;
}

const expo = Constants.expoConfig?.name || '';
const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;

export default function Page() {
    const { setActiveTab, activeLoader, desactiveLoader, activeTab } = useTab();
    const [valRecharge, setValRecharge] = useState('');
    const [concepto, setConcepto] = useState('');
    const [valMax] = useState('2000000');
    const [valMin] = useState('10000');
    const [comision] = useState('0');
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
    const [digitBank, setDigitBank] = useState('')
    const [disableContinue, setDisableContinue] = useState(true);
    const [step, setStep] = useState(0);
    const [confirmInfo, setConfirmInfo] = useState(false);
    const [typeModal, setTypeModal] = useState<'error' | 'info' | 'success'>('error');
    const [titleModal, setTitleModal] = useState<string | null>(null);
    const [showConfirmTransfer, setShowConfirmTransfer] = useState(false);
    const viewRef = useRef(null);
    const [nullView, setNullView] = useState(true);
    const [showOtpValidation, setShowOtpValidation] = useState(false);
    const [idTx, setIdTx] = useState('');
    const [viewBalanceComplete, setViewBalanceComplete] = useState(true);

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
        setBankName(item.name);
        setDigitBank(item.digit);
        setter(item.value);
    };

    const handleSelect = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
        setter(item.value);
    };

    const inputBanks: Select = {
        onSelect: handleSelectBank(setBanks),
        selectedValue: banks,
        name: bankName,
        digit: digitBank
    }

    const inputTypeBank: Select = {
        onSelect: handleSelect(setTypeBank),
        selectedValue: typeBank
    }

    useFocusEffect(() => {
        setActiveTab('/home/bankTransfer/');
    });

    const handleNext = async () => {
        const rawBalance = String(await getBalance());

        const balance = parseFloat(rawBalance.replace(/,/g, '').trim());

        if (!valRecharge) {
            setTypeModal('error');
            setTitleModal(null);
            setMessageError('Por favor ingresa un monto valido.');
            setShowError(true);
            return;
        }

        if ((Number(validateNumber(valRecharge)) + Number(comision)) > Number(balance)) {
            setTypeModal('error');
            setTitleModal(null);
            setMessageError('Saldo insuficiente');
            setShowError(true);
            return;
        }

        if (Number(balance) === 0 || (Number(validateNumber(valRecharge)) + Number(comision)) === 0) {
            setTypeModal('error');
            setTitleModal(null);
            setMessageError('Saldo insuficiente');
            setShowError(true);
            return;
        }

        setShowAddAccount(true);
        setStep(1);
    }

    const handleBackStep = () => {
        if (step === 1) {
            setShowAddAccount(false);
            setStep(0);
        } else if (step === 2) {
            setShowAddAccount(true);
            setDisableContinue(true);
            setConfirmInfo(false);
            setStep(1);
        } else {
            setShowConfirmTransfer(false);
            setShowAddAccount(false);
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
            setTypeBank('');
            router.push('/home');
        }
    }

    const handleFinal = async () => {
        activeLoader();

        const account = await getNumberAccount();
        const infoClient = await getData('infoClient');

        const body = {
            header: {
                OriginatorAccount: account?.startsWith('0') ? account.slice(1) : account,
                OriginatorIdentification: infoClient.numDoc,
                OriginatorName: `${infoClient.firstName.trim()} ${infoClient.firstSurname.trim()}`
            },
            transaction: {
                RecipientIdentification: document,
                TransactionValue: String(validateNumber(valRecharge)),
                Name: names.replaceAll('\n', ' ').trim(),
                AccountNumber: accountNumber,
                BankCode: banks,
                BankAccountType: typeBank,
                TransactionType: "32",
                ExternalUuid: "c7e30f88-98cc-4f92-b809-491cc837c5ed",
                AdditionalInformation: {
                    UniqueCode: ""
                }
            }
        }

        await instanceWallet.post('interBankFile', body)
            .then(async (response) => {
                const data = response.data;
                if (data.status === 200 && data.message.includes('correctamente')) {
                    setIdTx(data.data.ID);
                    setShowOtpValidation(true);
                }
            })
            .catch((error) => {
                console.log('interbank', error);
                setTypeModal('error');
                setTitleModal(null);
                setMessageError('Hubo un error al intentar realizar la transacción, por favor inténtalo más tarde.');
                setShowError(true);
            });


        desactiveLoader();
    };

    const handleFinish = () => {
        setShowConfirmTransfer(false);
        setShowAddAccount(false);
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
        setTypeBank('');
        router.replace('/home')
    };


    const handleLimits = () => {
        setTitleModal('Límites transaccionales');
        setMessageError(`¿Cuáles son los topes y límites de mi Deposito de bajo monto?\n\n ${expo} opera como corresponsal digital del Banco Cooperativo Coopcentral, entidad que a través de ${expo}, ofrece un depósito de bajo monto (DBM), por lo tanto, en tu Billetera ${expo} puedes contar un saldo de 210.50 UVT mensuales legales vigentes, es decir 10,482,689.50 pesos colombianos. Estos montos, son establecidos por normatividad legal, según el decreto 222 del 2020, de igual forma por ser un depósito de bajo monto (DBM), puedes realizar movimientos acumulados por por mes hasta 210.50 UVT.\n\n¿Mi billetera ${expo} está exento de 4xmil (Gravamen a los movimientos financieros- GMF)?\n\nCon ${expo} puedes realizar transacciones exentas de 4xmil hasta por 65 Unidades de Valor Tributario (UVT) equivalentes a 3,236,935 de manera mensual. Una vez superes este monto, deberás realizar el pago del GMF por las transacciones realizadas.`);

        setShowError(true);
        setTypeModal('info');
    }

    const handleShare = async () => {
        try {
            activeLoader();
            const imageUri = await captureRef(viewRef, {
                format: 'png',
                quality: 0.8,
            });

            const pdfUri = await createPdfFromImage(imageUri);

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(pdfUri, {
                    mimeType: 'application/pdf',
                    dialogTitle: 'Compartir comprobante',
                });
            } else {
                console.log('Sharing is not available on this device.');
            }

            handleFinish();
            desactiveLoader();
        } catch (error) {
            desactiveLoader();
            console.error('Error capturing and sharing PDF:', error);
        }
    };

    const createPdfFromImage = async (imageUri: string) => {
        const imageBase64 = await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();

        const jpgImage = await pdfDoc.embedPng(`data:image/png;base64,${imageBase64}`);
        const { width, height } = page.getSize();
        const imageDims = jpgImage.scale(0.5);
        const x = (width - imageDims.width) / 2;
        const y = (height - imageDims.height) / 2;

        page.drawImage(jpgImage, {
            x,
            y,
            width: imageDims.width,
            height: imageDims.height,
        });

        const pdfBytes = await pdfDoc.save();
        const pdfBase64 = uint8ArrayToBase64(pdfBytes);
        const pdfUri = FileSystem.documentDirectory + `Comprobante.pdf`;
        await FileSystem.writeAsStringAsync(pdfUri, pdfBase64, {
            encoding: FileSystem.EncodingType.Base64,
        });

        return pdfUri;
    };

    const uint8ArrayToBase64 = (uint8Array: Iterable<number>) => {
        let binary = '';
        const bytes = new Uint8Array(uint8Array);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };

    const handleGesture = (event: any) => {
        if (event.nativeEvent.translationX > 100) {
            handleBackStep();
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
        if (activeTab === '/home/bankTransfer/') {
            setShowConfirmTransfer(false);
            setShowAddAccount(false);
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
            setTypeBank('');
            setNullView(false);
        }
    }, [activeTab]);

    const handleOtpValidationResponse = (message: string, type: "info" | "success" | "error") => {
        setMessageError(message);
        setTypeModal(type);
        setShowError(true);
    };

    const handleOnFinish = (modalidad?: string) => {
        if (modalidad === '1') {
            setShowOtpValidation(false);
            setShowConfirmTransfer(true);
        }
    }

    if (nullView) {
        return null;
    }

    return (
        <ViewFadeIn {...panResponder.panHandlers} isWidthFull>
            <HeaderForm
                onBack={() => handleBackStep()}
                title="Transferir Fondos"
            />
            {!showAddAccount && (
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
                                <TouchableOpacity style={{ position: 'absolute', right: 30, top: 10, zIndex: 9 }} onPress={() => setViewBalanceComplete(!viewBalanceComplete)}>
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
            )}
            <View style={[styles.container, showAddAccount ? (styles.h100) : null, { height: viewBalanceComplete && !showAddAccount ? "52%" : "75%" }]}>
                {!showAddAccount && (
                    <AnimatePresence>
                        {!viewBalanceComplete && (
                            <MotiView
                                from={{ opacity: 0, translateY: 0 }}
                                animate={{ opacity: 1, translateY: 20 }}
                                exit={{ opacity: 0, translateY: 0 }}
                                transition={{ type: 'timing', duration: 300 }}
                                style={{ width: '100%', alignItems: 'flex-end', marginBottom: 50, marginTop: -20 }}
                            >
                                <ButtonsSecondary
                                    label="Ver mi saldo"
                                    onPress={() => setViewBalanceComplete(!viewBalanceComplete)}
                                />
                            </MotiView>
                        )}
                    </AnimatePresence>
                )}
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    extraHeight={Platform.select({ ios: 100, android: 120 })}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {!showAddAccount && (
                            <SelectAmount
                                comision={comision}
                                isConcepto
                                concepto={inputConcepto}
                                amount={inputAmount}
                                type={1}
                                onShowLimits={handleLimits}
                            />
                        )}
                        {(showAddAccount && disableContinue) && (
                            <AddAccount
                                names={inputNames}
                                surnames={inputSurnames}
                                alias={inputAlias}
                                accountNumber={inputAccountNumber}
                                document={inputDocument}
                                banks={inputBanks}
                                typeBank={inputTypeBank}
                                isDisabled
                                selectAccount={(account) => {
                                    setNames(account.name);
                                    setDocument(account.document);
                                    setBankName(account.bankName);
                                    setBanks(account.bank);
                                    setDigitBank(account.digit);
                                    setTypeBank(account.typeAccount);
                                    setAccountNumber(account.numberAccount);
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
                                names={`${names}\n${surnames}`}
                                document={document}
                                account={accountNumber}
                                bank={bankName}
                                concepto={concepto}
                            />
                        )}
                    </ScrollView>
                    <Image style={styles.image} source={require('@/assets/images/general/logo_coopcentral.png')} resizeMode="contain" />
                    {!showAddAccount ? (
                        <ButtonsPrimary
                            label={'Continuar'}
                            onPress={handleNext}
                        />
                    ) : (
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
            {showConfirmTransfer && (
                <InfoModalConfirm
                    label1="Compartir"
                    label2="Cerrar"
                    onPress={handleShare}
                    onCancel={handleFinish}
                    isBankTransfer
                    view={showConfirmTransfer}
                >
                    <ConfirmBankTransferSuccess
                        amount={valRecharge}
                        comision={comision}
                        names={names}
                        document={document}
                        account={accountNumber}
                        bank={bankName}
                        concepto={concepto}
                        viewRef={viewRef}
                    />
                </InfoModalConfirm>
            )}
            {showOtpValidation && (
                <OtpValidationRegisterModal
                    type={1}
                    id={idTx}
                    onClose={handleOtpValidationResponse}
                    onView={() => setShowOtpValidation(false)}
                    onFinish={handleOnFinish}
                />
            )}
            {showError && (
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