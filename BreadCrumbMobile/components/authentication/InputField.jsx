import React from "react";

import {

    View,

    TextInput

} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./InputFieldStyles";

export default function InputField({

    icon,

    placeholder,

    value,

    onChangeText,

    keyboardType = "default"

}) {

    return (

        <View style={styles.container}>

            <Ionicons

                name={icon}

                size={22}

                color="#777"

                style={styles.icon}

            />

            <TextInput

                style={styles.input}

                placeholder={placeholder}

                placeholderTextColor="#999"

                keyboardType={keyboardType}

                value={value}

                onChangeText={onChangeText}

            />

        </View>

    );

}