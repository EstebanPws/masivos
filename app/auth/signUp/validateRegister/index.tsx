import React, { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "./validateRegister.styles";
import { MotiView } from "moti";
import WebView from "react-native-webview";
import { ShouldStartLoadRequest, WebViewErrorEvent, WebViewProgressEvent } from "react-native-webview/lib/WebViewTypes";
import Loader from "@/components/loader/loader";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import * as FileSystem from 'expo-file-system'; 
import * as Sharing from 'expo-sharing';

export default function Page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { type, idRegister } = useLocalSearchParams();
    const [urlPdf, setUrlPdf] = useState();

    useEffect(() => {
        const url = `https://registrobilletera.paymentsway.co/${type === '0' ? 'vinculacionpersonanatural' : 'vinculacionpersonajuridica'}?id=${idRegister}`;
       console.log(url);
       
    }, []);

    const handleDownloadPDF = async (blobUrl: string) => {
        try {
            const response = await fetch(blobUrl);
            const blob = await response.blob();
            const fileReader = new FileReader();
            fileReader.onloadend = async () => {
                
                const base64data = fileReader.result as string;
                const base64DataOnly = base64data.split(',')[1];
                const fileName = 'formulario-coop.pdf';
                const downloadDest = FileSystem.documentDirectory + fileName;

                console.log(downloadDest);
                
    
                await FileSystem.writeAsStringAsync(downloadDest, base64DataOnly, { encoding: FileSystem.EncodingType.Base64 });

                // Usa el módulo Sharing para permitir al usuario compartir el archivo
                if (await Sharing.isAvailableAsync()) {
                    await Sharing.shareAsync(downloadDest, { mimeType: 'application/pdf' });
                } else {
                    Alert.alert("Share Unavailable", "Sharing is not available on this device.");
                }
            };
            fileReader.readAsDataURL(blob);
        } catch (error) {
            Alert.alert("Download Failed", `Error: ${error}`);
        }
    };

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

    const handleOnNavigationStateChange = async (navState: { url: any; }) => {
        const currentUrl = navState.url;
        // Usamos la API URL para extraer los parámetros
        const url = new URL(currentUrl);
        const success = url.searchParams.get('success');
        const pdf = url.searchParams.get('pdf');

        if (success) {
            router.push('/');
        }

        if(pdf){
            const url = pdf.replaceAll('blob:', '');
            await handleDownloadPDF(url);
        }  
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
                    onNavigationStateChange={handleOnNavigationStateChange}
                />
            </MotiView>
        </>
    );
}