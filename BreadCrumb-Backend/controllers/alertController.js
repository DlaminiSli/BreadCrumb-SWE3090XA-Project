const Alert = require("../models/Alert");
const User = require("../models/User");

// Get all alerts for a user
exports.getAlerts = async (req, res) => {
  try {
    // Find MongoDB user using Firebase UID
    const mongoUser = await User.findOne({
      firebaseUID: req.user.uid,
    });

    if (!mongoUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const alerts = await Alert.find({
      user: mongoUser._id,

      deleted: false,
    }).sort({ createdAt: -1 });

    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch alerts",

      error: error.message,
    });
  }
};

// Get unread notification count
exports.getUnreadCount = async (req, res) => {
  try {
    // Find MongoDB user using Firebase UID
    const mongoUser = await User.findOne({
      firebaseUID: req.user.uid,
    });

    if (!mongoUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const count = await Alert.countDocuments({
      user: mongoUser._id,

      isRead: false,

      deleted: false,
    });

    res.status(200).json({
      unreadCount: count,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get unread count",

      error: error.message,
    });
  }
};
// Mark alert as read
exports.markAsRead = async (req, res) => {
  try {
    // Find MongoDB user using Firebase UID
    const mongoUser = await User.findOne({
      firebaseUID: req.user.uid,
    });

    if (!mongoUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const alert = await Alert.findOneAndUpdate(
      {
        _id: req.params.id,

        user: mongoUser._id,
      },

      {
        isRead: true,
      },

      {
        new: true,
      },
    );

    if (!alert) {
      return res.status(404).json({
        message: "Alert not found",
      });
    }

    res.status(200).json({
      message: "Alert marked as read",

      alert,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update alert",

      error: error.message,
    });
  }
};

// Soft delete alert
exports.deleteAlert = async (req, res) => {
  try {
    // Find MongoDB user using Firebase UID
    const mongoUser = await User.findOne({
      firebaseUID: req.user.uid,
    });

    if (!mongoUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const alert = await Alert.findOneAndUpdate(
      {
        _id: req.params.id,

        user: mongoUser._id,
      },

      {
        deleted: true,
      },

      {
        new: true,
      },
    );

    if (!alert) {
      return res.status(404).json({
        message: "Alert not found",
      });
    }

    res.status(200).json({
      message: "Alert deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete alert",

      error: error.message,
    });
  }
};
