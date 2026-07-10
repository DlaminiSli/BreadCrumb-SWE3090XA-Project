import { StyleSheet } from "react-native";

import Colors from "./Colors";

const styles = StyleSheet.create({

    circle: {

        width: 170,

        height: 170,

        borderRadius: 85,

        backgroundColor: Colors.primary,

        justifyContent: "center",

        alignItems: "center",

        elevation: 8,

        shadowColor: "#000",

        shadowOpacity: 0.3,

        shadowRadius: 6,

        shadowOffset: {

            width: 0,

            height: 4

        }

    },

    image: {

        width: 140,

        height: 140,

        resizeMode: "contain"

    }

});

export default styles;