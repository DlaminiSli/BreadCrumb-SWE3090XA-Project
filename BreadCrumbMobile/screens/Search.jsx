import React, { useState, useMemo, useCallback } from "react";

import {
  View,
  Text,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import SearchProductCard from "../components/SearchProductCard";
import styles from "./SearchStyles";
import { categorySuggestions } from "../helpers/categorySuggestions";
import { useTheme } from "../context/ThemeContext";
import { auth } from "../services/firebase";
import api from "../services/api";
import { useFocusEffect } from "@react-navigation/native";
import { formatCurrency } from "../utils/currency";

export default function Search({ navigation, route }) {
  const { colors, getFontSize } = useTheme();
  const [search, setSearch] = useState(route.params?.query || "");
  const initialCategory = route.params?.selectedCategory || "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [refreshing, setRefreshing] = useState(false);
  const [userCurrency, setUserCurrency] = useState("Eswatini");
  const categories = [
    "All",
    "Grocery",
    "Pharmacy",
    "Electronics",
    "Furniture",
    "Liquor",
  ];

const products = [
  {
    id: 1,
    name: "Captain Mixed Chicken Portions",
    category: "Grocery",
    store: "Shoprite",
    price: "180",
    save: "27",
    image: require("../assets/images/products/portions.png"),
  },

  {
    id: 2,
    name: "Simba Potato Chips",
    category: "Grocery",
    store: "Shoprite",
    price: "21",
    save: "2",
    image: require("../assets/images/products/simba.png"),
  },

  {
    id: 3,
    name: "Umcenge Long Life Milk",
    category: "Grocery",
    store: "OK Foods",
    price: "38",
    save: "5",
    image: require("../assets/images/products/milk.png"),
  },

  {
    id: 4,
    name: "Oros Squash 2L",
    category: "Grocery",
    store: "Shoprite",
    price: "40",
    save: "6",
    image: require("../assets/images/products/oros.png"),
  },

  {
    id: 5,
    name: "Gordon's London Dry Gin",
    category: "Liquor",
    store: "Spar",
    price: "180",
    save: "17",
    image: require("../assets/images/products/gin.png"),
  },

  {
    id: 6,
    name: "Tastic Rice 5kg",
    category: "Grocery",
    store: "Shoprite",
    price: "180",
    save: "27",
    image: require("../assets/images/products/rice.jpg"),
  },

  {
    id: 7,
    name: "Samsung Galaxy A56",
    category: "Electronics",
    store: "HiFi Corp",
    price: "7999",
    save: "449",
    image: require("../assets/images/products/a56.jpg"),
  },

  {
    id: 8,
    name: "Panado Tablets 24s",
    category: "Pharmacy",
    store: "Clicks",
    price: "56",
    save: "10",
    image: require("../assets/images/products/panado.png"),
  },

  {
    id: 9,
    name: "Black Label Beer 6 Pack",
    category: "Liquor",
    store: "Tops at SPAR",
    price: "112",
    save: "18",
    image: require("../assets/images/products/blacklabel.jpg"),
  },

  {
    id: 10,
    name: "Queen Bed Base Set",
    category: "Furniture",
    store: "OK Furniture",
    price: "5998",
    save: "651",
    image: require("../assets/images/products/queenbed.jpg"),
  },

  {
    id: 11,
    name: "Blue Ribbon Brown Bread",
    category: "Grocery",
    store: "OK Foods",
    price: "18",
    save: "4",
    image: require("../assets/images/products/blueribbon.png"),
  },

  {
    id: 12,
    name: "Hisense 55 Inch Smart TV",
    category: "Electronics",
    store: "Hifi Corp",
    price: "7998",
    save: "451",
    image: require("../assets/images/products/hisense55.jpg"),
  },

  {
    id: 13,
    name: "Nivea Body Lotion 400ml",
    category: "Pharmacy",
    store: "Woolworths",
    price: "95",
    save: "14",
    image: require("../assets/images/products/nivealotion.jpg"),
  },

  {
    id: 14,
    name: "Savanna Dry 6 Pack",
    category: "Liquor",
    store: "Tops at Spar",
    price: "135",
    save: "18",
    image: require("../assets/images/products/savanna.jpg"),
  },

  {
    id: 15,
    name: "Office Study Desk",
    category: "Furniture",
    store: "OK Furniture",
    price: "2500",
    save: "374",
    image: require("../assets/images/products/desk.jpg"),
  },

  {
    id: 16,
    name: "Clover Full Life Milk",
    category: "Grocery",
    store: "OK Foods",
    price: "17",
    save: "4",
    image: require("../assets/images/products/clovermilk.png"),
  },

  {
    id: 17,
    name: "iPhone 16 128GB",
    category: "Electronics",
    store: "HiFi Corp",
    price: "21998",
    save: "451",
    image: require("../assets/images/products/iphone16.png"),
  },

  {
    id: 18,
    name: "Always Ultra Pads",
    category: "Pharmacy",
    store: "Woolworths",
    price: "75",
    save: "12",
    image: require("../assets/images/products/always.png"),
  },

  {
    id: 19,
    name: "Gordon's London Dry Gin 750ml",
    category: "Liquor",
    store: "Spar",
    price: "180",
    save: "17",
    image: require("../assets/images/products/gin.png"),
  },

  {
    id: 20,
    name: "Modern TV Stand",
    category: "Furniture",
    store: "OK Furniture",
    price: "7998",
    save: "651",
    image: require("../assets/images/products/tvstand.jpg"),
  },

  {
    id: 21,
    name: "Eggs Large 18 Pack",
    category: "Grocery",
    store: "OK Foods",
    price: "60",
    save: "9",
    image: require("../assets/images/products/eggs.jpg"),
  },

  {
    id: 22,
    name: "JBL Flip 7 Speaker",
    category: "Electronics",
    store: "HiFi Corp",
    price: "2298",
    save: "346",
    image: require("../assets/images/products/jbl.png"),
  },

  {
    id: 23,
    name: "Centrum Multivitamins",
    category: "Pharmacy",
    store: "Clicks",
    price: "100",
    save: "15",
    image: require("../assets/images/products/centrum.jpg"),
  },

  {
    id: 24,
    name: "Heineken Lager 6 Pack",
    category: "Liquor",
    store: "Tops at SPAR",
    price: "140",
    save: "17",
    image: require("../assets/images/products/heineken.jpg"),
  },

  {
    id: 25,
    name: "Three-Seater Sofa",
    category: "Furniture",
    store: "Bears",
    price: "6999",
    save: "650",
    image: require("../assets/images/products/sofa.jpg"),
  },

  {
    id: 26,
    name: "Tecno Camon 40 Pro",
    category: "Electronics",
    store: "HiFi Corp",
    price: "5299",
    save: "450",
    image: require("../assets/images/products/tecno.jpg"),
  },

  {
    id: 27,
    name: "Castle Lite 6 Pack",
    category: "Liquor",
    store: "Tops at SPAR",
    price: "116",
    save: "16",
    image: require("../assets/images/products/castlelite.jpg"),
  },

  {
    id: 28,
    name: "Colgate Triple Action 100ml",
    category: "Pharmacy",
    store: "Woolworths",
    price: "35",
    save: "5",
    image: require("../assets/images/products/colgate.png"),
  },

  {
    id: 29,
    name: "Sunfoil Cooking Oil 2L",
    category: "Grocery",
    store: "Shoprite",
    price: "81",
    save: "11",
    image: require("../assets/images/products/oil.jpg"),
  },

  {
    id: 30,
    name: "Wardrobe 3 Door",
    category: "Furniture",
    store: "OK Furniture",
    price: "4000",
    save: "599",
    image: require("../assets/images/products/wardrobe.jpg"),
  },

  {
    id: 31,
    name: "Redmi Note 14",
    category: "Electronics",
    store: "HiFi Corp",
    price: "4798",
    save: "450",
    image: require("../assets/images/products/redmi.png"),
  },

  {
    id: 32,
    name: "Flying Fish Lemon 6 Pack",
    category: "Liquor",
    store: "Tops at Spar",
    price: "121",
    save: "17",
    image: require("../assets/images/products/flyingfish.jpg"),
  },

  {
    id: 33,
    name: "Bio-Oil 125ml",
    category: "Pharmacy",
    store: "Clicks",
    price: "190",
    save: "17",
    image: require("../assets/images/products/biooil.png"),
  },

  {
    id: 34,
    name: "Doritos Nacho Cheese",
    category: "Grocery",
    store: "Shoprite",
    price: "35",
    save: "5",
    image: require("../assets/images/products/doritos.jpg"),
  },

  {
    id: 35,
    name: "Coffee Table",
    category: "Furniture",
    store: "OK Furniture",
    price: "999",
    save: "166",
    image: require("../assets/images/products/coffeetable.jpg"),
  },

  {
    id: 36,
    name: "HP 15 Laptop",
    category: "Electronics",
    store: "HiFi Corp",
    price: "13999",
    save: "450",
    image: require("../assets/images/products/hplaptop.png"),
  },

  {
    id: 37,
    name: "Jameson Irish Whiskey",
    category: "Liquor",
    store: "Tops at SPAR",
    price: "450",
    save: "17",
    image: require("../assets/images/products/jameson.jpg"),
  },

  {
    id: 38,
    name: "Sensodyne Toothpaste",
    category: "Pharmacy",
    store: "Shoprite",
    price: "69",
    save: "10",
    image: require("../assets/images/products/sensodyne.jpg"),
  },

  {
    id: 39,
    name: "Coca-Cola 2L",
    category: "Grocery",
    store: "Pic n Pay",
    price: "24",
    save: "2",
    image: require("../assets/images/products/coke.png"),
  },

  {
    id: 40,
    name: "Dining Table 6 Seater",
    category: "Furniture",
    store: "OK Furniture",
    price: "4499",
    save: "651",
    image: require("../assets/images/products/diningtable.jpg"),
  },

  {
    id: 41,
    name: "Hennessy VS 750ml",
    category: "Liquor",
    store: "Tops at Spar",
    price: "750",
    save: "19",
    image: require("../assets/images/products/hennessy.jpg"),
  },

  {
    id: 42,
    name: "Hennessy VSOP 750ml",
    category: "Liquor",
    store: "Tops at SPAR",
    price: "750",
    save: "17",
    image: require("../assets/images/products/hennessy-vsop.png"),
  },

  {
    id: 43,
    name: "Brutal Fruit Ruby Apple 6 Pack",
    category: "Liquor",
    store: "Tops at Spar",
    price: "125",
    save: "19",
    image: require("../assets/images/products/brutalfruit.jpg"),
  },

  {
    id: 44,
    name: "Brutal Fruit Spritzer Original 6 Pack",
    category: "Liquor",
    store: "Pick n Pay Liquor",
    price: "125",
    save: "12",
    image: require("../assets/images/products/brutalfruit-original.jpg"),
  },

  {
    id: 45,
    name: "Kellogg's Corn Flakes 750g",
    category: "Grocery",
    store: "Shoprite",
    price: "75",
    save: "11",
    image: require("../assets/images/products/cornflakes.jpg"),
  },

  {
    id: 46,
    name: "Kellogg's Coco Pops 500g",
    category: "Grocery",
    store: "Shoprite",
    price: "70",
    save: "9",
    image: require("../assets/images/products/cocopops.png"),
  },

  {
    id: 47,
    name: "Jungle Oats 1kg",
    category: "Grocery",
    store: "Shoprite",
    price: "69",
    save: "11",
    image: require("../assets/images/products/jungleoats.png"),
  },

  {
    id: 48,
    name: "Weet-Bix Original 900g",
    category: "Grocery",
    store: "Shoprite",
    price: "65",
    save: "10",
    image: require("../assets/images/products/weetbix.jpg"),
  },

  {
    id: 49,
    name: "Futurelife Original 500g",
    category: "Grocery",
    store: "Boxer",
    price: "85",
    save: "13",
    image: require("../assets/images/products/futurelife.jpg"),
  },

  {
    id: 50,
    name: "Nestlé Milo Cereal",
    category: "Grocery",
    store: "Boxer",
    price: "89",
    save: "9",
    image: require("../assets/images/products/milocereal.jpg"),
  },

  {
    id: 51,
    name: "Samsung Galaxy A36",
    category: "Electronics",
    store: "HiFi Corp",
    price: "5998",
    save: "452",
    image: require("../assets/images/products/a36.jpg"),
  },

  {
    id: 52,
    name: "LG 55-inch UHD Smart TV",
    category: "Electronics",
    store: "HiFi Corp",
    price: "8000",
    save: "449",
    image: require("../assets/images/products/lg55.jpg"),
  },

  {
    id: 53,
    name: "Logitech Wireless Mouse",
    category: "Electronics",
    store: "HiFi Corp",
    price: "349",
    save: "52",
    image: require("../assets/images/products/logitechmouse.jpg"),
  },

  {
    id: 54,
    name: "HP Wireless Keyboard",
    category: "Electronics",
    store: "HiFi Corp",
    price: "699",
    save: "105",
    image: require("../assets/images/products/hpkeyboard.jpg"),
  },

  {
    id: 55,
    name: "Philips Electric Kettle",
    category: "Electronics",
    store: "Game",
    price: "699",
    save: "105",
    image: require("../assets/images/products/kettle.jpg"),
  },

  {
    id: 56,
    name: "Philips Air Fryer",
    category: "Electronics",
    store: "HiFi Corp",
    price: "1698",
    save: "256",
    image: require("../assets/images/products/airfryer.jpg"),
  },

  {
    id: 57,
    name: "Sunlight Washing Powder 2kg",
    category: "Grocery",
    store: "Boxer",
    price: "38",
    save: "5",
    image: require("../assets/images/products/sunlight.jpg"),
  },

  {
    id: 58,
    name: "Omo Auto Washing Powder 2kg",
    category: "Grocery",
    store: "Boxer",
    price: "130",
    save: "19",
    image: require("../assets/images/products/omo.png"),
  },

  {
    id: 59,
    name: "Ricoffy Coffee 750g",
    category: "Grocery",
    store: "Pick n Pay",
    price: "92",
    save: "15",
    image: require("../assets/images/products/ricoffy.jpg"),
  },

  {
    id: 60,
    name: "Five Roses Tea 100 Bags",
    category: "Grocery",
    store: "Pick n Pay",
    price: "58",
    save: "8",
    image: require("../assets/images/products/fiveroses.jpg"),
  },

  {
    id: 61,
    name: "Sirloin Steak",
    category: "Grocery",
    store: "Spar",
    price: "179",
    save: "28",
    image: require("../assets/images/products/steak.jpg"),
  },

  {
    id: 62,
    name: "Whole Chicken",
    category: "Grocery",
    store: "Shoprite",
    price: "120",
    save: "18",
    image: require("../assets/images/products/chicken.jpg"),
  },

  {
    id: 63,
    name: "Boerewors",
    category: "Grocery",
    store: "Spar",
    price: "131",
    save: "18",
    image: require("../assets/images/products/boerewors.jpg"),
  },

  {
    id: 64,
    name: "Charcoal",
    category: "Grocery",
    store: "Shoprite",
    price: "99",
    save: "16",
    image: require("../assets/images/products/charcoal.jpg"),
  },

  {
    id: 65,
    name: "All Gold Tomato Sauce",
    category: "Grocery",
    store: "Boxer",
    price: "32",
    save: "5",
    image: require("../assets/images/products/tomatosauce.jpg"),
  },

  {
    id: 66,
    name: "Power Bank 10000mAh",
    category: "Electronics",
    store: "HiFi Corp",
    price: "699",
    save: "100",
    image: require("../assets/images/products/powerbank.jpg"),
  },

  {
    id: 67,
    name: "USB Flash Drive 64GB",
    category: "Electronics",
    store: "HiFi Corp",
    price: "99",
    save: "16",
    image: require("../assets/images/products/usb64gb.jpg"),
  },

  {
    id: 68,
    name: "Adcodol",
    category: "Pharmacy",
    store: "Clicks",
    price: "72",
    save: "7",
    image: require("../assets/images/products/adcodol.jpg"),
  },

  {
    id: 69,
    name: "First Aid Kit",
    category: "Pharmacy",
    store: "Clicks",
    price: "299",
    save: "50",
    image: require("../assets/images/products/firstaidkit.jpg"),
  },

  {
    id: 70,
    name: "Bandages",
    category: "Pharmacy",
    store: "Clicks",
    price: "35",
    save: "10",
    image: require("../assets/images/products/bandages.jpg"),
  },

  {
    id: 71,
    name: "Impulse Body Mist",
    category: "Pharmacy",
    store: "Shoprite",
    price: "100",
    save: "15",
    image: require("../assets/images/products/impulse.jpg"),
  },

  {
    id: 72,
    name: "Disprin",
    category: "Pharmacy",
    store: "Clicks",
    price: "41",
    save: "5",
    image: require("../assets/images/products/disprin.jpg"),
  },

  {
    id: 73,
    name: "Vitamin C",
    category: "Pharmacy",
    store: "Clicks",
    price: "100",
    save: "15",
    image: require("../assets/images/products/vitaminc.jpg"),
  },

  {
    id: 74,
    name: "Gaming Chair",
    category: "Furniture",
    store: "OK Furniture",
    price: "1499",
    save: "225",
    image: require("../assets/images/products/gamingchair.jpg"),
  },

  {
    id: 75,
    name: "Bookshelf",
    category: "Furniture",
    store: "OK Furniture",
    price: "1698",
    save: "256",
    image: require("../assets/images/products/bookshelf.jpg"),
  },

  {
    id: 76,
    name: "Shield Roll-On",
    category: "Pharmacy",
    store: "Shoprite",
    price: "45",
    save: "7",
    image: require("../assets/images/products/shield.jpg"),
  },

  {
    id: 77,
    name: "Oral-B Toothbrush",
    category: "Pharmacy",
    store: "Shoprite",
    price: "31",
    save: "3",
    image: require("../assets/images/products/oralb.jpg"),
  },

  {
    id: 78,
    name: "Dove Beauty Soap",
    category: "Pharmacy",
    store: "Woolworths",
    price: "25",
    save: "4",
    image: require("../assets/images/products/dove.jpg"),
  },

  {
    id: 79,
    name: "Pantene Shampoo",
    category: "Pharmacy",
    store: "Woolworths",
    price: "99",
    save: "16",
    image: require("../assets/images/products/panteneshampoo.jpg"),
  },

  {
    id: 80,
    name: "Pantene Conditioner",
    category: "Pharmacy",
    store: "Woolworths",
    price: "101",
    save: "14",
    image: require("../assets/images/products/panteneconditioner.jpg"),
  },

  {
    id: 81,
    name: "Baby Soft Toilet Paper",
    category: "Grocery",
    store: "Shoprite",
    price: "121",
    save: "17",
    image: require("../assets/images/products/babysoft.jpg"),
  },

  {
    id: 82,
    name: "Handy Andy",
    category: "Grocery",
    store: "Shoprite",
    price: "49",
    save: "8",
    image: require("../assets/images/products/handyandy.png"),
  },

  {
    id: 83,
    name: "Domestos",
    category: "Grocery",
    store: "Boxer",
    price: "40",
    save: "6",
    image: require("../assets/images/products/domestos.jpg"),
  },

  {
    id: 84,
    name: "Refuse Bags",
    category: "Grocery",
    store: "Shoprite",
    price: "99",
    save: "16",
    image: require("../assets/images/products/refusebags.jpg"),
  },

  {
    id: 85,
    name: "Scouring Sponge",
    category: "Grocery",
    store: "Shoprite",
    price: "18",
    save: "3",
    image: require("../assets/images/products/sponge.jpg"),
  },

  {
    id: 86,
    name: "Bleach",
    category: "Grocery",
    store: "Boxer",
    price: "34",
    save: "6",
    image: require("../assets/images/products/bleach.jpg"),
  },

  {
    id: 87,
    name: "Sunlight Dishwashing Liquid",
    category: "Grocery",
    store: "Boxer",
    price: "37",
    save: "6",
    image: require("../assets/images/products/sunlightdishwashing.jpg"),
  },

  {
    id: 88,
    name: "Smirnoff Vodka",
    category: "Liquor",
    store: "TOPS at SPAR",
    price: "221",
    save: "18",
    image: require("../assets/images/products/smirnoff.jpg"),
  },

  {
    id: 93,
    name: "SunSun Rice 2kg",
    category: "Grocery",
    store: "Shoprite",
    price: "70",
    save: "10",
    image: require("../assets/images/products/sunsunrice.jpg"),
  },

  {
    id: 94,
    name: "Selati Sugar 2kg",
    category: "Grocery",
    store: "Shoprite",
    price: "44",
    save: "8",
    image: require("../assets/images/products/selati.jpg"),
  },

  {
    id: 95,
    name: "Clover Full Life Milk",
    category: "Grocery",
    store: "OK Foods",
    price: "17",
    save: "4",
    image: require("../assets/images/products/clovermilk.png"),
  },

  {
    id: 96,
    name: "Umcenge Long Life Milk",
    category: "Grocery",
    store: "OK Foods",
    price: "19",
    save: "5",
    image: require("../assets/images/products/milk.jpg"),
  },

  {
    id: 97,
    name: "Ricoffy Coffee 750g",
    category: "Grocery",
    store: "Pick n Pay",
    price: "92",
    save: "15",
    image: require("../assets/images/products/ricoffy.jpg"),
  },

  {
    id: 98,
    name: "Freshpak Tea 100 Bags",
    category: "Grocery",
    store: "Pick n Pay",
    price: "54",
    save: "7",
    image: require("../assets/images/products/freshpak.jpg"),
  },

  {
    id: 99,
    name: "Eggs Large 30 Pack",
    category: "Grocery",
    store: "OK Foods",
    price: "90",
    save: "12",
    image: require("../assets/images/products/eggs.jpg"),
  },

  {
    id: 100,
    name: "Sunfoil Cooking Oil 2L",
    category: "Grocery",
    store: "Shoprite",
    price: "81",
    save: "11",
    image: require("../assets/images/products/sunfoil.jpg"),
  },

  {
    id: 101,
    name: "Malva Pudding 450g",
    category: "Bakery & Desserts",
    store: "Woolworths",
    price: "105",
    save: "19",
    image: require("../assets/images/products/pudding.jpg"),
  },
];

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return products.filter(
        (product) =>
          selectedCategory === "All" || product.category === selectedCategory,
      );
    }

    const normalResults = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesSearch = product.name.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

    if (normalResults.length > 0) {
      return normalResults;
    }

    const findProductImage = (productName) => {
      const product = products.find(
        (p) =>
          p.name.toLowerCase().includes(productName.toLowerCase()) ||
          productName.toLowerCase().includes(p.name.toLowerCase()),
      );

      return product
        ? product.image
        : require("../assets/images/products/default.png");
    };

    const suggestions = categorySuggestions[query];
    if (suggestions) {
      return suggestions.map((item) => ({
        id: item.id,
        name: item.name,
        category: "Suggested",
        store: "Multiple Stores",
        price: `E${item.estimatedPrice}`,
        save: "Suggested Item",
        image: findProductImage(item.name),
      }));
    }
    return [];
  }, [search, selectedCategory]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const renderProduct = ({ item }) => (
    <SearchProductCard
      image={item.image}
      product={item.name}
      store={item.store}
      price={formatCurrency(item.price, userCurrency)}
      save={`Save ${formatCurrency(item.save, userCurrency)}`}
      onPress={() =>
        navigation.navigate("ComparePrice", {
          product: item,
        })
      }
    />
  );

  const renderHeader = () => (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={26} color={colors.text} />
      </TouchableOpacity>

      <Text
        style={[
          styles.title,
          {
            color: colors.text,
            fontSize: getFontSize(30),
          },
        ]}
      >
        Find the Best Price
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: colors.secondary,
            fontSize: getFontSize(16),
          },
        ]}
      >
        Compare prices across Eswatini stores
      </Text>

      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Ionicons name="search" size={20} color={colors.secondary} />

        <TextInput
          style={[
            styles.searchInput,
            {
              color: colors.text,
              fontSize: getFontSize(16),
            },
          ]}
          placeholder="Search products..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={colors.secondary}
        />

        <TouchableOpacity>
          <Ionicons name="mic-outline" size={22} color={colors.secondary} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons
            name="barcode-outline"
            size={22}
            color={colors.secondary}
            style={{
              marginLeft: 12,
            }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.selectedChip,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                {
                  fontSize: getFontSize(14),
                },
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.text,
            fontSize: getFontSize(20),
          },
        ]}
      >
        Products
      </Text>
    </>
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

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      {renderHeader()}
      <FlatList
        style={{ flex: 1 }}
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={55} color="#C8C8C8" />

            <Text
              style={[
                styles.emptyTitle,
                {
                  color: colors.text,
                  fontSize: getFontSize(22),
                },
              ]}
            >
              No products found
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
              Try searching for another product.
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
