import React, { useMemo, useState, useEffect } from "react";
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
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

export default function SmartBasketScreen({ route, navigation }) {
    const { listId } = route.params;
    const { lists, applySmartBasket } = useShopping();
    const [step, setStep] = useState(1);
    const [selectedStrategy, setSelectedStrategy] = useState("singleStore");
    const [comparison, setComparison] = useState(null);
    const [loadingComparison, setLoadingComparison] = useState(false);
    const [estimatedTotal, setEstimatedTotal] = useState(0);
    const { colors, getFontSize } = useTheme();
    const oneStore = comparison?.oneStore;
    const maximumSavings = comparison?.maximumSavings;
    const recommended = comparison?.recommended;
    const list = lists.find(
        item =>
            String(item._id || item.id) ===
            String(listId)
    );
    const category = useMemo(() => {
        if (!list) return "groceries";
        return (list.category || "groceries").toLowerCase();
    }, [list]);

    const suggestions = categorySuggestions[category];
    const [products, setProducts] = useState(() =>
        (suggestions || []).map(product => ({
            ...product,
            selected: true
        }))
    );

    useEffect(() => {

    setProducts(
        (suggestions || []).map(product => ({
            ...product,
            selected: true
        }))

    );

}, [suggestions]);

    useEffect(() => {

        loadEstimate();

    }, [products]);

        const selectedProducts = products.filter(
            item => item.selected
        );

        const selectedCount = selectedProducts.length;

        const loadComparison = async () => {

            try {

                setLoadingComparison(true);

                const response = await axios.post(

                    "http://10.0.50.118:5000/api/prices/compare-basket",

                    {
                        products: selectedProducts,
                        budget: list.budget
                    }

                );

                setComparison(response.data);

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoadingComparison(false);

            }

        };

        const loadEstimate = async () => {

            try {

                const response = await axios.post(

                    "http://10.0.50.118:5000/api/prices/estimate-basket",

                    {
                        products: products.filter(item => item.selected)
                    }

                );

                setEstimatedTotal(response.data.estimatedTotal);

            }

            catch (error) {

                console.log(error);

            }

        };

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
                <Text
                    style={{
                        color: colors.text,
                        fontSize: getFontSize(18)
                    }}
                >
                    List not found.
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.background
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
                                color={colors.text}
                            />
                        </TouchableOpacity>

                        <View
                            style={{
                                marginHorizontal: 20,
                                marginTop: 20,
                                backgroundColor: colors.card,
                                borderRadius: 25,
                                padding: 25,
                                elevation: 3
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 26,
                                    fontWeight: "700",
                                    color: colors.text
                                }}
                            >
                                ✨ Smart Basket Optimizer
                            </Text>
                            <Text
                                style={{
                                    marginTop: 12,
                                    color: colors.secondary,
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
                                    backgroundColor: colors.card,
                                    borderRadius: 20,
                                    padding: 20,
                                    marginRight: 10
                                }}
                            >
                                <Text
                                    style={{
                                        color: colors.secondary
                                    }}
                                >Category</Text>
                                <Text
                                    style={{
                                        fontWeight:"700",
                                        fontSize:getFontSize(18),
                                        marginTop:8,
                                        color: colors.text
                                    }}
                                >
                                    {list.category}
                                </Text>
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: colors.card,
                                    borderRadius: 20,
                                    padding: 20
                                }}
                            >
                                <Text style={{ color: colors.secondary }}>Budget</Text>
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
                                backgroundColor: colors.card,
                                borderRadius: 25,
                                padding: 20
                            }}
                        >
                            <Text
                                style={{
                                    fontSize:getFontSize(20),
                                    fontWeight:"700",
                                    color: colors.text
                                }}
                            >
                                Suggested Products
                            </Text>
                            <Text
                                style={{
                                    color: colors.secondary,
                                    marginTop: 8,
                                    marginBottom: 20
                                }}
                            >
                                Tick or untick products before generating your smart basket.
                            </Text>

                            {products.map(item => (
                                <TouchableOpacity
                                    key={item._id || item.id}
                                    onPress={() => toggleProduct(item.id)}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingVertical: 15,
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.border
                                    }}
                                >
                                    <Ionicons
                                        name={item.selected ? "checkbox" : "square-outline"}
                                        size={24}
                                        color="#22A45D"
                                    />
                                    <Text
                                        style={{
                                            marginLeft:15,
                                            flex:1,
                                            fontSize:getFontSize(16),
                                            color: colors.text
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
                                backgroundColor: colors.card,
                                borderRadius: 20,
                                padding: 20
                            }}
                        >
                            <Text style={{ color: colors.secondary }}>
                                Today's Lowest Basket Cost
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
                            onPress={async () => {
                                await loadComparison();
                                setStep(2);
                            }}
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

                {step === 2 && comparison && (
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
                                color={colors.text}
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
                                    color: colors.text
                                }}
                            >
                                Compare Shopping Strategies
                            </Text>

                            <Text
                                style={{
                                    color: colors.secondary,
                                    marginTop: 8,
                                    lineHeight: 22
                                }}
                            >
                                Choose the shopping strategy that works best for you.
                            </Text>
                        </View>

                        {/* Maximum Savings */}
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setSelectedStrategy("maximum")}
                            style={{
                                marginHorizontal: 20,
                                marginTop: 25,
                                backgroundColor: colors.card,
                                borderRadius: 22,
                                padding: 22,
                                borderWidth:
                                    selectedStrategy === "maximum" ? 2 : 1,
                                borderColor:
                                    selectedStrategy === "maximum"
                                        ? "#22A45D"
                                        : "#E5E5E5"
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 22,
                                    fontWeight: "700",
                                    color: "#22A45D"
                                }}
                            >
                                Maximum Savings
                            </Text>

                            <Text
                                style={{
                                    marginTop: 12,
                                    color: colors.secondary,
                                    lineHeight: 22
                                }}
                            >
                                Buy each product from the cheapest store.
                            </Text>

                            {(maximumSavings?.groupedStores ?? []).map(store => (

                                <View
                                    key={store.store}
                                    style={{
                                        marginTop:20,
                                        backgroundColor:colors.background,
                                        borderRadius:16,
                                        padding:15
                                    }}
                                >

                                    <Text
                                        style={{
                                            fontWeight:"700",
                                            color:"#22A45D",
                                            fontSize:17
                                        }}
                                    >
                                        {store.store}
                                    </Text>

                                    {store.items.map(item => (

                                        <View
                                            key={item.product}
                                            style={{
                                                flexDirection:"row",
                                                justifyContent:"space-between",
                                                marginTop:8
                                            }}
                                        >

                                            <Text
                                                style={{
                                                    color: colors.text,
                                                    fontSize: getFontSize(16)
                                                }}
                                            >
                                                • {item.product}
                                            </Text>

                                            <Text
                                                style={{
                                                    color: colors.text,
                                                    fontSize: getFontSize(16)
                                                }}
                                            >
                                                E{item.price}
                                            </Text>

                                        </View>

                                    ))}

                                </View>

                            ))}

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

                                    <Text
                                        style={{
                                            color: colors.secondary
                                        }}
                                    >
                                        Estimated Total
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize:getFontSize(20),
                                            fontWeight:"700",
                                            color: colors.text
                                        }}
                                    >
                                        E{maximumSavings?.total ?? 0}
                                    </Text>

                                </View>

                                <View
                                    style={{
                                        alignItems:"flex-end"
                                    }}
                                >

                                    <Text
                                        style={{
                                            color: colors.secondary
                                        }}
                                    >
                                        Budget Remaining
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize:getFontSize(20),
                                            fontWeight:"700",
                                            color: colors.text
                                        }}
                                    >
                                        E{maximumSavings?.budgetRemaining ?? 0}
                                    </Text>

                                </View>

                            </View>

                        </TouchableOpacity>

                        {/* Best One-Store Basket */}

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setSelectedStrategy("singleStore")}
                            style={{
                                marginHorizontal:20,
                                marginTop:20,
                                backgroundColor: colors.card,
                                borderRadius:22,
                                padding:22,
                                borderWidth:selectedStrategy==="singleStore" ? 2 : 1,
                                borderColor:selectedStrategy==="singleStore"
                                    ? "#22A45D"
                                    : "#E5E5E5"
                            }}
                        >

                            <Text
                                style={{
                                    fontSize:22,
                                    fontWeight:"700",
                                    color:"#22A45D"
                                }}
                            >
                                Best One-Store Basket
                            </Text>

                            <Text
                                style={{
                                    marginTop:10,
                                    color: colors.secondary,
                                    lineHeight:22
                                }}
                            >
                                Buy everything from one supermarket.
                            </Text>

                            <View
                                style={{
                                    marginTop:20,
                                    backgroundColor:colors.background,
                                    borderRadius:18,
                                    padding:16
                                }}
                            >

                                <Text
                                    style={{
                                        color: colors.secondary
                                    }}
                                >
                                    Selected Store
                                </Text>

                                <Text
                                    style={{
                                        fontSize:24,
                                        fontWeight:"700",
                                        color:"#22A45D",
                                        marginTop:5
                                    }}
                                >
                                    {oneStore?.selectedStore ?? "Not Available"}
                                </Text>

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

                                    <Text
                                        style={{
                                            color: colors.secondary
                                        }}
                                    >
                                        Total
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize:getFontSize(20),
                                            fontWeight:"700",
                                            color: colors.text
                                        }}
                                    >
                                        E{oneStore?.total ?? 0}
                                    </Text>

                                </View>

                                <View
                                    style={{
                                        alignItems:"flex-end"
                                    }}
                                >

                                    <Text
                                        style={{
                                            color: colors.secondary
                                        }}
                                    >
                                        Budget Remaining
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize:getFontSize(20),
                                            fontWeight:"700",
                                            color: colors.text
                                        }}
                                    >
                                        E{oneStore?.budgetRemaining ?? 0}
                                    </Text>

                                </View>

                            </View>

                        <Text
                            style={{
                                marginTop: 20,
                                marginBottom: 10,
                                fontSize: 18,
                                fontWeight: "700",
                                color: colors.text
                            }}
                        >
                            Other Store Totals
                        </Text>

                        {oneStore?.rankings?.map((store, index) => (

                            <View
                                key={store.store}
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingVertical: 6,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#E5E5E5"
                                }}
                            >

                                <Text
                                    style={{
                                        color: colors.text,
                                        fontSize: getFontSize(16)
                                    }}
                                >
                                    {index + 1}. {store.store}
                                </Text>

                                <Text
                                    style={{
                                        color: colors.text,
                                        fontSize: getFontSize(16)
                                    }}
                                >
                                    E{store.total}
                                </Text>

                            </View>

                        ))}

                        </TouchableOpacity>

                        {/* BreadCrumb Recommendation */}

                        <View
                            style={{
                                marginHorizontal:20,
                                marginTop:20,
                                marginBottom:20,
                                backgroundColor:colors.card,
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
                                        color: colors.text
                                    }}
                                >
                                    BreadCrumb Recommendation
                                </Text>

                            </View>

                            <Text
                                style={{
                                    marginTop:18,
                                    color:colors.secondary,
                                    lineHeight:24,
                                    fontSize:15
                                }}
                            >

                                {
                                    oneStore
                                        ? (
                                            oneStore.budgetRemaining >= (maximumSavings?.budgetRemaining ?? 0)

                                                ? `We recommend the Best One-Store Basket. You'll spend E${oneStore.total} at ${oneStore.selectedStore} and still have E${oneStore.budgetRemaining} remaining from your budget.`

                                                : `We recommend the Maximum Savings strategy. You'll spend E${maximumSavings?.total ?? 0} and still have E${maximumSavings?.budgetRemaining ?? 0} remaining from your budget.`
                                        )

                                        : `No single supermarket currently stocks every selected product. We recommend the Maximum Savings strategy instead.`
                                }

                            </Text>

                        </View>

                        {/* Apply Button */}

                        <TouchableOpacity

                            onPress={() => {

                                applySmartBasket(

                                    list._id,

                                    selectedProducts,

                                    selectedStrategy

                                );

                                navigation.goBack();

                            }}

                            style={{

                                marginHorizontal:20,

                                marginBottom:40,

                                backgroundColor:"#C7D72D",

                                borderRadius:18,

                                paddingVertical:18,

                                alignItems:"center"

                            }}

                        >

                            <Text

                                style={{

                                    color:"#FFF",

                                    fontSize:18,

                                    fontWeight:"700"

                                }}

                            >

                                Apply Smart Basket

                            </Text>

                        </TouchableOpacity>

                        </>
                        )}

            </ScrollView>
        </SafeAreaView>
    );
}