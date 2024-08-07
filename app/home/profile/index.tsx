import React from "react";
import { View } from "moti";
import { Text } from "react-native-paper";
import { styles } from "./profile.styles";

export default function Page() {  
  return (
    <View style={styles.container}>
      <Text>Hola profile</Text>
    </View>
  );
}