import React, { useEffect, useState } from "react";
import styles from "./addressInfo.styles";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import { useFocusEffect } from "expo-router";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { ScrollView, View } from "react-native";
import AddressDian from "@/components/forms/addressDian/addressDian";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import Inputs from "@/components/forms/inputs/inputs";
import SearchSelect from "@/components/forms/select/searchSelect/select";
import instanceMunicipios from "@/services/instanceMunicipio";
import InfoModal from "@/components/modals/infoModal/infoModal";
import Loader from "@/components/loader/loader";
import { getData } from "@/utils/storageUtils";

interface List {
  name: string;
  value: string;
}

export default function Page() {
  const { setActiveTab, goBack, activeLoader, desactiveLoader } = useTab();
  const [address, setAddress] = useState('CL 17 21 32 S');
  const [neighborhood, setNeighborhood] = useState('Ciudad Verde');
  const [ciudMuni, setCiudMuni] = useState('05001');
  const [listMunicipios, setListMunicipios] = useState<List[] | null>([]);
  const [messageError, setMessageError] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      const infoClient = await getData('infoClient');
      setCiudMuni(infoClient.ciudadRes);
      setNeighborhood(infoClient.barrio);
      setAddress(infoClient.direRes);

      await fetchData();
    }

    fetchInfo();
  }, [])

  const fetchData = async () => {
    try {
        activeLoader();
        const municipiosResponse = await instanceMunicipios.get('xdk5-pm3f.json?$query=select%20*%2C%20%3Aid%20limit%201300');
        const municipiosData = municipiosResponse.data;

        const transformedMunicipios: List[] = municipiosData.map((item: any) => {
            const municipio = item.municipio;
            const departamento = item.departamento;
            let codigoDane = item.c_digo_dane_del_municipio.replaceAll('.', '');

            if (codigoDane.startsWith('5') || codigoDane.startsWith('8')) {
                codigoDane = `0${codigoDane}`;
            }

            return {
                name: `${municipio} - ${departamento}`,
                value: codigoDane
            };
        });

        setListMunicipios(transformedMunicipios);
    } catch (err) {  
        setMessageError("Ha ocurrido un error al intentar cargar los datos.");
        setShowError(true);
    } finally {
       desactiveLoader();
    }
  };
  
  useFocusEffect(() => {
    setActiveTab('/home/profile/addressInfo/');
  });
  
  const handleBack = () => {
      goBack();
  };

  const handleSelect = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
    setter(item.value);
  };

  return (
    <ViewFadeIn isWidthFull>
        <HeaderForm
            onBack={() => handleBack()}
            title="Dirección"
        />
        <View style={styles.info}>
          <ScrollView contentContainerStyle={[styles.container]} showsVerticalScrollIndicator={false}>
            <View style={styles.center}>
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
            </View>
            <ButtonsPrimary
              label={'Guardar'} 
            />
          </ScrollView>
        </View>
        {showError && (
            <InfoModal
                isVisible={showError}
                type="info"
                message={messageError}
                onPress={() => setShowError(false)}
            />
        )}
    </ViewFadeIn>
  );
}