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

export const errorMessageRegister = {
    "01": "La modalidad ingresada no es válida.",
    "02": "Esta modalidad no está disponible en nuestro sistema.",
    "03": "El código de oficina ingresado no es válido.",
    "04": "El tipo de persona ingresado no es válido.",
    "05": "El tipo de documento ingresado no es válido.",
    "06": "El documento del cliente no puede estar vacío.",
    "07": "La fecha de expedición del documento no puede estar vacía.",
    "08": "La ciudad de expedición del documento no es válida.",
    "09": "El primer apellido no puede estar vacío o contiene caracteres no permitidos.",
    "10": "El nombre del cliente no puede estar vacío o contiene caracteres no permitidos.",
    "11": "El número de celular ingresado no es válido.",
    "12": "La dirección de correo electrónico ingresada no es válida.",
    "13": "Error al validar si el cliente tiene un depósito electrónico o si el correo o el celular ya están en uso.",
    "14": "El cliente está en una lista restrictiva.",
    "15": "No se puede crear el depósito. \n\n El cliente ya tiene un depósito de bajo monto registrado con el Banco Cooperativo Coopcentral.",
    "16": "La dirección de correo electrónico ya está registrada para otro cliente.",
    "17": "El número de celular ya está registrado para otro cliente.",
    "18": "El segundo apellido contiene caracteres no permitidos.",
    "19": "La opción de exención de GMF ingresada no es válida.",
    "20": "El tipo de género ingresado no es válido.",
    "21": "El cliente no existe en el sistema o no ha actualizado tu información.",
    "22": "El cliente lleva más de 330 días sin actualizar tu información. Por favor, actualízala primero.",
    "23": "El tipo de persona ingresado no coincide con el tipo de documento del cliente.",
    "24": "El cliente se encuentra en listas PEPS.",
    "25": "La información del cliente está incompleta o desactualizada. Por favor, actualízala primero.",
    "26": "La fecha de nacimiento no puede estar vacía o es inválida.",
    "27": "La fecha de nacimiento no puede ser mayor a la fecha actual.",
    "28": "La fecha de expedición del documento no puede ser mayor a la fecha actual.",
    "29": "La fecha de nacimiento no puede ser posterior a la fecha de expedición del documento.",
    "30": "El tipo de documento del tutor no es válido.",
    "31": "El documento del tutor no puede estar vacío o es inválido.",
    "32": "El nombre del tutor no puede estar vacío o contiene caracteres no permitidos.",
    "33": "El tutor está en una lista restrictiva.",
    "34": "El tutor se encuentra en listas PEPS."
}

export const errorCancelAccount = {
    "01": "El tipo de documento no es válido.",
    "02": "El tipo o número de documento no es válido, o el cliente no existe en el sistema.",
    "03": "El número de cuenta no puede estar vacío.",
    "04": "El tamaño de la cuenta no es válido.",
    "05": "El documento del cliente no puede estar vacío.",
    "06": "La cuenta que intentas consultar no existe.",
    "07": "El documento no pertenece al titular de la cuenta.",
    "08": "La cuenta ha sido cancelada.",
    "09": "El tipo de operación a realizar sobre la cuenta no es válido.",
    "10": "La cuenta ya está bloqueada. No se puede realizar esta operación.",
    "11": "La cuenta ya está desbloqueada. No se puede realizar esta operación.",
    "12": "Para cancelar la cuenta, debe tener un saldo de cero."
}

export const typeTransactionResponse = [
    {
        tipoMov: 13,
        docMov: "TPWAY",
        desc: "NOTA CRÉDITO REVERSO TRANSACCIÓN CORRESPONSAL DIGITAL"
    },
    {
        tipoMov: 14,
        docMov: "TPWAY",
        desc: "NOTA CRÉDITO REVERSO COMISIÓN TRX CORRESPONSAL DIGITAL"
    },
    {
        tipoMov: 19,
        docMov: "TRETN",
        desc: "NOTA CRÉDITO TRANSACCIÓN ELECTRÓNICA"
    },
    {
        tipoMov: 20,
        docMov: "AJUST",
        desc: "NOTA CRÉDITO POR AJUSTE INTERNO"
    },
    {
        tipoMov: 26,
        docMov: "TRETN",
        desc: "REVERSO COMISIÓN TRANSACCIÓN ELECTRÓNICA"
    },
    {
        tipoMov: 27,
        docMov: "TPWAY",
        desc: "REVERSO GMF TRX CORRESPONSAL DIGITAL"
    },
    {
        tipoMov: 27,
        docMov: "TDBAN",
        desc: "REVERSO GMF TRANSACCIÓN ELECTRÓNICA"
    },
    {
        tipoMov: 37,
        docMov: "TRETN",
        desc: "REVERSO GMF RECHAZO TRANSACCIÓN ELECTRÓNICA"
    },
    {
        tipoMov: 42,
        docMov: "BCBTA",
        desc: "NOTA CRÉDITO ABONO CORRESPONSAL FÍSICO"
    },
    {
        tipoMov: 42,
        docMov: "TPWAY",
        desc: "NOTA CRÉDITO ABONO CORRESPONSAL DIGITAL"
    },
    {
        tipoMov: 42,
        docMov: "TRETN",
        desc: "NOTA CRÉDITO ABONO INTERBANCARIO"
    },
    {
        tipoMov: 43,
        docMov: "TRETN",
        desc: "NOTA CRÉDITO REVERSO TRANSACCIÓN INTERBANCARIA"
    },
    {
        tipoMov: 45,
        docMov: "TDBAN",
        desc: "REVERSO TRANSACCIÓN CON TARJETA DÉBITO"
    },
    {
        tipoMov: 47,
        docMov: "TDBAN",
        desc: "REVERSO TRANSACCIÓN CON TARJETA DÉBITO POS"
    },
    {
        tipoMov: 48,
        docMov: "TDBAN",
        desc: "REVERSO TRANSACCIÓN CON TARJETA DÉBITO ATM"
    },
    {
        tipoMov: 49,
        docMov: "TDBAN",
        desc: "REVERSO COMISIÓN TRANSACCIÓN CON TD"
    },
    {
        tipoMov: 70,
        docMov: "AJUST",
        desc: "NOTA DÉBITO POR AJUSTE INTERNO"
    },
    {
        tipoMov: 73,
        docMov: "TDBAN",
        desc: "COBRO GMF TRANSACCIÓN ELECTRÓNICA"
    },
    {
        tipoMov: 73,
        docMov: "TPWAY",
        desc: "COBRO GMF RETIRO CORRESPONSAL DIGITAL"
    },
    {
        tipoMov: 73,
        docMov: "TRETN",
        desc: "COBRO GMF TRANSACCIÓN ELECTRÓNICA"
    },
    {
        tipoMov: 79,
        docMov: "TPWAY",
        desc: "COMISIÓN RETIRO CORRESPONSAL DIGITAL"
    },
    {
        tipoMov: 81,
        docMov: "TPWAY",
        desc: "NOTA DÉBITO RETIRO CORRESPONSAL DIGITAL"
    },
    {
        tipoMov: 81,
        docMov: "TRETN",
        desc: "NOTA DÉBITO RETIRO INTERBANCARIO"
    },
    {
        tipoMov: 84,
        docMov: "TPWAY",
        desc: "NOTA DÉBITO REVERSO TRANSACCIÓN CORRESPONSAL DIGITAL"
    },
    {
        tipoMov: 86,
        docMov: "TRETN",
        desc: "COMISIÓN RETIRO INTERBANCARIO"
    },
    {
        tipoMov: 91,
        docMov: "TDBAN",
        desc: "NOTA DÉBITO RETIRO CON TARJETA DÉBITO COOPCENTRAL"
    },
    {
        tipoMov: 92,
        docMov: "TDBAN",
        desc: "COMISIÓN RETIRO CON TARJETA DÉBITO COOPCENTRAL"
    },
    {
        tipoMov: 96,
        docMov: "TDBAN",
        desc: "NOTA DÉBITO COMPRA CON TARJETA DÉBITO COOPCENTRAL"
    }
];

export const documentType = {
    1: 'C',
    2: 'P',
    17: 'V'
};

export const listDocumentType = [
    {name: 'Cédula Ciudadanía', value: 'C'},
    //{name: 'PPT',value: 'V'}
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
    {name: 'Jubilado', value: '5'}
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
    { name: 'Régimen de bajo monto', value: '1' },
    { name: 'Régimen tributario especial', value: '2' },
    { name: 'Régimen simple de tributación', value: '3' },
    { name: 'No contribuyente', value: '4' }
];


export const listBienesType = [
    { name: 'Casa', value: '1' },
    { name: 'Apartamento', value: '2' },
    { name: 'Finca', value: '3' },
    { name: 'Otro', value: '4' },
    { name: 'No reporta', value: '5' },
];

export const listBienesJurType = [
    { name: 'Casa', value: '1' },
    { name: 'Apartamento', value: '2' },
    { name: 'Finca', value: '3' },
    { name: 'Otro', value: '4' },
    { name: 'No reporta', value: '5' },
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

export const listAssociationType = [
    {name: 'Cooperativa de ahorro y crédito', value: '1'},
    {name: 'Cooperartiva multiactiva', value: '2'},
    {name: 'Fondo de empleados', value: '3'},
    {name: 'Otras solidarias', value: '4'},
    {name: 'Sociedad Anómima Vigilada por SFC', value: '5'},
    {name: 'Sociedad Anómima', value: '6'},
    {name: 'S.A.S', value: '7'},
    {name: 'Empresas públicas', value: '8'},
    {name: 'Otras', value: '9'}
];