import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import styles from './numericKeyboard.styles'
import { Icon } from 'react-native-paper';
import Constants from 'expo-constants';
import { TouchableHighlight } from 'react-native-gesture-handler';

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;
const { primaryBold, primaryRegular } = extra.text;

interface NumericKeyboardProps {
    onKeyPress: (value: string) => void;
    onDeletePress?: () => void;
    onPress?: () => void;
    onView?: () => void;
}

export default function NumericKeyboard  ({ onKeyPress, onDeletePress, onPress, onView} : NumericKeyboardProps) {
    const [view, setView] = useState(false);
    const imageSource = Platform.OS === 'android' 
    ? require('@/assets/images/general/huella.png') 
    : require('@/assets/images/general/id-facial.png');

    const handleKeyPress = (value: string) => {
        onKeyPress(value);
    };

    const handleChange = () => {
        if (onView) onView();
        setView(!view);
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableHighlight onPress={() => handleKeyPress('1')} style={[styles.button, {paddingHorizontal: Platform.OS === 'android' ? 30 : 28}]} underlayColor={`${colorPrimary}`}>
                    <Text style={{...styles.buttonText, ...primaryBold}}>1</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => handleKeyPress('2')} style={styles.button} underlayColor={`${colorPrimary}`}>
                    <Text style={{...styles.buttonText, ...primaryBold}}>2</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => handleKeyPress('3')} style={styles.button} underlayColor={`${colorPrimary}`}
                    ><Text style={{...styles.buttonText, ...primaryBold}}>3</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.row}>
                <TouchableHighlight onPress={() => handleKeyPress('4')} style={styles.button} underlayColor={`${colorPrimary}`}>
                    <Text style={{...styles.buttonText, ...primaryBold}}>4</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => handleKeyPress('5')} style={styles.button} underlayColor={`${colorPrimary}`}>
                    <Text style={{...styles.buttonText, ...primaryBold}}>5</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => handleKeyPress('6')} style={styles.button} underlayColor={`${colorPrimary}`}>
                    <Text style={{...styles.buttonText, ...primaryBold}}>6</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.row}>
                <TouchableHighlight onPress={() => handleKeyPress('7')} style={styles.button} underlayColor={`${colorPrimary}`}>
                    <Text style={{...styles.buttonText, ...primaryBold}}>7</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => handleKeyPress('8')} style={styles.button} underlayColor={`${colorPrimary}`}>
                    <Text style={{...styles.buttonText, ...primaryBold}}>8</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => handleKeyPress('9')} style={styles.button} underlayColor={`${colorPrimary}`}>
                    <Text style={{...styles.buttonText, ...primaryBold}}>9</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.row}>
                <TouchableOpacity  onPress={handleChange} style={styles.buttonView}>
                    <View>
                        <Icon
                            source={view ? "eye-off" : "eye"}
                            color={colorPrimary}
                            size={30}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableHighlight onPress={() => handleKeyPress('0')} style={styles.button} underlayColor={`${colorPrimary}`}>
                    <Text style={{...styles.buttonText, ...primaryBold}}>0</Text>
                </TouchableHighlight>
                <TouchableOpacity  onPress={onDeletePress} style={styles.buttonDelete}>
                    <View>
                        <Icon
                            source="backspace"
                            color={colorPrimary}
                            size={30}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            {onPress && (
                <TouchableOpacity onPress={onPress} style={styles.containerFeceId}>
                    <View style={styles.row}>
                        <Icon
                            source={imageSource} 
                            color={colorPrimary}      
                            size={32}                 
                        />
                        <Text style={{ ...primaryRegular, color: colorPrimary, marginLeft: 10}}>{Platform.OS === 'android' ? "Ingresa con huella" : "Face ID"}</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};