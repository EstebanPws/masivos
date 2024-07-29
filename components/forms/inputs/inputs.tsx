import React, { Dispatch, SetStateAction, useState }  from 'react';
import { MotiView } from 'moti';
import { View, Text} from 'react-native';
import { MD2Colors, TextInput } from 'react-native-paper';
import { styles } from './inputs.styles';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import Constants from "expo-constants";
import { formatCurrency } from '@/utils/validationForms';

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;
const { primaryBold } = extra.text;

interface InputsProps {
  icon?: IconSource;
  label?: string;
  isSecureText : boolean;
  isRequired: boolean;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  iconColor?: string;
  flag?: any;
  isTextArea?: boolean;
  onChangeText?: Dispatch<SetStateAction<string>>;
  value: string;
  maxLength?: number;
  isCurrency?: boolean,
}

export default function Inputs ({icon = '' , label, isSecureText = false, isRequired = false, placeholder, keyboardType = 'default', iconColor, flag, isTextArea = false, onChangeText, value,  maxLength, isCurrency = false,} : InputsProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = (text: string) => {
    if (isCurrency) {
      const formattedValue = formatCurrency(text);
      onChangeText?.(formattedValue);
    } else {
      onChangeText?.(text);
    }
  };

  return (
    <View>
      <Text style={[primaryBold, isFocused ? styles.labelActive : styles.label]}>{isRequired ? `${label} *` : label}</Text>
      <MotiView
        from={{
            borderColor: `${MD2Colors.grey500}`,
            borderWidth: 1,
            scale: 1,
        }}
        animate={{
            borderColor: isFocused ? `${colorPrimary}` : `${MD2Colors.grey500}`,
            borderWidth: 1.5,
            borderRadius: 20,
        }}
        transition={{
            type: 'timing',
            duration: 300,
        }}
        style={styles.inputCustom}
      > 
      {icon !== '' ? (
        <TextInput
          mode='outlined'
          outlineColor='transparent'
          outlineStyle={styles.outlined}
          keyboardType={keyboardType}
          placeholder={placeholder}
          secureTextEntry={isSecureText}
          left={
            <TextInput.Icon icon={icon} color={iconColor} />
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[flag , styles.inputCustom]}
          activeUnderlineColor="transparent" 
          underlineColor="transparent"
          cursorColor={isFocused ? `${colorPrimary}` : 'transparent'}
          multiline={isTextArea}
          numberOfLines={4}
          onChangeText={handleChangeText}
          value={value}
          maxLength={maxLength}
        />
      ) : (
        <TextInput
          mode='outlined'
          outlineColor='transparent'
          outlineStyle={styles.outlined}
          keyboardType={keyboardType}
          placeholder={placeholder}
          secureTextEntry={isSecureText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[flag , styles.inputCustom]}
          activeUnderlineColor="transparent" 
          underlineColor="transparent"
          cursorColor={isFocused ? `${colorPrimary}` : 'transparent'}
          multiline={isTextArea}
          numberOfLines={4}
          onChangeText={handleChangeText}
          value={value}
          maxLength={maxLength}
        />
      )}
      </MotiView>
    </View>
  );
}