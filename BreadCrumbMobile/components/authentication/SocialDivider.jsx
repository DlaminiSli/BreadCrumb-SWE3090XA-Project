import React from "react";

import {
    View,
    Text
} from "react-native";

import styles from "./SocialDividerStyles";

export default function SocialDivider() {

    return (

        <View style={styles.container}>

            <View style={styles.line} />

            <Text style={styles.text}>

                OR CONTINUE WITH

            </Text>

            <View style={styles.line} />

        </View>

    );

}