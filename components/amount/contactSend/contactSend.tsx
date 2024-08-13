import React, { useState } from "react";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, Text } from "react-native-paper";
import { styles } from "./contactSend.styles";
import Inputs from "@/components/forms/inputs/inputs";
import { TouchableOpacity, View } from "react-native";

const extra = Constants.expoConfig?.extra || {};
const {primaryBold, primaryRegular} = extra.text;
const {colorPrimary, colorSecondary} = extra;

interface ContactSendProps {
    isWelcome?: boolean;
}

export default function ContactSend({isWelcome = true}: ContactSendProps) {
    const [number, setNumber] = useState('');

    return(
        <LinearGradient
            colors={[colorPrimary, colorSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            <Text variant='labelSmall' style={[primaryBold, styles.text]}>Ingresa el número de celular al que quieres enviar dinero</Text>
            <View style={styles.row}>
                <Inputs 
                    isSecureText={false} 
                    isRequired={false} 
                    value={number}
                    onChangeText={setNumber}
                    placeholder="Ingresa el número de celular"            
                />
                <TouchableOpacity style={styles.touchable}>
                    <Icon
                        source={'arrow-right'}
                        size={24}
                    />
                </TouchableOpacity>
            </View>
            <Text variant='labelSmall' style={[primaryBold, styles.text]}>ó busque el contacto a continuación:</Text>
        </LinearGradient>

    );
}