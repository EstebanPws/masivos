import React from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import TabMenu from '@/components/tabs/tabsMenu/tabsMenu';
import { TabProvider } from '@/components/auth/tabsContext/tabsContext';


export default function Layout() {
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
            <TabMenu/>
        </TabProvider>
     );
}