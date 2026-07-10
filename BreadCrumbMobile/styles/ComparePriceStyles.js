import { StyleSheet } from "react-native";
import Colors from "./Colors";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F7F8FA"
    },

    backButton: {
        marginTop: 15,
        marginLeft: 20,
        marginBottom: 10
    },

    productSection: {
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 20
    },

    productImage: {
        width: 170,
        height: 170,
        resizeMode: "contain"
    },

    productName: {
        marginTop: 12,
        fontSize: 22,
        fontWeight: "700",
        color: Colors.text,
        textAlign: "center"
    },

    productCategory: {
        marginTop: 5,
        fontSize: 15,
        color: Colors.lightText
    },

    bestDealCard: {
        marginHorizontal: 20,
        backgroundColor: "#F7FFD9",
        borderRadius: 22,
        padding: 18,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: "#DCEB73",

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3
    },

    bestDealTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#6D7A00"
    },

    bestStore: {
        marginTop: 8,
        fontSize: 20,
        fontWeight: "700",
        color: Colors.text
    },

    bestPrice: {
        marginTop: 4,
        fontSize: 28,
        fontWeight: "bold",
        color: "#22A45D"
    },

    bestSavings: {
        marginTop: 6,
        fontSize: 15,
        fontWeight: "600",
        color: "#D32F2F"
    },

    catalogueEnds: {
        marginTop: 4,
        fontSize: 13,
        color: Colors.lightText
    },

    sectionTitle: {
        marginHorizontal: 20,
        marginBottom: 12,
        fontSize: 20,
        fontWeight: "700",
        color: Colors.text
    },

    storeCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        backgroundColor: "#FFFFFF",

        marginHorizontal: 20,
        marginBottom: 12,

        padding: 16,

        borderRadius: 18,

        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2
    },

    bestStoreCard: {
        borderWidth: 2,
        borderColor: "#DCEB73",
        backgroundColor: "#FCFFF0"
    },

    storeName: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.text
    },

    stock: {
        marginTop: 4,
        fontSize: 12,
        color: "#777"
    },

    priceSection: {
        alignItems: "flex-end"
    },

    storePrice: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#22A45D"
    },

    bestBadge: {
        marginTop: 8,
        backgroundColor: "#C7D72D",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15
    },

    bestBadgeText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 11
    },

    recommendationCard: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#FFFFFF",

        marginHorizontal: 20,
        marginTop: 18,

        padding: 18,

        borderRadius: 20,

        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2
    },

    recommendationTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.text
    },

    recommendationText: {
        marginTop: 6,
        fontSize: 14,
        color: Colors.lightText,
        lineHeight: 21
    },

    bold: {
        fontWeight: "700",
        color: Colors.text
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",

        marginHorizontal: 15,
        marginTop: 25,
        marginBottom: 20
    },

    actionButton: {
        width: 72,
        height: 72,

        backgroundColor: "#FFFFFF",

        borderRadius: 20,

        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2
    },

    actionText: {
        marginTop: 6,
        fontSize: 11,
        fontWeight: "600",
        color: Colors.text
    },

    tipCard: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#FFFCE9",

        marginHorizontal: 20,
        marginBottom: 35,

        padding: 18,

        borderRadius: 20,

        borderLeftWidth: 5,
        borderLeftColor: "#C7D72D"
    },

    tipText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 13,
        lineHeight: 20,
        color: Colors.lightText
    }

});