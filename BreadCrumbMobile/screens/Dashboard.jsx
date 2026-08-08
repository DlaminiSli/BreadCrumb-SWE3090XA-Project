import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSearchBar from "../components/DashboardSearchBar";
import CategoryCard from "../components/CategoryCard";
import DealCard from "../components/DealCard";
import CatalogueCard from "../components/CatalogueCard";
import PriceDropCard from "../components/PriceDropCard";
import BottomNavigation from "../components/BottomNavigation";
import styles from "./DashboardStyles";
import imageMap from "../utils/imageMap";
import storeImageMap from "../utils/storeImageMap";
import { auth } from "../services/firebase";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { formatCurrency, convertCurrency } from "../utils/currency";
export default function Dashboard({ navigation }) {
  const [deals, setDeals] = useState([]);

  const [catalogues, setCatalogues] = useState([]);

  const [notifications, setNotifications] = useState(0);
  const [userCurrency, setUserCurrency] = useState("Eswatini");
  const { colors, getFontSize } = useTheme();

  useFocusEffect(
    useCallback(() => {
      async function loadDashboard() {
        try {
          const dealsResponse = await api.get("/deals");

          setDeals(dealsResponse.data);

          const currentUser = auth.currentUser;

          if (currentUser) {
            const token = await currentUser.getIdToken();

            const profileResponse = await api.get("/auth/profile", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            setUserCurrency(profileResponse.data.user.currency || "Eswatini");
          }
        } catch (error) {
          console.log(error.response?.data || error.message);
        }
      }

      loadDashboard();
    }, []),
  );

  useEffect(() => {
    async function loadCatalogues() {
      try {
        const response = await api.get("/catalogues");

        setCatalogues(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadCatalogues();
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function loadNotifications() {
        try {
          const currentUser = auth.currentUser;

          if (!currentUser) return;

          const token = await currentUser.getIdToken();

          const response = await api.get(
            "/alerts/unread-count",

            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          setNotifications(response.data.unreadCount);
        } catch (error) {
          console.log("Notification Error");

          console.log(error.response?.data || error.message);
        }
      }

      loadNotifications();
    }, []),
  );

  const categories = [
    {
      title: "Grocery",

      icon: "basket-outline",

      image: require("../assets/images/categories/grocery.png"),
    },

    {
      title: "Pharmacy",

      icon: "medkit-outline",

      image: require("../assets/images/categories/pharmacy.png"),
    },

    {
      title: "Electronics",

      icon: "tv-outline",

      image: require("../assets/images/categories/electronics.png"),
    },

    {
      title: "Furniture",

      icon: "bed-outline",

      image: require("../assets/images/categories/furniture.png"),
    },

    {
      title: "Liquor",

      icon: "wine-outline",

      image: require("../assets/images/categories/liquor.png"),
    },
  ];

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
        style={[
          styles.scrollContainer,
          {
            backgroundColor: colors.background,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader
          navigation={navigation}
          notifications={notifications}
        />

        <DashboardSearchBar navigation={navigation} />

        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text,
                fontSize: getFontSize(22),
              },
            ]}
          >
            Categories
          </Text>
        </View>

        <View style={styles.categoryRow}>
          {categories.map((item, index) => (
            <CategoryCard
              key={index}
              title={item.title}
              image={item.image}
              onPress={() =>
                navigation.navigate("Search", {
                  selectedCategory: item.title,
                })
              }
            />
          ))}
        </View>
        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text,
                fontSize: getFontSize(22),
              },
            ]}
          >
            Today's Deals
          </Text>

          <TouchableOpacity>
            <Text
              style={[
                styles.seeAll,
                {
                  color: colors.accent,
                  fontSize: getFontSize(14),
                },
              ]}
            >
              See All
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deals.map((deal) => (
            <DealCard
              key={deal._id}
              product={deal.title}
              store={deal.store}
              oldPrice={formatCurrency(
                convertCurrency(deal.oldPrice, userCurrency),
                userCurrency,
              )}
              newPrice={formatCurrency(
                convertCurrency(deal.newPrice, userCurrency),
                userCurrency,
              )}
              save={formatCurrency(
                convertCurrency(deal.save, userCurrency),
                userCurrency,
              )}
              expiry={deal.expiry}
              image={imageMap[deal.image]}
              onPress={() => {
                console.log("Deal:", deal);

                if (Array.isArray(deal.products) && deal.products.length > 0) {
                  navigation.navigate(
                    "ComboDetails",

                    {
                      combo: {
                        id: deal._id,

                        name: deal.title,

                        image: imageMap[deal.image],

                        store: deal.store,

                        price: deal.newPrice,

                        oldPrice: deal.oldPrice,

                        save: deal.save,

                        products: deal.products,
                      },
                    },
                  );
                } else {
                  navigation.navigate(
                    "ComparePrice",

                    {
                      product: {
                        id: deal._id,

                        name: deal.title,

                        image: imageMap[deal.image],

                        store: deal.store,

                        price: deal.newPrice,

                        oldPrice: deal.oldPrice,

                        estimatedPrice: deal.newPrice,
                      },
                    },
                  );
                }
              }}
            />
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text,
                fontSize: getFontSize(22),
              },
            ]}
          >
            Featured Catalogues
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {catalogues.map((catalogue) => (
            <CatalogueCard
              key={catalogue._id}
              logo={storeImageMap[catalogue.image]}
              store={catalogue.store}
              validUntil={catalogue.validUntil}
              onPress={() =>
                navigation.navigate(
                  "Catalogue",

                  {
                    catalogue,
                  },
                )
              }
            />
          ))}
        </ScrollView>

        <View style={{ marginTop: 24 }}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: colors.text,
                  fontSize: getFontSize(22),
                },
              ]}
            >
              Price Drops
            </Text>
          </View>

          <View style={styles.priceDropGrid}>
            <PriceDropCard
              variant="topLeft"
              product="Oros Squash 2L"
              store="Shoprite"
              price={`Now ${formatCurrency(
                convertCurrency(40, userCurrency),
                userCurrency,
              )}`}
              image={require("../assets/images/products/oros.png")}
              onPress={() =>
                navigation.navigate("ComparePrice", {
                  product: {
                    name: "Oros Squash 2L",
                    image: require("../assets/images/products/oros.png"),
                    store: "Shoprite",
                    price: 40,
                  },
                })
              }
            />

            <PriceDropCard
              variant="topRight"
              product="Malva Pudding 450g"
              store="Woolworths"
              price={`Now ${formatCurrency(
                convertCurrency(105, userCurrency),
                userCurrency,
              )}`}
              image={require("../assets/images/products/pudding.jpg")}
              onPress={() =>
                navigation.navigate("ComparePrice", {
                  product: {
                    name: "Malva Pudding 450g",
                    image: require("../assets/images/products/pudding.jpg"),
                    store: "Woolworths",
                    price: 105,
                  },
                })
              }
            />

            <PriceDropCard
              variant="bottomLeft"
              product="Tastic Rice 5kg"
              store="Shoprite"
              price={`Now ${formatCurrency(
                convertCurrency(180, userCurrency),
                userCurrency,
              )}`}
              image={require("../assets/images/products/rice.jpg")}
              onPress={() =>
                navigation.navigate("ComparePrice", {
                  product: {
                    name: "Tastic Rice 5kg",
                    image: require("../assets/images/products/rice.jpg"),
                    store: "Shoprite",
                    price: 180,
                  },
                })
              }
            />

            <PriceDropCard
              variant="bottomRight"
              product="Gordon's London Dry Gin 750ml"
              store="Spar"
              price={`Now ${formatCurrency(
                convertCurrency(180, userCurrency),
                userCurrency,
              )}`}
              image={require("../assets/images/products/gin.png")}
              onPress={() =>
                navigation.navigate("ComparePrice", {
                  product: {
                    name: "Gordon's London Dry Gin 750ml",
                    image: require("../assets/images/products/gin.png"),
                    store: "Spar",
                    price: 180,
                  },
                })
              }
            />
          </View>
        </View>
      </ScrollView>

      <BottomNavigation navigation={navigation} active="Home" />
    </SafeAreaView>
  );
}
