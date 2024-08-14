import { router, useFocusEffect } from 'expo-router';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BackHandler } from 'react-native';

interface TabContextType {
    activeTab: string;
    tabHistory: string[];
    setActiveTab: (tab: string) => void;
    goBack: () => void;
}

const TabContext = createContext<TabContextType>({
    activeTab: '',
    tabHistory: [],
    setActiveTab: () => {},
    goBack: () => {},
});

export const useTab = () => useContext(TabContext);

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeTab, setActiveTab] = useState<string>('');
    const [tabHistory, setTabHistory] = useState<string[]>([]);

    const handleSetActiveTab = (newTab: string) => {
        if (newTab !== activeTab) {
            setTabHistory(prev => [...prev, activeTab]);
            setActiveTab(newTab);
        }
    };

    const handleGoBack = () => {
        if (tabHistory.length > 0) {
            const lastTab = tabHistory[tabHistory.length - 1];
            setTabHistory(prev => prev.slice(0, -1));
            setActiveTab(lastTab);
            router.replace(lastTab === "" ? '/home/' : lastTab);
        }
    };

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
        <TabContext.Provider value={{ activeTab, tabHistory, setActiveTab: handleSetActiveTab, goBack: handleGoBack }}>
            {children}
        </TabContext.Provider>
    );
};
