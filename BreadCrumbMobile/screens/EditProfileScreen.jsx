import React, {

    useEffect,

    useState

} from "react";

import {

    SafeAreaView,

    ScrollView,

    View,

    Text,

    TouchableOpacity,

    TextInput,

    Alert

} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {

    auth,

    db

} from "../services/firebase";

import {

    doc,

    getDoc,

    updateDoc

} from "firebase/firestore";

import BottomNavigation from "../components/BottomNavigation";

export default function EditProfileScreen({

    navigation

}) {

    const [fullName, setFullName] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");

    const [country, setCountry] = useState("");

    const [countryCode, setCountryCode] = useState("");

    const [email, setEmail] = useState("");

    useEffect(() => {

        async function loadUser() {

            try {

                const currentUser = auth.currentUser;

                if (!currentUser) return;

                const snapshot = await getDoc(

                    doc(

                        db,

                        "users",

                        currentUser.uid

                    )

                );

                if (snapshot.exists()) {

                    const data = snapshot.data();

                    setFullName(data.fullName);

                    setPhoneNumber(data.phoneNumber);

                    setCountry(data.country);

                    setCountryCode(data.countryCode);

                    setEmail(data.email);

                }

            }

            catch (error) {

                console.log(error);

            }

        }

        loadUser();

    }, []);

    async function saveProfile() {

    try {

        const currentUser = auth.currentUser;

        await updateDoc(

            doc(db, "users", currentUser.uid),

            {
                fullName,
                phoneNumber,
                country,
                countryCode
            }

        );

        Alert.alert(

            "Success",

            "Your profile has been updated."

        );

        navigation.goBack();

    }

    catch (error) {

        Alert.alert(

            "Error",

            error.message

        );

    }

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

                <Text

                    style={{

                        fontSize:30,

                        fontWeight:"700",

                        marginTop:20,

                        marginLeft:20,

                        color:"#222"

                    }}

                >

                    Edit Profile

                </Text>

                <View

                    style={{

                        alignItems:"center",

                        marginTop:30

                    }}

                >

                    <View

                        style={{

                            width:110,

                            height:110,

                            borderRadius:55,

                            backgroundColor:"#C7D72D",

                            justifyContent:"center",

                            alignItems:"center"

                        }}

                    >

                        <Text

                            style={{

                                fontSize:42,

                                fontWeight:"700"

                            }}

                        >

                            {

                                fullName

                                    ? fullName.charAt(0).toUpperCase()

                                    : "?"

                            }

                        </Text>

                    </View>

                </View>

                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:35
                    }}
                >

                    <Text
                        style={{
                            fontSize:16,
                            fontWeight:"600",
                            color:"#444",
                            marginBottom:8
                        }}
                    >
                        Full Name
                    </Text>

                    <TextInput
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Enter your full name"
                        style={{
                            backgroundColor:"#FFFFFF",
                            borderRadius:15,
                            padding:16,
                            fontSize:16,
                            elevation:2
                        }}
                    />

                </View>

                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:20
                    }}
                >

                    <Text
                        style={{
                            fontSize:16,
                            fontWeight:"600",
                            color:"#444",
                            marginBottom:8
                        }}
                    >
                        Phone Number
                    </Text>

                    <TextInput
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                        placeholder="Enter phone number"
                        style={{
                            backgroundColor:"#FFFFFF",
                            borderRadius:15,
                            padding:16,
                            fontSize:16,
                            elevation:2
                        }}
                    />

                </View>

                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:20
                    }}
                >

                    <Text
                        style={{
                            fontSize:16,
                            fontWeight:"600",
                            color:"#444",
                            marginBottom:8
                        }}
                    >
                        Country
                    </Text>

                    <TextInput
                        value={country}
                        onChangeText={setCountry}
                        placeholder="Country"
                        style={{
                            backgroundColor:"#FFFFFF",
                            borderRadius:15,
                            padding:16,
                            fontSize:16,
                            elevation:2
                        }}
                    />

                </View>

                <View
                    style={{
                        marginHorizontal:20,
                        marginTop:20
                    }}
                >

                    <Text
                        style={{
                            fontSize:16,
                            fontWeight:"600",
                            color:"#444",
                            marginBottom:8
                        }}
                    >
                        Email Address
                    </Text>

                    <TextInput
                        value={email}
                        editable={false}
                        style={{
                            backgroundColor:"#ECECEC",
                            borderRadius:15,
                            padding:16,
                            fontSize:16,
                            color:"#777"
                        }}
                    />

                    <Text
                        style={{
                            marginTop:8,
                            color:"#888",
                            fontSize:13
                        }}
                    >
                        Email addresses are managed through your Firebase account and cannot be edited here.
                    </Text>

                </View>

                <TouchableOpacity
                    onPress={saveProfile}
                    style={{
                        backgroundColor:"#22A45D",
                        marginHorizontal:20,
                        marginTop:35,
                        paddingVertical:16,
                        borderRadius:18,
                        alignItems:"center",
                        marginBottom:100
                    }}
                >

                    <Text
                        style={{
                            color:"#FFFFFF",
                            fontSize:18,
                            fontWeight:"700"
                        }}
                    >
                        Save Changes
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