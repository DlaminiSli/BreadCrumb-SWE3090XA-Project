import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { auth } from "../services/firebase";
import api from "../services/api";

import NotificationCard from "../components/NotificationCard";

import styles from "../styles/NotificationsStyles";

export default function Notifications({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = await auth.currentUser.getIdToken();

      const response = await api.get("/alerts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(response.data);
    } catch (error) {
      console.log("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = await auth.currentUser.getIdToken();

      await api.put(
        `/alerts/${id}/read`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update only the clicked notification
      setNotifications((previous) =>
        previous.map((notification) =>
          notification._id === id
            ? {
                ...notification,
                isRead: true,
              }
            : notification,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };
  const deleteNotification = async (id) => {
    try {
      const token = await auth.currentUser.getIdToken();

      await api.put(
        `/alerts/${id}/delete`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Remove the notification immediately
      setNotifications((previous) =>
        previous.filter((notification) => notification._id !== id),
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C7D72D" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#222" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        <View style={{ width: 26 }} />
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="notifications-off-outline"
            size={90}
            color="#C7D72D"
          />

          <Text style={styles.emptyTitle}>No Notifications</Text>

          <Text style={styles.emptySubtitle}>You're all caught up!</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <NotificationCard
              notification={item}
              onRead={markAsRead}
              onDelete={deleteNotification}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
