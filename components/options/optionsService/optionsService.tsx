import React from "react";
import { TouchableOpacity, View, Image, GestureResponderEvent } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./optionsService.styles";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;

interface Option {
  onPress: (event: GestureResponderEvent) => void;
  icon: string;
  name: string;
}

interface OptionsServiceProps {
  options: Option[];
}

export default function OptionsService({ options }: OptionsServiceProps) {
  const rows = [];

  for (let i = 0; i < options.length; i += 3) {
    rows.push(options.slice(i, i + 3));
  }

  return (
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
                <Text variant="labelSmall" style={[primaryBold, styles.text]}>
                    {option.name}
                </Text>
                </View>
            ))}
            </View>
        ))}
    </View>
  );
}
