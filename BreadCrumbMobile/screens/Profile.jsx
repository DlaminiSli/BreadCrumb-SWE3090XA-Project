import React, { useEffect, useState } from "react";

import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { auth, db } from "../services/firebase";

import { logoutUser } from "../services/authService";

import {
    doc,
    getDoc
} from "firebase/firestore";

import BottomNavigation from "../components/BottomNavigation";

export default function Profile({ navigation }) {

    const [userData, setUserData] = useState(null);

    useEffect(() => {

        async function loadUser() {

            try {

                const currentUser = auth.currentUser;

                if (!currentUser) return;

                const document = await getDoc(
                    doc(
                        db,
                        "users",
                        currentUser.uid
                    )
                );

                if (document.exists()) {

                    setUserData(document.data());

                }

            }

            catch (error) {

                console.log(error);

            }

        }

        loadUser();

    }, []);

    const currencyMap = {

        "Eswatini": "SZL",

        "Kenya": "KES",

        "South Africa": "ZAR",

        "Botswana": "BWP",

        "Namibia": "NAD",

        "Zimbabwe": "USD",

        "Zambia": "ZMW"

    };

    const flagMap = {

        "Eswatini": "🇸🇿",

        "Kenya": "🇰🇪",

        "South Africa": "🇿🇦",

        "Botswana": "🇧🇼",

        "Namibia": "🇳🇦",

        "Zimbabwe": "🇿🇼",

        "Zambia": "🇿🇲"

    };

    const currency =

        currencyMap[userData?.country] ||

        "SZL";

    const flag =

        flagMap[userData?.country] ||

        "🌍";

    return (

        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#F6F7FB"
            }}
        >

            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: "700",
                        marginTop: 25,
                        marginLeft: 20,
                        color: "#222"
                    }}
                >
                    Profile
                </Text>

                {/* Avatar */}

                <View
                    style={{
                        alignItems: "center",
                        marginTop: 35
                    }}
                >

                    <TouchableOpacity
                            onPress={() => navigation.navigate("EditProfile")}
                        >

                            <View
                                style={{
                                    width:120,
                                    height:120,
                                    borderRadius:60,
                                    backgroundColor:"#C7D72D",
                                    justifyContent:"center",
                                    alignItems:"center",
                                    elevation:4
                                }}
                            >

                            <Text
                                style={{
                                    fontSize: 46,
                                    fontWeight: "700",
                                    color: "#222"
                                }}
                            >

                                {
                                    userData?.fullName
                                        ? userData.fullName
                                            .charAt(0)
                                            .toUpperCase()
                                        : "?"
                                }

                            </Text>

                        </View>

                        <View
                            style={{
                                position: "absolute",
                                bottom: 2,
                                right: 2,
                                width: 38,
                                height: 38,
                                borderRadius: 19,
                                backgroundColor: "#FFFFFF",
                                justifyContent: "center",
                                alignItems: "center",
                                elevation: 4
                            }}
                        >

                            <Ionicons
                                name="pencil"
                                size={18}
                                color="#22A45D"
                            />

                        </View>

                    </TouchableOpacity>

                    <Text
                        style={{
                            marginTop: 20,
                            fontSize: 24,
                            fontWeight: "700",
                            color: "#222"
                        }}
                    >

                        {userData?.fullName || "Loading..."}

                    </Text>

                    <Text
                        style={{
                            marginTop: 5,
                            color: "#666",
                            fontSize: 15
                        }}
                    >

                        {userData?.email || ""}

                    </Text>

                    <Text
                        style={{
                            marginTop: 6,
                            color: "#888",
                            fontSize: 15
                        }}
                    >

                        {flag} {userData?.country || ""}

                    </Text>

                    <Text
                        style={{
                            marginTop: 6,
                            color: "#22A45D",
                            fontWeight: "600"
                        }}
                    >

                        Currency • {currency}

                    </Text>

                </View>
                                {/* My Account */}

                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:35
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
                        My Account
                    </Text>

                    <View
                        style={{
                            backgroundColor:"#FFFFFF",
                            borderRadius:20,
                            overflow:"hidden",
                            elevation:2
                        }}
                    >

                        {/* Edit Profile */}
                        <TouchableOpacity
                        onPress={() => navigation.navigate("EditProfile")}
                            style={{
                                flexDirection:"row",
                                justifyContent:"space-between",
                                alignItems:"center",
                                padding:18,
                                borderBottomWidth:1,
                                borderBottomColor:"#F2F2F2"
                            }}
                        >

                            <View
                                style={{
                                    flexDirection:"row",
                                    alignItems:"center"
                                }}
                            >

                                <Ionicons
                                    name="create-outline"
                                    size={22}
                                    color="#22A45D"
                                />

                                <Text
                                    style={{
                                        marginLeft:15,
                                        fontSize:16,
                                        color:"#222"
                                    }}
                                >
                                    Edit Profile
                                </Text>

                            </View>

                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color="#999"
                            />

                        </TouchableOpacity>

                        {/* Archived Lists */}

                        <TouchableOpacity

                        onPress={() =>
                            
                            navigation.navigate("ShoppingLists")
                            
                        }
                            style={{
                                flexDirection:"row",
                                justifyContent:"space-between",
                                alignItems:"center",
                                padding:18
                            }}
                        >

                            <View
                                style={{
                                    flexDirection:"row",
                                    alignItems:"center"
                                }}
                            >

                                <Ionicons
                                    name="archive-outline"
                                    size={22}
                                    color="#22A45D"
                                />

                                <Text
                                    style={{
                                        marginLeft:15,
                                        fontSize:16,
                                        color:"#222"
                                    }}
                                >
                                    Archived Shopping Lists
                                </Text>

                            </View>

                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color="#999"
                            />

                        </TouchableOpacity>

                    </View>

                </View>


                {/* Preferences */}
                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:30
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
                        Preferences
                    </Text>

                    <View
                        style={{
                            backgroundColor:"#FFFFFF",
                            borderRadius:20,
                            overflow:"hidden",
                            elevation:2
                        }}
                    >

                        {/* Dark Mode */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Appearance")}
                            style={{
                                flexDirection:"row",
                                justifyContent:"space-between",
                                alignItems:"center",
                                padding:18,
                                borderBottomWidth:1,
                                borderBottomColor:"#F2F2F2"
                            }}
                        >

                            <View
                                style={{
                                    flexDirection:"row",
                                    alignItems:"center"
                                }}
                            >

                                <Ionicons
                                    name="moon-outline"
                                    size={22}
                                    color="#22A45D"
                                />

                                <Text
                                    style={{
                                        marginLeft:15,
                                        fontSize:16
                                    }}
                                >
                                    Appearance
                                </Text>

                            </View>

                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color="#999"
                            />

                        </TouchableOpacity>

                        {/* Language */}
                        <TouchableOpacity
                            style={{
                                flexDirection:"row",
                                justifyContent:"space-between",
                                alignItems:"center",
                                padding:18,
                                borderBottomWidth:1,
                                borderBottomColor:"#F2F2F2"
                            }}
                        >

                            <View
                                style={{
                                    flexDirection:"row",
                                    alignItems:"center"
                                }}
                            >

                                <Ionicons
                                    name="language-outline"
                                    size={22}
                                    color="#22A45D"
                                />

                                <Text
                                    style={{
                                        marginLeft:15,
                                        fontSize:16
                                    }}
                                >
                                    Language
                                </Text>

                            </View>

                            <Text
                                style={{
                                    color:"#666"
                                }}
                            >
                                English
                            </Text>

                        </TouchableOpacity>

                        {/* Text Size */}
                        <TouchableOpacity
                        onPress={() => navigation.navigate("TextSize")}
                            style={{
                                flexDirection:"row",
                                justifyContent:"space-between",
                                alignItems:"center",
                                padding:18,
                                borderBottomWidth:1,
                                borderBottomColor:"#F2F2F2"
                            }}
                        >

                            <View
                                style={{
                                    flexDirection:"row",
                                    alignItems:"center"
                                }}
                            >

                                <Ionicons
                                    name="text-outline"
                                    size={22}
                                    color="#22A45D"
                                />

                                <Text
                                    style={{
                                        marginLeft:15,
                                        fontSize:16
                                    }}
                                >
                                    Text Size
                                </Text>

                            </View>

                            <Text
                                style={{
                                    color:"#666"
                                }}
                            >
                                Medium
                            </Text>

                        </TouchableOpacity>

                        {/* Currency */}
                        <TouchableOpacity
                            style={{
                                flexDirection:"row",
                                justifyContent:"space-between",
                                alignItems:"center",
                                padding:18
                            }}
                        >

                            <View
                                style={{
                                    flexDirection:"row",
                                    alignItems:"center"
                                }}
                            >

                                <Ionicons
                                    name="cash-outline"
                                    size={22}
                                    color="#22A45D"
                                />

                                <Text
                                    style={{
                                        marginLeft:15,
                                        fontSize:16
                                    }}
                                >
                                    Currency
                                </Text>

                            </View>

                            <Text
                                style={{
                                    color:"#666"
                                }}
                            >
                                {currency}
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>

                {/* Support */}
                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:30
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
                        Support
                    </Text>

                    <View
                        style={{
                            backgroundColor:"#FFFFFF",
                            borderRadius:20,
                            overflow:"hidden",
                            elevation:2
                        }}
                    >

                        {/* Help */}
                        <TouchableOpacity
                            style={{
                                flexDirection:"row",
                                justifyContent:"space-between",
                                alignItems:"center",
                                padding:18,
                                borderBottomWidth:1,
                                borderBottomColor:"#F2F2F2"
                            }}
                            onPress={() =>
                                navigation.navigate("HelpScreen")
                            }
                        >

                            <View
                                style={{
                                    flexDirection:"row",
                                    alignItems:"center"
                                }}
                            >

                                <Ionicons
                                    name="help-circle-outline"
                                    size={22}
                                    color="#22A45D"
                                />

                                <Text
                                    style={{
                                        marginLeft:15,
                                        fontSize:16
                                    }}
                                >
                                    Help & Support
                                </Text>

                            </View>

                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color="#999"
                            />

                        </TouchableOpacity>

                        {/* About */}
                        <TouchableOpacity
                            style={{
                                flexDirection:"row",
                                justifyContent:"space-between",
                                alignItems:"center",
                                padding:18
                            }}
                            onPress={() =>
                                navigation.navigate("AboutScreen")
                            }
                        >

                            <View
                                style={{
                                    flexDirection:"row",
                                    alignItems:"center"
                                }}
                            >

                                <Ionicons
                                    name="information-circle-outline"
                                    size={22}
                                    color="#22A45D"
                                />

                                <Text
                                    style={{
                                        marginLeft:15,
                                        fontSize:16
                                    }}
                                >
                                    About BreadCrumb
                                </Text>

                            </View>

                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color="#999"
                            />

                        </TouchableOpacity>

                    </View>

                </View>


                {/* Logout */}
                <TouchableOpacity
                    onPress={async () => {

                        await logoutUser();

                        navigation.replace("Login");

                    }}
                    style={{
                        marginHorizontal:20,
                        marginTop:35,
                        backgroundColor:"#D32F2F",
                        borderRadius:18,
                        paddingVertical:16,
                        flexDirection:"row",
                        justifyContent:"center",
                        alignItems:"center",
                        marginBottom:40
                    }}
                >

                    <Ionicons
                        name="log-out-outline"
                        size={22}
                        color="#FFFFFF"
                    />

                    <Text
                        style={{
                            color:"#FFFFFF",
                            fontSize:17,
                            fontWeight:"700",
                            marginLeft:10
                        }}
                    >
                        Logout
                    </Text>

                </TouchableOpacity>

            </ScrollView>

            <BottomNavigation
                navigation={navigation}
                active="Profile"
            />

        </SafeAreaView>

    );

}