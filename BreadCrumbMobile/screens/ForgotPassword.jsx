import React, { useState } from "react";

import {

    View,

    Text,

    ScrollView,

    TouchableOpacity

} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import InputField from "../components/authentication/InputField";

import PrimaryButton from "../components/PrimaryButton";

import { forgotPassword } from "../services/authService";

import styles from "./ForgotPasswordStyles";

export default function ForgotPassword({ navigation }) {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleResetPassword() {

        if (!email.trim()) {

            alert("Please enter your email address.");

            return;

        }

        try {

            setLoading(true);

            await forgotPassword(email);

            setLoading(false);

            alert("A password reset email has been sent.");

            navigation.goBack();

        }

        catch (error) {

            setLoading(false);

            alert(error.message);

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

            <View style={styles.iconContainer}>

                <Ionicons

                    name="lock-closed"

                    size={60}

                    color="#222"

                />

            </View>

            <Text style={styles.title}>

                Forgot Password

            </Text>

            <Text style={styles.subtitle}>

                Enter your email address and we'll send you a password reset link.

            </Text>

            <InputField

                icon="mail-outline"

                placeholder="Email Address"

                keyboardType="email-address"

                value={email}

                onChangeText={setEmail}

            />

            <PrimaryButton

                title={loading ? "Sending..." : "Send Reset Link"}

                onPress={handleResetPassword}

            />

            <TouchableOpacity

                style={styles.loginButton}

                onPress={() => navigation.navigate("Login")}

            >

                <Text style={styles.loginText}>

                    Back to Login

                </Text>

            </TouchableOpacity>

        </ScrollView>

    );

}