import admin from "../utils/fcm.js";

const sendNotification = (title, body, imageUrl, id, token) => {
  console.log(imageUrl);
  admin
    .messaging()
    .sendMulticast({
      tokens: token,
      notification: {
        title,
        body,
        imageUrl,
      },
      data: {
        click_action: "FLUTTER_NOTIFICATION_CLICK",
        id: id.toString(),
      },
      android: {
        priority: "high",
      },
    })
    .then((res) => {
      console.log(res);
      return;
    })
    .catch((err) => {
      console.error(err);
    });
};

export default sendNotification;
