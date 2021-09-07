//dev purpose only
import admin from "../utils/fcm";

const registrationToken =
  "cGrlEX-yTnufaRsJjoUV1O:APA91bEAWWnzfAqqDhWezZhENvl2Yk8IgjYnsbSym2jKzBC0azTCHNqsr64S0ppH9POe7REGXDqk5GKGa1RsOXSlEfl33tUPJmpe0lqmgI_wSWyHCbBCKc9aL1mjLoDTqIr7wR8AxbPM";

const sendNotification = () => {
  admin
    .messaging()
    .sendMulticast({
      tokens: [registrationToken],
      notification: {
        title: "Bomb Bakri na yarunu theriyuma",
        body: "Nantha na summa va",
        imageUrl:
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      },
      data: {
        title: "Bomb Bakri na yarunu theriyuma",
        body: "Nantha na summa va",
        imageUrl:
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
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
