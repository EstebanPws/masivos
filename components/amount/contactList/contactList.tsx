import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';
import * as Contacts from 'expo-contacts';
import styles from './contactList.styles';
import { Contact } from 'expo-contacts';
import Inputs from '@/components/forms/inputs/inputs';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import instanceWallet from '@/services/instanceWallet';
import { Icon } from 'react-native-paper';
import { useTab } from '@/components/auth/tabsContext/tabsContext';
import Modal from 'react-native-modal';
import ButtonsPrimary from '@/components/forms/buttons/buttonPrimary/button';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const extra = Constants.expoConfig?.extra || {};
const expo = Constants.expoConfig?.name || '';
const {primaryRegular, primaryBold} = extra.text;
const {colorPrimary, colorSecondary} = extra;

interface ListAccounts {
  number: number;
  estado: string;
}

interface ContactListProps {
    onResponseContact: (response: any) => void;
}

export default function ContactList({ onResponseContact }: ContactListProps) {
  const {activeLoader, desactiveLoader} = useTab();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noContacts, setNoContacts] = useState(false);
  const [listAccounts, setListAccounts] = useState<any>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [contactSelect, setContactSelect] = useState<any>();

  const fetchListContacts = async () => {
    try {
      const response = await instanceWallet.get('getAccountP2P');
      const dataFinal = response.data.data.filter((contact: any) => {
        let data: any;
        const infoContact = contact.account.filter((contactAccount: any) => {
          if(contactAccount.no_cuenta.startsWith('73000') || contactAccount.no_cuenta.startsWith('87300')) {
            return contact;
          }
        });

        data = infoContact;
        return data;
      });

      return dataFinal;
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
        const listNumbers = listContacts?.map((contact: any) => {
          let number;
          if  (contact.account[0].no_cuenta.startsWith('73000') || contact.account[0].no_cuenta.startsWith('87300')) {
            contact.account.filter((numberPhone: any) => {
              if(numberPhone) {
                number = numberPhone.numero_celular
              }
            });
          }

          return number;
        });

        const filteredContacts = data.filter(contact => {
          return contact.phoneNumbers && contact.phoneNumbers.some(phone => {
            let number = phone.number?.replace(/^(\+57)?\D+/g, '').replace(/\D+/g, '').trim();
            
            number?.startsWith('57') ? number = number.slice(-10) : number;
            return listNumbers.includes(number) 
          });
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
    const body = {
      numero_celular: phone
    };

    try {
      const response = await instanceWallet.post('getcelularP2P', body);
      let final;
      if(response.data.length !== 0) {
        const data = response.data;
        const accountValid = data.filter((account: any) => {
            let accValid
            if(account.account[0].no_cuenta.startsWith('73000') || account.account[0].no_cuenta.startsWith('87300')){
                accValid = account.account[0].no_cuenta;
            }
            return accValid
        })

        const document = accountValid[0].docCli;
        const account = accountValid[0].account[0].no_cuenta;
        
        if(account.startsWith('73000') || account.startsWith('87300')){
            const stateAccounts = await fetchListAccounts(document, account);
            const activeAccounts = stateAccounts.filter((account: { estado: string; }) => account.estado === "A");   
            const uniqueAccounts = new Set<number>();
            const result = data.filter((item: { account: any; }) => {
              let accountNumbers = item.account.filter((accounts: { no_cuenta: string; }) => parseInt(accounts.no_cuenta)); 
              
              const listAccountNumbers = accountNumbers.filter((accountNumber: any) => {
                  const isActiveAccount = activeAccounts.some((activeAccount: { number: number; }) => { 
                      return activeAccount.number === parseInt(accountNumber.no_cuenta);
                  });

                  if (isActiveAccount && !uniqueAccounts.has(accountNumber.no_cuenta)) {
                      uniqueAccounts.add(accountNumber.no_cuenta); 
                      return true; 
                  }

                  return false;
              })
              return listAccountNumbers.length > 0;
            });
            
            let contactSelectInfo = {
                docCli: data[0].docCli,
                nombres1: data[0].nombres1,
                nombres2: data[0].nombres2,
                apellido1: data[0].apellido1,
                apellido2: data[0].apellido2,
                phone: data[0].account[0].numero_celular
            };

            setContactSelect(contactSelectInfo);
            setListAccounts(result);
            setIsVisible(true);
            final= 'success';
        } else {
            final = `El número de celular ingresado no tiene cuenta o depósito en ${expo}`;
        }
      } else {
          final = `El número de celular ingresado no tiene cuenta o depósito en ${expo}`;
      }
      return final;
    } catch (error) {
        console.log(error);
        return "Hubo un error al intentar consultar los datos del número ingresado, por favor intentelo de nuevo en unos minutos.";
    }
  };

  const fetchListAccounts = async (document: string, account: string) => {
    activeLoader();
    const bodyAccount = {
        no_doc : document,
        modalidad : account.startsWith('7') ? '0' : '8',
        estado: "T"
    }

    let accounts: any = [];
    await instanceWallet.post('getAccounts', bodyAccount)
    .then(async (response) => {
        const data = response.data;
        
        if(response.data.data[0]){
            accounts = data.data.map((account: any) => {
                const numberAccounts: ListAccounts = {
                    number: account.CUENTA,
                    estado: account.ESTADO
                }

                return numberAccounts;
            });

        } else {
            const accountsMap = [data.data];
            accounts = accountsMap.map((account: any) => {
                const numberAccounts: ListAccounts = {
                    number: account.CUENTA,
                    estado: account.ESTADO
                }

                return numberAccounts;
            });
        }
    })
    .catch((err) => {
        console.log(err.response.data);
    });
    desactiveLoader();

    return accounts;
  }

  const handleSelect = async (item: Contact) => {
    const number = item.phoneNumbers ? item.phoneNumbers[0].number?.replaceAll(' ', '') : '';
    const sendNumber = number!.replace(/^(\+57)?\D+/g, '').replace(/\D+/g, '');

    const contactSelect = await fetchListContactSelect(sendNumber.startsWith('57') ? sendNumber.substring(2, 12) : sendNumber);
    if(contactSelect !== 'success') {
      onResponseContact(contactSelect);
    }
  };

  const handleResult = async (contact: any) => {
    contactSelect.no_cuenta = contact.no_cuenta;
    onResponseContact(contactSelect);
  };

  return (
    <>
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
      <SafeAreaProvider>
        <SafeAreaView>
          <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
            <View style={styles.modalContainer}>
                <ScrollView>
                    <View style={styles.scrollPadding}>
                        <Text variant="titleSmall" style={[primaryBold, styles.text, styles.subtitle]}>Por favor selecciona la cuenta a la que quieres enviar el dinero.</Text>
                        {listAccounts.length !== 0 && (
                            <>
                                {listAccounts.map((account: any, index: React.Key | null | undefined) => (
                                    <View  key={index}  >
                                        {account.account.map((accounts: any, index: React.Key | null | undefined) => (
                                            <View key={index} style={styles.account}>
                                                <TouchableOpacity onPress={() => handleResult(accounts)}>
                                                    <LinearGradient
                                                        colors={[colorPrimary, colorSecondary]}
                                                        start={{ x: 0, y: 0 }}
                                                        end={{ x: 1, y: 0 }}
                                                        style={styles.balance}
                                                    >
                                                        <Text variant="titleSmall" style={[primaryRegular, styles.text]}>Número de 
                                                            <Text variant="titleSmall" style={[primaryBold, styles.text]}> cuenta</Text>
                                                        </Text>
                                                        <LinearGradient
                                                            colors={[colorPrimary, colorSecondary]}
                                                            start={{ x: 1, y: 0 }}
                                                            end={{ x: 0, y: 0 }}
                                                            style={styles.balance}
                                                        >
                                                            <Text variant="titleMedium" style={[primaryBold, styles.text]}>{accounts.no_cuenta.startsWith('7') ? `0${accounts.no_cuenta}` : account.no_cuenta}</Text>
                                                        </LinearGradient>
                                                    </LinearGradient>
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>
                                ))}
                            </>
                        )}
                    </View>
                </ScrollView>
                <ButtonsPrimary
                    label='Cerrar'
                    onPress={() => setIsVisible(false)}
                />
            </View>
          </Modal>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}