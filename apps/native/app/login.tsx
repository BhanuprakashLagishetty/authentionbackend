import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleOTP = () => {
    if (input.trim()) {
      router.push("/otp"); // Navigate to the OTP screen
    } else {
      alert("Please enter a valid phone number or email");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Image
          source={require("../assets/images/logo.png")} // Correct relative path to your logo
          style={styles.logo}
        />
      </View>

      {/* Super Family image under the logo */}
      <Image
        source={require("../assets/images/image.png")} // Adjust the path for the Super Family image
        style={styles.superFamilyImage}
      />

      <View style={styles.dividerContainer}>
        <Text style={styles.dividerText}>LOGIN WITH</Text>
      </View>

      <View style={styles.inputLabelContainer}>
        <Text style={styles.inputLabelText}>Phone Number or Email ID</Text>
      </View>

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Enter your phone or email"
        placeholderTextColor="#A9A9A9" // Grey text for the placeholder
      />

      <TouchableOpacity style={styles.otpButton} onPress={handleOTP}>
        <Text style={styles.otpButtonText}>Verify with OTP</Text>
      </TouchableOpacity>

      <Text style={styles.signInText}>Sign In With</Text>
      <View style={styles.socialIconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="facebook" size={30} color="#4267B2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="google" size={30} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="apple" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
  logo: {
    width: 250,
    height: 60, // Adjusted height to match the design
    resizeMode: "contain",
    marginBottom: 10,
  },
  superFamilyImage: {
    width: 100,
    height: 100, // Adjust size as per design
    resizeMode: "contain",
    marginBottom: 20,
  },
  dividerContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  dividerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C7EF5",
  },
  input: {
    width: "90%", // Slightly reduced width
    height: 50,
    borderColor: "#D3D3D3", // Light grey border color
    borderWidth: 1,
    borderRadius: 25, // Rounded corners
    marginBottom: 20,
    fontSize: 16,
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5", // Light grey background color
    color: "#000", // Black text
  },
  inputLabelContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  inputLabelText: {
    fontSize: 16,
    color: "#A9A9A9",
  },
  otpButton: {
    width: "90%", // Reduced width for the button
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 25, // Rounded corners for button
    alignItems: "center",
    marginBottom: 20,
  },
  otpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signInText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  iconButton: {
    marginHorizontal: 10,
  },
});
