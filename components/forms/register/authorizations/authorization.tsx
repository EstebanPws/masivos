import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { List, Text } from "react-native-paper";
import { Link } from "expo-router";
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
const { nit, correo } = extra.contacto;

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
    const [terms, setTerms] = useState('');
    const [regla, setRegla] = useState('');
    const [tdTerms, setTdTerms] = useState('');
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

    const optionsTerms = [
        { label: 'ACEPTAR', value: 'true' },
        { label: 'RECHAZAR', value: 'false' }
    ];

    const optionsDbm = [
        { label: "HE LEÍDO", value: 'true' },
        { label: 'RECHAZAR', value: 'false' }
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
                setTerms(savedData.terms);
                setCert(savedData.cert);
                setIsVisible(true);
            }
        };

        fetchFormData();
    }, []);

    useEffect(() => {        
        const checkAllFieldsFilled = () => {
            let allFieldsFilled = type !== '8' ? facta1 && facta2 && facta3 && facta4 && crs && aut1 && aut2 && aut3 && aut4 && aut5 && aut6 && aut7 && dec1 && dec2 && dec3 && terms && cert : terms && cert && regla && tdTerms;

            if (crs === 'S') {
                allFieldsFilled = allFieldsFilled && paisCrs && nitCrs
            }

            return allFieldsFilled;
        };

        setIsButtonEnabled(!!checkAllFieldsFilled());
    }, [facta1, facta2, facta3, facta4, crs, aut1, aut2, aut3, aut4, aut5, aut6, aut7, dec1, dec2, dec3, terms, cert, regla, tdTerms]);

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
            terms: terms,
            regla: regla,
            tdTerms: tdTerms,
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
            case 'terms':
                setTerms(value);
                break;
            case 'regla':
                setRegla(value);
                break;
            case 'tdTerms':
                setTdTerms(value);
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
                                <TitleLine label="Autorizaciones y declaraciones"/>
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
                            </>
                        )}
                        <TitleLine label="Términos y condiciones"/>
                        <View style={styles.mb5}>
                            <Accordions title={"Términos y condiciones"}>
                                <View style={styles.mb5}>
                                    <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.textLeft }}>TÉRMINOS & CONDICIONES APLICACIÓN DIGITAL {expo}{'\r\n\r\n'}El presente documento establece los términos y condiciones de acceso y uso por parte del usuario a la Aplicación móvil {expo} (en adelante, la Aplicación o APP), la cual es propiedad de la sociedad {expo} S.A.S., identificada con NIT. {nit}, sociedad domiciliada en la ciudad de Cúcuta, Norte de Santander, Colombia, con correo electrónico {correo} A través de la APP, {expo} despliega una billetera virtual asociada a un depósito de bajo monto con el Banco Cooperativo CoopCentral, con el fin de promover la inclusión financiera en Colombia. {'\r\n\r\n'}I.{'\t'}DEFINICIONES{'\r\n\r\n'}a.{'\t'}Billetera Virtual:  Corresponde al conjunto de software, infraestructura, redes y servicios de tecnología que confluyen en la aplicación tecnológica {expo} (APP), por medio del cual se prestan servicios transaccionales relacionados con productos ofrecidos tales como:  gestión de pagos y recaudos, transferencias, recargas, entre otros.{'\r\n'}b.{'\t'}Comercio Vendedor: Persona natural o jurídica que comercializa bienes y/o servicios cuyo pago se ejecuta a través de la Billetera Virtual de {expo}. {'\r\n'}c{'\t'}{expo} o El administrador de la app: Sociedad comercial que administra las funcionalidades de la Billetera virtual desarrollada para {expo} por un aliado tecnológico en colaboración con {expo}. No tiene la condición de institución financiera y no realiza ninguna actividad propia de ese tipo de instituciones.{'\r\n'}d.{'\t'}Depósito de bajo monto.  Es un depósito a la vista, diferente de la cuenta corriente y de ahorro, ya que tiene una finalidad esencialmente transaccional, es decir que se constituye como un mecanismo para transferir fondos y/o hacer retiros. Con la vinculación a {expo}, el Usuario aperturará una cuenta de depósito de bajo monto con el Banco Cooperativo CoopCentral. {'\r\n'}e.{'\t'}Entidad Financiera o Entidad. Institución financiera que a través de la Billetera Virtual ofrece servicios financieros que pueden operarse con el alcance que las partes definan a través de la aplicación.{'\r\n'}f.{'\t'}Registro Individual De Comercio Vendedor. Registro que hace el Comercio Vendedor como usuario de los servicios y funcionalidades de la Billetera Virtual para la recepción de pagos por la venta de bienes y servicios.{'\r\n'}g.{'\t'}Registro Individual De Usuario. Registro que hacen las personas naturales que utilizarán los servicios y funcionalidades de la Billetera Virtual en los términos establecidos en los presentes Términos y Condiciones.{'\r\n'}h.{'\t'}Pago En Línea. Ejecución de órdenes de pago realizada a través de la Billetera Virtual para con la(s) Entidad(es) Financiera(s) vinculadas a la APP. {'\r\n'}i.{'\t'}Términos Y Condiciones. Corresponde al presente texto publicado en la APP y en el sitio de internet de {expo} que contiene las condiciones de uso de la Billetera Virtual.{'\r\n'}j.{'\t'}Saldo. Monto de dinero que se registra en favor o en contra de los Usuarios de la Billetera Virtual en el respectivo producto financiero asociado a la aplicación.{'\r\n'} k.{'\t'}Usuarios. Persona natural que hace uso de las funcionalidades de la Billetera Virtual.{'\r\n\r\n\r\n\r\n\r\n\r\n'}II.{'\t'}OBJETO DE LA UTILIZACIÓN DE LA BILLETERA{'\r\n\r\n'}La Billetera Virtual {expo} corresponde, bajo la definición establecida en los presentes Términos y Condiciones, a una aplicación móvil por medio de la cual los Usuarios podrán utilizar los servicios financieros de la (s) Entidad (es) Financiera (s) (en adelante, la Entidad Financiera) que se habiliten por intermedio de esta y de las cuales éstos sean titulares de productos o servicios conforme con las condiciones establecidas en este documento y por la Entidad Financiera.{'\r\n\r\n'}Las funcionalidades de la Billetera Virtual estarán asociadas con los servicios de la Entidad Financiera que se establezcan con ésta, los cuales podrán incluir la transferencia de dinero, el pago de bienes y/o servicios de Comercios Vendedores u otros para los que se habilite tal funcionalidad, el recibo de dinero por transferencias o pagos, la consulta de información propia de los servicios financieros.{'\r\n\r\n'}La prestación de los servicios de la Billetera Virtual por el Usuario es personal e intransferible y estará asociada al cumplimiento por parte del Usuario de los requisitos técnicos, operativos y/o de vinculación que se determinen y los cuales se puedan modificar en cualquier momento.{'\r\n\r\n'}III. PROCEDIMIENTO DE USO DE LA BILLETERA VIRTUAL {'\r\n\r\n'}Los usuarios deberán remitirse al portal de ayuda donde estarán dispuestos los procesos y procedimientos para la utilización de la aplicación. Los mismos estarán a disposición de los usuarios en el sitio web de la App.{'\r\n\r\n'}III.{'\t'}OBLIGACIONES DE LOS USUARIOS.{'\r\n\r\n'}Los Usuarios que requieran la utilización de la Billetera Virtual, con la aceptación del presente documento, aceptan su deber de cumplir las siguientes obligaciones:{'\r\n\r\n'}a.{'\t'}Obtener la aplicación a través de la correspondiente descarga o a través de los medios que exclusivamente se disponga(Android o Apple Store){'\r\n'}b.{'\t'}Seguir las recomendaciones de uso operativo y seguridad expedidas para la utilización de la APP y comunicadas a través de ésta. {'\r\n'}c.{'\t'}Utilizar la Aplicación a través de los protocolos de vinculación e identificación personal que se determine, manteniendo su uso personal e intransferible.{'\r\n'}d.{'\t'}Suministrar la información para vinculación y uso de la Billetera Virtual de manera veraz, exacta y completa, so pena de que se pueda determinar la no prestación de los servicios al respectivo Usuario a través de la aplicación, de manera unilateral y sin previo aviso por parte de {expo}.{'\r\n'}e.{'\t'}Abstenerse de la realización de cualquier acto de copia, apropiación o cualquier tipo de disposición en relación con la Billetera Virtual, que violen los derechos de autor y propiedad intelectual de {expo}. {'\r\n'}f.{'\t'}Abstenerse de concurrir en cualquier conducta que contravenga el buen funcionamiento de la Billetera Virtual y o de cualquiera de los participantes.{'\r\n'}g.{'\t'}Suministrar de manera veraz, exacta y completa, los datos personales u otros mecanismos de identificación personal (contraseñas, pines, códigos de diferente naturaleza, etc.), para la vinculación y verificación de autenticidad en la prestación de los servicios.{'\r\n'}h.{'\t'}Descargar las actualizaciones u otros mecanismos que se disponga para el cabal funcionamiento de la Aplicación.{'\r\n'}i.{'\t'}Atender las directrices y recomendaciones en relación con las debidas prácticas que deben atenderse en la utilización de la Aplicación, incluidas las modificaciones periódicas de contraseñas y otros mecanismos de seguridad, entre otros.{'\r\n'}j.{'\t'}Informar a {expo} de manera inmediata a su ocurrencia la pérdida, cualquiera sea su naturaleza, del dispositivo móvil desde el cual el usuario utiliza la aplicación.{'\r\n'}k.{'\t'}Informar a {expo}  manera inmediata a su ocurrencia la evidencia de cualquier tipo de operación, transacción o cualquier otra incidencia sobre la aplicación que corresponda o sospeche corresponde a una actuación fraudulenta.{'\r\n'}l.{'\t'}Atender de manera permanente el contenido de los presentes Términos y Condiciones, así como de las modificaciones que se hacen a las mismas. De no estar de acuerdo con tales Términos y Condiciones, deberá así informarlo directamente a {expo} a través de los canales que éste disponga para la presentación de PQRs, así como proceder a la eliminación y uso de la aplicación en cualquier dispositivo móvil en que la haya descargado y la tenga en uso.{'\r\n'}m.{'\t'}Suministrar y autorizar el tratamiento de los datos personales que sean requeridos para la utilización de la aplicación, con independencia de los datos personales que son solicitados y suministrados a la Entidad Financiera.{'\r\n'}n.{'\t'}No utilizar la Billetera Virtual para ningún tipo de actividades que tengan causa u objeto ilegal.{'\r\n\r\n\r\n'}IV.{'\t'}OBLIGACIONES DEL ADMINISTRADOR DE LA APP.{'\r\n\r\n'}La entidad en su condición de entidad administradora de la Billetera Virtual asume las siguientes obligaciones:{'\r\n\r\n'}a.{'\t'}Prestar los servicios y funcionalidades ofrecidos a través de la Billetera Virtual en los términos establecidos en los presentes Términos y Condiciones y las normas aplicables.{'\r\n'}b.{'\t'}Establecer los mecanismos de información y comunicación con los Usuarios que permitan poner en su conocimiento la información necesaria para la debida utilización de la Billetera Virtual, así como para que los Usuarios suministren al administrador la información que estimen pertinente o que tengan la obligación de suministrar.{'\r\n'}c.{'\t'}Cumplir con las medidas operativas de seguridad necesarias para el cabal cumplimiento de las funcionalidades de la Billetera Virtual y proteger la información de los Usuarios y las operaciones o transacciones que hagan.{'\r\n'}d. {'\t'}Informar por los mecanismos dispuestos para tal fin, las modificaciones de los Términos y Condiciones para la utilización de la Aplicación. Los mismos estarán a disposición de los usuarios en la aplicación, así como en el sitio web y en la APP.{'\r\n'}e. {'\t'}Establecer mecanismos de verificación y seguridad para determinar que la utilización de la Aplicación se realice a través del dispositivo móvil en que se activó y registró la Aplicación.{'\r\n'}f. {'\t'}Garantizar la confidencialidad y reserva de la información de los Usuarios que sea tratada por el administrador de la App y que se relacione con la utilización de la Billetera Virtual.{'\r\n'}g. {'\t'}Ejecutar el debido registro de las operaciones, conforme con las funcionalidades habilitadas en la Aplicación y conforme con los requerimientos pactados con la Entidad Financiera.{'\r\n'}h.{'\t'}Abstenerse de realizar operaciones que no correspondan a las autorizaciones legales compatibles con el servicio.{'\r\n'}i. {'\t'}Tramitar y responder las solicitudes, quejas o reclamos presentados por los Usuarios dentro de los términos legales aplicables. {'\r\n\r\n'}La gestión, administración y toda actividad en relación con el funcionamiento de la Billetera Virtual, corresponde a obligaciones de medio y no de resultado, por lo que su responsabilidad está limitada única y exclusivamente a procurar, en el marco de las gestiones propias de la industria de billeteras virtuales, sus posibilidades y la oferta de servicios, a que las funcionalidades aquí descritas y disponibles para los usuarios, funcionen en debida forma. {'\r\n\r\n'}Por lo anterior, el Administrador de la App no asume responsabilidad alguna en relación con afirmación alguna de garantía en términos de cumplimiento de plazos en el procesamiento de las transacciones ofertadas, conforme con la disponibilidad de la Entidad Financiera. {'\r\n\r\n'}Por lo anterior, el administrador de la App no es responsable de ningún daño, reclamación, perjuicio, rubro indemnizatorio o cualquiera otro similar que se derive o se pueda derivar para el Usuario como consecuencia de cualquier retraso en las transacciones autorizadas por el Usuario. De igual forma el administrador de la App no garantiza acceso continuo e ininterrumpido a la aplicación, ya que su funcionamiento se puede afectar y depender de diferentes factores, hechos, condiciones o circunstancias que no son de su responsabilidad.{'\r\n\r\n\r\n\r'}\nVI{'\t'}DECLARACIONES DE LOS USUARIOS{'\r\n\r\n'}Con la aceptación de los presentes Términos y Condiciones mediante el mecanismo electrónico dispuesto para tal fin, el Usuario expresa e irrevocablemente declara y acepta que:{'\r\n\r\n'}a.{'\t'}Es una persona mayor de edad bajo el régimen legal colombiano, y que cuenta con plena capacidad legal para adquirir obligaciones.{'\r\n'}b.{'\t'}Tuvo pleno acceso y conocimiento al texto de los presentes Términos y Condiciones y que los leyó y entendió a plenitud.{'\r\n'}c.{'\t'}La información que ha suministrado a la Entidad Financiera o cualquier otro tercero relacionado con el uso de la Aplicación Billetera Virtual {expo} es veraz, completa exacta y válida.{'\r\n'}d.{'\t'}Conoce y utiliza la aplicación bajo pleno conocimiento de sus funcionalidades, alcance y características, por lo que su uso lo hace bajo su exclusiva cuenta y riesgo.{'\r\n'}e.{'\t'}Ha autorizado expresa e irrevocablemente al administrador de la App para el tratamiento de sus datos personales, conforme con las políticas de tratamiento de datos personales debidamente publicada y de su conocimiento, particularmente frente a las finalidades del tratamiento que puede realizar {expo}, la Entidad Financiera o cualquier tercero autorizado, al que {expo} habilite para su tratamiento, en el marco de la prestación de los servicios ofrecidos en la Billetera Virtual. {'\r\n'}f.{'\t'}Autoriza expresa e irrevocablemente al Administrador de la App para realizar procesos de verificación de la veracidad, completitud e integridad de la información, datos personales y demás que sean suministrados para efectos de la utilización de la Aplicación Billetera Virtual; de igual manera autoriza a la verificación de los datos derivados de tarjetas de crédito y/o débito, los cuales autoriza, puedan ser confrontados con terceros con los cuales se hagan transacciones a través de la aplicación Billetera Virtual . {'\r\n'}g.{'\t'}Conoce que {expo}, a través de la aplicación Billetera Virtual, no ejerce actividad financiera y, en relación con los saldos en cuentas de Entidades Financieras registrados a través de la Aplicación o cualquier otro monto en saldo gestionado a través de la aplicación, no reconocerá ni pagará ningún tipo de remuneración, interés, erogación o cualquier otro derecho.{'\r\n'}Las transacciones de cualquier naturaleza, incluidas las transferencias o recibo de dinero, la adquisición o enajenación de bienes y/o servicios o cualquier otra transacción que se ejecute a través de la Billetera Virtual, tienen origen y destinación lícitos y son responsabilidad exclusiva del Usuario, dado que la aplicación solamente es un instrumento de infraestructura para el acceso a servicios propios de la Entidad Financiera y habilitados por medio de la Aplicación.{'\r\n'}i.{'\t'}Reconoce y acepta que las obligaciones de prestación de servicios de la Billetera Virtual son de medio y no de resultado, así como que conoce que, dada la naturaleza tecnológica de la prestación del servicio, ésta puede verse afectada por interrupciones de servicio derivadas de mantenimiento de sistemas, de la disponibilidad de los planes de datos que tenga el Usuario, falencias en el suministro de energía eléctrica, fallas intrínsecas del sistema u otras incidencias propias de este tipo de actividades para el procesamiento de las funcionalidades aquí determinadas.{'\r\n'}j.{'\t'}El administrador de la App, en su condición de administrador de la aplicación Billetera Virtual tiene la facultad discrecional de habilitar a los Usuarios los servicios que, conforme con las funcionalidades que ofrezca y los análisis de riesgo que hacen parte de su gestión, determine deben limitarse.{'\r\n'}k.{'\t'}El Administrador de la App presta servicios propios de su objeto social y que, tratándose de servicios financieros, éstos se prestan por la Entidad Financiera, condición que no tiene {expo}. {'\r\n'}l.{'\t'}El Administrador de la app en el marco de la prestación de los servicios y funcionalidades de la aplicación Billetera Virtual no garantiza ni es responsable de manera alguna de la autenticidad o legalidad de las transacciones de cualquier naturaleza que se procesen a través de la Aplicación. Como consecuencia de la presente declaración, el Usuario reconoce y acepta de manera expresa que los riesgos derivados de realización de fraudes, suplantaciones de identidad de Usuarios, ilegalidad de las transacciones, son única y exclusivamente responsabilidad del Usuario, la Entidad Financiera o cualquier otro tercero que participe en las operaciones.{'\r\n'}m.{'\t'}Entiende y reconoce que las operaciones, transacciones o cualquier actividad realizada a través de la Billetera Virtual, que implique la intervención de la Entidad Financiera, como, pero sin limitarse a retractos y/o reversiones de pagos, se ejecutarán en cumplimiento de los requisitos, tiempos y validaciones de saldos y demás información establecida y requerida por la Entidad Financiera u otros usuarios que tengan la condición de Comercio Vendedor.{'\r\n'}n.{'\t'}Cuando así lo solicite el Usuario a través de las funcionalidades de la Billetera Virtual, solicitud que se entenderá realizada ante la Entidad Financiera quien la conoce, tramita y autoriza, El Administrador de la app podrá mediante tales funcionalidades, ejecutar el débito de dinero de cuentas del Usuario para el pago periódico de bienes y/o servicios a Comercios Vendedores.{'\r\n'}o.{'\t'}Conoce expresamente que las órdenes de pago que ejecute a través de la aplicación Billetera Virtual corresponden a transacciones ejecutadas desde el producto financiero de la Entidad Financiera asociado a la aplicación y, por tanto, son aplicables las normas propias de las instituciones financieras y no son garantizadas por {expo}, la aplicación Billetera Virtual o entidad pública alguna.{'\r\n'}p.{'\t'}Conoce expresamente que las transacciones realizadas a través de la aplicación Billetera Virtual particularmente las relacionadas con la ejecución de ventas no presenciales o compras por internet o cualquiera otra similar, implican riesgos asociados con mal uso de la aplicación o los canales de adquisición de bienes y servicios, fraude, seguridad de la información no asociados a la aplicación y de los cuales {expo} no se hace responsable.{'\r\n'}q.{'\t'}Conoce expresamente que las funcionalidades de la aplicación Billetera Virtual puede implicar los siguientes aspectos, efecto para el cual, reconoce y acepta la utilización de la información incorporada en la aplicación para los siguientes fines, sin limitarse a esta lista y en concordancia con las finalidades definidas y autorizadas con la aceptación y firma de la autorización de tratamiento de datos personales de {expo}:{'\r\n\r\n'}i) Compartir información con centrales de riesgo o de información crediticia o de otra naturaleza para crear historial de servicios financieros.{'\r\n'}ii) Consultar en nombre de {expo} o cualquier otra Entidad Financiera o tercero vinculado a {expo}, información del Usuario en centrales de riesgo o de información crediticia o de otra naturaleza para crear historial de servicios financieros, o para fines asociados a la prestación de los servicios de la APP.{'\r\n'}iii) El tratamiento de sus datos personales a nivel internacional, dada la operación de la aplicación mediante computación en la nube, lo que puede implicar la utilización de repositorios de información fuera del país.{'\r\n'}iv) Remitirle información en medios virtuales y físicos, así como documentos que sean necesarios o complementarios para la utilización de la Aplicación (publicidad).{'\r\n'}v) Transferir o transmitir la información a terceros autorizados que asuman la operación de la Aplicación en caso de que la misma sea cedida por cualquier motivo por parte de {expo}.{'\r\n'}vi) A compartir información respecto de otras aplicaciones o desarrollos tecnológicos, cualquiera sea su naturaleza, a efectos de realizar transacciones con éstas.{'\r\n'}r.{'\t'}La ejecución de pagos por concepto de la realización de adquisición de bienes y/o servicios se ejecutan exclusivamente entre el Usuario y los Comercios Aliados o terceros, motivo por el cual {expo} a través de las funcionalidades de la Billetera Virtual no hacen parte ni intervienen en tales transacciones, por lo que no se responsabiliza en relación con tales operaciones.{'\r\n'}s.{'\t'}Que conoce las funcionalidades habilitadas por la Billetera Virtual y que reconoce y acepta que su utilización la ejecutará conforme con la disponibilidad.{'\r\n\r\n'}Eventos y causales de terminación de los servicios de la Billetera Virtual.{'\r\n\r\n'}La utilización y oferta de servicios propios de la aplicación Billetera Virtual, terminará conforme con lo siguiente:{'\r\n\r\n'}a.{'\t'}{expo} podrá discrecionalmente determinar la no prestación y oferta de servicios de la aplicación Billetera Virtual al Usuario, sea a través de su suspensión o cancelación definitiva, en caso de que:{'\r\n'}i){'\t'}Concurran razones que, derivadas de la gestión del riesgo de {expo} determinen que la prestación del servicio conlleva peligros a los intereses de {expo} y el cabal funcionamiento de sus servicios. Lo anterior, sin que la terminación de los servicios bajo cualquier modalidad implique ningún tipo de indemnización en favor del Usuario.{'\r\n'}ii){'\t'}Atendiendo la necesidad de adoptar medidas de aseguramiento de la operación o de cualquier aspecto relacionado con amenazas que de la prestación del servicio al Usuario se deriven.{'\r\n'}iv){'\t'}{expo} cuente con evidencia de que el Usuario ha concurrido en usos inapropiados o indebidos en la utilización de la aplicación o cualquiera de los servicios prestados por la Entidad Financiera.{'\r\n'}v){'\t'}El Usuario sea reportado en listas restrictivas, nacionales y/o internacionales y/o vinculado a procesos relacionados con actividades ilegales, particularmente relacionadas con lavado de activos y financiación del terrorismo.{'\n'}vi){'\t'}{expo} determine a su criterio, que el Usuario ha vulnerado normas, reglamentos y los presentes Términos y Condiciones.{'\r\n'}vii){'\t'}{expo}. tenga cualquier tipo de información o evidencia de que los servicios prestados a través de la aplicación Billetera Virtual está siendo utilizada por el Usuario para la materialización o con cualquier tipo de conexión con operaciones inusuales o no autorizadas o para transferir recursos potencialmente fraudulentos.{'\r\n'}viii){'\t'}Se registre inactividad en la utilización de la Aplicación por parte del Usuario durante un lapso superior a seis (6) meses contados a partir del último ingreso a la APP por parte del Usuario.{'\r\n'}ix){'\t'}Se registre indisponibilidad de saldo por parte del Usuario en la aplicación en un lapso superior a tres (3) meses.{'\r\n'}b.{'\t'}El Usuario podrá terminar su vinculación con los servicios prestados a través de la Aplicación Billetera Virtual, a través de su inactividad o enviando una solicitud de cancelación al correo electronico {correo}.{'\r\n\r\n\r\n\r\n\r\n'}VII.  PROPIEDAD INTELECTUAL{'\r\n\r\n'}En relación con los derechos de propiedad intelectual incorporados en la aplicación Billetera Virtual, el Usuario:{'\r\n\r\n'}a.{'\t'}Reconoce expresamente que la Aplicación Billetera Virtual es el producto de un desarrollo tecnológico llevado a cabo por un aliado tecnológico en colaboración con {expo}, para la prestación de nuestros servicios, de acuerdo con los términos definidos en los presentes Términos y Condiciones. Por lo anterior el Usuario reconoce y acepta expresa e irrevocablemente que la descarga, utilización, aceptación de los presentes Términos y Condiciones y cualquier otro tipo de relación con la aplicación puesta para su utilización por {expo} no implica o significa de manera alguna transferencia del derecho de dominio de la propiedad intelectual desarrollada y que hace parte de la aplicación, por lo que no puede ejercer ningún tipo de derecho o acción diferente a su utilización, cuyo licenciamiento se determina en la forma establecida en los presentes Términos y Condiciones.{'\r\n'}b. {'\t'}Reconoce que las marcas propias de {expo} o de terceros implicados en cualquier gestión derivada de la utilización de la aplicación, corresponden a derechos protegidos de los cuales no puede hacer utilización diferente a la dispuesta por intermedio de la aplicación.{'\r\n'}c. {'\t'}Reconoce que se abstendrá de realizar copias, desarrollos de ingeniería inversa o cualquier otra práctica que implique la indebida apropiación de la propiedad intelectual que hace parte de la aplicación.{'\r\n\r\n\r\n'}VIII. CONFIDENCIALIDAD{'\r\n\r\n'}La información de toda índole correspondiente al Usuario, registrada y gestionada a través de la aplicación Billetera Virtual, será tratada con carácter estrictamente confidencial y reservado, allí incluida información personal, financiera, transaccional, de hábitos de utilización y consumo, entre otras que se deriven de la utilización de la Aplicación. La información se utilizará para la ejecución de las funcionalidades propias de la Aplicación, así como para aquellas finalidades establecidas en la Autorización de tratamiento de datos personales suscrita por el Usuario al momento de su registro en la APP, y bajo las condiciones establecidas en la Política de Tratamiento de Datos Personales establecida por {expo}, que se pone a disposición del Usuario a través de la Aplicación, la página web www.{expo}.com, las instalaciones físicas de {expo} y que el Usuario manifiesta conocer de manera previa y expresa.{'\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n'}IX. TRATAMIENTO DE DATOS PERSONALES{'\r\n\r\n'}El Usuario manifiesta expresamente que {expo} puso de manera expresa e inequívoca a través de la aplicación, así como de la página de internet www.{expo}.com, la política de tratamiento de datos personales y que al momento de su registro en la APP, aceptó de manera previa y expresa la Autorización de tratamiento de datos de {expo}, entendiendo los parámetros y finalidades bajo la cual tratará los datos suministrados para su vinculación e interacción con la Aplicación, así como toda la información que sea suministrada o recibida para efectos de la prestación del servicio a través de la Aplicación. De esta forma, el Usuario manifiesta expresamente haber leído, entendido y aceptado la autorización de tratamiento de datos de {expo}, y consecuentemente, la Política de tratamiento de datos personales.{'\r\n\r\n'}Por lo anterior, el Usuario ha aceptado el tratamiento de sus datos personales, incluida información financiera, crediticia y comercial, conforme con los términos antes establecidos. Adicionalmente manifiesta expresa e inequívocamente:{'\r\n\r\n'}a.{'\t'}Que además de las finalidades incorporadas en la Autorización de tratamiento de datos y en la Política de Tratamiento de Datos Personales de {expo}, tal sociedad dará tratamiento a sus datos personales para efectos de su vinculación y prestación de los servicios y funcionalidades que hacen parte de la Aplicación.{'\r\n'}b.{'\t'}Que acepta que a los datos contacto que suministre a través de la Aplicación o de otros medios dispuestos por {expo}  para tal fin, le sean enviados mensajes de texto, de datos o de otra naturaleza a su teléfono celular, otros dispositivos asociados a la aplicación, correo electrónico o cualquier otro mecanismo de comunicación disponible que conozca {expo}, que contengan información comercial de la aplicación u otros productos o servicios de {expo}, sus aliados o cualquier otro tercera autorizado conforme se dispone en las finalidades de la Autorización de tratamiento de datos personales y la Política de tratamiento de datos personales de {expo}.{'\r\n'}c.{'\t'}Que {expo} en su condición de administrador de la aplicación Billetera Virtual, podrá llevar a cabo de manera directa o indirecta, investigaciones, verificaciones, actos de monitoreo, entre otras acciones de control, encaminadas a comprobar la veracidad, completitud e integridad de la información suministrada por el Usuario.{'\r\n'}d.{'\t'}Que acepta expresamente que, dentro del tratamiento de datos personales, tanto {expo} en su condición de responsable, como cualquier encargado al que le transmita o transfiriera la información en los términos establecidos en la Autorización de tratamiento de datos personales y la Política de Tratamiento de Datos Personales, traten la información para:{'\r\n'}i){'\t'}Hacer control, seguimiento y verificaciones del funcionamiento de la Aplicación.{'\r\n'}ii){'\t'}Hacer controles y validaciones de información suministrada por el Usuario, los cuales pueden estar relacionados con comportamiento crediticio, transaccional, relacionado con centrales de riesgo, la Entidad Financiera u otras entidades con las que se interactúe a través de la aplicación.{'\r\n'}iii){'\t'}Generar bases de datos estadísticas relacionadas con las diferentes características, tendencias, comportamientos, entre otros, relacionados con la utilización de la aplicación por parte del Usuario.{'\r\n'}iv){'\t'}Cumplir obligaciones de registro de información y soportes de las operaciones realizadas por el Usuario a través de la aplicación.{'\r\n'}v){'\t'}Proporcionar información comercial sobre los servicios de {expo} o terceros conforme lo dispone la Política de Tratamiento de Datos Personales.{'\r\n'}Que el tratamiento de datos personales se autoriza tanto para la vinculación del Usuario para la utilización de los servicios de la aplicación, como para su ejecución y conservación de información una vez terminada la prestación de los servicios.{'\r\n'}f.{'\t'}Que la autorización otorgada incluye la facultad de {expo} de consultar centrales de información financiera, litados de control en materia de prevención y control de lavado de activos y financiación del terrorismo, respecto de titularidad (SARLAFT Y SAGRILAF) de productos financieros con la Entidad Financiera u otras instituciones y entidades.{'\r\n'}g.{'\t'}Que la autorización que se otorga incluye la posibilidad de que {expo} intercambie datos, información, bases de datos o sistemas de información, en los términos determinados en las finalidades de la autorización incorporadas en la Política de Tratamiento de Datos Personales, acorde con lo dispuesto en la Ley 1288 de 2006, 1581 de 2012, Decreto 1074 de 2015 y demás normativa aplicable.{'\r\n\r\n\r\n\r\n'}X. INDEMNIDAD{'\r\n\r\n'}De manera expresa, inequívoca e irrevocable, el Usuario acepta que conoce sus responsabilidades en relación con la utilización de la Billetera Virtual, motivo por el cual se compromete a mantener indemne a {expo}, sus empleados, asesores, agentes o entidades vinculadas a ésta, que se pudieran ver afectadas por cualquier tipo de acto que genere responsabilidad asociada a reclamaciones de cualquier naturaleza (judicial o extrajudicial) que se pudieran presentar en contra de {expo}, indemnidad que incluye costos, gastos, pérdidas, daños, pago de perjuicios (incluidos gastos de honorarios de abogados, agencias en derecho o cualquier otra erogación similar), que se deriven de la utilización de la indebida utilización de la aplicación, sea por acción o por omisión propia o de terceros con acceso o interacción con la aplicación. La indemnidad aquí pactada incluye cualquier perjuicio causado al propio Usuario, cualquier tercero o vinculado por la utilización de la aplicación en los términos antes señalados.{'\r\n\r\n\r\n\r\n'}XI.{'\t'}CORRESPONSALIA DIGITAL BANCO COOPERATIVO COOPCENTRAL{'\r\n\r\n'}El usuario conoce que {expo} es un corresponsal digital del Banco Cooperativo Coopcentral y que mediante la aceptación de estos términos y condiciones y  usar su APP para aperturar productos financieros del Banco Cooperativo Coopcentral, para lo cual podrá consultar los reglamentos, condiciones de uso de estos productos financieros así como la política de protección de datos en la página www.coopcentral.com.co.{'\r\n\r\n'}El usuario conoce y acepta que mediante el uso de la APP de {expo} podrá solicitar la creación de productos financieros del Banco, como pueden ser depósitos de bajo monto o depósitos ordinarios (Dependiente de las funcionalidades del Corresponsal Digital). Adicionalmente podrá realizar desde esta, la administración de los productos financieros adquiridos desde la plataforma del corresponsal digital asi como los medios de uso de estos, realizar operaciones transaccionales y consultas de saldos y movimientos entre otras. {'\r\n\r\n'}Para utilizar los servicios y/o productos financieros ofrecidos por el Banco Cooperativo Coopcentral, usando la plataforma del corresponsal digital {expo}., el Usuario deberá facilitar determinados datos de carácter personal. Su información personal se procesará manteniendo altos estándares de seguridad y protección tanto física como tecnológica y en cumplimiento de la ley 1581 de 2012 por parte de {expo} y queda expresamente aceptado por el usuario que {expo} podrá entrega la información del usuario parcial o total al Banco Cooperativo Coopcentral para la vinculación del usuario al Banco Cooperativo Coopcentral siempre y cuando el cliente acepte la creación de productos financieros con el Banco.{'\r\n\r\n'}El usuario conoce y acepta que los productos denominados depósitos de bajo monto o deposito ordinario que puede optar por aperturar por intermedio de la plataforma tecnológica del corresponsal son productos financieros del Banco Cooperativo Coopcentral, entidad Bancaria vigilada por la superintendencia financiera de Colombia y respaldados por el seguro de depósito de Fogafin.{'\r\n\r\n'}Así mismo, conoce y acepta que el Banco es el responsable sobre los productos depósito de bajo monto y deposito ordinario y sobre los servicios que se presten para la administración y manejo de estos.{'\r\n\r\n\r\n\r\n'}XI.{'\t'}PROHIBICIÓN DE CESIÓN, TRANSFERENCIA, PERMISO U OTRO SIMILAR DEL USO DE LA APLICACIÓN{'\r\n\r\n'}La utilización de los servicios de la aplicación es personal e intransferible por parte del Usuario, motivo por el cual éste es el único responsable por:{'\r\n\r\n'}a.{'\t'}La adopción y seguimiento de las medidas de seguridad necesarias y sugeridas por {expo} en relación con el uso de la aplicación.{'\r\n'}b.{'\t'}Cualquier utilización de la aplicación desde el (os) dispositivo (s) móvil (es) asignados para tal fin por parte de terceros, así como los daños que se pudieran causar de tal utilización al propio Usuario o cualquier otra persona natural o jurídica.{'\r\n'}c.{'\t'}Cualquier reclamación presentada a {expo} o cualquier tercero derivado de la indebida utilización por terceros de la aplicación al servicio del Usuario.{'\r\n'}d.{'\t'}Cualquier erogación, gasto o costo en que deba incurrir {expo}. para la defensa de las reclamaciones que le sean presentadas, derivadas de la indebida utilización de la aplicación por terceros.{'\r\n\r\n\r\n\r\n'}XII. AUSENCIA DE RENUNCIA{'\r\n\r\n'}En la prestación de los servicios y funcionalidades de la Billetera Virtual, la mera tolerancia de tal sociedad del incumplimiento de los presentes Términos y Condiciones, demora o indebida utilización de la aplicación por parte del Usuario sea de manera total o parcial, no podrá interpretarse como una aceptación de tales incumplimientos o renuncia a sus derechos o modificación de las condiciones establecidas en los presentes Términos y Condiciones.{'\r\n\r\n\r\n\r\n'}XIII. COMUNICACIONES{'\r\n\r\n'}{expo} dispondrá de los siguientes medios de comunicación para entregar al Usuario la información necesaria para la utilización de los servicios de la aplicación:{'\r\n\r\n'}a.{'\t'}Correo electrónico debidamente registrado, proporcionado mediante los procesos de vinculación del Usuario.{'\r\n'}b.{'\t'}Mensajes de texto (SMS).{'\r\n'}c.{'\t'}Publicación de avisos o comunicaciones en la aplicación y/o en la página de internet www.{expo}.com.{'\r\n'}d.{'\t'}Cualquier otro medio de comunicación que, conforme con las tecnologías disponibles esté disponible, el cual, en todo caso será informado al Usuario.{'\r\n\r\n'}Bienes y/o servicios dentro de las funcionalidades de la Billetera Virtual se incluyen las siguientes:{'\r\n\r\n'}a.{'\t'}Creación de cuenta{'\r\n'}b.{'\t'}Consulta de movimientos{'\r\n'}c.{'\t'}Recarga de cuenta{'\r\n'}d.{'\t'}Retira dinero de cuenta{'\r\n'}e.{'\t'}Pago de convenios{'\r\n\r\n\r\n\r\n\r\n'}XV. RESOLUCIÓN DE CONTROVERSIAS{'\r\n\r\n'}Cualquier controversia surgida entre el Usuario y {expo} derivada de la prestación de los servicios a que se refieren los presentes Términos y Condiciones y/o la utilización de la aplicación, será resuelta por la jurisdicción ordinaria.{'\r\n\r\n\r\n'}XVI. INTEGRALIDAD{'\r\n\r\n'}La anulación, inaplicación de una o varias cláusulas del presente documento de Términos y Condiciones, no tendrá la virtud de afectar la validez y aplicación de las demás cláusulas.{'\r\n\r\n\r\n\r\n'}XVII. MODIFICACIÓN DE LOS TÉRMINOS Y CONDICIONES{'\r\n\r\n'}El Usuario acepta que los Términos y Condiciones podrán modificarse por {expo} de manera unilateral, efecto para el cual deberá informársele de las modificaciones realizadas a través de los medios de comunicación dispuestos para el suministro de información conforme con los presentes Términos y Condiciones.{'\r\n\r\n\r\n'}XVIII. VIGENCIA DE LOS TÉRMINOS Y CONDICIONES{'\r\n\r\n'}Los presentes Términos y Condiciones estarán vigentes, conforme con el texto actualizado publicado en la aplicación y en la página www.{expo}.com y sus modificaciones se distinguirán por la respectiva versión.{'\r\n\r\n\r\n'}XIX. VERSIÓN DE LOS TÉRMINOS Y CONDICIONES{'\r\n\r\n'}El presente documento corresponde a la versión actualizada de los Términos y Condiciones de la aplicación Billetera Virtual.{'\r\n'}</Text>
                                    <CheckboxCustom 
                                        options={optionsTerms}
                                        onSelect={handleSelectCheckBox('terms')}
                                        selectedValue={terms}
                                    />    
                                </View>
                            </Accordions>
                            {type ===  '8' && (
                                <>
                                    <View style={styles.mb5}>
                                        <Accordions title={"Depósito de bajo monto"}>
                                            <View style={styles.mb5}>
                                                <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>Al continuar estás haciendo la creación de un Depósito de Bajo Monto en el Banco Cooperativo Coopcentral.</Text>   
                                            </View>
                                            <View style={styles.mb5}>
                                                <Link href={'https://paynopain-changeit-test.s3.eu-west-1.amazonaws.com/documents/payments-way/PW_Reglamento_deposito_bajo_monto.pdf'} style={{...styles.link, ...primaryRegular}}>Reglamento depósito de bajo monto.</Link>
                                                <CheckboxCustom 
                                                    options={optionsDbm}
                                                    onSelect={handleSelectCheckBox('regla')}
                                                    selectedValue={regla}
                                                />    
                                            </View>
                                            <View style={styles.mb5}>
                                                <Link href={'https://paynopain-changeit-test.s3.eu-west-1.amazonaws.com/documents/payments-way/PW_Instructivo_uso_tarjeta_debito.pdf'} style={{...styles.link, ...primaryRegular}}>Instructivo de uso tarjeta debito física o vitual</Link>
                                                <CheckboxCustom 
                                                    options={optionsDbm}
                                                    onSelect={handleSelectCheckBox('tdTerms')}
                                                    selectedValue={tdTerms}
                                                />    
                                            </View>
                                            <View style={styles.mb5}>
                                                <Link href={'https://paynopain-changeit-test.s3.eu-west-1.amazonaws.com/documents/payments-way/PW_Canales_atencion_defensor_consumidor_BCC.pdf'} style={{...styles.link, ...primaryRegular}}>Canales de atención y defensor del consumidor financiero</Link>  
                                            </View>
                                            <View style={styles.mb5}>
                                                <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>{expo} es corresponsal dígital del Banco Cooperativo Coopcentral.</Text> 
                                                <Image style={styles.image} source={require('@/assets/images/general/logo_coopcentral.png')} resizeMode="cover"/>  
                                            </View>
                                        </Accordions>
                                    </View>
                                </>
                            )}
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