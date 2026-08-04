import React from "react";

import {

    View,

    Text,

    Image,

    TouchableOpacity

} from "react-native";

import styles from "../styles/SearchProductCardStyles";
import { useTheme } from "../context/ThemeContext";

export default function SearchProductCard({

    image,

    product,

    store,

    price,

    save,

    onPress

}) {
    const { colors, getFontSize } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.card,
                {
                    backgroundColor: colors.card
                }
            ]}
            activeOpacity={0.9}
            onPress={onPress}
        >
            <Image
                source={image}
                style={styles.image}
            />
            <View style={styles.details}>
                <Text
                    numberOfLines={2}
                    style={[
                        styles.product,
                        {
                            color: colors.text,
                            fontSize: getFontSize(17)
                        }
                    ]}
                >
                    {product}
                </Text>
                <Text
                    style={[
                        styles.store,
                        {
                            color: colors.secondary,
                            fontSize: getFontSize(13)
                        }
                    ]}
                >
                    📍 {store}
                </Text>
                <View style={styles.priceRow}>
                    <Text
                        style={[
                            styles.price,
                            {
                                fontSize: getFontSize(22)
                            }
                        ]}
                    >
                        {price}
                    </Text>

                    <View style={styles.saveBadge}>
                        <Text
                            style={[
                                styles.saveText,
                                {
                                    fontSize: getFontSize(12)
                                }
                            ]}
                        >
                            {save}
                        </Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={styles.compareButton}
                onPress={onPress}
            >
                <Text
                    style={[
                        styles.compareText,
                        {
                            color: colors.text,
                            fontSize: getFontSize(14)
                        }
                    ]}
                >
                    Compare →
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}