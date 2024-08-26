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
import AddressDian from "../../addressDian/addressDian";

interface List {
    name: string;
    value: string;
}

interface BasicInfoProps{
    type: number;
    listMunicipios: List[] | null;
    onSubmit: (data: any) => void;
}

export default function BasicInfo({type, listMunicipios,  onSubmit }: BasicInfoProps) {
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
    const [ciudMuniJur, setCiudMuniJur] = useState('');
    const [neighborhoodJur, setNeighborhoodJur] = useState('');
    const [addressJur, setAddressJur] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [showError, setShowError] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [tipoPer, setTipoPer] = useState('');
    const today = new Date();
    const [formData] = useState({
        entidad: '9011569983',
        oficina: '73',
        fecha_vincul_client: formatDate(today).replaceAll('/', ''),
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
        correo: '',
        auta_env_sms: 'S',
        aut_env_email: 'S'
    });

    useEffect(() => {
        const allFieldsFilled = type === 1 ? names && surnames && birthDate && placeBirthDate && typeDocument && inputDocument && birthDateDoc && placeBirthDateDoc && phone && email && ciudMuniJur && neighborhoodJur && addressJur : names && surnames && birthDate && placeBirthDate && typeDocument && inputDocument && birthDateDoc && placeBirthDateDoc && phone && email;
        
        setIsButtonEnabled(!!allFieldsFilled);
    }, [names, surnames, birthDate, placeBirthDate, typeDocument, inputDocument, birthDateDoc, placeBirthDateDoc, phone, email]);

    useEffect(() => {  
        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                setNames(type === 1 ? savedData.r_l_nombres : `${savedData.nombre1} ${savedData.nombre2}`);
                setSurnames(type === 1 ?`${savedData.r_l_pri_ape} ${savedData.r_l_seg_ape}` : `${savedData.apellido1} ${savedData.apellido2}`);
                setBirthDate(type === 1 ? savedData.r_l_fecnacimie : savedData.fecha_nac);
                setPlaceBirthDate(type === 1 ? savedData.r_l_ciu_nacimiento : savedData.lug_nac);
                setTypeDocument(type === 1 ? savedData.r_l_tipo_doc : savedData.tipo_doc);
                setInputDocument(type === 1 ? savedData.r_l_ced : savedData.no_docum);
                setBirthDateDoc(type === 1 ? savedData.r_l_fecha_expdoc : savedData.expedida_en);
                setPlaceBirthDateDoc(type === 1 ? savedData.r_l_expedida : savedData.expedida_en);
                setPhone(type === 1 ? savedData.r_l_tel : savedData.numero_celular);
                setEmail(type === 1 ? savedData.r_l_email : savedData.correo);
                if(type === 1){
                    setCiudMuniJur(savedData.r_l_ciu);
                    setNeighborhoodJur(savedData.barrio);
                    setAddressJur(savedData.r_l_dir);
                }
                setTipoPer(savedData.tipo_pers);
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

        const updatedFormData = type === 1 ? { 
            ...formData, 
            r_l_nombres: `${newNames[0]} ${newNames[1] === undefined ? '' : newNames[1]}`, 
            r_l_pri_ape: newSurnames[0], 
            r_l_seg_ape: newSurnames[1] === undefined ? '' : newSurnames[1], 
            r_l_fecnacimie: formatDateWithoutSlash(birthDate),
            r_l_ciu_nacimiento: placeBirthDate,
            r_l_tipo_doc: typeDocument,
            r_l_ced: inputDocument,
            r_l_fecha_expdoc: formatDateWithoutSlash(birthDateDoc),
            r_l_expedida: placeBirthDateDoc,
            r_l_tel: phone,
            r_l_email: email,
            r_l_ciu: ciudMuniJur,
            barrio: neighborhoodJur,
            r_l_dir: addressJur
        } : {
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
            correo: email,
            tipo_pers: '3',
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
                            label={`Infomarción ${type === 1 ? 'del representante legal' : 'basica'}`}
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
                                value={birthDate}
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
                                value={birthDateDoc}
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
                        {tipoPer === '1' &&(
                            <>
                                <View style={styles.mb5}>
                                    <SearchSelect
                                        isRequired
                                        label="Ciudad de residencia"
                                        data={listMunicipios}
                                        placeholder="Seleccione una opción"
                                        onSelect={handleSelect(setCiudMuniJur)}
                                        selectedValue={ciudMuniJur}
                                    />
                                </View>
                                <View style={styles.mb5}>
                                    <Inputs
                                        label="Barrio"
                                        placeholder="Escribe el barrio donde resides"
                                        isSecureText={false}
                                        isRequired={true}
                                        keyboardType="default"
                                        onChangeText={setNeighborhoodJur}
                                        value={neighborhoodJur}
                                    />
                                </View>
                                <View style={styles.mb5}>
                                    <AddressDian 
                                        label="Dirección de residencia" 
                                        placeholder="Escribe tu dirección" 
                                        onSelect={handleSelect(setAddressJur)} 
                                        selectedValue={addressJur}
                                        isRequired
                                    />
                                </View>
                            </>
                        )}
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