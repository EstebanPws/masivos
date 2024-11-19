import React from "react";
import { Image} from "react-native";
import { Appbar } from "react-native-paper";
import styles from "./headerForm.styles";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || {};
const {primaryBold} = extra.text;
const {colorPrimary, colorSecondary} = extra;

interface HeaderForm {
    title?: string;
    isBorder?: boolean;
    onBack: () => void;
}

export default function HeaderForm ({title = "", isBorder = true ,onBack} : HeaderForm) {
    return (
        <LinearGradient
            colors={[colorPrimary, colorSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={isBorder ? styles.header : styles.headerNotBorder}
        >
            <Appbar.Header style={styles.appbarHeader}>
                <Appbar.BackAction onPress={onBack} size={30} color="#fff"/>
                <Appbar.Content titleStyle={{...primaryBold, ...styles.text}}  color="#fff" title={title} />
                <Appbar.Action 
                    icon={() => (
                        <Image 
                            source={require('@/assets/images/general/icon.webp')}
                            style={{ width: 28, height: 28 }}
                        />
                    )}  
                />
            </Appbar.Header>
        </LinearGradient>
    )
}