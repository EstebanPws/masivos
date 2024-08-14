import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './checkbox.styles';
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;
const { colorPrimary, colorSecondary } = extra;

interface CheckboxCustomProps{
    label?: string;
    isRequired?: boolean;
    options: any;
    onSelect: (value: string) => void;
    selectedValue: string
}

export default function CheckboxCustom({label = '', isRequired = false, options,  onSelect, selectedValue}: CheckboxCustomProps) {
    const [selected, setSelected] = useState(selectedValue);

    const handlePress = (value: string) => {
        setSelected(value);
        onSelect(value);
    };

    return (
        <View style={styles.container}>
            <Text style={{ ...styles.label, ...primaryBold }}>{isRequired ? `${label} *` : label}</Text>
            <View style={styles.section}>
                {options.map((option: { value: string; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                    <TouchableOpacity key={index} onPress={() => handlePress(option.value)}>
                        {selected === option.value ? (
                            <LinearGradient
                                colors={[colorPrimary, colorSecondary]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradientContainer}
                            >
                                <Text style={[options.length === 4 ? styles.paragraphSmall : styles.paragraph, primaryBold]}>{option.label}</Text>
                            </LinearGradient>
                        ) : (
                            <View style={styles.greyContainer}>
                                <Text style={[options.length === 4 ? styles.paragraphSmall : styles.paragraph, primaryBold]}>{option.label}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}