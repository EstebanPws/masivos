import React from "react";
import { Icon, Text } from "react-native-paper";
import styles from "./optionsProfile.styles";
import { TouchableOpacity } from "react-native";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || {};
const {primaryRegular} = extra.text;

interface OptionsProfile {
    title: string,
    onPress: () => void;
}

export default function OptionsProfile({title, onPress}:OptionsProfile) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text variant="labelLarge" style={primaryRegular}>{title}</Text>
            <Icon 
                source={'chevron-right'}
                size={24}
                color="black"
            />
        </TouchableOpacity>
    );
}