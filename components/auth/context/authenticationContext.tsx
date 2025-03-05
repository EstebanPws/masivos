import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import InfoModal from '@/components/modals/infoModal/infoModal';
import { router } from 'expo-router';
import instanceWallet from '@/services/instanceWallet';
import Loader from '@/components/loader/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OtpValidationRegisterModal from '@/components/modals/otpValidationRegisterModal/otpValidationRegisterModal';
import { getSessionToken, setData, setSessionToken } from '@/utils/storageUtils';
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra || {};
const { idApp } = extra;

interface AuthContextType {
    isAuthenticated: boolean;
    authenticate: (docWithOtp: string, password: string) => Promise<void>;
    authenticateWithoutFaceId: (docWithOtp: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    documentNumber: string | null;
    password: string | null;
    modalidad: string | null;
    activeLoader: () => void;
    desactiveLoader: () => void;
}

interface AuthContextProps {
    children: ReactNode;
}

const AuthenticationContext = createContext<AuthContextType>({
    isAuthenticated: false,
    authenticate: async () => { },
    authenticateWithoutFaceId: async () => { },
    logout: async () => { },
    documentNumber: null,
    password: null,
    modalidad: null,
    activeLoader: () => { },
    desactiveLoader: () => { }
})

export const useAuth = () => useContext(AuthenticationContext);

export default function AuthenticationProvider({ children }: AuthContextProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [documentNumber, setDocumentNumber] = useState<string | null>(null);
    const [modalidad, setModalidad] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [showOtpValidation, setShowOtpValidation] = useState(false);
    const [typeResponse, setTypeResponse] = useState<"info" | "success" | 'error'>('error');
    const [message, setMessage] = useState("Hubo un error al intentar autenticarse, por favor inténtalo de nuevo.");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        SecureStore.getItemAsync('documentNumber').then((docNumber) => {
            if (docNumber) {
                setDocumentNumber(docNumber);
            }
        });

        SecureStore.getItemAsync('password').then((storedPassword) => {
            if (storedPassword) {
                setPassword(storedPassword);
            }
        });
    }, []);

    const authenticate = async (docWithOtp: string, password: string) => {
        const body = {
            no_docum: docWithOtp,
            contrasena: password,
            idApp: idApp
        };

        setIsLoading(true);
        await instanceWallet.post('LoginCliente', body)
            .then(async (response) => {
                const data = response.data;
                await AsyncStorage.removeItem('session_token');
                await AsyncStorage.removeItem('number_account');
                await AsyncStorage.removeItem('balance');
                await AsyncStorage.removeItem('infoClient');
                await AsyncStorage.removeItem('lastLogin');
                await AsyncStorage.removeItem('listBanks');
                if (!data.message.includes('no tiene')) {
                    const result = await LocalAuthentication.authenticateAsync({
                        promptMessage: 'Validando...',
                    });

                    if (result.success) {
                        await SecureStore.setItemAsync('documentNumber', docWithOtp);
                        await SecureStore.setItemAsync('password', password);
                        setDocumentNumber(docWithOtp);
                        setPassword(password);
                        if (data.message.startsWith('ey')) {
                            await setData('lastLogin', data.data.lastLogin);
                            setSessionToken(data.message);
                            setModalidad(data.data.modalidad);
                            data.data.modalidad === '0' ? router.replace('/account') : router.replace('/home');
                        } else {
                            setShowOtpValidation(true);
                        }
                        setIsAuthenticated(true);
                    } else {
                        setMessage('Usuario o contraseña incorrectos.');
                        setShowErrorModal(true);
                    }
                } else {
                    setMessage('El usuario no se encuntra registrado en nuestro sistema.');
                    setShowErrorModal(true);
                }
            })
            .catch((err) => {
                if (err && err.response.message) {
                    setMessage(err.response.data.message);
                } else {
                    setMessage("Hubo un error al intentar autenticarse.");
                }
                setShowErrorModal(true);
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const authenticateWithoutFaceId = async (docWithOtp: string, password: string) => {

        const body = {
            no_docum: docWithOtp,
            contrasena: password,
            idApp: idApp
        };

        setIsLoading(true);
        await instanceWallet.post('LoginCliente', body)
            .then(async (response) => {
                const data = response.data;
                await AsyncStorage.removeItem('session_token');
                await AsyncStorage.removeItem('number_account');
                await AsyncStorage.removeItem('balance');
                await AsyncStorage.removeItem('infoClient');
                await AsyncStorage.removeItem('lastLogin');
                await AsyncStorage.removeItem('listBanks');
                if (!data.message.includes('no tiene')) {
                    setIsAuthenticated(true);
                    setDocumentNumber(docWithOtp);
                    if (data.message.startsWith('ey')) {
                        await setData('lastLogin', data.data.lastLogin);
                        setSessionToken(data.message);
                        setModalidad(data.data.modalidad);
                        data.data.modalidad === '0' ? router.replace('/account') : router.replace('/home');
                    } else {
                        setShowOtpValidation(true);
                    }
                } else {
                    setMessage('El usuario no se encuntra registrado en nuestro sistema.');
                    setShowErrorModal(true);
                }
            })
            .catch((err) => {
                if (err && err.response.data) {
                    setMessage(err.response.data.message);
                } else {
                    setMessage("Hubo un error al intentar autenticarse.");
                }
                setShowErrorModal(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const fetchSessionToken = async () => {
        const token = await getSessionToken();
        const body = {
            token: token,
            no_docum: documentNumber
        }

        await instanceWallet.post('time', body)
            .then((response) => {
                if (response.data.status = 200) {
                    return 'ok';
                }
            })
            .catch((error) => {
                console.log(error);
                return 'no save';
            })
    }

    const logout = async () => {
        await fetchSessionToken();
        await AsyncStorage.removeItem('session_token');
        await AsyncStorage.removeItem('number_account');
        await AsyncStorage.removeItem('balance');
        await AsyncStorage.removeItem('infoClient');
        await AsyncStorage.removeItem('lastLogin');
        await AsyncStorage.removeItem('listBanks');
        setIsAuthenticated(false);
        setModalidad(null);
        if (router.canGoBack()) {
            router.dismissAll();
        }
        router.replace('/');
    };

    const handleLoaderActive = () => {
        setIsLoading(true);
    }

    const handleLoaderDesactive = () => {
        setIsLoading(false);
    }

    const handleOtpValidationResponse = (message: string, type: "info" | "success" | "error") => {
        setMessage(message);
        setTypeResponse(type);
        setShowErrorModal(true);
    };

    const handleOnFinish = (modalidad?: string) => {
        setModalidad(modalidad!);
        setShowOtpValidation(false);
        modalidad === '0' ? router.replace('/account') : router.replace('/home');
    }

    return (
        <>
            <AuthenticationContext.Provider value={{ isAuthenticated, authenticate, authenticateWithoutFaceId, logout, documentNumber, password, modalidad, activeLoader: handleLoaderActive, desactiveLoader: handleLoaderDesactive }}>
                {children}
            </AuthenticationContext.Provider>
            {showOtpValidation && (
                <OtpValidationRegisterModal
                    type={0}
                    numberDocument={documentNumber!}
                    onClose={handleOtpValidationResponse}
                    onView={() => setShowOtpValidation(false)}
                    onFinish={handleOnFinish}
                />
            )}
            {showErrorModal && (
                <InfoModal
                    isVisible={showErrorModal}
                    type={typeResponse}
                    message={message}
                    onPress={() => setShowErrorModal(false)}
                />
            )}
            {isLoading && (
                <Loader />
            )}
        </>
    );
};