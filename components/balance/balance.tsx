import React from "react";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native-paper";
import { formatCurrency } from "@/utils/validationForms";
import { styles } from "./balance.styles";

const extra = Constants.expoConfig?.extra || {};
const {primaryBold, primaryRegular} = extra.text;
const {colorPrimary, colorSecondary} = extra;

export default function Balance() {
    return(
        <LinearGradient
            colors={[colorPrimary, colorSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            <Text variant="titleSmall" style={[primaryRegular, styles.text]}>¡Bienvenido 
                <Text variant="titleSmall" style={[primaryBold, styles.text]}> Juan!</Text>
            </Text>
            <LinearGradient
                colors={[colorPrimary, colorSecondary]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={styles.balance}
            >
                <Text variant="headlineSmall" style={[primaryBold, styles.text]}>{formatCurrency('20000000')} COP</Text>
            </LinearGradient>
            <Text variant="titleSmall" style={[primaryRegular, styles.text]}>Saldo</Text>
        </LinearGradient>

    );
}