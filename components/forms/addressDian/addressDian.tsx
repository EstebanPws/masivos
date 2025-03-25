import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from "./addressDian.styles";
import Modal from 'react-native-modal';
import Constants from 'expo-constants';
import ButtonsPrimary from '@/components/forms/buttons/buttonPrimary/button';
import { Icon, MD2Colors } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { listAddressOtherType, listStreetType, listSuffixType } from '@/utils/listUtils';
import SearchSelect from '../select/searchSelect/select';
import Inputs from '../inputs/inputs';
import InfoModal from '@/components/modals/infoModal/infoModal';
import ButtonsSecondary from '../buttons/buttonSecondary/button';

const extra = Constants.expoConfig?.extra || {};
const { primaryRegular, primaryBold } = extra.text;
const { colorPrimary, colorSecondary } = extra;

interface AddressDianProps {
    isRequired?: boolean;
    label: string;
    placeholder: string;
    onSelect: (item: any) => void;
    selectedValue: any;
    disabled?: boolean;
}
export default function AddressDian({ isRequired = false, label, placeholder, onSelect, selectedValue = '', disabled = false }: AddressDianProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [selectedNumber, setSelectedNumber] = useState('');
    const [selectedLetter, setSelectedLetter] = useState('');
    const [selectedExtra, setSelectedExtra] = useState('');
    const [selectedExtra1, setSelectedExtra1] = useState('');
    const [selectedExtra2, setSelectedExtra2] = useState('');
    const [selectedExtra3, setSelectedExtra3] = useState('');
    const [selectedExtra4, setSelectedExtra4] = useState('');
    const [selectedSuffix, setSelectedSuffix] = useState('');
    const [error, setError] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleConfirm = () => {

        const allFieldsFilled = selectedType && selectedNumber && selectedLetter;
        if (!!allFieldsFilled === false) {
            setError(true);
            return;
        }

        const fullAddress = `${selectedType} ${selectedNumber} ${selectedLetter} ${selectedSuffix} ${selectedExtra ? `, ${selectedExtra}` : ''} ${selectedExtra1 ? `, ${selectedExtra1}` : ''} ${selectedExtra2} ${selectedExtra3} ${selectedExtra4}`;
        setSearchQuery(fullAddress);
        onSelect({ name: fullAddress, value: fullAddress });
        toggleModal();
    };

    const handleSelect = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
        setter(item.value);
    };

    return (
        <View>
            <Text style={{ ...styles.label, ...primaryBold }}>{isRequired ? `${label} *` : label}</Text>
            <TouchableOpacity onPress={toggleModal} style={[styles.inputContainer, disabled ? { opacity: .5 } : null]} disabled={disabled}>
                <Text style={{ ...styles.inputText, ...primaryRegular }}>{selectedValue || searchQuery || placeholder}</Text>
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
                    <ScrollView>
                        <View style={styles.mb5}>
                            <SearchSelect
                                label={'Tipo de vía'}
                                data={listStreetType}
                                placeholder={'Seleccione una opción'}
                                onSelect={handleSelect(setSelectedType)}
                                selectedValue={selectedType}
                                isRequired
                            />
                        </View>
                        <View style={styles.mb5}>
                            <Inputs
                                value={selectedNumber}
                                onChangeText={setSelectedNumber}
                                label='Vía Principal'
                                placeholder="Ej: 32, 32A etc."
                                keyboardType="default"
                                isSecureText={false}
                                isRequired={true}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <Inputs
                                isRequired={true}
                                keyboardType="default"
                                value={selectedLetter}
                                onChangeText={setSelectedLetter}
                                label='Prefijo'
                                placeholder="Ej: 17 151"
                                isSecureText={false}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <SearchSelect
                                label={'Sufijo'}
                                data={listSuffixType}
                                placeholder={'Seleccione una opción'}
                                onSelect={handleSelect(setSelectedSuffix)}
                                selectedValue={selectedSuffix}
                                isRequired={false}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <Inputs
                                label='Complemento'
                                isRequired={false}
                                keyboardType="default"
                                value={selectedExtra}
                                onChangeText={setSelectedExtra}
                                placeholder="Ej: Conjunto, Residencia etc."
                                isSecureText={false}
                            />
                            <SearchSelect
                                label=''
                                data={listAddressOtherType}
                                placeholder={'Seleccione una opción'}
                                onSelect={handleSelect(setSelectedExtra1)}
                                selectedValue={selectedExtra1}
                            />
                            <Inputs
                                isRequired={false}
                                keyboardType="default"
                                value={selectedExtra2}
                                onChangeText={setSelectedExtra2}
                                placeholder="Ej: 2, 45 etc"
                                isSecureText={false}
                            />
                            <SearchSelect
                                label=''
                                data={listAddressOtherType}
                                placeholder={'Seleccione una opción'}
                                onSelect={handleSelect(setSelectedExtra3)}
                                selectedValue={selectedExtra3}
                            />
                            <Inputs
                                isRequired={false}
                                keyboardType="default"
                                value={selectedExtra4}
                                onChangeText={setSelectedExtra4}
                                placeholder="Ej: 2, 45 etc"
                                isSecureText={false}
                            />
                        </View>
                    </ScrollView>
                    <View style={styles.row}>
                        <ButtonsSecondary
                            label='Cerrar'
                            onPress={toggleModal}
                        />
                        <ButtonsPrimary
                            label='Confirmar'
                            onPress={handleConfirm}
                        />
                    </View>
                </View>
                {error && (
                    <InfoModal
                        type='info'
                        message='Por favor ingresa los campos requeridos.'
                        isVisible={error}
                        onPress={() => setError(false)}
                    />
                )}
            </Modal>
        </View>
    );
}