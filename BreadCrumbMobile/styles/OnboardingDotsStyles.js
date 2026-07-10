import { StyleSheet } from "react-native";

import Colors from "./Colors";

const styles = StyleSheet.create({

    container: {

        flexDirection: "row",

        justifyContent: "center",

        alignItems: "center",

        marginTop: 30

    },

    dot: {

        width: 10,

        height: 10,

        borderRadius: 5,

        backgroundColor: "#D9D9D9",

        marginHorizontal: 6

    },

    activeDot: {

        width: 26,

        backgroundColor: Colors.primary

    }

});

export default styles;