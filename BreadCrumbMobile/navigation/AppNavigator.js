import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import OnboardingOne from "../screens/OnboardingOne";
import OnboardingTwo from "../screens/OnboardingTwo";
import OnboardingThree from "../screens/OnboardingThree";
import LoggedOut from "../screens/LoggedOut";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";
import Dashboard from "../screens/Dashboard";
import Search from "../screens/Search";
import ShoppingLists from "../screens/ShoppingLists";
import Alerts from "../screens/Alerts";
import Profile from "../screens/Profile";
import ProductDetails from "../screens/ProductDetails";
import CategoryProducts from "../screens/CategoryProducts";
import Catalogue from "../screens/Catalogue";
import ComparePrice from "../screens/ComparePrice";
import ShoppingListDetails from "../screens/ShoppingListDetails";
import SmartBasketScreen from "../screens/SmartBasketScreen";
import SavingsScreen from "../screens/SavingsScreen";
import HelpScreen from "../screens/HelpScreen";
import AboutScreen from "../screens/AboutScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import AppearanceScreen from "../screens/AppearanceScreen";
import TextSizeScreen from "../screens/TextSizeScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

    return (

        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false
                }}
            >

                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                />

                <Stack.Screen
                    name="OnboardingOne"
                    component={OnboardingOne}
                />

                <Stack.Screen
                    name="OnboardingTwo"
                    component={OnboardingTwo}
                />

                <Stack.Screen
                    name="OnboardingThree"
                    component={OnboardingThree}
                />

                <Stack.Screen
                    name="LoggedOut"
                    component={LoggedOut}
                />

                <Stack.Screen
                    name="Signup"
                    component={Signup}
                />

                <Stack.Screen
                    name="Login"
                    component={Login}
                />

                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                />

                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                />

                <Stack.Screen
                    name="Search"
                    component={Search}
                />

                <Stack.Screen
                    name="ShoppingLists"
                    component={ShoppingLists}
                />

                <Stack.Screen
                    name="Alerts"
                    component={Alerts}
                />

                <Stack.Screen
                    name="Profile"
                    component={Profile}
                />

                <Stack.Screen
                    name="ProductDetails"
                    component={ProductDetails}
                />

                <Stack.Screen
                    name="CategoryProducts"
                    component={CategoryProducts}
                />

                <Stack.Screen
                    name="Catalogue"
                    component={Catalogue}
                />

                <Stack.Screen
                    name="ComparePrice"
                    component={ComparePrice}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="ShoppingListDetails"
                    component={ShoppingListDetails}
                />
                
                <Stack.Screen
                    name="SmartBasket"
                    component={SmartBasketScreen}
                />

                <Stack.Screen
                    name="SavingsScreen"
                    component={SavingsScreen}
                />

                <Stack.Screen
                    name="HelpScreen"
                    component={HelpScreen}
                />

                <Stack.Screen
                    name="AboutScreen"
                    component={AboutScreen}
                />

                <Stack.Screen
                    name="EditProfile"
                    component={EditProfileScreen}
                />

                <Stack.Screen
                    name="Appearance"
                    component={AppearanceScreen}
                />

                <Stack.Screen
                    name="TextSize"
                    component={TextSizeScreen}
                />

            </Stack.Navigator>

        </NavigationContainer>

    );

}