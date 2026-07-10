import React, {

    createContext,

    useContext,

    useEffect,

    useState

} from "react";

import {

    Appearance

} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [appearance, setAppearance] = useState("system");

    const [textSize, setTextSize] = useState("medium");

    const [systemTheme, setSystemTheme] = useState(

        Appearance.getColorScheme() || "light"

    );

    useEffect(() => {

        loadSettings();

        const listener = Appearance.addChangeListener(

            ({ colorScheme }) => {

                setSystemTheme(

                    colorScheme || "light"

                );

            }

        );

        return () => listener.remove();

    }, []);

    async function loadSettings() {

        try {

            const savedAppearance = await AsyncStorage.getItem(

                "appearance"

            );

            const savedTextSize = await AsyncStorage.getItem(

                "textSize"

            );

            if (savedAppearance) {

                setAppearance(savedAppearance);

            }

            if (savedTextSize) {

                setTextSize(savedTextSize);

            }

        }

        catch (error) {

            console.log(error);

        }

    }

    async function changeAppearance(mode) {

        setAppearance(mode);

        await AsyncStorage.setItem(

            "appearance",

            mode

        );

    }

    async function changeTextSize(size) {

        setTextSize(size);

        await AsyncStorage.setItem(

            "textSize",

            size

        );

    }

    const theme =

        appearance === "system"

            ? systemTheme

            : appearance;

            const colors =

                theme === "dark"

        ? {

            background:"#121212",

            card:"#1E1E1E",

            text:"#FFFFFF",

            secondary:"#B5B5B5",

            border:"#333333",

            accent:"#C7D72D"

        }

        : {

            background:"#F6F7FB",

            card:"#FFFFFF",

            text:"#222222",

            secondary:"#666666",

            border:"#EEEEEE",

            accent:"#22A45D"

        };

    function getFontSize(size) {

        switch (textSize) {

            case "small":

                return size - 2;

            case "large":

                return size + 2;

            default:

                return size;

        }

    }

    return (

        <ThemeContext.Provider

            value={{

                appearance,

                changeAppearance,

                textSize,

                changeTextSize,

                theme,

                colors,

                getFontSize

            }}

        >

            {children}

        </ThemeContext.Provider>

    );

}

export function useTheme() {

    return useContext(

        ThemeContext

    );

}