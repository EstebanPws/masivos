import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { styles } from "./infoWorking.styles";
import Inputs from "@/components/forms/inputs/inputs";
import SearchSelect from "@/components/forms/select/searchSelect/select";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { getData, setData } from "@/utils/storageUtils";
import { AnimatePresence } from "moti";
import FadeInOut from "@/components/animations/fade/fadeInOut";
import AddressDian from "@/components/forms/addressDian/addressDian";
import CheckboxCustom from "../../checkbox/checkbox";
import TitleLine from "@/components/titleLine/titleLine";
import DateSelect from "../../select/dateSelect/dateSelect";
import { formatDate, formatDateWithoutSlash } from "@/utils/fomatDate";
import InfoModal from "@/components/modals/infoModal/infoModal";
import { formatCurrency, validateNumber, validatePhone } from "@/utils/validationForms";

interface List {
    name: string;
    value: string;
}

interface InfoWorkingProps{
    type?: number;
    listMunicipios: List[] | null;
    listCiiu: List[] | null;
    onSubmit: (data: any) => void;
}

export default function InfoWorking({type = 0, listMunicipios, listCiiu, onSubmit }: InfoWorkingProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [actiCiiu, setActiCiiu] = useState('');
    const [descCiiu, setDescCiiu] = useState('');
    const [nomEmpreNeg, setNomEmpreNeg] = useState('');
    const [ciuEmpreNeg, setCiuEmpreNeg] = useState('');
    const [telEmpreNeg, setTelEmpreNeg] = useState('');
    const [cargo, setCargo] = useState('');
    const [mesInfoFinan, setMesInfoFinan] = useState('');
    const [declarante, setDeclarante] = useState('');
    const [ingreMes, setIngreMes] = useState('');
    const [otroIngre, setOtroIngre] = useState('');
    const [totalIngre, setTotalIngre] = useState('');
    const [totalEgreso, setTotalEgreso] = useState('');
    const [desOtrosIngresos, setDesOtrosIngresos] = useState('');
    const [totalActivo, setTotalActivo] = useState('');
    const [totalPasivo, setTotalPasivo] = useState('');
    const [messageError, setMessageError] = useState('');
    const [showError, setShowError] = useState(false);
    const [showCiiu, setShowCiiu] = useState(false);
    const [formData] = useState({
        Nom_empre_neg: '',
        cargo: '',
        declarante: '',
        ingre_mes: '',
        total_ingre: '',
        total_engreso: '',
        total_activo: '',
        total_pasivo: ''
    });

    const optionsDeclarante = [
        { label: 'SI', value: 'S' },
        { label: 'NO', value: 'N' }
    ];

    useEffect(() => {    
        let  allFieldsFilled = type !== 1 ? actiCiiu && mesInfoFinan && declarante && ingreMes && totalIngre && totalEgreso && totalActivo && totalPasivo : mesInfoFinan && ingreMes && otroIngre && totalIngre && totalEgreso && totalActivo && totalPasivo;

        if (type !== 1 && actiCiiu === '' || actiCiiu === '0010') {
            allFieldsFilled = actiCiiu && nomEmpreNeg && ciuEmpreNeg && telEmpreNeg && cargo && mesInfoFinan && declarante && ingreMes && totalIngre && totalEgreso && totalActivo && totalPasivo;
        }
        
        setIsButtonEnabled(!!allFieldsFilled);
    }, [actiCiiu, nomEmpreNeg, ciuEmpreNeg, telEmpreNeg, cargo, mesInfoFinan, declarante, ingreMes, otroIngre, totalIngre, totalEgreso, totalActivo, totalPasivo]);

    useEffect(() => {  
        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                if(type !== 1) {
                    setShowCiiu(savedData.acti_CIIU === "" ? true : false);
                    setActiCiiu(savedData.acti_CIIU);
                    setDescCiiu(savedData.desc_CIIU);
                    setNomEmpreNeg(savedData.Nom_empre_neg);
                    setCiuEmpreNeg(savedData.ciu_empre_neg);
                    setTelEmpreNeg(savedData.tel_empre_neg);
                    setCargo(actiCiiu === '' || actiCiiu === '0010' ? savedData.cargo : savedData.desc_CIIU);
                    setDeclarante(savedData.declarante);
                }
                setMesInfoFinan(savedData.mes_info_finan);
                setIngreMes(type !== 1 ? savedData.ingre_mes : savedData.r_l_ingresos_mens);
                setOtroIngre(type !== 1 ? savedData.otro_ingre : savedData.r_l_vrlr_otros_in);
                if(type === 1){
                    setTotalIngre(savedData.total_ingre);
                    setDesOtrosIngresos(savedData.des_otros_ingresos);
                }
                setTotalEgreso(type !== 1 ? savedData.total_engreso : savedData.r_l_vrlr_egresos);
                setTotalActivo(type !== 1 ? savedData.total_activo : savedData.r_l_vr_tot_acti);
                setTotalPasivo(type !== 1 ? savedData.total_pasivo : savedData.r_l_vr_tot_pasi);

                setIsVisible(true);
            }
        };

        fetchFormData();
    }, []);

    useEffect(() => {       
        const formatIngreMes = validateNumber(ingreMes ? ingreMes : '$ 0');
        const formatOtroIngre = validateNumber(otroIngre ? otroIngre : '$ 0');
        const total = Number(formatIngreMes) + Number(formatOtroIngre);
        
        setTotalIngre(formatCurrency(total ? total : "$0"));
    }, [ingreMes, otroIngre]);

    const handleSubmit = () => {
        if(type !== 1){
            if(actiCiiu !== '0020' && actiCiiu !== '9700' && actiCiiu !== '8522') {
                if (!validatePhone(telEmpreNeg)) {
                    setMessageError("Número de celular o télefono de la empresa no es válido. Debe tener 10 dígitos.");
                    setShowError(true);
                    return;
                }
            }
        }
        
        if(parseInt(totalIngre.replace(/[^0-9]/g, ''), 10) < 650000){
            setMessageError('El total de ingresos no puede ser menor a $ 650.000');
            setShowError(true);
            return;
        }

        if(parseInt(totalActivo.replace(/[^0-9]/g, ''), 10) < 650000){
            setMessageError('El total de los activos no puede ser menor a $ 650.000');
            setShowError(true);
            return;
        }

        setIsVisible(false);

        const updatedFormData = type !== 1 ? { 
            ...formData, 
            acti_CIIU: actiCiiu,
            desc_CIIU: descCiiu,
            Nom_empre_neg: actiCiiu === '0020' || actiCiiu === '9700' || actiCiiu === '8522' ? "No reporta" : nomEmpreNeg,
            ciu_empre_neg: actiCiiu === '0020' || actiCiiu === '9700' || actiCiiu === '8522' ? "11001" : ciuEmpreNeg,
            dire_empre_neg: 'No reporta',
            tel_empre_neg: telEmpreNeg,
            cargo: actiCiiu === '' || actiCiiu === '0010' ? cargo : descCiiu,
            mes_info_finan: formatDateWithoutSlash(mesInfoFinan),
            declarante: declarante,
            ingre_mes: ingreMes,
            total_ingre: totalIngre,
            total_engreso: totalEgreso,
            total_activo: totalActivo,
            total_pasivo: totalPasivo
        } : {
            ...formData,
            mes_info_finan: formatDateWithoutSlash(mesInfoFinan),
            declarante: 'N',
            r_l_ingresos_mens: ingreMes,
            r_l_vrlr_otros_in: otroIngre,
            total_ingre: totalIngre,
            r_l_vrlr_egresos: totalEgreso,
            des_otros_ingresos: desOtrosIngresos,
            r_l_vr_tot_acti: totalActivo,
            r_l_vr_tot_pasi: totalPasivo
        }; 

        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                const newUpdatedFormData = { ...savedData, ...updatedFormData };
                await setData('registrationForm', newUpdatedFormData); 
                const step = 2;
                const data = {
                    step
                };
                onSubmit(data);  
            }
        };
    
        fetchFormData();
    };

    const handleSelectCiiu = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
        setActiCiiu(item.value);
        setDescCiiu(item.name);
    };

    const handleSelect = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
        setter(item.value);
    };

    const handleSelectCheckBox = (value: string) =>{
        if (value === 'S' || value === 'N') {
            setDeclarante(value);
        }
    };

    const handleDateSelect = (setter: { (value: React.SetStateAction<string>): void }) => (date: any) => {
        setter(formatDate(date));
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <FadeInOut>
                    <View style={styles.containerForm}>
                        {type !== 1 && (
                            <>
                                {(actiCiiu === '' || actiCiiu === '0010') && (
                                    <TitleLine 
                                        label="Información laboral"
                                    />
                                )}
                                {(showCiiu) && (
                                    <View style={styles.mb5}>
                                        <SearchSelect
                                            isRequired
                                            label="Actividad economica"
                                            data={listCiiu}
                                            placeholder="Seleccione una opción"
                                            onSelect={handleSelectCiiu(setActiCiiu)}
                                            selectedValue={actiCiiu}
                                        />
                                    </View>
                                )}
                                {(actiCiiu === '' || actiCiiu === '0010') && (
                                    <>
                                        <View style={styles.mb5}>
                                            <Inputs
                                                label="Nombre de la empresa o negocio"
                                                placeholder="Escribe el nombre de empresa o negocio"
                                                isSecureText={false}
                                                isRequired={true}
                                                keyboardType="default"
                                                onChangeText={setNomEmpreNeg}
                                                value={nomEmpreNeg}
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
                                            <Inputs
                                                label="Número de télefono de la empresa"
                                                placeholder="Escribe el número de télefono"
                                                isSecureText={false}
                                                isRequired={true}
                                                keyboardType="numeric"
                                                maxLength={10}
                                                onChangeText={setTelEmpreNeg}
                                                value={telEmpreNeg}
                                            />
                                        </View>
                                        <View style={styles.mb5}>
                                            <Inputs
                                                label="Cargo"
                                                placeholder="Escribe el cargo en tu empresa"
                                                isSecureText={false}
                                                isRequired={true}
                                                keyboardType="default"
                                                onChangeText={setCargo}
                                                value={cargo}
                                            />
                                        </View>
                                    </>
                                )}
                            </>
                        )}
                        <TitleLine 
                            label="Información financiera"
                        />
                        <View style={styles.mb5}>
                            <DateSelect
                                isRequired
                                label="Mes y año de corte de la información financiera suministradas"
                                placeholder="Seleccione una opción"
                                onSelect={handleDateSelect(setMesInfoFinan)}
                                value={mesInfoFinan}
                            />
                        </View>
                        {type === 0 && (
                            <View style={styles.mb5}>
                                <CheckboxCustom 
                                    label="¿Es declarante?"
                                    isRequired
                                    options={optionsDeclarante}
                                    onSelect={handleSelectCheckBox}
                                    selectedValue={declarante}
                                />
                            </View>
                        )}
                        <View style={styles.mb5}>
                            <Inputs
                                label="Ingresos fijos mensuales"
                                placeholder="Escribe tus ingresos fijos mensuales"
                                isSecureText={false}
                                isRequired={true}
                                keyboardType="numeric"
                                onChangeText={setIngreMes}
                                value={ingreMes}
                                isCurrency
                            />
                        </View>
                        {type === 1 && (
                             <>
                                <View style={styles.mb5}>
                                    <Inputs
                                        label="Otros ingresos mensuales"
                                        placeholder="Escribe tus otros ingresos mensuales"
                                        isSecureText={false}
                                        isRequired={true}
                                        keyboardType="numeric"
                                        onChangeText={setOtroIngre}
                                        value={otroIngre}
                                        isCurrency
                                    />
                                </View>
                                <View style={styles.mb5}>
                                    <Inputs
                                        label="Descripción otros ingresos:"
                                        placeholder="Escribe el concepto de tus egresos"
                                        isSecureText={false}
                                        isRequired={false}
                                        keyboardType="default"
                                        onChangeText={setDesOtrosIngresos}
                                        value={desOtrosIngresos}
                                    />
                                </View>
                             </>
                        )}
                        <View style={styles.mb5}>
                            <Inputs
                                label="Total ingresos mensuales"
                                placeholder="Escribe el total ingresos mensuales"
                                isSecureText={false}
                                isRequired={true}
                                keyboardType="numeric"
                                onChangeText={setTotalIngre}
                                value={totalIngre}
                                isCurrency
                                readonly
                            />
                        </View>
                        <View style={styles.mb5}>
                            <Inputs
                                label="Total egresos mensuales"
                                placeholder="Escribe el total egresos mensuales"
                                isSecureText={false}
                                isRequired={true}
                                keyboardType="numeric"
                                onChangeText={setTotalEgreso}
                                value={totalEgreso}
                                isCurrency
                            />
                        </View>
                        <View style={styles.mb5}>
                            <Inputs
                                label="Total activos"
                                placeholder="Escribe el total de activos"
                                isSecureText={false}
                                isRequired={true}
                                keyboardType="numeric"
                                onChangeText={setTotalActivo}
                                value={totalActivo}
                                isCurrency
                            />
                        </View>
                        <View style={styles.mb5}>
                            <Inputs
                                label="Total Pasivos"
                                placeholder="Escribe el total de pasivos"
                                isSecureText={false}
                                isRequired={true}
                                keyboardType="numeric"
                                onChangeText={setTotalPasivo}
                                value={totalPasivo}
                                isCurrency
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