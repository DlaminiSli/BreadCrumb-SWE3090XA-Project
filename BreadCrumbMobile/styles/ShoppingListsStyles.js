import { StyleSheet } from "react-native";
import Colors from "./Colors";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F7F8FA"
    },

    header: {
        marginTop: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    headerTitle: {
        fontSize: 28,
        fontWeight: "700",
        color: Colors.text
    },

    addButton: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: "#C7D72D",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3
    },

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30
    },

    emptyTitle: {
        marginTop: 18,
        fontSize: 24,
        fontWeight: "700",
        color: Colors.text
    },

    emptySubtitle: {
        marginTop: 10,
        textAlign: "center",
        color: Colors.lightText,
        lineHeight: 22,
        fontSize: 15
    },

    createButton: {
        marginTop: 30,
        backgroundColor: "#C7D72D",
        borderRadius: 18,
        paddingVertical: 15,
        paddingHorizontal: 35,
        elevation: 2
    },

    createButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700"
    },

    listCard: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 20,
        marginBottom: 18,
        borderRadius: 22,
        padding: 20,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4
    },

    listTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    listName: {
        fontSize: 20,
        fontWeight: "700",
        color: Colors.text
    },

    listDate: {
        marginTop: 5,
        color: Colors.lightText,
        fontSize: 13
    },

    infoRow: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },

    infoTitle: {
        color: Colors.lightText,
        fontSize: 12
    },

    infoValue: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: "700",
        color: Colors.text
    },

    remaining: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: "700",
        color: "#22A45D"
    },

    modalBackground:{

        flex:1,

        justifyContent:"center",

        paddingHorizontal:18,

        backgroundColor:"rgba(0,0,0,0.35)"

    },

    modal:{

    backgroundColor:"#FFFFFF",

    borderRadius:34,

    padding:24,

    shadowColor:"#000",

    shadowOpacity:0.12,

    shadowRadius:30,

    elevation:12

},

    modalTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: Colors.text,
        marginBottom: 20
    },

    input: {
        backgroundColor: "#F5F5F5",
        borderRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 15,
        fontSize: 15
    },

    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10
    },

    saveButton:{

    marginTop:22,

    backgroundColor:"#C7D72D",

    borderRadius:24,

    paddingVertical:18,

    justifyContent:"center",

    alignItems:"center",

    shadowColor:"#C7D72D",

    shadowOpacity:0.35,

    shadowRadius:16,

    elevation:8

},

    saveText:{

    color:"#FFF",

    fontWeight:"700",

    fontSize:17,

    letterSpacing:0.4

},

datePicker:{

    marginTop:18,

    marginBottom:18,

    borderRadius:24,

    padding:18,

    backgroundColor:"#FFFFFF",

    borderWidth:1,

    borderColor:"rgba(255,255,255,0.35)",

    shadowColor:"#000",

    shadowOpacity:0.08,

    shadowRadius:18,

    shadowOffset:{

        width:0,

        height:8

    },

    elevation:8

},

dateTitle:{

    fontSize:13,

    color:"#8C8C8C",

    fontWeight:"600"

},

dateValue:{

    marginTop:4,

    fontSize:17,

    color:"#222",

    fontWeight:"700"

}

});