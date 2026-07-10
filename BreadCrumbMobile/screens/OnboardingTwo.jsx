import React from "react";

import {
    View,
    Text,
    TouchableOpacity
} from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import OnboardingDots from "../components/onboarding/OnboardingDots";
import OnboardingImage from "../components/onboarding/OnboardingImage";

import styles from "./OnboardingTwoStyles";

export default function OnboardingTwo({ navigation }) {

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

                    image={require("../assets/images/onboarding/onboarding2.png")}

                />

            </View>

            <View style={styles.bottomContainer}>

                <Text style={styles.title}>

                    Discover Promotions

                </Text>

                <Text style={styles.description}>

                    Browse promotional catalogues and discover amazing deals before you shop.

                </Text>

                <OnboardingDots active={2} />

                <PrimaryButton

                    title="Next"

                    onPress={() => navigation.navigate("OnboardingThree")}

                />

            </View>

        </View>

    );

}