import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { styles } from "./tabsMenu.styles";
import { router, useSegments } from 'expo-router';
import { Icon, MD3Colors } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import MoreOptions from '@/components/options/moreOptions/moreOptions';

const extra = Constants.expoConfig?.extra || {};
const {colorPrimary, colorSecondary} = extra;

const tabs = [
    { name: 'Home', screen: '/home/', icon: 'home' },
    { name: 'Services', screen: '/home/services/', icon: 'file' },
    { name: 'More', screen: '/home/', icon: 'plus' },
    { name: 'Card', screen: '/home/cards/', icon: 'credit-card' },
    { name: 'Profile', screen: '/home/profile/', icon: 'account' }
];

export default function TabMenu() {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [showOptions, setShowOptions] = useState(false);
  const segments = useSegments();

  useEffect(() => {
    const currentTab = tabs.find(tab => tab.screen === `/${segments.join('/')}/`);

    if (currentTab) {
      setActiveTab(currentTab.name);
    } else if (segments[1] === 'profile'){
      setActiveTab('Profile');
    } else {
      setActiveTab(tabs[0].name);
  }
  }, [segments]);

  const handleTabPress = (tab: { name: any; screen: any; icon?: string; }) => {
      setActiveTab(tab.name);
      if (tab.name !== 'More') {
        router.replace(tab.screen);
      } else {
        setShowOptions(true);
      }
  };

  return (
    <View>
      <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleTabPress(tab)}
          style={activeTab === tab.name ? styles.tabActive : styles.tab}
        >
          <MotiView
            from={{
              scale: 0.9,
              opacity: 0.5,
              backgroundColor: 'transparent',
              marginTop: -30,
            }}
            animate={{
              scale: activeTab === tab.name ? 1 : 0.9,
              opacity: activeTab === tab.name ? 1 : 0.5,
              backgroundColor: 'transparent',
              marginTop: 0,
            }}
            transition={{
              type: 'timing',
              duration: 300
            }}
            style={styles.gradientContainer}
          >
            {activeTab === tab.name ? (
              <LinearGradient
                colors={[colorPrimary, colorSecondary]}
                style={styles.gradient}
              >
                <Icon
                  source={tab.icon}
                  color="#fff"
                  size={30}
                />
              </LinearGradient>
            ) : (
              <Icon
                source={tab.icon}
                color={MD3Colors.neutral50}
                size={30}
              />
            )}
          </MotiView>
        </TouchableOpacity>
      ))}
      </View>
      {showOptions && (
        <MoreOptions 
          onPress={() => setShowOptions(false)}
        />
      )}
    </View>
  );
}