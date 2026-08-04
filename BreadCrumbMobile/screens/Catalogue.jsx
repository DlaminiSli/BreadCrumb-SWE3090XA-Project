import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import catalogueFiles from "../utils/CatalogueFiles";

import { useTheme } from "../context/ThemeContext";

export default function Catalogue({ navigation, route }) {
  // Get the selected catalogue from Dashboard
  const { catalogue } = route.params;

  // Get all catalogue files for this store
  const storeCatalogues = catalogueFiles[catalogue.store] || [];

  const { colors, getFontSize } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor: colors.background,
      }}
    >
      {/* Back Button */}

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          marginTop: 20,

          marginLeft: 20,

          flexDirection: "row",

          alignItems: "center",
        }}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text} />

        <Text
          style={{
            marginLeft: 8,
            fontSize: getFontSize(16),
            fontWeight: "600",
            color: colors.text,
          }}
        >
          Back
        </Text>
      </TouchableOpacity>

      {/* Store Name */}

      <Text
        style={{
          fontSize: getFontSize(28),
          fontWeight: "bold",
          marginTop: 25,
          marginHorizontal: 20,
          color: colors.text,
        }}
      >
        {catalogue.store}
      </Text>

      {/* Subtitle */}

      <Text
        style={{
          fontSize: getFontSize(16),
          color: colors.secondary,
          marginTop: 8,
          marginHorizontal: 20,
        }}
      >
        Available Catalogues
      </Text>

      <ScrollView
        style={{ marginTop: 25 }}
        showsVerticalScrollIndicator={false}
      >
        {storeCatalogues.length === 0 ? (
          <Text
            style={{
              marginHorizontal: 20,
              marginTop: 30,
              fontSize: getFontSize(16),
              color: colors.secondary,
            }}
          >
            No catalogue is available for this store.
          </Text>
        ) : (
          storeCatalogues.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate(
                  "CatalogueViewer",

                  {
                    store: catalogue.store,

                    catalogue: item,
                  },
                )
              }
              style={{
                backgroundColor: colors.card,

                marginHorizontal: 20,

                marginBottom: 16,

                borderRadius: 16,

                padding: 18,

                elevation: 2,

                shadowColor: "#000",

                shadowOpacity: 0.08,

                shadowRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(18),
                  fontWeight: "700",
                  color: colors.text,
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  marginTop: 8,
                  color: colors.secondary,
                  fontSize: getFontSize(14),
                }}
              >
                {item.type.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
