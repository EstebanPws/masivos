import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { styles } from "./basicInfoJuridica.styles";
import Inputs from "../../inputs/inputs";
import SearchSelect from "../../select/searchSelect/select";
import { listAssociationType } from "@/utils/listUtils";
import { formatDate, formatDateWithoutSlash, formatNames } from "@/utils/fomatDate";
import ButtonsPrimary from "../../buttons/buttonPrimary/button";
import { getData, setData } from "@/utils/storageUtils";
import { validateEmail, validatePhone, validateDocumentNumber} from "@/utils/validationForms";
import InfoModal from "@/components/modals/infoModal/infoModal";
import { AnimatePresence } from "moti";
import FadeInOut from "@/components/animations/fade/fadeInOut";
import TitleLine from "@/components/titleLine/titleLine";
import CheckboxCustom from "../../checkbox/checkbox";
import AddressDian from "../../addressDian/addressDian";

interface List {
    name: string;
    value: string;
}

interface BasicInfoJuridicaProps{
    listCiiu: List[] | null;
    listMunicipios: List[] | null;
    onSubmit: (data: any) => void;
}

export default function BasicInfoJuridica({listMunicipios,listCiiu,  onSubmit }: BasicInfoJuridicaProps) {
    const [nombreRazonJuridico, setNombreRazonJuridico] = useState('');
    const [sigla, setSigla] = useState('');
    const [nit, setNit] = useState('');
    const [tipoEmpJur, setTipoEmpJur] = useState(''); 
    const [ciuEmpreNeg, setCiuEmpreNeg] = useState('');
    const [direEmpreNeg, setDireEmpreNeg] = useState('');
    const [telEmpreNeg, setTelEmpreNeg] = useState('');
    const [numeroOficina, setNumeroOficina] = useState('');
    const [actiCiiu, setActiCiiu] = useState('');
    const [tipoSociedad, setTipoSociedad] = useState('');
    const [majoDineroEstado, setMajoDineroEstado] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [showError, setShowError] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [formData] = useState({
        entidad: '9011569983',
        oficina: '73',
        tipo_pers: '1',
        nombre_razon_juridico: '',
        sigla: '',
        nit: '',
        tipo_emp_jur: '',
        ciu_empre_neg: '',
        dire_empre_neg: '',
        tel_empre_neg: '',
        numero_oficina: '',
        acti_CIIU: '',
        tipo_sociedad: '',
        majo_dinero_estado: ''
    });

    const optionsEmp = [
        { label: 'Pública', value: '1' },
        { label: 'Privada', value: '2' },
        { label: 'Mixta', value: '3' }
    ];

    const options = [
        { label: 'SI', value: 'S' },
        { label: 'NO', value: 'N' }
    ];

    useEffect(() => {
        const allFieldsFilled = nombreRazonJuridico && nit && tipoEmpJur && direEmpreNeg && telEmpreNeg && numeroOficina && actiCiiu && tipoSociedad;
        
        setIsButtonEnabled(!!allFieldsFilled);
    }, [nombreRazonJuridico, nit, tipoEmpJur, direEmpreNeg, telEmpreNeg, numeroOficina, actiCiiu, tipoSociedad]);

    useEffect(() => {  
        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                setNombreRazonJuridico(savedData.nombre_razon_juridico);
                setSigla(savedData.sigla);
                setNit(savedData.nit);
                setTipoEmpJur(savedData.tipo_emp_jur);
                setCiuEmpreNeg(savedData.ciu_empre_neg);
                setDireEmpreNeg(savedData.dire_empre_neg);
                setTelEmpreNeg(savedData.tel_empre_neg);
                setNumeroOficina(savedData.numero_oficina);
                setActiCiiu(savedData.acti_CIIU);
                setTipoSociedad(savedData.tipo_sociedad);
                setMajoDineroEstado(savedData.majo_dinero_estado);
                setIsVisible(true);
            }
        };

        fetchFormData();
    }, []);

    const handleSelect = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
        setter(item.value);
    };

    const handleSubmit = () => {
        if (!validatePhone(numeroOficina)) {
            setMessageError("Número de celular no es válido. Debe tener 10 dígitos.");
            setShowError(true);
            return;
        }

        setIsVisible(false);


        const updatedFormData = { 
            ...formData, 
            nombre_razon_juridico: nombreRazonJuridico,
            sigla: sigla,
            nit: nit,
            tipo_emp_jur: tipoEmpJur,
            ciu_empre_neg: ciuEmpreNeg,
            dire_empre_neg: direEmpreNeg,
            tel_empre_neg: telEmpreNeg,
            numero_oficina: numeroOficina,
            acti_CIIU: actiCiiu,
            tipo_sociedad: tipoSociedad,
            majo_dinero_estado: majoDineroEstado
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

    const handleSelectCheckBox = (type: string) => (value: string) => {
        switch (type) {
          case 'tipoEmp': 
            setTipoEmpJur(value);
            break;
          case 'mjoDinero': 
            setMajoDineroEstado(value);
            break;
          default:
            break;
        }
      };

    return (
        <AnimatePresence>
            {isVisible && (
                <FadeInOut key="step0">
                    <View style={styles.containerForm}>
                        <TitleLine 
                            label="Infomarción de la empresa o negocio"
                        />
                        <View style={styles.mb5}>
                            <Inputs
                                label="Nombres o razón social"
                                placeholder="Escribe el nombre completo"
                                isSecureText={false}
                                isRequired={true}
                                keyboardType="default"
                                onChangeText={setNombreRazonJuridico}
                                value={nombreRazonJuridico}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <Inputs
                                label="Sigla"
                                placeholder="Escribe la sigla"
                                isSecureText={false}
                                isRequired={false}
                                keyboardType="default"
                                onChangeText={setSigla}
                                value={sigla}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <Inputs
                                label="Nit"
                                placeholder="Escribe tus apellidos completos"
                                isSecureText={false}
                                isRequired={true}
                                keyboardType="numeric"
                                onChangeText={setNit}
                                value={nit}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <CheckboxCustom 
                                label="Tipo de empresa o negocio"
                                isRequired
                                options={optionsEmp}
                                onSelect={handleSelectCheckBox('tipoEmp')}
                                selectedValue={tipoEmpJur}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <SearchSelect
                                isRequired
                                label="Ciudad"
                                data={listMunicipios}
                                placeholder="Seleccione una opción"
                                onSelect={handleSelect(setCiuEmpreNeg)}
                                selectedValue={ciuEmpreNeg}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <AddressDian 
                                label="Dirección" 
                                placeholder="Escribe tu dirección" 
                                onSelect={handleSelect(setDireEmpreNeg)} 
                                selectedValue={direEmpreNeg}
                                isRequired
                            />
                        </View>
                        <View style={styles.mb5}>
                            <Inputs
                                label="Número de telefono"
                                placeholder="Escribe tu número de telefono"
                                isSecureText={false}
                                isRequired={true}
                                keyboardType="numeric"
                                onChangeText={setTelEmpreNeg}
                                value={telEmpreNeg}
                                maxLength={10}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <Inputs
                                label="Número de celular"
                                placeholder="Escribe tu número de celular"
                                isSecureText={false}
                                isRequired={true}
                                keyboardType="numeric"
                                onChangeText={setNumeroOficina}
                                value={numeroOficina}
                                maxLength={10}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <SearchSelect
                                isRequired
                                label="Actividad economica"
                                data={listCiiu}
                                placeholder="Seleccione una opción"
                                onSelect={handleSelect(setActiCiiu)}
                                selectedValue={actiCiiu}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <SearchSelect
                                isRequired
                                label="Tipo de sociedad"
                                data={listAssociationType}
                                placeholder="Seleccione una opción"
                                onSelect={handleSelect(setTipoSociedad)}
                                selectedValue={tipoSociedad}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <CheckboxCustom 
                                label="¿Maneja Dinero del Estado?"
                                isRequired
                                options={options}
                                onSelect={handleSelectCheckBox('mjoDinero')}
                                selectedValue={majoDineroEstado}
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