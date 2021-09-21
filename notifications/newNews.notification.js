//dev purpose only
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
        id: id,
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

// const sendNotification = () => {
//   admin
//     .messaging()
//     .sendMulticast({
//       tokens: [
//         "c9glo-sJTRuoxj7P2UHKrM:APA91bHy66A32hGGeQz2OZfJ-TXQsJqzv3zFYjN1SkNEJu3v0AbcfRUJ6siC1TDFA_LevLu7XzF7oAmv_4_9A6-X49jRK4FmE6Pt7clV87btlkwbmj_8zc1Blgko4ymhC3UlABDObyja",
//       ],
//       notification: {
//         title: "va bro",
//         body: "how r u nanba",
//         imageUrl: "https://nantha.png",
//       },
//       data: {
//         "click_action": "FLUTTER_NOTIFICATION_CLICK",
//         "id": "614967b705256ac51e5831b2",
//       },
//       android: {

//       }
//     })
//     .then((res) => {
//       console.log(res);
//       return;
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// };

// sendNotification();

export default sendNotification;
