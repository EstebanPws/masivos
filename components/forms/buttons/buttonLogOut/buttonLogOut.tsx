import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './buttonLogOut.styles';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { Icon } from 'react-native-paper';
import { useAuth } from '@/components/auth/context/authenticationContext';

const extra = Constants.expoConfig?.extra || {};
const {colorPrimary, colorSecondary} = extra;

export default function ButtonLogOut() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleLogout}>
            <LinearGradient
                colors={[colorPrimary, colorSecondary]}
                style={styles.toggleButton}
            >
              <Icon
                source={'logout'}
                size={24}
                color='white'
              />
            </LinearGradient>
        </TouchableOpacity>
    </View>
  );
}
