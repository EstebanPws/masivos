import React, { useState } from 'react';
import { Appearance, View, Text, TouchableOpacity, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from "./dateSelect.styles";
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, MD2Colors } from 'react-native-paper';
import { formatDate } from '@/utils/fomatDate';
import ButtonsPrimary from '../../buttons/buttonPrimary/button';

const extra = Constants.expoConfig?.extra || {};
const { primaryRegular, primaryBold } = extra.text;
const { colorPrimary, colorSecondary } = extra;

interface DateSelectProps {
    isRequired?: boolean;
    label: string;
    placeholder: string;
    icon?: boolean; 
    onSelect: (date: Date) => void;
}

export default function DateSelect({ isRequired = false, label, placeholder, icon = true, onSelect }: DateSelectProps) {
    const today = new Date();
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(today);
    const [tempDate, setTempDate] = useState<Date>(today);

    const colorScheme = Appearance.getColorScheme();
    const backgroundColor = colorScheme === 'dark' ? `${MD2Colors.grey800}` : `${MD2Colors.grey800}`;

    const showPicker = () => {
      setTempDate(selectedDate || new Date());
      setPickerVisible(true);
    };

    const handleDateChange = (event: any, date?: Date) => {
        if (date) {
            setTempDate(date);
        }
    };

    const handleDateChangeAndroid = (event: any, date?: Date) => {
      setPickerVisible(false);
      if (date) {
          setSelectedDate(date);
          onSelect(date);
      }
  };

    const confirmDate = () => {
        if (tempDate) {
            setSelectedDate(tempDate);
            onSelect(tempDate);
        }
        setPickerVisible(false);
    };

    const cancelDate = () => {
        setTempDate(selectedDate);
        setPickerVisible(false);
    };

    return (
        <View>
            <Text style={{ ...styles.label, ...primaryBold }}>
                {isRequired ? `${label} *` : label}
            </Text>
            <TouchableOpacity onPress={showPicker} style={styles.inputContainer}>
                <Text style={{ ...styles.inputText, ...primaryRegular }}>
                  {selectedDate ? formatDate(selectedDate) : placeholder}
                </Text>
                {icon && (
                  <LinearGradient
                    colors={[colorPrimary, colorSecondary]}
                    style={styles.containerIcon}
                  >
                    <Icon
                      source="calendar"
                      size={24}
                      color={MD2Colors.white}
                    />
                  </LinearGradient>
                )}
            </TouchableOpacity>
            {isPickerVisible && Platform.OS === 'ios' && (
              <Modal
                transparent={true}
                animationType="slide"
                visible={isPickerVisible}
                onRequestClose={cancelDate}
              >
                <View style={styles.modalContainer}>
                  <DateTimePicker
                    accentColor={colorPrimary}
                    value={selectedDate}
                    mode="date"
                    style={{...styles.dateTimePicker, backgroundColor: backgroundColor}}
                    display={'inline'}
                    onChange={handleDateChange}
                    maximumDate={today}
                  />
                  <View style={styles.buttonContainer}>
                      <ButtonsPrimary
                        label='Cancelar'
                        onPress={cancelDate} 
                        style={styles.button}
                      />
                      <ButtonsPrimary
                        label='Aceptar'
                        onPress={confirmDate} 
                        style={styles.button}
                      />
                  </View>
                </View>
              </Modal>
            )}
            {isPickerVisible && Platform.OS === 'android' && (
              <DateTimePicker
                value={selectedDate || new Date()}
                mode="date"
                style={{...styles.dateTimePicker, backgroundColor: backgroundColor}}
                display={'spinner'}
                onChange={handleDateChangeAndroid}
                positiveButton={{textColor: colorPrimary}}
                negativeButton={{textColor: colorPrimary}}
                maximumDate={today}
              />
            )}
        </View>
    );
};
