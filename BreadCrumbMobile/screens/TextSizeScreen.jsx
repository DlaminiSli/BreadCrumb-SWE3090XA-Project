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

import {
    useTheme
} from "../context/ThemeContext";

export default function TextSizeScreen({

    navigation

}) {

    const {

        textSize,

        changeTextSize

    } = useTheme();

    function Option({

        title,

        value

    }) {

        const selected = textSize === value;

        return (

            <TouchableOpacity

                onPress={() =>
                    changeTextSize(value)
                }

                style={{

                    marginHorizontal:20,

                    marginTop:18,

                    backgroundColor:
                        selected
                            ? "#F3FFE6"
                            : "#FFFFFF",

                    borderRadius:18,

                    padding:18,

                    borderWidth:2,

                    borderColor:
                        selected
                            ? "#22A45D"
                            : "#EEEEEE",

                    flexDirection:"row",

                    justifyContent:"space-between",

                    alignItems:"center"

                }}

            >

                <View
                    style={{
                        flexDirection:"row",
                        alignItems:"center"
                    }}
                >

                    <Text
                        style={{
                            fontSize:
                                value === "small"
                                    ? 16
                                    : value === "medium"
                                    ? 22
                                    : 28,

                            fontWeight:"700",

                            color:"#22A45D"
                        }}
                    >
                        Aa
                    </Text>

                    <Text
                        style={{
                            marginLeft:18,
                            fontSize:17,
                            fontWeight:"600",
                            color:"#222"
                        }}
                    >
                        {title}
                    </Text>

                </View>

                {

                    selected &&

                    <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#22A45D"
                    />

                }

            </TouchableOpacity>

        );

    }

    return (

        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:"#F6F7FB"
            }}
        >

            <ScrollView>

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
                    Text Size
                </Text>

                <Text
                    style={{
                        marginHorizontal:20,
                        marginTop:10,
                        color:"#666",
                        lineHeight:24
                    }}
                >
                    Choose the text size that feels most comfortable when using BreadCrumb.
                </Text>

                <Option
                    title="Small"
                    value="small"
                />

                <Option
                    title="Medium"
                    value="medium"
                />

                <Option
                    title="Large"
                    value="large"
                />

                <View
                    style={{
                        height:120
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