const express = require("express");

const router = express.Router();

const {

    syncUser,
    getProfile,
    updateProfile
} = require("../controllers/authController");

router.post("/sync", syncUser);

const {

    verifyFirebaseToken

} = require("../middleware/authMiddleware");

router.get(
    "/profile",
    verifyFirebaseToken,
    getProfile
);

router.put(
    "/profile",
    verifyFirebaseToken,
    updateProfile
);

module.exports = router;