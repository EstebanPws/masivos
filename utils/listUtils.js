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
