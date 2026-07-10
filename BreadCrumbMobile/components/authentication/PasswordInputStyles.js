import { StyleSheet } from "react-native";

import Colors from "../../styles/Colors";

export default StyleSheet.create({

    container: {

        flexDirection: "row",

        alignItems: "center",

        backgroundColor: Colors.white,

        borderWidth: 1,

        borderColor: "#DDDDDD",

        borderRadius: 15,

        height: 58,

        paddingHorizontal: 15,

        marginBottom: 18

    },

    icon: {

        marginRight: 10

    },

    input: {

        flex: 1,

        fontSize: 16,

        color: Colors.text

    }

});