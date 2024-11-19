import React, { Dispatch, SetStateAction } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper"; 
import Inputs from "../../forms/inputs/inputs";
import styles from "./requestRecharge.styles";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || {};
const {primaryBold, primaryRegular} = extra.text;

interface Input {
    onChangeText?: Dispatch<SetStateAction<string>>;
    value: string;
}

interface RequestRechargeProps {
    phone: Input;
    onPress: () => void;
}

export default function RequestRecharge({phone, onPress}:RequestRechargeProps) {
    return(
        <View style={styles.container}>
            <View style={styles.text}>
                <Text style={[primaryRegular]}>Ingresa a continuación el número de celular al cual quierem solicitar la recarga.</Text>
            </View>
            <Inputs 
                label="Introduce el número de celular"
                placeholder="Ingrese el valor"
                isSecureText={false} 
                isRequired 
                onChangeText={phone.onChangeText}
                value={phone.value}  
                keyboardType="numeric"          
            />
            <Text style={[primaryRegular, styles.text]}>
                Limites transaccionales 
                <TouchableOpacity style={styles.touchable} onPress={onPress}>
                    <Icon
                        source={'help-circle-outline'}
                        size={24}
                    />
                </TouchableOpacity>
            </Text>
        </View>
    );
}