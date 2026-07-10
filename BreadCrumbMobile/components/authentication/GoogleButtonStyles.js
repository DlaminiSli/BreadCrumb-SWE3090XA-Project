import { StyleSheet } from "react-native";

import Colors from "../../styles/Colors";

export default StyleSheet.create({

    button: {

        height: 58,

        borderRadius: 15,

        backgroundColor: Colors.white,

        borderWidth: 1,

        borderColor: "#DDDDDD",

        flexDirection: "row",

        justifyContent: "center",

        alignItems: "center",

        marginBottom: 25

    },

    logo: {

        width: 24,

        height: 24,

        resizeMode: "contain",

        marginRight: 15

    },

    text: {

        fontSize: 17,

        color: Colors.text,

        fontWeight: "600"

    }

});