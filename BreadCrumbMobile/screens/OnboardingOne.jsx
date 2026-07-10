import React from "react";

import {
    View,
    Text,
    TouchableOpacity
} from "react-native";

import PrimaryButton from "../components/PrimaryButton";

import OnboardingDots from "../components/onboarding/OnboardingDots";

import OnboardingImage from "../components/onboarding/OnboardingImage";

import styles from "./OnboardingOneStyles";

export default function OnboardingOne({ navigation }) {

    return (

        <View style={styles.container}>

            <TouchableOpacity
                style={styles.skipButton}
                onPress={() => navigation.replace("LoggedOut")}
            >

                <Text style={styles.skipText}>

                    Skip

                </Text>

            </TouchableOpacity>

            <View style={styles.imageContainer}>

                <OnboardingImage

                    image={require("../assets/images/onboarding/onboarding1.png")}

                />

            </View>

            <View style={styles.bottomContainer}>

                <Text style={styles.title}>

                    Compare Prices Easily

                </Text>

                <Text style={styles.description}>

                    Find the best deals from your favourite stores without visiting them individually.

                </Text>

                <OnboardingDots active={1} />

                <PrimaryButton

                    title="Next"

                    onPress={() => navigation.navigate("OnboardingTwo")}

                />

            </View>

        </View>

    );

}