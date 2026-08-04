import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { auth } from "../services/firebase";

import api from "../services/api";

import styles from "../styles/DashboardHeaderStyles";

import { useTheme } from "../context/ThemeContext";

export default function DashboardHeader({

    notifications = 2,

    navigation

}) {

    const [userData, setUserData] = useState(null);
    const { colors, getFontSize } = useTheme();

    useEffect(() => {

        async function loadUser() {

            try {

                const currentUser = auth.currentUser;

                if (!currentUser) return;

                const token = await currentUser.getIdToken();

                const response = await api.get(
                    "/auth/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setUserData(response.data.user);

            }

            catch (error) {

                console.log("Dashboard Error:");
                console.log(error.response?.data || error.message);
            }

        }
        loadUser();

    }, []);

    const hour = new Date().getHours();

    let greeting = "Good Morning";

    if (hour >= 12 && hour < 17) {

        greeting = "Good Afternoon";

    }

    else if (hour >= 17) {

        greeting = "Good Evening";

    }

    const fullName = userData?.fullName || "";

    const firstName = fullName ? fullName.split(" ")[0] : "";

    const initial = firstName
    ? firstName.charAt(0).toUpperCase()
    : "?";

    return (

        <View style={styles.container}>
            <View style={styles.leftSection}>
                <Text
                    style={[
                        styles.greeting,
                        {
                            color: colors.secondary,
                            fontSize: getFontSize(16)
                        }
                    ]}
                >
                    {greeting},
                </Text>

                <Text
                    style={[
                        styles.userName,
                        {
                            color: colors.text,
                            fontSize: getFontSize(28)
                        }
                    ]}
                >
                    {firstName}
                </Text>
            </View>

            <View style={styles.rightSection}>
                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <View style={styles.avatar}>

                        <Text
                            style={[
                                styles.initial,
                                {
                                    fontSize: getFontSize(22)
                                }
                            ]}
                        >
                            {initial}
                        </Text>
                    </View>

                    {
                        notifications > 0 && (
                            <TouchableOpacity
                                style={styles.badge}
                                onPress={() => navigation.navigate("Notifications")}

                            >
                                <Text style={styles.badgeText}>
                                    {notifications}
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
}