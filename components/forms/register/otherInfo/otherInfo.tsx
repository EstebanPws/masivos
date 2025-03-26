import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styles from "./otherInfo.styles";
import Inputs from "@/components/forms/inputs/inputs";
import SearchSelect from "@/components/forms/select/searchSelect/select";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { getData, setData } from "@/utils/storageUtils";
import { AnimatePresence } from "moti";
import FadeInOut from "@/components/animations/fade/fadeInOut";
import AddressDian from "@/components/forms/addressDian/addressDian";
import CheckboxCustom from "../../checkbox/checkbox";
import TitleLine from "@/components/titleLine/titleLine";
import {listBienesJurType, listBienesType, listCurrencyType, listOperationType } from "@/utils/listUtils";
import InfoModal from "@/components/modals/infoModal/infoModal";
import { validatePhone } from "@/utils/validationForms";

interface List {
    name: string;
    value: string;
}

interface OtherInfoProps{
    type?: number;
    listMunicipios: List[] | null;
    listPaises: List[] | null;
    onSubmit: (data: any) => void;
}

export default function OtherInfo({type = 0, listMunicipios, listPaises, onSubmit }: OtherInfoProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [tipoBienRaices, setTipoBienRaices] = useState('');
    const [direcBienRaices, setDirecBienRaices] = useState('');
    const [ciudBienRaices, setCiudBienRaices] = useState('');
    const [valorComerPropi, setValorComerPropi] = useState('');
    const [operaMonedaExtr, setOperaMonedaExtr] = useState('');
    const [tipoOpera, setTipoOpera] = useState('');
    const [nombEntidad, setNombEntidad] = useState('');
    const [numctaOperint, setNumctaOperint] = useState('');
    const [ciudOperaextr, setCiudOperaextr] = useState('');
    const [paisOperaextr, setPaisOperaextr] = useState('');
    const [moneda, setMoneda] = useState('');
    const [monto, setMonto] = useState('');
    const [nombRefPers, setNombRefPers] = useState('');
    const [telRefPers, setTelRefPers] = useState('');
    const [messageError, setMessageError] = useState('');
    const [showError, setShowError] = useState(false);
    const [isInitial, setIsInitial] = useState(false);
    const [formData] = useState({
        tipo_bien_raices: '0',
        direc_bien_raices: '',
        ciud_bien_raices: '',
        valor_comer_propi: '0',
        marca_vehicu: '',
        mode_vehicu: '',
        no_placa: '',
        Valor_comer_vehicu: '0',
        opera_moneda_extr: '',
        tipo_opera: '',
        nomb_entidad: '',
        num_cta_operint: '',
        ciud_opera_extr: '',
        pais_opera_extr: '',
        moneda: '0',
        monto: '0',
        nomb_ref_pers: '',
        tel_ref_pers: ''
    });

    const optionsDeclarante = [
        { label: 'SI', value: 'S' },
        { label: 'NO', value: 'N' }
    ];

    useEffect(() => {  
        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            
            if (savedData) {
                setTipoBienRaices(savedData.tipo_bien_raices);
                setDirecBienRaices(savedData.direc_bien_raices);
                setCiudBienRaices(savedData.ciud_bien_raices);
                setValorComerPropi(savedData.valor_comer_propi);
                setOperaMonedaExtr(savedData.opera_moneda_extr);
                setTipoOpera(savedData.tipo_opera);
                setNombEntidad(savedData.nomb_entidad);
                setNumctaOperint(savedData.num_cta_operint);
                setCiudOperaextr(savedData.ciud_opera_extr);
                setPaisOperaextr(savedData.pais_opera_extr);
                setMoneda(savedData.moneda);
                setMonto(savedData.monto);
                setNombRefPers(savedData.nomb_ref_pers);
                setTelRefPers(savedData.tel_ref_pers);
                setIsVisible(true);
            }
        };

        fetchFormData();
    }, []);

    useEffect(() => {        
        const checkAllFieldsFilled = () => {
            let allFieldsFilled = tipoBienRaices && operaMonedaExtr && nombRefPers && telRefPers;

            if (tipoBienRaices && tipoBienRaices !== '0') {
                allFieldsFilled = allFieldsFilled && direcBienRaices && ciudBienRaices && valorComerPropi;
            }

            if (operaMonedaExtr === 'S') {
                allFieldsFilled = allFieldsFilled && tipoOpera && nombEntidad && numctaOperint && ciudOperaextr && paisOperaextr && moneda && monto;
            }

            return allFieldsFilled;
        };

        setIsButtonEnabled(!!checkAllFieldsFilled());
    }, [tipoBienRaices, operaMonedaExtr, nombRefPers, direcBienRaices, ciudBienRaices, valorComerPropi, tipoOpera, nombEntidad, numctaOperint, ciudOperaextr, paisOperaextr, moneda, monto, telRefPers]);

    useEffect(() => {
        if (isInitial) {
            if (tipoBienRaices === '0') {
                setDirecBienRaices('');
                setCiudBienRaices('');
                setValorComerPropi('0');
            }

            if (operaMonedaExtr !== 'S') {
                setTipoOpera('');
                setNombEntidad('');
                setNumctaOperint('');
                setCiudOperaextr('');
                setPaisOperaextr('');
                setMoneda('0');
                setMonto('0');
            }
        }
    }, [isInitial]);

    const handleSubmit = () => {

        if (tipoBienRaices && tipoBienRaices !== '0' && parseInt(valorComerPropi.replace(/[^0-9]/g, ''), 10) < 2600000) {
            setMessageError('El valor comercial de la propiedad no puede ser menor a 2 SMMLV.');
            setShowError(true);
            return;
        }

        if (!validatePhone(telRefPers)) {
            setMessageError("Número de celular o télefono de la referencia personal no es válido. Debe tener 10 dígitos.");
            setShowError(true);
            return;
        }

        if (nombRefPers.length < 6) {
            setMessageError("El nombre de la referencia debe tener mínimo 6 carácteres.");
            setShowError(true);
            return;
        }

        setIsVisible(false);

        const updatedFormData = { 
            ...formData, 
            tipo_bien_raices: tipoBienRaices,
            direc_bien_raices: direcBienRaices,
            ciud_bien_raices: ciudBienRaices,
            valor_comer_propi: valorComerPropi,
            opera_moneda_extr: operaMonedaExtr,
            tipo_opera: tipoOpera,
            nomb_entidad: nombEntidad,
            num_cta_operint: numctaOperint,
            ciud_opera_extr: ciudOperaextr,
            pais_opera_extr: paisOperaextr,
            moneda: moneda,
            monto: monto,
            nomb_ref_pers: nombRefPers,
            direc_ref_pers: "No reporta",
            tel_ref_pers: telRefPers,
        }; 

        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                const newUpdatedFormData = { ...savedData, ...updatedFormData };
                await setData('registrationForm', newUpdatedFormData); 
                const step = 4;
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

    const handleSelectCheckBox = (type: 'auto' | 'operacion') => (value: string) => {
        if (type === 'operacion') {
            setOperaMonedaExtr(value);
        }

        setIsInitial(!isInitial);
    };
    return (
        <AnimatePresence>
            {isVisible && (
                <FadeInOut>
                    <View style={styles.containerForm}>
                        <TitleLine 
                            label="Descripción de bienes raíces"
                        />
                        <View style={styles.mb5}>
                            <SearchSelect
                                isRequired
                                label="Tipo"
                                data={type === 1 ? listBienesJurType : listBienesType}
                                placeholder="Selecciona una opción"
                                onSelect={handleSelect(setTipoBienRaices)}
                                selectedValue={tipoBienRaices}
                            />
                        </View>
                        {(tipoBienRaices && tipoBienRaices !== '0') &&(
                            <>
                                <View style={styles.mb5}>
                                    <AddressDian 
                                        label="Dirección" 
                                        placeholder="Escribe tu dirección" 
                                        onSelect={handleSelect(setDirecBienRaices)} 
                                        selectedValue={direcBienRaices}
                                        isRequired
                                    />
                                </View>
                                <View style={styles.mb5}>
                                    <SearchSelect
                                        isRequired
                                        label="Ciudad"
                                        data={listMunicipios}
                                        placeholder="Selecciona una opción"
                                        onSelect={handleSelect(setCiudBienRaices)}
                                        selectedValue={ciudBienRaices}
                                    />
                                </View>
                                <View style={styles.mb5}>
                                    <Inputs
                                        label="Valor comercial de propiedad"
                                        placeholder="Escribe el valor comercial de la propiedad"
                                        isSecureText={false}
                                        isRequired={true}
                                        keyboardType="numeric"
                                        onChangeText={setValorComerPropi}
                                        value={valorComerPropi}
                                        isCurrency
                                    />
                                </View>
                            </>
                        )}
                        <TitleLine 
                            label="Operaciones internacionales"
                        />
                        <View style={styles.mb5}>
                            <CheckboxCustom 
                                label="¿Realiza operaciones en el extranjero?"
                                isRequired
                                options={optionsDeclarante}
                                onSelect={handleSelectCheckBox('operacion')}
                                selectedValue={operaMonedaExtr}
                            />
                        </View>
                        {operaMonedaExtr === 'S' &&(
                            <>
                            <View style={styles.mb5}>
                                <SearchSelect
                                    isRequired
                                    label="Tipo de operación"
                                    data={listOperationType}
                                    placeholder="Selecciona una opción"
                                    onSelect={handleSelect(setTipoOpera)}
                                    selectedValue={tipoOpera}
                                />
                            </View>
                            <View style={styles.mb5}>
                                <Inputs
                                    label="Nombre de la entidad"
                                    placeholder="Escribe el nombre de la entidad"
                                    isSecureText={false}
                                    isRequired={true}
                                    keyboardType="default"
                                    onChangeText={setNombEntidad}
                                    value={nombEntidad}
                                />
                            </View>
                            <View style={styles.mb5}>
                                <Inputs
                                    label="Número de cuenta"
                                    placeholder="Escribe el número de cuenta"
                                    isSecureText={false}
                                    isRequired={true}
                                    keyboardType="numeric"
                                    onChangeText={setNumctaOperint}
                                    value={numctaOperint}
                                />
                            </View>
                            <View style={styles.mb5}>
                                <SearchSelect
                                    isRequired
                                    label="Ciudad"
                                    data={listMunicipios}
                                    placeholder="Selecciona una opción"
                                    onSelect={handleSelect(setCiudOperaextr)}
                                    selectedValue={ciudOperaextr}
                                />
                            </View>
                            <View style={styles.mb5}>
                                <SearchSelect
                                    isRequired
                                    label="Pais"
                                    data={listPaises}
                                    placeholder="Selecciona una opción"
                                    onSelect={handleSelect(setPaisOperaextr)}
                                    selectedValue={paisOperaextr}
                                />
                            </View>
                            <View style={styles.mb5}>
                                <SearchSelect
                                    isRequired
                                    label="Moneda"
                                    data={listCurrencyType}
                                    placeholder="Selecciona una opción"
                                    onSelect={handleSelect(setMoneda)}
                                    selectedValue={moneda}
                                />
                            </View>
                            <View style={styles.mb5}>
                                <Inputs
                                    label="Monto"
                                    placeholder="Escribe el monto"
                                    isSecureText={false}
                                    isRequired={true}
                                    keyboardType="numeric"
                                    onChangeText={setMonto}
                                    value={monto}
                                    isCurrency
                                />
                            </View>
                            </>
                        )}
                        <TitleLine 
                            label="Referencias"
                        />
                        <View style={styles.mb5}>
                            <Inputs
                                label="Nombre completo"
                                placeholder="Escribe el nombre completo"
                                isSecureText={false}
                                isRequired={true}
                                keyboardType="default"
                                onChangeText={setNombRefPers}
                                value={nombRefPers}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <Inputs
                                label="Télefono o Celular"
                                placeholder="Escribe el télefono o celular de contacto"
                                isSecureText={false}
                                isRequired={true}
                                keyboardType="numeric"
                                onChangeText={setTelRefPers}
                                value={telRefPers}
                                maxLength={10}
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
                    {showError && (
                        <InfoModal
                            isVisible={showError}
                            type="info"
                            message={messageError}
                            onPress={() => setShowError(false)}
                        />
                    )}
                </FadeInOut>
            )}
        </AnimatePresence>
    );
}