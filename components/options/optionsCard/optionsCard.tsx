import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import styles from "./optionsCard.styles";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold } = extra.text;
const { colorPrimary } = extra;

interface OptionsCardProps {
    type: number;
    isVirtual: boolean;
    isPhysical: boolean;
    onView: () => void;
    onViewInfo: () => void
}

const Placeholder = () => (
    <View />
);

export default function OptionsCard({ type, isVirtual, isPhysical, onView, onViewInfo}: OptionsCardProps) {
    const [isActiveVirtual, setIsActiveVirtual] = useState(false);
    const [isActivePhysical, setIsActivePhyisical] = useState(false);
    const [isViewInfo, setIsViewInfo] = useState('Mostrar');

    const handleViewInfo = () => {
        isViewInfo === 'Mostrar' ? setIsViewInfo('Ocultar') : setIsViewInfo('Mostrar');
        onViewInfo();
    }

    const items = [
       !isActiveVirtual && type === 0 &&{
            icon: 'credit-card-check',
            text: 'Activar\nTarjeta',
            onPress: () => setIsActiveVirtual(true)
        },
        !isActivePhysical && type === 1 && {
            icon: 'credit-card-check',
            text: 'Activar\nTarjeta',
            onPress: () => setIsActivePhyisical(true)
        },
        type === 1 && {
            icon: 'credit-card-edit',
            text: 'Cambiar\nPin',
            onPress: onView
        },
        {
            icon: 'credit-card-lock',
            text: 'Bloquear\nTarjeta',
            onPress: onView
        },
        {
            icon: 'credit-card-remove',
            text: 'Cancelar\nTarjeta',
            onPress: onView
        },
        {
            icon: 'shopping',
            text: 'Ver\nMovimientos',
            onPress: onView
        },
        isVirtual && type === 1 && {
            icon: 'credit-card-plus',
            text: 'Ver Tarjeta\nVirtual',
            onPress: onView
        },
        !isVirtual && type === 1 && {
            icon: 'credit-card-plus',
            text: 'Solicitar Tarjeta\nVirtual',
            onPress: onView
        },
        isPhysical && type === 0 && {
            icon: 'credit-card-plus',
            text: 'Ver Tarjeta\nFísica',
            onPress: onView
        },
        !isPhysical && type === 0 && {
            icon: 'credit-card-plus',
            text: 'Solicitar Tarjeta\nFísica',
            onPress: onView
        },
        {
            icon: 'credit-card-search',
            text: `${isViewInfo}\nDatos`,
            onPress: handleViewInfo
        }
    ].filter(Boolean);

    const filledItems = [...items, ...Array(3 - (items.length % 3)).fill(null)];

    return (
        <View>
            {filledItems.reduce((rows, item, index) => {
                if (index % 3 === 0) rows.push([]);
                rows[rows.length - 1].push(item);
                return rows;
            }, [] as Array<any[]>).map((row: any[], rowIndex: React.Key | null | undefined) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((item, index) => item ? (
                        <View key={index} >
                            <TouchableOpacity style={styles.containerBtn} onPress={item.onPress}>
                                <Icon
                                    source={item.icon}
                                    size={28}
                                    color={colorPrimary}
                                />
                            </TouchableOpacity>
                            <Text variant="labelSmall" style={[primaryBold, styles.text]}>
                                {item.text}
                            </Text>
                        </View>
                    ) : (
                        <Placeholder key={index} />
                    ))}
                </View>
            ))}
        </View>
    );
}
