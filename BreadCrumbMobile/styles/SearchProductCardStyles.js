import { StyleSheet } from "react-native";

import Colors from "./Colors";

export default StyleSheet.create({

    card: {

        flexDirection: "row",

        marginHorizontal: 2,

        alignItems: "center",

        backgroundColor: "#FFFFFF",

        borderRadius: 18,

        padding: 12,

        marginBottom: 14,

        elevation: 3,

        shadowColor: "#000",

        shadowOffset: {

            width: 0,

            height: 2

        },

        shadowOpacity: 0.08,

        shadowRadius: 4

    },

    image: {

        width: 70,

        height: 70,

        resizeMode: "contain",

        marginRight: 12

    },

    details: {

        flex: 1

    },

    product: {

        fontSize: 14,

        fontWeight: "700",

        color: Colors.text

    },

    store: {

        marginTop: 4,

        fontSize: 12,

        color: Colors.lightText

    },

    priceRow: {

        flexDirection: "row",

        alignItems: "center",

        marginTop: 8

    },

    price: {

        fontSize: 18,

        fontWeight: "800",

        color: "#D32F2F"

    },

    saveBadge: {

        marginLeft: 10,

        backgroundColor: "#DFFF00",

        paddingHorizontal: 10,

        paddingVertical: 4,

        borderRadius: 12

    },

    saveText: {

        fontSize: 11,

        fontWeight: "700",

        color: "#222"

    },

    compareButton: {

        backgroundColor: "#cde81948",

        paddingHorizontal: 14,

        paddingVertical: 10,

        borderRadius: 14,

        justifyContent: "center",

        alignItems: "center",

        marginLeft: 10

    },

    compareText: {

        fontSize: 12,

        fontWeight: "700",

        color: "#222"

    }

});