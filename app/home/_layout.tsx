import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AuthenticationProvider from '@/components/auth/context/authenticationContext';
import TabMenu from '@/components/tabs/tabsMenu/tabsMenu';


export default function Layout() {
    return (
      <AuthenticationProvider>
            <StatusBar style="auto" />
            <Stack
                screenOptions={{
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerTransparent: true,
                    headerTintColor: 'transparent',
                    title: ''
                }}
            >
                <Stack.Screen name="index" />
            </Stack>
            <TabMenu/>
        </AuthenticationProvider>
     );
}