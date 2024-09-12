import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { List, Text } from "react-native-paper";
import { styles } from "./authorization.styles";
import Inputs from "@/components/forms/inputs/inputs";
import SearchSelect from "@/components/forms/select/searchSelect/select";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { getData, setData } from "@/utils/storageUtils";
import { AnimatePresence } from "moti";
import FadeInOut from "@/components/animations/fade/fadeInOut";
import CheckboxCustom from "../../checkbox/checkbox";
import TitleLine from "@/components/titleLine/titleLine";
import Accordions from "../../accordions/accordions";
import Constants from "expo-constants";
import InfoModal from "@/components/modals/infoModal/infoModal";

const extra = Constants.expoConfig?.extra || {};
const expo = Constants.expoConfig?.name || '';

const { primaryRegular } = extra.text;

interface List {
    name: string;
    value: string;
}

interface AuthorizationProps{
    type: string | string[] | undefined;
    listPaises: List[] | null;
    onSubmit: (data: any) => void;
}

export default function Authorization({type, listPaises, onSubmit }: AuthorizationProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [facta1, setFacta1] = useState('');
    const [facta2, setFacta2] = useState('');
    const [facta3, setFacta3] = useState('');
    const [facta4, setFacta4] = useState('');
    const [crs, setCrs] = useState('');
    const [paisCrs, setPaisCrs] = useState('');
    const [nitCrs, setNitCrs] = useState('');
    const [dec3, setDec3] = useState('');
    const [cert, setCert] = useState('');
    const [messageError, setMessageError] = useState('');
    const [showError, setShowError] = useState(false);
    const [isInitial, setIsInitial] = useState(false);
    const [formData] = useState({
        env_extractos: 'D',
        env_cert_costos: 'D',
        permFatca: '',
        nacion_americana: '',
        reseeeuu: '',
        rel_contractual: ''
    });

    const optionsDeclarante = [
        { label: 'SI', value: 'S' },
        { label: 'NO', value: 'N' }
    ];

    const optionsAut = [
        { label: 'SI', value: 'S' }
    ];
    
    useEffect(() => {  
        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            
            if (savedData) {
                setFacta1(savedData.permFatca);
                setFacta2(savedData.nacion_americana);
                setFacta3(savedData.reseeeuu);
                setFacta4(savedData.rel_contractual);
                setCrs(savedData.crs);
                setPaisCrs(savedData.paisCrs);
                setNitCrs(savedData.nitCrs);
                setDec3(savedData.dec3);
                setCert(savedData.cert);
                setIsVisible(true);
            }
        };

        fetchFormData();
    }, []);

    useEffect(() => {        
        const checkAllFieldsFilled = () => {
            let allFieldsFilled = type !== '8' ? facta1 && facta2 && facta3 && facta4 && crs && dec3 && cert : cert;

            if (crs === 'S') {
                allFieldsFilled = allFieldsFilled && paisCrs && nitCrs
            }

            return allFieldsFilled;
        };

        setIsButtonEnabled(!!checkAllFieldsFilled());
    }, [facta1, facta2, facta3, facta4, crs, dec3, cert]);

    useEffect(() => {
        if (isInitial) {
            if (crs !== 'S') {
                setPaisCrs('');
                setNitCrs('');
            }
        }
    }, [isInitial]);

    const handleSubmit = () => {
        const updatedFormData = { 
            ...formData, 
            permFatca: facta1,
            nacion_americana: facta2,
            reseeeuu: facta3,
            rel_contractual: facta4,
            crs: crs,
            paisCrs: paisCrs,
            nitCrs: nitCrs,
            dec3: dec3,
            cert: cert
        }; 

        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                const newUpdatedFormData = { ...savedData, ...updatedFormData };
                await setData('registrationForm', newUpdatedFormData); 
                const step = 5;
                const data = {
                    step
                };
                onSubmit(data);  
            }
        };
    
        fetchFormData();
    };

    const handleSelect = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
        setter(item.value);
    };

    const handleSelectCheckBox = (type: string) => (value: string) => {        
        switch (type) {
            case 'facta1':
                setFacta1(value);
                break;
            case 'facta2':
                setFacta2(value);
                break;
            case 'facta3':
                setFacta3(value);
                break;
            case 'facta4':
                setFacta4(value);
                break;
            case 'crs':
                setCrs(value);
                break;
            case 'dec3':
                setDec3(value);
                break;
            case 'cert':
                setCert(value);
                break;
            default:
                break;
        }
    
        setIsInitial(!isInitial);
    };
      

    return (
        <AnimatePresence>
            {isVisible && (
                <FadeInOut>
                    <View style={styles.containerForm}>
                        {type !== '8' && (
                            <>
                                <TitleLine 
                                    label="LEY DE CUMPLIMIENTO - FATCA Y CRS"
                                />
                                <View style={styles.mb5}>
                                    <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>En observancia de las disposiciones aplicables a los sistemas actuales de intercambio automático de información, las cuales buscan prevenir la evasión fiscal de los contribuyentes estadounidenses y de los miembros de la OCDE y teniendo en cuenta lo establecido por la Superintendencia Financiera de Colombia, le agradecemos responder las siguientes preguntas:</Text>
                                    <Accordions title={"Preguntas"}>
                                        <View style={styles.mb5}>
                                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>a. ¿Soy de nacionalidad colombiana y he permanecido más de 183 días en el último año, o 122 días durante los últimos 3 años, dentro del territorio de los Estados Unidos?</Text>
                                            <CheckboxCustom 
                                                options={optionsDeclarante}
                                                onSelect={handleSelectCheckBox('facta1')}
                                                selectedValue={facta1}
                                            />    
                                        </View>
                                        <View style={styles.mb5}>
                                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>b. ¿Soy una persona de nacionalidad estadounidense?</Text>
                                            <CheckboxCustom 
                                                options={optionsDeclarante}
                                                onSelect={handleSelectCheckBox('facta2')}
                                                selectedValue={facta2}
                                            />    
                                        </View>
                                        <View style={styles.mb5}>
                                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>c. ¿Soy residente en Estados Unidos?</Text>
                                            <CheckboxCustom 
                                                options={optionsDeclarante}
                                                onSelect={handleSelectCheckBox('facta3')}
                                                selectedValue={facta3}
                                            />    
                                        </View>
                                        <View style={styles.mb5}>
                                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>d. ¿Tengo alguna relación contractual con entidades estadounidenses?</Text>
                                            <CheckboxCustom 
                                                options={optionsDeclarante}
                                                onSelect={handleSelectCheckBox('facta4')}
                                                selectedValue={facta4}
                                            />    
                                        </View>
                                    </Accordions>
                                </View>
                                <TitleLine 
                                    label="Certificación CRS"
                                />
                                <View style={styles.mb5}>
                                    <View style={styles.mb5}>
                                        <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>a. ¿Usted es residente para propósitos fiscales en otra (s) jurisdicciones diferentes a Colombia y EEUU?</Text>
                                        <CheckboxCustom 
                                            options={optionsDeclarante}
                                            onSelect={handleSelectCheckBox('crs')}
                                            selectedValue={crs}
                                        />    
                                    </View>
                                    {crs === 'S' &&(
                                        <>
                                            <View style={styles.mb5}>
                                                <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>Si su respuesta es SI, indique el país de residencia y en seguida el NIT o su equivalente</Text>
                                                <SearchSelect
                                                    data={listPaises}
                                                    placeholder="Seleccione una opción"
                                                    onSelect={handleSelect(setPaisCrs)}
                                                    selectedValue={paisCrs}
                                                />   
                                            </View>
                                            <View style={styles.mb5}>
                                                <Inputs
                                                    placeholder="Llene el campo con la información"
                                                    isSecureText={false}
                                                    isRequired={false}
                                                    keyboardType="numeric"
                                                    onChangeText={setNitCrs}
                                                    value={nitCrs}
                                                />    
                                            </View>
                                        </>
                                    )}
                                </View>
                                <TitleLine label="Declaraciones"/>
                                <View style={styles.mb5}>
                                    <Accordions title={"Declaraciones"}>
                                        <View style={styles.mb5}>
                                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>1) me comprometo a actualizar anualmente, y cuando me lo soliciten, la información de este formulario  y presentar los documentos requeridos por CoopCentral.{'\n\n'} 2) me reservo el derecho a conocer, actualizar, rectificar, modificar, eliminar, la información de carácter personal así como a solicitar por cualquier medio a CoopCentral no utilizar o revocar mi información personal.{'\n\n'} 3) Conozco mis derechos y obligaciones derivados de la ley de Habeas Data y Protección de datos personales.{'\n\n'} 4) CoopCentral me ha informado los canales de comunicación a través de los cuales puedo acceder para conocer las obligaciones derivadas de las normas antes citadas.</Text>
                                        </View>
                                        <View style={styles.mb5}>
                                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>La presentación de la solicitud de crédito no implica compromiso alguno para COOPCENTRAL y la comprobación de la inexactitud de cualquiera de las informaciones consignadas en este formulario será motivo para negar dicha solicitud.</Text>
                                        </View>
                                        <View style={styles.mb5}>
                                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>Declaro (amos) que he (mos) recibido la información comprensible y legible del crédito y que he (mos) entendido los términos y condiciones ofrecidos por COOPCENTRAL. Especialmente declaro (amos) que he (mos)recibido la siguiente información: Tasa de interés (forma de pago, tasa efectiva anual, tasa nominal tasa de referencia y puntos adicionales), tasa de interés de mora, plazo, período de gracia, comisiones y recargos, condiciones de prepago, derechos de COOPCENTRAL en caso de incumplimiento del deudor o deudores, acceso a la información sobre la calidad del riesgo, condiciones de cobranza y judicialización.</Text>
                                            <CheckboxCustom 
                                                options={optionsAut}
                                                onSelect={handleSelectCheckBox('dec3')}
                                                selectedValue={dec3}
                                            />    
                                        </View>
                                    </Accordions>
                                </View>
                            </>
                        )}
                        <View style={styles.mb5}>
                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>Certifico (amos) que la información aportada en el presente documento es veraz.</Text>
                            <CheckboxCustom 
                                options={optionsAut}
                                onSelect={handleSelectCheckBox('cert')}
                                selectedValue={cert}
                            />    
                        </View>
                        <View style={styles.mV2}>
                            <ButtonsPrimary 
                                disabled={!isButtonEnabled}
                                onPress={handleSubmit}
                                label="Continuar y enviar"
                            />
                        </View>
                    </View>
                </FadeInOut>
            )}
            {showError && (
                <InfoModal 
                    isVisible={showError}
                    type="info"
                    message={messageError}
                    onPress={() => setShowError(false)}
                />
            )}
        </AnimatePresence>
    );
}