import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { auth } from "../services/firebase";

import api from "../services/api";

import BottomNavigation from "../components/BottomNavigation";

import { useTheme } from "../context/ThemeContext";

const currencies = [
  "Eswatini",

  "South Africa",

  "Lesotho",

  "Botswana",

  "Namibia",

  "Mozambique",

  "Zimbabwe",

  "Zambia",

  "Kenya",
];

export default function CurrencyScreen({ navigation }) {
  const { colors } = useTheme();

  const [selectedCurrency, setSelectedCurrency] = useState("");

  useEffect(() => {
    loadCurrency();
  }, []);

  async function loadCurrency() {
    try {
      const token = await auth.currentUser.getIdToken();

      const response = await api.get(
        "/auth/profile",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSelectedCurrency(response.data.user.currency || "Eswatini");
    } catch (error) {
      console.log(error);
    }
  }

  async function saveCurrency() {
    try {
      const token = await auth.currentUser.getIdToken();

      await api.put(
        "/auth/profile",

        {
          currency: selectedCurrency,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Alert.alert(
        "Success",

        "Currency updated successfully.",
      );

      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Error",

        error.message,
      );
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginTop: 20,
            marginLeft: 20,
          }}
        >
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 30,
            fontWeight: "700",
            color: colors.text,
            marginTop: 20,
            marginLeft: 20,
          }}
        >
          Currency
        </Text>

        {currencies.map((currency) => (
          <TouchableOpacity
            key={currency}
            onPress={() => setSelectedCurrency(currency)}
            style={{
              marginHorizontal: 20,
              marginTop: 18,
              padding: 18,
              borderRadius: 18,
              backgroundColor: colors.card,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 17,
              }}
            >
              {currency}
            </Text>

            {selectedCurrency === currency && (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={colors.accent}
              />
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={saveCurrency}
          style={{
            backgroundColor: colors.accent,
            marginHorizontal: 20,
            marginTop: 35,
            borderRadius: 18,
            paddingVertical: 16,
            alignItems: "center",
            marginBottom: 100,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontWeight: "700",
              fontSize: 18,
            }}
          >
            Save Currency
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavigation navigation={navigation} active="Profile" />
    </SafeAreaView>
  );
}
