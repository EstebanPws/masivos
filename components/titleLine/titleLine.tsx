import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './titleLine.styles';
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;

interface TitleLineProps{
    label: string;
}

export default function TitleLine({label}: TitleLineProps) {

    return (
        <View style={styles.container}>
            <Text style={{ ...styles.label, ...primaryBold }}>{label}</Text>
            <View style={styles.line}/>
        </View>
    );
}