import React, { useState } from "react";
import { styles } from "./typeCard.styles";
import { View, ScrollView, Image } from "react-native";
import { Text } from "react-native-paper";
import { MotiView, MotiText } from "moti";
import OptionsCard from "../options/optionsCard/optionsCard";
import ButtonsPrimary from "../forms/buttons/buttonPrimary/button";
import Constants from "expo-constants";
import { formatCardNumber } from "@/utils/fomatDate";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;

interface CardInfo {
    name: string;
    number: string;
    cvv: string;
    date: string;
}

interface TypeCardProps {
    type: number;
    cardInfo: CardInfo;
    onBack: () => void;
    onView: () => void;
}

export default function TypeCard({ type, cardInfo, onBack, onView }: TypeCardProps) {
    const [viewInfo, setViewInfo] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleViewInfo = () => {
        setIsAnimating(true);
        setViewInfo(!viewInfo);
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <MotiView
                    from={{ rotateY: '0deg' }}
                    animate={{ rotateY: viewInfo ? '360deg' : '0deg' }}
                    transition={{ type: 'timing', duration: 2000 }}
                    onDidAnimate={() => setIsAnimating(false)}
                    style={styles.imageContainer}
                >
                    <Image
                        source={require('@/assets/images/general/visa.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </MotiView>
                {(!isAnimating && viewInfo) && (
                    <MotiView
                        from={{ opacity: 0, translateY: -10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 500 }}
                    >
                      
                        <Text variant="labelSmall" style={[primaryBold, styles.text, styles.titleDateCardText]}>MM/YY</Text>
                        <Text variant="titleSmall" style={[primaryBold, styles.text, styles.dateCardText]}>{cardInfo.date}</Text>
                        <Text variant="labelSmall" style={[primaryBold, styles.text, styles.titleCvvCardText]}>CVV</Text>
                        <Text variant="titleSmall" style={[primaryBold, styles.text, styles.cvvCardText]}>{cardInfo.cvv}</Text>
                        <Text variant="titleSmall" style={[primaryBold, styles.text, styles.nameCardText]}>{cardInfo.name}</Text>
                        <Text variant="titleSmall" style={[primaryBold, styles.text, styles.numberCardText]}>
                            {formatCardNumber(cardInfo.number)}
                        </Text>
                    </MotiView>
                )}
                {(!isAnimating && !viewInfo) && (
                    <MotiView
                        from={{ opacity: 0, translateY: -10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 500 }}
                    >
                    
                    <Text variant="titleSmall" style={[primaryBold, styles.text, styles.typeCardText]}>
                            Tarjeta {type === 0 ? 'Virtual' : 'Física'}
                        </Text>
                    </MotiView>
                )}
            </View>
            <View style={styles.containerScroll}>
                <ScrollView>
                    <OptionsCard
                        type={type}
                        isPhysical={true}
                        isVirtual={true}
                        onView={onView}
                        onViewInfo={handleViewInfo}
                    />
                </ScrollView>
            </View>
            <ButtonsPrimary label="Volver" onPress={onBack} />
        </View>
    );
}
