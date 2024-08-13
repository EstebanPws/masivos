import React, { Dispatch, SetStateAction } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper"; 
import Inputs from "../../forms/inputs/inputs";
import { styles } from "./pse.styles";
import Constants from "expo-constants";
import { formatCurrency } from "@/utils/validationForms";
import AddressDian from "@/components/forms/addressDian/addressDian";
import SearchSelect from "@/components/forms/select/searchSelect/select";
import { listGenderType } from "@/utils/listUtils";

const extra = Constants.expoConfig?.extra || {};
const {primaryBold, primaryRegular} = extra.text;

interface Input {
    onChangeText?: Dispatch<SetStateAction<string>>;
    value: string;
}

interface Select {
    onSelect: (item: any) => void;
    selectedValue: any;
}

interface PseProps {
    names: Input;
    surnames: Input;
    document: Input;
    email: Input;
    address: Select;
    phone: Input;
    banks: Select;
}

export default function Pse({names, surnames,  document, email, address, phone, banks}:PseProps) {
    return(
        <View style={styles.container}>
            <View style={styles.mb5}>
                <Inputs 
                    label="Nombres"
                    placeholder="Ingrese el valor"
                    isSecureText={false} 
                    isRequired 
                    onChangeText={names.onChangeText}
                    value={names.value}  
                    keyboardType="default"          
                />
            </View>
            <View style={styles.mb5}>
                <Inputs 
                    label="Apellidos"
                    placeholder="Ingrese el valor"
                    isSecureText={false} 
                    isRequired 
                    onChangeText={surnames.onChangeText}
                    value={surnames.value}  
                    keyboardType="default"          
                />
            </View>
            <View style={styles.mb5}>
                <Inputs 
                    label="Número de documento"
                    placeholder="Ingrese el valor"
                    isSecureText={false} 
                    isRequired 
                    onChangeText={document.onChangeText}
                    value={document.value}  
                    keyboardType="numeric"          
                />
            </View>
            <View style={styles.mb5}>
                <Inputs 
                    label="Correo"
                    placeholder="Ingrese el valor"
                    isSecureText={false} 
                    isRequired 
                    onChangeText={email.onChangeText}
                    value={email.value}  
                    keyboardType="email-address"          
                />
            </View>
            <View style={styles.mb5}>
                <AddressDian 
                    label="Dirección" 
                    placeholder="Escribe tu dirección" 
                    onSelect={address.onSelect} 
                    selectedValue={address.selectedValue}
                    isRequired
                />
            </View>
            <View style={styles.mb5}>
                <Inputs 
                    label="Celular"
                    placeholder="Ingrese el valor"
                    isSecureText={false} 
                    isRequired 
                    onChangeText={phone.onChangeText}
                    value={phone.value}  
                    keyboardType="numeric"          
                />
            </View>
            <View style={styles.mb5}>
                <SearchSelect
                    isRequired
                    label="Bancos"
                    data={listGenderType}
                    placeholder="Seleccione una opción"
                    onSelect={banks.onSelect}
                    selectedValue={banks.selectedValue}
                />
            </View>
        </View>
    );
}