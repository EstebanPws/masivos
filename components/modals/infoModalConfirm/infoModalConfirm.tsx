import React, { ReactNode, useState } from "react";
import { BlurView } from "expo-blur";
import { styles } from "./infoModalConfirm.styles";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { MotiView, AnimatePresence } from 'moti';
import { Text } from "react-native-paper";
import Constants from "expo-constants";
import { ScrollView, View } from "react-native";
import ButtonsSecondary from "@/components/forms/buttons/buttonSecondary/button";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;

interface InfoModalConfirmProps {
    title?: string;
    children: ReactNode;
    onPress: () => void;
    onCancel: () => void;
    id?: React.Key;
    view?: boolean;
    isBankTransfer?: boolean;
    label1?: string;
    label2?: string
}

export default function InfoModalConfirm({ title, onPress, onCancel, children, id, view, isBankTransfer, label1, label2}: InfoModalConfirmProps) {
    const [visible, setVisible] = useState<boolean>(view ? view : true);

    const handlePress = () => {
        setVisible(view ? view : false);
        setTimeout(onPress, 400);
    };

    const handleCancel = () => {
        setVisible(view ? view : false);
        setTimeout(onCancel, 400);
    };

    return (
        <AnimatePresence key={id}>
            {visible && (
                <BlurView intensity={80} tint="light" style={[styles.blurView]}>
                    <MotiView
                        from={{ opacity: 0, translateY: -50 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: -50 }}
                        transition={{ type: 'timing', duration: 300 }}
                        style={[isBankTransfer ? styles.modalContainerBankTransfer : styles.modalContainer]}
                    >
                        {title && (
                             <Text variant='bodyLarge' style={[primaryBold, styles.title]}>{title}</Text>
                        )}
                        <ScrollView>
                            {children}
                        </ScrollView>
                        <View style={styles.row}>
                            <ButtonsPrimary
                                label={label1 ? label1 : "Aceptar"}
                                onPress={handlePress}
                            />
                             <ButtonsSecondary
                                label={label2 ? label2 :"Rechazar"}
                                onPress={handleCancel}
                            />
                        </View>
                    </MotiView>
                </BlurView>
            )}
        </AnimatePresence>
    );
}
