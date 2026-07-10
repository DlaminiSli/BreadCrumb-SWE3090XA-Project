import React from "react";

import {

    View,

    Text,

    Image,

    TouchableOpacity

} from "react-native";

import styles from "../styles/CategoryCardStyles";

export default function CategoryCard({

    title,

    image,

    onPress

}) {

    return (

        <TouchableOpacity

            style={styles.container}

            activeOpacity={0.8}

            onPress={onPress}

        >

            <View style={styles.circle}>

                <Image

                    source={image}

                    style={styles.image}

                />

            </View>

            <Text

                numberOfLines={1}

                style={styles.title}

            >

                {title}

            </Text>

        </TouchableOpacity>

    );

}