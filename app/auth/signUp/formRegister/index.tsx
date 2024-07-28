import React, { useEffect, useState } from "react";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { Platform, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import BasicInfo from '@/components/forms/register/basicInfo/basicInfo';
import { router } from "expo-router";
import { styles } from "./formRegister.styles";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InfoGeneral from "@/components/forms/register/infoGeneral/infoGeneral";
import instanceMunicipios  from "@/services/instanceMunicipio";
import InfoModal from "@/components/modals/infoModal/infoModal";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;

interface List {
    name: string;
    value: string;
}

export default function Page() {
    const [step, setStep] = useState(1);
    const [listMunicipios, setListMunicipios] = useState<List[] | null>(null);
    const [messageError, setMessageError] = useState('');
    const [showError, setShowError] = useState(false);

    const timeOut = 600;

    useEffect(() => {  
        instanceMunicipios.get('xdk5-pm3f.json?$query=select%20*%2C%20%3Aid%20limit%201300')
        .then(response => {
            const data = response.data;

            const transformedData: List[] = data.map((item: any) => {
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

            const sortedData = transformedData.sort((a, b) => a.name.localeCompare(b.name));
            setListMunicipios(sortedData);
        })
        .catch(err => {
            setMessageError("Ha ocurrido un error al intentar listar los municipios.");
            setShowError(true);
        });
    }, [])

    const handleFormSubmit = (data: any) => {
        if (step === 0) {
           setTimeout(() => {
            setStep(1);
           }, timeOut);
        } else {
            const next = step + 1;
            setTimeout(() => {
                setStep(next);
            }, timeOut);
        }
    };

    const handleBack = () => {
        const back = step - 1;
        step === 0 ? router.back() : setTimeout(() => {setStep(back)}, timeOut);
    };

    return (
        <>
            <HeaderForm title="Registro" onBack={handleBack} />
            <View style={{ flex: 1 }}>
                <View style={styles.ph2}>
                    <Text variant="titleMedium" style={{ ...primaryBold, ...styles.text }}>PERSONA NATURAL</Text>
                    <View style={styles.line} />
                </View>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.container}
                    enableOnAndroid={true}
                    extraHeight={Platform.select({ ios: 100, android: 120 })}
                >
                    <ScrollView>
                        {step === 0 && (
                            <BasicInfo listMunicipios={listMunicipios} onSubmit={handleFormSubmit} />
                        )}
                        {step === 1 && (
                            <InfoGeneral onSubmit={handleFormSubmit} />
                        )}
                    </ScrollView>
                </KeyboardAwareScrollView>
            </View>
            {showError && (
                <InfoModal 
                    isVisible={showError}
                    type="info"
                    message={messageError}
                    onPress={() => setShowError(false)}
                />
            )}
        </>
    );
}
