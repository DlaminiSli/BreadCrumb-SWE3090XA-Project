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

    headerCard: {
        marginHorizontal: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: 20,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 4
    },

    listName: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.text
    },

    shoppingDate: {
        marginTop: 10,
        fontSize: 13,
        color: Colors.lightText
    },

    shoppingDateValue: {
        marginTop: 4,
        fontSize: 16,
        fontWeight: "600",
        color: Colors.text
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 18
    },

    summaryCard: {
        width: "31%",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        paddingVertical: 15,
        alignItems: "center",
        elevation: 2
    },

    summaryTitle: {
        fontSize: 12,
        color: Colors.lightText
    },

    summaryValue: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: "700",
        color: Colors.text
    },

    remainingBudget: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: "700",
        color: "#22A45D"
    },

    emptyBasket: {
        marginHorizontal: 20,
        marginTop: 30,
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: 28,
        alignItems: "center",
        elevation: 2
    },

    emptyTitle: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: "700",
        color: Colors.text
    },

    emptySubtitle: {
        marginTop: 10,
        textAlign: "center",
        color: Colors.lightText,
        lineHeight: 22
    },

    primaryButton: {
        marginHorizontal: 20,
        marginTop: 25,
        backgroundColor: "#C7D72D",
        borderRadius: 18,
        paddingVertical: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    primaryButtonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 16,
        marginLeft: 10
    },

    secondaryButton: {
        marginHorizontal: 20,
        marginTop: 14,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        paddingVertical: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        elevation: 2
    },

    secondaryButtonText: {
        color: Colors.text,
        fontWeight: "600",
        marginLeft: 10,
        fontSize: 15
    },

    progressCard: {

    marginHorizontal:20,

    marginTop:25,

    backgroundColor:"#FFFFFF",

    borderRadius:20,

    padding:18,

    elevation:2

},

progressHeader:{

    flexDirection:"row",

    justifyContent:"space-between",

    marginBottom:12

},

progressTitle:{

    fontWeight:"700",

    fontSize:16,

    color:Colors.text

},

progressPercent:{

    color:"#22A45D",

    fontWeight:"700"

},

progressBackground:{

    height:10,

    backgroundColor:"#E8E8E8",

    borderRadius:20,

    overflow:"hidden"

},

progressFill:{

    width:"0%",

    height:"100%",

    backgroundColor:"#C7D72D",

    borderRadius:20

},

progressText:{

    marginTop:10,

    color:Colors.lightText

},

basketCard:{

    marginHorizontal:20,

    marginTop:20,

    backgroundColor:"#FFFFFF",

    borderRadius:20,

    padding:20,

    alignItems:"center",

    elevation:2

},

recommendCard:{

    marginHorizontal:20,

    marginTop:20,

    backgroundColor:"#FFFFFF",

    borderRadius:20,

    padding:20,

    elevation:2

},

sectionHeader:{

    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",

    marginBottom:15

},

sectionTitle:{

    fontSize:18,

    fontWeight:"700",

    color:Colors.text

},

viewAll:{

    color:"#C7D72D",

    fontWeight:"700"

},

recommendItem:{

    flexDirection:"row",

    alignItems:"center",

    paddingVertical:12,

    borderBottomWidth:1,

    borderBottomColor:"#F2F2F2"

},

recommendText:{

    marginLeft:15,

    fontSize:16,

    color:Colors.text

}

});