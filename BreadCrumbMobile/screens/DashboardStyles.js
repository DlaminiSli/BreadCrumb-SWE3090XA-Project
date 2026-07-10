import { StyleSheet } from "react-native";

import Colors from "../styles/Colors";

export default StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: Colors.background

    },

    scrollContainer: {

        paddingHorizontal: 16,

        paddingBottom: 110

    },

    categoryRow: {

        flexDirection: "row",

        justifyContent: "space-between",

        marginTop: 8,

        marginBottom: 10

    },

    sectionHeader: {

        flexDirection: "row",

        justifyContent: "space-between",

        alignItems: "center",

        marginTop: 22,

        marginBottom: 12

    },

    sectionTitle: {

        fontSize: 20,

        fontWeight: "700",

        color: Colors.text

    },

    seeAll: {

        color: "#5A6B00",

        fontWeight: "600",

        fontSize: 13

    },

    priceDropGrid: {

    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",

    marginBottom: 30

},

});