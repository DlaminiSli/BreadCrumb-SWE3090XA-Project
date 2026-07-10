import React, { useState, useCallback } from "react";

import {

    SafeAreaView,

    View,

    Text,

    ScrollView,

    TouchableOpacity,

    RefreshControl

} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useShopping } from "../context/ShoppingContext";

import BottomNavigation from "../components/BottomNavigation";

import styles from "../styles/ShoppingListDetailsStyles";

import ArchivedShoppingView from "../components/ArchivedShoppingView";

import ActiveShoppingView from "../components/ActiveShoppingView";

export default function ShoppingListDetails({

    route,

    navigation

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

    removeProduct

} = useShopping();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {

        setRefreshing(true);

        setTimeout(() => {

            setRefreshing(false);

        }, 800);

    }, []);


    const list = lists.find(

    item => item.id === listId

);

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

            <SafeAreaView style={styles.container}>

                <View

                    style={{

                        flex:1,

                        justifyContent:"center",

                        alignItems:"center"

                    }}

                >

                    <Ionicons

                        name="alert-circle"

                        size={70}

                        color="#C7D72D"

                    />

                    <Text

                        style={{

                            marginTop:20,

                            fontSize:20,

                            fontWeight:"700"

                        }}

                    >

                        Shopping List Not Found

                    </Text>

                </View>

                <BottomNavigation

                    navigation={navigation}

                    active="Lists"

                />

            </SafeAreaView>

        );

    }

    const total = getTotal(list);

    const remaining = getRemaining(list);

    const progress = getProgress(list);

    const purchasedItems = list.items.filter(

        item => item.purchased

    ).length;

    const shoppingProgress =

        list.items.length === 0

        ? 0

        : (purchasedItems / list.items.length) * 100;

    const totalItems = list.items.length;
    const budgetSavings = Number(list.budget) - total;

    const isOverBudget = budgetSavings < 0;

const shoppingCompleted =

    totalItems > 0 &&

    purchasedItems === totalItems;

    let progressColor = "#22A45D";

    if (progress >= 70) {

        progressColor = "#F9A825";

    }

    if (progress >= 100) {

        progressColor = "#D32F2F";

    }

    return (

        <SafeAreaView style={styles.container}>

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

                    <Ionicons

                        name="arrow-back"

                        size={25}

                        color="#222"

                    />

                </TouchableOpacity>

                <View style={styles.headerCard}>

                    <Text style={styles.listName}>

                        {list.name}

                    </Text>

                    <Text style={styles.shoppingDate}>

                        Shopping Date

                    </Text>

                    <Text style={styles.shoppingDateValue}>

                        {list.shoppingDate || "Not Selected"}

                    </Text>

                </View>

                <View style={styles.summaryRow}>

                    <View style={styles.summaryCard}>

                        <Text style={styles.summaryTitle}>

                            Budget

                        </Text>

                        <Text style={styles.summaryValue}>

                            E{list.budget}

                        </Text>

                    </View>

                    <View style={styles.summaryCard}>

                        <Text style={styles.summaryTitle}>

                            Spent

                        </Text>

                        <Text style={styles.summaryValue}>

                            E{total}

                        </Text>

                    </View>

                    <View style={styles.summaryCard}>

                        <Text style={styles.summaryTitle}>

                            {

                                isOverBudget

                                    ? "Over Budget"

                                    : "Remaining"

                            }

                        </Text>

                        <Text

                            style={[

                                styles.remainingBudget,

                                {

                                    color:

                                        isOverBudget

                                            ? "#D32F2F"

                                            : "#22A45D"

                                }

                            ]}

                        >

                            E{Math.abs(budgetSavings)}

                        </Text>

                    </View>

                </View>

                <View style={styles.progressCard}>

                <View style={styles.progressHeader}>

                    <Text style={styles.progressTitle}>

                        Shopping Progress

                    </Text>

                    <Text style={styles.progressPercent}>

                        {Math.round(shoppingProgress)}%

                    </Text>

                </View>

                <View style={styles.progressBackground}>

                    <View

                        style={[

                            styles.progressFill,

                            {

                                width: `${shoppingProgress}%`

                            }

                        ]}

                    />

                </View>

                <Text style={styles.progressText}>

                    {purchasedItems} of {totalItems} item(s) purchased

                </Text>

            </View>

    {

isArchived ? (

<View
    style={styles.completeCard}
>

    <Ionicons

        name="checkmark-circle"

        size={70}

        color="#22A45D"

    />

    <Text
        style={styles.completeTitle}
    >

        Shopping Completed

    </Text>

    <Text
        style={styles.completeSubtitle}
    >

        Completed on

    </Text>

    <Text
        style={styles.completeDate}
    >

        {list.archivedDate}

    </Text>

</View>

)

:

shoppingCompleted && (

    <View

        style={{

        marginHorizontal:20,

        marginTop:20,

        backgroundColor:"#FFFFFF",

        borderRadius:24,

        padding:25,

        alignItems:"center",

        elevation:3

    }}

>

    <Ionicons

        name="checkmark-circle"

        size={75}

        color="#22A45D"

    />

    <Text

        style={{

            fontSize:24,

            fontWeight:"700",

            marginTop:15,

            color:"#222"

        }}

    >

        Shopping Complete!

    </Text>

    <Text

        style={{

            color:"#666",

            textAlign:"center",

            marginTop:10,

            lineHeight:24

        }}

    >

        Congratulations!

        You have purchased every item on your shopping list.

    </Text>

    <View

        style={{

            marginTop:25,

            width:"100%"

        }}

    >

        <View

            style={{

                flexDirection:"row",

                justifyContent:"space-between",

                marginBottom:15

            }}

        >

            <Text>

                Total Spent

            </Text>

            <Text

                style={{

                    fontWeight:"700"

                }}

            >

                E{total}

            </Text>

        </View>

        <View

            style={{

                flexDirection:"row",

                justifyContent:"space-between"

            }}

        >

        <Text>

            {

                budgetSavings >= 0

                    ? "Budget Savings"

                    : "Over Budget"

            }

        </Text>

        <Text

            style={{

                fontWeight:"700",

                color:

                    budgetSavings >= 0

                        ? "#22A45D"

                        : "#D32F2F"

            }}

        >

            E{Math.abs(budgetSavings)}

        </Text>

        </View>

        <TouchableOpacity

    style={{

        marginTop:30,

        backgroundColor:"#22A45D",

        borderRadius:18,

        paddingVertical:16,

        alignItems:"center"

    }}

    onPress={() => {

        archiveList(list.id);

        navigation.goBack();

    }}

>

    <Ionicons

        name="archive"

        size={22}

        color="#FFF"

    />

    <Text

        style={{

            color:"#FFF",

            fontWeight:"700",

            fontSize:16,

            marginTop:6

        }}

    >

        Archive Shopping List

    </Text>

</TouchableOpacity>

    </View>

</View>

)

}

                                {/* Shopping Basket */}

                <View style={styles.basketCard}>

                    <View style={styles.sectionHeader}>

                        <Text style={styles.sectionTitle}>

                            Shopping Basket

                        </Text>

                        <Text style={styles.viewAll}>

                            {list.items.length} Item(s)

                        </Text>

                    </View>

                    {

                        list.items.length === 0 ? (

                            <>

                                <Ionicons

                                    name="basket-outline"

                                    size={70}

                                    color="#C7D72D"

                                />

                                <Text style={styles.emptyTitle}>

                                    Your basket is waiting

                                </Text>

                                <Text style={styles.emptySubtitle}>

                                    Browse products and tap
                                    "Add To List" from the Compare
                                    screen to begin shopping.

                                </Text>

                                <TouchableOpacity

                                    style={styles.primaryButton}

                                    onPress={() =>

                                        navigation.navigate("Search")

                                    }

                                >

                                    <Ionicons

                                        name="search"

                                        size={20}

                                        color="#FFFFFF"

                                    />

                                    <Text style={styles.primaryButtonText}>

                                        Browse Products

                                    </Text>

                                </TouchableOpacity>

                            </>

                        ) :

                            list.items.map((item) => (

                                <View

                                    key={item.id}

                                    style={{

                                        flexDirection:"row",

                                        alignItems:"center",

                                        backgroundColor:"#FFFFFF",

                                        borderRadius:18,

                                        padding:15,

                                        marginBottom:15,

                                        elevation:2

                                    }}

                                >

                                    <TouchableOpacity

                                        onPress={() =>

                                            togglePurchased(

                                                list.id,

                                                item.id

                                            )

                                        }

                                    >

                                        <Ionicons

                                            name={

                                                item.purchased

                                                    ? "checkbox"

                                                    : "square-outline"

                                            }

                                            size={26}

                                            color={

                                                item.purchased

                                                    ? "#22A45D"

                                                    : "#BDBDBD"

                                            }

                                        />

                                    </TouchableOpacity>

                                    <View

                                        style={{

                                            width:55,

                                            height:55,

                                            marginLeft:15,

                                            borderRadius:15,

                                            backgroundColor:"#F4F4F4",

                                            justifyContent:"center",

                                            alignItems:"center"

                                        }}

                                    >

                                        <Ionicons

                                            name="cube-outline"

                                            size={28}

                                            color="#C7D72D"

                                        />

                                    </View>

                                    <View

                                        style={{

                                            flex:1,

                                            marginLeft:15

                                        }}

                                    >

                                        <Text

                                            style={{

                                                fontWeight:"700",

                                                fontSize:16,

                                                color:

                                                    item.purchased

                                                        ? "#999"

                                                        : "#222",

                                                textDecorationLine:

                                                    item.purchased

                                                        ? "line-through"

                                                        : "none"

                                            }}

                                        >

                                            {item.name}

                                        </Text>

                                        <Text

                                            style={{

                                                color:"#777",

                                                marginTop:4

                                            }}

                                        >

                                            {item.store}

                                        </Text>

                                        <Text

                                            style={{

                                                marginTop:4,

                                                color:"#22A45D",

                                                fontWeight:"700"

                                            }}

                                        >

                                            E{item.price}

                                        </Text>

                                    </View>

                                    <View

                                        style={{

                                            alignItems:"center"

                                        }}

                                    >

                                        <View

                                            style={{

                                                flexDirection:"row",

                                                alignItems:"center"

                                            }}

                                        >

                                            <TouchableOpacity

                                                onPress={() =>

                                                    decreaseQuantity(

                                                        list.id,

                                                        item.id

                                                    )

                                                }

                                            >

                                                <Ionicons

                                                    name="remove-circle"

                                                    size={28}

                                                    color="#C7D72D"

                                                />

                                            </TouchableOpacity>

                                            <Text

                                                style={{

                                                    marginHorizontal:10,

                                                    fontWeight:"700",

                                                    fontSize:17

                                                }}

                                            >

                                                {item.quantity}

                                            </Text>

                                            <TouchableOpacity

                                                onPress={() =>

                                                    increaseQuantity(

                                                        list.id,

                                                        item.id

                                                    )

                                                }

                                            >

                                                <Ionicons

                                                    name="add-circle"

                                                    size={28}

                                                    color="#C7D72D"

                                                />

                                            </TouchableOpacity>

                                        </View>

                                        <TouchableOpacity

                                            style={{

                                                marginTop:10

                                            }}

                                            onPress={() =>

                                                removeProduct(

                                                    list.id,

                                                    item.id

                                                )

                                            }

                                        >

                                            <Ionicons

                                                name="trash"

                                                size={22}

                                                color="#D32F2F"

                                            />

                                        </TouchableOpacity>

                                    </View>

                                </View>

                            ))
                        }


                </View>

                {/* Quick Actions */}

                <View style={styles.recommendCard}>

                    <View style={styles.sectionHeader}>

                        <Text style={styles.sectionTitle}>

                            Quick Actions

                        </Text>

                    </View>

                    <TouchableOpacity

                        style={styles.primaryButton}

                        onPress={() => navigation.navigate("Search")}

                    >

                        <Ionicons

                            name="search"

                            size={20}

                            color="#FFFFFF"

                        />

                        <Text style={styles.primaryButtonText}>

                            Browse More Products

                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity

                        style={styles.secondaryButton}

                        onPress={() =>

                            navigation.navigate(

                                "SmartBasket",

                                {

                                    listId: list.id

                                }

                            )

                        }

                    >

                        <Ionicons

                            name="sparkles"

                            size={20}

                            color="#C7D72D"

                        />

                        <Text style={styles.secondaryButtonText}>

                            Smart Basket Optimizer

                        </Text>

                    </TouchableOpacity>

                </View>


                {/* Shopping Insights */}
                <View style={styles.recommendCard}>

                    <View style={styles.sectionHeader}>

                        <Text style={styles.sectionTitle}>

                            Shopping Insights

                        </Text>

                    </View>

                    <View style={styles.recommendItem}>

                        <Ionicons

                            name="wallet"

                            size={22}

                            color="#22A45D"

                        />

                        <View
                            style={{
                                marginLeft:15
                            }}
                        >

                            <Text style={styles.recommendText}>

                                {

                                    budgetSavings >= 0

                                        ? "Budget Savings"

                                        : "Over Budget"

                                }

                            </Text>

                            <Text style={styles.shoppingDate}>

                                E{Math.abs(budgetSavings)}

                            </Text>

                        </View>

                    </View>

                    <View style={styles.recommendItem}>

                        <Ionicons

                            name="trophy"

                            size={22}

                            color="#F9A825"

                        />

                        <View
                            style={{
                                marginLeft:15
                            }}
                        >

                            <Text style={styles.recommendText}>

                                Shopper Level

                            </Text>

                            <Text style={styles.shoppingDate}>

                                Beginner

                            </Text>

                        </View>

                    </View>

                    <View style={styles.recommendItem}>

                        <Ionicons

                            name="trending-down"

                            size={22}

                            color="#22A45D"

                        />

                        <View
                            style={{
                                marginLeft:15
                            }}
                        >

                            <Text style={styles.recommendText}>

                                Cheapest Basket

                            </Text>

                            <Text style={styles.shoppingDate}>

                                Compare your basket to see your savings.

                            </Text>

                        </View>

                    </View>

                </View>

                {/* Share & Invite */}

                <View style={styles.recommendCard}>

                    <View style={styles.sectionHeader}>

                        <Text style={styles.sectionTitle}>

                            Share & Collaborate

                        </Text>

                    </View>

                    <TouchableOpacity

                        style={styles.secondaryButton}

                    >

                        <Ionicons

                            name="share-social"

                            size={20}

                            color="#C7D72D"

                        />

                        <Text style={styles.secondaryButtonText}>

                            Share Shopping List

                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity

                        style={styles.secondaryButton}

                    >

                        <Ionicons

                            name="people"

                            size={20}

                            color="#C7D72D"

                        />

                        <Text style={styles.secondaryButtonText}>

                            Invite Family & Friends

                        </Text>

                    </TouchableOpacity>

                </View>

                <View
                    style={{
                        height:90
                    }}
                />

            </ScrollView>

            <BottomNavigation

                navigation={navigation}

                active="Lists"

            />

        </SafeAreaView>

    );

}