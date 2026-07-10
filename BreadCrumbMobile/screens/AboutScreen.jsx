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

import { Image } from "react-native";

export default function AboutScreen({ navigation }) {

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
                    onPress={() => navigation.goBack()}
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

                {/* Header */}
                <Text
                    style={{
                        fontSize:30,
                        fontWeight:"700",
                        marginTop:20,
                        marginLeft:20,
                        color:"#222"
                    }}
                >
                    About
                </Text>

                <Text
                    style={{
                        marginHorizontal:20,
                        marginTop:10,
                        color:"#666",
                        lineHeight:24
                    }}
                >
                    Learn more about BreadCrumb, its purpose and the technology behind it.
                </Text>

                {/* Logo Card */}
                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:30,
                        backgroundColor:"#FFFFFF",
                        borderRadius:20,
                        padding:25,
                        alignItems:"center",
                        elevation:2
                    }}
                >

                    <Image
                        source={require("../assets/logos/logo.png")}
                        style={{
                            width:80,
                            height:80,
                            resizeMode:"contain"
                        }}
                    />

                    <Text
                        style={{
                            fontSize:28,
                            fontWeight:"700",
                            marginTop:15,
                            color:"#222"
                        }}
                    >
                        BreadCrumb
                    </Text>

                    <Text
                        style={{
                            marginTop:5,
                            color:"#22A45D",
                            fontWeight:"600"
                        }}
                    >
                        Version 1.0
                    </Text>

                </View>

                {/* About */}
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

                    <Text
                        style={{
                            fontSize:20,
                            fontWeight:"700",
                            color:"#222"
                        }}
                    >
                        About BreadCrumb
                    </Text>

                    <Text
                        style={{
                            marginTop:15,
                            color:"#666",
                            lineHeight:25
                        }}
                    >
                        BreadCrumb is a smart shopping companion developed to help shoppers
                        compare supermarket prices, organise shopping lists and make better
                        purchasing decisions. By bringing together products from different
                        stores, BreadCrumb helps users save both time and money while shopping.
                    </Text>

                </View>

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

                    <Text
                        style={{
                            fontSize:20,
                            fontWeight:"700",
                            color:"#222"
                        }}
                    >
                        How BreadCrumb Works
                    </Text>

                    <Text
                        style={{
                            marginTop:15,
                            color:"#666",
                            lineHeight:25
                        }}
                    >
                        • Create a shopping list and set your budget.
                    </Text>

                    <Text
                        style={{
                            color:"#666",
                            lineHeight:25
                        }}
                    >
                        • Generate a Smart Basket based on your shopping category.
                    </Text>

                    <Text
                        style={{
                            color:"#666",
                            lineHeight:25
                        }}
                    >
                        • Compare the Maximum Savings strategy with the Best One-Store Basket.
                    </Text>

                    <Text
                        style={{
                            color:"#666",
                            lineHeight:25
                        }}
                    >
                        • Add your preferred basket to the shopping list with one tap.
                    </Text>

                    <Text
                        style={{
                            color:"#666",
                            lineHeight:25
                        }}
                    >
                        • Mark purchased items, archive completed lists and monitor your savings.
                    </Text>

                </View>

                {/* Technologies */}

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

                    <Text
                        style={{
                            fontSize:20,
                            fontWeight:"700",
                            color:"#222",
                            marginBottom:15
                        }}
                    >
                        Technologies Used
                    </Text>

                    <View
                        style={{
                            flexDirection:"row",
                            flexWrap:"wrap"
                        }}
                    >

                        {[
                            "React Native",
                            "Expo",
                            "JavaScript",
                            "Node.js",
                            "Express.js",
                            "Firebase Authentication",
                            "Cloud Firestore",
                            "MongoDB",
                            "REST API"
                        ].map((tech) => (

                            <View
                                key={tech}
                                style={{
                                    backgroundColor:"#F4FDE8",
                                    paddingHorizontal:15,
                                    paddingVertical:10,
                                    borderRadius:20,
                                    margin:5
                                }}
                            >

                                <Text
                                    style={{
                                        color:"#22A45D",
                                        fontWeight:"600"
                                    }}
                                >
                                    {tech}
                                </Text>

                            </View>

                        ))}

                    </View>

                </View>

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

                    <Text
                        style={{
                            fontSize:20,
                            fontWeight:"700",
                            color:"#222"
                        }}
                    >
                        Developed By
                    </Text>

                    <Text
                        style={{
                            marginTop:15,
                            fontSize:18,
                            fontWeight:"600",
                            color:"#222"
                        }}
                    >
                        Silindinkosi Dlamini
                    </Text>

                    <Text
                        style={{
                            marginTop:5,
                            color:"#666",
                            lineHeight:24
                        }}
                    >
                        Bachelor of Science in Software Engineering
                    </Text>

                    <Text
                        style={{
                            color:"#666",
                            lineHeight:24
                        }}
                    >
                        United States International University - Africa
                    </Text>

                </View>

                {/* Mission */}

                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:20,
                        marginBottom:25,
                        backgroundColor:"#FFF8E6",
                        borderRadius:20,
                        padding:20,
                        borderLeftWidth:5,
                        borderLeftColor:"#C7D72D"
                    }}
                >

                    <Ionicons
                        name="bulb-outline"
                        size={28}
                        color="#C7D72D"
                    />

                    <Text
                        style={{
                            marginTop:15,
                            color:"#555",
                            lineHeight:25
                        }}
                    >
                        BreadCrumb's mission is to empower shoppers to make informed
                        purchasing decisions by comparing prices, managing shopping
                        lists and discovering smarter ways to save money every day.
                    </Text>

                </View>

                {/* Footer */}

                <Text
                    style={{
                        textAlign:"center",
                        color:"#888",
                        marginBottom:90
                    }}
                >
                    © 2026 BreadCrumb
                </Text>

            </ScrollView>

            <BottomNavigation
                navigation={navigation}
                active="Profile"
            />

        </SafeAreaView>

    );

}