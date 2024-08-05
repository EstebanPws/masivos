export const stateMessages = {
    1: "Estamos revisando tus documentos y detectamos algo que necesita un análisis adicional. \n\nNuestro equipo lo está verificando y te daremos una respuesta pronto.",
    2: "El proceso fue exitoso.",
    4: "Tu documento es auténtico, pero no pudimos verificar tu rostro con la selfie proporcionada.",
    5: "Las imágenes que proporcionaste son de baja calidad. \n\nPor favor, intenta capturarlas nuevamente con mayor claridad.",
    6: "El formato del documento que proporcionaste no es válido según nuestros acuerdos de servicio.",
    7: "Estamos llevando a cabo un análisis adicional para verificar la autenticidad de tus documentos. \n\nEsto puede tomar algo de tiempo.",
    8: "Tu documento parece haber sido alterado. \n\nNecesitamos verificar más detalles antes de continuar.",
    9: "El documento proporcionado parece ser falso. \n\nNo podemos continuar con el proceso.",
    10: "El rostro en la selfie no coincide con el de tu documento. \n\nPor favor, intenta de nuevo.",
    11: "La huella dactilar no coincide con la registrada en tu documento. \n\nPor favor, verifica y vuelve a intentarlo.",
    14: "Ya tenemos un registro previo de tu rostro o tu número de identificación.",
    15: "Ocurrió un error en la comunicación o el servidor está lento. \n\nPor favor, intenta de nuevo más tarde.",
    16: "Tu nombre o número de identificación coincide con una lista de control. \n\nNecesitamos verificar más detalles.",
    17: "Has cancelado el proceso. \n\nSi fue un error, por favor intenta de nuevo.",
    18: "Tu número de identificación ha sido bloqueado temporalmente. \n\nPor favor, contacta con soporte para más detalles."
};

export const documentType = {
    1: 'C',
    2: 'P',
    5: 'T',
    17: 'V'
};

export const listDocumentType = [
    {name: 'Cédula Ciudadanía', value: 'C'},
    {name: 'Tarjeta Identidad', value: 'T'},
    {name: 'Pasaporte', value: 'P'},
    {name: 'PPT',value: 'V'}
];

export const listGenderType = [
    {name: 'Femenino', value: 'F'},
    {name: 'Masculino', value: 'M'}
];

export const listCivilStatusType = [
    {name: 'Soltero', value: '1'},
    {name: 'Casado', value: '2'},
    {name: 'Separado', value: '3'},
    {name: 'Viudo', value: '4'},
    {name: 'Divorciado', value: '5'},
    {name: 'Union libre', value: '6'}
];

export const listEducationType = [
    {name: 'Primaria', value: '1'},
    {name: 'Bachiller', value: '2'},
    {name: 'Técnico', value: '3'},
    {name: 'Universitario', value: '4'},
    {name: 'Postgrado', value: '5'},
    {name: 'Analfabeta', value: '6'},
    {name: 'No aplica', value: '7'},
    {name: 'No reporta', value: '8'}
];

export const listOcupationType = [
    {name: 'Estudiante', value: '1'},
    {name: 'Independiente', value: '2'},
    {name: 'Empleado', value: '3'},
    {name: 'Ama de casa', value: '4'},
    {name: 'Jubilado', value: '5'},
    {name: 'Menor de edad', value: '6'}
];

export const listUbicationZoneType = [
    {name: 'Zona rural', value: 'R'},
    {name: 'Zona urbana', value: 'U'}
];

export const listHousingType = [
    {name: 'Propia', value: '1'},
    {name: 'Arrendada', value: '2'},
    {name: 'Familiar', value: '3'},
    {name: 'No posee', value: '4'}
];

export const listStreetType = [
    { name: 'Avenida Calle', value: 'AC' },
    { name: 'Avenida Carrera', value: 'AK' },
    { name: 'Avenida', value: 'AV' },
    { name: 'Boulevard', value: 'BLV' },
    { name: 'Calle', value: 'CL' },
    { name: 'Carrera', value: 'CR' },
    { name: 'Circular', value: 'CIR' },
    { name: 'Conjunto Residencial', value: 'CON' },
    { name: 'Diagonal', value: 'DG' },
    { name: 'Kilómetro', value: 'KM' },
    { name: 'Manzana', value: 'MZ' },
    { name: 'Pasaje', value: 'PJ' },
    { name: 'Transversal', value: 'TV' },
    { name: 'Variante', value: 'VTE' }
];

export const listSuffixType = [
    { name: 'Norte', value: 'N' },
    { name: 'Sur', value: 'S' },
    { name: 'Este', value: 'E' },
    { name: 'Oeste', value: 'O' }
];

export const listAddressOtherType = [
    { name: 'Apartamento', value: 'AP' },
    { name: 'Bloque', value: 'BL' },
    { name: 'Casa', value: 'CA' },
    { name: 'Edificio', value: 'ED' },
    { name: 'Etapa', value: 'ET' },
    { name: 'Garaje', value: 'GJ' },
    { name: 'Interior', value: 'IN' },
    { name: 'Local', value: 'LC' },
    { name: 'Oficina', value: 'OF' },
    { name: 'Parque', value: 'PAR' },
    { name: 'Piso', value: 'P' },
    { name: 'Torre', value: 'TO' },
    { name: 'Unidad', value: 'UN' },
    { name: 'Urbanización', value: 'URB' }
];

export const listTaxesType = [
    { name: 'Régimen ordinario', value: '1' },
    { name: 'Régimen tributario especial', value: '2' },
    { name: 'Régimen simple de tributación', value: '3' },
    { name: 'No contribuyente', value: '4' }
];

export const listBienesType = [
    { name: 'Casa', value: '1' },
    { name: 'Apartamento', value: '2' },
    { name: 'Finca', value: '3' },
    { name: 'Otro', value: '4' },
    { name: 'No reporta', value: '5' }
];

export const listAutoTypes = [
    {value: '01', name: 'FORD' },                                   
    {value: '02', name: 'CHEVROLET' },                              
    {value: '03', name: 'DODGE' },                                  
    {value: '04', name: 'RENAULT' },                                
    {value: '05', name: 'MAZDA' },                                  
    {value: '06', name: 'KIA' },                                    
    {value: '07', name: 'MERCEDES BENZ' },                           
    {value: '08', name: 'HYUNDAI' },                                
    {value: '09', name: 'SUBARU' },                                 
    {value: '10', name: 'TOYOTA' },                                 
    {value: '11', name: 'NISSAN' },                                 
    {value: '12', name: 'VOLKSWAGEN' },                             
    {value: '13', name: 'SUZUKI' },                                 
    {value: '14', name: 'HONDA' },                                  
    {value: '15', name: 'DAEWOO'},                                  
    {value: '16', name: 'B.M.W.'},                                  
    {value: '17', name: 'DAIHATSU'},                                
    {value: '18', name: 'MITSUBISHI'},                              
    {value: '19', name: 'ROMARCO'},                                 
    {value: '20', name: 'OTRAS MARCAS'},                            
    {value: '21', name: 'YAMAHA'},                                  
    {value: '22', name: 'KENWORTH'},                                
    {value: '23', name: 'INCA'},                                    
    {value: '24', name: 'MACK'},                                    
    {value: '25', name: 'INTERNATIONAL'},                           
    {value: '26', name: 'FREIGHLINER'},                             
    {value: '27', name: 'JMC'},                                     
    {value: '28', name: 'SIGMA'},                                   
    {value: '29', name: 'JINBEI'},                                  
    {value: '30', name: 'HAFEI'},                                   
    {value: '31', name: 'FOTON'},                                   
    {value: '32', name: 'SSANGYONG'},                               
    {value: '33', name: 'GREAT WALL'},                              
    {value: '34', name: 'FREIGHTLINER'},                            
    {value: '35', name: 'HINO'},                                    
    {value: '36', name: 'CHERY'},                                   
    {value: '37', name: 'JAC'},                                     
    {value: '38', name: 'SCANIA'},                                  
    {value: '39', name: 'GEELY'},                                   
    {value: '40', name: 'DFSK'},                                    
    {value: '41', name: 'YUTONG'}                             
]

export const listOperationType = [
    { name: 'Importación', value: '1' },
    { name: 'Inversión', value: '2' },
    { name: 'Exportación', value: '3' },
    { name: 'Tranferencia', value: '4' },
    { name: 'Prestamo en moneda extranjera', value: '5' },
    { name: 'Pago de servicios', value: '6' },
    { name: 'Otro', value: '7' },
    { name: 'No reporta', value: '8' }
];

export const listCurrencyType = [
    {value: '0',name: 'No reporta'},
    {value: '1',name: 'Peso'},	
    {value: '2',name: 'Dólar'},
    {value: '3',name: 'Real'},	
    {value: '4',name: 'Royal'},
    {value: '5',name: 'Yuan'},	
    {value: '6',name: 'Won'},	
    {value: '7',name: 'Colon'},	
    {value: '8',name: 'Corona Danesa'},
    {value: '9',name: 'Driham'},	
    {value: '10',name: 'Quetzal'},	
    {value: '11',name: 'Lempira'},	
    {value: '12',name: 'Rupia'},	
    {value: '13',name: 'Libra Esterlina'},
    {value: '14',name: 'Yen'},	
    {value: '15',name: 'Corona Noruega'},
    {value: '16',name: 'guaraní'},
    {value: '17',name: 'Nuevo Sol'}, 	
    {value: '18',name: 'Libra'},	
    {value: '19',name: 'Corona Sueca'},	
    {value: '20',name: 'Franco Suizo'}, 
    {value: '21',name: 'Baht'},	
    {value: '22',name: 'Euro'},	
    {value: '23',name: 'Bolívar'}
];