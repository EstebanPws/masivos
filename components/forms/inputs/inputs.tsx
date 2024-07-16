import React, { useState }  from 'react';
import { MotiView } from 'moti';
import { View, Text} from 'react-native';
import { TextInput } from 'react-native-paper';
import { styles } from './inputs.styles';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import Constants from "expo-constants";

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
}

export default  function Inputs ({icon = '' , label, isSecureText = false, isRequired = false, placeholder, keyboardType = 'default', iconColor, flag, isTextArea = false} : InputsProps) {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <Text style={[primaryBold, isFocused ? styles.labelActive : styles.label]}>{isRequired ? `${label} *` : label}</Text>
      <MotiView
        from={{
            borderColor: '#949494',
            borderWidth: 1,
            scale: 1,
        }}
        animate={{
            borderColor: isFocused ? `${colorPrimary}` : '#949494',
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
        />
      ) : (
        <TextInput
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
        />
       
      )}
      </MotiView>

    </View>
)};