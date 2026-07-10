import React, { useMemo, useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useShopping } from "../context/ShoppingContext";
import { categorySuggestions } from "../helpers/categorySuggestions";
import { compareBasket } from "../helpers/compareBasket";

export default function SmartBasketScreen({ route, navigation }) {
    const { listId } = route.params;
    const { lists, applySmartBasket } = useShopping();

    const [step, setStep] = useState(1);

    const list = lists.find(item => item.id === listId);

    const category = useMemo(() => {
        if (!list || !list.name) return "groceries";
        const name = list.name.toLowerCase();
        if (name.includes("toile")) return "toiletries";
        if (name.includes("grocer")) return "groceries";
        if (name.includes("braai")) return "braai";
        if (name.includes("clean")) return "cleaning";
        return "groceries";
    }, [list]);

    const [products, setProducts] = useState(() => {
        const suggestions = categorySuggestions[category] || [];
        return suggestions.map(product => ({
            ...product,
            selected: true
        }));
    });

    const estimatedTotal = products
        .filter(item => item.selected)
        .reduce((sum, item) => sum + item.estimatedPrice, 0);

        const selectedProducts = products.filter(
            item => item.selected
        );

        const comparison = compareBasket(
            selectedProducts
        );

        const {

            oneStore,

            maximumSavings,

            recommended

        } = comparison;

        const selectedCount = selectedProducts.length;

    const toggleProduct = id => {
        setProducts(current =>
            current.map(item =>
                item.id === id
                    ? { ...item, selected: !item.selected }
                    : item
            )
        );
    };


    if (!list) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>List not found.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#F6F7FB"
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                
                {step === 1 && (
                    <>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                marginTop: 20,
                                marginLeft: 20
                            }}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={26}
                                color="#222"
                            />
                        </TouchableOpacity>

                        <View
                            style={{
                                marginHorizontal: 20,
                                marginTop: 20,
                                backgroundColor: "#FFFFFF",
                                borderRadius: 25,
                                padding: 25,
                                elevation: 3
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 26,
                                    fontWeight: "700",
                                    color: "#222"
                                }}
                            >
                                ✨ Smart Basket Optimizer
                            </Text>
                            <Text
                                style={{
                                    marginTop: 12,
                                    color: "#666",
                                    lineHeight: 22
                                }}
                            >
                                We've prepared a suggested shopping basket based on your shopping list.
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                marginHorizontal: 20,
                                marginTop: 20,
                                justifyContent: "space-between"
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: "#FFFFFF",
                                    borderRadius: 20,
                                    padding: 20,
                                    marginRight: 10
                                }}
                            >
                                <Text style={{ color: "#888" }}>Category</Text>
                                <Text
                                    style={{
                                        fontWeight: "700",
                                        fontSize: 18,
                                        marginTop: 8
                                    }}
                                >
                                    {list.name}
                                </Text>
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: "#FFFFFF",
                                    borderRadius: 20,
                                    padding: 20
                                }}
                            >
                                <Text style={{ color: "#888" }}>Budget</Text>
                                <Text
                                    style={{
                                        fontWeight: "700",
                                        fontSize: 18,
                                        marginTop: 8,
                                        color: "#22A45D"
                                    }}
                                >
                                    E{list.budget}
                                </Text>
                            </View>
                        </View>

                        {/* Suggested Products */}
                        <View
                            style={{
                                marginHorizontal: 20,
                                marginTop: 25,
                                backgroundColor: "#FFFFFF",
                                borderRadius: 25,
                                padding: 20
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "700"
                                }}
                            >
                                Suggested Products
                            </Text>
                            <Text
                                style={{
                                    color: "#777",
                                    marginTop: 8,
                                    marginBottom: 20
                                }}
                            >
                                Tick or untick products before generating your smart basket.
                            </Text>

                            {products.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => toggleProduct(item.id)}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingVertical: 15,
                                        borderBottomWidth: 1,
                                        borderBottomColor: "#EFEFEF"
                                    }}
                                >
                                    <Ionicons
                                        name={item.selected ? "checkbox" : "square-outline"}
                                        size={24}
                                        color="#22A45D"
                                    />
                                    <Text
                                        style={{
                                            marginLeft: 15,
                                            flex: 1,
                                            fontSize: 16
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: "700",
                                            color: "#22A45D"
                                        }}
                                    >
                                        E{item.estimatedPrice}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                marginTop: 20,
                                backgroundColor: "#FFFFFF",
                                borderRadius: 20,
                                padding: 20
                            }}
                        >
                            <Text style={{ color: "#777" }}>
                                Estimated Basket Total
                            </Text>
                            <Text
                                style={{
                                    marginTop: 8,
                                    fontSize: 32,
                                    fontWeight: "700",
                                    color: "#22A45D"
                                }}
                            >
                                E{estimatedTotal}
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => setStep(2)}
                            style={{
                                marginHorizontal: 20,
                                marginTop: 30,
                                marginBottom: 40,
                                backgroundColor: "#C7D72D",
                                borderRadius: 20,
                                paddingVertical: 18,
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "700",
                                    fontSize: 18,
                                    color: "#FFF"
                                }}
                            >
                                Continue →
                            </Text>
                        </TouchableOpacity>
                    </>
                )}

                {step === 2 && (
                    <>
                        <TouchableOpacity
                            onPress={() => setStep(1)}
                            style={{
                                marginTop: 20,
                                marginLeft: 20
                            }}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={26}
                                color="#222"
                            />
                        </TouchableOpacity>

                        <View
                            style={{
                                marginHorizontal: 20,
                                marginTop: 20
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 28,
                                    fontWeight: "700",
                                    color: "#222"
                                }}
                            >
                                Compare Shopping Strategies
                            </Text>

                            <Text
                                style={{
                                    color: "#777",
                                    marginTop: 8,
                                    lineHeight: 22
                                }}
                            >
                                Choose the shopping strategy that works best for you.
                            </Text>
                        </View>

                        {/* Maximum Savings Card */}
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{
                                marginHorizontal: 20,
                                marginTop: 25,
                                backgroundColor: "#FFFFFF",
                                borderRadius: 22,
                                padding: 22,
                                borderWidth: 2,
                                borderColor: "#22A45D",
                                elevation: 2
                            }}
                            onPress={() => {
                                applySmartBasket(
                                    list.id,
                                    products.filter(item => item.selected),
                                    "maximum"
                                );
                                navigation.goBack();
                            }}
                            >
                            <Text
                                style={{
                                    fontSize: 22,
                                    fontWeight: "700",
                                    color: "#22A45D"
                                }}
                            >
                                💰 Maximum Savings
                            </Text>

                            <Text style={{ marginTop: 15, color: "#666", lineHeight: 20 }}>
                                We found the cheapest supermarket for every selected product.
                                This option helps you maximise your savings, although you may need to visit multiple stores.
                            </Text>

                            <View style={{ marginTop: 20 }}>

                                {

                                    maximumSavings.groupedStores.map(store => (

                                        <View

                                            key={store.store}

                                            style={{

                                                marginBottom:15,

                                                backgroundColor:"#F9F9F9",

                                                borderRadius:16,

                                                padding:15

                                            }}

                                        >

                                            <Text

                                                style={{

                                                    fontWeight:"700",

                                                    fontSize:17,

                                                    color:"#22A45D"

                                                }}

                                            >

                                                🏪 {store.store}

                                            </Text>

                                            {

                                                store.items.map(item => (

                                                    <View

                                                        key={item.id}

                                                        style={{

                                                            flexDirection:"row",

                                                            justifyContent:"space-between",

                                                            marginTop:8

                                                        }}

                                                    >

                                                        <Text>

                                                            • {item.name}

                                                        </Text>

                                                        <Text>

                                                            E{item.price}

                                                        </Text>

                                                    </View>

                                                ))

                                            }

                                        </View>

                                    ))

                                }

                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 10,
                                    borderTopWidth: 1,
                                    borderTopColor: "#EEE",
                                    paddingTop: 15
                                }}
                            >
                                <View>
                                    <Text style={{ color: "#777" }}>Est. Total</Text>
                                    <Text style={{ fontWeight: "700", fontSize: 18 }}>
                                        E{maximumSavings.total}
                                    </Text>
                                </View>
                                <View style={{ alignItems: "flex-end" }}>
                                    <Text style={{ color: "#777" }}>You Save</Text>
                                    <Text style={{ fontWeight: "700", fontSize: 18, color: "#22A45D" }}>
                                        E{maximumSavings.savings}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Best One-Store Basket */}
                        <TouchableOpacity

                            activeOpacity={0.9}

                            style={{

                                marginHorizontal:20,

                                marginTop:20,

                                marginBottom:30,

                                backgroundColor:"#FFFFFF",

                                borderRadius:22,

                                padding:22,

                                elevation:2

                            }}

                            onPress={() => {

                                applySmartBasket(

                                    list.id,

                                    selectedProducts,

                                    "singleStore"

                                );

                                navigation.goBack();

                            }}

                        >
                        <Text

                            style={{

                                fontSize:22,

                                fontWeight:"700",

                                color:"#1565C0"

                            }}

                            >

                            🏪 Best One-Store Basket

                        </Text>

                        <Text

                            style={{

                                color:"#666",

                                marginTop:10,

                                lineHeight:22

                            }}

                            >

                            BreadCrumb analysed your selected products and found the cheapest supermarket where you can buy everything in one trip.

                        </Text>
                    <View

                            style={{

                                marginTop:20,

                                backgroundColor:"#E8F2FF",

                                borderRadius:18,

                                padding:16

                            }}

                        >

                        <Text

                            style={{

                                color:"#666"

                            }}

                        >

                        Selected Store

                        </Text>

                        <Text

                            style={{

                                fontSize:24,

                                fontWeight:"700",

                                color:"#1565C0",

                                marginTop:5

                            }}

                        >

                        🏆 {oneStore.selectedStore}

                        </Text>

                    </View>
                    <View

                        style={{

                            marginTop:20,

                            borderRadius:18,

                            backgroundColor:"#F9F9F9",

                            padding:15

                        }}

                        >

                    <View

                        style={{

                            flexDirection:"row",

                            justifyContent:"space-between",

                            marginBottom:12

                        }}

                    >

                    <Text

                        style={{

                            fontWeight:"700"

                        }}

                    >

                    Store

                    </Text>

                    <Text

                        style={{

                            fontWeight:"700"

                        }}

                    >

                    Total

                    </Text>

                    </View>

                    {

                        oneStore.rankings.map(store => (

                            <View

                                key={store.name}

                                style={{

                                    flexDirection:"row",

                                    justifyContent:"space-between",

                                    paddingVertical:8

                                }}

                            >

                                <Text>

                                    {

                                        store.name === oneStore.selectedStore

                                            ? "🏆 " + store.name

                                            : store.name

                                    }

                                </Text>

                                <Text>

                                    E{store.total}

                                </Text>

                            </View>

                        ))

                    }

                    </View>
                <View

                        style={{

                            marginTop:20

                        }}

                    >

                    <Text

                        style={{

                            fontWeight:"700",

                            marginBottom:10

                        }}

                    >

                    Products Included

                    </Text>

                    {

                        oneStore.products.map(item => (

                            <View

                                key={item.id}

                                style={{

                                    flexDirection:"row",

                                    justifyContent:"space-between",

                                    marginBottom:8

                                }}

                            >

                                <Text>

                                    • {item.name}

                                </Text>

                                <Text>

                                    E{item.price}

                                </Text>

                            </View>

                        ))

                    }

                </View>
                <View

                    style={{

                        flexDirection:"row",

                        justifyContent:"space-between",

                        marginTop:20,

                        borderTopWidth:1,

                        borderTopColor:"#EEE",

                        paddingTop:15

                    }}

                >

                <View>

                <Text>Total</Text>

                <Text

                    style={{

                        fontWeight:"700",

                        fontSize:20

                    }}

                >

                E{oneStore.total}

                </Text>

                </View>

                <View

                    style={{

                        alignItems:"flex-end"

                    }}

                >

                <Text>You Save</Text>

                <Text

                    style={{

                        fontWeight:"700",

                        fontSize:20,

                        color:"#22A45D"

                    }}

                >

                E{oneStore.savings}

                </Text>

                </View>

                </View>

                </TouchableOpacity>

                    </>
                )}
                <View
                    style={{
                        marginHorizontal:20,
                        marginBottom:40,
                        backgroundColor:"#FFF9E8",
                        borderRadius:22,
                        padding:20,
                        borderLeftWidth:6,
                        borderLeftColor:"#F4B400"
                    }}
                >

                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center"
                        }}
                    >

                        <Ionicons
                            name="sparkles"
                            size={20}
                            color="#F4B400"
                        />

                        <Text
                            style={{
                                marginLeft:10,
                                fontSize:19,
                                fontWeight:"700",
                                color:"#222"
                            }}
                        >
                            BreadCrumb Recommendation
                        </Text>

                    </View>

                    <Text
                        style={{
                            marginTop:18,
                            color:"#555",
                            lineHeight:24,
                            fontSize:15
                        }}
                    >

                        {

                            oneStore.savings >= maximumSavings.savings - 15

                            ?

                            `We recommend the Best One-Store Basket. You'll save E${oneStore.savings} while only visiting ${oneStore.selectedStore}. The extra savings from travelling to multiple stores are relatively small, making this the most convenient option.`

                            :

                            `We recommend the Maximum Savings strategy. You'll save E${maximumSavings.savings}, which is significantly more than shopping at one supermarket. If your priority is saving money, visiting multiple stores is worthwhile.`

                        }

                    </Text>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
}