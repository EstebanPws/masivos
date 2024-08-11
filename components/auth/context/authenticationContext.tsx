import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import InfoModal from '@/components/modals/infoModal/infoModal';
import { router } from 'expo-router';
import instanceWallet from '@/services/instanceWallet';
import Loader from '@/components/loader/loader';

interface AuthContextType {
    isAuthenticated: boolean;
    authenticate: (docWithOtp: string, password: string) => Promise<void>;
    authenticateWithoutFaceId: (docWithOtp: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    documentNumber: string | null;
    password: string | null;
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
});

export const useAuth = () => useContext(AuthenticationContext);

export default function AuthenticationProvider({ children }: AuthContextProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [documentNumber, setDocumentNumber] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
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
            /*const response = await instanceWallet.post('LoginCliente', body);
            console.log(response);
            
            if (response.status === 200) {
                const result = await LocalAuthentication.authenticateAsync({
                    promptMessage: 'Validando...',
                });
    
                if (result.success) {
                    await SecureStore.setItemAsync('documentNumber', docWithOtp);
                    await SecureStore.setItemAsync('password', password);
                    setDocumentNumber(docWithOtp);
                    setPassword(password);
                    setIsAuthenticated(true);
                    router.replace('/home/');
                } else {
                    setShowErrorModal(true);
                }
                setIsLoading(false);
            } else {
                setShowErrorModal(true);
                setIsLoading(false);
            }*/

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Validando...',
            });

            if (result.success) {
                await SecureStore.setItemAsync('documentNumber', docWithOtp);
                await SecureStore.setItemAsync('password', password);
                setDocumentNumber(docWithOtp);
                setPassword(password);
                setIsAuthenticated(true);
                router.replace('/home/');
            } else {
                setShowErrorModal(true);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            
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
            /*const response = await instanceWallet.post('LoginCliente', body);

            if (response.status === 200) {
                setIsAuthenticated(true);
                router.replace('/home/');
                setIsLoading(false);
            } else {
                setShowErrorModal(true);
                setIsLoading(false);
            }*/
                setIsAuthenticated(true);
                router.replace('/home/');
                setIsLoading(false);
        } catch (error) {
            console.log(error);
            
            setIsLoading(false);
            setShowErrorModal(true);
        }
    };    

    const logout = async () => {
        await SecureStore.deleteItemAsync('documentNumber');
        await SecureStore.deleteItemAsync('password');
        setIsAuthenticated(false);
        setDocumentNumber(null);
        setPassword(null);
        router.replace('/')
    };

   

    return (
        <>
            <AuthenticationContext.Provider value={{ isAuthenticated, authenticate, authenticateWithoutFaceId, logout, documentNumber, password }}>
                {children}
            </AuthenticationContext.Provider>
            {showErrorModal && (
                <InfoModal
                    isVisible={showErrorModal}
                    type="error"
                    message="Hubo un error al intentar autenticarse, por favor intentelo de nuevo."
                    onPress={() => setShowErrorModal(false)}
                />
            )}
            {isLoading && (
               <Loader />
            )}
        </>
    );
};