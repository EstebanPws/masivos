import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { styles } from "./infoGeneral.styles";
import Inputs from "@/components/forms/inputs/inputs";
import SearchSelect from "@/components/forms/select/searchSelect/select";
import { listCivilStatusType, listEducationType, listGenderType, listHousingType, listOcupationType, listUbicationZoneType } from "@/utils/listUtils";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { getData, setData } from "@/utils/storageUtils";
import InfoModal from "@/components/modals/infoModal/infoModal";
import { AnimatePresence } from "moti";
import FadeInOut from "@/components/animations/fade/fadeInOut";
import AddressDian from "@/components/forms/addressDian/addressDian";
import CheckboxCustom from "../../checkbox/checkbox";

interface BasicInfoProps{
    onSubmit: (data: any) => void;
}

export default function InfoGeneral({ onSubmit }: BasicInfoProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [gender, setGender] = useState('');
    const [civilStatus, setCivilStatus] = useState('');
    const [education, setEducation] = useState('');
    const [ocupation, setOcupation] = useState('');
    const [ubicationZone, setUbicationZone] = useState(''); 
    const [housing, setHousing] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [address, setAddress] = useState('');
    const [isExtranjero, setIsExtranjero] = useState('');
    const [formData] = useState({
        genero: '',
        estado_civil: '',
        niv_edu: '',
        ocupacion: '',
        zon_ubi: '',
        tip_vivien: '',
        barrio: '',
        dire_domi: '',
        extrenjero: ''
    });

    const options = [
        { label: 'SI', value: '1' },
        { label: 'NO', value: '2' },
    ];

    useEffect(() => {
        const allFieldsFilled = gender && civilStatus && education && ocupation && ubicationZone && housing && neighborhood && address && isExtranjero;
        
        setIsButtonEnabled(!!allFieldsFilled);
    }, [gender, civilStatus, education, ocupation, ubicationZone, housing, neighborhood, address, isExtranjero]);

    useEffect(() => {  
        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                setGender(savedData.genero);
                setCivilStatus(savedData.estado_civil);
                setEducation(savedData.niv_edu);
                setOcupation(savedData.ocupacion);
                setUbicationZone(savedData.zon_ubi);
                setHousing(savedData.tip_vivien);
                setNeighborhood(savedData.barrio);
                setAddress(savedData.dire_domi);
                setIsExtranjero(savedData.extrenjero);

                setIsVisible(true);
            }
        };

        fetchFormData();
    }, []);

    const handleSubmit = () => {
        setIsVisible(false);

        const updatedFormData = { 
            ...formData, 
            genero: gender,
            estado_civil: civilStatus,
            niv_edu: education,
            ocupacion: ocupation,
            zon_ubi: ubicationZone,
            tip_vivien: housing,
            barrio: neighborhood,
            dire_domi: address,
            extrenjero: isExtranjero
        };

        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                const newUpdatedFormData = { ...savedData, ...updatedFormData };
                await setData('registrationForm', newUpdatedFormData); 
                const step = 1;
                const data = {
                    step
                };
                onSubmit(data);  
            }
        };
    
        fetchFormData();
    };

    const handleSelect = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
        setter(item.value);
    };

    const handleSelectCheckBox = (value: string) =>{
        setIsExtranjero(value);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <FadeInOut>
                    <View style={styles.containerForm}>
                        <View style={styles.mb5}>
                            <SearchSelect
                                isRequired
                                label="Genero"
                                data={listGenderType}
                                placeholder="Seleccione una opción"
                                onSelect={handleSelect(setGender)}
                                selectedValue={gender}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <SearchSelect
                                isRequired
                                label="Estado civil"
                                data={listCivilStatusType}
                                placeholder="Seleccione una opción"
                                onSelect={handleSelect(setCivilStatus)}
                                selectedValue={civilStatus}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <SearchSelect
                                isRequired
                                label="Nivel de educación"
                                data={listEducationType}
                                placeholder="Seleccione una opción"
                                onSelect={handleSelect(setEducation)}
                                selectedValue={education}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <SearchSelect
                                isRequired
                                label="Ocupación"
                                data={listOcupationType}
                                placeholder="Seleccione una opción"
                                onSelect={handleSelect(setOcupation)}
                                selectedValue={ocupation}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <SearchSelect
                                isRequired
                                label="Zona de ubicación"
                                data={listUbicationZoneType}
                                placeholder="Seleccione una opción"
                                onSelect={handleSelect(setUbicationZone)}
                                selectedValue={ubicationZone}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <SearchSelect
                                isRequired
                                label="Tipo de vivienda"
                                data={listHousingType}
                                placeholder="Seleccione una opción"
                                onSelect={handleSelect(setHousing)}
                                selectedValue={housing}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <Inputs
                                label="Barrio"
                                placeholder="Escribe el barrio donde resides"
                                isSecureText={false}
                                isRequired={true}
                                keyboardType="default"
                                onChangeText={setNeighborhood}
                                value={neighborhood}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <AddressDian 
                                label="Dirección de residencia" 
                                placeholder="Escribe tu dirección" 
                                onSelect={handleSelect(setAddress)} 
                                selectedValue={address}
                                isRequired
                            />
                        </View>
                        <View style={styles.mb5}>
                            <CheckboxCustom 
                                label="¿Es usted extrajero?"
                                isRequired
                                options={options}
                                onSelect={handleSelectCheckBox}
                                selectedValue={isExtranjero}
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
        </AnimatePresence>
    );
}