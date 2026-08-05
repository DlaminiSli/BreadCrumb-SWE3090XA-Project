import React, { useState } from "react";
import { useShopping } from "../context/ShoppingContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import ShoppingListCard from "../components/ShoppingListCard";

import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
  TextInput,
  Switch,
  Platform,
  Keyboard,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/ShoppingListsStyles";

import { useTheme } from "../context/ThemeContext";

import { auth } from "../services/firebase";

import api from "../services/api";

import { formatCurrency } from "../utils/currency";

import { useFocusEffect } from "@react-navigation/native";

import { useCallback } from "react";

export default function ShoppingLists({ navigation }) {
  const {
    lists,

    createList,

    archiveList,

    deleteList,

    reuseList,
  } = useShopping();

  const { colors, getFontSize } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [listName, setListName] = useState("");

  const [budget, setBudget] = useState("");

  const [shoppingDate, setShoppingDate] = useState(null);

  const [shareList, setShareList] = useState(false);

  const [category, setCategory] = useState("Groceries");

  const [userCurrency, setUserCurrency] = useState("Eswatini");

  const handleCreateList = () => {
    if (!listName.trim()) {
      return;
    }

    createList({
      id: Date.now(),

      name: listName,

      category,

      budget: Number(budget),

      shoppingDate: shoppingDate
        ? shoppingDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "",

      shareList,

      items: [],

      completed: false,

      archived: false,
    });

    setListName("");

    setBudget("");

    setShoppingDate(null);

    setShareList(false);

    setModalVisible(false);
  };

  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      setShoppingDate(selectedDate);
    }
  };

  const formattedDate = shoppingDate
    ? shoppingDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Choose your shopping day";

  const activeLists = lists.filter((list) => !list.archived);

  const archivedLists = lists.filter((list) => list.archived);

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color={colors.text} />
        </TouchableOpacity>

        <Text
          style={[
            styles.headerTitle,
            {
              color: colors.text,
              fontSize: getFontSize(28),
            },
          ]}
        >
          Shopping Lists
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {activeLists.length === 0 && archivedLists.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={90} color="#C7D72D" />

          <Text style={styles.emptyTitle}>No Shopping Lists Yet</Text>

          <Text style={styles.emptySubtitle}>
            Create your first shopping list to start comparing prices and saving
            money.
          </Text>

          <TouchableOpacity
            style={styles.createButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.createButtonText}>Create New List</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {activeLists.map((list) => (
            <ShoppingListCard
              key={list._id || list.id}
              list={list}
              archived={false}
              navigation={navigation}
              onArchive={() => archiveList(list._id || list.id)}
              onDelete={() => deleteList(list._id || list.id)}
            />
          ))}

          {archivedLists.length > 0 && (
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(22),
                  fontWeight: "700",
                  color: "#666",
                }}
              >
                📦 Archived Shopping Lists
              </Text>
            </View>
          )}

          {archivedLists.map((list) => (
            <ShoppingListCard
              key={list._id || list.id}
              list={list}
              archived={true}
              navigation={navigation}
              onReuse={() => reuseList(list._id || list.id)}
              onDelete={() => deleteList(list._id || list.id)}
            />
          ))}
        </ScrollView>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalBackground}>
            <View
              style={[
                styles.modal,
                {
                  backgroundColor: colors.card,
                },
              ]}
            >
              <Text
                style={[
                  styles.modalTitle,
                  {
                    color: colors.text,
                    fontSize: getFontSize(22),
                  },
                ]}
              >
                Create Shopping List
              </Text>

              <TextInput
                placeholder="List Name"
                placeholderTextColor={colors.secondary}
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.background,
                    color: colors.text,
                    fontSize: getFontSize(15),
                  },
                ]}
                value={listName}
                onChangeText={setListName}
              />

              <TextInput
                placeholder={`Budget (${userCurrency})`}
                placeholderTextColor={colors.secondary}
                keyboardType="numeric"
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.background,
                    color: colors.text,
                    fontSize: getFontSize(15),
                  },
                ]}
                value={budget}
                onChangeText={setBudget}
              />

              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  fontWeight: "600",
                  color: colors.text,
                  fontSize: getFontSize(16),
                }}
              >
                Shopping Category
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {[
                  "Groceries",
                  "Electronics",
                  "Furniture",
                  "Liquor",
                  "Pharmacy",
                  "Cleaning",
                  "Toiletries",
                  "Braai",
                ].map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setCategory(item)}
                    style={{
                      backgroundColor:
                        category === item ? "#C7D72D" : colors.border,

                      paddingHorizontal: 14,

                      paddingVertical: 10,

                      borderRadius: 20,

                      marginRight: 10,

                      marginBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: category === item ? "#FFF" : colors.text,

                        fontWeight: "600",
                        fontSize: getFontSize(14),
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.datePicker}
                activeOpacity={0.9}
                onPress={() => setShowDatePicker(true)}
              >
                <View
                  style={{
                    flexDirection: "row",

                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 48,

                      height: 48,

                      borderRadius: 15,

                      backgroundColor: colors.background,

                      justifyContent: "center",

                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="calendar" size={24} color="#C7D72D" />
                  </View>

                  <View
                    style={{
                      marginLeft: 15,

                      flex: 1,
                    }}
                  >
                    <Text
                      style={[
                        styles.dateTitle,
                        {
                          color: colors.secondary,
                        },
                      ]}
                    >
                      Shopping Date
                    </Text>

                    <Text
                      style={[
                        styles.dateValue,
                        {
                          color: colors.text,
                          fontSize: getFontSize(17),
                        },
                      ]}
                    >
                      {formattedDate}
                    </Text>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={colors.secondary}
                  />
                </View>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={shoppingDate || new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  themeVariant="light"
                  minimumDate={new Date()}
                  onChange={onChangeDate}
                />
              )}

              <View style={styles.switchRow}>
                <Text
                  style={{
                    fontWeight: "600",
                    color: colors.text,
                    fontSize: getFontSize(16),
                  }}
                >
                  Share with Family
                </Text>

                <Switch
                  value={shareList}
                  onValueChange={setShareList}
                  trackColor={{
                    false: colors.border,

                    true: "#C7D72D",
                  }}
                />
              </View>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleCreateList}
              >
                <Text style={styles.saveText}>Create Shopping List</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View
        style={{
          height: 25,
        }}
      />
    </SafeAreaView>
  );
}
