import { StyleSheet } from "react-native";

import Colors from "../styles/Colors";

export default StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: Colors.background,

        paddingHorizontal: 22,

        paddingTop: 12

    },

    title: {

        fontSize: 28,

        fontWeight: "800",

        color: Colors.text,

        marginTop: 22,

        marginLeft: 4

    },

    subtitle: {

        fontSize: 14,

        color: Colors.lightText,

        marginTop: 4,

        marginBottom: 18,

        marginLeft: 4


    },

    searchContainer: {

        flexDirection: "row",

        alignItems: "center",

        backgroundColor: "#FFFFFF",

        borderRadius: 16,

        paddingHorizontal: 15,

        height: 55,

        elevation: 3,

        shadowColor: "#000",

        shadowOffset: {

            width: 0,

            height: 2

        },

        shadowOpacity: 0.08,

        shadowRadius: 4

    },

    searchInput: {

        flex: 1,

        marginLeft: 10,

        fontSize: 15,

        color: Colors.text

    },

    categoryScroll: {

        marginTop: 20,

        marginBottom: 10,

        maxHeight: 55

    },

    categoryChip: {

        backgroundColor:"#FFFFFF",

        paddingHorizontal:18,

        height:45,

        justifyContent:"center",

        alignSelf:"center",

        borderRadius:25,

        marginRight:10,

        elevation:2,

        shadowColor:"#000",

        shadowOpacity:0.05,

        shadowRadius:3

    },

    selectedChip: {

        backgroundColor: "#DFFF00"

    },

    categoryText: {

        fontSize: 13,

        fontWeight: "600",

        color: Colors.text

    },

    selectedCategoryText: {

        color: "#222",

        fontWeight: "700"

    },

    sectionTitle: {

        fontSize: 22,

        fontWeight: "700",

        color: Colors.text,

        marginTop: 18,

        marginBottom: 12,

        marginLeft: 4

    },

    emptyContainer: {

        justifyContent: "center",

        alignItems: "center",

        marginTop: 70

    },

    emptyTitle: {

        fontSize: 20,

        fontWeight: "700",

        marginTop: 15,

        color: Colors.text

    },

    emptySubtitle: {

        fontSize: 14,

        color: Colors.lightText,

        marginTop: 5,

        textAlign: "center",

        paddingHorizontal: 25

    }

});