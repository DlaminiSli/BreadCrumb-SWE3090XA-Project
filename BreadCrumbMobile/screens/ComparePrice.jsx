import React, { useState, useEffect } from "react";

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

import api from "../services/api";

import styles from "../styles/ComparePriceStyles";

import { useTheme } from "../context/ThemeContext";

import { formatCurrency } from "../utils/currency";

import { useFocusEffect } from "@react-navigation/native";

import { useCallback } from "react";

import { auth } from "../services/firebase";

export default function ComparePrice({
  route,

  navigation,
}) {
  const { product } = route.params;

  const {
    lists,

    addProduct,
  } = useShopping();

  const { colors, getFontSize } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);

  const [comparison, setComparison] = useState(null);

  const [userCurrency, setUserCurrency] = useState("Eswatini");

  useFocusEffect(
    useCallback(() => {
    async function loadComparison() {
      try {
        console.log("Product selected:", product);

        console.log("Product name:", product.name);

        const response = await api.get(
          `/prices/compare/${encodeURIComponent(product.name)}`,
        );

        console.log("Comparison Response:");
        console.log(JSON.stringify(response.data, null, 2));

        setComparison(response.data);

        const currentUser = auth.currentUser;

        if (currentUser) {
          const token = await currentUser.getIdToken();

          const profileResponse = await api.get("/auth/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserCurrency(profileResponse.data.user.currency || "Eswatini");

          console.log(profileResponse.data.user);
          console.log(profileResponse.data.user.currency);
        }
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    }

    loadComparison();
  }, []));

  const stores = comparison?.stores || [];

  const bestDeal =
    stores.length > 0
      ? {
          store: comparison.bestStore,

          price: comparison.lowestPrice.replace("E", ""),

          savings: comparison.savings.replace("E", ""),

          catalogueEnds: "Current Catalogue",

          bestDeal: true,
        }
      : null;

  const addToList = (list) => {
    addProduct(
      list._id || list.id,

      {
        id: product.id,

        name: product.name,

        category: product.category,

        price: Number(String(product.price).replace(/[^\d]/g, "")),

        image: product.image,

        store: bestDeal?.store || product.store,

        quantity: 1,
      },
    );

    setModalVisible(false);

    Alert.alert(
      "Added Successfully",
      `${product.name} was added to "${list.name}".`,
    );

    navigation.goBack();
  };

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
          <Image source={product.image} style={styles.productImage} />

          <Text
            style={[
              styles.productName,
              {
                color: colors.text,
                fontSize: getFontSize(24),
              },
            ]}
          >
            {product.name}
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
            {product.category}
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
                fontSize: getFontSize(20),
              },
            ]}
          >
            🏆 Best Deal
          </Text>

          <Text
            style={[
              styles.bestStore,
              {
                color: colors.text,
                fontSize: getFontSize(22),
              },
            ]}
          >
            {bestDeal?.store}
          </Text>

          <Text style={styles.bestPrice}>
            {formatCurrency(Number(bestDeal?.price || 0), userCurrency)}
          </Text>

          <Text style={styles.bestSavings}>
            Save {formatCurrency(Number(bestDeal?.savings || 0), userCurrency)}
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
          Compare Prices
        </Text>
        {stores.map((item, index) => (
          <View
            key={index}
            style={[
              styles.storeCard,
              {
                backgroundColor: colors.card,
              },

              item.bestDeal && styles.bestStoreCard,
            ]}
          >
            <View>
              <Text
                style={[
                  styles.storeName,
                  {
                    color: colors.text,
                    fontSize: getFontSize(18),
                  },
                ]}
              >
                {item.store}
              </Text>

              <Text
                style={[
                  styles.stock,
                  {
                    color: colors.secondary,
                    fontSize: getFontSize(13),
                  },
                ]}
              >
                {item.stock}
              </Text>
            </View>

            <View style={styles.priceSection}>
              <Text style={styles.storePrice}>
                {formatCurrency(Number(item.price), userCurrency)}
              </Text>

              {item.bestDeal && (
                <View style={styles.bestBadge}>
                  <Text style={styles.bestBadgeText}>BEST DEAL</Text>
                </View>
              )}
            </View>
          </View>
        ))}

        {/* Smart Recommendation */}

        <View
          style={[
            styles.recommendationCard,
            {
              backgroundColor: colors.card,
            },
          ]}
        >
          <Ionicons name="bulb-outline" size={24} color="#C7D72D" />

          <View
            style={{
              flex: 1,

              marginLeft: 12,
            }}
          >
            <Text
              style={[
                styles.recommendationTitle,
                {
                  color: colors.text,
                  fontSize: getFontSize(18),
                },
              ]}
            >
              BreadCrumb Recommendation
            </Text>

            <Text
              style={[
                styles.recommendationText,
                {
                  color: colors.secondary,
                  fontSize: getFontSize(15),
                },
              ]}
            >
              Buy this item from{" "}
              <Text
                style={[
                  styles.bold,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {bestDeal?.store}
              </Text>{" "}
              to save{" "}
              <Text
                style={[
                  styles.bold,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {formatCurrency(Number(bestDeal?.savings || 0), userCurrency)}
              </Text>
              . BreadCrumb found the lowest advertised price.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: colors.card,
              },
            ]}
          >
            <Ionicons name="heart-outline" size={22} color="#C7D72D" />

            <Text
              style={[
                styles.actionText,
                {
                  color: colors.text,
                  fontSize: getFontSize(14),
                },
              ]}
            >
              Watch
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: colors.card,
              },
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="cart-outline" size={22} color="#C7D72D" />

            <Text
              style={[
                styles.actionText,
                {
                  color: colors.text,
                  fontSize: getFontSize(14),
                },
              ]}
            >
              Add To List
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: colors.card,
              },
            ]}
          >
            <Ionicons name="share-social-outline" size={22} color="#C7D72D" />

            <Text
              style={[
                styles.actionText,
                {
                  color: colors.text,
                  fontSize: getFontSize(14),
                },
              ]}
            >
              Share
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: colors.card,
              },
            ]}
          >
            <Ionicons name="book-outline" size={22} color="#C7D72D" />

            <Text
              style={[
                styles.actionText,
                {
                  color: colors.text,
                  fontSize: getFontSize(14),
                },
              ]}
            >
              Catalogue
            </Text>
          </TouchableOpacity>
        </View>

        {/* Shopping Tip */}

        <View
          style={[
            styles.tipCard,
            {
              backgroundColor: colors.card,
            },
          ]}
        >
          <Ionicons name="sparkles" size={22} color="#C7D72D" />

          <Text
            style={[
              styles.tipText,
              {
                color: colors.secondary,
                fontSize: getFontSize(14),
              },
            ]}
          >
            Save this product to a shopping list and BreadCrumb will
            automatically calculate your basket total, remaining budget and
            notify you when prices drop.
          </Text>
        </View>
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
                    fontSize: 20,

                    fontWeight: "700",

                    marginTop: 15,
                  }}
                >
                  No Shopping Lists
                </Text>

                <Text
                  style={{
                    color: "#777",

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
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => addToList(item)}
                    style={{
                      backgroundColor: "#F7F8FA",

                      borderRadius: 20,

                      padding: 18,

                      marginBottom: 15,

                      borderWidth: 1,

                      borderColor: "#ECECEC",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,

                        fontWeight: "700",

                        color: "#222",
                      }}
                    >
                      {item.name}
                    </Text>

                    <Text
                      style={{
                        color: "#777",

                        marginTop: 6,
                      }}
                    >
                      Budget:{" "}
                      {formatCurrency(Number(item.budget || 0), userCurrency)}
                    </Text>

                    <Text
                      style={{
                        color: "#777",

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
