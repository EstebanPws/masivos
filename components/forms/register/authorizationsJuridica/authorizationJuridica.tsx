import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { List, Text } from "react-native-paper";
import styles from "./authorizationJuridica.styles";
import Inputs from "@/components/forms/inputs/inputs";
import SearchSelect from "@/components/forms/select/searchSelect/select";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import { getData, setData } from "@/utils/storageUtils";
import { AnimatePresence } from "moti";
import FadeInOut from "@/components/animations/fade/fadeInOut";
import CheckboxCustom from "../../checkbox/checkbox";
import TitleLine from "@/components/titleLine/titleLine";
import Accordions from "../../accordions/accordions";
import Constants from "expo-constants";
import InfoModal from "@/components/modals/infoModal/infoModal";

const extra = Constants.expoConfig?.extra || {};

const { primaryRegular } = extra.text;

interface List {
    name: string;
    value: string;
}

interface AuthorizationJuridicaProps{
    type: string | string[] | undefined;
    listPaises: List[] | null;
    onSubmit: (data: any) => void;
}

export default function AuthorizationJuridica({type, listPaises, onSubmit }: AuthorizationJuridicaProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [facta1, setFacta1] = useState('');
    const [facta2, setFacta2] = useState('');
    const [facta3, setFacta3] = useState('');
    const [facta4, setFacta4] = useState('');
    const [crs, setCrs] = useState('');
    const [paisCrs, setPaisCrs] = useState('');
    const [nitCrs, setNitCrs] = useState('');
    const [dec1, setDec1] = useState('');
    const [cert, setCert] = useState('');
    const [marcaLaft, setMarcaLaft] = useState('');
    const [isAcc, setIsAcc] = useState('');
    const [isOtherAcc, setIsOtherAcc] = useState('');
    const [accn2doc01, setAccn2doc01] = useState('');
    const [accn2doc02, setAccn2doc02] = useState('');
    const [accn2nom01, setAccn2nom01] = useState('');
    const [accn2nom02, setAccn2nom02] = useState('');
    const [accn2par01, setAccn2par01] = useState('');
    const [accn2par02, setAccn2par02] = useState('');
    const [messageError, setMessageError] = useState('');
    const [showError, setShowError] = useState(false);
    const [isInitial, setIsInitial] = useState(false);
    const [formData] = useState({
        env_extractos: 'D',
        env_cert_costos: 'D',
        permFatca: '',
        nacion_americana: '',
        reseeeuu: '',
        rel_contractual: '',
        marca_laft: '',
        parti_5por_socios: '',
        accn2doc_01: '',
        accn2doc_02: '',
        accn2nom_01: '',
        accn2nom_02: '',
        accn2par_01: '',
        accn2par_02: ''
    });

    const optionsDeclarante = [
        { label: 'SI', value: 'S' },
        { label: 'NO', value: 'N' }
    ];

    const optionsAut = [
        { label: 'SI', value: 'S' }
    ];

    const optionsLaft = [
        { label: 'SIPLAFT', value: 'P' },
        { label: 'SARLAFT', value: 'R' },
        { label: 'SAGRILAFT', value: 'C' },
        { label: 'NINGUNA', value: 'O' }
    ];

    const optionsTerms = [
        { label: 'ACEPTAR', value: 'true' },
        { label: 'RECHAZAR', value: 'false' }
    ];

    useEffect(() => {  
        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            
            if (savedData) {
                setFacta1(savedData.permFatca);
                setFacta2(savedData.nacion_americana);
                setFacta3(savedData.reseeeuu);
                setFacta4(savedData.rel_contractual);
                setCrs(savedData.crs);
                setPaisCrs(savedData.paisCrs);
                setNitCrs(savedData.nitCrs);
                setDec1(savedData.dec1);
                setCert(savedData.cert);
                setIsAcc(savedData.parti_5por_socios);
                setMarcaLaft(savedData.marca_laft);
                setAccn2doc01(savedData.accn2doc_01);
                setAccn2doc02(savedData.accn2doc_02);
                setAccn2nom01(savedData.accn2nom_01);
                setAccn2nom02(savedData.accn2nom_02);
                setAccn2par01(savedData.accn2par_01);
                setAccn2par01(savedData.accn2par_02);
                setIsVisible(true);
            }
        };

        fetchFormData();
    }, []);

    useEffect(() => {        
        const checkAllFieldsFilled = () => {
            let allFieldsFilled = type !== '8' ? facta1 && facta2 && facta3 && facta4 && crs && dec1 && cert : cert;

            if (crs === 'S') {
                allFieldsFilled = allFieldsFilled && paisCrs && nitCrs
            }

            return allFieldsFilled;
        };

        setIsButtonEnabled(!!checkAllFieldsFilled());
    }, [facta1, facta2, facta3, facta4, crs, dec1, cert]);

    useEffect(() => {
        if (isInitial) {
            if (crs !== 'S') {
                setPaisCrs('');
                setNitCrs('');
            }
        }
    }, [isInitial]);

    useEffect(() => {
        if(isAcc === 'N'){
            setAccn2doc01('');
            setAccn2nom01('');
            setAccn2par01('');
            setIsOtherAcc('N')
        }

        if(isOtherAcc === 'N'){
            setAccn2doc02('');
            setAccn2nom02('');
            setAccn2par02('');
        }
    }, [isAcc, isOtherAcc]);

    const handleSubmit = () => {
        const updatedFormData = { 
            ...formData, 
            permFatca: facta1,
            nacion_americana: facta2,
            reseeeuu: facta3,
            rel_contractual: facta4,
            crs: crs,
            paisCrs: paisCrs,
            nitCrs: nitCrs,
            dec1: dec1,
            cert: cert,
            marca_laft: marcaLaft,
            parti_5por_socios: isAcc,
            accn2doc_01: accn2doc01,
            accn2doc_02: accn2doc02,
            accn2nom_01: accn2nom01,
            accn2nom_02: accn2nom02,
            accn2par_01: accn2par01,
            accn2par_02: accn2par02
        }; 

        const fetchFormData = async () => {
            const savedData = await getData('registrationForm');
            if (savedData) {
                const newUpdatedFormData = { ...savedData, ...updatedFormData };
                await setData('registrationForm', newUpdatedFormData); 
                const step = 5;
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

    const handleSelectCheckBox = (type: string) => (value: string) => {        
        switch (type) {
            case 'facta1':
                setFacta1(value);
                break;
            case 'facta2':
                setFacta2(value);
                break;
            case 'facta3':
                setFacta3(value);
                break;
            case 'facta4':
                setFacta4(value);
                break;
            case 'crs':
                setCrs(value);
                break;
            case 'dec1':
                setDec1(value);
                break;
            case 'cert':
                setCert(value);
                break;
            case 'laft':
                setMarcaLaft(value);
                break;
            case 'acc':
                setIsAcc(value);
                break;
            case 'otherAcc':
                setIsOtherAcc(value);
                break;
            default:
                break;
        }
    
        setIsInitial(!isInitial);
    };
      

    return (
        <AnimatePresence>
            {isVisible && (
                <FadeInOut>
                    <View style={styles.containerForm}>
                        {type === '1' &&(
                            <>
                                <TitleLine 
                                    label="Declaracions LA/FT"
                                />
                                <View style={styles.mb5}>
                                    <Accordions title={"Preguntas"}>
                                        <View style={styles.mb5}>
                                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>. Declaro que el origen de bienes y/o fondos para la apertura, certificados y demás productos provienen de actividades lícitas y no admitiré que terceros efectúen depósitos a mi(s) cuenta(s) con dinero proveniente de actividades ilícitas contempladas en el Código Penal Colombiano  o en cualquier  norma que  lo modifique o adicione, ni efectuare transacciones destinadas a tales actividades a favor de personas relacionadas con las mismas.  </Text>
                                            <CheckboxCustom 
                                                options={optionsDeclarante}
                                                onSelect={handleSelectCheckBox('facta4')}
                                                selectedValue={facta4}
                                            />    
                                        </View>
                                        <View style={styles.mb5}>
                                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>2. La Entidad está obligada a implementar:</Text>
                                            <CheckboxCustom 
                                                options={optionsLaft}
                                                onSelect={handleSelectCheckBox('laft')}
                                                selectedValue={marcaLaft}
                                            />    
                                        </View>
                                        <View style={styles.mb5}>
                                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>3. La entidad tiene socios o asociados con participación del 5% o más del capital social?</Text>
                                            <CheckboxCustom 
                                                options={optionsDeclarante}
                                                onSelect={handleSelectCheckBox('acc')}
                                                selectedValue={isAcc}
                                            />    
                                        </View>
                                        {isAcc === 'S' && ( 
                                            <>
                                                <TitleLine 
                                                    label="Accionista 1"
                                                />
                                                <View style={styles.mb5}>
                                                    <Inputs
                                                        label="Nombres completos"
                                                        placeholder="Escribe el nombre completo"
                                                        isSecureText={false}
                                                        isRequired={true}
                                                        keyboardType="default"
                                                        onChangeText={setAccn2nom01}
                                                        value={accn2nom01}
                                                    />
                                                </View>
                                                <View style={styles.mb5}>
                                                    <Inputs
                                                        label="Número de documento"
                                                        placeholder="Escribe el número de documento"
                                                        isSecureText={false}
                                                        isRequired={true}
                                                        keyboardType="numeric"
                                                        onChangeText={setAccn2doc01}
                                                        value={accn2doc01}
                                                    />
                                                </View>
                                                <View style={styles.mb5}>
                                                    <Inputs
                                                        label="% de participación"
                                                        placeholder="Escribe % de participación"
                                                        isSecureText={false}
                                                        isRequired={true}
                                                        keyboardType="numeric"
                                                        onChangeText={setAccn2par01}
                                                        value={accn2par01}
                                                        maxLength={3}
                                                    />
                                                </View>
                                                <View style={styles.mb5}>
                                                    <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>Tiene otro accionista</Text>
                                                    <CheckboxCustom 
                                                        options={optionsDeclarante}
                                                        onSelect={handleSelectCheckBox('otherAcc')}
                                                        selectedValue={isOtherAcc}
                                                    />    
                                                </View>
                                            </>
                                        )}
                                        {isOtherAcc === 'S' && ( 
                                            <>
                                                <TitleLine 
                                                    label="Accionista 2"
                                                />
                                                <View style={styles.mb5}>
                                                    <Inputs
                                                        label="Nombres completos"
                                                        placeholder="Escribe el nombre completo"
                                                        isSecureText={false}
                                                        isRequired={true}
                                                        keyboardType="default"
                                                        onChangeText={setAccn2nom02}
                                                        value={accn2nom02}
                                                    />
                                                </View>
                                                <View style={styles.mb5}>
                                                    <Inputs
                                                        label="Número de documento"
                                                        placeholder="Escribe el número de documento"
                                                        isSecureText={false}
                                                        isRequired={true}
                                                        keyboardType="numeric"
                                                        onChangeText={setAccn2doc02}
                                                        value={accn2doc02}
                                                    />
                                                </View>
                                                <View style={styles.mb5}>
                                                    <Inputs
                                                        label="% de participación"
                                                        placeholder="Escribe % de participación"
                                                        isSecureText={false}
                                                        isRequired={true}
                                                        keyboardType="numeric"
                                                        onChangeText={setAccn2par02}
                                                        value={accn2par02}
                                                        maxLength={3}
                                                    />
                                                </View>
                                            </>
                                        )}
                                    </Accordions>
                                </View>
                            </>
                        )}
                        {type !== '8' && (
                            <>
                                <TitleLine 
                                    label="LEY DE CUMPLIMIENTO - FATCA Y CRS"
                                />
                                <View style={styles.mb5}>
                                    <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>En observancia de las disposiciones aplicables a los sistemas actuales de intercambio automático de información, las cuales buscan prevenir la evasión fiscal de los contribuyentes estadounidenses y de los miembros de la OCDE y teniendo en cuenta lo establecido por la Superintendencia Financiera de Colombia, le agradecemos responder las siguientes preguntas:</Text>
                                    <Accordions title={"Preguntas"}>
                                        <View style={styles.mb5}>
                                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>a. ¿Soy de nacionalidad colombiana y he permanecido más de 183 días en el último año, o 122 días durante los últimos 3 años, dentro del territorio de los Estados Unidos?</Text>
                                            <CheckboxCustom 
                                                options={optionsDeclarante}
                                                onSelect={handleSelectCheckBox('facta1')}
                                                selectedValue={facta1}
                                            />    
                                        </View>
                                        <View style={styles.mb5}>
                                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>b. ¿Soy una persona de nacionalidad estadounidense?</Text>
                                            <CheckboxCustom 
                                                options={optionsDeclarante}
                                                onSelect={handleSelectCheckBox('facta2')}
                                                selectedValue={facta2}
                                            />    
                                        </View>
                                        <View style={styles.mb5}>
                                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>c. ¿Soy residente en Estados Unidos?</Text>
                                            <CheckboxCustom 
                                                options={optionsDeclarante}
                                                onSelect={handleSelectCheckBox('facta3')}
                                                selectedValue={facta3}
                                            />    
                                        </View>
                                        <View style={styles.mb5}>
                                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>d. ¿Tengo alguna relación contractual con entidades estadounidenses?</Text>
                                            <CheckboxCustom 
                                                options={optionsDeclarante}
                                                onSelect={handleSelectCheckBox('facta4')}
                                                selectedValue={facta4}
                                            />    
                                        </View>
                                        
                                    </Accordions>
                                </View>
                                <TitleLine 
                                    label="Certificación CRS"
                                />
                                <View style={styles.mb5}>
                                    <View style={styles.mb5}>
                                        <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>a. ¿Usted es residente para propósitos fiscales en otra (s) jurisdicciones diferentes a Colombia y EEUU?</Text>
                                        <CheckboxCustom 
                                            options={optionsDeclarante}
                                            onSelect={handleSelectCheckBox('crs')}
                                            selectedValue={crs}
                                        />    
                                    </View>
                                    {crs === 'S' &&(
                                        <>
                                            <View style={styles.mb5}>
                                                <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>Si su respuesta es SI, indique el país de residencia y en seguida el NIT o su equivalente</Text>
                                                <SearchSelect
                                                    data={listPaises}
                                                    placeholder="Seleccione una opción"
                                                    onSelect={handleSelect(setPaisCrs)}
                                                    selectedValue={paisCrs}
                                                />   
                                            </View>
                                            <View style={styles.mb5}>
                                                <Inputs
                                                    placeholder="Llene el campo con la información"
                                                    isSecureText={false}
                                                    isRequired={false}
                                                    keyboardType="numeric"
                                                    onChangeText={setNitCrs}
                                                    value={nitCrs}
                                                />    
                                            </View>
                                        </>
                                    )}
                                </View>
                                <TitleLine label="Declaraciones"/>
                                <View style={styles.mb5}>
                                    <Accordions title={"Declaraciones"}>
                                        <View style={styles.mb5}>
                                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>Declaro que: el origen de bienes y/o fondos para la apertura de  productos  provienen de actividades lícitas</Text>
                                            <CheckboxCustom 
                                                options={optionsAut}
                                                onSelect={handleSelectCheckBox('dec1')}
                                                selectedValue={dec1}
                                            />    
                                        </View>
                                        <View style={styles.mb5}>
                                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}> y No acepto como propias, los depósitos que a mi (s) cuenta (s) efectúen terceros con dinero proveniente de actividades ilícitas contempladas en el Código Penal Colombiano o en cualquier norma que lo modifique o adicione, ni efectuaré, transacciones destinadas a tales actividades a favor de personas relacionadas con las mismas.</Text>
                                        </View>
                                    </Accordions>
                                </View>
                            </>
                        )}
                        <View style={styles.mb5}>
                            <Text variant="titleSmall" style={{ ...primaryRegular, ...styles.text }}>Certifico (amos) que la información aportada en el presente documento es veraz.</Text>
                            <CheckboxCustom 
                                options={optionsDeclarante}
                                onSelect={handleSelectCheckBox('cert')}
                                selectedValue={cert}
                            />    
                        </View>
                        <View style={styles.mV2}>
                            <ButtonsPrimary 
                                disabled={!isButtonEnabled}
                                onPress={handleSubmit}
                                label="Continuar"
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