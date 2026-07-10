import React from "react";

import {

    View,

    TextInput,

    TouchableOpacity

} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/DashboardSearchBarStyles";

export default function DashboardSearchBar({

    navigation

}) {

    return (

        <TouchableOpacity

            activeOpacity={1}

            onPress={() => navigation.navigate("Search")}

        >

            <View style={styles.container}>

                <Ionicons

                    name="search"

                    size={22}

                    color="#888"

                />

                <TextInput

                    placeholder="Search products, brands, stores..."

                    placeholderTextColor="#999"

                    editable={false}

                    style={styles.input}

                />

                <TouchableOpacity>

                    <Ionicons

                        name="mic-outline"

                        size={22}

                        color="#666"

                    />

                </TouchableOpacity>

                <TouchableOpacity style={styles.filterButton}>

                    <Ionicons

                        name="options-outline"

                        size={22}

                        color="#222"

                    />

                </TouchableOpacity>

            </View>

        </TouchableOpacity>

    );

}