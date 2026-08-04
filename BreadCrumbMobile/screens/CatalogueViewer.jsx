import React, { useState } from "react";

import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

import ImageZoom from "react-native-image-pan-zoom";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
export default function CatalogueViewer({ navigation, route }) {
  const { store, catalogue } = route.params;

  const [page, setPage] = useState(0);

  const { width, height } = Dimensions.get("window");

  const { colors, getFontSize } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginLeft: 20,
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

      <Text
        style={{
          fontSize: getFontSize(28),
          fontWeight: "bold",
          marginTop: 20,
          marginLeft: 20,
          color: colors.text,
        }}
      >
        {store}
      </Text>

      <Text
        style={{
          fontSize: getFontSize(16),
          color: colors.secondary,
          marginTop: 5,
          marginLeft: 20,
        }}
      >
        {catalogue.title}
      </Text>

      <>
        <Text
          style={{
            alignSelf: "center",
            marginTop: 15,
            fontWeight: "600",
            fontSize: getFontSize(15),
            color: colors.text,
          }}
        >
          Page {page + 1} of {catalogue.pages.length}
        </Text>

        <ImageZoom
          cropWidth={width}
          cropHeight={height * 0.65}
          imageWidth={width}
          imageHeight={height * 0.65}
        >
          <Image
            source={catalogue.pages[page]}
            resizeMode="contain"
            style={{
              width: width,

              height: height * 0.65,
            }}
          />
        </ImageZoom>

        <View
          style={{
            flexDirection: "row",

            justifyContent: "space-between",

            paddingHorizontal: 25,

            marginBottom: 25,
          }}
        >
          <TouchableOpacity
            disabled={page === 0}
            onPress={() => setPage(page - 1)}
          >
            <Ionicons
              name="chevron-back-circle"
              size={42}
              color={page === 0 ? colors.secondary : "#009245"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            disabled={page === catalogue.pages.length - 1}
            onPress={() => setPage(page + 1)}
          >
            <Ionicons
              name="chevron-forward-circle"
              size={42}
              color={
                page === catalogue.pages.length - 1
                  ? colors.secondary
                  : "#009245"
              }
            />
          </TouchableOpacity>
        </View>
      </>
    </SafeAreaView>
  );
}
