import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styles from './otpInputs.styles';
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;

interface Props extends TextInputProps {
  style?: any;
  focusNextField?: () => void;
  isSecure?: boolean,
  isCode?: boolean
}

const OtpInputs = React.forwardRef<TextInput, Props>(({style, focusNextField, isSecure = false, isCode = false, ...rest }, ref) => {
  const handleChangeText = (text: string) => {
    if (text.length === 1 && focusNextField) {
      focusNextField();
    }
  };

  return (
    <TextInput
      secureTextEntry={isSecure}
      ref={ref}
      style={[(isCode ? styles.code : styles.noCode), styles.input, primaryBold , style]}
      maxLength={1}
      keyboardType="numeric"
      onChangeText={handleChangeText}
      {...rest}
    />
  );
});

export default OtpInputs;