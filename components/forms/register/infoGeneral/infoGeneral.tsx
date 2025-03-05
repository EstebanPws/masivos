import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styles from "./infoGeneral.styles";
import SearchSelect from "@/components/forms/select/searchSelect/select";
import { listCivilStatusType, listEducationType, listGenderType, listOcupationType } from "@/utils/listUtils";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { getData, setData } from "@/utils/storageUtils";
import { AnimatePresence } from "moti";
import FadeInOut from "@/components/animations/fade/fadeInOut";
import AddressDian from "@/components/forms/addressDian/addressDian";
import CheckboxCustom from "../../checkbox/checkbox";
import TitleLine from "@/components/titleLine/titleLine";

interface List {
    name: string;
    value: string;
}

interface InfoGeneralProps{
    listMunicipios: List[] | null;
    listPaises: List[] | null;
    type: string | string[] | undefined;
    onSubmit: (data: any) => void;
}

export default function InfoGeneral({type, listMunicipios, listPaises, onSubmit }: InfoGeneralProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [gender, setGender] = useState('');
    const [civilStatus, setCivilStatus] = useState('');
    const [education, setEducation] = useState('');
    const [ocupation, setOcupation] = useState('');
    const [ciudMuni, setCiudMuni] = useState('');
    const [address, setAddress] = useState('');
    const [isExtranjero, setIsExtranjero] = useState('');
    const [paisNacimiento, setPaisNacimiento] = useState('');
    const [formData] = useState({
        genero: '',
        estado_civil: '',
        niv_edu: '',
        ocupacion: '',
        ciud_muni: '',
        dire_domi: ''
    });

    const options = [
        { label: 'SI', value: '1' },
        { label: 'NO', value: '2' },
    ];

    useEffect(() => {        
        let allFieldsFilled = gender && type !== '8' ? civilStatus && education && ocupation && ciudMuni && address && isExtranjero : ciudMuni && address;     

        if(isExtranjero === '1'){
            allFieldsFilled = gender && type !== '8' ? civilStatus && education && ocupation && ciudMuni && address && isExtranjero && paisNacimiento : ciudMuni && address;
        } else {
            setPaisNacimiento('');
        }

        setIsButtonEnabled(!!allFieldsFilled);
    }, [gender, civilStatus, education, ocupation, ciudMuni, address, isExtranjero, paisNacimiento]);

    useEffect(() => {  
        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                setGender(savedData.genero);
                setCivilStatus(savedData.estado_civil);
                setEducation(savedData.niv_edu);
                setOcupation(savedData.ocupacion);
                setCiudMuni(savedData.ciud_muni)
                setAddress(savedData.dire_domi);
                setIsExtranjero(savedData.extrenjero);
                
                if(savedData.extrenjero === '1'){
                    setPaisNacimiento(savedData.pais_nacimiento);
                }
                setIsVisible(true);
            }
        };

        fetchFormData();
    }, []);

    const handleSubmit = () => {

        setIsVisible(false);

        const updatedFormData = { 
            ...formData, 
            acti_CIIU: ocupation === "1" ? "8522" : ocupation === "3" ?  "0010" : ocupation === "4" ?  "9700" : ocupation === "5" ?  "0020" : "",
            desc_CIIU: ocupation === "1" ? "EDUCACIÓN MEDIA ACADÉMICA" : ocupation === "3" ?  "ASALARIADOS" : ocupation === "4" ?  "ACTIVIDADES DE LOS HOGARES INDIVIDUALES COMO EMPLEADORES DE PERSONAL D" : ocupation === "5" ?  "PENSIONADOS" : "",
            genero: gender,
            estado_civil: civilStatus,
            niv_edu: education,
            ocupacion: ocupation,
            ciud_muni: ciudMuni,
            dire_domi: address,
            extrenjero: isExtranjero,
            pais_nacimiento: paisNacimiento
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
                        <TitleLine 
                            label="Información general"
                        />
                        <View style={styles.mb5}>
                            <SearchSelect
                                isRequired
                                label="Genero"
                                data={listGenderType}
                                placeholder="Selecciona una opción"
                                onSelect={handleSelect(setGender)}
                                selectedValue={gender}
                            />
                        </View>
                        {type !== '8' && (
                            <>
                                <View style={styles.mb5}>
                                    <SearchSelect
                                        isRequired
                                        label="Estado civil"
                                        data={listCivilStatusType}
                                        placeholder="Selecciona una opción"
                                        onSelect={handleSelect(setCivilStatus)}
                                        selectedValue={civilStatus}
                                    />
                                </View>
                                <View style={styles.mb5}>
                                    <SearchSelect
                                        isRequired
                                        label="Nivel de educación"
                                        data={listEducationType}
                                        placeholder="Selecciona una opción"
                                        onSelect={handleSelect(setEducation)}
                                        selectedValue={education}
                                    />
                                </View>
                                <View style={styles.mb5}>
                                    <SearchSelect
                                        isRequired
                                        label="Ocupación"
                                        data={listOcupationType}
                                        placeholder="Selecciona una opción"
                                        onSelect={handleSelect(setOcupation)}
                                        selectedValue={ocupation}
                                    />
                                </View>
                            </>
                        )}
                        <View style={styles.mb5}>
                            <SearchSelect
                                isRequired
                                label="Ciudad de residencia"
                                data={listMunicipios}
                                placeholder="Selecciona una opción"
                                onSelect={handleSelect(setCiudMuni)}
                                selectedValue={ciudMuni}
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
                        {type !== '8' && (
                            <>
                                <View style={styles.mb5}>
                                    <CheckboxCustom 
                                        label="¿Es usted extranjero?"
                                        isRequired
                                        options={options}
                                        onSelect={handleSelectCheckBox}
                                        selectedValue={isExtranjero}
                                    />
                                </View>
                                {isExtranjero === '1' && (
                                    <View style={styles.mb5}>
                                        <SearchSelect
                                            isRequired
                                            label="Pais de nacimiento"
                                            data={listPaises}
                                            placeholder="Selecciona una opción"
                                            onSelect={handleSelect(setPaisNacimiento)}
                                            selectedValue={paisNacimiento}
                                        />
                                    </View>
                                )}
                            </>
                        )}
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