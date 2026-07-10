import React, { useState } from "react";

import {

    View,

    Text,

    Image,

    ScrollView,

    TouchableOpacity

} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";

import InputField from "../components/authentication/InputField";

import PasswordInput from "../components/authentication/PasswordInput";

import SocialDivider from "../components/authentication/SocialDivider";

import GoogleButton from "../components/authentication/GoogleButton";

import PrimaryButton from "../components/PrimaryButton";

import { loginUser } from "../services/authService";

import styles from "./LoginStyles";

export default function Login({ navigation }) {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [rememberMe, setRememberMe] = useState(false);

    const [loading, setLoading] = useState(false);

    async function handleLogin() {

        if (!email || !password) {

            alert("Please enter your email and password.");

            return;

        }

        try {

            setLoading(true);

            const userCredential = await loginUser(

                email,

                password

            );

            if (!userCredential.user.emailVerified) {

                setLoading(false);

                alert(

                    "Please verify your email before logging in."

                );

                return;

            }

            if (rememberMe) {

                await AsyncStorage.setItem(

                    "rememberUser",

                    "true"

                );

            }

            else {

                await AsyncStorage.removeItem(

                    "rememberUser"

                );

            }

            setLoading(false);

            navigation.replace("Dashboard");

        }

        catch (error) {

            setLoading(false);

            switch (error.code) {

                case "auth/invalid-credential":

                    alert(

                        "Incorrect email or password."

                    );

                    break;

                case "auth/invalid-email":

                    alert(

                        "Please enter a valid email address."

                    );

                    break;

                case "auth/network-request-failed":

                    alert(

                        "Please check your internet connection."

                    );

                    break;

                default:

                    alert(error.message);

            }

        }

    }

    return (

        <ScrollView

            style={styles.container}

            showsVerticalScrollIndicator={false}

        >

            <TouchableOpacity

                style={styles.backButton}

                onPress={() => navigation.goBack()}

            >

                <Ionicons

                    name="arrow-back"

                    size={28}

                    color="#222"

                />

            </TouchableOpacity>

            <View style={styles.logoContainer}>

                <Image

                    source={require("../assets/logos/logo.png")}

                    style={styles.logo}

                />

            </View>

            <Text style={styles.title}>

                Welcome Back

            </Text>

            <Text style={styles.subtitle}>

                Sign in to compare prices,

                save favourites and

                keep track of your shopping.

            </Text>

            <InputField

                icon="mail-outline"

                placeholder="Email Address"

                keyboardType="email-address"

                value={email}

                onChangeText={setEmail}

            />

            <PasswordInput

                placeholder="Password"

                value={password}

                onChangeText={setPassword}

            />
                        <View style={styles.optionsRow}>

                <TouchableOpacity

                    style={styles.rememberContainer}

                    onPress={() =>

                        setRememberMe(!rememberMe)

                    }

                >

                    <Ionicons

                        name={

                            rememberMe

                                ? "checkbox"

                                : "square-outline"

                        }

                        size={22}

                        color="#DFFF00"

                    />

                    <Text style={styles.rememberText}>

                        Remember Me

                    </Text>

                </TouchableOpacity>

                <TouchableOpacity

                    onPress={() =>

                        navigation.navigate("ForgotPassword")

                    }

                >

                    <Text style={styles.forgotText}>

                        Forgot Password?

                    </Text>

                </TouchableOpacity>

            </View>

            <PrimaryButton

                title={

                    loading

                        ? "Signing In..."

                        : "Login"

                }

                onPress={handleLogin}

            />

            <SocialDivider />

            <GoogleButton

                onPress={() => {

                    alert(

                        "Google Sign In will be connected next."

                    );

                }}

            />

            <Text style={styles.googleCaption}>

                Fast • Secure • One Tap

            </Text>

            <View style={styles.signupContainer}>

                <Text style={styles.signupLabel}>

                    Don't have an account?

                </Text>

                <TouchableOpacity

                    onPress={() =>

                        navigation.navigate("Signup")

                    }

                >

                    <Text style={styles.signupText}>

                        Sign Up

                    </Text>

                </TouchableOpacity>

            </View>

        </ScrollView>

    );

}