//dev purpose only
import admin from "../utils/fcm.js";

const registrationToken =
  "cGrlEX-yTnufaRsJjoUV1O:APA91bEAWWnzfAqqDhWezZhENvl2Yk8IgjYnsbSym2jKzBC0azTCHNqsr64S0ppH9POe7REGXDqk5GKGa1RsOXSlEfl33tUPJmpe0lqmgI_wSWyHCbBCKc9aL1mjLoDTqIr7wR8AxbPM";

const sendNotification = () => {
  admin
    .messaging()
    .sendMulticast({
      tokens: [
        registrationToken,
        "dzwQTZBTT4SSbGtZtQO_X0:APA91bERhru4gWU8jFJRaGmSKA76G-lY3YXN9mIH-rNlOOG-Rkd9yPpNYQ3OfB4LE3NKI0gaGR-PoC478UVS8Xy77FH1YW-ZJIBzC73ghIwdqDkOeSQmI_h_oxWre1Z_QqPoX4TmHa-V",
        "eV-F52KwTz-7qkSz27p9Lz:APA91bFUI-e5eIpPB-6Y-mcmnrFnMjl4NMG3e4Z7qwltTGfIiXrR3yS50AK_2DTzj3dYXQdWRxZH2ww1dyOxt5t-aG9ExCgYzHWpHdsVThrJUfmIfdkejVZ3IDii24LzfMzYt9jHY20G",
      ],
      notification: {
        title: "Bomb Bakri na yarunu theriyuma",
        body: "uruthu na enanu theriuma",
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
