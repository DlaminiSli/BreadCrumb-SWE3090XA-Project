import React from "react";
import {
    View,
    Text,
    TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/NotificationCardStyles";

export default function NotificationCard({

    notification,

    onRead,

    onDelete

}) {

    return (

        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.titleRow}>
                    <View
                        style={[
                            styles.dot,
                            {
                                backgroundColor:
                                    notification.isRead
                                        ? "#BDBDBD"
                                        : "#C7D72D"
                            }
                        ]}
                    />

                    <Text style={styles.title}>
                        {notification.title}
                    </Text>
                </View>

                <Text style={styles.date}>
                    {new Date(notification.createdAt).toLocaleDateString()}
                </Text>
            </View>

            <Text style={styles.message}>
                {notification.message}
            </Text>

            <View style={styles.actions}>
                {
                    !notification.isRead && (
                        <TouchableOpacity
                            style={styles.readButton}
                            onPress={() => onRead(notification._id)}
                        >

                            <Ionicons
                                name="checkmark-circle-outline"
                                size={18}
                                color="#FFF"
                            />

                            <Text style={styles.readText}>
                                Mark as Read
                            </Text>

                        </TouchableOpacity>
                    )
                }

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDelete(notification._id)}

                >

                    <Ionicons
                        name="trash-outline"
                        size={18}
                        color="#FFF"
                    />

                    <Text style={styles.deleteText}>
                        Delete
                    </Text>

                </TouchableOpacity>
            </View>
        </View>
    );
}