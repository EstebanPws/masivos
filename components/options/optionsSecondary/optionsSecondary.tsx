import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { styles } from "./optionsSecondary.styles";
import Constants from "expo-constants";


const extra = Constants.expoConfig?.extra || {};
const {primaryBold} = extra.text;
const {colorPrimary} = extra;

export default function OptionsSecondary() {
    return(
        <View style={styles.row}>
            <View>
                <TouchableOpacity style={styles.containerBtn}>
                    <Icon 
                        source={'home-assistant'}
                        size={28}
                        color={colorPrimary}
                    />
                </TouchableOpacity>
                <Text variant="labelSmall" style={[primaryBold, styles.text]}>Servicios</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.containerBtn}>
                    <Icon 
                        source={'shopping'}
                        size={28}
                        color={colorPrimary}
                    />
                </TouchableOpacity>
                <Text variant="labelSmall" style={[primaryBold, styles.text]}>Transacciones</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.containerBtn}>
                    <Icon 
                        source={'face-agent'}
                        size={28}
                        color={colorPrimary}
                    />
                </TouchableOpacity>
                <Text variant="labelSmall" style={[primaryBold, styles.text]}>SAC</Text>
            </View>
        </View>
    );
}