import React from "react";

import {
    SafeAreaView,
    ScrollView,
    RefreshControl,
} from "react-native";

import BottomNavigation from "./BottomNavigation";
import styles from "../styles/ShoppingListDetailsStyles";

export default function ActiveShoppingView({
    children,
    navigation,
    refreshing,
    onRefresh,
}) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#C7D72D"]}
                        tintColor="#C7D72D"
                    />
                }
                showsVerticalScrollIndicator={false}
            >
                {children}

                <SafeAreaView
                    style={{
                        height: 90,
                    }}
                />
            </ScrollView>

            <BottomNavigation
                navigation={navigation}
                active="Lists"
            />
        </SafeAreaView>
    );
}