import React from "react";

import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import BottomNavigation from "../components/BottomNavigation";

import { useTheme } from "../context/ThemeContext";

export default function SavingsScreen({ navigation }) {
  const { colors, getFontSize } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor: colors.background,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginTop: 20,

            marginLeft: 20,
          }}
        >
          <Ionicons name="arrow-back" size={26} color={colors.text} />
        </TouchableOpacity>

        <View
          style={{
            marginHorizontal: 20,

            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(30),

              fontWeight: "700",

              color: colors.text,
            }}
          >
            My Savings
          </Text>

          <Text
            style={{
              color: colors.secondary,
              lineHeight: 22,
              fontSize: getFontSize(15),
            }}
          >
            Small savings today become big savings tomorrow.
          </Text>
        </View>

        {/* Total Savings */}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 25,
            backgroundColor: colors.card,
            borderRadius: 25,
            padding: 22,
            elevation: 3,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  color: colors.secondary,
                  fontSize: getFontSize(15),
                }}
              >
                Total Savings
              </Text>

              <Text
                style={{
                  fontSize: getFontSize(36),
                  fontWeight: "700",
                  color: "#22A45D",
                  marginTop: 8,
                }}
              >
                E1,100
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Ionicons name="trending-up" size={18} color="#22A45D" />

                <Text
                  style={{
                    color: "#22A45D",
                    marginLeft: 6,
                    fontWeight: "600",
                    fontSize: getFontSize(15),
                  }}
                >
                  +E240 saved this month
                </Text>
              </View>
            </View>

            <View
              style={{
                width: 75,
                height: 75,
                borderRadius: 38,
                backgroundColor: colors.background,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="wallet" size={38} color="#C7D72D" />
            </View>
          </View>
        </View>

        {/* Shopper Level */}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            backgroundColor: colors.card,
            borderRadius: 25,
            padding: 22,
            elevation: 3,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  color: colors.secondary,
                }}
              >
                Shopper Level
              </Text>

              <Text
                style={{
                  fontSize: getFontSize(24),
                  fontWeight: "700",
                  marginTop: 8,
                  color: colors.text,
                }}
              >
                🌳 Smart Saver
              </Text>

              <Text
                style={{
                  color: colors.secondary,
                  marginTop: 5,
                }}
              >
                Level 4
              </Text>
            </View>

            <Text
              style={{
                fontSize: 55,
              }}
            >
              🌳
            </Text>
          </View>

          <View
            style={{
              marginTop: 25,
              height: 12,
              backgroundColor: colors.border,
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: "75%",
                height: "100%",
                backgroundColor: "#C7D72D",
                borderRadius: 8,
              }}
            />
          </View>

          <Text
            style={{
              marginTop: 12,
              color: colors.secondary,
            }}
          >
            75 XP to reach BreadCrumb Master
          </Text>
        </View>

        {/* Monthly Savings */}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            backgroundColor: colors.card,
            borderRadius: 25,
            padding: 22,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(22),
              fontWeight: "700",
              color: colors.text,
            }}
          >
            Monthly Savings
          </Text>

          <Text
            style={{
              color: colors.secondary,
              marginTop: 8,
              marginBottom: 25,
            }}
          >
            See how much you've saved each month.
          </Text>

          {/* Graph */}
          <View
            style={{
              height: 170,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                height: 120,
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              {[
                { month: "Jan", value: 90 },

                { month: "Feb", value: 140 },

                { month: "Mar", value: 110 },

                { month: "Apr", value: 180 },

                { month: "May", value: 180 },

                { month: "Jun", value: 160 },

                { month: "Jul", value: 240 },
              ].map((item) => (
                <View
                  key={item.month}
                  style={{
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      width: 22,
                      height: item.value / 2,
                      backgroundColor: "#C7D72D",
                      borderRadius: 8,
                    }}
                  />

                  <Text
                    style={{
                      marginTop: 10,
                      color: colors.secondary,
                      fontSize: getFontSize(12),
                    }}
                  >
                    {item.month}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* BreadCrumb Insight */}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            marginBottom: 35,
            backgroundColor: colors.card,
            borderRadius: 25,
            padding: 22,
            borderLeftWidth: 6,
            borderLeftColor: "#C7D72D",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="sparkles" size={24} color="#C7D72D" />

            <Text
              style={{
                marginLeft: 10,
                fontSize: getFontSize(20),
                fontWeight: "700",
                color: colors.text,
              }}
            >
              BreadCrumb Insight
            </Text>
          </View>

          <Text
            style={{
              marginTop: 18,
              color: colors.secondary,
              lineHeight: 24,
            }}
          >
            Great work! Your savings have increased over the past few months.
            Keep using Smart Basket to compare prices and stretch your budget
            even further.
          </Text>
        </View>
      </ScrollView>

      <BottomNavigation navigation={navigation} active="Savings" />
    </SafeAreaView>
  );
}
