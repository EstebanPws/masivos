import React, { useState } from "react";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { useFocusEffect } from "expo-router";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import { TouchableHighlight, View} from "react-native";
import { MD2Colors, Text } from "react-native-paper";
import styles from "./cards.styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Constants from "expo-constants";
import PremiumCard from "@/components/animations/premiumCard/premiumCard";
import TypeCard from "@/components/typeCard/typeCard";

const extra = Constants.expoConfig?.extra || {};
const { primaryRegular, primaryBold } = extra.text;
const { colorPrimary, colorSecondary } = extra;

interface CardInfo {
    name: string;
    number: string;
    cvv: string;
    date: string
}

export default function Cards(){
    const { setActiveTab, goBack } = useTab();
    const [isPressed1, setIsPressed1] = useState(false);
    const [isPressed2, setIsPressed2] = useState(false);
    const [requestVirtual, setRequestVirtual] = useState(false);
    const [requestPhysical, setRequestPhysical] = useState(false);
    const [viewVirtual, setViewVirtual] = useState(false);
    const [viewPhysical, setViewPhysical] = useState(false);
    const [isVirtual, setIsVirtual] = useState(false);
    const [isPhysical, setIsPhysical] = useState(false);
  
    const virtualCard: CardInfo = {
        name: 'Juan Baquero',
        number: '1234123412341234',
        cvv: '123',
        date: '08/29'
    }

    const physicalCard: CardInfo = {
        name: 'Juan Baquero',
        number: '4567456745674567',
        cvv: '456',
        date: '08/30'
    }

    useFocusEffect(() => {
      setActiveTab('/home/cards/');
    });
    
    const handleBack = () => {
        goBack();
    };

    const handlePressIn1 = () => setIsPressed1(true);
    const handlePressOut1 = () => setIsPressed1(false);

    const handlePressIn2 = () => setIsPressed2(true);
    const handlePressOut2 = () => setIsPressed2(false);

    const handleNext = (type: number) => {
        if(type === 0) {
            setViewPhysical(true);
            setRequestPhysical(true);
        } else {
            setViewVirtual(true);
            setRequestVirtual(true);
        }
    }

    const handleBackCard = () => {
        setIsPhysical(false);
        setIsVirtual(false);
    }

    const handleView = (type: number) => () => {
        if(type === 0) {
            setIsVirtual(false);
            setIsPhysical(true);
        } else {
            setIsPhysical(false);
            setIsVirtual(true);
        }
    }

    return(
        <ViewFadeIn isWidthFull>
            <HeaderForm
                onBack={() => handleBack()}
                title="Tarjetas"
            />
            {(!isVirtual && !isPhysical) && (
                <View style={styles.containerText}>
                    <PremiumCard key={Date.now()}/>
                    {(!requestVirtual || !requestPhysical) &&(
                        <View>
                            <Text variant="titleMedium" style={{ ...styles.text, ...primaryRegular }}>
                                Selecciona el tipo de tarjeta que desea solicitar:
                            </Text>
                            <GestureHandlerRootView style={styles.buttonContainer}>
                                {!requestPhysical && (
                                    <TouchableHighlight
                                        style={styles.btn}
                                        underlayColor={colorPrimary}
                                        onPressIn={handlePressIn1}
                                        onPressOut={handlePressOut1}
                                        onPress={() => handleNext(0)}
                                    >
                                        <Text variant="titleMedium" style={{ ...styles.textBtn, ...primaryRegular, color: isPressed1 ? `${MD2Colors.white}` : 'black' }}>
                                            Tarjeta Física
                                        </Text>
                                    </TouchableHighlight>
                                )}
                                {!requestVirtual && (
                                    <TouchableHighlight
                                        style={styles.btn}
                                        underlayColor={colorPrimary}
                                        onPressIn={handlePressIn2}
                                        onPressOut={handlePressOut2}
                                        onPress={() => handleNext(1)}
                                    >
                                        <Text variant="titleMedium" style={{ ...styles.textBtn, ...primaryRegular, color: isPressed2 ? `${MD2Colors.white}` : 'black' }}>
                                            Tarjeta Virtual
                                        </Text>
                                    </TouchableHighlight>
                                )}
                            </GestureHandlerRootView>
                        </View>
                    )}
                    {(viewVirtual || viewPhysical) && (
                        <View>
                            <Text variant="titleMedium" style={{ ...styles.text, ...primaryRegular }}>
                                Selecciona el tipo de tarjeta que desea ver:
                            </Text>
                            <GestureHandlerRootView style={styles.buttonContainer}>
                                {viewPhysical && (
                                    <TouchableHighlight
                                        style={styles.btn}
                                        underlayColor={colorPrimary}
                                        onPressIn={handlePressIn1}
                                        onPressOut={handlePressOut1}
                                        onPress={() => setIsPhysical(true)}
                                    >
                                        <Text variant="titleMedium" style={{ ...styles.textBtn, ...primaryRegular, color: isPressed1 ? `${MD2Colors.white}` : 'black' }}>
                                            Tarjeta Fisica
                                        </Text>
                                    </TouchableHighlight>
                                )}
                                {viewVirtual && (
                                    <TouchableHighlight
                                        style={styles.btn}
                                        underlayColor={colorPrimary}
                                        onPressIn={handlePressIn2}
                                        onPressOut={handlePressOut2}
                                        onPress={() => setIsVirtual(true)}
                                    >
                                        <Text variant="titleMedium" style={{ ...styles.textBtn, ...primaryRegular, color: isPressed2 ? `${MD2Colors.white}` : 'black' }}>
                                            Tarjeta Virtual
                                        </Text>
                                    </TouchableHighlight>
                                )}
                            </GestureHandlerRootView>
                        </View>
                    )}
                </View>
            )}
            {isVirtual && (
                <TypeCard type={0} cardInfo={virtualCard} onBack={handleBackCard} onView={handleView(0)}/>
            )}
            {isPhysical && (
                <TypeCard type={1} cardInfo={physicalCard} onBack={handleBackCard} onView={handleView(1)}/>
            )}
        </ViewFadeIn>
    );
}