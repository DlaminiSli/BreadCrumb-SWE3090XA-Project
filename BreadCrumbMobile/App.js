import React from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import AppNavigator from "./navigation/AppNavigator";

import {
    ShoppingProvider
} from "./context/ShoppingContext";

import {
    ThemeProvider
} from "./context/ThemeContext";

export default function App() {

    return (

        <GestureHandlerRootView style={{ flex: 1 }}>

            <ThemeProvider>

                <ShoppingProvider>

                    <AppNavigator />

                </ShoppingProvider>

            </ThemeProvider>

        </GestureHandlerRootView>

    );

}