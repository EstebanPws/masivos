import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { styles } from "./optionsMain.styles";
import Constants from "expo-constants";
import { router } from "expo-router";

const extra = Constants.expoConfig?.extra || {};
const {primaryRegular} = extra.text;
const {colorPrimary} = extra;

interface OptionsMain {
    onRecharge: () => void;
}

export default function OptionsMain({onRecharge}:OptionsMain ) {
    return(
        <View style={styles.row}>
            <View>
                <TouchableOpacity style={styles.containerBtn} onPress={onRecharge}>
                    <Icon 
                        source={'plus'}
                        size={24}
                        color={colorPrimary}
                    />
                </TouchableOpacity>
                <Text variant="labelMedium" style={[primaryRegular, styles.text]}>Recargar</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.containerBtn} onPress={() => router.push('/home/bankTransfer/')}>
                    <Icon 
                        source={'bank-check'}
                        size={24}
                        color={colorPrimary}
                    />
                </TouchableOpacity>
                <Text variant="labelMedium" style={[primaryRegular, styles.text]}>Transferir</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.containerBtn} onPress={() => router.push('/home/sendMoney/')}>
                    <Icon 
                        source={'arrow-right'}
                        size={24}
                        color={colorPrimary}
                    />
                </TouchableOpacity>
                <Text variant="labelMedium" style={[primaryRegular, styles.text]}>Enviar</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.containerBtn} onPress={() => router.push('/home/cashout')}>
                    <Icon 
                        source={'arrow-down'}
                        size={24}
                        color={colorPrimary}
                    />
                </TouchableOpacity>
                <Text variant="labelMedium" style={[primaryRegular, styles.text]}>Retirar</Text>
            </View>
        </View>
    );
}