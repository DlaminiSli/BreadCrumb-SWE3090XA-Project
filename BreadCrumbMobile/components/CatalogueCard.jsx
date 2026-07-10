import React from "react";

import {

    TouchableOpacity,

    View,

    Text,

    Image

} from "react-native";

import styles from "../styles/CatalogueCardStyles";

export default function CatalogueCard({

    logo,

    validUntil,

    onPress

}) {

    return (

        <TouchableOpacity

            style={styles.container}

            activeOpacity={0.9}

            onPress={onPress}

        >

            <View style={styles.circle}>

                <Image

                    source={logo}

                    style={styles.logo}

                />

            </View>

            <View style={styles.validContainer}>

                <Text style={styles.valid}>

                    Valid

                </Text>

                <Text style={styles.date}>

                    {validUntil}

                </Text>

            </View>

        </TouchableOpacity>

    );

}