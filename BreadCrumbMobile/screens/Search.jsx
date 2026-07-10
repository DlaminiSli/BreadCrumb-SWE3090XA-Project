import React, { useState, useMemo } from "react";

import {

    View,

    Text,

    ScrollView,

    TextInput,

    TouchableOpacity,

    RefreshControl,

    SafeAreaView

} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import SearchProductCard from "../components/SearchProductCard";

import styles from "./SearchStyles";

export default function Search({ navigation }) {

    const [search, setSearch] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("All");

    const [refreshing, setRefreshing] = useState(false);

    const categories = [

        "All",

        "Grocery",

        "Pharmacy",

        "Electronics",

        "Furniture",

        "Liquor"

    ];

    const products = [

        {

            id: 1,

            name: "Captain Mixed Chicken Portions",

            category: "Grocery",

            store: "Pick n Pay",

            price: "E179",

            save: "Save E19",

            image: require("../assets/images/products/portions.png")

        },

        {

            id: 2,

            name: "Simba Potato Chips",

            category: "Grocery",

            store: "SPAR",

            price: "E17",

            save: "Save E7",

            image: require("../assets/images/products/simba.png")

        },

        {

            id: 3,

            name: "Umcenge Long Life Milk",

            category: "Grocery",

            store: "Pick n Pay",

            price: "E19",

            save: "Save E10",

            image: require("../assets/images/products/milk.png")

        },

        {

            id: 4,

            name: "Oros Squash 2L",

            category: "Grocery",

            store: "Boxer",

            price: "E37",

            save: "Save E6",

            image: require("../assets/images/products/oros.png")

        },

        {

            id: 5,

            name: "Gordon's London Dry Gin",

            category: "Liquor",

            store: "Shoprite",

            price: "E194",

            save: "Save E25",

            image: require("../assets/images/products/gin.png")

        },

        {

            id: 6,

            name: "Tastic Rice 5kg",

            category: "Grocery",

            store: "SPAR",

            price: "E115",

            save: "Save E12",

            image: require("../assets/images/products/rice.jpg")

        },

        {
            id: 7,
            name: "Samsung Galaxy A56",
            category: "Electronics",
            store: "HiFi Corp",
            price: "E8,999",
            save: "Save E500",
            image: require("../assets/images/products/a56.jpg")
        },

        {
            id: 8,
            name: "Panado Tablets 24s",
            category: "Pharmacy",
            store: "Clicks",
            price: "E54",
            save: "Save E6",
            image: require("../assets/images/products/panado.png")
        },

        {
            id: 9,
            name: "Black Label Beer 6 Pack",
            category: "Liquor",
            store: "Tops at SPAR",
            price: "E119",
            save: "Save E15",
            image: require("../assets/images/products/blacklabel.jpg")
        },

        {
            id: 10,
            name: "Queen Bed Base Set",
            category: "Furniture",
            store: "OK Furniture",
            price: "E4,999",
            save: "Save E400",
            image: require("../assets/images/products/queenbed.jpg")
        },

        {
            id: 11,
            name: "Blue Ribbon Brown Bread",
            category: "Grocery",
            store: "Shoprite",
            price: "E18",
            save: "Save E2",
            image: require("../assets/images/products/blueribbon.png")
        },

        {
            id: 12,
            name: "Hisense 55-inch Smart TV",
            category: "Electronics",
            store: "Bears",
            price: "E6,799",
            save: "Save E700",
            image: require("../assets/images/products/hisense55.jpg")
        },

        {
            id: 13,
            name: "Nivea Body Lotion 400ml",
            category: "Pharmacy",
            store: "Dis-Chem",
            price: "E89",
            save: "Save E10",
            image: require("../assets/images/products/nivealotion.jpg")
        },

        {
            id: 14,
            name: "Savanna Dry 6 Pack",
            category: "Liquor",
            store: "Pick n Pay Liquor",
            price: "E129",
            save: "Save E18",
            image: require("../assets/images/products/savanna.jpg")
        },

        {
            id: 15,
            name: "Office Study Desk",
            category: "Furniture",
            store: "Bears",
            price: "E2,299",
            save: "Save E250",
            image: require("../assets/images/products/desk.jpg")
        },

        {
            id: 16,
            name: "Clover Full Life Milk",
            category: "Grocery",
            store: "Pick n Pay",
            price: "E19",
            save: "Save E10",
            image: require("../assets/images/products/clovermilk.png")
        },

        {
            id: 17,
            name: "iPhone 16 128GB",
            category: "Electronics",
            store: "HiFi Corp",
            price: "E21,999",
            save: "Save E1,000",
            image: require("../assets/images/products/iphone16.png")
        },

        {
            id: 18,
            name: "Always Ultra Pads",
            category: "Pharmacy",
            store: "Clicks",
            price: "E65",
            save: "Save E8",
            image: require("../assets/images/products/always.png")
        },

        {
            id: 19,
            name: "Gordon's London Dry Gin 750ml",
            category: "Liquor",
            store: "Shoprite",
            price: "E194",
            save: "Save E25",
            image: require("../assets/images/products/gin.png")
        },

        {
            id: 20,
            name: "Modern TV Stand",
            category: "Furniture",
            store: "OK Furniture",
            price: "E1,699",
            save: "Save E180",
            image: require("../assets/images/products/tvstand.jpg")
        },

        {
            id: 21,
            name: "Eggs Large 18 Pack",
            category: "Grocery",
            store: "SPAR",
            price: "E49",
            save: "Save E6",
            image: require("../assets/images/products/eggs.jpg")
        },

        {
            id: 22,
            name: "JBL Flip 7 Speaker",
            category: "Electronics",
            store: "HiFi Corp",
            price: "E2,399",
            save: "Save E250",
            image: require("../assets/images/products/jbl.png")
        },

        {
            id: 23,
            name: "Centrum Multivitamins",
            category: "Pharmacy",
            store: "Clicks",
            price: "E219",
            save: "Save E20",
            image: require("../assets/images/products/centrum.jpg")
        },

        {
            id: 24,
            name: "Heineken Lager 6 Pack",
            category: "Liquor",
            store: "Tops at SPAR",
            price: "E139",
            save: "Save E12",
            image: require("../assets/images/products/heineken.jpg")
        },

        {
            id: 25,
            name: "Three-Seater Sofa",
            category: "Furniture",
            store: "Bears",
            price: "E6,999",
            save: "Save E650",
            image: require("../assets/images/products/sofa.jpg")
        },

                {
            id: 26,
            name: "Tecno Camon 40 Pro",
            category: "Electronics",
            store: "HiFi Corp",
            price: "E6,999",
            save: "Save E400",
            image: require("../assets/images/products/tecno.jpg")
        },

        {
            id: 27,
            name: "Castle Lite 6 Pack",
            category: "Liquor",
            store: "Tops at SPAR",
            price: "E129",
            save: "Save E15",
            image: require("../assets/images/products/castlelite.jpg")
        },

        {
            id: 28,
            name: "Colgate Triple Action 100ml",
            category: "Pharmacy",
            store: "Clicks",
            price: "E39",
            save: "Save E5",
            image: require("../assets/images/products/colgate.png")
        },

        {
            id: 29,
            name: "Sunfoil Cooking Oil 2L",
            category: "Grocery",
            store: "Shoprite",
            price: "E69",
            save: "Save E8",
            image: require("../assets/images/products/oil.jpg")
        },

        {
            id: 30,
            name: "Wardrobe 3 Door",
            category: "Furniture",
            store: "OK Furniture",
            price: "E3,899",
            save: "Save E350",
            image: require("../assets/images/products/wardrobe.jpg")
        },

        {
            id: 31,
            name: "Redmi Note 14",
            category: "Electronics",
            store: "HiFi Corp",
            price: "E5,499",
            save: "Save E300",
            image: require("../assets/images/products/redmi.png")
        },

        {
            id: 32,
            name: "Flying Fish Lemon 6 Pack",
            category: "Liquor",
            store: "Pick n Pay Liquor",
            price: "E119",
            save: "Save E12",
            image: require("../assets/images/products/flyingfish.jpg")
        },

        {
            id: 33,
            name: "Bio-Oil 125ml",
            category: "Pharmacy",
            store: "Dis-Chem",
            price: "E185",
            save: "Save E15",
            image: require("../assets/images/products/biooil.png")
        },

        {
            id: 34,
            name: "Doritos Nacho Cheese",
            category: "Grocery",
            store: "Pick n Pay",
            price: "E32",
            save: "Save E4",
            image: require("../assets/images/products/doritos.jpg")
        },

        {
            id: 35,
            name: "Coffee Table",
            category: "Furniture",
            store: "Bears",
            price: "E1,499",
            save: "Save E150",
            image: require("../assets/images/products/coffeetable.jpg")
        },

        {
            id: 36,
            name: "HP 15 Laptop",
            category: "Electronics",
            store: "HiFi Corp",
            price: "E10,999",
            save: "Save E800",
            image: require("../assets/images/products/hplaptop.png")
        },

        {
            id: 37,
            name: "Jameson Irish Whiskey",
            category: "Liquor",
            store: "Tops at SPAR",
            price: "E389",
            save: "Save E40",
            image: require("../assets/images/products/jameson.jpg")
        },

        {
            id: 38,
            name: "Sensodyne Toothpaste",
            category: "Pharmacy",
            store: "Clicks",
            price: "E68",
            save: "Save E8",
            image: require("../assets/images/products/sensodyne.jpg")
        },

        {
            id: 39,
            name: "Coca-Cola 2L",
            category: "Grocery",
            store: "Boxer",
            price: "E24",
            save: "Save E3",
            image: require("../assets/images/products/coke.png")
        },

        {
            id: 40,
            name: "Dining Table 6 Seater",
            category: "Furniture",
            store: "OK Furniture",
            price: "E5,999",
            save: "Save E500",
            image: require("../assets/images/products/diningtable.jpg")
        },

        {
        id: 41,
        name: "Hennessy VS 750ml",
        category: "Liquor",
        store: "Pick n Pay Liquor",
        price: "E799",
        save: "Save E50",
        image: require("../assets/images/products/hennessy.jpg")
    },

    {
        id: 42,
        name: "Hennessy VSOP 750ml",
        category: "Liquor",
        store: "Tops at SPAR",
        price: "E1,299",
        save: "Save E80",
        image: require("../assets/images/products/hennessy-vsop.png")
    },

    {
        id: 43,
        name: "Brutal Fruit Ruby Apple 6 Pack",
        category: "Liquor",
        store: "Shoprite",
        price: "E129",
        save: "Save E15",
        image: require("../assets/images/products/brutalfruit.jpg")
    },

    {
        id: 44,
        name: "Brutal Fruit Spritzer Original 6 Pack",
        category: "Liquor",
        store: "Pick n Pay Liquor",
        price: "E125",
        save: "Save E12",
        image: require("../assets/images/products/brutalfruit-original.jpg")
    },

    {
        id: 45,
        name: "Kellogg's Corn Flakes 750g",
        category: "Grocery",
        store: "Shoprite",
        price: "E79",
        save: "Save E8",
        image: require("../assets/images/products/cornflakes.jpg")
    },

    {
        id: 46,
        name: "Kellogg's Coco Pops 500g",
        category: "Grocery",
        store: "Pick n Pay",
        price: "E74",
        save: "Save E6",
        image: require("../assets/images/products/cocopops.png")
    },

    {
        id: 47,
        name: "Jungle Oats 1kg",
        category: "Grocery",
        store: "SPAR",
        price: "E69",
        save: "Save E7",
        image: require("../assets/images/products/jungleoats.png")
    },

    {
        id: 48,
        name: "Weet-Bix Original 900g",
        category: "Grocery",
        store: "Shoprite",
        price: "E82",
        save: "Save E10",
        image: require("../assets/images/products/weetbix.jpg")
    },

    {
        id: 49,
        name: "Futurelife Original 500g",
        category: "Grocery",
        store: "Pick n Pay",
        price: "E92",
        save: "Save E8",
        image: require("../assets/images/products/futurelife.jpg")
    },

    {
        id: 50,
        name: "Nestlé Milo Cereal",
        category: "Grocery",
        store: "Boxer",
        price: "E89",
        save: "Save E9",
        image: require("../assets/images/products/milocereal.jpg")
    },

    {
        id: 51,
        name: "Samsung Galaxy A36",
        category: "Electronics",
        store: "HiFi Corp",
        price: "E5,999",
        save: "Save E500",
        image: require("../assets/images/products/a36.jpg")
    },

    {
        id: 52,
        name: "LG 55-inch UHD Smart TV",
        category: "Electronics",
        store: "Bears",
        price: "E8,999",
        save: "Save E700",
        image: require("../assets/images/products/lg55.jpg")
    },

    {
        id: 53,
        name: "Logitech Wireless Mouse",
        category: "Electronics",
        store: "HiFi Corp",
        price: "E399",
        save: "Save E40",
        image: require("../assets/images/products/logitechmouse.jpg")
    },

    {
        id: 54,
        name: "HP Wireless Keyboard",
        category: "Electronics",
        store: "HiFi Corp",
        price: "E649",
        save: "Save E60",
        image: require("../assets/images/products/hpkeyboard.jpg")
    },

    {
        id: 55,
        name: "Philips Electric Kettle",
        category: "Electronics",
        store: "Game",
        price: "E699",
        save: "Save E70",
        image: require("../assets/images/products/kettle.jpg")
    },

    {
        id: 56,
        name: "Air Fryer 8L",
        category: "Electronics",
        store: "OK Furniture",
        price: "E1,999",
        save: "Save E200",
        image: require("../assets/images/products/airfryer.jpg")
    },

    {
        id: 57,
        name: "Sunlight Washing Powder 2kg",
        category: "Grocery",
        store: "Shoprite",
        price: "E145",
        save: "Save E15",
        image: require("../assets/images/products/sunlight.jpg")
    },

    {
        id: 58,
        name: "Omo Auto Washing Powder 2kg",
        category: "Grocery",
        store: "Pick n Pay",
        price: "E179",
        save: "Save E20",
        image: require("../assets/images/products/omo.jpg")
    },

    {
        id: 59,
        name: "Ricoffy Coffee 750g",
        category: "Grocery",
        store: "SPAR",
        price: "E129",
        save: "Save E15",
        image: require("../assets/images/products/ricoffy.jpg")
    },

    {
        id: 60,
        name: "Five Roses Tea 100 Bags",
        category: "Grocery",
        store: "Shoprite",
        price: "E69",
        save: "Save E8",
        image: require("../assets/images/products/fiveroses.jpg")
    },

    ];

    const filteredProducts = useMemo(() => {

        return products.filter(product => {

            const matchesCategory =

                selectedCategory === "All"

                ||

                product.category === selectedCategory;

            const matchesSearch =

                product.name

                    .toLowerCase()

                    .includes(

                        search.toLowerCase()

                    );

            return matchesCategory && matchesSearch;

        });

    }, [search, selectedCategory]);

    const onRefresh = () => {

        setRefreshing(true);

        setTimeout(() => {

            setRefreshing(false);

        }, 1500);

    };

    return (

        <SafeAreaView style={styles.container}>

            <ScrollView
                contentContainerStyle={{

            paddingBottom: 120

        }}

                refreshControl={

                    <RefreshControl

                        refreshing={refreshing}

                        onRefresh={onRefresh}

                    />

                }

                showsVerticalScrollIndicator={false}

            >

                <TouchableOpacity

                    onPress={() => navigation.goBack()}

                >

                    <Ionicons

                        name="arrow-back"

                        size={28}

                        color="#222"

                    />

                </TouchableOpacity>

                <Text style={styles.title}>

                    Find the Best Price

                </Text>

                <Text style={styles.subtitle}>

                    Compare prices across Eswatini stores

                </Text>

                <View style={styles.searchContainer}>

                    <Ionicons

                        name="search"

                        size={20}

                        color="#666"

                    />

                    <TextInput

                        style={styles.searchInput}

                        placeholder="Search products..."

                        value={search}

                        onChangeText={setSearch}

                    />

                    <TouchableOpacity>

                        <Ionicons

                            name="mic-outline"

                            size={22}

                            color="#666"

                        />

                    </TouchableOpacity>

                    <TouchableOpacity>

                        <Ionicons

                            name="barcode-outline"

                            size={22}

                            color="#666"

                            style={{

                                marginLeft: 12

                            }}

                        />

                    </TouchableOpacity>

                </View>

                <ScrollView

                    horizontal

                    showsHorizontalScrollIndicator={false}

                    style={styles.categoryScroll}

                >

                    {categories.map(category => (

                        <TouchableOpacity

                            key={category}

                            style={[

                                styles.categoryChip,

                                selectedCategory === category

                                    &&

                                styles.selectedChip

                            ]}

                            onPress={() =>

                                setSelectedCategory(category)

                            }

                        >

                            <Text

                                style={[

                                    styles.categoryText,

                                    selectedCategory === category

                                        &&

                                    styles.selectedCategoryText

                                ]}

                            >

                                {category}

                            </Text>

                        </TouchableOpacity>

                    ))}

                </ScrollView>

                <Text style={styles.sectionTitle}>

                    Products

                </Text>
                                {

                    filteredProducts.map(product => (

                        <SearchProductCard

                            key={product.id}

                            image={product.image}

                            product={product.name}

                            store={product.store}

                            price={product.price}

                            save={product.save}

                            onPress={() =>

                                navigation.navigate(

                                    "ComparePrice",

                                    {

                                        product

                                    }

                                )

                            }

                        />

                    ))

                }

                {

                    filteredProducts.length === 0 && (

                        <View style={styles.emptyContainer}>

                            <Ionicons

                                name="search"

                                size={55}

                                color="#C8C8C8"

                            />

                            <Text style={styles.emptyTitle}>

                                No products found

                            </Text>

                            <Text style={styles.emptySubtitle}>

                                Try searching for another product.

                            </Text>

                        </View>

                    )

                }

            </ScrollView>

        </SafeAreaView>

    );

}