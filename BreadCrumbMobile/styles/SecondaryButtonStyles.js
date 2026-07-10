import { StyleSheet } from "react-native";

import Colors from "./Colors";

const styles = StyleSheet.create({

    button: {

        width: "100%",

        height: 58,

        backgroundColor: Colors.secondary,

        justifyContent: "center",

        alignItems: "center",

        borderRadius: 30,

        marginTop: 15

    },

    text: {

        color: Colors.white,

        fontSize: 20,

        fontWeight: "bold"

    }

});

export default styles;