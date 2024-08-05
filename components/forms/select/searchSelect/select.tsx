import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { styles } from "./select.styles";
import Modal from 'react-native-modal';
import Constants from 'expo-constants';
import ButtonsPrimary from '../../buttons/buttonPrimary/button';
import { Icon, MD2Colors } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const extra = Constants.expoConfig?.extra || {};
const { primaryRegular, primaryBold } = extra.text;
const { colorPrimary, colorSecondary } = extra;

interface SearchSelectProps {
    isRequired?: boolean;
    label?: string;
    data: any;
    placeholder: string;
    onSelect: (item: any) => void;
    selectedValue: any;
}

export default function SearchSelect({ isRequired = false, label = '', data, placeholder, onSelect, selectedValue = '' }: SearchSelectProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        if (data) {
            data.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
        }
    }, [data]);

    useEffect(() => {
        if (data) {
            const itemSelected = data.find((item: { value: any; }) => item.value === selectedValue) || { name: '', value: '' };
            setSearchQuery(itemSelected.name);
        }
    }, [data, selectedValue]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const onChangeSearch = (query: string) => {
        setSearchQuery(query);
        setFilteredData(
            data.filter((item: { name: string }) => item.name.toLowerCase().includes(query.toLowerCase()))
        );
    };

    return (
        <View>
            <Text style={{ ...styles.label, ...primaryBold }}>{isRequired ? `${label} *` : label}</Text>
            <TouchableOpacity onPress={toggleModal} style={styles.inputContainer}>
                <Text style={{ ...styles.inputText, ...primaryRegular }}>{searchQuery || placeholder}</Text>
                <LinearGradient
                    colors={[colorPrimary, colorSecondary]}
                    style={styles.containerIcon}
                >
                    <Icon
                        source="chevron-down"
                        size={24}
                        color={MD2Colors.white}
                    />
                </LinearGradient>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={onChangeSearch}
                        placeholder="Buscar..."
                        placeholderTextColor={MD2Colors.grey600}
                    />
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => {
                                    setSearchQuery(item.name);
                                    onSelect(item);
                                    toggleModal();
                                }}
                            >
                                <Text style={styles.itemText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <ButtonsPrimary
                        label='Cerrar'
                        onPress={toggleModal}
                        style={styles.closeButton}
                    />
                </View>
            </Modal>
        </View>
    );
}