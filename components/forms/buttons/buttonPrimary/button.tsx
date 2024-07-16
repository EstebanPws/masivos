import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { Text } from "react-native-paper";
import { styles } from "./button.styles";

const extra = Constants.expoConfig?.extra || {};
const {primaryRegular} = extra.text;
const {colorPrimary, colorSecondary} = extra;

interface ButtonsPrimaryProps {
    icon?: IconSource;
    label?: string;
    style?: any;
}

export default  function ButtonsPrimary({icon = '' , label, style} : ButtonsPrimaryProps) {  
    return (
        <LinearGradient
            colors={[colorPrimary, colorSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{...style, ...styles.btn}}
        >
            <Button mode="contained" buttonColor={'transparent'}  onPress={() => console.log('Pressed')}>
                <Text style={{...styles.btnText, ...primaryRegular}}>{label}</Text>
            </Button>
        </LinearGradient>
 )};