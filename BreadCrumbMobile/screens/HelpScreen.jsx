import React from "react";

import {

    SafeAreaView,

    ScrollView,

    View,

    Text,

    TouchableOpacity

} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import BottomNavigation from "../components/BottomNavigation";

export default function HelpScreen({

    navigation

}) {

    return (

        <SafeAreaView

            style={{

                flex:1,

                backgroundColor:"#F6F7FB"

            }}

        >

            <ScrollView

                showsVerticalScrollIndicator={false}

            >

                <TouchableOpacity

                    onPress={() =>

                        navigation.goBack()

                    }

                    style={{

                        marginTop:20,

                        marginLeft:20

                    }}

                >

                    <Ionicons

                        name="arrow-back"

                        size={28}

                        color="#222"

                    />

                </TouchableOpacity>

                <Text

                    style={{

                        fontSize:30,

                        fontWeight:"700",

                        marginTop:20,

                        marginLeft:20,

                        color:"#222"

                    }}

                >

                    Help & Support

                </Text>

                <Text

                    style={{

                        marginHorizontal:20,

                        marginTop:10,

                        color:"#666",

                        lineHeight:24

                    }}

                >

                    Learn how to get the most out of BreadCrumb and shop smarter every day.

                </Text>

                {/* Create Shopping List */}
                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:30,
                        backgroundColor:"#FFFFFF",
                        borderRadius:20,
                        padding:20,
                        elevation:2
                    }}
                >

                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center"
                        }}
                    >

                        <Ionicons
                            name="list-outline"
                            size={24}
                            color="#22A45D"
                        />

                        <Text
                            style={{
                                marginLeft:12,
                                fontSize:18,
                                fontWeight:"700",
                                color:"#222"
                            }}
                        >
                            Create a Shopping List
                        </Text>

                    </View>

                    <Text
                        style={{
                            marginTop:15,
                            color:"#666",
                            lineHeight:24
                        }}
                    >
                        Start by creating a shopping list. Enter a name,
                        choose a shopping category and set your preferred
                        budget. BreadCrumb will use this information to
                        recommend suitable products.
                    </Text>

                </View>


                {/* Smart Basket */}

                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:20,
                        backgroundColor:"#FFFFFF",
                        borderRadius:20,
                        padding:20,
                        elevation:2
                    }}
                >

                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center"
                        }}
                    >

                        <Ionicons
                            name="sparkles-outline"
                            size={24}
                            color="#22A45D"
                        />

                        <Text
                            style={{
                                marginLeft:12,
                                fontSize:18,
                                fontWeight:"700"
                            }}
                        >
                            Smart Basket
                        </Text>

                    </View>

                    <Text
                        style={{
                            marginTop:15,
                            color:"#666",
                            lineHeight:24
                        }}
                    >
                        Smart Basket suggests products based on your
                        shopping category. You can compare two shopping
                        strategies before adding products to your list:
                        the Best One-Store Basket for convenience or
                        Maximum Savings by shopping across multiple
                        stores.
                    </Text>

                </View>


                {/* Shopping */}

                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:20,
                        backgroundColor:"#FFFFFF",
                        borderRadius:20,
                        padding:20,
                        elevation:2
                    }}
                >

                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center"
                        }}
                    >

                        <Ionicons
                            name="cart-outline"
                            size={24}
                            color="#22A45D"
                        />

                        <Text
                            style={{
                                marginLeft:12,
                                fontSize:18,
                                fontWeight:"700"
                            }}
                        >
                            Shopping
                        </Text>

                    </View>

                    <Text
                        style={{
                            marginTop:15,
                            color:"#666",
                            lineHeight:24
                        }}
                    >
                        While shopping, mark products as purchased,
                        adjust quantities when needed and keep track of
                        your shopping progress. Once all items are
                        purchased, archive the list to save it as your
                        shopping history.
                    </Text>

                </View>


                {/* Savings */}

                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:20,
                        backgroundColor:"#FFFFFF",
                        borderRadius:20,
                        padding:20,
                        elevation:2
                    }}
                >

                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center"
                        }}
                    >

                        <Ionicons
                            name="wallet-outline"
                            size={24}
                            color="#22A45D"
                        />

                        <Text
                            style={{
                                marginLeft:12,
                                fontSize:18,
                                fontWeight:"700"
                            }}
                        >
                            Savings
                        </Text>

                    </View>

                    <Text
                        style={{
                            marginTop:15,
                            color:"#666",
                            lineHeight:24
                        }}
                    >
                        Visit the Savings page to monitor your monthly
                        savings, shopper level and shopping progress.
                        BreadCrumb encourages smarter shopping habits by
                        showing how your savings improve over time.
                    </Text>

                </View>


                {/* Store Catalogues */}

                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:20,
                        backgroundColor:"#FFFFFF",
                        borderRadius:20,
                        padding:20,
                        elevation:2
                    }}
                >

                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center"
                        }}
                    >

                        <Ionicons
                            name="book-outline"
                            size={24}
                            color="#22A45D"
                        />

                        <Text
                            style={{
                                marginLeft:12,
                                fontSize:18,
                                fontWeight:"700"
                            }}
                        >
                            Store Catalogues
                        </Text>

                    </View>

                    <Text
                        style={{
                            marginTop:15,
                            color:"#666",
                            lineHeight:24
                        }}
                    >
                        Browse the latest catalogues from participating
                        stores to discover current promotions, compare
                        prices and make informed shopping decisions
                        before visiting a store.
                    </Text>

                </View>

                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:25,
                        backgroundColor:"#FFF8E6",
                        borderRadius:20,
                        padding:20,
                        borderLeftWidth:5,
                        borderLeftColor:"#C7D72D"
                    }}
                >

                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center"
                        }}
                    >

                        <Ionicons
                            name="mail-outline"
                            size={24}
                            color="#C7D72D"
                        />

                        <Text
                            style={{
                                marginLeft:12,
                                fontSize:18,
                                fontWeight:"700",
                                color:"#222"
                            }}
                        >
                            Need More Help?
                        </Text>

                    </View>

                    <Text
                        style={{
                            marginTop:15,
                            color:"#555",
                            lineHeight:24
                        }}
                    >
                        If you need additional assistance, have feedback,
                        or would like to report an issue, please contact
                        the BreadCrumb support team.
                    </Text>

                    <Text
                        style={{
                            marginTop:15,
                            color:"#22A45D",
                            fontWeight:"700",
                            fontSize:16
                        }}
                    >
                        support@breadcrumb.app
                    </Text>

                </View>

                <View
                    style={{
                        height:100
                    }}
                />

            </ScrollView>

            <BottomNavigation
                navigation={navigation}
                active="Profile"
            />

        </SafeAreaView>

    );

}