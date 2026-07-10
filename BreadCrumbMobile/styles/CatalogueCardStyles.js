import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {

        width: 72,

        alignItems: "center",

        marginRight: 10

    },

    circle: {

        width: 60,

        height: 60,

        borderRadius: 30,

        backgroundColor: "#FFFFFF",

        borderWidth: 1.5,

        borderColor: "#DFFF00",

        justifyContent: "center",

        alignItems: "center",

        zIndex: 2,

        elevation: 3,

        shadowColor: "#000",

        shadowOpacity: 0.10,

        shadowRadius: 4

    },

    logo: {

        width: 44,

        height: 44,

        resizeMode: "contain",

        borderRadius: 22

    },

    validContainer: {

        width: 60,
        height: 70,

        marginTop: -25,

        paddingTop: 12,

        paddingBottom: 12,

        backgroundColor: "#ECECEC",

        borderBottomLeftRadius: 30,

        borderBottomRightRadius: 30,

        alignItems: "center",

        borderBottomWidth: 3,

        borderColor: "#DFFF00",

        shadowColor: "#DFFF00",

        shadowOffset: {

            width: 0,

            height: 4

        },

        shadowOpacity: 0.35,

        shadowRadius: 6,

        elevation: 5

    },
    valid: {

        fontSize: 10,
        marginTop:17,

        color: "#666666"

    },

    date: {

        marginTop: 1,

        fontSize: 10,

        fontWeight: "700",

        color: "#222222",

        textAlign: "center"

    }

});