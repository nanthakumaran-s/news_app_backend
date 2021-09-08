//dev purpose only
import admin from "../utils/fcm.js";

const sendNotification = (title,body,imageUrl,token) => {
  console.log(imageUrl)
  admin
    .messaging()
    .sendMulticast({
      tokens: token,
      notification: {
        title,
        body,
        imageUrl
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
