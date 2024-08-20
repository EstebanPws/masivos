import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { styles } from "./otherInfo.styles";
import Inputs from "@/components/forms/inputs/inputs";
import SearchSelect from "@/components/forms/select/searchSelect/select";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { getData, setData } from "@/utils/storageUtils";
import { AnimatePresence } from "moti";
import FadeInOut from "@/components/animations/fade/fadeInOut";
import AddressDian from "@/components/forms/addressDian/addressDian";
import CheckboxCustom from "../../checkbox/checkbox";
import TitleLine from "@/components/titleLine/titleLine";
import { listAutoTypes, listBienesType, listCurrencyType, listOperationType } from "@/utils/listUtils";

interface List {
    name: string;
    value: string;
}

interface OtherInfoProps{
    listMunicipios: List[] | null;
    listPaises: List[] | null;
    onSubmit: (data: any) => void;
}

export default function OtherInfo({listMunicipios, listPaises, onSubmit }: OtherInfoProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [tipoBienRaices, setTipoBienRaices] = useState('');
    const [direcBienRaices, setDirecBienRaices] = useState('');
    const [ciudBienRaices, setCiudBienRaices] = useState('');
    const [valorComerPropi, setValorComerPropi] = useState('');
    const [marcaVehicu, setMarcaVehicu] = useState(''); 
    const [modeVehicu, setModeVehicu] = useState('');
    const [noPlaca, setNoPlaca] = useState('');
    const [valorcomerVehicu, setValorcomerVehicu] = useState('');
    const [operaMonedaExtr, setOperaMonedaExtr] = useState('');
    const [tipoOpera, setTipoOpera] = useState('');
    const [nombEntidad, setNombEntidad] = useState('');
    const [numctaOperint, setNumctaOperint] = useState('');
    const [ciudOperaextr, setCiudOperaextr] = useState('');
    const [paisOperaextr, setPaisOperaextr] = useState('');
    const [moneda, setMoneda] = useState('');
    const [monto, setMonto] = useState('');
    const [nombRefPers, setNombRefPers] = useState('');
    const [direcRefPers, setDirecRefPers] = useState('');
    const [telRefPers, setTelRefPers] = useState('');
    const [ciuRefPers, setCiuRefPers] = useState('');
    const [isAuto, setIsAuto] = useState('');
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
        direc_ref_pers: '',
        tel_ref_pers: '',
        isAuto: ''
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
                setMarcaVehicu(savedData.marca_vehicu);
                setModeVehicu(savedData.mode_vehicu);
                setNoPlaca(savedData.no_placa);
                setValorcomerVehicu(savedData.Valor_comer_vehicu);
                setOperaMonedaExtr(savedData.opera_moneda_extr);
                setTipoOpera(savedData.tipo_opera);
                setNombEntidad(savedData.nomb_entidad);
                setNumctaOperint(savedData.num_cta_operint);
                setCiudOperaextr(savedData.ciud_opera_extr);
                setPaisOperaextr(savedData.pais_opera_extr);
                setMoneda(savedData.moneda);
                setMonto(savedData.monto);
                setNombRefPers(savedData.nomb_ref_pers);
                setDirecRefPers(savedData.direc_ref_pers);
                setTelRefPers(savedData.tel_ref_pers);
                setCiuRefPers(savedData.ciud_opera_extr);
                setIsAuto(savedData.isAuto);
                setIsVisible(true);
            }
        };

        fetchFormData();
    }, []);

    useEffect(() => {        
        const checkAllFieldsFilled = () => {
            let allFieldsFilled = tipoBienRaices && isAuto && operaMonedaExtr && nombRefPers && ciuRefPers &&direcRefPers && telRefPers;

            if (tipoBienRaices && tipoBienRaices !== '5') {
                allFieldsFilled = allFieldsFilled && direcBienRaices && ciudBienRaices && valorComerPropi;
            }

            if (isAuto === 'S') {
                allFieldsFilled = allFieldsFilled && marcaVehicu && modeVehicu && noPlaca && valorcomerVehicu;
            }

            if (operaMonedaExtr === 'S') {
                allFieldsFilled = allFieldsFilled && tipoOpera && nombEntidad && numctaOperint && ciudOperaextr && paisOperaextr && moneda && monto;
            }

            return allFieldsFilled;
        };

        setIsButtonEnabled(!!checkAllFieldsFilled());
    }, [tipoBienRaices, isAuto, operaMonedaExtr, nombRefPers, direcBienRaices, ciudBienRaices, valorComerPropi, marcaVehicu, modeVehicu, noPlaca, valorcomerVehicu, tipoOpera, nombEntidad, numctaOperint, ciudOperaextr, paisOperaextr, moneda, monto, ciuRefPers, direcRefPers, telRefPers]);

    useEffect(() => {
        if (isInitial) {
            if (tipoBienRaices === '5') {
                setDirecBienRaices('');
                setCiudBienRaices('');
                setValorComerPropi('0');
            }

            if (isAuto !== 'S') {
                setMarcaVehicu('');
                setModeVehicu('');
                setNoPlaca('');
                setValorcomerVehicu('0');
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
        setIsVisible(false);

        const updatedFormData = { 
            ...formData, 
            tipo_bien_raices: tipoBienRaices,
            direc_bien_raices: direcBienRaices,
            ciud_bien_raices: ciudBienRaices,
            valor_comer_propi: valorComerPropi,
            marca_vehicu: marcaVehicu,
            mode_vehicu: modeVehicu,
            no_placa: noPlaca,
            Valor_comer_vehicu: valorcomerVehicu,
            opera_moneda_extr: operaMonedaExtr,
            tipo_opera: tipoOpera,
            nomb_entidad: nombEntidad,
            num_cta_operint: numctaOperint,
            ciud_opera_extr: ciudOperaextr,
            pais_opera_extr: paisOperaextr,
            moneda: moneda,
            monto: monto,
            nomb_ref_pers: nombRefPers,
            ciu_ref_pers: ciuRefPers,
            direc_ref_pers: direcRefPers,
            tel_ref_pers: telRefPers,
            isAuto: isAuto
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
        if (type === 'auto') {
            setIsAuto(value);
        }  else {
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
                                data={listBienesType}
                                placeholder="Seleccione una opción"
                                onSelect={handleSelect(setTipoBienRaices)}
                                selectedValue={tipoBienRaices}
                            />
                        </View>
                        {(tipoBienRaices && tipoBienRaices !== '5') &&(
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
                                        placeholder="Seleccione una opción"
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
                            label="Descripción de vehículos"
                        />
                        <View style={styles.mb5}>
                            <CheckboxCustom 
                                label="¿Posee algún vehículo?"
                                isRequired
                                options={optionsDeclarante}
                                onSelect={handleSelectCheckBox('auto')}
                                selectedValue={isAuto}
                            />
                        </View>
                        {isAuto === 'S' &&(
                            <>
                                 <View style={styles.mb5}>
                                    <SearchSelect
                                        isRequired
                                        label="Marca"
                                        data={listAutoTypes}
                                        placeholder="Seleccione una opción"
                                        onSelect={handleSelect(setMarcaVehicu)}
                                        selectedValue={marcaVehicu}
                                    />
                                </View>
                                <View style={styles.mb5}>
                                    <Inputs
                                        label="Modelo"
                                        placeholder="Ej: 2024, 2023, etc."
                                        isSecureText={false}
                                        isRequired={true}
                                        keyboardType="numeric"
                                        onChangeText={setModeVehicu}
                                        value={modeVehicu}
                                        maxLength={4}
                                    />
                                </View>
                                <View style={styles.mb5}>
                                    <Inputs
                                        label="Número de placa"
                                        placeholder="Ej: ABC123, DEF456, etc."
                                        isSecureText={false}
                                        isRequired={true}
                                        keyboardType="default"
                                        onChangeText={setNoPlaca}
                                        value={noPlaca}
                                        maxLength={6}
                                    />
                                </View>
                                <View style={styles.mb5}>
                                    <Inputs
                                        label="Valor comercial del vehículo"
                                        placeholder="Escribe el valor comercial de tu vehículo"
                                        isSecureText={false}
                                        isRequired={true}
                                        keyboardType="numeric"
                                        onChangeText={setValorcomerVehicu}
                                        value={valorcomerVehicu}
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
                                    placeholder="Seleccione una opción"
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
                                    placeholder="Seleccione una opción"
                                    onSelect={handleSelect(setCiudOperaextr)}
                                    selectedValue={ciudOperaextr}
                                />
                            </View>
                            <View style={styles.mb5}>
                                <SearchSelect
                                    isRequired
                                    label="Pais"
                                    data={listPaises}
                                    placeholder="Seleccione una opción"
                                    onSelect={handleSelect(setPaisOperaextr)}
                                    selectedValue={paisOperaextr}
                                />
                            </View>
                            <View style={styles.mb5}>
                                <SearchSelect
                                    isRequired
                                    label="Moneda"
                                    data={listCurrencyType}
                                    placeholder="Seleccione una opción"
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
                            <SearchSelect
                                isRequired
                                label="Ciudad"
                                data={listMunicipios}
                                placeholder="Seleccione una opción"
                                onSelect={handleSelect(setCiuRefPers)}
                                selectedValue={ciuRefPers}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <AddressDian 
                                label="Dirección" 
                                placeholder="Escribe la dirección" 
                                onSelect={handleSelect(setDirecRefPers)} 
                                selectedValue={direcRefPers}
                                isRequired
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
                </FadeInOut>
            )}
        </AnimatePresence>
    );
}