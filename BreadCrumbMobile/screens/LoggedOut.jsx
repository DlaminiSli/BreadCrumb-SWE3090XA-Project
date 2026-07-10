import React from "react";

import {
    View,
    Image,
    Text
} from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";

import styles from "./LoggedOutStyles";

export default function LoggedOut({ navigation }) {

    return (

        <View style={styles.container}>

            <View style={styles.logoContainer}>

                <Image
                    source={require("../assets/logos/logo.png")}
                    style={styles.logo}
                />

            </View>

            <Text style={styles.title}>
                BreadCrumb
            </Text>

            <Text style={styles.subtitle}>
                Your smartest shopping companion
            </Text>

            <View style={styles.imageContainer}>

                <Image
                    source={require("../assets/images/onboarding/onboarding3.png")}
                    style={styles.shoppingImage}
                />

            </View>

            <View style={styles.buttonContainer}>

                <PrimaryButton
                    title="Sign Up"
                    onPress={() => navigation.navigate("Signup")}
                />

                <SecondaryButton
                    title="Login"
                    onPress={() => navigation.navigate("Login")}
                />

            </View>

        </View>

    );

}