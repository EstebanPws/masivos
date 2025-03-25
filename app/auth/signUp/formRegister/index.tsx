import React, { useEffect, useState } from "react";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { Platform, ScrollView, View } from "react-native";
import { MD2Colors, ProgressBar, Text } from "react-native-paper";
import BasicInfo from '@/components/forms/register/basicInfo/basicInfo';
import { router, useLocalSearchParams } from "expo-router";
import styles from "./formRegister.styles";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InfoGeneral from "@/components/forms/register/infoGeneral/infoGeneral";
import instanceMunicipios from "@/services/instanceMunicipio";
import instanceWallet from "@/services/instanceWallet";
import InfoModal from "@/components/modals/infoModal/infoModal";
import InfoWorking from "@/components/forms/register/infoWorking/infoWorking";
import InfoPep from "@/components/forms/register/infoPep/infoPep";
import OtherInfo from "@/components/forms/register/otherInfo/otherInfo";
import Authorization from "@/components/forms/register/authorizations/authorization";
import { getData, setData } from "@/utils/storageUtils";
import Loader from "@/components/loader/loader";
import BasicInfoJuridica from "@/components/forms/register/basicInfoJuridica/basicInfoJuridica";
import AuthorizationJuridica from "@/components/forms/register/authorizationsJuridica/authorizationJuridica";
import { transformData, transformDataDbm, transformDataJuridica, transformDataPrev } from "@/utils/validationForms";
import { encryptIdWithSecret } from "@/utils/fomatDate";
import OtpValidationModal from "@/components/modals/otpValidationModal/otpValidationModal";
import { errorMessageRegister } from "@/utils/listUtils";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;
const { colorPrimary, idApp, secretEncypt } = extra;

interface List {
    name: string;
    value: string;
}

export default function Page() {
    const [step, setStep] = useState(0);
    const [listMunicipios, setListMunicipios] = useState<List[] | null>(null);
    const [listCiiu, setListCiiu] = useState<List[] | null>(null);
    const [listPaises, setListPaises] = useState<List[] | null>(null);
    const [listPaisesExt, setListPaisesExt] = useState<List[] | null>(null);
    const [messageError, setMessageError] = useState('');
    const [showError, setShowError] = useState(false);
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [typeResponse, setTypeResponse] = useState<"info" | "success" | 'error'>('info');
    const [validationModal, setValidationModal] = useState(false);
    const [finishRegister, setFinishRegister] = useState(0);
    const [errorExistAccounts, setErrorExistsAccounts] = useState(0)
    const { type } = useLocalSearchParams();
    const [isOtpValidated, setIsOtpValidated] = useState(false);


    const timeOut = 600;
    const totalSteps = type === '8' ? 3 : 6;
    const progress = Math.round((
        (Math.ceil((step / totalSteps) * 100) / 100) +
        (type === '8'
            ? (step === 0 ? 0 : step === 1 ? 0.15 : 0.3)
            : (step === 0 ? 0 : 0.09))
    ) * 100) / 100;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const municipiosResponse = await instanceWallet.get('municipios');
                const municipiosData = municipiosResponse.data.message;


                const transformedMunicipios: List[] = municipiosData.map((item: any) => {
                    const municipio = item.municipio;
                    const departamento = item.departamento;
                    let codigoDane = item.c_digo_dane_del_municipio;

                    return {
                        name: `${municipio} - ${departamento}`,
                        value: codigoDane
                    };
                });

                setListMunicipios(transformedMunicipios);

                const ciiuResponse = await instanceWallet.get('obtenerCiiu');
                const ciiuData = ciiuResponse.data.message;

                const transformedCiiu: List[] = ciiuData.map((item: any) => {
                    const nombre = item.DESCRIPCION;
                    const codigo = item.CIIU;

                    return {
                        name: `${codigo} - ${nombre}`,
                        value: codigo
                    };
                });

                setListCiiu(transformedCiiu);

                const paisesResponse = await instanceWallet.get('obtenerPais');
                const paisesData = paisesResponse.data.message;

                const transformedPaises: List[] = paisesData.map((item: any) => {
                    return {
                        name: item.name,
                        value: item.value
                    };
                });

                setListPaises(transformedPaises);

                const paisesExtResponse = await instanceWallet.get('obtenerPais');
                const paisesExrData = paisesExtResponse.data.message;

                const transformedExtPaises: List[] = paisesExrData.map((item: any) => {
                    return {
                        name: item.name,
                        value: item.name
                    };
                });

                setListPaisesExt(transformedExtPaises);

            } catch (err) {
                setMessageError("Ha ocurrido un error al intentar cargar los datos.");
                setShowError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleFormSubmit = async (stepOpt?: number) => {
        if (step === 0) {
            setTimeout(() => {
                setStep(1);
            }, timeOut);

            if (type !== '1') {
                const savedData = await getData('existVinculacion');
                const change = await getData("changeData");

                if (!savedData || change) {
                    if (!isOtpValidated) {
                        setValidationModal(true);
                        return; // Detener aquí hasta que se valide OTP
                    }
                } else {
                    setValidationModal(false);
                }
            }
        } else if (type !== '8' && step === 5) {
            handleSend();
        } else if (type === '8' && step === 2) {
            handleSend();
        } else {
            const next = stepOpt === 1 ? 1 : step + 1;
            setTimeout(() => {
                setStep(next);
            }, timeOut);
        }
    };

    const extractErrorCode = (message: string) => {
        const regex = /\[(\d+)\]/;
        const match = message.match(regex);
        return match ? match[1] : null;
    };

    const handleBack = () => {
        const back = step - 1;
        step === 0 ? router.back() : setTimeout(() => { setStep(back) }, timeOut);
    };

    const handleSend = () => {
        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                const body = type === '1' ? transformDataJuridica(savedData) : type === '0' ? transformData(savedData) : transformDataDbm(savedData);
                setIsLoading(true);
                const endpoint = type === '0' ? 'registroNatural' : type === '8' ? 'createNat' : 'registroJuridico';
                instanceWallet.post(type === '0' ? 'registroNatural' : type === '8' ? 'createNat' : 'registroJuridico', body)
                    .then(async response => {
                        const data = response.data.data;
                        if (data) {
                            if (data.idRegistro) {
                                setTypeResponse('success');

                                if (type !== '8') {
                                    const idRegistro = await encryptIdWithSecret(data.idRegistro, secretEncypt);
                                    const idWsc = await encryptIdWithSecret(idApp, secretEncypt);
                                    router.push({
                                        pathname: '/auth/signUp/validateRegister',
                                        params: {
                                            type: type,
                                            idRegister: idRegistro,
                                            wsc: idWsc
                                        }
                                    });
                                } else {
                                    console.log("respuesta else 1")
                                    setTypeResponse('success');
                                    setMessageError('Cliente creado con éxito.\n\nSe ha creado un depósito de bajo monto en el Banco Cooperativo Coopcentral.');
                                    setShowError(true);
                                    if (endpoint === 'createNat') {
                                        setRedirectToHome(true);
                                    }
                                }
                            } else {
                                console.log("respuesta else 2")
                                setTypeResponse('error');
                                setMessageError(data.respuesta);
                                setShowError(true);
                                if (endpoint === 'createNat') {
                                    setRedirectToHome(true);
                                }
                            }
                        } else if (response.data.status === 200) {
                            console.log("respuesta éxito sin idRegistro");
                            setTypeResponse('success');
                            setMessageError('Cliente creado con éxito.\n\nSe ha creado un depósito de bajo monto en el Banco Cooperativo Coopcentral.');
                            setShowError(true);
                            if (endpoint === 'createNat') {
                                setRedirectToHome(true);
                            }
                        }
                        setIsLoading(false);
                    })
                    .catch(err => {
                        if (err.response) {
                            if (err.response.data.message) {
                                const error = err.response.data.message;
                                const errorCode = extractErrorCode(error);
                                if (errorMessageRegister[errorCode as keyof typeof errorMessageRegister]) {
                                    setMessageError(errorMessageRegister[errorCode as keyof typeof errorMessageRegister]);
                                } else {
                                    if (err.response.data.message) {
                                        const error = err.response.data.message;
                                        const message = error.includes('-') ? error.split('-') : error;
                                        setMessageError(`${Array.isArray(message) && message.length > 2 ? message[1] + " - " + message[2] : "Hubo un error al intentar crear tú depósito en este momento, por favor inténtalo de nuevo en unos minutos."}`);
                                        console.log("RESPONSE MENSSAGE: ", message[1], " - ", message[2])
                                    } else {
                                        setMessageError("Hubo un error al intentar enviar el formulario");
                                    }
                                }
                            }
                        } else {
                            setMessageError("Hubo un error al intentar enviar el formulario");
                        }
                        setTypeResponse('error');
                        setShowError(true);
                        setIsLoading(false);
                    });
            }

        };

        fetchFormData();
    }

    const handleSendPreRegister = () => {
        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                let body;
                try {
                    body = transformDataPrev(savedData);
                } catch (error) {
                    console.log(error);
                }

                setIsLoading(true);
                instanceWallet.post(type === '1' ? 'registroJuridico' : 'registroNatural', body)
                    .then(async response => {
                        const data = response.data.data;
                        if (data) {
                            if (data.idRegistro) {
                                console.log("se guardo");
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err.response);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
        };

        fetchFormData();
    }

    const handleOtpValidationResponse = (message: string, type: "info" | "success" | "error") => {
        setMessageError(message);
        setTypeResponse(type);
        if (type === "error") {
            setErrorExistsAccounts(0);
        }
        //setStep(0);
        setShowError(true);
    };


    const handleOnViewOtp = () => {
        setValidationModal(false);
        setStep(0);
    }

    const handleFinishOtp = async () => {
        setValidationModal(false);
        setErrorExistsAccounts(0);
        handleSendPreRegister();
        const savedData = await getData('registrationForm');
        await setData("emailOld", savedData.correo);
        await setData("phoneOld", savedData.numero_celular);
        handleFormSubmit(1);
    }

    const handleErrorModal = (type: number) => {
        if (type === 1) {
            router.replace("/");
        }
        setShowError(false);
    }

    if (isLoading) {
        return <Loader />;
    }

    const renderStep = (step: number) => {
        switch (step) {
            case 0:
                return type === '1' ? <BasicInfoJuridica listMunicipios={listMunicipios} listCiiu={listCiiu} onSubmit={handleFormSubmit} /> : <BasicInfo type={0} listMunicipios={listMunicipios} listPaises={listPaises} onSubmit={handleFormSubmit} />;
            case 1:
                return type === '1' ? <BasicInfo type={Number(type)} listMunicipios={listMunicipios} listPaises={listPaises} onSubmit={handleFormSubmit} /> : <InfoGeneral type={type} listMunicipios={listMunicipios} listPaises={listPaises} onSubmit={handleFormSubmit} />;
            case 2:
                return type === '1' ? <InfoPep type={Number(type)} listMunicipios={listMunicipios} onSubmit={handleFormSubmit} /> : type === '0' ? <InfoWorking listMunicipios={listMunicipios} listCiiu={listCiiu} onSubmit={handleFormSubmit} /> : <Authorization type={type} listPaises={listPaises} onSubmit={handleFormSubmit} />;
            case 3:
                return type === '1' ? <InfoWorking type={Number(type)} listMunicipios={listMunicipios} listCiiu={listCiiu} onSubmit={handleFormSubmit} /> : <InfoPep type={Number(type)} listMunicipios={listMunicipios} onSubmit={handleFormSubmit} />;
            case 4:
                return <OtherInfo type={Number(type)} listMunicipios={listMunicipios} listPaises={listPaisesExt} onSubmit={handleFormSubmit} />;
            case 5:
                return type === '1' ? <AuthorizationJuridica type={type} listPaises={listPaises} onSubmit={handleFormSubmit} /> : <Authorization type={type} listPaises={listPaises} onSubmit={handleFormSubmit} />;
            default:
                return null;
        }
    };

    return (
        <>
            <HeaderForm title="Registro" onBack={handleBack} />
            <View style={{ flex: 1 }}>
                <View style={styles.ph2}>
                    <View style={styles.containerProgressBar}>
                        <ProgressBar progress={progress} color={colorPrimary} />
                        <View style={styles.stepsContainer}>
                            {Array.from({ length: totalSteps }, (_, index) => (
                                <View
                                    key={index}
                                    style={{ ...styles.step, backgroundColor: step >= index ? colorPrimary : MD2Colors.grey500 }}
                                >
                                    <Text variant="labelLarge" style={{ ...primaryBold, ...styles.textStep }}>
                                        {index + 1}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <Text variant="titleMedium" style={{ ...primaryBold, ...styles.text }}>
                        PERSONA {type === '1' ? 'JURÍDICA' : type === '8' ? 'NATURAL - DBM' : 'NATURAL'}
                    </Text>
                    <View style={styles.line} />
                </View>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.container}
                    enableOnAndroid={true}
                    extraHeight={Platform.select({ ios: 100, android: 120 })}
                >
                    <ScrollView>
                        {type === '8' ? renderStep(step) : renderStep(step)}
                    </ScrollView>
                </KeyboardAwareScrollView>
            </View>
            {validationModal && (
                <OtpValidationModal
                    onClose={handleOtpValidationResponse}
                    onView={handleOnViewOtp}
                    onFinish={handleFinishOtp}
                    typePerson={Number(type)}
                />
            )}
            {showError && (
                <InfoModal
                    isVisible={showError}
                    type={typeResponse}
                    message={messageError}
                    onPress={() => {
                        if (errorExistAccounts === 1) {
                            router.replace('/');
                        } else if (redirectToHome) {
                            router.replace('/');
                        }
                        setRedirectToHome(false);
                        setShowError(false);
                        setErrorExistsAccounts(0);
                    }}
                />
            )}
        </>
    );
}
