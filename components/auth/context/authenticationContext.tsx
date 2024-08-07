import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import InfoModal from '@/components/modals/infoModal/infoModal';
import { router } from 'expo-router';

interface AuthContextType {
    isAuthenticated: boolean;
    authenticate: (docWithOtp: string, password: string) => Promise<void>;
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
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Validando...',
        });

        if (result.success) {
            await SecureStore.setItemAsync('documentNumber', docWithOtp);
            await SecureStore.setItemAsync('password', password);
            setDocumentNumber(docWithOtp);
            setPassword(password);
            setIsAuthenticated(true);
            router.push('/home/');
        } else {
            setShowErrorModal(true);
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync('documentNumber');
        await SecureStore.deleteItemAsync('password');
        setIsAuthenticated(false);
        setDocumentNumber(null);
        setPassword(null);
    };

    return (
        <>
            <AuthenticationContext.Provider value={{ isAuthenticated, authenticate, logout, documentNumber, password }}>
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
        </>
    );
};