import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import { BlurView } from "expo-blur";
import styles from "./operationsModal.styles";
import Constants from "expo-constants";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { MotiView, AnimatePresence } from 'moti';

const extra = Constants.expoConfig?.extra || {};
const { primaryRegular } = extra.text;

interface BntOptions {
    name: string;
    image: ImageSourcePropType;
    onPress: () => void;
}

interface OperationsModalProps {
    button1?: BntOptions;
    button2: BntOptions;
    onPress: () => void;
}


export default function OperationsModal({ button1, button2, onPress }: OperationsModalProps) {
    const [visible, setVisible] = useState(true);

    const handlePress = () => {
        setVisible(false);
        setTimeout(onPress, 400);
    };

    return (
        <AnimatePresence>
            {visible && (
                <BlurView intensity={80} tint="light" style={styles.blurView}>
                    <MotiView
                        from={{ opacity: 0, translateY: -50 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: -50 }}
                        transition={{ type: 'timing', duration: 300 }}
                        style={styles.modalContainer}
                    >
                        <View style={styles.row}>
                            {button1 && (
                                <View style={styles.center}>
                                    <TouchableOpacity style={styles.touchable} onPress={button1.onPress}>
                                        <Image source={button1.image} style={styles.image} resizeMode="contain"/>
                                    </TouchableOpacity>
                                    <Text style={{ ...styles.message, ...primaryRegular }}>{button1.name}</Text>
                                </View>
                            )}
                            {button2 && (
                                <View style={styles.center}>
                                    <TouchableOpacity style={styles.touchable} onPress={button2.onPress}>
                                        <Image source={button2.image} style={styles.image} resizeMode="contain"/>
                                    </TouchableOpacity>
                                    <Text style={{ ...styles.message, ...primaryRegular }}>{button2.name}</Text>
                                </View>
                            )}
                        </View>
                        <ButtonsPrimary
                            label="Regresar"
                            onPress={handlePress}
                        />
                    </MotiView>
                </BlurView>
            )}
        </AnimatePresence>
    );
}
