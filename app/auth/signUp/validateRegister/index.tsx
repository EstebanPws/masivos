import React, { useState } from "react";
import { Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "./validateRegister.styles";
import { MotiView } from "moti";
import WebView from "react-native-webview";
import InfoModal from "@/components/modals/infoModal/infoModal";
import { ShouldStartLoadRequest, WebViewErrorEvent, WebViewProgressEvent } from "react-native-webview/lib/WebViewTypes";
import { setData, getData } from "@/utils/storageUtils";
import Loader from "@/components/loader/loader";
import HeaderForm from "@/components/headers/headerForm/headerForm";

export default function Page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlerErrorWebView, setShowAlertErrorWebView] = useState(false);
    const [messageErrorWebView, setMessageErrorWebView] = useState('');
    const [showAlertMessageResponse, setShowAlertMessageResponse] = useState(false);
    const [messageResponse, setMessageResponse] = useState<string | null>();
    const [idStateResponse, setIdStateResponse] = useState<number | null>();
    const { type, idRegister } = useLocalSearchParams();

    const handleCloseAlert = (type: number) => {
        if(type === 0 || type === 1){
            type === 0 ? setShowAlert(false) : setShowAlertErrorWebView(false) ;
            router.back();
        } else {
            setShowAlertMessageResponse(false);
            if(idStateResponse === 2 || idStateResponse === 1){
                const fetchFormData = async () => {
                    const savedData = await getData('registrationForm');
                    if (savedData) {
                      const updatedFormData = { ...savedData};
                      await setData('registrationForm', updatedFormData);   
                      router.push('auth/signUp/selectTypeAccount/');
                    }
                };
            
                fetchFormData();
            } else {
                router.back();
            }
        }
    };

    const handleShouldStartLoadWithRequest = (request: ShouldStartLoadRequest) => { 
        if (request.url.startsWith('https://url_ok')) {
            const urlParams = request.url.split('?')[1].replace("_Response=", "");
            console.log(urlParams);
            
            return false;
        }
        return true;
    };

    const handleError = (syntheticEvent: WebViewErrorEvent) => {
        const { nativeEvent } = syntheticEvent;
        setMessageErrorWebView(nativeEvent.description);
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
            {showAlerErrorWebView && (
                <InfoModal
                    isVisible={showAlerErrorWebView}
                    type="info"
                    message={messageErrorWebView}
                    onPress={() => handleCloseAlert(1)}
                />
            )}
            {showAlertMessageResponse && (
                <InfoModal
                    isVisible={showAlertMessageResponse}
                    type={idStateResponse === 2 || idStateResponse === 1 ? "success" : "error"}
                    message={messageResponse!}
                    onPress={() => handleCloseAlert(2)}
                />
            )}
        </>
    );
}