import { StyleSheet } from "react-native";

import Colors from "../styles/Colors";

export default StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: "#F5F6F8",

        paddingHorizontal: 25

    },

    backButton: {

        marginTop: 60,

        marginBottom: 15,

        width: 40

    },

    logoContainer: {

        width: 120,

        height: 120,

        borderRadius: 60,

        backgroundColor: Colors.primary,

        justifyContent: "center",

        alignItems: "center",

        alignSelf: "center",

        marginBottom: 25,

        elevation: 4,

        shadowColor: "#000",

        shadowOpacity: 0.12,

        shadowRadius: 10,

        shadowOffset: {

            width: 0,

            height: 4

        }

    },

    logo: {

        width: 80,

        height: 80,

        resizeMode: "contain"

    },

    title: {

        fontSize: 32,

        fontWeight: "700",

        color: Colors.text,

        textAlign: "center"

    },

    subtitle: {

        fontSize: 16,

        color: Colors.gray,

        textAlign: "center",

        marginTop: 10,

        marginBottom: 35

    },

    phoneContainer: {

        flexDirection: "row",

        marginBottom: 20

    },

    countryCodeContainer: {

        width: 85,

        height: 58,

        backgroundColor: Colors.white,

        borderWidth: 1,

        borderColor: "#DDDDDD",

        borderTopLeftRadius: 15,

        borderBottomLeftRadius: 15,

        justifyContent: "center",

        alignItems: "center"

    },

    countryCode: {

        fontSize: 16,

        fontWeight: "600",

        color: Colors.text

    },

    phoneInput: {

        flex: 1,

        height: 58,

        backgroundColor: Colors.white,

        borderWidth: 1,

        borderLeftWidth: 0,

        borderColor: "#DDDDDD",

        borderTopRightRadius: 15,

        borderBottomRightRadius: 15,

        paddingHorizontal: 18,

        fontSize: 16,

        color: Colors.text

    },

    loginContainer: {

        flexDirection: "row",

        justifyContent: "center",

        alignItems: "center",

        marginTop: 25,

        marginBottom: 40

    },

    loginLabel: {

        fontSize: 15,

        color: Colors.gray

    },

    loginButton: {

        marginLeft: 5,

        color: Colors.text,

        fontSize: 15,

        fontWeight: "700"

    }

});