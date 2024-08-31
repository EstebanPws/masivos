import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';
import { styles } from './contactList.styles';
import { Contact } from 'expo-contacts';
import Inputs from '@/components/forms/inputs/inputs';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import instanceWallet from '@/services/instanceWallet';
import { Icon } from 'react-native-paper';

const extra = Constants.expoConfig?.extra || {};
const expo = Constants.expoConfig?.name || '';
const {primaryRegular, primaryBold} = extra.text;
const {colorPrimary, colorSecondary} = extra;

interface ContactListProps {
    onResponseContact: (response: any) => void;
}

export default function ContactList({ onResponseContact }: ContactListProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noContacts, setNoContacts] = useState(false);

  const fetchListContacts = async () => {
    try {
      const response = await instanceWallet.get('getAccountP2P');
      return response.data;
    } catch (error) {
      setNoContacts(true);
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        const listContacts = await fetchListContacts();
        const listNumbers = listContacts?.map((contact: { numero_celular: any; }) => contact.numero_celular);

        const filteredContacts = data.filter(contact => {
          return contact.phoneNumbers && contact.phoneNumbers.some(phone => 
            listNumbers.includes(phone.number?.replace(/\s+/g, '')) 
          );
        });

        if(filteredContacts.length === 0){
          setNoContacts(true);
        } else {
          setNoContacts(false);
        }

        setContacts(filteredContacts);
      }
    })();
  }, []);

  const handleSearch = (query: React.SetStateAction<string>) => {
    setSearchQuery(query);
  };

  const filteredContacts = contacts
    .filter((contact) => {
      const contactName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      return contactName.includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      const nameA = `${a.firstName || ''} ${a.lastName || ''}`.trim().toLowerCase();
      const nameB = `${b.firstName || ''} ${b.lastName || ''}`.trim().toLowerCase();
      return nameA.localeCompare(nameB);
  });

  const fetchListContactSelect = async (phone: string) => {
    const body = { numero_celular: phone};

    try {
        const response = await instanceWallet.post('getcelularP2P', body);
        let final;
        if(response.data.length !== 0) {
            final = {
                contact: response.data[0],
                phone: phone
            }
        } else {
            final = `El número de celular seleccionado no tiene cuenta o depósito en ${expo}`;
        }
        return final;
    } catch (error) {
        return "Hubo un error al intentar consultar los datos del número seleccionado, por favor intentelo de nuevo en unos minutos.";
    }
  };

  const handleSelect = async (item: Contact) => {
    let number = item.phoneNumbers ? item.phoneNumbers[0].number?.replaceAll(' ', '') : '';
    const contactSelect = await fetchListContactSelect(number!);
    onResponseContact(contactSelect);
  };

  return (
    <View style={styles.container}>
        <View style={styles.mb5}>
            <Inputs
                icon={'account-search'}
                placeholder='Buscar...'
                isRequired={false}
                isSecureText={false} 
                value={searchQuery}  
                onChangeText={handleSearch}      
            />
        </View>
        {noContacts &&  (
          <View style={[styles.mb5, styles.center]}>
            <Icon
                source={'toolbox'}
                size={28}
            />
            <Text style={primaryRegular}>No hay resultados</Text>
          </View>
        )}
        {!noContacts && (
          <>
          {filteredContacts.map((contact) => (
            <TouchableOpacity key={contact.id} style={styles.contactItem} onPress={() => handleSelect(contact)}>
                <LinearGradient
                    colors={[colorPrimary, colorSecondary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.containerInfo}
                >
                    <Text style={[styles.contactName, primaryBold]}>
                        {contact.firstName ? contact.firstName : 'Sin'} {contact.firstName || contact.lastName ? contact.lastName : 'nombre'}
                    </Text>
                    {contact.phoneNumbers && contact.phoneNumbers.map((phone, index) => (
                        <Text key={index} style={[styles.contactName, primaryRegular]}>
                            {phone.number}
                        </Text>
                    ))}
                </LinearGradient>
            </TouchableOpacity>
          ))}
          </>
        )}
    </View>
  );
}