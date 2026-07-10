import {

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    sendPasswordResetEmail,

    signOut,

    sendEmailVerification

} from "firebase/auth";

import {

    doc,

    setDoc

} from "firebase/firestore";

import {

    auth,

    db

} from "./firebase";

export async function registerUser(userData) {

    try {

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            userData.email,
            userData.password
        );

        console.log("Auth user created");

        await sendEmailVerification(userCredential.user);

        console.log("Email verification sent");

        await setDoc(
            doc(db, "users", userCredential.user.uid),
            {
                fullName: userData.fullName,
                email: userData.email,
                country: userData.country,
                countryCode: userData.countryCode,
                phoneNumber: userData.phoneNumber,
                createdAt: new Date(),
                provider: "Email",
                favourites: [],
                shoppingLists: [],
                alerts: []
            }
        );

        console.log("Firestore profile created");

        return userCredential.user;

    } catch (error) {

        console.error("REGISTER ERROR:", error);

        throw error;

    }

}

export async function loginUser(email, password) {

    return signInWithEmailAndPassword(

        auth,

        email,

        password

    );

}

export function forgotPassword(email) {

    return sendPasswordResetEmail(

        auth,

        email

    );

}

export function logoutUser() {

    return signOut(auth);

}