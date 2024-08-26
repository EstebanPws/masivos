import React, { ReactNode, useState } from "react";
import { BlurView } from "expo-blur";
import { styles } from "./infoModalConfirm.styles";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { MotiView, AnimatePresence } from 'moti';
import { Text } from "react-native-paper";
import Constants from "expo-constants";
import { ScrollView, View } from "react-native";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;

interface InfoModalConfirmProps {
    title?: string;
    children: ReactNode;
    onPress: () => void;
    onCancel: () => void;
    id?: React.Key;
}

export default function InfoModalConfirm({ title, onPress, onCancel, children, id}: InfoModalConfirmProps) {
    const [visible, setVisible] = useState(true);

    const handlePress = () => {
        setVisible(false);
        setTimeout(onPress, 400);
    };

    const handleCancel = () => {
        setVisible(false);
        setTimeout(onCancel, 400);
    };

    return (
        <AnimatePresence key={id}>
            {visible && (
                <BlurView intensity={80} tint="light" style={styles.blurView}>
                    <MotiView
                        from={{ opacity: 0, translateY: -50 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: -50 }}
                        transition={{ type: 'timing', duration: 300 }}
                        style={styles.modalContainer}
                    >
                        <Text variant='bodyLarge' style={[primaryBold, styles.title]}>{title}</Text>
                        <ScrollView>
                            {children}
                        </ScrollView>
                        <View style={styles.row}>
                            <ButtonsPrimary
                                label="Aceptar"
                                onPress={handlePress}
                            />
                             <ButtonsPrimary
                                label="Rechazar"
                                onPress={handleCancel}
                            />
                        </View>
                    </MotiView>
                </BlurView>
            )}
        </AnimatePresence>
    );
}
