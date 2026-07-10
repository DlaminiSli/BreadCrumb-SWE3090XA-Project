import React from "react";
import { View } from "react-native";

import styles from "../../styles/OnboardingDotsStyles";

export default function OnboardingDots({ active }) {

    return (

        <View style={styles.container}>

            <View
                style={[
                    styles.dot,
                    active === 1 && styles.activeDot
                ]}
            />

            <View
                style={[
                    styles.dot,
                    active === 2 && styles.activeDot
                ]}
            />

            <View
                style={[
                    styles.dot,
                    active === 3 && styles.activeDot
                ]}
            />

        </View>

    );

}