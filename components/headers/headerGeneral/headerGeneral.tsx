import React from "react";
import { TouchableOpacity, View, Image, Platform} from "react-native";
import { Icon } from "react-native-paper";
import styles from "./headerGeneral.styles";

interface HeaderGeneral {
    onBack: () => void;
}

export default function HeaderGeneral ({onBack} : HeaderGeneral) {
    return (
        <View>
            <TouchableOpacity onPress={onBack} style={[styles.back, Platform.OS === 'android' ? styles.back : styles.backIos]}>
                <Icon 
                    source={Platform.OS === 'android' ? 'arrow-left' : 'apple-keyboard-control'}
                    size={25}
                />
            </TouchableOpacity>
            <View style={styles.row}>
                <View style={styles.headerRelative}>
                    <Image source={require('../../../assets/images/general/logo.webp')} resizeMode="contain" style={styles.logo} />
                </View>
            </View>
        </View>
    )
}