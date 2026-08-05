import React, { useState } from "react";
import { registerUser } from "../services/authService";

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import InputField from "../components/authentication/InputField";

import CountryDropdown from "../components/authentication/CountryDropdown";

import PasswordInput from "../components/authentication/PasswordInput";

import SocialDivider from "../components/authentication/SocialDivider";

import GoogleButton from "../components/authentication/GoogleButton";

import PrimaryButton from "../components/PrimaryButton";

import styles from "./SignupStyles";

export default function Signup({ navigation }) {
  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState({
    country: "Eswatini",

    countryCode: "+268",

    flag: "🇸🇿",
  });

  async function handleSignup() {
    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
      phoneNumber.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert("Please complete all the fields.");

      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");

      return;
    }

    try {
      setLoading(true);

      await registerUser({
        fullName,

        email,

        password,

        phoneNumber,

        country: selectedCountry.country,

        currency: selectedCountry.country,

        countryCode: selectedCountry.countryCode,
      });

      setLoading(false);

      alert("Account created successfully!");

      navigation.replace("Dashboard");
    } catch (error) {
      setLoading(false);

      alert(error.message);
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#222" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logos/logo.png")}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Create Account</Text>

      <Text style={styles.subtitle}>Start saving smarter today.</Text>

      <InputField
        icon="person-outline"
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <InputField
        icon="mail-outline"
        placeholder="Email Address"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <CountryDropdown
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />

      <View style={styles.phoneContainer}>
        <View style={styles.countryCodeContainer}>
          <Text style={styles.countryCode}>{selectedCountry.countryCode}</Text>
        </View>

        <TextInput
          style={styles.phoneInput}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          placeholderTextColor="#999"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {
        <>
          <PasswordInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <PasswordInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <SocialDivider />
          <GoogleButton
            onPress={() => {
              alert("Google Sign-In will be connected in the next step.");
            }}
          />
          <PrimaryButton
            title={loading ? "Creating Account..." : "Sign Up"}
            onPress={handleSignup}
          />
          <View style={styles.loginContainer}>
            <Text style={styles.loginLabel}>Already have an account?</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginButton}>Login</Text>
            </TouchableOpacity>
          </View>
        </>
      }
    </ScrollView>
  );
}
