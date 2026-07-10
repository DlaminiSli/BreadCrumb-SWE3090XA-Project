import { StyleSheet } from "react-native";

import Colors from "../styles/Colors";

export default StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: Colors.white,

        alignItems: "center",

        justifyContent: "space-evenly",

        paddingHorizontal: 30

    },

    logoContainer: {

        width: 100,

        height: 100,

        borderRadius: 50,

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

    logo: {

        width: 70,

        height: 70,

        resizeMode: "contain"

    },

    title: {

        fontSize: 36,

        fontWeight: "bold",

        color: Colors.text,

        marginTop: -20

    },

    subtitle: {

        fontSize: 16,

        color: Colors.gray,

        marginTop: -70

    },

    imageContainer: {

        width: "80%",

        height: 150,

        backgroundColor: "#333333",

        borderRadius: 25,

        justifyContent: "center",

        alignItems: "center"

    },

    shoppingImage: {

        width: "180%",

        height: "180%",

        resizeMode: "center"

    },

    buttonContainer: {

        width: "100%",

        gap: 5

    }

});