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
    Alert
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useShopping } from "../context/ShoppingContext";

import comparisons from "../data/comparisons";

import styles from "../styles/ComparePriceStyles";

export default function ComparePrice({

    route,

    navigation

}) {

    const { product } = route.params;

    const {

        lists,

        addProduct

    } = useShopping();

    const [modalVisible, setModalVisible] = useState(false);

    const comparison = comparisons.find(

        item => item.productId === product.id

    );

    const stores = comparison ? comparison.stores : [];

    const bestDeal = stores.find(

        item => item.bestDeal

    );

    const addToList = (list) => {

        addProduct(

            list.id,

            {

                id: product.id,

                name: product.name,

                category: product.category,

                price: Number(
                    String(product.price).replace(/[^\d]/g, "")
                ),

                image: product.image,

                store: bestDeal?.store || product.store,

                quantity: 1

            }

        );

        setModalVisible(false);

            Alert.alert(
                "Added Successfully",
                `${product.name} was added to "${list.name}".`
            );

            navigation.goBack();

    };

    return (

        <SafeAreaView style={styles.container}>

            <ScrollView

                showsVerticalScrollIndicator={false}

            >

                <TouchableOpacity

                    style={styles.backButton}

                    onPress={() => navigation.goBack()}

                >

                    <Ionicons

                        name="arrow-back"

                        size={26}

                        color="#222"

                    />

                </TouchableOpacity>

                <View style={styles.productSection}>

                    <Image

                        source={product.image}

                        style={styles.productImage}

                    />

                    <Text style={styles.productName}>

                        {product.name}

                    </Text>

                    <Text style={styles.productCategory}>

                        {product.category}

                    </Text>

                </View>

                <View style={styles.bestDealCard}>

                    <Text style={styles.bestDealTitle}>

                        🏆 Best Deal

                    </Text>

                    <Text style={styles.bestStore}>

                        {bestDeal?.store}

                    </Text>

                    <Text style={styles.bestPrice}>

                        E{bestDeal?.price}

                    </Text>

                    <Text style={styles.bestSavings}>

                        Save E{bestDeal?.savings}

                    </Text>

                    <Text style={styles.catalogueEnds}>

                        Catalogue ends {bestDeal?.catalogueEnds}

                    </Text>

                </View>

                <Text style={styles.sectionTitle}>

                    Compare Prices

                </Text>
                                {

                    stores.map((item, index) => (

                        <View

                            key={index}

                            style={[

                                styles.storeCard,

                                item.bestDeal && styles.bestStoreCard

                            ]}

                        >

                            <View>

                                <Text style={styles.storeName}>

                                    {item.store}

                                </Text>

                                <Text style={styles.stock}>

                                    {item.stock}

                                </Text>

                            </View>

                            <View style={styles.priceSection}>

                                <Text style={styles.storePrice}>

                                    E{item.price}

                                </Text>

                                {

                                    item.bestDeal && (

                                        <View style={styles.bestBadge}>

                                            <Text style={styles.bestBadgeText}>

                                                BEST DEAL

                                            </Text>

                                        </View>

                                    )

                                }

                            </View>

                        </View>

                    ))

                }

                {/* Smart Recommendation */}

                <View style={styles.recommendationCard}>

                    <Ionicons

                        name="bulb-outline"

                        size={24}

                        color="#C7D72D"

                    />

                    <View

                        style={{

                            flex:1,

                            marginLeft:12

                        }}

                    >

                        <Text style={styles.recommendationTitle}>

                            BreadCrumb Recommendation

                        </Text>

                        <Text style={styles.recommendationText}>

                            Buy this item from{" "}

                            <Text style={styles.bold}>

                                {bestDeal?.store}

                            </Text>

                            {" "}to save{" "}

                            <Text style={styles.bold}>

                                E{bestDeal?.savings}

                            </Text>

                            . BreadCrumb found the lowest advertised price.

                        </Text>

                    </View>

                </View>

                {/* Action Buttons */}

                <View style={styles.buttonRow}>

                    <TouchableOpacity

                        style={styles.actionButton}

                    >

                        <Ionicons

                            name="heart-outline"

                            size={22}

                            color="#C7D72D"

                        />

                        <Text style={styles.actionText}>

                            Watch

                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity

                        style={styles.actionButton}

                        onPress={() => setModalVisible(true)}

                    >

                        <Ionicons

                            name="cart-outline"

                            size={22}

                            color="#C7D72D"

                        />

                        <Text style={styles.actionText}>

                            Add To List

                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity

                        style={styles.actionButton}

                    >

                        <Ionicons

                            name="share-social-outline"

                            size={22}

                            color="#C7D72D"

                        />

                        <Text style={styles.actionText}>

                            Share

                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity

                        style={styles.actionButton}

                    >

                        <Ionicons

                            name="book-outline"

                            size={22}

                            color="#C7D72D"

                        />

                        <Text style={styles.actionText}>

                            Catalogue

                        </Text>

                    </TouchableOpacity>

                </View>

                {/* Shopping Tip */}

                <View style={styles.tipCard}>

                    <Ionicons

                        name="sparkles"

                        size={22}

                        color="#C7D72D"

                    />

                    <Text style={styles.tipText}>

                        Save this product to a shopping list and BreadCrumb will automatically calculate your basket total, remaining budget and notify you when prices drop.

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

                        backgroundColor: "rgba(0,0,0,0.45)"

                    }}

                >

                    <View

                        style={{

                            backgroundColor: "#FFFFFF",

                            borderTopLeftRadius: 28,

                            borderTopRightRadius: 28,

                            padding: 22,

                            maxHeight: "70%"

                        }}

                    >

                        <View

                            style={{

                                flexDirection: "row",

                                justifyContent: "space-between",

                                alignItems: "center",

                                marginBottom: 20

                            }}

                        >

                            <Text

                                style={{

                                    fontSize: 22,

                                    fontWeight: "700"

                                }}

                            >

                                Choose Shopping List

                            </Text>

                            <TouchableOpacity

                                onPress={() => setModalVisible(false)}

                            >

                                <Ionicons

                                    name="close"

                                    size={28}

                                    color="#444"

                                />

                            </TouchableOpacity>

                        </View>

                        {

                            lists.length === 0 ? (

                                <View

                                    style={{

                                        alignItems: "center",

                                        paddingVertical: 40

                                    }}

                                >

                                    <Ionicons

                                        name="cart-outline"

                                        size={70}

                                        color="#C7D72D"

                                    />

                                    <Text

                                        style={{

                                            fontSize: 20,

                                            fontWeight: "700",

                                            marginTop: 15

                                        }}

                                    >

                                        No Shopping Lists

                                    </Text>

                                    <Text

                                        style={{

                                            color: "#777",

                                            textAlign: "center",

                                            marginTop: 10,

                                            lineHeight: 22

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

                                            paddingVertical: 14

                                        }}

                                        onPress={() => {

                                            setModalVisible(false);

                                            navigation.navigate("ShoppingLists");

                                        }}

                                    >

                                        <Text

                                            style={{

                                                color: "#FFFFFF",

                                                fontWeight: "700"

                                            }}

                                        >

                                            Create Shopping List

                                        </Text>

                                    </TouchableOpacity>

                                </View>

                            ) : (

                                <FlatList

                                    data={lists}

                                    keyExtractor={(item) => item.id.toString()}

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

                                                borderColor: "#ECECEC"

                                            }}

                                        >

                                            <Text

                                                style={{

                                                    fontSize: 18,

                                                    fontWeight: "700",

                                                    color: "#222"

                                                }}

                                            >

                                                {item.name}

                                            </Text>

                                            <Text

                                                style={{

                                                    color: "#777",

                                                    marginTop: 6

                                                }}

                                            >

                                                Budget: E{item.budget || 0}

                                            </Text>

                                            <Text

                                                style={{

                                                    color: "#777",

                                                    marginTop: 2

                                                }}

                                            >

                                                {item.items.length} item(s)

                                            </Text>

                                        </TouchableOpacity>

                                    )}

                                />

                            )

                        }

                    </View>

                </View>

            </Modal>

        </SafeAreaView>

    );

}