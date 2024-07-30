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

export const listPaisType = [
    {value: '013', name: 'AFGANISTAN'},
    {value: '017', name: 'ALBANIA'},
    {value: '000', name: 'ANTARTIDA'},
    {value: '059', name: 'ARGELIA'},
    {value: '690', name: 'SAMOA AMERICANA'},
    {value: '037', name: 'ANDORRA'},
    {value: '040', name: 'ANGOLA'},
    {value: '043', name: 'ANTIGUA Y BARBUDA'},
    {value: '074', name: 'AZERBAIYAN'},
    {value: '063', name: 'ARGENTINA'},
    {value: '069', name: 'AUSTRALIA'},
    {value: '072', name: 'AUSTRIA'},
    {value: '077', name: 'BAHAMAS'},
    {value: '080', name: 'BAREIN'},
    {value: '081', name: 'BANGLADES'},
    {value: '026', name: 'ARMENIA'},
    {value: '083', name: 'BARBADOS'},
    {value: '087', name: 'BELGICA'},
    {value: '090', name: 'BERMUDAS'},
    {value: '119', name: 'BUTAN'},
    {value: '097', name: 'BOLIVIA'},
    {value: '029', name: 'BOSNIA Y HERZEGOVINA'},
    {value: '101', name: 'BOTSUANA'},
    {value: '000', name: 'ISLA BOUVET'},
    {value: '105', name: 'BRASIL'},
    {value: '088', name: 'BELICE'},
    {value: '787', name: 'TERRITORIO BRITANICO DEL OCEANO INDICO'},
    {value: '677', name: 'ISLAS SALOMON'},
    {value: '863', name: 'ISLAS VIRGENES (BRITANICAS)'},
    {value: '108', name: 'BRUNEI DARUSSALAM'},
    {value: '111', name: 'BULGARIA'},
    {value: '093', name: 'MYANMAR'},
    {value: '115', name: 'BURUNDI'},
    {value: '091', name: 'BIELORRUSIA'},
    {value: '141', name: 'CAMBOYA'},
    {value: '145', name: 'CAMERUN'},
    {value: '149', name: 'CANADA'},
    {value: '127', name: 'CABO VERDE'},
    {value: '137', name: 'ISLAS CAIMAN'},
    {value: '640', name: 'REPUBLICA CENTROAFRICANA'},
    {value: '750', name: 'SRI LANKA'},
    {value: '203', name: 'CHAD'},
    {value: '211', name: 'CHILE'},
    {value: '215', name: 'CHINA'},
    {value: '218', name: 'TAIWAN'},
    {value: '511', name: 'ISLA DE NAVIDAD'},
    {value: '165', name: 'ISLAS COCOS (KEELING)'},
    {value: '169', name: 'COLOMBIA'},
    {value: '173', name: 'COMORAS'},
    {value: '000', name: 'MAYOTTE'},
    {value: '177', name: 'CONGO'},
    {value: '888', name: 'REPUBLICA DEMOCRATICA DEL CONGO'},
    {value: '183', name: 'ISLAS COOK'},
    {value: '196', name: 'COSTA RICA'},
    {value: '198', name: 'CROACIA'},
    {value: '199', name: 'CUBA'},
    {value: '221', name: 'CHIPRE'},
    {value: '644', name: 'REPUBLICA CHECA'},
    {value: '229', name: 'BENIN'},
    {value: '232', name: 'DINAMARCA'},
    {value: '235', name: 'DOMINICA'},
    {value: '647', name: 'REPUBLICA DOMINICANA'},
    {value: '239', name: 'ECUADOR'},
    {value: '242', name: 'EL SALVADOR'},
    {value: '331', name: 'GUINEA ECUATORIAL'},
    {value: '253', name: 'ETIOPIA'},
    {value: '243', name: 'ERITREA'},
    {value: '251', name: 'ESTONIA'},
    {value: '259', name: 'ISLAS FEROE'},
    {value: '000', name: 'ISLAS FALKLAND (MALVINAS)'},
    {value: '000', name: 'GEORGIA DEL SUR Y LAS ISLAS SANDWICH DEL SUR'},
    {value: '870', name: 'FIYI'},
    {value: '271', name: 'FINLANDIA'},
    {value: '000', name: 'ISLAS ÅLAND'},
    {value: '275', name: 'FRANCIA'},
    {value: '325', name: 'GUAYANA  FRANCESA'}, 
    {value: '599', name: 'POLINESIA FRANCESA'},
    {value: '000', name: 'TERRITORIOS AUSTRALES FRANCESES'},
    {value: '783', name: 'YIBUTI'},
    {value: '281', name: 'GABON'},
    {value: '287', name: 'GEORGIA'},
    {value: '285', name: 'GAMBIA'},
    {value: '579', name: 'PALESTINA'},
    {value: '023', name: 'ALEMANIA'},
    {value: '289', name: 'GHANA'},
    {value: '293', name: 'GIBRALTAR'},
    {value: '411', name: 'KIRIBATI'},
    {value: '301', name: 'GRECIA'},
    {value: '305', name: 'GROENLANDIA'},
    {value: '297', name: 'GRANADA'},
    {value: '309', name: 'GUADALUPE'},
    {value: '313', name: 'GUAM'},
    {value: '317', name: 'GUATEMALA'},
    {value: '329', name: 'GUINEA'},
    {value: '337', name: 'GUYANA'},
    {value: '341', name: 'HAITI'},
    {value: '000', name: 'ISLA HEARD E ISLAS MCDONALD'},
    {value: '159', name: 'SANTA SEDE (CIUDAD ESTADO VATICANO)'},
    {value: '345', name: 'HONDURAS'},
    {value: '351', name: 'HONG KONG'},
    {value: '355', name: 'HUNGRIA'},
    {value: '379', name: 'ISLANDIA'},
    {value: '361', name: 'INDIA'},
    {value: '365', name: 'INDONESIA'},
    {value: '372', name: 'IRAN'},
    {value: '369', name: 'IRAK'},
    {value: '375', name: 'IRLANDA'},
    {value: '383', name: 'ISRAEL'},
    {value: '386', name: 'ITALIA'},
    {value: '193', name: 'COTE DIVOIRE'},
    {value: '391', name: 'JAMAICA'},
    {value: '399', name: 'JAPON'},
    {value: '406', name: 'KAZAJISTAN'},
    {value: '403', name: 'JORDANIA'},
    {value: '410', name: 'KENIA'},
    {value: '187', name: 'REPUBLICA DEMOCRATICA POPULAR DE COREA'},
    {value: '190', name: 'REPUBLICA DE COREA'},
    {value: '413', name: 'KUWAIT'},
    {value: '412', name: 'KIRGUISTAN'},
    {value: '420', name: 'REPUBLICA DEMOCRATICA POPULAR LAO'},
    {value: '431', name: 'LIBANO'},
    {value: '426', name: 'LESOTO'},
    {value: '429', name: 'LETONIA'},
    {value: '434', name: 'LIBERIA'},
    {value: '438', name: 'LIBIA'},
    {value: '440', name: 'LIECHTENSTEIN'},
    {value: '443', name: 'LITUANIA'},
    {value: '445', name: 'LUXEMBURGO'},
    {value: '447', name: 'MACAO'},
    {value: '450', name: 'MADAGASCAR'},
    {value: '458', name: 'MALAUI'},
    {value: '455', name: 'MALASIA'},
    {value: '461', name: 'MALDIVAS'},
    {value: '464', name: 'MALI'},
    {value: '467', name: 'MALTA'},
    {value: '477', name: 'MARTINICA'},
    {value: '488', name: 'MAURITANIA'},
    {value: '485', name: 'MAURICIO'},
    {value: '493', name: 'MEXICO'},
    {value: '498', name: 'MONACO'},
    {value: '497', name: 'MONGOLIA'},
    {value: '496', name: 'REPUBLICA DE MOLDAVIA'},
    {value: '000', name: 'MONTENEGRO'},
    {value: '501', name: 'MONTSERRAT'},
    {value: '474', name: 'MARRUECOS'},
    {value: '505', name: 'MOZAMBIQUE'},
    {value: '556', name: 'OMAN'},
    {value: '507', name: 'NAMIBIA'},
    {value: '508', name: 'NAURU'},
    {value: '517', name: 'NEPAL'},
    {value: '573', name: 'PAISES  BAJOS'},
    {value: '000', name: 'CURAÇAO'},
    {value: '027', name: 'ARUBA'},
    {value: '000', name: 'SINT MAARTEN (PARTE NEERLANDESA)'},
    {value: '000', name: 'SAN EUSTAQUIO Y SABA BONAIRE'},
    {value: '542', name: 'NUEVA CALEDONIA'},
    {value: '551', name: 'VANUATU'},
    {value: '548', name: 'NUEVA ZELANDA'},
    {value: '521', name: 'NICARAGUA'},
    {value: '525', name: 'NIGER'},
    {value: '528', name: 'NIGERIA'},
    {value: '531', name: 'NIUE'},
    {value: '535', name: 'ISLA NORFOLK'},
    {value: '538', name: 'NORUEGA'},
    {value: '469', name: 'ISLAS MARIANAS DEL NORTE'},
    {value: '566', name: 'ISLAS ULTRAMARINAS MENORES DE ESTADOS UNIDOS'},
    {value: '494', name: 'ESTADOS FEDERADOS DE MICRONESIA'},
    {value: '472', name: 'ISLAS MARSHALL'},
    {value: '578', name: 'PALAOS'},
    {value: '576', name: 'PAKISTAN'},
    {value: '580', name: 'PANAMA'},
    {value: '545', name: 'PAPUA NUEVA GUINEA'},
    {value: '586', name: 'PARAGUAY'},
    {value: '589', name: 'PERU'},
    {value: '267', name: 'FILIPINAS'},
    {value: '593', name: 'PITCAIRN'},
    {value: '603', name: 'POLONIA'},
    {value: '607', name: 'PORTUGAL'},
    {value: '334', name: 'GUINEA-BISAU'},
    {value: '788', name: 'TIMOR-LESTE'},
    {value: '611', name: 'PUERTO RICO'},
    {value: '618', name: 'QATAR'},
    {value: '660', name: 'REUNION'},
    {value: '670', name: 'RUMANIA'},
    {value: '676', name: 'FEDERACION DE RUSIA'},
    {value: '675', name: 'RUANDA'},
    {value: '000', name: 'SAN BARTOLOME'},
    {value: '710', name: 'SANTA HELENA, ASCENSION Y TRISTAN DE ACUÑA'},
    {value: '695', name: 'SAN CRISTOBAL Y NIEVES'},
    {value: '041', name: 'ANGUILA'},
    {value: '715', name: 'SANTA LUCIA'},
    {value: '000', name: 'SAN MARTIN (PARTE FRANCESA)'},
    {value: '700', name: 'SAN PEDRO Y MIQUELON'},
    {value: '705', name: 'SAN VICENTE Y LAS GRANADINAS'},
    {value: '697', name: 'SAN MARINO'}, 
    {value: '720', name: 'SANTO TOME Y PRINCIPE'},
    {value: '053', name: 'ARABIA SAUDITA'}, 
    {value: '728', name: 'SENEGAL'},
    {value: '000', name: 'SERBIA'},
    {value: '731', name: 'SEYCHELLES'},
    {value: '735', name: 'SIERRA LEONA'},
    {value: '741', name: 'SINGAPUR'},
    {value: '246', name: 'ESLOVAQUIA'},
    {value: '855', name: 'VIET NAM'},
    {value: '247', name: 'ESLOVENIA'},
    {value: '748', name: 'SOMALIA'},
    {value: '756', name: 'SUDAFRICA'},
    {value: '665', name: 'ZIMBABUE'},
    {value: '245', name: 'ESPAÑA'},
    {value: '000', name: 'SUDAN DEL SUR'},
    {value: '685', name: 'SUDAN'},
    {value: '759', name: 'SAHARA OCCIDENTAL'},
    {value: '770', name: 'SURINAM'},
    {value: '000', name: 'SVALBARD Y JAN MAYEN'},
    {value: '773', name: 'SUAZILANDIA'},
    {value: '764', name: 'SUECIA'},
    {value: '767', name: 'SUIZA'},
    {value: '744', name: 'REPUBLICA ARABE SIRIA'},
    {value: '774', name: 'TAYIKISTAN'},
    {value: '776', name: 'TAILANDIA'},
    {value: '800', name: 'TOGO'},
    {value: '805', name: 'TOKELAU'},
    {value: '810', name: 'TONGA'},
    {value: '815', name: 'TRINIDAD Y TOBAGO'},
    {value: '244', name: 'EMIRATOS ARABES UNIDOS'},
    {value: '820', name: 'TUNEZ'},
    {value: '827', name: 'TURQUIA'},
    {value: '825', name: 'TURKMENISTAN'},
    {value: '823', name: 'ISLAS TURCAS Y CAICOS'},
    {value: '828', name: 'TUVALU'},
    {value: '833', name: 'UGANDA'},
    {value: '830', name: 'UCRANIA'},
    {value: '448', name: 'LA ANTIGUA REPUBLICA YUGOSLAVA DE MACEDONIA'},
    {value: '240', name: 'EGIPTO'},
    {value: '628', name: 'REINO UNIDO'},
    {value: '000', name: 'GUERNSEY'},
    {value: '000', name: 'JERSEY'},
    {value: '000', name: 'ISLA DE MAN'},
    {value: '780', name: 'REPUBLICA UNIDA DE TANZANIA'},
    {value: '249', name: 'ESTADOS UNIDOS'}, 
    {value: '866', name: 'ISLAS VIRGENES (EE.UU.)'},
    {value: '031', name: 'BURKINA FASO'}, 
    {value: '845', name: 'URUGUAY'},
    {value: '847', name: 'UZBEKISTAN'},
    {value: '850', name: 'REPUBLICA BOLIVARIANA DE VENEZUELA'},
    {value: '875', name: 'WALLIS Y FUTUNA'},
    {value: '687', name: 'SAMOA'},
    {value: '880', name: 'YEMEN'},
    {value: '885', name: 'YUGOSLAVIA'},
    {value: '890', name: 'ZAMBIA'},
    {value: '999', name: 'EXTRANJERO'}
]