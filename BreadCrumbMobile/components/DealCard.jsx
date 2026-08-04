import React from "react";

import {
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";

import styles from "../styles/DealCardStyles";
import { useTheme } from "../context/ThemeContext";

export default function DealCard({

    product,
    image,
    store,
    oldPrice,
    newPrice,
    save,
    expiry,
    onPress

}) {

    const { colors, getFontSize } = useTheme();

    return (

        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={onPress}
        >

            <View style={styles.imageSection}>
                <Image
                    source={image}
                    style={styles.image}
                />
            </View>

            <View style={styles.infoSection}>
                <Text
                    numberOfLines={2}
                    style={[
                        styles.product,
                        {
                            fontSize: getFontSize(16)
                        }
                    ]}
                >
                    {product}
                </Text>

                <Text
                    style={[
                        styles.store,
                        {
                            fontSize: getFontSize(13)
                        }
                    ]}
                >
                    {store}
                </Text>

                <View style={styles.priceRow}>
                    <Text
                        style={[
                            styles.oldPrice,
                            {
                                fontSize: getFontSize(13)
                            }
                        ]}
                    >
                        {oldPrice}
                    </Text>

                    <Text
                        style={[
                            styles.newPrice,
                            {
                                fontSize: getFontSize(18)
                            }
                        ]}
                    >
                        {newPrice}
                    </Text>

                </View>

                <View style={styles.bottomRow}>
                    <Text
                        style={[
                            styles.save,
                            {
                                fontSize: getFontSize(13)
                            }
                        ]}
                    >
                        Save {save}
                    </Text>

                    <Text
                        style={[
                            styles.expiry,
                            {
                                fontSize: getFontSize(12)
                            }
                        ]}
                    >
                        {expiry}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}