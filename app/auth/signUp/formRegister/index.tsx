import React from "react";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import ViewFadeIn from "@/components/viewFadeIn";
import { Platform, ScrollView, View} from "react-native";
import { Text } from "react-native-paper";
import BasicInfo from '@/components/forms/register/basicInfo/basicInfo'
import { router } from "expo-router";
import { styles } from "./formRegister.styles";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;

export default function Page(){
    const handleFormSubmit = (data: any) => {
        console.log('Formulario enviado con los datos:', data);
    };

    return (
        <>
            <HeaderForm title="Registro" onBack={() => router.back()} />
            <ViewFadeIn isWidthFull={true}>
                <View style={styles.ph2}>
                    <Text variant="titleMedium" style={{...primaryBold, ...styles.text}}>PERSONA NATURAL</Text>
                    <View style={styles.line}/>
                </View>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.container}
                    enableOnAndroid={true}
                    extraHeight={Platform.select({ ios: 100, android: 120 })}
                >
                    <ScrollView >
                        <BasicInfo onSubmit={handleFormSubmit}/>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </ViewFadeIn>
        </>
    )
}