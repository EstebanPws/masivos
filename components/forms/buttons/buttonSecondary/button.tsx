import { Button } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { Text } from "react-native-paper";
import styles from "./button.styles";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || {};
const {primaryBold} = extra.text;

interface ButtonsSecondaryProps {
    icon?: IconSource;
    label?: string;
    onPress?: () => void; 
}

export default  function ButtonsSecondary ({icon = '' , label, onPress} : ButtonsSecondaryProps) {  
    return (
        <Button mode="outlined" style={styles.btn} buttonColor={'transparent'} onPress={onPress}>
           <Text style={{...styles.btnText, ...primaryBold}} >{label}</Text>
        </Button>   
)};