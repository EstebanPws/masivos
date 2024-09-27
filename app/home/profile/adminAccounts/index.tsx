import React, { Dispatch, SetStateAction, useState } from "react";
import { Icon, MD2Colors, Text } from "react-native-paper";
import { styles } from "./adminAccounts.styles";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import { useFocusEffect } from "expo-router";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import Constants from "expo-constants";
import { ScrollView, View } from "react-native";
import AddAccount from "@/components/amount/addAccount/addAccount";
import InfoModalConfirm from "@/components/modals/infoModalConfirm/infoModalConfirm";
import { getData, getNumberAccount } from "@/utils/storageUtils";
import InfoModal from "@/components/modals/infoModal/infoModal";
import instanceWallet from "@/services/instanceWallet";
import EditAccount from "@/components/amount/editAccount/editAccount";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";

interface Input {
  onChangeText?: Dispatch<SetStateAction<string>>;
  value: string;
}

interface Select {
  onSelect: (item: any) => void;
  selectedValue: any;
  name?: string;
  digit?: string;
}


const extra = Constants.expoConfig?.extra || {};
const {primaryBold} = extra.text;
const {colorPrimary} = extra;

export default function Page() {
  const { setActiveTab, goBack, activeLoader, desactiveLoader} = useTab();
  const [names, setNames] = useState('');
  const [surnames, setSurnames] = useState('');
  const [document, setDocument] = useState('');
  const [alias, setAlias] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [typeBank, setTypeBank] = useState('');
  const [banks, setBanks] = useState('');
  const [bankName, setBankName] = useState('');
  const [digitBank, setDigitBank] = useState('');
  const [idAccount, setIdAccount] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultType, setResultType] = useState<'error' | 'success'>('error');
  const [resultMessage, setResultMessage] = useState('');
  const [accountInfo, setAccountInfo] = useState<any>();
  const [reloadAddAccount, setReloadAddAccount] = useState(false);
  const [editAccount, setEditAccount] = useState(false);

  const handleReloadAddAccount = () => {
    setReloadAddAccount(prev => !prev);
  };

  const inputNames: Input = {
    onChangeText: setNames,
    value: names
  }

  const inputSurnames: Input = {
      onChangeText: setSurnames,
      value: surnames
  }

  const inputAlias: Input = {
      onChangeText: setAlias,
      value: alias
  }

  const inputAccountNumber: Input = {
      onChangeText: setAccountNumber,
      value: accountNumber
  }

  const inputDocument: Input = {
      onChangeText: setDocument,
      value: document
  }

  const handleSelectBank = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
    setBankName(item.name);
    setDigitBank(item.digit);
    setter(item.value);
  };

  const handleSelect = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
    setter(item.value);
  };

  const inputBanks: Select = {
    onSelect: handleSelectBank(setBanks),
    selectedValue: banks,
    name: bankName,
    digit: digitBank
  }

  const inputTypeBank: Select = {
    onSelect: handleSelect(setTypeBank),
    selectedValue: typeBank
  }

  useFocusEffect(() => {
    setActiveTab('/home/profile/adminAccounts/');
  });
  
  const handleBack = () => {
      goBack();
  };

  const fetchDeleteAccount = async () => {
    const account = await getNumberAccount();
    const doc = await getData('infoClient');
    
    const body = {
        id: idAccount,
        docNumber: doc.numDoc,
        accountNumber: account?.startsWith('0') ? account.slice(1) : account
    }

    await instanceWallet.post('deleteAccount', body)
    .then(async (response) => {
        const data = response.data;
        if(data.status = 200) {
          setResultType('success');
          setResultMessage('La cuenta del contacto de transferencia se ha eliminado con éxito.');
        }
    })
    .catch((error) => {
      setResultType('error');
      setResultMessage('Hubo un error al intentar eliminar la cuenta del contacto de transferencia.');
    });

    setShowConfirmModal(false);
    setShowResultModal(true);
  }

  const fetchEditAccount = async () => {
    const account = await getNumberAccount();
    const doc = await getData('infoClient');
    
    const body ={
        id: idAccount,
        docNumber: doc.numDoc,
        accountNumber: account?.startsWith('0') ? account.slice(1) : account,
        firstName: names,
        lastName: surnames,
        nickname: alias,
        holderAccountNumber: accountNumber,
        holderDocumentNumber: document,
        bankCode: banks,
        bank: bankName,
        accountType: typeBank,
        digit: digitBank
    }

    await instanceWallet.put('editInterBank', body)
    .then(async (response) => {
        const data = response.data;
        if(data.status = 200) {
          setResultType('success');
          setResultMessage('La cuenta del contacto de transferencia se ha editado con éxito.');
        }
    })
    .catch((error) => {
      setResultType('error');
      setResultMessage('Hubo un error al intentar editar la cuenta del contacto de transferencia.');
    });

    setShowConfirmModal(false);
    setShowResultModal(true);
  }

  return (
    <ViewFadeIn isWidthFull>
        <HeaderForm
            onBack={() => handleBack()}
            title="Admon Contactos Transferencias"
        />
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {!editAccount && (
              <AddAccount 
                key={reloadAddAccount ? 'reload' : 'initial'} 
                names={inputNames}
                surnames={inputSurnames}
                alias={inputAlias}
                accountNumber={inputAccountNumber}
                document={inputDocument}
                banks={inputBanks}
                typeBank={inputTypeBank}
                isDisabled={false}
                type
                selectAccount={async (account, type) => {
                    if(type === 2){
                      setIdAccount(account.id);
                      setConfirmMessage('Esta seguro de eliminar este contacto de transferencias');
                      setShowConfirmModal(true);
                    } else if (type === 1) {
                      setAccountInfo(account);
                      setNames(account.firstName);
                      setSurnames(account.surname)
                      setDocument(account.document);
                      setAlias(account.alias);
                      setBanks(account.bank);
                      setAccountNumber(account.numberAccount);
                      setIdAccount(account.id);
                      setEditAccount(true);
                    }
                }}
              />
            )}
            {editAccount && (
              <>
                <EditAccount 
                  names={inputNames}
                  surnames={inputSurnames}
                  alias={inputAlias}
                  accountNumber={inputAccountNumber}
                  document={inputDocument}
                  banks={inputBanks}
                  typeBank={inputTypeBank}
                  selectAccount={async (account) => {
                    setAccountInfo(account);
                    setConfirmMessage('Esta seguro de editar este contacto de transferencias');
                    setShowConfirmModal(true);
                  }}

                />
                <View style={styles.mb5}>
                  <ButtonsPrimary
                      label="Volver"
                      onPress={() => setEditAccount(false)}
                  />
                </View>
              </>
            )}
          </ScrollView>
        </View>
        {showConfirmModal &&(
          <InfoModalConfirm 
            onPress={() => confirmMessage.includes('eliminar') ? fetchDeleteAccount() : fetchEditAccount()} 
            onCancel={() => setShowConfirmModal(false)} 
          >
             <View style={styles.centerContainer}>
              <Icon source={'information'} size={50} color={`${MD2Colors.blue700}`} />
              <Text>¿{confirmMessage}?</Text>
             </View>
          </InfoModalConfirm>
        )}
        {showResultModal && (
          <InfoModal 
            type={resultType} 
            message={resultMessage} 
            onPress={() => {setShowResultModal(false)
              handleReloadAddAccount();
              setEditAccount(false);
            }} 
            isVisible={showResultModal}            
          />
        )}
    </ViewFadeIn>
  );
}