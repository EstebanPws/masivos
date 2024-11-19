import React from "react";
import { TouchableOpacity, View, Image, Platform} from "react-native";
import { Icon } from "react-native-paper";
import styles from "./headerSecondary.styles";

interface HeaderGeneral {
    type: number;
    onBack?: () => void;
}

export default function HeaderSecondary ({type, onBack} : HeaderGeneral) {
    return (
        <>
            {onBack && (
                <TouchableOpacity onPress={onBack} style={[styles.back, Platform.OS === 'android' ? styles.back : styles.backIos]}>
                    <Icon 
                        source={Platform.OS === 'android' ? 'arrow-left' : 'apple-keyboard-control'}
                        size={25}
                    />
                </TouchableOpacity>
            )}
            {type === 1 ? (
                <View style={styles.center}>
                    <View style={styles.headerRelative}>
                        <Image source={require('../../../assets/images/general/logo.webp')} resizeMode="contain" style={styles.logo} />
                    </View>
                </View>
            ): (
                <View style={styles.header}>
                    <Image source={require('../../../assets/images/general/logo.webp')} resizeMode="contain" style={styles.logo} />
                </View>
            )}
        </>
    )
}