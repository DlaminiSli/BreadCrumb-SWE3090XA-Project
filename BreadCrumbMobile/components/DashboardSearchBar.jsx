import React, { useState } from "react";

import {

    View,

    TextInput,

    TouchableOpacity

} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/DashboardSearchBarStyles";

import { useTheme } from "../context/ThemeContext";

export default function DashboardSearchBar({

    navigation

}) {

    const [search, setSearch] = useState("");
    const { colors, getFontSize } = useTheme();

    return (

        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("Search")}
        >
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.card,
                        borderColor: colors.border
                    }
                ]}
            >

                <Ionicons
                    name="search"
                    size={22}
                    color={colors.secondary}
                />

                <TextInput
                    style={[
                        styles.input,
                        {
                            color: colors.text,
                            fontSize: getFontSize(15)
                        }
                    ]}
                    placeholder="Search products, brands, stores..."
                    placeholderTextColor={colors.secondary}
                    value={search}
                    onChangeText={setSearch}
                    returnKeyType="search"
                    onSubmitEditing={() =>
                        navigation.navigate("Search", {
                            query: search
                        })
                    }
                />

                <TouchableOpacity>
                    <Ionicons
                        name="mic-outline"
                        size={22}
                        color={colors.secondary}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.filterButton}>

                    <Ionicons
                        name="options-outline"
                        size={22}
                        color={colors.text}
                    />

                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}