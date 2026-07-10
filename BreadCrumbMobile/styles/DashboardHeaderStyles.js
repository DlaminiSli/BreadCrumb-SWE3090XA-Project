import { StyleSheet } from "react-native";

import Colors from "./Colors";

export default StyleSheet.create({

    container: {

        flexDirection: "row",

        justifyContent: "space-between",

        alignItems: "center",

        marginTop: 30,

        marginBottom: 20

},
    leftSection: {

        flex: 1

    },

    greeting: {

        fontSize: 16,

        color: Colors.lightText,

        marginBottom: 3

    },

    userName: {

        fontSize: 20,

        fontWeight: "700",

        color: Colors.text

    },

    rightSection: {

        justifyContent: "center",

        alignItems: "center"

    },

    profileButton: {

        position: "relative"

    },

    avatar: {

        width: 50,

        height: 50,

        borderRadius: 25,

        backgroundColor: Colors.primary,

        justifyContent: "center",

        alignItems: "center"

    },

    initial: {

        fontSize: 24,

        fontWeight: "600",

        color: "#222"

    },

    badge: {

        position: "absolute",

        top: -3,

        right: -3,

        backgroundColor: "#E53935",

        width: 22,

        height: 22,

        borderRadius: 11,

        justifyContent: "center",

        alignItems: "center",

        borderWidth: 2,

        borderColor: "#FFF"

    },

    badgeText: {

        color: "#FFF",

        fontSize: 11,

        fontWeight: "700"

    }

});