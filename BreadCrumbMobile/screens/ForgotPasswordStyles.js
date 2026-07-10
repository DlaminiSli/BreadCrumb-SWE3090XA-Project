import { StyleSheet } from "react-native";

import Colors from "../styles/Colors";

export default StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: "#F5F6F8",

        paddingHorizontal: 25

    },

    backButton: {

        marginTop: 55,

        width: 40,

        marginBottom: 15

    },

    iconContainer: {

        width: 120,

        height: 120,

        borderRadius: 60,

        backgroundColor: Colors.primary,

        justifyContent: "center",

        alignItems: "center",

        alignSelf: "center",

        marginBottom: 20,

        elevation: 6

    },

    title: {

        fontSize: 30,

        fontWeight: "700",

        textAlign: "center",

        color: Colors.text

    },

    subtitle: {

        textAlign: "center",

        color: Colors.gray,

        marginTop: 10,

        marginBottom: 30,

        lineHeight: 22

    },

    loginButton: {

        alignSelf: "center",

        marginTop: 20

    },

    loginText: {

        color: Colors.text,

        fontWeight: "700",

        fontSize: 15

    }

});