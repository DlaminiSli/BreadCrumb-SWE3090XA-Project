import React from "react";

import {
    View,
    Text,
    TouchableOpacity
} from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import OnboardingDots from "../components/onboarding/OnboardingDots";
import OnboardingImage from "../components/onboarding/OnboardingImage";

import styles from "./OnboardingThreeStyles";

export default function OnboardingThree({ navigation }) {

    return (

        <View style={styles.container}>

            <TouchableOpacity
                style={styles.skipButton}
                onPress={() => navigation.replace("LoggedOut")}            >

                <Text style={styles.skipText}>
                    Skip
                </Text>

            </TouchableOpacity>

            <View style={styles.imageContainer}>

                <OnboardingImage
                    image={require("../assets/images/onboarding/onboarding3.png")}
                />

            </View>

            <View style={styles.bottomContainer}>

                <Text style={styles.title}>
                    Shop Smarter
                </Text>

                <Text style={styles.description}>
                    Create shopping lists, receive price alerts, and discover combo deals to save even more.
                </Text>

                <OnboardingDots active={3} />

                <PrimaryButton
                    title="Get Started"
                    onPress={() => navigation.replace("LoggedOut")}                />

            </View>

        </View>

    );

}