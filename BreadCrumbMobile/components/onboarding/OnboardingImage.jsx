import React from "react";

import {
    View,
    Image
} from "react-native";

import styles from "../../styles/OnboardingImageStyles";

export default function OnboardingImage({ image }) {

    return (

        <View style={styles.circle}>

            <Image
                source={image}
                style={styles.image}
            />

        </View>

    );

}