// app/tabs/index.tsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { readSampleData } from "@/utils/android-health-connect";

export default async function HomeScreen() {
  const result = readSampleData();

  const router = useRouter();

  const goToLogin = () => {
    console.log("Navigating to login screen");
    router.push("/(tabs)/profile" as any); // Correct path including the layout identifier
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button title="Go to Login" onPress={goToLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});
