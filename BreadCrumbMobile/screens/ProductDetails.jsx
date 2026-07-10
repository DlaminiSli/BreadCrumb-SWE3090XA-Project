import React from "react";

import {

    View,

    Text

} from "react-native";

export default function ProductDetails() {

    return (

        <View

            style={{

                flex:1,

                justifyContent:"center",

                alignItems:"center"

            }}

        >

            <Text

                style={{

                    fontSize:26,

                    fontWeight:"700"

                }}

            >

                Product Details

            </Text>

        </View>

    );

}