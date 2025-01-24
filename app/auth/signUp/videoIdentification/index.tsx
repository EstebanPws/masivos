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
import { stateMessages, documentType } from '@/utils/listUtils';
import Loader from "@/components/loader/loader";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import Constants from "expo-constants";
import axios from "axios";
import ClockAnimation from "@/components/animations/clock/clockLoop";
import instanceWallet from "@/services/instanceWallet";

const extra = Constants.expoConfig?.extra || {};
const { adoUrl, apiKeyAdo, userAdo, idApp } = extra;

//console.log("url ado:", `https://${adoUrl}/validar-persona?callback=https%3A%2F%2FURL_OK&key=${apiKeyAdo}&projectName=${userAdo}&product=1`)
//console.log("url ADO: ", adoUrl)

console.log(apiKeyAdo)

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

    const fetchCreateLog = async (tipoDoc: string, noDoc: string, resp: boolean) => {
        const now = new Date();

        const timeFormatter = new Intl.DateTimeFormat('es-CO', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: 'America/Bogota'
        });

        const time = timeFormatter.format(now);

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timeZone: 'America/Bogota'
        });
        const date = dateFormatter.format(now);

        const body = {
            request: "",
            response: resp ? "Se encotraron datos de la bd MSV" : "No se encontraron datos",
            descripcion_proceso: "Consulta a BD MSV",
            resultado: resp ? "Confirmado" : "Rechazado",
            valor_anterior: 0,
            valor_nuevo: 0,
            hora: time,
            fecha: date,
            tipoDoc: tipoDoc,
            noDocumento: noDoc
        };

        await instanceWallet.post('newLog', body)
    }

    const handleCloseAlert = (type: number) => {
        if (type === 0 || type === 1) {
            type === 0 ? setShowAlert(false) : setShowAlertErrorWebView(false);
            router.back();
        } else {
            if (idStateResponse === 2) {
                const fetchFormData = async () => {
                    const savedData = await getData('registrationForm');
                    if (savedData) {
                        const updatedFormData = { ...savedData, ...formData };
                        await setData('registrationForm', updatedFormData);
                        const typePerson = await getData('typePerson');
                        router.push({
                            pathname: '/auth/signUp/formRegister',
                            params: { type: 8 }
                        });
                    }
                };

                fetchFormData();
            } else {
                router.back();
            }
            setShowAlertMessageResponse(false);
        }
    };

    const handleShouldStartLoadWithRequest = (request: ShouldStartLoadRequest) => {
        if (request.url.startsWith('https://url_ok')) {
            const urlParams = request.url.split('?')[1].replace("_Response=", "");
            if (urlParams) {
                if (!isWaiting) {
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
                        .then(async (response) => {
                            const data = response.data;
                            stateId = parseInt(data.Extras.IdState);

                            const body = {
                                id_validacion: idTransaction,
                                response: data,
                                no_doc: data.IdNumber,
                                idApp: idApp
                            }
                            console.log(idTransaction)

                            if (stateId === 2) {
                                clearInterval(intervalId);
                                const document = documentType[parseInt(data.DocumentType) as keyof typeof documentType];
                                const updatedFormData = {
                                    ...formData,
                                    nombre1: data.FirstName,
                                    nombre2: data.SecondName,
                                    apellido1: data.FirstSurname,
                                    apellido2: data.SecondSurname,
                                    tipo_doc: document,
                                    no_docum: data.IdNumber
                                };
                                setFormData(updatedFormData);
                                setIdStateResponse(stateId);

                                await instanceWallet.post('adotechNew', body);

                                if (stateMessages[stateId as keyof typeof stateMessages]) {
                                    setMessageResponse(stateMessages[stateId as keyof typeof stateMessages]);
                                    setShowAlertMessageResponse(true);
                                }
                            } else if (stateId !== 1) {
                                clearInterval(intervalId);
                                await instanceWallet.post('adotechNew', body);
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
                            if (stateId !== 1) {
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
                <Loader />
            )}

            {isWaiting && (
                <ClockAnimation visible={isWaiting} />
            )}

            <HeaderForm onBack={() => router.back()} />

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
                    mediaPlaybackRequiresUserAction={false}
                    userAgent={Platform.OS === 'android' ? "Mozilla/5.0 (Linux; Android 10; Mobile; rv:79.0) Gecko/79.0 Firefox/79.0" : "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15A372 Safari/604.1"
                    }
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
                    type={idStateResponse === 2 ? "success" : "error"}
                    message={messageResponse!}
                    onPress={() => handleCloseAlert(idStateResponse === 2 ? 2 : 0)}
                />
            )}
        </>
    );
}