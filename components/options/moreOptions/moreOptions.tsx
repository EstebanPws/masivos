import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";
import { styles } from "./moreOptions.styles";
import Constants from "expo-constants";
import { MotiView, AnimatePresence } from 'moti';
import { Icon, Text } from "react-native-paper";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/components/auth/context/authenticationContext";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;
const {colorPrimary, colorSecondary} = extra;

interface MoreOptionsProps {
    onPress: () => void;
}

export default function MoreOptions({ onPress }: MoreOptionsProps) {
    const [visible, setVisible] = useState(true);
    const { logout } = useAuth();

    const handlePress = () => {
        setVisible(false);
        setTimeout(onPress, 400);
    };

    const handleRoute = (type: number) => {
        if (type === 0) {
            router.push({
                pathname: '/home/',
                params: { type: 0 }
            })
        } else if (type === 1) {
            router.replace('/home/bankTransfer');
        } else if (type === 2) {
            router.replace('/home/sendMoney/');
        } else {
            router.replace('/home/cashout/');
        }

        handlePress();
    }

    const handleLogout = async () => {
        await logout();
    }


    return (
        <AnimatePresence>
            {visible && (
                <TouchableOpacity
                    style={styles.container}
                    activeOpacity={1}
                    onPress={handlePress}
                >
                    <BlurView intensity={80} tint="light" style={styles.blurView}>
                        <MotiView
                            from={{ opacity: 0, translateY: 50 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            exit={{ opacity: 0, translateY: 50 }}
                            transition={{ type: 'timing', duration: 300 }}
                            style={styles.modalContainer}
                        >
                            <TouchableOpacity onPress={() => handleRoute(0)} style={styles.touch}>
                                <View style={styles.row}>
                                    <Icon 
                                        source={'plus'}
                                        size={24}
                                        color={colorPrimary}
                                    />
                                    <Text variant="labelMedium" style={[primaryBold]}>Recargar</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleRoute(1)} style={styles.touch}>
                                <View style={styles.row}>
                                    <Icon 
                                        source={'bank-check'}
                                        size={24}
                                        color={colorPrimary}
                                    />
                                    <Text variant="labelMedium" style={[primaryBold]}>Transferir</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleRoute(2)} style={styles.touch}>
                                <View style={styles.row}>
                                    <Icon 
                                        source={'arrow-right'}
                                        size={24}
                                        color={colorPrimary}
                                    />
                                    <Text variant="labelMedium" style={[primaryBold]}>Enviar</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleRoute(3)} style={styles.touch}>
                                <View style={styles.row}>
                                    <Icon 
                                        source={'arrow-down'}
                                        size={24}
                                        color={colorPrimary}
                                    />
                                    <Text variant="labelMedium" style={[primaryBold]}>Retirar</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleLogout()} style={styles.touch}>
                                <LinearGradient
                                    colors={[colorPrimary, colorSecondary]}
                                    style={styles.toggleButton}
                                >
                                    <View style={styles.row}>
                                        <Icon 
                                            source={'logout'}
                                            size={24}
                                            color={'white'}
                                        />
                                        <Text variant="labelMedium" style={[primaryBold, styles.text]}>Salir</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </MotiView>
                    </BlurView>
                </TouchableOpacity>
            )}
        </AnimatePresence>
    );
}
