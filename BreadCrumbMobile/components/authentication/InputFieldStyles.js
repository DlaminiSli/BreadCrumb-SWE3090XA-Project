import { StyleSheet } from "react-native";

import Colors from "../../styles/Colors";

export default StyleSheet.create({

    container: {

        height: 58,

        borderRadius: 15,

        backgroundColor: Colors.white,

        borderWidth: 1,

        borderColor: "#DDDDDD",

        flexDirection: "row",

        alignItems: "center",

        paddingHorizontal: 15,

        marginBottom: 18

    },

    icon: {

        marginRight: 12

    },

    input: {

        flex: 1,

        fontSize: 16,

        color: Colors.text

    }

});