import React from "react";

import {

    View,

    TouchableOpacity,

    Text

} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/BottomNavigationStyles";

export default function BottomNavigation({

    navigation,

    active

}) {

    const tabs = [

        {

            name: "Home",

            icon: "home",

            screen: "Dashboard"

        },

        {

            name: "Search",

            icon: "search",

            screen: "Search"

        },

        {

            name: "Lists",

            icon: "cart",

            screen: "ShoppingLists"

        },

        {

            name: "Savings",

            icon: "wallet",

            screen: "SavingsScreen"

        },

        {

            name: "Profile",

            icon: "person",

            screen: "Profile"

        }

    ];

    return (

        <View style={styles.container}>

            {

                tabs.map((tab) => (

                    <TouchableOpacity

                        key={tab.name}

                        style={styles.tab}

                        onPress={() => navigation.navigate(tab.screen)}

                    >

                        <Ionicons

                            name={

                                active === tab.name

                                    ? tab.icon

                                    : `${tab.icon}-outline`

                            }

                            size={24}

                            color={

                                active === tab.name

                                    ? "#222222"

                                    : "#999999"

                            }

                        />

                        <Text

                            style={[

                                styles.label,

                                active === tab.name && styles.activeLabel

                            ]}

                        >

                            {tab.name}

                        </Text>

                    </TouchableOpacity>

                ))

            }

        </View>

    );

}