import { StyleSheet } from "react-native";

import Colors from "./Colors";

export default StyleSheet.create({

    card: {

        width: 128,

        borderRadius: 16,

        overflow: "hidden",

        backgroundColor: "#FFFFFF",

        marginRight: 8,

        elevation: 3,

        shadowColor: "#000",

        shadowOffset: {

            width: 0,

            height: 2

        },

        shadowOpacity: 0.08,

        shadowRadius: 4

    },

    imageSection: {

        height: 78,

        backgroundColor: "#FFF6B3",

        justifyContent: "center",

        alignItems: "center"

    },

    image: {

        width: 78,

        height: 78,

        resizeMode: "contain"

    },

    infoSection: {

        backgroundColor: "#FFFFFF",

        paddingHorizontal: 8,

        paddingVertical: 8

    },

    product: {

        fontSize: 10,

        fontWeight: "700",

        color: Colors.text,

        minHeight: 26

    },

    store: {

        marginTop: 2,

        fontSize: 9,

        color: Colors.lightText

    },

    priceRow: {

        flexDirection: "row",

        alignItems: "center",

        marginTop: 5

    },

    oldPrice: {

        textDecorationLine: "line-through",

        color: Colors.lightText,

        fontSize: 9,

        marginRight: 6

    },

    newPrice: {

        color: "#D32F2F",

        fontWeight: "800",

        fontSize: 14

    },

    bottomRow: {

        marginTop: 6

    },

    save: {

        color: "#D32F2F",

        fontWeight: "700",

        fontSize: 9

    },

    expiry: {

        marginTop: 2,

        color: Colors.lightText,

        fontSize: 8

    }

});