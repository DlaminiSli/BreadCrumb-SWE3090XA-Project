const express = require("express");

const router = express.Router();

const {
  getAlerts,

  getUnreadCount,

  markAsRead,

  deleteAlert,
} = require("../controllers/alertController");

const { verifyFirebaseToken } = require("../middleware/authMiddleware");

// Get all alerts
router.get(
  "/",

  verifyFirebaseToken,

  getAlerts,
);

// Get unread notification count
router.get(
  "/unread-count",

  verifyFirebaseToken,

  getUnreadCount,
);

// Mark alert as read
router.put(
  "/:id/read",

  verifyFirebaseToken,

  markAsRead,
);

// Soft delete alert
router.put(
  "/:id/delete",

  verifyFirebaseToken,

  deleteAlert,
);

module.exports = router;
