import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AnimatePresence, MotiView } from 'moti';
import TabMenu from '@/components/tabs/tabsMenu/tabsMenu';
import { TabProvider } from '@/components/auth/tabsContext/tabsContext';

export default function Layout() {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
      <TabProvider>
            <StatusBar style="auto" />
            <Tabs
                screenOptions={{
                    headerShadowVisible: false,
                    headerTransparent: true,
                    headerTintColor: 'transparent',
                    title: '',
                    tabBarStyle: { display: 'none' },
                }}
            >
                <Tabs.Screen name="index" />
            </Tabs>
            <AnimatePresence>
                {!isKeyboardVisible && (
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: 20 }}
                        transition={{ type: 'timing', duration: 300 }}
                        style={{ position: 'relative', bottom: 0, width: '100%' }}
                    >
                        <TabMenu />
                    </MotiView>
                )}
            </AnimatePresence>
        </TabProvider>
     );
}