import React from "react";

import {

    View,

    Text,

    Image,

    TouchableOpacity

} from "react-native";

import styles from "../styles/PriceDropCardStyles";
import { useTheme } from "../context/ThemeContext";

export default function PriceDropCard({

    product,

    image,

    store,

    price,

    variant = "topLeft",

    onPress

}) {

    const { getFontSize } = useTheme();

    return (

        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={[
                styles.card,
                styles[variant]
            ]}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={image}
                    style={styles.image}
                />
            </View>

            <View style={styles.info}>
                <Text
                    numberOfLines={1}
                    style={[
                        styles.product,
                        {
                            fontSize: getFontSize(14)
                        }
                    ]}
                >
                    {product}
                </Text>

                <Text
                    style={[
                        styles.store,
                        {
                            fontSize: getFontSize(12)
                        }
                    ]}
                >
                    {store}
                </Text>

                <Text
                    style={[
                        styles.price,
                        {
                            fontSize: getFontSize(15)
                        }
                    ]}
                >
                    {price}
                </Text>
            </View>
        </TouchableOpacity>
    );
}