import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { styles } from './sideBar.styles';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { Icon } from 'react-native-paper';

const extra = Constants.expoConfig?.extra || {};
const {colorPrimary, colorSecondary} = extra;
const {primaryBold} = extra.text;

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSlideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={toggleSlideBar}>
            <LinearGradient
                colors={[colorPrimary, colorSecondary]}
                style={styles.toggleButton}
            >
              <Icon
                source={'menu'}
                size={24}
                color='white'
              />
            </LinearGradient>
        </TouchableOpacity>
      <MotiView
        from={{
          translateX: isOpen ? -300 : 0,
        }}
        animate={{
          translateX: isOpen ? 0 : -300,
        }}
        transition={{
          type: 'timing',
          duration: 300,
        }}
        style={styles.slideBar}
      >
        <TouchableOpacity onPress={toggleSlideBar} style={styles.buttonClose}>
            <LinearGradient
                colors={[colorPrimary, colorSecondary]}
                style={styles.toggleButtonClose}
            >
              <Icon
                source={'close'}
                size={24}
                color='white'
              />
            </LinearGradient>
        </TouchableOpacity>
        <Text style={[styles.slideBarText, primaryBold]}>Nuevas opciones</Text>
      </MotiView>
    </View>
  );
}
