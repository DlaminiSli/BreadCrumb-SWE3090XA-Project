import React from "react";

import {

    View,

    Text,

    Image,

    TouchableOpacity

} from "react-native";

import styles from "../styles/PriceDropCardStyles";

export default function PriceDropCard({

    product,

    image,

    store,

    price,

    variant = "topLeft",

    onPress

}) {

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

                    style={styles.product}

                >

                    {product}

                </Text>

                <Text style={styles.store}>

                    {store}

                </Text>

                <Text style={styles.price}>

                    {price}

                </Text>

            </View>

        </TouchableOpacity>

    );

}