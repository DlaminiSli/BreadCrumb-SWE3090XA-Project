import { StyleSheet } from "react-native";

import Colors from "../styles/Colors";

import Fonts from "../styles/Fonts";

const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: Colors.white,

        paddingHorizontal: 28,

        paddingTop: 55,

        paddingBottom: 35

    },

    skipButton: {

        alignSelf: "flex-end"

    },

    skipText: {

        color: Colors.secondary,

        fontSize: Fonts.body

    },

    imageContainer: {

        flex: 1,

        justifyContent: "center",

        alignItems: "center"

    },

    bottomContainer: {

        alignItems: "center"

    },

    title: {

        fontSize: 30,

        fontWeight: "700",

        color: Colors.secondary,

        marginTop: 20,

        textAlign: "center"

    },

    description: {

        marginTop: 8,

        textAlign: "center",

        color: Colors.gray,

        fontSize: Fonts.body,

        lineHeight: 22,

        width: "90%"

    }

});

export default styles;