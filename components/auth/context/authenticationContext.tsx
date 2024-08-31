import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import InfoModal from '@/components/modals/infoModal/infoModal';
import { router } from 'expo-router';
import instanceWallet from '@/services/instanceWallet';
import Loader from '@/components/loader/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OtpValidationRegisterModal from '@/components/modals/otpValidationRegisterModal/otpValidationRegisterModal';
import { setSessionToken } from '@/utils/storageUtils';

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
    authenticate: async () => {},
    authenticateWithoutFaceId: async () => {},
    logout: async () => {},
    documentNumber: null,
    password: null,
    modalidad: null,
    activeLoader: () => {},
    desactiveLoader: () => {}
});

export const useAuth = () => useContext(AuthenticationContext);

export default function AuthenticationProvider({ children }: AuthContextProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [documentNumber, setDocumentNumber] = useState<string | null>(null);
    const [modalidad, setModalidad] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [showOtpValidation, setShowOtpValidation] = useState(false);
    const [typeResponse, setTypeResponse] = useState<"info" | "success" | 'error'>('error');
    const [message, setMessage] = useState("Hubo un error al intentar autenticarse, por favor intentelo de nuevo.");
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
        try {
            const body = {
                no_docum: docWithOtp,
                contrasena: password
            };

            setIsLoading(true);
            const response = await instanceWallet.post('LoginCliente', body);
            
            if (response.status === 200) {
                const result = await LocalAuthentication.authenticateAsync({
                    promptMessage: 'Validando...',
                });
    
                if (result.success) {
                    await SecureStore.setItemAsync('documentNumber', docWithOtp);
                    await SecureStore.setItemAsync('password', password);
                    setDocumentNumber(docWithOtp);
                    setPassword(password);
                    if(response.data.message.startsWith('ey')){
                        setSessionToken(response.data.message);
                        setModalidad(response.data.data.modalidad);
                        router.replace('/home/');
                    } else {
                        setShowOtpValidation(true);
                    }
                    setIsAuthenticated(true);
                } else {
                    setMessage('Usuario o contraseña incorrectos.');
                    setShowErrorModal(true);
                }
                setIsLoading(false);
            } else {
                setMessage('Usuario o contraseña incorrectos.');
                setShowErrorModal(true);
                setIsLoading(false);
            }
        } catch (error) {
            setMessage(String(error).includes('404') ? 'Usuario o contraseña incorrectos.' : 'Hubo un error al intentar autenticarse');
            setIsLoading(false);
            setShowErrorModal(true);
        }
    };    

    const authenticateWithoutFaceId = async (docWithOtp: string, password: string) => {
        try {
            const body = {
                no_docum: docWithOtp,
                contrasena: password
            };

            setIsLoading(true);

            const response = await instanceWallet.post('LoginCliente', body);
            if (response.status === 200) {
                setIsAuthenticated(true);
                setDocumentNumber(docWithOtp);
                if(response.data.message.startsWith('ey')){
                    setSessionToken(response.data.message);
                    setModalidad(response.data.data.modalidad);
                    router.replace('/home/');
                } else {
                    setShowOtpValidation(true);
                }
                setIsLoading(false);
            } else {
                setMessage('Usuario o contraseña incorrectos.');
                setShowErrorModal(true);
                setIsLoading(false);
            }
        } catch (error) {
            setMessage(String(error).includes('404') ? 'Usuario o contraseña incorrectos.' : 'Hubo un error al intentar autenticarse');
            setIsLoading(false);
            setShowErrorModal(true);
        }
    };    

    const logout = async () => {
        await SecureStore.deleteItemAsync('documentNumber');
        await SecureStore.deleteItemAsync('password');
        await AsyncStorage.removeItem('session_token');
        await AsyncStorage.removeItem('number_account');
        await AsyncStorage.removeItem('balance');
        await AsyncStorage.removeItem('infoClient');
        await AsyncStorage.removeItem('listBanks');
        setIsAuthenticated(false);
        setModalidad(null);
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

    const handleOnFinish = (modalidad:string) => {
        setModalidad(modalidad);
        setShowOtpValidation(false);
        router.replace('/home/');
    }

    return (
        <>
            <AuthenticationContext.Provider value={{ isAuthenticated, authenticate, authenticateWithoutFaceId, logout, documentNumber, password, modalidad, activeLoader: handleLoaderActive ,desactiveLoader: handleLoaderDesactive}}>
                {children}
            </AuthenticationContext.Provider>
             {showOtpValidation && (
                <OtpValidationRegisterModal 
                    numberDocument={documentNumber!}
                    onClose={handleOtpValidationResponse} 
                    onView={()  =>  setShowOtpValidation(false)} 
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