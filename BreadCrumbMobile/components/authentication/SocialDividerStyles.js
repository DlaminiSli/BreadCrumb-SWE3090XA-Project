import { StyleSheet } from "react-native";

import Colors from "../../styles/Colors";

export default StyleSheet.create({

    container: {

        flexDirection: "row",

        alignItems: "center",

        marginVertical: 25

    },

    line: {

        flex: 1,

        height: 1,

        backgroundColor: "#DDDDDD"

    },

    text: {

        marginHorizontal: 10,

        color: Colors.gray,

        fontWeight: "600",

        fontSize: 13

    }

});