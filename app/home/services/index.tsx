import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Platform } from "react-native";
import { Icon, Text } from "react-native-paper";
import { styles } from "./services.styles";
import ViewFadeIn from "@/components/animations/viewFadeIn/viewFadeIn";
import HeaderForm from "@/components/headers/headerForm/headerForm";
import { router, useFocusEffect } from "expo-router";
import SearchSelect from "@/components/forms/select/searchSelect/select";
import Constants from "expo-constants";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import OptionsService from "@/components/options/optionsService/optionsService";
import Inputs from "@/components/forms/inputs/inputs";
import { useTab } from "@/components/auth/tabsContext/tabsContext";
import instanceWallet from "@/services/instanceWallet";
import { formatCurrency, validateNumber } from "@/utils/validationForms";
import { getData, getNumberAccount } from "@/utils/storageUtils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TitleLine from "@/components/titleLine/titleLine";
import InfoModal from "@/components/modals/infoModal/infoModal";

const extra = Constants.expoConfig?.extra || {};
const { primaryBold, primaryRegular } = extra.text;
const { colorPrimary, idApp} = extra;

interface ListService {
  name: string;
  value: string;
}

interface Option {
  id: string,
  icon: string,
  name: string,
  onPress: () => void
  categories?: any,
  amount?: number
}

export default function Page() {
  const { setActiveTab, goBack, activeLoader, desactiveLoader, activeTab} = useTab();
  const [packageService, setPackageService] = useState('');
  const [valueRecharge, setValueRecharge] = useState('');
  const [recharge, setRecharge] = useState('');
  const [email, setEmail] = useState('');
  const [isRecharge, setIsRecharge] = useState(false);
  const [isPackages, setIsPackages] = useState(false);
  const [isSubPackages, setIsSubPackages] = useState(false);
  const [isProductsFinal, setIsProductsFinal] = useState(false);
  const [isProductsFinalSelected, setIsProductsFinalSelected] = useState(false);
  const [listSevices, setListServices] = useState<ListService[]>([]);
  const [listRecharges, setListRecharges] = useState<Option[]>([]);
  const [listPackages, setListPackages] = useState<Option[]>([]);
  const [listSubPackages, setListSubPackages] = useState<Option[]>([]);
  const [listProductsFinal, setlistProductsFinal] = useState<Option[]>([]);
  const [listPines, setListPines] = useState<Option[]>([]);
  const [listInvoices, setListInvoices] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<any>();
  const [namePackage, setNamePackage] = useState('');
  const [showError, setShowError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [typeMessage, setTypeMessage] = useState<"error" | "info" | "success">('error');
  const [typeFinish, setTypeFinish] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadSearch, setLoadSearch] = useState(false);
  const [isSearchInvoice, setIsSearchInvoice] = useState(false);
  const [referenceInvoice, setReferenceInvoice] = useState('');
  const [typeStepInvoice, setTypeStepInvoice] = useState(0);

  const fetchGetServices = async () => {
    activeLoader();
    await instanceWallet.get('product/categorie')
    .then((response) => {
      const data = response.data;

      const service = data.message
      .filter((service: any) => service.id !== 120)
      .map((service: any) => {
        const item: ListService = {
          name: service.name,
          value: String(service.id)
        };
        return item;
      });

      const facturas: ListService = {
        name: "Pago de facturas",
        value: String(82)
      };

      service.push(facturas);

      const serviceRecharge = data.message.find((service: any) => service.id === 2);
      const listRecharge = serviceRecharge
        ? serviceRecharge.products.map((product: any) => {
            const image = product.id === 48 || product.id === 47 ||  product.id === 51 ? 'https://cdn-icons-png.flaticon.com/512/2391/2391025.png' : `https://assets.refacil.co/providers/${product.image}`;
            product.image = image;
            const recharge: Option = {
              id: String(product.id),
              icon: product.image ? image : 'https://cdn-icons-png.flaticon.com/512/2391/2391025.png',
              name: product.id === 51 ? 'Comuni...' : product.name,
              onPress: () => {
                setIsRecharge(true);
                handleSelectedOption(product);
              },
            };
            return recharge;
          })
        : 
      [];

      const servicePackages = data.message.find((service: any) => service.id === 3);
      const listPackage = servicePackages.categories.map((categorie: any) => {
        const packages: Option = {
          id: String(categorie.id),
          icon: 'https://cdn-icons-png.flaticon.com/512/953/953810.png',
          name: categorie.name.replace('Paquetes', ''),
          onPress: () => {
            fetchSubPackages(categorie.categories, categorie.name.replace('Paquetes', ''));
            setIsPackages(true);
          },
        };
        return packages;
      });


      const servicePines = data.message.find((service: any) => service.id === 81);
      const listPines = servicePines.categories[0].categories.map((categorie: any) => {
        const pines: Option = {
          id: String(categorie.id),
          icon: 'https://cdn-icons-png.flaticon.com/512/1332/1332605.png',
          name: categorie.id === 84 ? 'Xbox sus...' : categorie.name,
          onPress: () => {
            fetchProductsFinalPackages(categorie.products, categorie.name);
            setIsPackages(true);
          },
        };
        return pines;
      });

      setListPines(listPines);
      setListPackages(listPackage);
      setListRecharges(listRecharge);
      setListServices(service);
      desactiveLoader();
    })
    .catch(() => {
      desactiveLoader();
      setTypeMessage('error');
      setMessageError('En este momento no se pueden consultar los servicios disponibles.\n\nPor favor intetalo más tarde.');
      setTypeFinish(1);
      setShowError(true);
    })
  }

  const fetchSubPackages = (subCategories: any, name: string) => {
    setNamePackage(name);
    const listSubCategories = subCategories.map((subCat: any) => {
      const subPackages: Option = {
        id: String(subCat.id),
        icon: 'https://cdn-icons-png.flaticon.com/512/953/953810.png',
        name: subCat.name,
        onPress: () => {
          fetchProductsFinalPackages(subCat.products);
        },
      };
      return subPackages;
    });

    setIsSubPackages(true);
    setListSubPackages(listSubCategories);
  }

  const fetchProductsFinalPackages = (productsFinal: any, name?: string) => {
    let image;
    if(name){
      setNamePackage(name);
      setIsSubPackages(true);
    }
    const listProducts = productsFinal.map((prod: any) => {
      if(name){
        image = `https://assets.refacil.co/providers/${prod.image}`
      } else {
        image = 'https://cdn-icons-png.flaticon.com/512/2611/2611147.png'; 
      }   
      const productsView: Option = {
        id: String(prod.id),
        icon: image,
        name: prod.name,
        amount: prod.amount,
        onPress: () => {
          handleSelectedOption(prod);
          setIsProductsFinalSelected(true);
        },
      };
      return productsView;
    });
    
    setIsProductsFinal(true);
    setlistProductsFinal(listProducts);
  }

  useEffect(() => {
    if(activeTab === '/home/services/'){
      fetchGetServices();
    }
 }, [activeTab]) 
  
  useFocusEffect(() => {
    setActiveTab('/home/services/');
  });

  const handleSelect = (setter: { (value: React.SetStateAction<string>): void }) => (item: any) => {
    setIsRecharge(false);
    setIsProductsFinal(false);
    setIsSubPackages(false);
    setIsPackages(false);
    setIsProductsFinalSelected(false);
    setLoadSearch(false);
    setSearchQuery('');
    setNamePackage('');
    setValueRecharge('');
    setEmail('');
    setRecharge('');
    setIsSearchInvoice(false);
    setReferenceInvoice('');
    setTypeStepInvoice(0);
    setter(item.value);
  };

  const handleSelectedOption = (id: any) => {
    setSelectedOption(id);
  }

  const handleBack = () => {
    goBack();
  };

  const handleBackPackages = (type: number) => {
    if(type == 0){
      setIsProductsFinalSelected(false);
    } else if (type === 1){
      setIsProductsFinalSelected(false);
      setIsProductsFinal(false);
      if(packageService === '81'){
        setIsSubPackages(false);
        setIsPackages(false);
      }
    }else {
      setIsProductsFinal(false);
      setIsSubPackages(false);
      setIsPackages(false)
    }
  }

  const handleBackInvoice = (type: number) => {
    if(type == 0){
      setLoadSearch(false);
      setIsSearchInvoice(false);
    } else if (type === 1){
      setLoadSearch(true);
      setIsSearchInvoice(false);
    }else {
      setTypeStepInvoice(0);
    }
  }

  const fetchSendPay = async () => {
    activeLoader();
    const infoClient = await getData('infoClient');
    const account = await getNumberAccount();
    const body = {
      prod_orig:  account?.startsWith('0') ? account.slice(1) : account,
      doc_prod_orig: infoClient.numDoc,
      nom_orig: `${infoClient.names} ${infoClient.surnames}`,
      descrip_tx: packageService === '2' ? 'Pago de recargas' : packageService === '3' ? "Pago de paquetes moviles" : "Pago de pines",
      productId: selectedOption.id,
      amount: packageService === '2' ? validateNumber(valueRecharge) : selectedOption.amount,
      moveTmpBalance: true,
      type: packageService,
      data: {
          cellphone: recharge,
          document: infoClient.numDoc,
          correo: email
      }
    };

    await instanceWallet.post('ventas/RecargasPaquetes', body)
    .then((response) => {
      const data = response.data;
      if(!data.message.includes('[')){
          setMessageError('Transacción completada con éxito.');
          setShowError(true);
          setTypeMessage('success');
          setTypeFinish(1);
      } else {
          setMessageError('La transacción ha sido rechazada. Por favor intentelo de nuevo más tarde.');
          setShowError(true);
          setTypeMessage('error');
          setTypeFinish(0);
      }
      desactiveLoader();
    })
    .catch((error) => {
      const message = error.response.data.message ? error.response.data.message : `Hubo un error al intentar realizar el ${packageService === '2' ? 'pago de la recarga' : packageService === '3' ? "pago del paquete movil" : "pago de pines"}`;
      setMessageError(message);
      setShowError(true);
      setTypeMessage('error');
      setTypeFinish(0);
      desactiveLoader();
    });
  }

  const handleFinishTransaction = (type: number) => {
    if(type === 1){
      setIsRecharge(false);
      setIsProductsFinal(false);
      setIsSubPackages(false);
      setIsPackages(false);
      setIsProductsFinalSelected(false);
      setLoadSearch(false);
      setSearchQuery('');
      setNamePackage('');
      setValueRecharge('');
      setEmail('');
      setRecharge('');
      setIsSearchInvoice(false);
      setReferenceInvoice('');
      setTypeStepInvoice(0);
      router.push('/home');
    }

    setShowError(false);
  }; 

  const fetchGetInvoice = async () => {
    const body = {
      query: searchQuery.trimStart().trimEnd().toLowerCase()
    };

    await instanceWallet.post('product/search', body)
    .then((response) => {
      const data = response.data;
      if(data.data.length !== 0){
        const listInvoices = data.data.map((invoice: any) => {
          const image = invoice.image ? `https://assets.refacil.co/providers/${invoice.image}` : 'https://cdn-icons-png.flaticon.com/512/15238/15238240.png';
          const item: Option = {
            id: String(invoice.productId),
            icon: image,
            name: invoice.name,
            onPress: () => {
              handleSelectedOption(invoice);
              setIsSearchInvoice(true);
              setLoadSearch(false);
              setTypeStepInvoice(0);
            }
          }
  
          return item;
        });
  
        setListInvoices(listInvoices);
      } else {
        setListInvoices([]);
      }
      setLoadSearch(true);
    })
    .catch((err) => {
      setMessageError("No se puede consultar las facturas en este momento.\n\nPor favor intentelo más tarde.");
      setShowError(true);
      setTypeMessage('error');
      setTypeFinish(0);
      setLoadSearch(false);
    })
  }

  const fetchGetInfoInvoice = async () => {
    const body = {
      productId: selectedOption.id,
      queryType: "BILLData",
      data: {
        reference: referenceInvoice
      }
    };

    await instanceWallet.post('product/query', body)
    .then((response) => {
      const data = response.data;
      
      if(data.data.payload){
        const payload = data.data.payload;
        const item = {
          id: payload.productId,
          name: payload.productName,
          reference: payload.reference,
          amount: formatCurrency(payload.amount),
          hashEchoData: payload.hashEchoData,
          hash: payload.hash
        };

        setSelectedOption(item);
        setTypeStepInvoice(1);
        setIsSearchInvoice(true);
        setLoadSearch(false);
      } else {
        setMessageError("No se encontro la referencia de la factura.");
        setShowError(true);
        setTypeMessage('error');
        setTypeStepInvoice(0);
        setTypeFinish(0);
        setLoadSearch(false);
      }
    })
    .catch((err) => {
      setMessageError("No se encontro la referencia de la factura.");
      setShowError(true);
      setTypeMessage('error');
      setTypeStepInvoice(0);
      setLoadSearch(false);
      setTypeFinish(0);
    })
  }

  const fetchSendPayInvoice = async () => {
    activeLoader();
    const infoClient = await getData('infoClient');
    const account = await getNumberAccount();
    const body = {
      prod_orig: account?.startsWith('0') ? account.slice(1) : account,
      doc_prod_orig: infoClient.numDoc,
      nom_orig: `${infoClient.names} ${infoClient.surnames}`,
      descrip_tx: `Pago de factura referencia ${selectedOption.reference}`,
      productId: selectedOption.id,
      amount: validateNumber(selectedOption.amount),
      idApp: idApp,
      sellType: "Bill",
      moveTmpBalance: true,
      hash: selectedOption.hash,
      data: {
          reference: selectedOption.reference,
          cellphone: infoClient.phoneNumber,
          hashEchoData: selectedOption.hashEchoData
      }
    };

    await instanceWallet.post('ventas/PagoFactura', body)
    .then((response) => {
      const data = response.data;
      if(!data.message.includes('[')){
          setMessageError('Transacción completada con éxito.');
          setShowError(true);
          setTypeFinish(1);
          setTypeMessage('success');
      } else {
          setMessageError('La transacción ha sido rechazada. Por favor intentelo de nuevo más tarde.');
          setShowError(true);
          setTypeMessage('error');
          setTypeFinish(0);
      }
      desactiveLoader();
    })
    .catch((error) => {
      const message = error.response.data.message;
      setMessageError(message);
      setShowError(true);
      setTypeMessage('error');
      setTypeFinish(0);
      desactiveLoader();
    });
  }

  return (
    <ViewFadeIn isWidthFull>
      <HeaderForm
        onBack={() => handleBack()}
        title="Servicios"
      />
      <View style={styles.container}>
        <View style={styles.mb5}>
          <SearchSelect
            isRequired
            label="Seleccione un servicio"
            data={listSevices}
            placeholder="Seleccione una opción"
            onSelect={handleSelect(setPackageService)}
            selectedValue={packageService}
          />
        </View>
        {packageService === '82' && (
          <View style={styles.row}>
            <View style={styles.viewSearch}>
              <Inputs 
                label="ingrese el nombre de la empresa a la que desea realizar el pago de la factura."
                isSecureText={false} 
                isRequired={true} 
                placeholder="Ej: codensa"
                icon={'clipboard-text-search-outline'}
                onChangeText={setSearchQuery}
                value={searchQuery} 
              />
            </View>
            <ButtonsPrimary 
              label="Buscar"
              onPress={() => fetchGetInvoice()}
            />
          </View>
        )}
        <View style={[styles.services, packageService === '82' ? {maxHeight: '58%'} : null]}>
          {(isPackages && isSubPackages && packageService === '3' || isPackages && isSubPackages && packageService === '81') && (
            <Text style={[primaryBold, styles.text]} >Operador: {namePackage}</Text>
          )}
          <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            enableOnAndroid={true}
            extraHeight={Platform.select({ ios: 80, android: 120 })}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
                {(packageService === '' || packageService === '82' && !loadSearch && !isSearchInvoice) &&(
                  <View style={styles.centerInvoice}>
                    <Icon
                      source={'toolbox'}
                      size={28}
                    />
                    <Text style={primaryRegular}>No hay resultados</Text>
                  </View>
                )}

                {(!isRecharge && packageService === '2' ) && (
                  listRecharges.length === 0 ? (
                    <View style={styles.center}>
                      <Icon
                        source={'toolbox'}
                        size={28}
                      />
                      <Text style={primaryRegular}>No hay resultados</Text>
                    </View>
                  ) : (
                    <OptionsService options={listRecharges} />
                  )
                )}

                {(!isPackages && !isSubPackages && packageService === '3' || !isPackages && !isSubPackages && packageService === '81') && (
                  (listPines.length === 0 ||  listPackages.length === 0) ? (
                    <View style={styles.center}>
                      <Icon
                        source={'toolbox'}
                        size={28}
                      />
                      <Text style={primaryRegular}>No hay resultados</Text>
                    </View>
                  ) : (
                    <OptionsService options={packageService === '81' ? listPines : listPackages} />
                  )
                )}

                {(isPackages && isSubPackages && packageService === '3' && !isProductsFinalSelected || isPackages && isSubPackages && packageService === '81' && !isProductsFinalSelected) && (
                  (isProductsFinal && listProductsFinal.length === 0 || !isProductsFinal && listSubPackages.length === 0) ? (
                    <View style={styles.center}>
                      <Icon
                        source={'toolbox'}
                        size={28}
                      />
                      <Text style={primaryRegular}>No hay resultados</Text>
                    </View>
                  ) : (
                    <View>
                      <OptionsService isPackage={isProductsFinal ? true : false} options={isProductsFinal ? listProductsFinal : listSubPackages} />
                    </View>
                  )
                )}

                {(packageService === '82' && loadSearch && !isSearchInvoice) && (
                  listInvoices.length === 0 ? (
                    <View style={styles.center}>
                      <Icon
                        source={'toolbox'}
                        size={28}
                      />
                      <Text style={primaryRegular}>No hay resultados</Text>
                    </View>
                  ) : (
                    <View>
                      <OptionsService isInvoice options={listInvoices} />
                    </View>
                  )
                )}

                {(packageService === '82' && !loadSearch && isSearchInvoice) && (
                  <View style={[isProductsFinalSelected ? styles.pH5 : null]}>
                    {selectedOption && (
                      <View style={styles.centerJ}>
                        <View style={[styles.containerBtnPackage, styles.rowPackage]}>
                          <Icon
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2611/2611147.png'}}
                            size={28}
                          
                          />
                          <Text numberOfLines={10} variant="labelSmall" style={[primaryBold, styles.textPackage]}>
                            {selectedOption.name} {'\n\n'}
                            {selectedOption.amount && (
                               <Text variant="labelMedium" style={[primaryBold, styles.textPackage, {color: colorPrimary}]}>{formatCurrency(selectedOption.amount)} COP
                            </Text>
                            )}
                          </Text>
                        </View>
                      </View>
                    )}
                    <TitleLine label="Información de la factura"/>
                    <View style={styles.mb5Form}>
                      <Inputs
                        label="Número de referencia de pago (sin guiones)"
                        placeholder="Escribe la referencia de pago"
                        isSecureText={false}
                        isRequired={true}
                        keyboardType="numeric"
                        onChangeText={setReferenceInvoice}
                        value={referenceInvoice}
                        maxLength={10}
                        readonly={typeStepInvoice === 0 ? false : true}
                      />
                    </View>
                    <View style={styles.mb5}>
                      <ButtonsPrimary 
                        label={typeStepInvoice === 0 ? "Siguiente" : "Enviar"}
                        onPress={typeStepInvoice === 0  ? fetchGetInfoInvoice : fetchSendPayInvoice}
                      />
                    </View>
                  </View>
                )}

                {(isRecharge  && packageService === '2' || isProductsFinalSelected && packageService == '3' || isProductsFinalSelected && packageService == '81') && (
                  <View style={[isProductsFinalSelected ? styles.pH5 : null]}>
                    {selectedOption && (
                      <>
                        {!isProductsFinalSelected ? (
                          <View style={styles.centerJ}>
                            <View style={styles.containerBtn}>
                              <Icon
                                source={{ uri: selectedOption.image }}
                                size={28}
                              
                              />
                            </View>
                            <Text style={primaryBold}>{selectedOption.name}</Text>
                          </View>
                        ) : (
                          <View style={styles.centerJ}>
                            <View style={[styles.containerBtnPackage, styles.rowPackage]}>
                              <Icon
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2611/2611147.png'}}
                                size={28}
                              
                              />
                              <Text numberOfLines={10} variant="labelSmall" style={[primaryBold, styles.textPackage]}>
                                {selectedOption.name}  {'\n\n'} <Text variant="labelMedium" style={[primaryBold, styles.textPackage, {color: colorPrimary}]}>{formatCurrency(selectedOption.amount)} COP
                                </Text>
                              </Text>
                            </View>
                          </View>
                        )}
                      </>
                    )}
                    <TitleLine label="Información del destinatario del servicio"/>
                    <View style={styles.mb5Form}>
                      <Inputs
                        label="Número de celular"
                        placeholder="Escribe el número de celular a recargar"
                        isSecureText={false}
                        isRequired={true}
                        keyboardType="numeric"
                        onChangeText={setRecharge}
                        value={recharge}
                        maxLength={10}
                      />
                    </View>
                    {!isProductsFinalSelected && (
                      <View style={styles.mb5Form}>
                        <Inputs
                          label="Valor a recargar"
                          placeholder="Escribe el valor a recargar"
                          isSecureText={false}
                          isRequired={true}
                          keyboardType="numeric"
                          onChangeText={setValueRecharge}
                          value={valueRecharge}
                          isCurrency
                        />
                      </View>
                    )}
                    <View style={styles.mb5Form}>
                      <Inputs
                        label="Correo eletrónico"
                        placeholder="Escribe el correo eletrónico"
                        isSecureText={false}
                        isRequired={true}
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        value={email}
                      />
                    </View>
                    <View style={styles.mb5}>
                      <ButtonsPrimary 
                        label="Enviar"
                        onPress={fetchSendPay}
                      />
                    </View>
                  </View>
                )}
              </ScrollView>
          </KeyboardAwareScrollView>
          {(isRecharge || isPackages || isSearchInvoice) &&(
             <View style={[styles.mV5, styles.view]}>
              <ButtonsPrimary 
                label="Volver"
                onPress={() => packageService === '3' || packageService === '81' ? handleBackPackages(isProductsFinalSelected ? 0: isProductsFinal ? 1 : 2) : packageService === '82' ? handleBackInvoice(loadSearch && !isSearchInvoice && typeStepInvoice === 0 ? 0 : !loadSearch && isSearchInvoice && typeStepInvoice === 0 ? 1 : 2) : setIsRecharge(false)}
              />
            </View>
          )}
        </View>
      </View>
      {showError &&(
        <InfoModal 
            type={typeMessage} 
            message={messageError} 
            onPress={() => handleFinishTransaction(typeFinish)} 
            isVisible={showError}                    
        />
      )}
    </ViewFadeIn>
  );
}
