import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { styles } from './numericKeyboard.styles'
import { Icon } from 'react-native-paper';
import Constants from 'expo-constants';
import { TouchableHighlight } from 'react-native-gesture-handler';

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;
const { primaryBold } = extra.text;

interface NumericKeyboardProps {
    onKeyPress: (value: string) => void;
    onDeletePress: () => void;
    onPress: () => void;
}

export default function NumericKeyboard  ({ onKeyPress, onDeletePress, onPress} : NumericKeyboardProps) {
    const handleKeyPress = (value: string) => {
        onKeyPress(value);
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
            <TouchableOpacity onPress={onPress} style={styles.containerFeceId}>
                <View style={styles.row}>
                    <View style={styles.faceIcon}>
                        <Icon
                            source="account"
                            color={colorPrimary}
                            size={20}
                        />
                    </View>
                    <Text style={{ ...primaryBold, color: colorPrimary }}>Face ID</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};