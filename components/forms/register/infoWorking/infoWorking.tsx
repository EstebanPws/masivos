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
import { formatDate } from "@/utils/fomatDate";

interface List {
    name: string;
    value: string;
}

interface InfoWorkingProps{
    type?: number;
    listMunicipios: List[] | null;
    listCiiu: List[] | null;
    listProfesiones: List[] | null;
    onSubmit: (data: any) => void;
}

export default function InfoWorking({type = 0, listMunicipios, listCiiu, listProfesiones, onSubmit }: InfoWorkingProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [actiCiiu, setActiCiiu] = useState('');
    const [descCiiu, setDescCiiu] = useState('');
    const [profesion, setProfesion] = useState('');
    const [nomEmpreNeg, setNomEmpreNeg] = useState('');
    const [tipoEmpNeg, setTipoEmpNeg] = useState(''); 
    const [ciuEmpreNeg, setCiuEmpreNeg] = useState('');
    const [direEmpreNeg, setDireEmpreNeg] = useState('');
    const [cargo, setCargo] = useState('');
    const [mesInfoFinan, setMesInfoFinan] = useState('');
    const [declarante, setDeclarante] = useState('');
    const [ingreMes, setIngreMes] = useState('');
    const [otroIngre, setOtroIngre] = useState('');
    const [totalIngre, setTotalIngre] = useState('');
    const [totalEgreso, setTotalEgreso] = useState('');
    const [desOtrosIngresos, setDesOtrosIngresos] = useState('');
    const [ingreAdic, setIngreAdic] = useState('');
    const [totalActivo, setTotalActivo] = useState('');
    const [totalPasivo, setTotalPasivo] = useState('');
    const [formData] = useState({
        acti_CIIU: '',
        desc_CIIU: '',
        profesion: '',
        Nom_empre_neg: '',
        Tipo_emp_neg: '',
        ciu_empre_neg: '',
        dire_empre_neg: '',
        cargo: '',
        mes_info_finan: '',
        declarante: '',
        ingre_mes: '',
        otro_ingre: '',
        total_ingre: '',
        total_engreso: '',
        des_otros_ingresos: '',
        ingre_adic: '',
        total_activo: '',
        total_pasivo: ''
    });

    const options = [
        { label: 'Pública', value: '1' },
        { label: 'Privada', value: '2' },
        { label: 'Mixta', value: '3' },
        { label: 'No reporta', value: '4' }
    ];

    const optionsDeclarante = [
        { label: 'SI', value: 'S' },
        { label: 'NO', value: 'N' }
    ];

    useEffect(() => {
        const allFieldsFilled = type !== 1 ? actiCiiu && profesion && nomEmpreNeg && tipoEmpNeg && ciuEmpreNeg && direEmpreNeg && cargo && mesInfoFinan && declarante && ingreMes && otroIngre && totalIngre && totalEgreso && ingreAdic && totalActivo && totalPasivo : mesInfoFinan && declarante && ingreMes && otroIngre && totalIngre && totalEgreso && ingreAdic && totalActivo && totalPasivo;
        
        setIsButtonEnabled(!!allFieldsFilled);
    }, [actiCiiu, profesion, nomEmpreNeg, tipoEmpNeg, ciuEmpreNeg, direEmpreNeg, cargo, mesInfoFinan, declarante, ingreMes, otroIngre, totalIngre, totalEgreso, ingreAdic, totalActivo,
        totalPasivo]);

    useEffect(() => {  
        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                if(type !== 1) {
                    setActiCiiu(savedData.acti_CIIU);
                    setDescCiiu(savedData.desc_CIIU);
                    setProfesion(savedData.profesion);
                    setNomEmpreNeg(savedData.Nom_empre_neg);
                    setTipoEmpNeg(savedData.Tipo_emp_neg);
                    setCiuEmpreNeg(savedData.ciu_empre_neg);
                    setDireEmpreNeg(savedData.dire_empre_neg);
                    setCargo(savedData.cargo);
                }
                setMesInfoFinan(savedData.mes_info_finan);
                setDeclarante(savedData.declarante);
                setIngreMes(type !== 1 ? savedData.ingre_mes : savedData.r_l_ingresos_mens);
                setOtroIngre(type !== 1 ? savedData.otro_ingre : savedData.r_l_vrlr_otros_in);
                setTotalIngre(savedData.total_ingre);
                setTotalEgreso(type !== 1 ? savedData.total_engreso : savedData.r_l_vrlr_egresos);
                setDesOtrosIngresos(savedData.des_otros_ingresos);
                setIngreAdic(savedData.ingre_adic);
                setTotalActivo(type !== 1 ? savedData.total_activo : savedData.r_l_vr_tot_acti);
                setTotalPasivo(type !== 1 ? savedData.total_pasivo : savedData.r_l_vr_tot_pasi);

                setIsVisible(true);
            }
        };

        fetchFormData();
    }, []);

    const handleSubmit = () => {
        setIsVisible(false);

        const updatedFormData = type !== 1 ? { 
            ...formData, 
            acti_CIIU: actiCiiu,
            desc_CIIU: descCiiu,
            profesion: profesion,
            Nom_empre_neg: nomEmpreNeg,
            Tipo_emp_neg: tipoEmpNeg,
            ciu_empre_neg: ciuEmpreNeg,
            dire_empre_neg: direEmpreNeg,
            cargo: cargo,
            mes_info_finan: mesInfoFinan,
            declarante: declarante,
            ingre_mes: ingreMes,
            otro_ingre: otroIngre,
            total_ingre: totalIngre,
            total_engreso: totalEgreso,
            des_otros_ingresos: desOtrosIngresos,
            ingre_adic: ingreAdic,
            total_activo: totalActivo,
            total_pasivo: totalPasivo
        } : {
            ...formData,
            mes_info_finan: mesInfoFinan,
            declarante: declarante,
            r_l_ingresos_mens: ingreMes,
            r_l_vrlr_otros_in: otroIngre,
            total_ingre: totalIngre,
            r_l_vrlr_egresos: totalEgreso,
            des_otros_ingresos: desOtrosIngresos,
            ingre_adic: ingreAdic,
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
        } else {
            setTipoEmpNeg(value);
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
                                <TitleLine 
                                    label="Infomarción laboral"
                                />
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
                                <View style={styles.mb5}>
                                    <SearchSelect
                                        isRequired
                                        label="Profesión"
                                        data={listProfesiones}
                                        placeholder="Seleccione una opción"
                                        onSelect={handleSelect(setProfesion)}
                                        selectedValue={profesion}
                                    />
                                </View>
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
                                    <CheckboxCustom 
                                        label="Tipo de empresa o negocio"
                                        isRequired
                                        options={options}
                                        onSelect={handleSelectCheckBox}
                                        selectedValue={tipoEmpNeg}
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
                                        label="Dirección de trabajo" 
                                        placeholder="Escribe tu dirección" 
                                        onSelect={handleSelect(setDireEmpreNeg)} 
                                        selectedValue={direEmpreNeg}
                                        isRequired
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
                        <TitleLine 
                            label="Información financiera"
                        />
                        <View style={styles.mb5}>
                            <DateSelect
                                isRequired
                                label="Mes y año de corte de la información financiera suministradas"
                                placeholder="Seleccione una opción"
                                onSelect={handleDateSelect(setMesInfoFinan)}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <CheckboxCustom 
                                label="¿Es declarante?"
                                isRequired
                                options={optionsDeclarante}
                                onSelect={handleSelectCheckBox}
                                selectedValue={declarante}
                            />
                        </View>
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
                                label="Total ingresos mensuales"
                                placeholder="Escribe el total ingresos mensuales"
                                isSecureText={false}
                                isRequired={true}
                                keyboardType="numeric"
                                onChangeText={setTotalIngre}
                                value={totalIngre}
                                isCurrency
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
                                label="Por concepto de:"
                                placeholder="Escribe el concepto de tus egresos"
                                isSecureText={false}
                                isRequired={false}
                                keyboardType="default"
                                onChangeText={setDesOtrosIngresos}
                                value={desOtrosIngresos}
                            />
                        </View>
                        <View style={styles.mb5}>
                            <Inputs
                                label="Ingresos adicionales generados por la inversión del crédito ($)"
                                placeholder="Escribe el total ingresos adicionales"
                                isSecureText={false}
                                isRequired={true}
                                keyboardType="numeric"
                                onChangeText={setIngreAdic}
                                value={ingreAdic}
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
                </FadeInOut>
            )}
        </AnimatePresence>
    );
}