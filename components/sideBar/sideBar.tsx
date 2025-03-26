import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MotiView } from 'moti';
import styles from './sideBar.styles';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { Icon } from 'react-native-paper';
import { router } from 'expo-router';

const extra = Constants.expoConfig?.extra || {};
const {colorPrimary, colorSecondary} = extra;
const {primaryBold, primaryRegular} = extra.text;

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
       <View style={styles.row}>
          <Text variant="titleLarge" style={[styles.slideBarText, primaryBold]}>Menú</Text>
          <TouchableOpacity onPress={toggleSlideBar}>
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
        </View>

        <TouchableOpacity style={{marginTop: 10, height: 100}} onPress={() => router.push('/account')}>
          <View style={styles.rowOption}>
            <Text variant="titleMedium"  style={[primaryRegular]}>Mis cuentas</Text>
            <Icon
              source={'account-convert-outline'}
              size={24}
              color={colorPrimary}
            />
          </View>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}