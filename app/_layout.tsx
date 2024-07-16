import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [loaded, error] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold
      });
    
      useEffect(() => {
        if (loaded || error) {
          SplashScreen.hideAsync();
        }
      }, [loaded, error]);
    
      if (!loaded && !error) {
        return null;
      }

    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerBackVisible: false,
                headerTransparent: true,
                headerTintColor: 'transparent',
                title: ''
            }}
        >
            <Stack.Screen name="index"/>
        </Stack>
     );
}