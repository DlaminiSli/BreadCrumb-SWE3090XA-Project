import React, { useState, useCallback } from "react";

import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useShopping } from "../context/ShoppingContext";

import BottomNavigation from "../components/BottomNavigation";

import styles from "../styles/ShoppingListDetailsStyles";

import ArchivedShoppingView from "../components/ArchivedShoppingView";

import ActiveShoppingView from "../components/ActiveShoppingView";

import { useTheme } from "../context/ThemeContext";

import { auth } from "../services/firebase";

import api from "../services/api";

import { formatCurrency, convertCurrency } from "../utils/currency";

import { useFocusEffect } from "@react-navigation/native";

export default function ShoppingListDetails({
  route,

  navigation,
}) {
  const { listId } = route.params;

  const {
    lists,

    archiveList,

    togglePurchased,

    getTotal,

    getRemaining,

    getProgress,

    increaseQuantity,

    decreaseQuantity,

    removeProduct,
  } = useShopping();

  const [refreshing, setRefreshing] = useState(false);

  const [userCurrency, setUserCurrency] = useState("Eswatini");

  const { colors, getFontSize } = useTheme();

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);

  const list = lists.find(
    (item) => String(item._id || item.id) === String(listId),
  );

  console.log("Found list:", list);

  const isArchived = list?.archived;

  if (isArchived) {
    return (
      <ArchivedShoppingView
        list={list}
        navigation={navigation}
        getTotal={getTotal}
      />
    );
  }

  if (!list) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <View
          style={{
            flex: 1,

            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <Ionicons name="alert-circle" size={70} color="#C7D72D" />

          <Text
            style={{
              marginTop: 20,
              fontSize: getFontSize(20),
              fontWeight: "700",
              color: colors.text,
            }}
          >
            Shopping List Not Found
          </Text>
        </View>

        <BottomNavigation navigation={navigation} active="Lists" />
      </SafeAreaView>
    );
  }

  const total = getTotal(list);

  const remaining = getRemaining(list);

  const progress = getProgress(list);

  const purchasedItems = list.items.filter((item) => item.purchased).length;

  const shoppingProgress =
    list.items.length === 0 ? 0 : (purchasedItems / list.items.length) * 100;

  const totalItems = list.items.length;
  
  const budgetSavings = remaining;

  const isOverBudget = remaining < 0;

  const shoppingCompleted = totalItems > 0 && purchasedItems === totalItems;

  let progressColor = "#22A45D";

  if (progress >= 70) {
    progressColor = "#F9A825";
  }

  if (progress >= 100) {
    progressColor = "#D32F2F";
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#C7D72D"]}
            tintColor="#C7D72D"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={25} color={colors.text} />
        </TouchableOpacity>

        <View
          style={[
            styles.headerCard,
            {
              backgroundColor: colors.card,
            },
          ]}
        >
          <Text
            style={[
              styles.listName,
              {
                color: colors.text,
                fontSize: getFontSize(28),
              },
            ]}
          >
            {list.name}
          </Text>

          <Text
            style={[
              styles.shoppingDate,
              {
                color: colors.secondary,
                fontSize: getFontSize(14),
              },
            ]}
          >
            Shopping Date
          </Text>

          <Text
            style={[
              styles.shoppingDateValue,
              {
                color: colors.text,
                fontSize: getFontSize(18),
              },
            ]}
          >
            {list.shoppingDate || "Not Selected"}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <View
            style={[
              styles.summaryCard,
              {
                backgroundColor: colors.card,
              },
            ]}
          >
            <Text
              style={[
                styles.summaryTitle,
                {
                  color: colors.secondary,
                  fontSize: getFontSize(15),
                },
              ]}
            >
              Budget
            </Text>

            <Text
              style={[
                styles.summaryValue,
                {
                  color: colors.text,
                  fontSize: getFontSize(20),
                },
              ]}
            >
              {formatCurrency(
                convertCurrency(Number(list.budget || 0), userCurrency),
                userCurrency,
              )}
            </Text>
          </View>

          <View
            style={[
              styles.summaryCard,
              {
                backgroundColor: colors.card,
              },
            ]}
          >
            <Text
              style={[
                styles.summaryTitle,
                {
                  color: colors.secondary,
                  fontSize: getFontSize(15),
                },
              ]}
            >
              Spent
            </Text>

            <Text
              style={[
                styles.summaryValue,
                {
                  color: colors.text,
                  fontSize: getFontSize(20),
                },
              ]}
            >
              {formatCurrency(
                convertCurrency(total, userCurrency),
                userCurrency,
              )}
            </Text>
          </View>

          <View
            style={[
              styles.summaryCard,
              {
                backgroundColor: colors.card,
              },
            ]}
          >
            <Text
              style={[
                styles.summaryTitle,
                {
                  color: colors.secondary,
                  fontSize: getFontSize(15),
                },
              ]}
            >
              {isOverBudget ? "Over Budget" : "Remaining"}
            </Text>

            <Text
              style={[
                styles.remainingBudget,

                {
                  color: isOverBudget ? "#D32F2F" : "#22A45D",
                },
              ]}
            >
              {formatCurrency(
                convertCurrency(Math.abs(remaining), userCurrency),
                userCurrency,
              )}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.progressCard,
            {
              backgroundColor: colors.card,
            },
          ]}
        >
          <View style={styles.progressHeader}>
            <Text
              style={[
                styles.progressTitle,
                {
                  color: colors.text,
                  fontSize: getFontSize(20),
                },
              ]}
            >
              Shopping Progress
            </Text>

            <Text
              style={[
                styles.progressPercent,
                {
                  color: "#22A45D",
                  fontSize: getFontSize(20),
                },
              ]}
            >
              {Math.round(shoppingProgress)}%
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,

                {
                  width: `${shoppingProgress}%`,
                },
              ]}
            />
          </View>

          <Text
            style={[
              styles.progressText,
              {
                color: colors.secondary,
                fontSize: getFontSize(15),
              },
            ]}
          >
            {purchasedItems} of {totalItems} item(s) purchased
          </Text>
        </View>

        {isArchived ? (
          <View style={styles.completeCard}>
            <Ionicons name="checkmark-circle" size={70} color="#22A45D" />

            <Text style={styles.completeTitle}>Shopping Completed</Text>

            <Text style={styles.completeSubtitle}>Completed on</Text>

            <Text style={styles.completeDate}>{list.archivedDate}</Text>
          </View>
        ) : (
          shoppingCompleted && (
            <View
              style={{
                marginHorizontal: 20,

                marginTop: 20,

                backgroundColor: colors.card,

                borderRadius: 24,

                padding: 25,

                alignItems: "center",

                elevation: 3,
              }}
            >
              <Ionicons name="checkmark-circle" size={75} color="#22A45D" />

              <Text
                style={{
                  fontSize: 24,

                  fontWeight: "700",

                  marginTop: 15,

                  color: colors.text,
                }}
              >
                Shopping Complete!
              </Text>

              <Text
                style={{
                  color: colors.secondary,

                  textAlign: "center",

                  marginTop: 10,

                  lineHeight: 24,
                }}
              >
                Congratulations! You have purchased every item on your shopping
                list.
              </Text>

              <View
                style={{
                  marginTop: 25,

                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",

                    justifyContent: "space-between",

                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                    }}
                  >
                    Total Spent
                  </Text>

                  <Text
                    style={{
                      fontWeight: "700",
                      color: colors.text,
                    }}
                  >
                    {formatCurrency(
                      convertCurrency(total, userCurrency),
                      userCurrency,
                    )}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",

                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: getFontSize(16),
                    }}
                  >
                    {budgetSavings >= 0 ? "Budget Savings" : "Over Budget"}
                  </Text>

                  <Text
                    style={{
                      fontWeight: "700",

                      color: budgetSavings >= 0 ? "#22A45D" : "#D32F2F",
                    }}
                  >
                    {formatCurrency(
                      convertCurrency(Math.abs(remaining), userCurrency),
                      userCurrency,
                    )}
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    marginTop: 30,

                    backgroundColor: "#22A45D",

                    borderRadius: 18,

                    paddingVertical: 16,

                    alignItems: "center",
                  }}
                  onPress={() => {
                    archiveList(list._id || list.id);

                    navigation.goBack();
                  }}
                >
                  <Ionicons name="archive" size={22} color="#FFF" />

                  <Text
                    style={{
                      color: "#FFF",

                      fontWeight: "700",

                      fontSize: 16,

                      marginTop: 6,
                    }}
                  >
                    Archive Shopping List
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        )}

        {/* Shopping Basket */}
        <View
          style={[
            styles.basketCard,
            {
              backgroundColor: colors.card,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: colors.text,
                  fontSize: getFontSize(20),
                },
              ]}
            >
              Shopping Basket
            </Text>

            <Text
              style={[
                styles.viewAll,
                {
                  color: colors.secondary,
                  fontSize: getFontSize(14),
                },
              ]}
            >
              {list.items.length} Item(s)
            </Text>
          </View>

          {list.items.length === 0 ? (
            <>
              <Ionicons name="basket-outline" size={70} color="#C7D72D" />

              <Text
                style={[
                  styles.emptyTitle,
                  {
                    color: colors.text,
                    fontSize: getFontSize(22),
                  },
                ]}
              >
                Your basket is waiting
              </Text>

              <Text
                style={[
                  styles.emptySubtitle,
                  {
                    color: colors.secondary,
                    fontSize: getFontSize(15),
                  },
                ]}
              >
                Browse products and tap "Add To List" from the Compare screen to
                begin shopping.
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate("Search")}
              >
                <Ionicons name="search" size={20} color="#FFFFFF" />

                <Text style={styles.primaryButtonText}>Browse Products</Text>
              </TouchableOpacity>
            </>
          ) : (
            list.items.map((item) => (
              <View
                key={item._id || item.id}
                style={{
                  flexDirection: "row",

                  alignItems: "center",

                  backgroundColor: colors.card,

                  borderRadius: 18,

                  padding: 15,

                  marginBottom: 15,

                  elevation: 2,
                }}
              >
                <TouchableOpacity
                  onPress={() => togglePurchased(list._id, item._id)}
                >
                  <Ionicons
                    name={item.purchased ? "checkbox" : "square-outline"}
                    size={26}
                    color={item.purchased ? "#22A45D" : "#BDBDBD"}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    width: 55,

                    height: 55,

                    marginLeft: 15,

                    borderRadius: 15,

                    backgroundColor: colors.background,

                    justifyContent: "center",

                    alignItems: "center",
                  }}
                >
                  <Ionicons name="cube-outline" size={28} color="#C7D72D" />
                </View>

                <View
                  style={{
                    flex: 1,

                    marginLeft: 15,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",

                      fontSize: 16,

                      color: item.purchased ? colors.secondary : colors.text,

                      textDecorationLine: item.purchased
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {item.name}
                  </Text>

                  <Text
                    style={{
                      color: colors.secondary,

                      marginTop: 4,
                    }}
                  >
                    {item.store}
                  </Text>

                  <Text
                    style={{
                      marginTop: 4,
                      color: "#22A45D",
                      fontWeight: "700",
                    }}
                  >
                    {formatCurrency(
                      convertCurrency(Number(item.price || 0), userCurrency),
                      userCurrency,
                    )}
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",

                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => decreaseQuantity(list._id, item._id)}
                    >
                      <Ionicons
                        name="remove-circle"
                        size={28}
                        color="#C7D72D"
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        marginHorizontal: 10,
                        fontWeight: "700",
                        fontSize: getFontSize(17),
                        color: colors.text,
                      }}
                    >
                      {item.quantity}
                    </Text>

                    <TouchableOpacity
                      onPress={() => increaseQuantity(list._id, item._id)}
                    >
                      <Ionicons name="add-circle" size={28} color="#C7D72D" />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                    }}
                    onPress={() => removeProduct(list._id, item._id)}
                  >
                    <Ionicons name="trash" size={22} color="#D32F2F" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Quick Actions */}

        <View
          style={[
            styles.recommendCard,
            {
              backgroundColor: colors.card,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: colors.text,
                  fontSize: getFontSize(20),
                },
              ]}
            >
              Quick Actions
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Search")}
          >
            <Ionicons name="search" size={20} color="#FFFFFF" />

            <Text style={styles.primaryButtonText}>Browse More Products</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() =>
              navigation.navigate(
                "SmartBasket",

                {
                  listId: list._id || list.id,
                },
              )
            }
          >
            <Ionicons name="sparkles" size={20} color="#C7D72D" />

            <Text style={styles.secondaryButtonText}>
              Smart Basket Optimizer
            </Text>
          </TouchableOpacity>
        </View>

        {/* Shopping Insights */}
        <View
          style={[
            styles.recommendCard,
            {
              backgroundColor: colors.card,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: colors.text,
                  fontSize: getFontSize(20),
                },
              ]}
            >
              Shopping Insights
            </Text>
          </View>

          <View style={styles.recommendItem}>
            <Ionicons name="wallet" size={22} color="#22A45D" />

            <View
              style={{
                marginLeft: 15,
              }}
            >
              <Text
                style={[
                  styles.recommendText,
                  {
                    color: colors.text,
                    fontSize: getFontSize(16),
                  },
                ]}
              >
                {budgetSavings >= 0 ? "Budget Savings" : "Over Budget"}
              </Text>

              <Text
                style={[
                  styles.shoppingDate,
                  {
                    color: colors.secondary,
                    fontSize: getFontSize(14),
                  },
                ]}
              >
                {formatCurrency(
                  convertCurrency(Math.abs(remaining), userCurrency),
                  userCurrency,
                )}
              </Text>
            </View>
          </View>

          <View style={styles.recommendItem}>
            <Ionicons name="trophy" size={22} color="#F9A825" />

            <View
              style={{
                marginLeft: 15,
              }}
            >
              <Text
                style={[
                  styles.recommendText,
                  {
                    color: colors.text,
                    fontSize: getFontSize(16),
                  },
                ]}
              >
                Shopper Level
              </Text>

              <Text
                style={[
                  styles.shoppingDate,
                  {
                    color: colors.secondary,
                    fontSize: getFontSize(14),
                  },
                ]}
              >
                Beginner
              </Text>
            </View>
          </View>

          <View style={styles.recommendItem}>
            <Ionicons name="trending-down" size={22} color="#22A45D" />

            <View
              style={{
                marginLeft: 15,
              }}
            >
              <Text
                style={[
                  styles.recommendText,
                  {
                    color: colors.text,
                    fontSize: getFontSize(16),
                  },
                ]}
              >
                Cheapest Basket
              </Text>

              <Text
                style={[
                  styles.shoppingDate,
                  {
                    color: colors.secondary,
                    fontSize: getFontSize(14),
                  },
                ]}
              >
                Compare your basket to see your savings.
              </Text>
            </View>
          </View>
        </View>

        {/* Share & Invite */}

        <View
          style={[
            styles.recommendCard,
            {
              backgroundColor: colors.card,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: colors.text,
                  fontSize: getFontSize(20),
                },
              ]}
            >
              Share & Collaborate
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.secondaryButton,
              {
                backgroundColor: colors.background,
              },
            ]}
          >
            <Ionicons name="share-social" size={20} color="#C7D72D" />

            <Text
              style={[
                styles.secondaryButtonText,
                {
                  color: colors.text,
                  fontSize: getFontSize(16),
                },
              ]}
            >
              Share Shopping List
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.secondaryButton,
              {
                backgroundColor: colors.background,
              },
            ]}
          >
            <Ionicons name="people" size={20} color="#C7D72D" />

            <Text
              style={[
                styles.secondaryButtonText,
                {
                  color: colors.text,
                  fontSize: getFontSize(16),
                },
              ]}
            >
              Invite Family & Friends
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: 90,
          }}
        />
      </ScrollView>

      <BottomNavigation navigation={navigation} active="Lists" />
    </SafeAreaView>
  );
}
