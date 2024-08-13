import React, { Dispatch, SetStateAction } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper"; 
import Inputs from "../../forms/inputs/inputs";
import { styles } from "./selectAmount.styles";
import Constants from "expo-constants";
import { formatCurrency } from "@/utils/validationForms";

const extra = Constants.expoConfig?.extra || {};
const {primaryBold, primaryRegular} = extra.text;

interface Input {
    onChangeText?: Dispatch<SetStateAction<string>>;
    value: string;
}

interface SelectAmountProps {
    valMax?: string;
    valMin?: string;
    comision?: string;
    isConcepto?: boolean;
    amount: Input;
    concepto?: Input;
    type: number;
}

export default function SelectAmount({valMax, valMin, comision, isConcepto = false, amount, concepto = { onChangeText: () => {}, value: '' }, type}:SelectAmountProps) {
    return(
        <View style={styles.container}>
            {(valMax || valMin) &&(
                <View style={styles.text}>
                    {valMin && (
                        <Text style={[primaryRegular]}>Valor mínimo: {formatCurrency(valMin)} COP</Text>
                    )}
                    {valMax && (
                        <Text style={[primaryRegular]}>Valor máximo: {formatCurrency(valMax)} COP</Text>
                    )}
                </View>
            )}
            <Inputs 
                label={`Ingrese el valor a ${type === 0 ? 'recargar' : type === 1 ? 'transferir' : type === 2 ? 'enviar' : 'retirar'}`}
                placeholder="Ingrese el valor"
                isSecureText={false} 
                isRequired 
                onChangeText={amount.onChangeText}
                value={amount.value}  
                isCurrency
                keyboardType="numeric"          
            />
            {comision && (
                <Text style={[primaryBold, styles.text]}>Comisión: {formatCurrency(comision)} COP</Text>
            )}
            {type === 3 && (
                <Text variant='labelMedium' style={[primaryBold, styles.text]}>Nota: Recuerda que puedes retirar en cualquier efecty a nivel nacional.</Text>
            )}
            <Text style={[primaryRegular, styles.text]}>
                Limites transaccionales 
                <TouchableOpacity style={styles.touchable}>
                    <Icon
                        source={'help-circle-outline'}
                        size={24}
                    />
                </TouchableOpacity>
            </Text>
            {isConcepto && (
                <View style={styles.concepto}>
                    <Inputs 
                        label="Introduce el concepto"
                        placeholder="Concepto"
                        isSecureText={false} 
                        isRequired={false}
                        onChangeText={concepto.onChangeText}
                        value={concepto.value}  
                        keyboardType="default"          
                    />
                </View>
            )}
        </View>
    );
}