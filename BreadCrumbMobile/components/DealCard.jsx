import React from "react";

import {
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";

import styles from "../styles/DealCardStyles";

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

                    style={styles.product}

                >

                    {product}

                </Text>

                <Text style={styles.store}>

                    {store}

                </Text>

                <View style={styles.priceRow}>

                    <Text style={styles.oldPrice}>

                        {oldPrice}

                    </Text>

                    <Text style={styles.newPrice}>

                        {newPrice}

                    </Text>

                </View>

                <View style={styles.bottomRow}>

                    <Text style={styles.save}>

                        Save {save}

                    </Text>

                    <Text style={styles.expiry}>

                        {expiry}

                    </Text>

                </View>

            </View>

        </TouchableOpacity>

    );

}