import "dotenv/config";

export default ({ config }) => ({
    ...config,
    extra: {
        contacto: {
            nit: "901156998-3",
            correo: "sac@smabax.com.co",
            ciudad: "Bogotá D.C",
            departamento: "Bogotá D.C"
        },
        text: {
            "primaryBold": {
                "fontFamily": "Montserrat_700Bold"
            },
            "primaryRegular": {
                "fontFamily": "Montserrat_400Regular"
            }
        },
        colorPrimary: "#ff003f",
        colorSecondary: "#d80c3e",
        colorSecondaryDark: "#333333",
        router: {
            "origin": false
        },
        eas: {
            "projectId": "b9f4b201-c8f6-45de-b8b4-7e3ca9fd097e"
        },
        adoUrl: process.env.EXPO_PUBLIC_URL_ADO,
        registroUrl: process.env.EXPO_PUBIC_URL_REGISTRO,
        secretEncypt: process.env.EXPO_SECRET_KEY,
        idWsc: process.env.EXPO_ID_APP_WSC,
        idApp: process.env.EXPO_PUBLIC_ID_APP,
        apiKeyAdo: process.env.EXPO_APIKEY_ADO,
        userAdo: process.env.EXPO_USER_ADO
    },
});