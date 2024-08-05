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
const { primaryRegular } = extra.text;

interface List {
    name: string;
    value: string;
}

interface AuthorizationProps{
    listPaises: List[] | null;
    onSubmit: (data: any) => void;
}

export default function Authorization({listPaises, onSubmit }: AuthorizationProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [facta1, setFacta1] = useState('');
    const [facta2, setFacta2] = useState('');
    const [facta3, setFacta3] = useState('');
    const [facta4, setFacta4] = useState('');
    const [crs, setCrs] = useState('');
    const [paisCrs, setPaisCrs] = useState('');
    const [nitCrs, setNitCrs] = useState('');
    const [aut1, setAut1] = useState('');
    const [aut2, setAut2] = useState('');
    const [aut3, setAut3] = useState('');
    const [aut4, setAut4] = useState('');
    const [aut5, setAut5] = useState('');
    const [aut6, setAut6] = useState('');
    const [aut7, setAut7] = useState('');
    const [dec1, setDec1] = useState('');
    const [dec2, setDec2] = useState('');
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
                setAut1(savedData.aut1);
                setAut2(savedData.aut2);
                setAut3(savedData.aut3);
                setAut4(savedData.aut4);
                setAut5(savedData.aut5);
                setAut6(savedData.aut6);
                setAut7(savedData.aut7);
                setDec1(savedData.dec1);
                setDec2(savedData.dec2);
                setDec3(savedData.dec3);
                setCert(savedData.cert);
                setIsVisible(true);
            }
        };

        fetchFormData();
    }, []);

    useEffect(() => {        
        const checkAllFieldsFilled = () => {
            let allFieldsFilled = facta1 && facta2 && facta3 && facta4 && crs && aut1 && aut2 && aut3 && aut4 && aut5 && aut6 && aut7 && dec1 && dec2 && dec3 && cert;

            if (crs === 'S') {
                allFieldsFilled = allFieldsFilled && paisCrs && nitCrs
            }

            return allFieldsFilled;
        };

        setIsButtonEnabled(!!checkAllFieldsFilled());
    }, [facta1, facta2, facta3, facta4, crs, aut1, aut2, aut3, aut4, aut5, aut6, aut7, dec1, dec2, dec3, cert]);

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
            aut1: aut1,
            aut2: aut2,
            aut3: aut3,
            aut4: aut4,
            aut5: aut5,
            aut6: aut6,
            aut7: aut7,
            dec1: dec1,
            dec2: dec2,
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
            case 'aut1':
                setAut1(value);
                break;
            case 'aut2':
                setAut2(value);
                break;
            case 'aut3':
                setAut3(value);
                break;
            case 'aut4':
                setAut4(value);
                break;
            case 'aut5':
                setAut5(value);
                break;
            case 'aut6':
                setAut6(value);
                break;
            case 'aut7':
                setAut7(value);
                break;
            case 'dec1':
                setDec1(value);
                break;
            case 'dec2':
                setDec2(value);
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
                        <TitleLine label="Autorizaciones y declaraciones"/>
                        <View>
                            <Accordions title={"Autorizaciones"}>
                                <View style={styles.mb5}>
                                    <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>Acepto que la información contenida en este formulario y la relacionada con mis productos en COOPCENTRAL, (información sobre saldos, movimientos, financiera y comercial, de entrada y salida de recursos, deducciones, se usara para fines fiscales e intercambio de información- tales como FATCA y CRS y, en cumplimiento y verificación de acuerdos internacionales, lo mismo que, en caso de no suministrar la información y documentación que requiera el Banco para los propósitos aquí mencionados, autorizo a COOPCENTRAL para que notifique a las autoridades fiscales correspondientes y proceda a la aplicación de las medidas y consecuencias que de ello se deriven.</Text>
                                    <CheckboxCustom 
                                        options={optionsDeclarante}
                                        onSelect={handleSelectCheckBox('aut1')}
                                        selectedValue={aut1}
                                    />    
                                </View>
                                <View style={styles.mb5}>
                                    <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>1) Verificar la información aquí suministrada a través de cualquier medio que considere conveniente{'\n\n'}. 2) Reportar, almacenar, actualizar, consultar, procesar, compilar, intercambiar, suministrar, grabar, solicitar y rectificar mi información de carácter financiero, crediticia, comercial, de servicios y la proveniente de terceros países con los propósitos establecidos en la Ley Habeas Data, ante cualquier operador de información debidamente autorizado por la Ley y constituido según las normas vigentes.  Lo anterior implica que el cumplimiento o  incumplimiento de mis obligaciones se reflejará en las mencionadas bases de datos</Text>
                                    <CheckboxCustom 
                                        options={optionsDeclarante}
                                        onSelect={handleSelectCheckBox('aut2')}
                                        selectedValue={aut2}
                                    />    
                                </View>
                                <View style={styles.mb5}>
                                    <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>3) Tratar (recolectar, almacenar, usar) mis datos personales con el propósito de garantizarme un adecuado servicio y funcionamiento de los productos y servicios adquiridos con COOPCENTRAL, para actividades de mercadeo y para información en general de la relación comercial con COOPCENTRAL.</Text>
                                    <CheckboxCustom 
                                        options={optionsDeclarante}
                                        onSelect={handleSelectCheckBox('aut3')}
                                        selectedValue={aut3}
                                    />    
                                </View>
                                <View style={styles.mb5}>
                                    <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>4) Entregar, transmitir o transferir mi información personal a terceros para realizar labores necesarias para el adecuado servicio y funcionamiento de los productos y servicios adquiridos con COOPCENTRAL y realizar labores propias de cobranza, mercadeo e información en general, en todo caso COOPCENTRAL garantiza los niveles adecuados de seguridad de dicha información.</Text>
                                    <CheckboxCustom 
                                        options={optionsDeclarante}
                                        onSelect={handleSelectCheckBox('aut4')}
                                        selectedValue={aut4}
                                    />    
                                </View>
                                <View style={styles.mb5}>
                                    <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>5) Autorizo de manera expresa, inequívoca, voluntaria y suficiente al Banco Cooperativo Coopcentral  para solicitar a los Operadores de Información del PILA, y a éstos a su vez  para que le suministren a al Banco Cooperativo Coopcentral  por el medio que considere pertinente y seguro, mis datos personales relacionados con la afiliación y pago de los aportes al Sistema de Seguridad Social Integral, tales como ingreso base de cotización y demás información relacionada con mi situación laboral y empleador, al Banco Cooperativo Coopcentral  podrá conocer dicha información cuantas veces lo requiera, mantenerla actualizada y en general tratarla, directamente o través de un encargado, con la finalidad de analizar mi perfil crediticio en aras de establecer una  relación comercial y/o de servicios conmigo, así como también para ofrecerme productos o servicios que se adecuen a mi perfil crediticio., en todo caso, declaro expresamente conocer el carácter facultativo de la presente autorización, los derechos que me asisten como titular de la información, y entender que el uso y manejo que se dará a los datos personales se efectuará de forma responsable y respetando las normas y principios generales establecidos en la Ley 1581 de 2012 y sus decretos reglamentarios, así como la Ley 1266 de 2008 en lo que resulte aplicable.</Text>
                                    <CheckboxCustom 
                                        options={optionsDeclarante}
                                        onSelect={handleSelectCheckBox('aut5')}
                                        selectedValue={aut5}
                                    />    
                                </View>
                                <View style={styles.mb5}>
                                    <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>6) Debitar de mi(s) cuenta(s) abiertas en esta, todos los valores originados en las operaciones y servicios que CoopCentral me suministre.</Text>
                                    <CheckboxCustom 
                                        options={optionsDeclarante}
                                        onSelect={handleSelectCheckBox('aut6')}
                                        selectedValue={aut6}
                                    />    
                                </View>
                                <View style={styles.mb5}>
                                    <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>7) Acepto asumir los costos de la gestión de cobranzas (solo para Tarjeta de Crédito) que realice el Banco en forma directa o a través de terceros debidamente autorizados.</Text>
                                    <CheckboxCustom 
                                        options={optionsDeclarante}
                                        onSelect={handleSelectCheckBox('aut7')}
                                        selectedValue={aut7}
                                    />    
                                </View>
                            </Accordions>
                        </View>
                        <View style={styles.mb5}>
                            <Accordions title={"Declaraciones"}>
                                <View style={styles.mb5}>
                                    <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>1) me comprometo a actualizar anualmente, y cuando me lo soliciten, la información de este formulario  y presentar los documentos requeridos por CoopCentral.{'\n\n'} 2) me reservo el derecho a conocer, actualizar, rectificar, modificar, eliminar, la información de carácter personal así como a solicitar por cualquier medio a CoopCentral no utilizar o revocar mi información personal.{'\n\n'} 3) Conozco mis derechos y obligaciones derivados de la ley de Habeas Data y Protección de datos personales.{'\n\n'} 4) CoopCentral me ha informado los canales de comunicación a través de los cuales puedo acceder para conocer las obligaciones derivadas de las normas antes citadas.</Text>
                                    <CheckboxCustom 
                                        options={optionsDeclarante}
                                        onSelect={handleSelectCheckBox('dec1')}
                                        selectedValue={dec1}
                                    />    
                                </View>
                                <View style={styles.mb5}>
                                    <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>La presentación de la solicitud de crédito no implica compromiso alguno para COOPCENTRAL y la comprobación de la inexactitud de cualquiera de las informaciones consignadas en este formulario será motivo para negar dicha solicitud.</Text>
                                    <CheckboxCustom 
                                        options={optionsDeclarante}
                                        onSelect={handleSelectCheckBox('dec2')}
                                        selectedValue={dec2}
                                    />    
                                </View>
                                <View style={styles.mb5}>
                                    <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>Declaro (amos) que he (mos) recibido la información comprensible y legible del crédito y que he (mos) entendido los términos y condiciones ofrecidos por COOPCENTRAL. Especialmente declaro (amos) que he (mos)recibido la siguiente información: Tasa de interés (forma de pago, tasa efectiva anual, tasa nominal tasa de referencia y puntos adicionales), tasa de interés de mora, plazo, período de gracia, comisiones y recargos, condiciones de prepago, derechos de COOPCENTRAL en caso de incumplimiento del deudor o deudores, acceso a la información sobre la calidad del riesgo, condiciones de cobranza y judicialización.</Text>
                                    <CheckboxCustom 
                                        options={optionsDeclarante}
                                        onSelect={handleSelectCheckBox('dec3')}
                                        selectedValue={dec3}
                                    />    
                                </View>
                            </Accordions>
                        </View>
                        <View style={styles.mb5}>
                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>Certifico (amos) que la información aportada en el presente documento es veraz.</Text>
                            <CheckboxCustom 
                                options={optionsDeclarante}
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