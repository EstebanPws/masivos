import React, { Fragment, useEffect, useState } from "react";
import { TouchableOpacity, View, Image, Platform } from "react-native";
import { Checkbox, Icon, MD2Colors, Text } from "react-native-paper";
import styles from "./selecTypeAccount.styles";
import { Link, useRouter } from "expo-router";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import Constants from "expo-constants";
import HeaderSecondary from "@/components/headers/headerSecondary/headerSecondary";
import { GestureHandlerRootView, TouchableHighlight } from "react-native-gesture-handler";
import { AnimatePresence, MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { getData, setData } from "@/utils/storageUtils";
import InfoModalConfirm from "@/components/modals/infoModalConfirm/infoModalConfirm";
import ButtonsSecondary from "@/components/forms/buttons/buttonSecondary/button";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";

const extra = Constants.expoConfig?.extra || {};
const { primaryRegular, primaryBold } = extra.text;
const { colorPrimary, colorSecondary } = extra;
const expo = Constants.expoConfig?.name || '';

export default function Page() {
    const [isPressed1, setIsPressed1] = useState(false);
    const [isPressed2, setIsPressed2] = useState(false);
    const [visible, setVisible] = useState(false);
    const [showAuthorizations, setShowAuthorizations] = useState(false);
    const [checked, setChecked] = useState(false);
    const [typePerson, setTypePerson] = useState('');
    const [disbaledBtn , setDisbaledBtn] = useState(true);

    const [formData] = useState({
        modalidad: ''
    });

    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    useEffect(() => {
        !checked ? setDisbaledBtn(true): setDisbaledBtn(false)
    }, [checked])

    const handlePressIn1 = () => setIsPressed1(true);
    const handlePressOut1 = () => setIsPressed1(false);

    const handlePressIn2 = () => setIsPressed2(true);
    const handlePressOut2 = () => setIsPressed2(false);

    const handleNext = (type: number) => {
        const updatedFormData = { ...formData, modalidad: type !== 8 ? String(0) : String(type) };
        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                const newFormData = { ...savedData, ...updatedFormData };
                await setData('registrationForm', newFormData);
                router.push({
                    pathname: '/auth/signUp/formRegister',
                    params: { type: 8 }
                });
                setShowAuthorizations(false);
            }
        };

        fetchFormData();
    };

    const handleConfirmTerms = () => {
        setShowAuthorizations(false);
    }

    return (
        <>
            <ViewFadeIn>
                <HeaderSecondary type={1} onBack={handleBack} />
                <View style={styles.mt5}>
                    <View style={styles.containerText}>
                        <View style={styles.mb5}>
                            <Image style={styles.image} source={require('@/assets/images/general/logo.webp')} resizeMode="contain" />
                        </View>
                        <Text variant="titleMedium" style={{ ...styles.text, ...primaryRegular, ...styles.mb5 }}>
                            Al continuar estás creando un depósito de bajo monto en el Banco Cooperativo Coopcentral.
                        </Text>
                        <View style={styles.rowCheckbox}>
                            <Checkbox.Item
                                style={[styles.ml5]}
                                rippleColor={'transparent'}
                                color={colorPrimary} 
                                label=""
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => setChecked(!checked)}
                            />
                            {Platform.OS === 'ios' && (
                                <View style={styles.bgIos}>
                                    <Checkbox.Item
                                        style={[styles.ml5]}
                                        rippleColor={'transparent'}
                                        color={colorPrimary} 
                                        label=""
                                        status={checked ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked(!checked)}
                                    />  
                                </View>
                            )}
                            <Link href={'https://www.coopcentral.com.co/Filef_linka.asp?IDe=1184'} style={{...styles.link, ...styles.ml5 ,...primaryRegular}}>REGLAMENTO DEPÓSITO DE BAJO MONTO</Link>
                        </View>
                        <View style={styles.mb5}>
                            <Link href={'https://www.coopcentral.com.co/Filef_linka.asp?IDe=1183'} style={{ ...styles.link, ...primaryRegular }}>Instructivo de uso tarjeta debito física o virtual</Link>
                        </View>
                        <View style={styles.mb5}>
                            <Link href={'https://www.coopcentral.com.co/Filef_linka.asp?IDe=1190'} style={{ ...styles.link, ...primaryRegular }}>Canales de atención y defensor del consumidor financiero</Link>
                        </View>
                        <Text variant="titleMedium" style={{ ...styles.text, ...primaryRegular, ...styles.mb5 }}>
                            Masivos es corresponsal digital del Banco Cooperativo Coopcentral
                        </Text>
                        <View style={styles.mb5}>
                            <Image style={styles.image} source={require('@/assets/images/general/logo_coopcentral.png')} resizeMode="contain" />
                        </View>
                        <View style={[styles.row, styles.mb5]}>
                            <ButtonsSecondary
                                label="Rechazar"
                                onPress={() => {router.replace('/')}}
                            />
                            <ButtonsPrimary
                                label="Aceptar"
                                onPress={() => {router.replace('/auth/signUp/validateExistAccount')}}
                                disabled={disbaledBtn}
                            />
                        </View>

                        
                        {/*<GestureHandlerRootView style={styles.buttonContainer}>
                            <TouchableHighlight
                                style={styles.btn}
                                underlayColor={colorPrimary}
                                onPressIn={handlePressIn1}
                                onPressOut={handlePressOut1}
                                onPress={() => { setShowAuthorizations(true); setTypePerson('8') }}
                            >
                                <Text variant="titleMedium" style={{ ...styles.text, ...styles.textBtn, ...primaryRegular, color: isPressed1 ? `${MD2Colors.white}` : 'black' }}>
                                    Cuenta de bajo monto
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.btn}
                                underlayColor={colorPrimary}
                                onPressIn={handlePressIn2}
                                onPressOut={handlePressOut2}
                                onPress={() => {setVisible(true)}}
                            >
                                <Text variant="titleMedium" style={{ ...styles.text, ...styles.textBtn, ...primaryRegular, color: isPressed2 ? `${MD2Colors.white}` : 'black' }}>
                                    Cuenta ordinaria
                                </Text>
                            </TouchableHighlight>
                        </GestureHandlerRootView>*/}
                    </View>
                </View>
            </ViewFadeIn>
            <AnimatePresence>
                {visible && (
                    <MotiView
                        from={{ translateY: 1000 }}
                        animate={{ translateY: 0 }}
                        exit={{ translateY: 1000 }}
                        transition={{ type: 'timing', duration: 800 }}
                        style={styles.box}
                    >
                        <View style={styles.overlay} />
                        <TouchableOpacity style={styles.btnClose} onPress={() => { setVisible(false) }}>
                            <Icon
                                source="close-circle"
                                size={30}
                                color={colorPrimary}
                            />
                        </TouchableOpacity>
                        <LinearGradient
                            colors={[colorPrimary, colorSecondary]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradient}
                        >
                            <Text variant="titleMedium" style={{ ...styles.textBtnLine, ...primaryBold }}>
                                Indicanos que tipo de persona eres
                            </Text>
                            <View style={styles.line} />
                            <View style={styles.row}>
                                <View>
                                    <TouchableOpacity style={styles.btnAccount} onPress={() => { setShowAuthorizations(true); setTypePerson('0') }}>
                                        <Icon
                                            source="account"
                                            size={50}
                                            color={colorPrimary}
                                        />
                                    </TouchableOpacity>
                                    <Text variant="titleMedium" style={{ ...styles.textBtnAccount, ...primaryBold }}>
                                        Natural
                                    </Text>
                                </View>
                                {/*<View>
                                    <TouchableOpacity style={styles.btnAccount} onPress={() => {setShowAuthorizations(true); setTypePerson('1')}}>
                                        <Icon
                                            source="account-multiple"
                                            size={50}
                                            color={colorPrimary}
                                        />
                                    </TouchableOpacity>
                                    <Text variant="titleMedium" style={{ ...styles.textBtnAccount, ...primaryBold }}>
                                        Juridica
                                    </Text>
                                </View>*/}
                            </View>
                        </LinearGradient>
                    </MotiView>
                )}
                {(showAuthorizations && typePerson === '0') && (
                    <Fragment key={'autNat'}>
                        <InfoModalConfirm
                            title="Autorizaciones"
                            onCancel={() => setShowAuthorizations(!showAuthorizations)}
                            onPress={() => { handleNext(Number(typePerson)); handleConfirmTerms() }}
                        >
                            <Text variant="titleSmall" style={{ ...primaryRegular }}>
                                Acepto que la información contenida en este formulario y la relacionada con mis productos en el BANCO COOPERATIVO COOPCENTRAL (información sobre saldos, movimientos, financiera y comercial, de entrada y salida de recursos, deducciones) se use para fines fiscales e intercambio de información, tales como FATCA y CRS, y en cumplimiento y verificación de acuerdos internacionales. Asimismo, en caso de no suministrar la información y documentación que requiera el Banco para los propósitos aquí mencionados, autorizo al BANCO COOPERATIVO COOPCENTRAL para que notifique a las autoridades fiscales correspondientes y proceda a la aplicación de las medidas y consecuencias que de ello se deriven.{'\n\n'}1). Verificar la información aquí suministrada a través de cualquier medio que considere conveniente.{'\n\n'}2). Reportar, almacenar, actualizar, consultar, procesar, compilar, intercambiar, suministrar, grabar, solicitar y rectificar mi información de carácter financiero, crediticio, comercial, de servicios y la proveniente de terceros países con los propósitos establecidos en la Ley de Habeas Data, ante cualquier operador de información debidamente autorizado por la ley y constituido según las normas vigentes. Lo anterior implica que el cumplimiento o incumplimiento de mis obligaciones se reflejará en las mencionadas bases de datos.{'\n\n'}3). Tratar (recolectar, almacenar, usar) mis datos personales con el propósito de garantizarme un adecuado servicio y funcionamiento de los productos y servicios adquiridos con el BANCO COOPERATIVO COOPCENTRAL, para actividades de mercadeo y para información en general de la relación comercial con el BANCO COOPERATIVO COOPCENTRAL.{'\n\n'}4). Entregar, transmitir o transferir mi información personal a terceros para realizar labores necesarias para el adecuado servicio y funcionamiento de los productos y servicios adquiridos con el BANCO COOPERATIVO COOPCENTRAL, y realizar labores propias de cobranza, mercadeo e información en general. En todo caso, el BANCO COOPERATIVO COOPCENTRAL garantiza los niveles adecuados de seguridad de dicha información.{'\n\n'}5). Autorizo de manera expresa, inequívoca, voluntaria y suficiente al BANCO COOPERATIVO COOPCENTRAL para solicitar a los operadores de información del PILA, y a estos a su vez para que le suministren al BANCO COOPERATIVO COOPCENTRAL, por el medio que considere pertinente y seguro, mis datos personales relacionados con la afiliación y pago de los aportes al Sistema de Seguridad Social Integral, tales como ingreso base de cotización y demás información relacionada con mi situación laboral y empleador. El BANCO COOPERATIVO COOPCENTRAL podrá conocer dicha información cuantas veces lo requiera, mantenerla actualizada y, en general, tratarla, directamente o a través de un encargado, con la finalidad de analizar mi perfil crediticio en aras de establecer una relación comercial y/o de servicios conmigo, así como también para ofrecerme productos o servicios que se adecuen a mi perfil crediticio. En todo caso, declaro expresamente conocer el carácter facultativo de la presente autorización, los derechos que me asisten como titular de la información, y entiendo que el uso y manejo que se dará a los datos personales se efectuará de forma responsable y respetando las normas y principios generales establecidos en la Ley 1581 de 2012 y sus decretos reglamentarios, así como la Ley 1266 de 2008 en lo que resulte aplicable.{'\n\n'}6). Debitar de mi(s) cuenta(s) abiertas en esta entidad todos los valores originados en las operaciones y servicios que el BANCO COOPERATIVO COOPCENTRAL me suministre.{'\n\n'}7). Acepto asumir los costos de la gestión de cobranzas (solo para Tarjeta de Crédito) que realice el Banco en forma directa o a través de terceros debidamente autorizados.
                            </Text>
                        </InfoModalConfirm>
                    </Fragment>
                )}
                {(showAuthorizations && typePerson === '1') && (
                    <Fragment key={'autJur'}>
                        <InfoModalConfirm
                            title="Autorizaciones"
                            onCancel={() => setShowAuthorizations(!showAuthorizations)}
                            onPress={() => { handleNext(Number(typePerson)); handleConfirmTerms() }}
                        >
                            <Text variant="titleSmall" style={{ ...primaryRegular }}>
                                1) Verificar la información aquí suministrada a través de cualquier medio que considere conveniente.{'\n\n'} 2) Reportar, almacenar, actualizar, consultar, procesar, compilar, intercambiar, suministrar, grabar, solicitar y rectificar mi información y la información de la entidad que represento, de carácter financiero, crediticia, comercial, de servicios y la proveniente de terceros países con los propósitos establecidos en la Ley Habeas Data, ante cualquier operador de información debidamente autorizado por la Ley y constituido según las normas vigentes.  Lo anterior implica que el cumplimiento o  incumplimiento de las obligaciones de la entidad que represento se reflejará en las mencionadas bases de datos.{'\n\n'} 3) Tratar (recolectar, almacenar, usar) los datos de la entidad que represento con el propósito de garantizarme un adecuado servicio y funcionamiento de los productos y servicios adquiridos con COOPCENTRAL, para actividades de mercadeo y para información en general de la relación comercial con COOPCENTRAL{'\n\n'} 4) Entregar, transmitir o transferir la información de la entidad que represento a terceros para realizar labores necesarias para el adecuado servicio y funcionamiento de los productos y servicios adquiridos con COOPCENTRAL y realizar labores propias de cobranza, mercadeo e información en general, en todo caso COOPCENTRAL garantiza los niveles adecuados de seguridad de dicha información.{'\n\n'} 5) Debitar de la (s) cuenta(s) de la entidad que represento, abierta (s) en esta entidad, todos los valores originados en las operaciones y servicios que CoopCentral le suministre.
                            </Text>
                        </InfoModalConfirm>
                    </Fragment>
                )}
                {/*{(showAuthorizations && typePerson === '8') && (
                    <Fragment key={'autDbm'}>
                        <InfoModalConfirm
                            title="Depósito de bajo monto"
                            onCancel={() => setShowAuthorizations(!showAuthorizations)}
                            onPress={() => { handleConfirmTerms(); handleNext(Number(typePerson)) }}
                        >
                            <View style={styles.mb5}>
                                <Text variant="titleSmall" style={{ ...primaryRegular }}>
                                    Al continuar estás creando un depósito de bajo monto en el Banco Cooperativo Coopcentral.
                                </Text>
                            </View>
                            <View style={styles.mb5}>
                                <Link href={'https://www.coopcentral.com.co/Filef_linka.asp?IDe=1184'} style={{ ...styles.link, ...primaryRegular }}>Reglamento depósito de bajo monto.</Link>
                            </View>
                            <View style={styles.mb5}>
                                <Link href={'https://www.coopcentral.com.co/Filef_linka.asp?IDe=1183'} style={{ ...styles.link, ...primaryRegular }}>Instructivo de uso tarjeta debito física o vitual</Link>
                            </View>
                            <View style={styles.mb5}>
                                <Link href={'https://www.coopcentral.com.co/Filef_linka.asp?IDe=1190'} style={{ ...styles.link, ...primaryRegular }}>Canales de atención y defensor del consumidor financiero</Link>
                            </View>
                            <View style={styles.mb5}>
                                <View style={styles.mb5}>
                                    <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>{expo} es corresponsal dígital del Banco Cooperativo Coopcentral.</Text>
                                </View>
                                <Image style={styles.image} source={require('@/assets/images/general/logo_coopcentral.png')} resizeMode="cover" />
                            </View>
                        </InfoModalConfirm>
                    </Fragment>
                )}*/}
            </AnimatePresence>
        </>

    );
}