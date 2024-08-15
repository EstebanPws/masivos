import React, { useEffect, useState } from "react";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { Platform, ScrollView, View } from "react-native";
import { MD2Colors, MD3Colors, ProgressBar, Text } from "react-native-paper";
import BasicInfo from '@/components/forms/register/basicInfo/basicInfo';
import { router, useLocalSearchParams } from "expo-router";
import { styles } from "./formRegister.styles";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InfoGeneral from "@/components/forms/register/infoGeneral/infoGeneral";
import instanceMunicipios from "@/services/instanceMunicipio";
import instanceCompliance from "@/services/instanceCompliance";
import instanceWallet from "@/services/instanceWallet";
import InfoModal from "@/components/modals/infoModal/infoModal";
import InfoWorking from "@/components/forms/register/infoWorking/infoWorking";
import InfoPep from "@/components/forms/register/infoPep/infoPep";
import OtherInfo from "@/components/forms/register/otherInfo/otherInfo";
import Authorization from "@/components/forms/register/authorizations/authorization";
import { getData } from "@/utils/storageUtils";
import Loader from "@/components/loader/loader";
import BasicInfoJuridica from "@/components/forms/register/basicInfoJuridica/basicInfoJuridica";
import AuthorizationJuridica from "@/components/forms/register/authorizationsJuridica/authorizationJuridica";
import { transformData, transformDataJuridica } from "@/utils/validationForms";
import { encryptIdWithSecret } from "@/utils/fomatDate";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;
const secretKey = process.env.EXPO_SECRET_KEY;

interface List {
    name: string;
    value: string;
}

export default function Page() {
    const [step, setStep] = useState(0);
    const [listMunicipios, setListMunicipios] = useState<List[] | null>(null);
    const [listCiiu, setListCiiu] = useState<List[] | null>(null);
    const [listProfesiones, setListProfesiones] = useState<List[] | null>(null);
    const [listPaises, setListPaises] = useState<List[] | null>(null);
    const [messageError, setMessageError] = useState('');
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [typeResponse, setTypeResponse] = useState<"info" | "success" | 'error'>('info');
    const [idResponse, setIdResponse] = useState('');
    const { type } = useLocalSearchParams();
 
    const timeOut = 600;
    const totalSteps = type === '8' ? 3 : 6;
    const progress = (Math.ceil((step / totalSteps) * 100) / 100) + (type === '8' ? (step === 0 ? 0 : step === 1 ? 0.15 : 0.3) : (step === 0 ? 0 : 0.09) );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const municipiosResponse = await instanceMunicipios.get('xdk5-pm3f.json?$query=select%20*%2C%20%3Aid%20limit%201300');
                const municipiosData = municipiosResponse.data;

                const transformedMunicipios: List[] = municipiosData.map((item: any) => {
                    const municipio = item.municipio;
                    const departamento = item.departamento;
                    let codigoDane = item.c_digo_dane_del_municipio.replaceAll('.', '');

                    if (codigoDane.startsWith('5') || codigoDane.startsWith('8')) {
                        codigoDane = `0${codigoDane}`;
                    }

                    return {
                        name: `${municipio} - ${departamento}`,
                        value: codigoDane
                    };
                });

                setListMunicipios(transformedMunicipios);

                const ciiuResponse = await instanceCompliance.get('GetAllCodigosCIIU');
                const ciiuData = ciiuResponse.data;

                const transformedCiiu: List[] = ciiuData.map((item: any) => {
                    const nombre = item.Nombre;
                    const codigo = item.Codigo;

                    return {
                        name: `${codigo} - ${nombre}`,
                        value: codigo
                    };
                });

                setListCiiu(transformedCiiu);

                const profesionesResponse = await instanceWallet.get('obtenerProfesiones');
                const profesionesData = profesionesResponse.data.message;

                const transformedProfesiones: List[] = profesionesData.map((item: any) => {
                    return {
                        name: item.name,
                        value: item.value
                    };
                });

                setListProfesiones(transformedProfesiones);

                const paisesResponse = await instanceWallet.get('obtenerPais');
                const paisesData = paisesResponse.data.message;

                const transformedPaises: List[] = paisesData.map((item: any) => {
                    return {
                        name: item.name,
                        value: item.value
                    };
                });

                setListPaises(transformedPaises);
                
            } catch (err) {  
                setMessageError("Ha ocurrido un error al intentar cargar los datos.");
                setShowError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFormSubmit = (data: any) => {
        if (step === 0) {
            setTimeout(() => {
                setStep(1);
            }, timeOut);
        } else if (type !== '8' && step === 5) {
            handleSend();
        } else if (type === '8' && step === 2){
            handleSend();
        }else {
            const next = step + 1;
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
                const body = type === '1' ? transformDataJuridica(savedData) : transformData(savedData);            
                    
                setIsLoading(true);
                instanceWallet.post(type === '0' ? 'registroNatural' : type === '8' ? 'createNat' : 'registroJuridico', body)
                    .then(response => {
                        const data = response.data.data;
                        if(data.idRegistro) {
                            setTypeResponse('success');
                            setIdResponse(encryptIdWithSecret(data.idRegistro, secretKey));
                        } else {
                            setTypeResponse('error');
                        }

                        setMessageError(data.respuesta);
                        setShowError(true);
                        setIsLoading(false);
                    })
                    .catch(err => {
                        console.log(err);
                        
                        setMessageError("Ha ocurrido un error al intentar enviar el formulario.");
                        setShowError(true);

                        setIsLoading(false);
                    });
            }
        };

        fetchFormData();
    }

    if (isLoading) {
        return <Loader />;
    }

    const renderStep = (step: number) => {
        switch (step) {
            case 0:
                return type === '1' ? <BasicInfoJuridica listMunicipios={listMunicipios}  listCiiu={listCiiu} onSubmit={handleFormSubmit} /> : <BasicInfo type={0}listMunicipios={listMunicipios} onSubmit={handleFormSubmit} />;
            case 1:
                return type === '1'  ?  <BasicInfo type={Number(type)} listMunicipios={listMunicipios} onSubmit={handleFormSubmit} /> : <InfoGeneral type={type} listMunicipios={listMunicipios} onSubmit={handleFormSubmit} />;
            case 2:
                return type === '1' ? <InfoPep listMunicipios={listMunicipios} onSubmit={handleFormSubmit} /> : type === '0' ? <InfoWorking listMunicipios={listMunicipios} listCiiu={listCiiu} listProfesiones={listProfesiones} onSubmit={handleFormSubmit} /> : <Authorization type={type} listPaises={listPaises} onSubmit={handleFormSubmit} />;
            case 3:
                return type === '1' ? <InfoWorking type={Number(type)} listMunicipios={listMunicipios} listCiiu={listCiiu} listProfesiones={listProfesiones} onSubmit={handleFormSubmit} /> : <InfoPep listMunicipios={listMunicipios} onSubmit={handleFormSubmit} />;
            case 4:
                return <OtherInfo listMunicipios={listMunicipios} listPaises={listPaises} onSubmit={handleFormSubmit} />;
            case 5:
                return type === '1' ? <AuthorizationJuridica type={type} listPaises={listPaises} onSubmit={handleFormSubmit} /> :<Authorization type={type} listPaises={listPaises} onSubmit={handleFormSubmit} />;
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
                        <ProgressBar progress={progress} color={MD3Colors.error50} />
                        <View style={styles.stepsContainer}>
                            {Array.from({ length: totalSteps }, (_, index) => (
                                <View
                                    key={index}
                                    style={{ ...styles.step, backgroundColor: step >= index ? MD3Colors.error50 : MD2Colors.grey500 }}
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
            {showError && (
                <InfoModal
                    isVisible={showError}
                    type={typeResponse}
                    message={messageError}
                    onPress={() => setShowError(false)}
                />
            )}
        </>
    );
}