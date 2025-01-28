import "dotenv/config";

export default ({ config }) => ({
    ...config,
    extra: {
        contacto: {
            nit: "901123567-0",
            correo: "sac@masivos.com.co",            
            ciudad: "Bogotá D.C",
            departamento: "Bogotá D.C",
        },
        text: {
            "primaryBold": {
                "fontFamily": "Montserrat_700Bold"
            },
            "primaryRegular": {
                "fontFamily": "Montserrat_400Regular"
            }
        },
        colorPrimary: "#2FAC66",
        colorSecondary: "#008D36",
        colorSecondaryDark: "#333333",
        router: {
            "origin": false
        },
        eas: {
            "projectId": "9c89780a-07a9-43a0-8f4b-f242a7ca18ff"
        },
        adoUrl: process.env.EXPO_PUBLIC_URL_ADO,
        registroUrl: process.env.EXPO_PUBIC_URL_REGISTRO,
        secretEncypt: process.env.EXPO_SECRET_KEY,
        idWsc: process.env.EXPO_ID_APP_WSC,
        idApp: process.env.EXPO_PUBLIC_ID_APP,
        apiKeyAdo: process.env.EXPO_APIKEY_ADO,
        userAdo: process.env.EXPO_USER_ADO,
        version: process.env.EXPO_VERSION
    },
});