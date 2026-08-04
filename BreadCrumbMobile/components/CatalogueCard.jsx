import React from "react";

import {

    TouchableOpacity,

    View,

    Text,

    Image

} from "react-native";

import styles from "../styles/CatalogueCardStyles";
import { useTheme } from "../context/ThemeContext";

export default function CatalogueCard({

    logo,

    validUntil,

    onPress

}) {
    const { getFontSize } = useTheme();

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
                <Text
                    style={[
                        styles.valid,
                        {
                            fontSize: getFontSize(13)
                        }
                    ]}
                >
                    Valid
                </Text>

                <Text
                    style={[
                        styles.date,
                        {
                            fontSize: getFontSize(13)
                        }
                    ]}
                >
                    {validUntil}
                </Text>
            </View>
        </TouchableOpacity>
    );
}