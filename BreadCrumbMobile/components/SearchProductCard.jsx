import React from "react";

import {

    View,

    Text,

    Image,

    TouchableOpacity

} from "react-native";

import styles from "../styles/SearchProductCardStyles";

export default function SearchProductCard({

    image,

    product,

    store,

    price,

    save,

    onPress

}) {

    return (

        <TouchableOpacity

            style={styles.card}

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

                    style={styles.product}

                >

                    {product}

                </Text>

                <Text style={styles.store}>

                    📍 {store}

                </Text>

                <View style={styles.priceRow}>

                    <Text style={styles.price}>

                        {price}

                    </Text>

                    <View style={styles.saveBadge}>

                        <Text style={styles.saveText}>

                            {save}

                        </Text>

                    </View>

                </View>

            </View>

            <TouchableOpacity

                style={styles.compareButton}

                onPress={onPress}

            >

                <Text style={styles.compareText}>

                    Compare →

                </Text>

            </TouchableOpacity>

        </TouchableOpacity>

    );

}