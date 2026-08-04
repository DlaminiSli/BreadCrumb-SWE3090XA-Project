import { StyleSheet } from "react-native";

export default StyleSheet.create({

    card: {
        backgroundColor: "#FFF",
        marginHorizontal: 20,
        marginTop: 15,
        borderRadius: 18,
        padding: 18,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.08,
        shadowRadius: 6,

        elevation: 3
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },

    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10
    },

    title: {
        fontSize: 17,
        fontWeight: "700",
        color: "#222",
        flex: 1
    },

    date: {
        fontSize: 12,
        color: "#888"
    },

    message: {
        fontSize: 15,
        color: "#555",
        lineHeight: 22,
        marginBottom: 18
    },

    actions: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    readButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "#C7D72D",

        paddingVertical: 10,
        paddingHorizontal: 18,

        borderRadius: 25,

        flex: 1,
        marginRight: 10
    },

    readText: {
        color: "#FFF",
        fontWeight: "700",
        marginLeft: 6
    },

    deleteButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "#E74C3C",

        paddingVertical: 10,
        paddingHorizontal: 18,

        borderRadius: 25,

        flex: 1
    },

    deleteText: {
        color: "#FFF",
        fontWeight: "700",
        marginLeft: 6
    }

});