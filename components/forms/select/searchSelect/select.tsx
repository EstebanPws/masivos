import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import styles from "./select.styles";
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
    disabled?: boolean;
}

export default function SearchSelect({ isRequired = false, label = '', data, placeholder, onSelect, selectedValue = '', disabled = false }: SearchSelectProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [filteredData, setFilteredData] = useState(data);
    const [errorOptionSelected, setErrorOptionSelected] = useState('');

    useEffect(() => {
        // Ordena los datos al inicio
        if (data) {
            data.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
        }
    }, [data]);

    useEffect(() => {
        // Al seleccionar un valor, solo se actualiza el texto del campo
       if(data){
        const itemSelected = data.find((item: { value: any; }) => item.value === selectedValue) || { name: '', value: '' };
        setSearchQuery(itemSelected.name);
       }
    }, [data, selectedValue]);

    const toggleModal = (type: number) => {
        if (type === 0) {
            let isMatch;
            if (filteredData) {
                isMatch = filteredData.some((item: { name: string }) => item.name === searchQuery);
            }

            if (isMatch || !isModalVisible) {
                setModalVisible(!isModalVisible);
            } else if (!isMatch && !isRequired) {
                setModalVisible(false);
            } else {
                setErrorOptionSelected('Debe seleccionar una opción.');
                setTimeout(() => {
                    setErrorOptionSelected('');
                }, 5000);
            }
        } else {
            // Restablece los datos filtrados cuando se abre el modal
            setFilteredData(data);
            setSearchQuery(''); // Limpia la búsqueda
            setModalVisible(!isModalVisible);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
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
            <TouchableOpacity disabled={disabled} onPress={() => toggleModal(1)} style={[styles.inputContainer, disabled ? { opacity: .7 } : null]}>
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
            <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal(0)}>
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
                                    closeModal();
                                }}
                            >
                                <Text style={[styles.itemText, primaryRegular]}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    {errorOptionSelected && (
                        <Text style={[primaryRegular, { color: colorPrimary }]}>{errorOptionSelected}</Text>
                    )}
                    <ButtonsPrimary
                        label='Cerrar'
                        onPress={() => toggleModal(0)}
                        style={styles.closeButton}
                    />
                </View>
            </Modal>
        </View>
    );
}