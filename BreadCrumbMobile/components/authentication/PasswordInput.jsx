import React, { useState } from "react";

import {
    View,
    TextInput,
    TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./PasswordInputStyles";

export default function PasswordInput({

    placeholder,

    value,

    onChangeText

}) {

    const [hidePassword, setHidePassword] = useState(true);

    return (

        <View style={styles.container}>

            <Ionicons

                name="lock-closed-outline"

                size={22}

                color="#777"

                style={styles.icon}

            />

            <TextInput

                style={styles.input}

                placeholder={placeholder}

                placeholderTextColor="#999"

                secureTextEntry={hidePassword}

                value={value}

                onChangeText={onChangeText}

            />

            <TouchableOpacity

                onPress={() => setHidePassword(!hidePassword)}

            >

                <Ionicons

                    name={

                        hidePassword

                            ? "eye-outline"

                            : "eye-off-outline"

                    }

                    size={22}

                    color="#777"

                />

            </TouchableOpacity>

        </View>

    );

}