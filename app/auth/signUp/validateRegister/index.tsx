import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "./validateRegister.styles";
import { MotiView } from "moti";
import WebView from "react-native-webview";
import { ShouldStartLoadRequest, WebViewErrorEvent, WebViewProgressEvent } from "react-native-webview/lib/WebViewTypes";
import Loader from "@/components/loader/loader";
import HeaderForm from "@/components/headers/headerForm/headerForm";

export default function Page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { type, idRegister } = useLocalSearchParams();

    useEffect(() => {
        const url = `https://registrobilletera.paymentsway.co/${type === '0' ? 'vinculacionpersonanatural' : 'vinculacionpersonajuridica'}?id=${idRegister}`;
       console.log(url);
       
    }, []);

    const handleShouldStartLoadWithRequest = (request: ShouldStartLoadRequest) => { 
        if (request.url.split('?')) {
            const urlParams = request.url.split('?')[1];
            console.log(urlParams);
            
            if(urlParams) {
                if(urlParams.startsWith('success')){
                    router.push('/');
                }
            }
        }
        return true;
    };

    const handleError = (syntheticEvent: WebViewErrorEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.log(nativeEvent);
    };

    const handleSslError = (event: { preventDefault: any; }) => {
        Alert.alert(
            'SSL Certificate Error',
            'An SSL error occurred. Do you want to continue anyway?',
            [
                { text: 'Cancel', onPress: () => event.preventDefault(), style: 'cancel' },
                { text: 'Continue', onPress: () => event.preventDefault() },
            ],
            { cancelable: false }
        );
    };

    const handleLoadProgress = (nativeEvent: WebViewProgressEvent) => { 
        if (nativeEvent.nativeEvent.progress === 1) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    };

    return (
        <>
            {isLoading && (
                <Loader/>
            )}
            <HeaderForm onBack={() => router.back()}/>
            
            <MotiView
                from={{ opacity: 0, translateY: -50 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 500 }}
                style={styles.container}
            >
                <WebView
                    javaScriptEnabled={true}
                    cacheEnabled={false}
                    allowFileAccess={true}
                    javaScriptCanOpenWindowsAutomatically={true}
                    domStorageEnabled={true}
                    allowFileAccessFromFileURLs={true}
                    allowUniversalAccessFromFileURLs={true}
                    allowsInlineMediaPlayback={true}
                    originWhitelist={['*']}
                    mixedContentMode="always"
                    geolocationEnabled={true}
                    userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
                    source={{ uri: `https://registrobilletera.paymentsway.co/${type === '0' ? 'vinculacionpersonanatural' : 'vinculacionpersonajuridica'}?id=${idRegister}` }}
                    onLoadProgress={(nativeEvent) => handleLoadProgress(nativeEvent)}
                    onShouldStartLoadWithRequest={(request) => handleShouldStartLoadWithRequest(request)}
                    onError={(syntheticEvent) => handleError(syntheticEvent)}
                    onSslError={(event: { preventDefault: () => void; }) => handleSslError(event)}
                />
            </MotiView>
        </>
    );
}