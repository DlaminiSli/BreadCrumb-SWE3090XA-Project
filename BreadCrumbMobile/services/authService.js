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

import api from "./api";

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

        await api.post("/auth/sync", {

            firebaseUID: userCredential.user.uid,

            fullName: userData.fullName,

            email: userData.email,

            country: userData.country,

            countryCode: userData.countryCode,

            phoneNumber: userData.phoneNumber

        });

        console.log("Firestore profile created");

        return userCredential.user;

    } catch (error) {

        console.error("REGISTER ERROR:", error);

        throw error;

    }

}

export async function loginUser(email, password) {

    const userCredential = await signInWithEmailAndPassword(

        auth,

        email,

        password

    );

    const firebaseUser = userCredential.user;

    const response = await api.post("/auth/sync", {

        firebaseUID: firebaseUser.uid,

        fullName: firebaseUser.displayName || "",

        email: firebaseUser.email,

        country: "",

        countryCode: "",

        phoneNumber: firebaseUser.phoneNumber || ""

    });

    return {

        firebaseUser,

        mongoUser: response.data.user

    };

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