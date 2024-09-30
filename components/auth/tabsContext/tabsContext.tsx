import Loader from '@/components/loader/loader';
import { Href, router, useFocusEffect } from 'expo-router';
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { AppState, AppStateStatus, BackHandler, Alert, TouchableWithoutFeedback } from 'react-native';
import { useAuth } from '../context/authenticationContext';
import InfoModal from '@/components/modals/infoModal/infoModal';

interface TabContextType {
    activeTab: string;
    tabHistory: string[];
    setActiveTab: (tab: string) => void;
    goBack: () => void;
    activeLoader: () => void;
    desactiveLoader: () => void;
}

const TabContext = createContext<TabContextType>({
    activeTab: '',
    tabHistory: [],
    setActiveTab: () => {},
    goBack: () => {},
    activeLoader: () => {},
    desactiveLoader: () => {}
});

export const useTab = () => useContext(TabContext);

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
    const {logout} = useAuth();
    const [activeTab, setActiveTab] = useState<string>('');
    const [tabHistory, setTabHistory] = useState<string[]>([]);
    const [isLoader, setIsLoader] = useState(false);
    const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
    const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    const INACTIVITY_LIMIT = 5* 60 * 1000;

    const handleLogout = () => {
        setShowErrorModal(true);
    };

    const finishSession = () => {
        logout();
        setShowErrorModal(false);
    }

    const resetInactivityTimeout = () => {
        if (inactivityTimeoutRef.current) {
            clearTimeout(inactivityTimeoutRef.current);
        }
        inactivityTimeoutRef.current = setTimeout(() => {
            handleLogout();
        }, INACTIVITY_LIMIT);
    };

    const handleSetActiveTab = (newTab: string) => {
        if (newTab !== activeTab) {
            setTabHistory(prev => [...prev, activeTab]);
            setActiveTab(newTab);
        }
        resetInactivityTimeout();
    };

    const handleGoBack = () => {
        if (tabHistory.length > 0) {
            const lastTab = tabHistory[tabHistory.length - 1];
            setTabHistory(prev => prev.slice(0, -1));
            setActiveTab(lastTab);
            
            const back = lastTab === "" ? "/home" : lastTab;
            router.replace(back as Href<string | object>);
        }
        resetInactivityTimeout();
    };

    const handleLoaderActive = () => {
        setIsLoader(true);
    };

    const handleLoaderDesactive = () => {
        setIsLoader(false);
    };

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                resetInactivityTimeout();
            }
            setAppState(nextAppState);
        });

        return () => {
            if (subscription) subscription.remove();
        };
    }, [appState]);

    useFocusEffect(() => {
        const onBackPress = () => {
            if (activeTab !== '/') {
                handleGoBack();
                return true;
            }
            return false;
        };

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        };
    });

    return (
        <>
            <TouchableWithoutFeedback onPress={resetInactivityTimeout}>
                <TabContext.Provider value={{ activeTab, tabHistory, setActiveTab: handleSetActiveTab, goBack: handleGoBack, activeLoader: handleLoaderActive ,desactiveLoader: handleLoaderDesactive}}>
                        {children}
                </TabContext.Provider>
             </TouchableWithoutFeedback>
            
            {isLoader && (
                <Loader />
            )}
             {showErrorModal && (
                <InfoModal
                    isVisible={showErrorModal}
                    type={'info'}
                    message={'Su sesión ha caducado, por favor inicie sesión nuevamente.'}
                    onPress={() => finishSession()}
                />
            )}
        </>
    );
};