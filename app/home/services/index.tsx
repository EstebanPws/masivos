import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Icon, Text } from "react-native-paper";
import { styles } from "./services.styles";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { router } from "expo-router";
import SearchSelect from "@/components/forms/select/searchSelect/select";
import Constants from "expo-constants";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import OptionsService from "@/components/options/optionsService/optionsService";
import Inputs from "@/components/forms/inputs/inputs";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold, primaryRegular } = extra.text;

export default function Page() {
  const [packageService, setPackageService] = useState('');
  const [valueRecharge, setValueRecharge] = useState('');
  const [recharge, setRecharge] = useState('');
  const [isRecharge, setIsRecharge] = useState(false);
  const [idRecharge, setIdRecharge] = useState(0);

  const listSevices = [
    { name: 'Recargas', value: '01' },
    { name: 'Pines', value: '02' },
    { name: 'Facturas', value: '03' }
  ];

  const options = [
    {
      id: 0,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Claro.svg/1200px-Claro.svg.png',
      name: 'Claro',
      onPress: () => {
        setIdRecharge(0)
        setIsRecharge(true);
      },
    },
    {
      id: 1,
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_eLuoSeZiu1-ZVjwUwkeqOa4se47d9GxZxA&s',
      name: 'Movistar',
      onPress: () => {
        setIdRecharge(1)
        setIsRecharge(true);
      },
    },
    {
      id: 2,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tigolatam.png/1200px-Tigolatam.png',
      name: 'Tigo',
      onPress: () => {
        setIdRecharge(2)
        setIsRecharge(true);
      },
    }
  ];

  const handleSelect = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
    setter(item.value);
  };

  const selectedOption = options.find(option => option.id === idRecharge);

  return (
    <ViewFadeIn isWidthFull>
      <HeaderForm
        onBack={() => router.back()}
        title="Servicios"
      />
      <View style={styles.container}>
        <View style={styles.mb5}>
          <SearchSelect
            isRequired
            label="Seleccione un paquete"
            data={listSevices}
            placeholder="Seleccione una opción"
            onSelect={handleSelect(setPackageService)}
            selectedValue={packageService}
          />
        </View>
        <View style={styles.services}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {!isRecharge ? (
              !packageService ? (
                <View style={styles.center}>
                  <Icon
                    source={'toolbox'}
                    size={28}
                  />
                  <Text style={primaryRegular}>No hay resultados</Text>
                </View>
              ) : (
                <OptionsService options={options} />
              )
            ) : (
              <View>
                <TouchableOpacity style={styles.back} onPress={() => setIsRecharge(false)}>
                  <Icon
                      source={'arrow-left'}
                      size={24}
                  />
                </TouchableOpacity>
                {selectedOption && (
                 <View style={styles.centerJ}>
                   <View style={styles.containerBtn}>
                    <Icon
                      source={{ uri: selectedOption.icon }}
                      size={28}
                    
                    />
                  </View>
                  <Text style={primaryBold}>{selectedOption.name}</Text>
                 </View>
                )}
                <View style={styles.mb5}>
                  <Inputs
                    label="Número de celular que desea recargar"
                    placeholder="Escribe el número de celular a recargar"
                    isSecureText={false}
                    isRequired={true}
                    keyboardType="numeric"
                    onChangeText={setRecharge}
                    value={recharge}
                  />
                </View>
                <View style={styles.mb5}>
                  <Inputs
                    label="Valor a recargar"
                    placeholder="Escribe el valor a recargar"
                    isSecureText={false}
                    isRequired={true}
                    keyboardType="numeric"
                    onChangeText={setValueRecharge}
                    value={valueRecharge}
                    isCurrency
                  />
                </View>
                <View style={styles.mb5}>
                  <ButtonsPrimary 
                    label="Enviar"
                  />
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </ViewFadeIn>
  );
}
