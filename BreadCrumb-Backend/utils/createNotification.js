const Alert = require("../models/Alert");

const createNotification = async ({ user, title, message, type }) => {
  console.log("========== CREATE NOTIFICATION ==========");
  console.log("User:", user);
  console.log("Title:", title);

  try {
    const notification = await Alert.create({
      user,

      title,

      message,

      type,

      isRead: false,

      deleted: false,
    });

    console.log("Notification created!");
    console.log(notification);

    return notification;
  } catch (error) {
    console.error("Notification failed!");

    console.error(error);

    return null;
  }
};

module.exports = createNotification;
