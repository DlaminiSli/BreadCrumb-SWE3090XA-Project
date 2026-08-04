import React from "react";

import {

    View,

    Text,

    Image,

    TouchableOpacity

} from "react-native";

import styles from "../styles/CategoryCardStyles";
import { useTheme } from "../context/ThemeContext";

export default function CategoryCard({

    title,

    image,

    onPress

}) {
    const { colors, getFontSize } = useTheme();

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
                style={[
            styles.title,
            {
                color: colors.text,
                fontSize: getFontSize(13)
            }
        ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}