import { StyleSheet } from "react-native";
import Colors from "../styles/Colors";

const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: Colors.primary,

        justifyContent: "center",

        alignItems: "center",

        paddingHorizontal: 30

    },

    logo: {

        width: 180,

        height: 180,

        resizeMode: "contain",

        marginBottom: 25

    },

    title: {

        fontSize: 36,

        fontWeight: "bold",

        color: Colors.secondary,

        letterSpacing: 1

    },

    subtitle: {

        fontSize: 17,

        color: Colors.secondary,

        marginTop: 12,

        textAlign: "center",

        lineHeight: 24

    }

});

export default styles;