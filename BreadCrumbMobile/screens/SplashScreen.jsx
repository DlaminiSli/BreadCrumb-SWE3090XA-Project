import React, { useEffect } from "react";

import {
    View,
    Text,
    Image
} from "react-native";

import styles from "./SplashScreenStyles";

export default function SplashScreen({ navigation }) {

    useEffect(() => {

        const timer = setTimeout(() => {

            navigation.replace("OnboardingOne");

        }, 2500);

        return () => clearTimeout(timer);

    }, []);

    return (

        <View style={styles.container}>

            <Image
                source={require("../assets/logos/logo.png")}
                style={styles.logo}
            />

            <Text style={styles.title}>
                BreadCrumb
            </Text>

            <Text style={styles.subtitle}>
                Follow the trail to smarter shopping
            </Text>

        </View>

    );

}