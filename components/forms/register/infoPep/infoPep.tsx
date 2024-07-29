import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { styles } from "./infoPep.styles";
import Inputs from "@/components/forms/inputs/inputs";
import SearchSelect from "@/components/forms/select/searchSelect/select";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { getData, setData } from "@/utils/storageUtils";
import { AnimatePresence } from "moti";
import FadeInOut from "@/components/animations/fade/fadeInOut";
import AddressDian from "@/components/forms/addressDian/addressDian";
import CheckboxCustom from "../../checkbox/checkbox";
import TitleLine from "@/components/titleLine/titleLine";
import { listTaxesType } from "@/utils/listUtils";

interface List {
    name: string;
    value: string;
}

interface InfoPepProps{
    listMunicipios: List[] | null;
    onSubmit: (data: any) => void;
}

export default function InfoPep({listMunicipios , onSubmit }: InfoPepProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [expuPubli, setExpuPubli] = useState('');
    const [recoPubli, setRecoPubli] = useState('');
    const [direEstaPeps, setDireEstaPeps] = useState('');
    const [ciuEstaPeps, setCiuEstaPeps] = useState('');
    const [telEstaPeps, setTelEstaPeps] = useState(''); 
    const [famPepsnombres, setFamPepsnombres] = useState('');
    const [famPepsparen, setFamPepsparen] = useState('');
    const [famiPep, setFamiPep] = useState('');
    const [nombPep, setNombPep] = useState('');
    const [impuesSobVent, setImpuesSobVent] = useState('');
    const [impuesRenta, setImpuesRenta] = useState('');
    const [formData] = useState({
        Expu_publi: '',
        Reco_publi: '',
        dire_esta_PEPS: '',
        ciu_esta_PEPS: '',
        tel_esta_PEPS: '',
        fam_peps_nombres: '',
        fam_peps_paren: '',
        fami_PEP: '',
        nomb_PEP: '',
        impues_sob_vent: '',
        impues_renta: ''
    });

    const optionsDeclarante = [
        { label: 'SI', value: 'S' },
        { label: 'NO', value: 'N' }
    ];

    useEffect(() => {        
        let allFieldsFilled = expuPubli && recoPubli && impuesSobVent && impuesRenta;

        if (expuPubli === 'S' || recoPubli === 'S') {
            allFieldsFilled = allFieldsFilled && direEstaPeps && ciuEstaPeps && telEstaPeps && famPepsnombres && famPepsparen;
        }

        if (expuPubli === 'N' && recoPubli === 'N') {
            setDireEstaPeps('');
            setCiuEstaPeps('');
            setTelEstaPeps('');
            setFamPepsnombres('');
            setFamPepsparen('');
            setFamiPep('');
            setNombPep('');
        }

        setIsButtonEnabled(!!allFieldsFilled);

    }, [expuPubli, recoPubli, impuesSobVent, impuesRenta]);

    useEffect(() => {  
        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                setExpuPubli(savedData.Expu_publi);
                setRecoPubli(savedData.Reco_publi);
                setDireEstaPeps(savedData.dire_esta_PEPS);
                setCiuEstaPeps(savedData.ciu_esta_PEPS);
                setTelEstaPeps(savedData.tel_esta_PEPS);
                setFamPepsnombres(savedData.fam_peps_nombres);
                setFamPepsparen(savedData.fam_peps_paren);
                setFamiPep(savedData.fami_PEP);
                setNombPep(savedData.nomb_PEP);
                setImpuesSobVent(savedData.impues_sob_vent);
                setImpuesRenta(savedData.impues_renta);

                setIsVisible(true);
            }
        };

        fetchFormData();
    }, []);

    const handleSubmit = () => {
        setIsVisible(false);

        const updatedFormData = { 
            ...formData, 
            Expu_publi: expuPubli,
            Reco_publi: recoPubli,
            dire_esta_PEPS: direEstaPeps,
            ciu_esta_PEPS: ciuEstaPeps,
            tel_esta_PEPS: telEstaPeps,
            fam_peps_nombres: famPepsnombres,
            fam_peps_paren: famPepsparen,
            fami_PEP: famiPep,
            nomb_PEP: nombPep,
            impues_sob_vent: impuesSobVent,
            impues_renta: impuesRenta
        }; 

        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                const newUpdatedFormData = { ...savedData, ...updatedFormData };
                await setData('registrationForm', newUpdatedFormData); 
                const step = 3;
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

    const handleSelectCheckBox = (type: 'expuPubli' | 'recoPubli' | 'impuesSobVent') => (value: string) => {
        if (type === 'expuPubli') {
            setExpuPubli(value);
        } else if (type === 'impuesSobVent') {
            setImpuesSobVent(value);
        } else {
            setRecoPubli(value);
        }
    };
    return (
        <AnimatePresence>
            {isVisible && (
                <FadeInOut>
                    <View style={styles.containerForm}>
                        <TitleLine 
                            label="Información personas públicamente expuestas"
                        />
                        <View style={styles.mb5}>
                            <CheckboxCustom 
                                label="¿Es usted una Persona Políticamente Expuesta?"
                                isRequired
                                options={optionsDeclarante}
                                onSelect={handleSelectCheckBox('expuPubli')}
                                selectedValue={expuPubli}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <CheckboxCustom 
                                label="¿Goza Usted de Reconocimiento público?"
                                isRequired
                                options={optionsDeclarante}
                                onSelect={handleSelectCheckBox('recoPubli')}
                                selectedValue={recoPubli}
                            />
                        </View>
                        {(expuPubli === 'S' || recoPubli === 'S') &&(
                            <>
                                <TitleLine 
                                    label="Referencias Financieras"
                                />
                                <View style={styles.mb5}>
                                    <AddressDian 
                                        label="Dirección" 
                                        placeholder="Escribe tu dirección" 
                                        onSelect={handleSelect(setDireEstaPeps)} 
                                        selectedValue={direEstaPeps}
                                        isRequired
                                    />
                                </View>
                                <View style={styles.mb5}>
                                    <SearchSelect
                                        isRequired
                                        label="Ciudad"
                                        data={listMunicipios}
                                        placeholder="Seleccione una opción"
                                        onSelect={handleSelect(setCiuEstaPeps)}
                                        selectedValue={ciuEstaPeps}
                                    />
                                </View>
                                <View style={styles.mb5}>
                                    <Inputs
                                        label="Télefono o celular"
                                        placeholder="Escribe el télefono o celular"
                                        isSecureText={false}
                                        isRequired={true}
                                        keyboardType="numeric"
                                        onChangeText={setTelEstaPeps}
                                        value={telEstaPeps}
                                    />
                                </View>
                                <View style={styles.mb5}>
                                    <Inputs
                                        label="Nombre completo"
                                        placeholder="Escribe el nombre completo"
                                        isSecureText={false}
                                        isRequired={true}
                                        keyboardType="default"
                                        onChangeText={setFamPepsnombres}
                                        value={famPepsnombres}
                                    />
                                </View>
                                <View style={styles.mb5}>
                                    <Inputs
                                        label="Parentesco"
                                        placeholder="Escribe el parentesco con el PEP"
                                        isSecureText={false}
                                        isRequired={true}
                                        keyboardType="default"
                                        onChangeText={setFamPepsparen}
                                        value={famPepsparen}
                                    />
                                </View>
                            </>
                        )}
                        <TitleLine 
                            label="Impuesto sobre las ventas"
                        />
                        <View style={styles.mb5}>
                            <CheckboxCustom 
                                label="¿Responsable de IVA?"
                                isRequired
                                options={optionsDeclarante}
                                onSelect={handleSelectCheckBox('impuesSobVent')}
                                selectedValue={impuesSobVent}
                            />
                        </View>
                        <TitleLine 
                            label="Impuesto de renta"
                        />
                        <View style={styles.mb5}>
                            <SearchSelect
                                isRequired
                                label="Régimen al que pertenece"
                                data={listTaxesType}
                                placeholder="Seleccione una opción"
                                onSelect={handleSelect(setImpuesRenta)}
                                selectedValue={impuesRenta}
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