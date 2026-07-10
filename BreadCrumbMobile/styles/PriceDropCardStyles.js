import { StyleSheet } from "react-native";

import Colors from "./Colors";

export default StyleSheet.create({

    card: {

        width: "48%",

        height: 82,

        backgroundColor: "#FFFFFF",

        flexDirection: "row",

        alignItems: "center",

        paddingHorizontal: 10,

        marginBottom: 12,

        elevation: 4,

        shadowColor: "#FFD600",

        shadowOffset: {

            width: 0,

            height: 2

        },

        shadowOpacity: 0.25,

        shadowRadius: 6

    },

    topLeft: {

        borderTopLeftRadius: 26,

        borderTopRightRadius: 0,

        borderBottomLeftRadius: 0,

        borderBottomRightRadius: 0,

        borderBottomWidth: 4,

        borderBottomColor: "#FFD600"

    },

    topRight: {

        borderTopLeftRadius: 0,

        borderTopRightRadius: 26,

        borderBottomLeftRadius: 0,

        borderBottomRightRadius: 0,

        borderBottomWidth: 4,

        borderBottomColor: "#FFD600"

    },

    bottomLeft: {

        borderTopLeftRadius: 0,

        borderTopRightRadius: 0,

        borderBottomLeftRadius: 26,

        borderBottomRightRadius: 0,

        borderBottomWidth: 4,

        borderBottomColor: "#FFD600"

    },

    bottomRight: {

        borderTopLeftRadius: 0,

        borderTopRightRadius: 0,

        borderBottomLeftRadius: 0,

        borderBottomRightRadius: 26,

        borderBottomWidth: 4,

        borderBottomColor: "#FFD600"

    },

    imageContainer: {

        width: 42,

        alignItems: "center",

        justifyContent: "center"

    },

    image: {

        width: 34,

        height: 34,

        resizeMode: "contain"

    },

    info: {

        flex: 1,

        marginLeft: 8

    },

    product: {

        fontSize: 10,

        fontWeight: "700",

        color: Colors.text

    },

    store: {

        fontSize: 9,

        color: Colors.lightText,

        marginTop: 2

    },

    price: {

        marginTop: 2,

        fontSize: 10,

        color: "#2E7D32",

        fontWeight: "800"

    }

});