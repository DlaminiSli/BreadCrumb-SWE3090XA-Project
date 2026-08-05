import React, { useState, useCallback } from "react";

import { View, Text, TouchableOpacity, Alert } from "react-native";

import Swipeable from "react-native-gesture-handler/Swipeable";

import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/ShoppingListsStyles";

import { useTheme } from "../context/ThemeContext";

import { formatCurrency } from "../utils/currency";

import { auth } from "../services/firebase";

import api from "../services/api";

import { useFocusEffect } from "@react-navigation/native";

export default function ShoppingListCard({
  list,

  archived,

  navigation,

  onArchive,

  onDelete,

  onReuse,
}) {
  const { colors, getFontSize } = useTheme();

  const [userCurrency, setUserCurrency] = useState("Eswatini");

  const leftAction = () => (
    <TouchableOpacity
      onPress={() => {
        if (archived) {
          onReuse();
        } else {
          onArchive();
        }
      }}
      style={{
        width: 120,
        backgroundColor: "#22A45D",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 22,
        marginBottom: 18,
      }}
    >
      <Ionicons
        name={archived ? "refresh" : "archive"}
        size={32}
        color="#FFF"
      />

      <Text
        style={{
          color: "#FFF",
          fontWeight: "700",
          marginTop: 8,
        }}
      >
        {archived ? "Reuse" : "Archive"}
      </Text>
    </TouchableOpacity>
  );

  const rightAction = () => (
    <TouchableOpacity
      onPress={() => {
        Alert.alert(
          archived ? "Delete Forever?" : "Delete Shopping List",

          archived
            ? "This archived list will be permanently deleted."
            : "Are you sure you want to delete this shopping list?",

          [
            {
              text: "Cancel",

              style: "cancel",
            },

            {
              text: "Delete",

              style: "destructive",

              onPress: onDelete,
            },
          ],
        );
      }}
      style={{
        width: 120,
        backgroundColor: "#D32F2F",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 22,
        marginBottom: 18,
      }}
    >
      <Ionicons name="trash" size={32} color="#FFF" />

      <Text
        style={{
          color: "#FFF",
          fontWeight: "700",
          marginTop: 8,
        }}
      >
        Delete
      </Text>
    </TouchableOpacity>
  );

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

  const totalSpent = (list.items || []).reduce((total, item) => {
    return total + Number(item.price || 0) * Number(item.quantity || 1);
  }, 0);

  const remainingBudget = Number(list.budget || 0) - totalSpent;

  return (
    <Swipeable renderLeftActions={leftAction} renderRightActions={rightAction}>
      <View
        style={[
          styles.listCard,
          {
            backgroundColor: colors.card,
          },
          archived && {
            opacity: 0.75,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate(
              "ShoppingListDetails",

              {
                listId: list._id || list.id,
              },
            )
          }
        >
          <View style={styles.listTop}>
            <View>
              <Text
                style={[
                  styles.listName,
                  {
                    color: colors.text,
                    fontSize: getFontSize(20),
                  },
                ]}
              >
                {list.name}
              </Text>

              <Text
                style={[
                  styles.listDate,
                  {
                    color: colors.secondary,
                    fontSize: getFontSize(13),
                  },
                ]}
              >
                {list.shoppingDate || "No Date"}
              </Text>
            </View>

            {archived ? (
              <Ionicons name="archive" size={24} color={colors.secondary} />
            ) : (
              list.shareList && (
                <Ionicons name="people" size={24} color="#C7D72D" />
              )
            )}
          </View>

          <View style={styles.infoRow}>
            <View>
              <Text
                style={[
                  styles.infoTitle,
                  {
                    color: colors.secondary,
                    fontSize: getFontSize(12),
                  },
                ]}
              >
                Budget
              </Text>

              <Text
                style={[
                  styles.infoValue,
                  {
                    color: colors.text,
                    fontSize: getFontSize(18),
                  },
                ]}
              >
                {formatCurrency(Number(list.budget || 0), userCurrency)}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  styles.infoTitle,
                  {
                    color: colors.secondary,
                    fontSize: getFontSize(12),
                  },
                ]}
              >
                Items
              </Text>

              <Text
                style={[
                  styles.infoValue,
                  {
                    color: colors.text,
                    fontSize: getFontSize(18),
                  },
                ]}
              >
                {list.items?.length || 0}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  styles.infoTitle,
                  {
                    color: colors.secondary,
                    fontSize: getFontSize(12),
                  },
                ]}
              >
                {archived ? "Status" : "Remaining"}
              </Text>

              <Text
                style={
                  archived
                    ? {
                        color: "#22A45D",
                        fontWeight: "700",
                        marginTop: 5,
                        fontSize: getFontSize(16),
                      }
                    : [
                        styles.remaining,
                        {
                          color: remainingBudget >= 0 ? "#22A45D" : "#D32F2F",
                          fontSize: getFontSize(18),
                        },
                      ]
                }
              >
                {archived
                  ? "Completed"
                  : formatCurrency(remainingBudget, userCurrency)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
}
