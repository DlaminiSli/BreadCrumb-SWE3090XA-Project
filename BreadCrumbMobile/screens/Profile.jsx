import React, { useEffect, useState } from "react";

import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { auth } from "../services/firebase";

import { logoutUser } from "../services/authService";

import api from "../services/api";

import BottomNavigation from "../components/BottomNavigation";

import { useTheme } from "../context/ThemeContext";

import { useFocusEffect } from "@react-navigation/native";

import { useCallback } from "react";

export default function Profile({ navigation }) {

    const [userData, setUserData] = useState(null);

    const {
        colors,
        getFontSize,
        textSize
    } = useTheme();

    useFocusEffect(
      useCallback(() => {
        async function loadUser() {
          try {
            const currentUser = auth.currentUser;

            if (!currentUser) return;

            const token = await currentUser.getIdToken();

            const response = await api.get("/auth/profile", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            setUserData(response.data.user);
          } catch (error) {
            console.log(error.response?.data || error.message);
          }
        }

        loadUser();
      }, []),
    );

    const currencyMap = {

        "Eswatini": "SZL",

        "Kenya": "KES",

        "South Africa": "ZAR",

        "Botswana": "BWP",

        "Namibia": "NAD",

        "Zimbabwe": "USD",

        "Zambia": "ZMW"

    };

    const flagMap = {

        "Eswatini": "🇸🇿",

        "Kenya": "🇰🇪",

        "South Africa": "🇿🇦",

        "Botswana": "🇧🇼",

        "Namibia": "🇳🇦",

        "Zimbabwe": "🇿🇼",

        "Zambia": "🇿🇲"

    };

    const currency = userData?.currency || "Eswatini";

    const flag =

        flagMap[userData?.country] ||

        "🌍";

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              fontSize: getFontSize(30),
              fontWeight: "700",
              marginTop: 25,
              marginLeft: 20,
              color: colors.text,
            }}
          >
            Profile
          </Text>

          {/* Avatar */}

          <View
            style={{
              alignItems: "center",
              marginTop: 35,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <View
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  backgroundColor: "#C7D72D",
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 46,
                    fontWeight: "700",
                    color: colors.text,
                  }}
                >
                  {userData?.fullName
                    ? userData.fullName.charAt(0).toUpperCase()
                    : "?"}
                </Text>
              </View>

              <View
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  backgroundColor: colors.card,
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 4,
                }}
              >
                <Ionicons name="pencil" size={18} color={colors.accent} />
              </View>
            </TouchableOpacity>

            <Text
              style={{
                marginTop: 20,
                fontSize: getFontSize(24),
                fontWeight: "700",
                color: colors.text,
              }}
            >
              {userData?.fullName || "Loading..."}
            </Text>

            <Text
              style={{
                marginTop: 5,
                color: colors.secondary,
                fontSize: 15,
              }}
            >
              {userData?.email || ""}
            </Text>

            <Text
              style={{
                marginTop: 6,
                color: colors.secondary,
                fontSize: 15,
              }}
            >
              {flag} {userData?.country || ""}
            </Text>

            <Text
              style={{
                marginTop: 6,
                color: colors.accent,
                fontWeight: "600",
              }}
            >
              Currency • {currency}
            </Text>
          </View>
          {/* My Account */}

          <View
            style={{
              marginHorizontal: 20,
              marginTop: 35,
            }}
          >
            <Text
              style={{
                fontSize: getFontSize(20),
                fontWeight: "700",
                color: colors.text,
                marginBottom: 15,
              }}
            >
              My Account
            </Text>

            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 20,
                overflow: "hidden",
                elevation: 2,
              }}
            >
              {/* Edit Profile */}
              <TouchableOpacity
                onPress={() => navigation.navigate("EditProfile")}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 18,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="create-outline"
                    size={22}
                    color={colors.accent}
                  />

                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: getFontSize(16),
                      color: colors.text,
                    }}
                  >
                    Edit Profile
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.secondary}
                />
              </TouchableOpacity>

              {/* Archived Lists */}

              <TouchableOpacity
                onPress={() => navigation.navigate("ShoppingLists")}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 18,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="archive-outline"
                    size={22}
                    color={colors.accent}
                  />

                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: getFontSize(16),
                      color: colors.text,
                    }}
                  >
                    Archived Shopping Lists
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.secondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Preferences */}
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 30,
            }}
          >
            <Text
              style={{
                fontSize: getFontSize(20),
                fontWeight: "700",
                color: colors.text,
                marginBottom: 15,
              }}
            >
              Preferences
            </Text>

            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 20,
                overflow: "hidden",
                elevation: 2,
              }}
            >
              {/* Dark Mode */}
              <TouchableOpacity
                onPress={() => navigation.navigate("Appearance")}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 18,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="moon-outline"
                    size={22}
                    color={colors.accent}
                  />

                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: getFontSize(16),
                      color: colors.text,
                    }}
                  >
                    Appearance
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.secondary}
                />
              </TouchableOpacity>

              {/* Language */}
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 18,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="language-outline"
                    size={22}
                    color={colors.accent}
                  />

                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: getFontSize(16),
                      color: colors.text,
                    }}
                  >
                    Language
                  </Text>
                </View>

                <Text
                  style={{
                    color: colors.secondary,
                  }}
                >
                  English
                </Text>
              </TouchableOpacity>

              {/* Text Size */}
              <TouchableOpacity
                onPress={() => navigation.navigate("TextSize")}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 18,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="text-outline"
                    size={22}
                    color={colors.accent}
                  />

                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: getFontSize(16),
                      color: colors.text,
                    }}
                  >
                    Text Size
                  </Text>
                </View>

                <Text
                  style={{
                    color: colors.secondary,
                    fontSize: getFontSize(15),
                    textTransform: "capitalize",
                  }}
                >
                  {textSize}
                </Text>
              </TouchableOpacity>

              {/* Currency */}
              <TouchableOpacity
                onPress={() => navigation.navigate("Currency")}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 18,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="cash-outline"
                    size={22}
                    color={colors.accent}
                  />

                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: getFontSize(16),
                      color: colors.text,
                    }}
                  >
                    Currency
                  </Text>
                </View>

                <Text
                  style={{
                    color: colors.secondary,
                  }}
                >
                  {currency}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Support */}
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 30,
            }}
          >
            <Text
              style={{
                fontSize: getFontSize(20),
                fontWeight: "700",
                color: colors.text,
                marginBottom: 15,
              }}
            >
              Support
            </Text>

            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 20,
                overflow: "hidden",
                elevation: 2,
              }}
            >
              {/* Help */}
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 18,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
                onPress={() => navigation.navigate("HelpScreen")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="help-circle-outline"
                    size={22}
                    color={colors.accent}
                  />

                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: getFontSize(16),
                      color: colors.text,
                    }}
                  >
                    Help & Support
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.secondary}
                />
              </TouchableOpacity>

              {/* About */}
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 18,
                }}
                onPress={() => navigation.navigate("AboutScreen")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={22}
                    color={colors.accent}
                  />

                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: getFontSize(16),
                      color: colors.text,
                    }}
                  >
                    About BreadCrumb
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.secondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Logout */}
          <TouchableOpacity
            onPress={async () => {
              await logoutUser();

              navigation.replace("Login");
            }}
            style={{
              marginHorizontal: 20,
              marginTop: 35,
              backgroundColor: "#D32F2F",
              borderRadius: 18,
              paddingVertical: 16,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 40,
            }}
          >
            <Ionicons name="log-out-outline" size={22} color="#FFFFFF" />

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: getFontSize(17),
                fontWeight: "700",
                marginLeft: 10,
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomNavigation navigation={navigation} active="Profile" />
      </SafeAreaView>
    );

}