import React from "react";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./typeTransaction.styles";
import { Icon } from "react-native-paper";
import { Text } from "react-native-paper";
import { formatCurrency } from "@/utils/validationForms";

const extra = Constants.expoConfig?.extra || {};
const {primaryRegular, primaryBold} = extra.text;
const {colorPrimary, colorSecondary} = extra;

interface TypeTransactionProps {
    merchant: string;
    amount: string;
    date: string;
    type: string;
}

export default function TypeTransaction ({merchant, amount, date, type}: TypeTransactionProps) {
    return (
        <TouchableOpacity style={styles.touchable}>
            <View style={styles.row}>
                <LinearGradient
                    colors={[colorPrimary, colorSecondary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.containerInfo}
                >
                    <Icon
                        source={'wallet'}
                        size={24}
                        color="white"
                    />
                </LinearGradient>
                <View style={styles.row1}>
                    <View style={styles.text}>
                        <Text numberOfLines={1} ellipsizeMode='tail'  variant='bodySmall' style={[primaryBold]}>{merchant}</Text>
                        <Text  variant='bodySmall' style={[primaryRegular]}>{date}</Text>
                    </View>
                    <View>
                        <Text variant='bodySmall' style={[primaryRegular]}>{formatCurrency('1000')} COP</Text>
                        <View style={[type === 'recibido' ? styles.success : styles.error]}>
                            <Text  variant='bodySmall' style={[primaryRegular, styles.textCenter]}>{type}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}