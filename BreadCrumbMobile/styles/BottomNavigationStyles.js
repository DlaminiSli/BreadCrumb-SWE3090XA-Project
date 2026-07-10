import { StyleSheet } from "react-native";

import Colors from "./Colors";

export default StyleSheet.create({

    container: {

        flexDirection: "row",

        justifyContent: "space-around",

        alignItems: "center",

        backgroundColor: Colors.white,

        paddingVertical: 12,

        borderTopWidth: 1,

        borderColor: Colors.border,

        position: "absolute",

        bottom: 0,

        left: 0,

        right: 0,

        elevation: 12,

        shadowColor: "#000",

        shadowOpacity: 0.08,

        shadowRadius: 8

    },

    tab: {

        alignItems: "center",

        justifyContent: "center"

    },

    label: {

        marginTop: 5,

        fontSize: 11,

        color: Colors.lightText

    },

    activeLabel: {

        color: Colors.text,

        fontWeight: "700"

    }

});