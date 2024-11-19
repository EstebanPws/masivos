import React, { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { Camera } from "expo-camera";
import styles from "./videoIdentifications.styles";
import { MotiView } from "moti";
import WebView from "react-native-webview";
import InfoModal from "@/components/modals/infoModal/infoModal";
import { ShouldStartLoadRequest, WebViewErrorEvent, WebViewProgressEvent } from "react-native-webview/lib/WebViewTypes";
import { setData, getData } from "@/utils/storageUtils";
import { stateMessages , documentType } from '@/utils/listUtils';
import Loader from "@/components/loader/loader";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import Constants from "expo-constants";
import axios from "axios";
import ClockAnimation from "@/components/animations/clock/clockLoop";

const extra = Constants.expoConfig?.extra || {};
const {adoUrl, apiKeyAdo, userAdo} = extra;

export default function Page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [locationPermission, setLocationPermission] = useState<any>();
    const [cameraPermission, setCameraPermission] = useState<any>();
    const [showAlert, setShowAlert] = useState(false);
    const [showAlerErrorWebView, setShowAlertErrorWebView] = useState(false);
    const [messageErrorWebView, setMessageErrorWebView] = useState('');
    const [showAlertMessageResponse, setShowAlertMessageResponse] = useState(false);
    const [messageResponse, setMessageResponse] = useState<string | null>();
    const [idStateResponse, setIdStateResponse] = useState<number | null>();
    const [isWaiting, setIsWaiting] = useState(false);
    const [formData, setFormData] = useState({
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        tipo_doc: '',
        no_docum: ''
    });

    const customJavaScript = `
        let spinner = document.querySelector('.spinner');
        let button = document.getElementById('btn-take-selfie-validation');

        if (button) {
            button.disabled = false;
        } 

        setInterval(() => {
            if (spinner) {
                spinner.style.display = 'none';
            }
        } 15000);
    `;

    useEffect(() => {
        const checkPermissions = async () => {
            try {
                const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
                setLocationPermission(locationStatus);
                if (locationStatus !== "granted") {
                    setShowAlert(true);
                    return;
                }

                const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
                setCameraPermission(cameraStatus);
                if (cameraStatus !== "granted") {
                    setShowAlert(true);
                    return;
                }
            } catch (error) {
                setLocationPermission("denied");
                setCameraPermission("denied");
            }
        };

        checkPermissions();
    }, []);

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
                      const updatedFormData = { ...savedData, ...formData };
                      await setData('registrationForm', updatedFormData);   
                      router.push('/auth/signUp/selectTypeAccount');
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
            if (urlParams) {
                if(!isWaiting){
                    setIsWaiting(true);
                }
               
                const jsonObject = JSON.parse(decodeURIComponent(urlParams));    
                const idTransaction = jsonObject.TransactionId;
    
                const intervalId = setInterval(() => {
                    let stateId = 1;
                    axios.get(`https://${adoUrl}/api/${userAdo}/Validation/${idTransaction}`, {
                        headers: {
                            'accept': 'application/json',
                            'apiKey': apiKeyAdo,
                            'returnDocuments': 'false',
                            'returnVideoLiveness': 'false'
                        },
                        params: {
                            returnImages: 'false'
                        }
                    })
                    .then((response) => {
                        const data = response.data;        
                        stateId = parseInt(data.Extras.IdState);

                        if (stateId === 2) {
                            clearInterval(intervalId);
                            const document = documentType[parseInt(data.DocumentType) as keyof typeof documentType];
                            const updatedFormData = { 
                                ...formData, 
                                nombre1: data.FirstName, 
                                nombre2: data.SecondName, 
                                apellido1: data.FirstSurname, 
                                apellido2: data.SecondSurname, 
                                tipo_doc: document ,
                                no_docum: data.IdNumber
                            };
                            setFormData(updatedFormData);
                            setIdStateResponse(stateId);
    
                            if (stateMessages[stateId as keyof typeof stateMessages]) {
                                setMessageResponse(stateMessages[stateId as keyof typeof stateMessages]);
                                setShowAlertMessageResponse(true);
                            }
                        } else {
                            if (stateMessages[stateId as keyof typeof stateMessages]) {
                                setMessageResponse(stateMessages[stateId as keyof typeof stateMessages]);
                                setShowAlertMessageResponse(true);
                            }
                        }
                    })
                    .catch((error) => {
                        setMessageResponse('Hubo un error al intentar consultar el estado de la operación.');
                        setShowAlertMessageResponse(true);
                    })
                    .finally(() => {
                        if(stateId !== 1){
                            setIsWaiting(false);
                        }
                    });
                }, 15000);
            }
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

            {isWaiting && (
                <ClockAnimation visible={isWaiting}/>
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
                    source={{ uri: `https://${adoUrl}/validar-persona?callback=https%3A%2F%2FURL_OK&key=${apiKeyAdo}&projectName=${userAdo}&product=1` }}
                    injectedJavaScript={customJavaScript}
                    onLoadProgress={(nativeEvent) => handleLoadProgress(nativeEvent)}
                    onShouldStartLoadWithRequest={(request) => handleShouldStartLoadWithRequest(request)}
                    onError={(syntheticEvent) => handleError(syntheticEvent)}
                    onSslError={(event: { preventDefault: () => void; }) => handleSslError(event)}
                />
            </MotiView>
            {(locationPermission !== 'granted' || cameraPermission !== 'granted') && showAlert && (
                <InfoModal
                    isVisible={showAlert}
                    type="info"
                    message={`La aplicación necesita permisos de ubicación y cámara para funcionar correctamente.`}
                    onPress={() => handleCloseAlert(0)}
                />
            )}
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