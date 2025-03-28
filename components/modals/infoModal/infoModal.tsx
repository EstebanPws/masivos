import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { BlurView } from "expo-blur";
import { Icon, MD2Colors } from "react-native-paper";
import styles from "./infoModal.styles";
import Constants from "expo-constants";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { MotiView, AnimatePresence } from 'moti';

const extra = Constants.expoConfig?.extra || {};
const { primaryRegular, primaryBold } = extra.text;

interface InfoModalProps {
    title?: string;
    type: 'success' | 'error' | 'info';
    message: string | null;
    onPress: () => void;
    isVisible: boolean;
    label?: string;
}

const iconMap = {
    success: 'check-circle',
    error: 'alert-circle',
    info: 'information',
};

export default function InfoModal({ title, type, message, onPress, isVisible, label }: InfoModalProps) {
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
                        <Icon source={iconMap[type]} size={50} color={type === 'error' ? `${MD2Colors.red700}` : type === 'success' ? `${MD2Colors.green700}` : `${MD2Colors.blue700}`} />
                        <ScrollView>
                            {title && (
                                <Text style={{ ...styles.message, ...primaryBold }}>{title}</Text>
                            )}
                            <Text style={{ ...styles.message, ...primaryRegular }}>{message}</Text>
                        </ScrollView>
                        <ButtonsPrimary
                            label={label ? label : "OK"}
                            onPress={handlePress}
                        />
                    </MotiView>
                </BlurView>
            )}
        </AnimatePresence>
    );
}
