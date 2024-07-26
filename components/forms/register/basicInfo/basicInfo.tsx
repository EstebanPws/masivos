import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { styles } from "./basicInfo.styles";
import Inputs from "../../inputs/inputs";
import SearchSelect from "../../select/searchSelect/select";
import { listDocumentType } from "@/utils/listUtils";
import DateSelect from "../../select/dateSelect/dateSelect";
import { formatDate } from "@/utils/fomatDate";
import ButtonsPrimary from "../../buttons/buttonPrimary/button";
import { getData } from "@/utils/storageUtils";

interface BasicInfoProps{
    onSubmit: (data: any) => void;
}

export default function BasicInfo({ onSubmit }: BasicInfoProps) {
    const [names, setNames] = useState('');
    const [surnames, setSurnames] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [placeBirthDate, setPlaceBirthDate] = useState('');
    const [typeDocument, setTypeDocument] = useState('');
    const [inputDocument, setInputDocument] = useState('');
    const [birthDateDoc, setBirthDateDoc] = useState('');
    const [placeBirthDateDoc, setPlaceBirthDateDoc] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    const handleSelect = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
        setter(item.name);
    };

    const handleDateSelect = (setter: { (value: React.SetStateAction<string>): void }) => (date: any) => {
        setter(formatDate(date));
    };

    const handleSubmit = () => {
        const data = {
            names,
            surnames,
            birthDate,
            placeBirthDate,
            typeDocument,
            inputDocument,
            birthDateDoc,
            placeBirthDateDoc,
            phone,
            email
        };
        onSubmit(data);
    };

    useEffect(() => {
        const allFieldsFilled = names && surnames && birthDate && placeBirthDate && typeDocument && inputDocument && birthDateDoc && placeBirthDateDoc && phone && email;
        setIsButtonEnabled(!!allFieldsFilled);
    }, [names, surnames, birthDate, placeBirthDate, typeDocument, inputDocument, birthDateDoc, placeBirthDateDoc, phone, email]);

    useEffect(() => {
        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                const type = listDocumentType.find(item => item.value === savedData.tipo_doc) || { name: '', value: '' };

                setNames(`${savedData.nombre1} ${savedData.nombre2}`);
                setSurnames(`${savedData.apellido1} ${savedData.apellido2}`);
                setTypeDocument(type.name);
                setInputDocument(savedData.no_docum);
            }
        };

        fetchFormData();
    }, [])

    return (
        <View style={styles.containerForm}>
            <View style={styles.mb5}>
                <Inputs
                    label="Nombres"
                    placeholder="Escribe tus nombres completos"
                    isSecureText={false}
                    isRequired={true}
                    keyboardType="default"
                    onChangeText={setNames}
                    value={names}
                />
            </View>
            <View style={styles.mb5}>
                <Inputs
                    label="Apellidos"
                    placeholder="Escribe tus apellidos completos"
                    isSecureText={false}
                    isRequired={true}
                    keyboardType="default"
                    onChangeText={setSurnames}
                    value={surnames}
                />
            </View>
            <View style={styles.mb5}>
                <DateSelect
                    isRequired
                    label="Fecha de nacimiento"
                    placeholder="Seleccione una opción"
                    onSelect={handleDateSelect(setBirthDate)}
                />
            </View>
            <View style={styles.mb5}>
                <SearchSelect
                    isRequired
                    label="Lugar de nacimiento"
                    data={listDocumentType}
                    placeholder="Seleccione una opción"
                    onSelect={handleSelect(setPlaceBirthDate)}
                />
            </View>
            <View style={styles.mb5}>
                <SearchSelect
                    isRequired
                    label="Tipo de documento"
                    data={listDocumentType}
                    placeholder="Seleccione una opción"
                    onSelect={handleSelect(setTypeDocument)}
                    selectedValue={typeDocument}
                />
            </View>
            <View style={styles.mb5}>
                <Inputs
                    label="Número de documento"
                    placeholder="Escribe tu número de documento"
                    isSecureText={false}
                    isRequired={true}
                    keyboardType="numeric"
                    onChangeText={setInputDocument}
                    value={inputDocument}
                />
            </View>
            <View style={styles.mb5}>
                <DateSelect
                    isRequired
                    label="Fecha de expedicón"
                    placeholder="Seleccione una opción"
                    onSelect={handleDateSelect(setBirthDateDoc)}
                />
            </View>
            <View style={styles.mb5}>
                <SearchSelect
                    isRequired
                    label="Lugar de expedicón"
                    data={listDocumentType}
                    placeholder="Seleccione una opción"
                    onSelect={handleSelect(setPlaceBirthDateDoc)}
                />
            </View>
            <View style={styles.mb5}>
                <Inputs
                    label="Número de celular"
                    placeholder="Escribe tu número de celular"
                    isSecureText={false}
                    isRequired={true}
                    keyboardType="numeric"
                    onChangeText={setPhone}
                    value={phone}
                    maxLength={10}
                />
            </View>
            <View style={styles.mb5}>
                <Inputs
                    label="Correo electrónico"
                    placeholder="Escribe tu correo electrónico"
                    isSecureText={false}
                    isRequired={true}
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                />
            </View>
            <View style={styles.mV2}>
                <ButtonsPrimary 
                    disabled={!isButtonEnabled}
                    onPress={handleSubmit}
                    label="Siguiente"
                />
            </View>
        </View>
    );
}