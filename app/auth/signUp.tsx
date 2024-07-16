import { StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-router';
import ViewFadeIn from "@/components/viewFadeIn";

export default function Page() {
  return (
    <ViewFadeIn>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle} >This is the second page of your app.</Text>
        <Link href="/">View first</Link>
    </ViewFadeIn>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});