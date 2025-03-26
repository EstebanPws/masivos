import React, { useEffect, useRef, useState } from "react";
import { View, ImageBackground } from "react-native";
import { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Text } from 'react-native-paper';
import ButtonsPrimary from '@/components/forms/buttons/buttonPrimary/button';
import styles from "./infoTransaction.styles";
import Constants from "expo-constants";
import { formatCurrency, formatCurrencyTransaction } from "@/utils/validationForms";
import { PDFDocument } from 'pdf-lib';
import { useTab } from "@/components/auth/tabsContext/tabsContext";

const extra = Constants.expoConfig?.extra || {};
const {primaryRegular, primaryBold} = extra.text;
const {colorPrimary, colorSecondary} = extra;

interface InfoTransactionProps {
    transaction: any;
    onPress: () => void;
}

export default function InfoTransaction ({transaction, onPress}: InfoTransactionProps) {
    const {activeLoader, desactiveLoader} = useTab();
    const [newDate, setNewDate] = useState('');
    const [horaTx, setHoraTx] = useState('');
    const [typeInfo, setTypeInfo] = useState('');
    const [descriptionTx, setDescriptionTx] = useState('');
    const [amountTx, setAmountTx] = useState('');
    const [idTx, setIdTx] = useState('');
    const viewRef = useRef(null);

    const fetchInfo = () => {
        if (transaction) {
            const date = String(transaction.fecha_aplicacion_conta);
            const type = transaction.tipo_operacion_movi === 'A' ? "Recibido" : "Enviado";
            const year = date.substring(0, 4);
            const month = date.substring(4, 6);
            const day = date.substring(6, 8);

            const time = String(transaction.hora_tx);
            const hour = time.substring(0, 2);
            const minutes = time.substring(2, 4);
            const seconds = time.substring(4, 6);
            const zoneTime = Number(hour) >= 13 ? 'P.M' : 'A.M'

            const amount = formatCurrencyTransaction(transaction.valor_tx);            

            setNewDate(`${year}/${month}/${day}`);
            setTypeInfo(type);
            setDescriptionTx(transaction.descri_tx);
            setAmountTx(amount);
            setIdTx(transaction.id_opera_coopcentral);
            setHoraTx(`${hour}:${minutes}:${seconds} ${zoneTime}`)
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const handleShare = async () => {
        try {
            activeLoader();
            const imageUri = await captureRef(viewRef, {
                format: 'png',
                quality: 0.8,
            });
    
            const pdfUri = await createPdfFromImage(imageUri);
    
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(pdfUri, {
                    mimeType: 'application/pdf',
                    dialogTitle: 'Compartir comprobante',
                });
            } else {
                console.log('Sharing is not available on this device.');
            }
            desactiveLoader();
        } catch (error) {
            desactiveLoader();
            console.error('Error capturing and sharing PDF:', error);
        }
    };

    const uint8ArrayToBase64 = (uint8Array: Iterable<number>) => {
        let binary = '';
        const bytes = new Uint8Array(uint8Array);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };
    
    
    const createPdfFromImage = async (imageUri: string) => {
        const imageBase64 = await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();

        const jpgImage = await pdfDoc.embedPng(`data:image/png;base64,${imageBase64}`);
        const { width, height } = page.getSize();
        const imageDims = jpgImage.scale(0.5); 
        const x = (width - imageDims.width) / 2;
        const y = (height - imageDims.height) / 2;

        page.drawImage(jpgImage, {
            x,
            y,
            width: imageDims.width,
            height: imageDims.height,
        });
    
        const pdfBytes = await pdfDoc.save();
        const pdfBase64 = uint8ArrayToBase64(pdfBytes); 
        const pdfUri = FileSystem.documentDirectory + `Comprobante_${idTx}.pdf`;
        await FileSystem.writeAsStringAsync(pdfUri, pdfBase64, {
            encoding: FileSystem.EncodingType.Base64,
        });
    
        return pdfUri;
    };

    const handleClose = () => {
        onPress();
    };

    return (
        <View style={styles.container} ref={viewRef}>
            <ImageBackground 
                source={require('@/assets/images/general/fondo-transaction.webp')} 
                resizeMode="repeat"
                style={styles.touchable}
                imageStyle={{opacity: .3, marginLeft: -3}}
            >
                <LinearGradient
                    colors={[colorPrimary, colorSecondary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.containerInfo}
                >
                    <Icon
                        source={typeInfo === 'Recibido' ? 'cash-plus' : 'cash-minus'}
                        size={32}
                        color="white"
                    />
                </LinearGradient>
                <LinearGradient
                    colors={[colorPrimary, colorSecondary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.containerInfo}
                >
                    {/*<View style={styles.row}>
                        <Text numberOfLines={5} ellipsizeMode='tail' variant='bodySmall' style={[primaryBold, styles.textCenter]}>
                            Id Transacción:
                        </Text>
                        <Text numberOfLines={5} ellipsizeMode='tail' variant='bodySmall' style={[primaryRegular, styles.textCenter, { width: '50%' }]}>
                            {idTx}
                        </Text>
                    </View>*/}
                    <View style={styles.row}>
                        <Text numberOfLines={5} ellipsizeMode='tail' variant='bodySmall' style={[primaryBold, styles.textCenter]}>
                            Fecha:
                        </Text>
                        <Text numberOfLines={5} ellipsizeMode='tail' variant='bodySmall' style={[primaryRegular, styles.textCenter, { width: '50%' }]}>
                            {newDate}
                        </Text>
                    </View>
                    {/**<View style={styles.row}>
                        <Text numberOfLines={5} ellipsizeMode='tail' variant='bodySmall' style={[primaryBold, styles.textCenter]}>
                            Hora:
                        </Text>
                        <Text numberOfLines={5} ellipsizeMode='tail' variant='bodySmall' style={[primaryRegular, styles.textCenter, { width: '50%' }]}>
                            {horaTx}
                        </Text>
                    </View>*/}
                    <View style={styles.row}>
                        <Text numberOfLines={5} ellipsizeMode='tail' variant='bodySmall' style={[primaryBold, styles.textCenter]}>
                            Descripción:
                        </Text>
                        <Text numberOfLines={5} ellipsizeMode='tail' variant='bodySmall' style={[primaryRegular, styles.textCenter, { width: '50%' }]}>
                            {descriptionTx}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text numberOfLines={5} ellipsizeMode='tail' variant='bodySmall' style={[primaryBold, styles.textCenter]}>
                            Tipo:
                        </Text>
                        <View style={[typeInfo === 'Recibido' ? styles.success : styles.error]}>
                            <Text variant='bodySmall' style={[primaryRegular, styles.textCenter, { textAlign: 'center' }]}>
                                {typeInfo}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text numberOfLines={5} ellipsizeMode='tail' variant='bodySmall' style={[primaryBold, styles.textCenter]}>
                            Valor:
                        </Text>
                        <Text numberOfLines={5} ellipsizeMode='tail' variant='bodySmall' style={[primaryRegular, styles.textCenter, { width: '50%' }]}>
                            {amountTx} COP
                        </Text>
                    </View>
                </LinearGradient>
                <View style={styles.row}>
                    <ButtonsPrimary 
                        label="Volver"
                        onPress={handleClose}
                    />
                    <ButtonsPrimary
                        icon={'share-variant-outline'}
                        label=""
                        onPress={handleShare}
                    />
                   
                </View>
            </ImageBackground>
        </View>
    );
}
