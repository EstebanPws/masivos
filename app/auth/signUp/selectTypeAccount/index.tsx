import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, MD2Colors, Text } from "react-native-paper";
import { styles } from "./selecTypeAccount.styles";
import { useRouter } from "expo-router";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import Constants from "expo-constants";
import HeaderSecondary from "@/components/headers/headerSecondary/headerSecondary";
import { GestureHandlerRootView, TouchableHighlight } from "react-native-gesture-handler";
import { AnimatePresence, MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { getData, setData } from "@/utils/storageUtils";

const extra = Constants.expoConfig?.extra || {};
const { primaryRegular, primaryBold } = extra.text;
const { colorPrimary, colorSecondary } = extra;



export default function Page() {
    const [isPressed1, setIsPressed1] = useState(false);
    const [isPressed2, setIsPressed2] = useState(false);
    const [visible, setVisible] = useState(false);
    const [formData] = useState({
        modalidad: ''
    });

    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handlePressIn1 = () => setIsPressed1(true);
    const handlePressOut1 = () => setIsPressed1(false);

    const handlePressIn2 = () => setIsPressed2(true);
    const handlePressOut2 = () => setIsPressed2(false);

    const handleNext = (type: number) => {
        const updatedFormData = {...formData, modalidad: String(type) };
        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                const newFormData = {...savedData, ...updatedFormData };
                await setData('registrationForm', newFormData);
                router.push('auth/signUp/formRegister/');
            }
        };
    
        fetchFormData();
    };

    return (
        <>
            <ViewFadeIn>
                <HeaderSecondary type={1} onBack={handleBack} />
                <View style={styles.mt5}>
                    <View style={styles.containerText}>
                        <Text variant="titleMedium" style={{ ...styles.text, ...primaryRegular }}>
                            Selecciona el tipo de cuenta que deseas obtener:
                        </Text>
                        <GestureHandlerRootView style={styles.buttonContainer}>
                            <TouchableHighlight
                                style={styles.btn}
                                underlayColor={colorPrimary}
                                onPressIn={handlePressIn1}
                                onPressOut={handlePressOut1}
                                onPress={() => {handleNext(8)}}
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
                        </GestureHandlerRootView>
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
                        <TouchableOpacity style={styles.btnClose} onPress={() => {setVisible(false)}}>
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
                            <View style={styles.line}/>
                            <View style={styles.row}>
                                <View>
                                    <TouchableOpacity style={styles.btnAccount} onPress={() => {handleNext(0)}}>
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
                                <View>
                                    <TouchableOpacity style={styles.btnAccount} onPress={() => {handleNext(1)}}>
                                        <Icon
                                            source="account-multiple"
                                            size={50}
                                            color={colorPrimary}
                                        />
                                    </TouchableOpacity>
                                    <Text variant="titleMedium" style={{ ...styles.textBtnAccount, ...primaryBold }}>
                                        Juridica
                                    </Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </MotiView>
                )}
            </AnimatePresence>
        </>

    );
}