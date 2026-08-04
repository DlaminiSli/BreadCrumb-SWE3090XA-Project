import React from "react";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import BottomNavigation from "../components/BottomNavigation";

import { useTheme } from "../context/ThemeContext";

export default function AppearanceScreen({ navigation }) {
  const {
    appearance,

    changeAppearance,

    colors,
  } = useTheme();

  function Option({
    title,

    icon,

    value,
  }) {
    const selected = appearance === value;

    return (
      <TouchableOpacity
        onPress={() => changeAppearance(value)}
        style={{
          marginHorizontal: 20,

          marginTop: 18,

          backgroundColor: selected ? "#F3FFE6" : colors.card,

          borderRadius: 18,

          padding: 18,

          borderWidth: 2,

          borderColor: selected ? "color={colors.accent}" : colors.border,

          flexDirection: "row",

          justifyContent: "space-between",

          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
          }}
        >
          <Ionicons
            name={icon}
            size={24}
            color={selected ? "color={colors.accent}" : colors.accent}
          />

          <Text
            style={{
              marginLeft: 15,
              fontSize: 17,
              fontWeight: "600",
              color: selected ? "#222222" : colors.text,
            }}
          >
            {title}
          </Text>
        </View>

        {selected && (
          <Ionicons name="checkmark-circle" size={24} color={colors.accent} />
        )}
      </TouchableOpacity>
    );
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

            marginTop: 20,

            marginLeft: 20,

            color: colors.text,
          }}
        >
          Appearance
        </Text>

        <Text
          style={{
            marginHorizontal: 20,

            marginTop: 10,

            color: colors.secondary,

            lineHeight: 24,
          }}
        >
          Choose how BreadCrumb should appear.
        </Text>

        <Option
          title="System Default"
          icon="phone-portrait-outline"
          value="system"
        />

        <Option title="Light" icon="sunny-outline" value="light" />

        <Option title="Dark" icon="moon-outline" value="dark" />

        <View
          style={{
            height: 100,
          }}
        />
      </ScrollView>

      <BottomNavigation navigation={navigation} active="Profile" />
    </SafeAreaView>
  );
}
