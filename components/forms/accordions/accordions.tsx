import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import styles from './accordions.styles';
import { MotiText, MotiView } from 'moti';
import { Icon } from 'react-native-paper';

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary, colorSecondary } = extra;
const {primaryBold } = extra.text;

interface AccordionsProps {
  title: string;
  children: React.ReactNode;
}

export default function Accordions({title, children} : AccordionsProps) {
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colorPrimary, colorSecondary]}
        style={styles.header}
      >
        <TouchableOpacity onPress={handlePress} style={styles.headerContent}>
          <MotiText style={[styles.title, primaryBold]}>{title}</MotiText>
          <MotiView
            from={{ rotate: expanded ? '0deg' : '180deg' }}
            animate={{ rotate: expanded ? '180deg' : '0deg' }}
            transition={{ type: 'timing', duration: 300 }}
          >
            <Icon source="menu-down" size={24} color="#fff" />
          </MotiView>
        </TouchableOpacity>
      </LinearGradient>
      {expanded && 
        <View style={styles.content}>
            <ScrollView>
                {children}
            </ScrollView>
        </View>}
    </View>
  );
};
