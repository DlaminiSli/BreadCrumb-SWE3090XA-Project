import React from "react";

import {
    TouchableOpacity,
    Text
} from "react-native";

import Colors from "../styles/Colors";

export default function PrimaryButton({

    title,
    onPress

}) {

    return (

        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: Colors.primary,
                width: "100%",
                height: 55,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20
            }}
        >

            <Text
                style={{
                    color: Colors.secondary,
                    fontSize: 18,
                    fontWeight: "bold"
                }}
            >
                {title}
            </Text>

        </TouchableOpacity>
    );
}