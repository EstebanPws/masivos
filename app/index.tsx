import { StyleSheet, Image, View, Platform, TouchableOpacity } from "react-native";
import { Icon, Text } from "react-native-paper";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ViewFadeIn from "@/components/viewFadeIn";
import Inputs from "@/components/forms/inputs/inputs";
import Constants from "expo-constants";
import ButtonsPrimary from "@/components/forms/buttons/buttonPrimary/button";
import ButtonsSecondary from "@/components/forms/buttons/buttonSecondary/button";
import { useRouter } from "expo-router";

const extra = Constants.expoConfig?.extra || {};
const { colorPrimary } = extra;
const { primaryBold, primaryRegular } = extra.text;

export default function Page() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('auth/pin');
  }

  const handleRegister = () => {
    router.push('auth/signUp');
  }

  return (
    <ViewFadeIn>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        extraHeight={Platform.select({ ios: 100, android: 120 })}
      >
        <View style={styles.containerImage}>
          <Image source={require('../assets/images/general/home.webp')} resizeMode="cover" style={styles.image} />
          <View style={styles.header}>
            <Image source={require('../assets/images/general/logo.webp')} resizeMode="contain" style={styles.logo} />
          </View>
          <View style={styles.containerText}>
            <Text style={{ ...primaryBold, ...styles.textWhite }} variant="headlineMedium">¡Bienvenido!</Text>
            <Text style={{ ...primaryRegular, ...styles.textWhite }} variant="titleLarge">Por favor identificate para entrar en tu cuenta.</Text>
          </View>
          <View style={styles.containerForm}>
            <Inputs
              label="Número del documento"
              placeholder="Escribe tu número de documento"
              isSecureText={false}
              isRequired={false}
              keyboardType="numeric"
            />
            <ButtonsPrimary
              label="Acceder a la billetera"
              style={styles.mt5}
              onPress={handleLogin}
            />
          </View>
          <View style={{...styles.row, ...styles.mt5}}>
            <TouchableOpacity>
              <View style={styles.row}>
                <View style={styles.icon}>
                  <Icon
                    source="account"
                    color={colorPrimary}
                    size={20}
                  />
                </View>
                <Text style={{ ...primaryBold, color: colorPrimary }}>Face ID</Text>
              </View>
            </TouchableOpacity>
            <ButtonsSecondary
              label="Registrarse"
              onPress={handleRegister}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ViewFadeIn>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  containerImage: {
    position: 'relative',
    flex: 1,
  },
  image: {
    height: 500,
    paddingBottom: 50,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: [{ translateX: -125 }],
    backgroundColor: '#fff',
    width: 250,
    zIndex: 2,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    paddingTop: 30,
    alignItems: 'center',
  },
  logo: {
    width: 200
  },
  containerText: {
    position: 'absolute',
    bottom: '46%',
    left: 30,
    right: 30,
    zIndex: 2,
  },
  containerForm: {
    marginVertical: 30,
    paddingHorizontal: 40
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  textWhite: {
    color: '#fff'
  },
  icon: {
    borderWidth: 2,
    borderColor: colorPrimary,
    padding: 5,
    borderRadius: 5,
    marginRight: 5
  },
  mt5: {
    marginTop: 30
  }
});