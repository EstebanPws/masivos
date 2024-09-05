import React from "react";
import { TouchableOpacity, View, Image, GestureResponderEvent } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./optionsService.styles";
import Constants from "expo-constants";
import { formatCurrency } from "@/utils/validationForms";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;
const { colorPrimary} = extra;

interface Option {
  onPress: (event: GestureResponderEvent) => void;
  icon: string;
  name: string;
  amount?: number;
}

interface OptionsServiceProps {
  options: Option[];
  isPackage?: boolean;
  isInvoice?:boolean;
}

export default function OptionsService({isPackage = false, options, isInvoice = false }: OptionsServiceProps) {
  const rows = [];

  for (let i = 0; i < options.length; i += 3) {
    rows.push(options.slice(i, i + 3));
  }

  return (
    <>
      {(!isPackage && !isInvoice) && (
        <View>
          {rows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
              {row.map((option, index) => (
                  <View key={index}>
                    <TouchableOpacity style={styles.containerBtn} onPress={option.onPress}>
                        <Image
                        source={{ uri: option.icon }}
                        style={{ width: 28, height: 28 }}
                        resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text numberOfLines={1} ellipsizeMode='tail' variant="labelSmall" style={[primaryBold, styles.text]}>
                        {option.name}
                    </Text>
                  </View>
              ))}
              </View>
          ))}
        </View>
      )}

      {isPackage && (
        <View>
          {options.map((option, index) => (
            <View key={index}>
              <TouchableOpacity style={[styles.containerBtnPackage, styles.rowPackage]} onPress={option.onPress}>
                  <Image
                    source={{ uri: option.icon }}
                    style={{ width: 28, height: 28 }}
                    resizeMode="contain"
                  />
                  <Text numberOfLines={10} variant="labelSmall" style={[primaryBold, styles.textPackage]}>
                    {option.name}  {'\n\n'} <Text variant="labelMedium" style={[primaryBold, styles.textPackage, {color: colorPrimary}]}>{formatCurrency(option.amount)} COP</Text>
                  </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {isInvoice && (
        <View>
          {options.map((option, index) => (
            <View key={index}>
              <TouchableOpacity style={[styles.containerBtnPackage, styles.rowPackage]} onPress={option.onPress}>
                  <Image
                    source={{ uri: option.icon }}
                    style={{ width: 28, height: 28 }}
                    resizeMode="contain"
                  />
                  <Text numberOfLines={10} variant="labelSmall" style={[primaryBold, styles.textPackage]}>
                    {option.name}
                  </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </>
  );
}
