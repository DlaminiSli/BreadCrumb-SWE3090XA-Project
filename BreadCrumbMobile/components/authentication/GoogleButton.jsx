import React from "react";

import {
    TouchableOpacity,
    Text,
    Image
} from "react-native";

import styles from "./GoogleButtonStyles";

export default function GoogleButton({ onPress }) {

    return (

        <TouchableOpacity

            style={styles.button}

            onPress={onPress}

        >

            <Image

                source={require("../../assets/images/auth/google.png")}

                style={styles.logo}

            />

            <Text style={styles.text}>

                Continue with Google

            </Text>

        </TouchableOpacity>

    );

}