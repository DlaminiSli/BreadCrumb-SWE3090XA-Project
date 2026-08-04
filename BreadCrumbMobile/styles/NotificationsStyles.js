import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F7F8FA"
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F8FA"
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 20,

        backgroundColor: "#FFF"
    },

    headerTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#222"
    },

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 35
    },

    emptyTitle: {
        fontSize: 24,
        fontWeight: "700",
        marginTop: 20,
        color: "#222"
    },

    emptySubtitle: {
        fontSize: 16,
        color: "#777",
        textAlign: "center",
        marginTop: 10,
        lineHeight: 24
    }

});