import React, { useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useShopping } from "../context/ShoppingContext";

import styles from "../styles/ComparePriceStyles";

import { useTheme } from "../context/ThemeContext";

import { auth } from "../services/firebase";

import api from "../services/api";

import { formatCurrency, convertCurrency } from "../utils/currency";

import { useFocusEffect } from "@react-navigation/native";

import { useCallback } from "react";

export default function ComboDetails({
  route,

  navigation,
}) {
  const { combo } = route.params;

  const {
    lists,

    addProduct,
  } = useShopping();

  const { colors, getFontSize } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);

  const [userCurrency, setUserCurrency] = useState("Eswatini");

  const addToList = (list) => {
    addProduct(
      list._id || list.id,

      {
        id: combo.id,

        name: combo.name,

        description: `${combo.products.length} items`,

        category: "Combo Deal",

        price: Number(combo.price),

        image: combo.image,

        store: combo.store,

        quantity: 1,
      },
    );

    setModalVisible(false);

    Alert.alert(
      "Added Successfully",

      `${combo.name} was added to "${list.name}".`,
    );

    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      async function loadCurrency() {
        try {
          const currentUser = auth.currentUser;

          if (!currentUser) return;

          const token = await currentUser.getIdToken();

          const response = await api.get("/auth/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserCurrency(response.data.user.currency || "Eswatini");
        } catch (error) {
          console.log(error.response?.data || error.message);
        }
      }

      loadCurrency();
    }, []),
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.productSection}>
          <Image
            source={combo.image}
            style={styles.productImage}
            resizeMode="contain"
          />

          <Text
            style={[
              styles.productName,
              {
                color: colors.text,
                fontSize: getFontSize(24),
              },
            ]}
          >
            {combo.name}
          </Text>

          <Text
            style={[
              styles.productCategory,
              {
                color: colors.secondary,
                fontSize: getFontSize(16),
              },
            ]}
          >
            Available at {combo.store}
          </Text>
        </View>

        <View
          style={[
            styles.bestDealCard,
            {
              backgroundColor: colors.card,
            },
          ]}
        >
          <Text
            style={[
              styles.bestDealTitle,
              {
                color: colors.text,
                fontSize: getFontSize(18),
              },
            ]}
          >
            Today's Combo Deal
          </Text>

          <Text style={styles.bestPrice}>
            {formatCurrency(
              convertCurrency(combo.price, userCurrency),
              userCurrency,
            )}
          </Text>

          <Text
            style={{
              textDecorationLine: "line-through",

              color: colors.secondary,

              marginTop: 8,

              fontSize: 16,
            }}
          >
            Regular Price{" "}
            {formatCurrency(
              convertCurrency(combo.oldPrice, userCurrency),
              userCurrency,
            )}
          </Text>

          <Text style={styles.bestSavings}>
            Save{" "}
            {formatCurrency(
              convertCurrency(combo.save, userCurrency),
              userCurrency,
            )}
          </Text>
        </View>

        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.text,
              fontSize: getFontSize(22),
            },
          ]}
        >
          What's Included
        </Text>

        {combo.products.map((item, index) => (
          <View
            key={index}
            style={[
              styles.storeCard,
              {
                backgroundColor: colors.card,
              },
            ]}
          >
            <Text
              style={[
                styles.storeName,
                {
                  color: colors.text,
                  fontSize: getFontSize(17),
                },
              ]}
            >
              • {item}
            </Text>
          </View>
        ))}

        <TouchableOpacity
          style={{
            backgroundColor: "#C7D72D",
            marginHorizontal: 25,
            marginVertical: 30,
            borderRadius: 18,
            height: 58,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons
            name="cart-outline"
            size={22}
            color="#FFFFFF"
            style={{ marginRight: 8 }}
          />

          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Add to Shopping List
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,

            justifyContent: "flex-end",

            backgroundColor: "rgba(0,0,0,0.45)",
          }}
        >
          <View
            style={{
              backgroundColor: colors.card,

              borderTopLeftRadius: 28,

              borderTopRightRadius: 28,

              padding: 22,

              maxHeight: "70%",
            }}
          >
            <View
              style={{
                flexDirection: "row",

                justifyContent: "space-between",

                alignItems: "center",

                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 22,

                  fontWeight: "700",

                  color: colors.text,
                }}
              >
                Choose Shopping List
              </Text>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>

            {lists.length === 0 ? (
              <View
                style={{
                  alignItems: "center",

                  paddingVertical: 40,
                }}
              >
                <Ionicons name="cart-outline" size={70} color="#C7D72D" />

                <Text
                  style={{
                    fontSize: getFontSize(20),
                    fontWeight: "700",
                    color: colors.text,
                    marginTop: 15,
                  }}
                >
                  No Shopping Lists
                </Text>

                <Text
                  style={{
                    color: colors.secondary,

                    textAlign: "center",

                    marginTop: 10,

                    lineHeight: 22,
                  }}
                >
                  Create your first shopping list before adding products.
                </Text>

                <TouchableOpacity
                  style={{
                    marginTop: 25,

                    backgroundColor: "#C7D72D",

                    borderRadius: 18,

                    paddingHorizontal: 28,

                    paddingVertical: 14,
                  }}
                  onPress={() => {
                    setModalVisible(false);

                    navigation.navigate("ShoppingLists");
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",

                      fontWeight: "700",
                    }}
                  >
                    Create Shopping List
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <FlatList
                data={lists}
                keyExtractor={(item) => (item._id || item.id).toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => addToList(item)}
                    style={{
                      backgroundColor: colors.background,

                      borderRadius: 20,

                      padding: 18,

                      marginBottom: 15,

                      borderWidth: 1,

                      borderColor: colors.border,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,

                        fontWeight: "700",

                        color: colors.text,
                      }}
                    >
                      {item.name}
                    </Text>

                    <Text
                      style={{
                        color: colors.secondary,

                        marginTop: 6,
                      }}
                    >
                      Budget: {formatCurrency(item.budget || 0, userCurrency)}
                    </Text>

                    <Text
                      style={{
                        color: colors.secondary,

                        marginTop: 2,
                      }}
                    >
                      {item.items.length} item(s)
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
