import { StyleSheet } from "react-native";

import Colors from "./Colors";

export default StyleSheet.create({

    container: {

        width: "19%",

        alignItems: "center",

        marginBottom: 12

    },

    circle: {

        width: 58,

        height: 58,

        borderRadius: 29,

        backgroundColor: "#FFF8C6",

        justifyContent: "center",

        alignItems: "center",

        elevation: 2,

        shadowColor: "#000",

        shadowOpacity: 0.06,

        shadowRadius: 4

    },

    image: {

        width: 34,

        height: 34,

        resizeMode: "contain"

    },

    title: {

        marginTop: 6,

        fontSize: 11,

        textAlign: "center",

        color: Colors.text,

        fontWeight: "600"

    }

});