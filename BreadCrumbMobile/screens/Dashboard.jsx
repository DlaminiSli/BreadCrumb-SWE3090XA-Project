import React from "react";

import {

    View,

    Text,

    ScrollView,

    TouchableOpacity,

    SafeAreaView

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

export default function Dashboard({ navigation }) {

    const categories = [

        {

            title: "Grocery",

            icon: "basket-outline",

            image: require("../assets/images/categories/grocery.png")

        },

        {

            title: "Pharmacy",

            icon: "medkit-outline",

            image: require("../assets/images/categories/pharmacy.png")

        },

        {

            title: "Electronics",

            icon: "tv-outline",

            image: require("../assets/images/categories/electronics.png")

        },

        {

            title: "Furniture",

            icon: "bed-outline",

            image: require("../assets/images/categories/furniture.png")

        },

        {

            title: "Liquor",

            icon: "wine-outline",

            image: require("../assets/images/categories/liquor.png")

        }

    ];

    return (

    <SafeAreaView style={styles.container}>

            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >

                <DashboardHeader
                    navigation={navigation}
                    notifications={3}
                />

                <DashboardSearchBar
                    navigation={navigation}
                />

                <View style={styles.sectionHeader}>

                    <Text style={styles.sectionTitle}>

                        Categories

                    </Text>

                </View>

                <View style={styles.categoryRow}>

    {

        categories.map((item, index) => (

            <CategoryCard

                key={index}

                title={item.title}

                image={item.image}

                onPress={() =>

                    navigation.navigate("CategoryProducts", {

                        category: item.title

                    })

                }

            />

        ))

    }

</View>
                                <View style={styles.sectionHeader}>

                    <Text style={styles.sectionTitle}>

                        Today's Deals

                    </Text>

                    <TouchableOpacity>

                        <Text style={styles.seeAll}>

                            See All

                        </Text>

                    </TouchableOpacity>

                </View>

                <ScrollView

                    horizontal

                    showsHorizontalScrollIndicator={false}

                >

                <DealCard

                    product="Captain Mixed Chicken Portions 5kg"

                    store="Pick n Pay"

                    oldPrice="E198"

                    newPrice="E179"

                    save="E19"

                    expiry="Ends in 2 days"

                    image={require("../assets/images/products/portions.png")}

                />

                <DealCard

                    product="Simba Potato Chips Assorted 120g"

                    store="SPAR"

                    oldPrice="E24"

                    newPrice="E17"

                    save="E7"

                    expiry="Ends Today"

                    image={require("../assets/images/products/simba.png")}

                />

                <DealCard

                    product="Umcenge Long Life Milk"

                    store="Pick n Pay"

                    oldPrice="E29"

                    newPrice="E19"

                    save="E10"

                    expiry="Ends in 5 days"

                    image={require("../assets/images/products/milk.png")}

                />

                </ScrollView>

                <View style={styles.sectionHeader}>

                    <Text style={styles.sectionTitle}>

                        Featured Catalogues

                    </Text>

                    <TouchableOpacity>

                        <Text style={styles.seeAll}>

                            See All

                        </Text>

                    </TouchableOpacity>

                </View>

                <ScrollView

                    horizontal

                    showsHorizontalScrollIndicator={false}

                >

                    <CatalogueCard

                        logo={require("../assets/images/stores/shoprite.jpg")}

                        store="Shoprite"

                        validUntil="21-31 Jul"

                        onPress={() => navigation.navigate("Catalogue")}

                    />

                    <CatalogueCard

                        logo={require("../assets/images/stores/pnp.jpg")}

                        store="Pick n Pay"

                        validUntil="28 Jul"

                        onPress={() => navigation.navigate("Catalogue")}

                    />

                    <CatalogueCard

                        logo={require("../assets/images/stores/spar.jpg")}

                        store="SPAR"

                        validUntil="25-30 Jul"

                        onPress={() => navigation.navigate("Catalogue")}

                    />

                    <CatalogueCard

                        logo={require("../assets/images/stores/boxer.png")}

                        store="Boxer"

                        validUntil="29 Jul"

                        onPress={() => navigation.navigate("Catalogue")}

                    />

                    <CatalogueCard

                        logo={require("../assets/images/stores/woolworths.jpg")}

                        store="Woolworths"

                        validUntil="25-27 Jul"

                        onPress={() => navigation.navigate("Catalogue")}

                    />
                    </ScrollView>

                    <View style={{ marginTop: 24 }}>

                        <View style={styles.sectionHeader}>

                            <Text style={styles.sectionTitle}>

                                Price Drops

                            </Text>

                            <TouchableOpacity>

                                <Text style={styles.seeAll}>

                                    See All

                                </Text>

                            </TouchableOpacity>

                        </View>

                        <View style={styles.priceDropGrid}>

                        <PriceDropCard
                            variant="topLeft"
                            product="Oros Squash 2L"
                            store="Boxer"
                            price="Now E37"
                            image={require("../assets/images/products/oros.png")}
                        />

                        <PriceDropCard
                            variant="topRight"
                            product="Malva Pudding 450g"
                            store="Woolworths"
                            price="Now E105"
                            image={require("../assets/images/products/pudding.jpg")}
                        />

                        <PriceDropCard
                            variant="bottomLeft"
                            product="Tastic Rice 5kg"
                            store="SPAR"
                            price="Now E115"
                            image={require("../assets/images/products/rice.jpg")}
                        />

                        <PriceDropCard
                            variant="bottomRight"
                            product="Gordon's London Dry Gin 750ml"
                            store="Shoprite"
                            price="Now E194"
                            image={require("../assets/images/products/gin.png")}
                        />

                    </View>
                    </View>

            </ScrollView>

            <BottomNavigation

                navigation={navigation}

                active="Home"

            />

        </SafeAreaView>

    );

}