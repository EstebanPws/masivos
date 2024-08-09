import React from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AuthenticationProvider from '@/components/auth/context/authenticationContext';
import TabMenu from '@/components/tabs/tabsMenu/tabsMenu';


export default function Layout() {
    return (
      <AuthenticationProvider>
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
            <TabMenu/>
        </AuthenticationProvider>
     );
}