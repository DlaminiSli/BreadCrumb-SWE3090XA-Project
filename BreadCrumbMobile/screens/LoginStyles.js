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

        width: 45,

        marginBottom: 15

    },

    logoContainer: {

        width: 115,

        height: 115,

        borderRadius: 57.5,

        backgroundColor: Colors.primary,

        justifyContent: "center",

        alignItems: "center",

        alignSelf: "center",

        marginBottom: 18,

        shadowColor: "#000",

        shadowOpacity: 0.15,

        shadowRadius: 12,

        shadowOffset: {

            width: 0,

            height: 6

        },

        elevation: 8

    },

    logo: {

        width: 75,

        height: 75,

        resizeMode: "contain"

    },

    title: {

        fontSize: 30,

        fontWeight: "700",

        color: Colors.text,

        textAlign: "center"

    },

    subtitle: {

        marginTop: 10,

        marginBottom: 25,

        textAlign: "center",

        color: Colors.gray,

        fontSize: 15,

        lineHeight: 22

    },

    optionsRow: {

        flexDirection: "row",

        justifyContent: "space-between",

        alignItems: "center",

        marginBottom: 22

    },

    rememberContainer: {

        flexDirection: "row",

        alignItems: "center"

    },

    rememberText: {

        marginLeft: 8,

        color: Colors.text,

        fontSize: 15

    },

    forgotText: {

        color: Colors.text,

        fontWeight: "600",

        fontSize: 14

    },

    googleCaption: {

        textAlign: "center",

        marginTop: -15,

        marginBottom: 20,

        color: Colors.gray,

        fontSize: 12

    },

    signupContainer: {

        flexDirection: "row",

        justifyContent: "center",

        alignItems: "center",

        marginBottom: 35

    },

    signupLabel: {

        color: Colors.gray,

        fontSize: 15

    },

    signupText: {

        marginLeft: 5,

        color: Colors.text,

        fontWeight: "700",

        fontSize: 15

    }

});