import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Button, MD2Colors } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { Text, Icon } from "react-native-paper";
import { styles } from "./button.styles";

const extra = Constants.expoConfig?.extra || {};
const {primaryRegular} = extra.text;
const {colorPrimary, colorSecondary} = extra;

interface ButtonsPrimaryProps {
    icon?: IconSource;
    label?: string;
    style?: any;
    disabled?: boolean;
    onPress?: () => void; 
}

export default  function ButtonsPrimary({icon = '' , label, style, disabled = false, onPress} : ButtonsPrimaryProps) {  
    return (
        <LinearGradient
            colors={[colorPrimary, colorSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{...style, ...styles.btn, opacity: disabled ? .7 : 1}}
        >
            <Button mode="contained" buttonColor={'transparent'}  onPress={onPress} disabled={disabled}>
                {icon && (
                    <Icon
                        source={icon}
                        size={24}
                        color={MD2Colors.white}
                    />
                )}
                <Text style={{...styles.btnText, ...primaryRegular}}>{label}</Text>
            </Button>
        </LinearGradient>
 )};