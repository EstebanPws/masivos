import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';
import { styles } from './contactList.styles';
import { Contact } from 'expo-contacts';
import Inputs from '@/components/forms/inputs/inputs';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra || {};
const {primaryRegular, primaryBold} = extra.text;
const {colorPrimary, colorSecondary} = extra;

interface ContactSelect {
    name: string;
    phone: string | undefined;
}

interface ContactListProps {
    onPress: () => void;
    setContact: (contact: ContactSelect) => void;
}

export default function ContactList({ onPress, setContact }: ContactListProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        const filteredContacts = data.filter((contact) => {
          return contact.phoneNumbers && contact.phoneNumbers.some(phone => phone.number?.startsWith('+57'));
        });

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

  const handleSelect = (item: Contact) => {
    const selectedContact: ContactSelect = {
        name: `${item.firstName ? item.firstName : 'Sin'} ${item.firstName || item.lastName ? item.lastName : 'nombre'}`.trim(),
        phone: item.phoneNumbers ? item.phoneNumbers[0].number : ''
    };

    setContact(selectedContact);
    onPress();
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
    </View>
  );
}