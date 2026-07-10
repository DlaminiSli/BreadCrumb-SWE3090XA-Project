import React from "react";

import {

    SafeAreaView,

    View,

    Text,

    ScrollView,

    TouchableOpacity

} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import BottomNavigation from "../components/BottomNavigation";

export default function SavingsScreen({

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

                    onPress={()=>

                        navigation.goBack()

                    }

                    style={{

                        marginTop:20,

                        marginLeft:20

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

                        marginHorizontal:20,

                        marginTop:20

                    }}

                >

                    <Text

                        style={{

                            fontSize:30,

                            fontWeight:"700",

                            color:"#222"

                        }}

                    >

                        My Savings

                    </Text>

                    <Text

                        style={{

                            marginTop:8,

                            color:"#666",

                            lineHeight:22

                        }}

                    >

                        Small savings today become big savings tomorrow.

                    </Text>

                </View>

                {/* Total Savings */}
                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:25,
                        backgroundColor:"#FFFFFF",
                        borderRadius:25,
                        padding:22,
                        elevation:3
                    }}
                >

                    <View
                        style={{
                            flexDirection:"row",
                            justifyContent:"space-between",
                            alignItems:"center"
                        }}
                    >

                        <View>

                            <Text
                                style={{
                                    color:"#777",
                                    fontSize:15
                                }}
                            >
                                Total Savings
                            </Text>

                            <Text
                                style={{
                                    fontSize:36,
                                    fontWeight:"700",
                                    color:"#22A45D",
                                    marginTop:8
                                }}
                            >
                                E1,245
                            </Text>

                            <View
                                style={{
                                    flexDirection:"row",
                                    alignItems:"center",
                                    marginTop:10
                                }}
                            >

                                <Ionicons
                                    name="trending-up"
                                    size={18}
                                    color="#22A45D"
                                />

                                <Text
                                    style={{
                                        color:"#22A45D",
                                        marginLeft:6,
                                        fontWeight:"600"
                                    }}
                                >
                                    +E120 saved this month
                                </Text>

                            </View>

                        </View>

                        <View
                            style={{
                                width:75,
                                height:75,
                                borderRadius:38,
                                backgroundColor:"#F4FDE8",
                                justifyContent:"center",
                                alignItems:"center"
                            }}
                        >

                            <Ionicons
                                name="wallet"
                                size={38}
                                color="#C7D72D"
                            />

                        </View>

                    </View>

                </View>

                {/* Shopper Level */}
                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:20,
                        backgroundColor:"#FFFFFF",
                        borderRadius:25,
                        padding:22,
                        elevation:3
                    }}
                >

                    <View
                        style={{
                            flexDirection:"row",
                            justifyContent:"space-between",
                            alignItems:"center"
                        }}
                    >

                        <View>

                            <Text
                                style={{
                                    color:"#777"
                                }}
                            >
                                Shopper Level
                            </Text>

                            <Text
                                style={{
                                    fontSize:24,
                                    fontWeight:"700",
                                    marginTop:8
                                }}
                            >
                                🐷 Smart Saver
                            </Text>

                            <Text
                                style={{
                                    color:"#666",
                                    marginTop:5
                                }}
                            >
                                Level 4
                            </Text>

                        </View>

                        <Text
                            style={{
                                fontSize:55
                            }}
                        >
                            🐷
                        </Text>

                    </View>

                    <View
                        style={{
                            marginTop:25,
                            height:12,
                            backgroundColor:"#ECECEC",
                            borderRadius:8,
                            overflow:"hidden"
                        }}
                    >

                        <View
                            style={{
                                width:"75%",
                                height:"100%",
                                backgroundColor:"#C7D72D",
                                borderRadius:8
                            }}
                        />

                    </View>

                    <Text
                        style={{
                            marginTop:12,
                            color:"#666"
                        }}
                    >
                        75 XP to reach BreadCrumb Master
                    </Text>

                </View>

                {/* Monthly Savings */}
                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:20,
                        backgroundColor:"#FFFFFF",
                        borderRadius:25,
                        padding:22,
                        elevation:3
                    }}
                >

                    <Text
                        style={{
                            fontSize:22,
                            fontWeight:"700",
                            color:"#222"
                        }}
                    >
                        Monthly Savings
                    </Text>

                    <Text
                        style={{
                            color:"#777",
                            marginTop:8,
                            marginBottom:25
                        }}
                    >
                        See how much you've saved each month.
                    </Text>

                    {/* Graph */}
                    <View
                        style={{
                            height:170,
                            justifyContent:"center",
                            alignItems:"center"
                        }}
                    >

                        <View
                            style={{
                                flexDirection:"row",
                                alignItems:"flex-end",
                                height:120,
                                width:"100%",
                                justifyContent:"space-between"
                            }}
                        >

                            {
                                [

                                    { month:"Jan", value:90 },

                                    { month:"Feb", value:140 },

                                    { month:"Mar", value:110 },

                                    { month:"Apr", value:180 },

                                    { month:"May", value:180 },

                                    { month:"Jun", value:230 }

                                ].map(item => (

                                    <View
                                        key={item.month}
                                        style={{
                                            alignItems:"center",
                                            flex:1
                                        }}
                                    >

                                        <View
                                            style={{
                                                width:22,
                                                height:item.value / 2,
                                                backgroundColor:"#C7D72D",
                                                borderRadius:8
                                            }}
                                        />

                                        <Text
                                            style={{
                                                marginTop:10,
                                                color:"#666",
                                                fontSize:12
                                            }}
                                        >
                                            {item.month}
                                        </Text>

                                    </View>

                                ))
                            }

                        </View>

                    </View>

                </View>

                {/* BreadCrumb Insight */}
                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:20,
                        marginBottom:35,
                        backgroundColor:"#FFF8E6",
                        borderRadius:25,
                        padding:22,
                        borderLeftWidth:6,
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

                            name="sparkles"

                            size={24}

                            color="#C7D72D"

                        />

                        <Text
                            style={{
                                marginLeft:10,
                                fontSize:20,
                                fontWeight:"700",
                                color:"#222"
                            }}
                        >
                            BreadCrumb Insight
                        </Text>

                    </View>

                    <Text
                        style={{
                            marginTop:18,
                            color:"#555",
                            lineHeight:24
                        }}
                    >
                        Great work! Your savings have increased over the past few months.
                        Keep using Smart Basket to compare prices and stretch your budget even further.
                    </Text>

                </View>
                </ScrollView>

                <BottomNavigation

                    navigation={navigation}

                    active="Savings"

                />

                </SafeAreaView>

                );

                }