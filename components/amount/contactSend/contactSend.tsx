import React, { useState } from "react";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, Text } from "react-native-paper";
import { styles } from "./contactSend.styles";
import Inputs from "@/components/forms/inputs/inputs";
import { TouchableOpacity, View } from "react-native";
import instanceWallet from "@/services/instanceWallet";

const extra = Constants.expoConfig?.extra || {};
const expo = Constants.expoConfig?.name || '';
const { primaryBold } = extra.text;
const { colorPrimary, colorSecondary } = extra;

interface ContactSendProps {
    onResponseContact: (response: any) => void;
}

export default function ContactSend({onResponseContact }: ContactSendProps) {
    const [number, setNumber] = useState('');

    const fetchListContacts = async () => {
        let body;
        if (number) {
            body = { numero_celular: number }
        } else {
            return "Debe ingresar el número de celular.";
        }

        try {
            const response = await instanceWallet.post('getcelularP2P', body);
            let final;
            if(response.data.length !== 0) {
                final = {
                    contact: response.data[0],
                    phone: number
                }
            } else {
                final = `El número de celular ingresado no tiene cuenta o depósito en ${expo}`;
            }
            return final;
        } catch (error) {
            return "Hubo un error al intentar consultar los datos del número ingresado, por favor intentelo de nuevo en unos minutos.";
        }
    };

    const handleInfoContact = async () => {
        const contact = await fetchListContacts();
        onResponseContact(contact);
    };

    return (
        <LinearGradient
            colors={[colorPrimary, colorSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            <Text variant='labelSmall' style={[primaryBold, styles.text]}>
                Ingresa el número de celular al que quieres enviar dinero
            </Text>
            <View style={styles.row}>
                <Inputs
                    isSecureText={false}
                    isRequired={false}
                    value={number}
                    onChangeText={setNumber}
                    placeholder="Ingresa el número de celular"
                    keyboardType="numeric"
                    maxLength={10}
                />
                <TouchableOpacity style={styles.touchable} onPress={handleInfoContact}>
                    <Icon
                        source={'arrow-right'}
                        size={24}
                    />
                </TouchableOpacity>
            </View>
            <Text variant='labelSmall' style={[primaryBold, styles.text]}>
                ó busque el contacto a continuación:
            </Text>
        </LinearGradient>
    );
}