import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { styles } from "./basicInfo.styles";
import Inputs from "../../inputs/inputs";
import SearchSelect from "../../select/searchSelect/select";
import { listDocumentType } from "@/utils/listUtils";
import DateSelect from "../../select/dateSelect/dateSelect";
import { formatDate, formatDateWithoutSlash, formatNames } from "@/utils/fomatDate";
import ButtonsPrimary from "../../buttons/buttonPrimary/button";
import { getData, setData } from "@/utils/storageUtils";
import { validateEmail, validatePhone, validateDocumentNumber} from "@/utils/validationForms";
import InfoModal from "@/components/modals/infoModal/infoModal";
import { AnimatePresence } from "moti";
import FadeInOut from "@/components/animations/fade/fadeInOut";
import TitleLine from "@/components/titleLine/titleLine";

interface List {
    name: string;
    value: string;
}

interface BasicInfoProps{
    listMunicipios: List[] | null;
    onSubmit: (data: any) => void;
}

export default function BasicInfo({listMunicipios,  onSubmit }: BasicInfoProps) {
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
    const [messageError, setMessageError] = useState('');
    const [showError, setShowError] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [formData] = useState({
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        fecha_nac: '',
        lug_nac: '',
        tipo_doc: '',
        no_docum: '',
        fecha_exp: '',
        expedida_en: '',
        numero_celular: '',
        correo: ''
    });

    useEffect(() => {
        const allFieldsFilled = names && surnames && birthDate && placeBirthDate && typeDocument && inputDocument && birthDateDoc && placeBirthDateDoc && phone && email;
        
        setIsButtonEnabled(!!allFieldsFilled);
    }, [names, surnames, birthDate, placeBirthDate, typeDocument, inputDocument, birthDateDoc, placeBirthDateDoc, phone, email]);

    useEffect(() => {  
        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                setNames(`${savedData.nombre1} ${savedData.nombre2}`);
                setSurnames(`${savedData.apellido1} ${savedData.apellido2}`);
                setBirthDate(savedData.fecha_nac);
                setPlaceBirthDate(savedData.lug_nac);
                setTypeDocument(savedData.tipo_doc);
                setInputDocument(savedData.no_docum);
                setBirthDateDoc(savedData.expedida_en);
                setPlaceBirthDateDoc(savedData.fecha_exp);
                setPhone(savedData.numero_celular);
                setEmail(savedData.correo);
                setIsVisible(true);
            }
        };

        fetchFormData();
    }, []);

    const handleSelect = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
        setter(item.value);
    };

    const handleDateSelect = (setter: { (value: React.SetStateAction<string>): void }) => (date: any) => {
        setter(formatDate(date));
    };

    const handleSubmit = () => {
        if (!validateDocumentNumber(inputDocument)) {
            setMessageError("Número de documento no es válido.");
            setShowError(true);
            return;
        }
        if (!validatePhone(phone)) {
            setMessageError("Número de celular no es válido. Debe tener 10 dígitos.");
            setShowError(true);
            return;
        }
        if (!validateEmail(email)) {
            setMessageError("Correo electrónico no es válido.");
            setShowError(true);
            return;
        }

        setIsVisible(false);

        const newNames = formatNames(names);
        const newSurnames = formatNames(surnames);

        const updatedFormData = { 
            ...formData, 
            nombre1: newNames[0], 
            nombre2: newNames[1] === undefined ? '' : newNames[1], 
            apellido1: newSurnames[0], 
            apellido2: newSurnames[1] === undefined ? '' : newSurnames[1], 
            fecha_nac: formatDateWithoutSlash(birthDate),
            lug_nac: placeBirthDate,
            tipo_doc: typeDocument,
            no_docum: inputDocument,
            fecha_exp: formatDateWithoutSlash(birthDateDoc),
            expedida_en: placeBirthDateDoc,
            numero_celular: phone,
            correo: email
        };

        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                const newUpdatedFormData = { ...savedData, ...updatedFormData };
                await setData('registrationForm', newUpdatedFormData); 
                const step = 0;
                const data = {
                    step
                };
                onSubmit(data);  
            }
        };
    
        fetchFormData();
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <FadeInOut key="step0">
                    <View style={styles.containerForm}>
                        <TitleLine 
                            label="Infomarción basica"
                        />
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
                                data={listMunicipios}
                                placeholder="Seleccione una opción"
                                onSelect={handleSelect(setPlaceBirthDate)}
                                selectedValue={placeBirthDate}
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
                                data={listMunicipios}
                                placeholder="Seleccione una opción"
                                onSelect={handleSelect(setPlaceBirthDateDoc)}
                                selectedValue={placeBirthDateDoc}
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
                </FadeInOut>
            )}
            
            {showError && (
                <InfoModal 
                    isVisible={showError}
                    type="info"
                    message={messageError}
                    onPress={() => setShowError(false)}
                />
            )}
        </AnimatePresence>
    );
}