import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { auth } from "../services/firebase";

import {
    doc,
    getDoc
} from "firebase/firestore";

import { db } from "../services/firebase";

import styles from "../styles/DashboardHeaderStyles";

export default function DashboardHeader({

    notifications = 2,

    navigation

}) {

    const [userData, setUserData] = useState(null);

    useEffect(() => {

        async function loadUser() {

            try {

                const currentUser = auth.currentUser;

                if (!currentUser) return;

                const snapshot = await getDoc(

                    doc(

                        db,

                        "users",

                        currentUser.uid

                    )

                );

                if (snapshot.exists()) {

                    setUserData(snapshot.data());

                }

            }

            catch (error) {

                console.log(error);

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

    const fullName = userData?.fullName || "Shopper";

    const firstName = fullName.split(" ")[0];

    const initial = firstName.charAt(0).toUpperCase();

    return (

        <View style={styles.container}>

            <View style={styles.leftSection}>

                <Text style={styles.greeting}>

                    {greeting},

                </Text>

                <Text style={styles.userName}>

                    {firstName}

                </Text>

            </View>

            <View style={styles.rightSection}>

                <TouchableOpacity

                    style={styles.profileButton}

                    onPress={() => navigation.navigate("Profile")}

                >

                    <View style={styles.avatar}>

                        <Text style={styles.initial}>

                            {initial}

                        </Text>

                    </View>

                    {

                        notifications > 0 && (

                            <View style={styles.badge}>

                                <Text style={styles.badgeText}>

                                    {notifications}

                                </Text>

                            </View>

                        )

                    }

                </TouchableOpacity>

            </View>

        </View>

    );

}