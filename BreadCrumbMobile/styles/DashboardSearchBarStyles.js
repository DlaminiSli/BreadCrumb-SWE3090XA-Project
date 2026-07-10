import { StyleSheet } from "react-native";

import Colors from "./Colors";

export default StyleSheet.create({

    container: {

        flexDirection: "row",

        alignItems: "center",

        backgroundColor: Colors.white,

        borderRadius: 30,

        paddingHorizontal: 18,

        paddingVertical: 14,

        elevation: 2,

        shadowColor: "#000",

        shadowOpacity: 0.08,

        shadowRadius: 5,

        marginBottom: 10

    },

    input: {

        flex: 1,

        marginLeft: 10,

        fontSize: 15,

        color: Colors.text

    },

    filterButton: {

        marginLeft: 15

    }

});