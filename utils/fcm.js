import admin from "firebase-admin";

const path = {
  type: "service_account",
  project_id: "pushnotification-58f61",
  private_key_id: "fcb95dab2cce3dcbdf60e7b8b167b96c51209aae",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCXJgIzmIpxRcVf\ns1u9u/g4MAAnvljnfYTgAaVntGUHze30t8e00y2YCewUTuQ4eEcq6ipXzw44zdj5\nBuwC0KCv6k/v6q9c4lHCh6luCwB9DOCZ9T8mlBD8MjgOtNuUIHWmNeKQzGkl2IUN\ng705knX35aKzg0Kd09Xs6L6sZDsOHSOiZZr+tvt4A74AHmjkIzw6jDsKfV3zPM6Z\ndCf1t4t3ZXKQB6PIJdeAdYFSwxLF8OicoRGtf7AG2ZcDcg4ORfZ3bC6wHSLLfWkq\nD7LgAk8OHBtu0lPPO8VsR8jq8rgaJ9+0BGzllP/9J1/PRqPgu9PxeEdvPpTTjgKt\nawdUCZ1lAgMBAAECggEAFjVl/mnL8b/UM+8ZLEQ5wRvAchaEXqMxSm7DfHzjmWV3\nMM1uIRIkcWIH16YN34RAxLv6c8N/LfaFCnYraHB6I870ZuafVLEGXWRsjzg7nqQt\nPkHsQQFhi4Tfer21Q8sPLlhdjXQTgRWS2zz/qT1tavrJUMIZIDKXjMNX/OGPUc/Z\nVT1WL8/aDpfF6EO4ZeAOmg+HPxz42QAmpx+RCSz9tvA1AgQc4PpKSdF5FKqmkMNM\ndpHQmrrK+UuRr4342waHxOhMs6iJ402dDNQDFFhRUwLCSaSd0Swapf9VfGoEx+rG\nDAF2cmorI0cpDEZw/pBwUYjaSO+CXPMcBvBN8fCWcwKBgQDSKE/H+sZrcnbdHj5s\nzIZQOCua/NRDPvjdsjXFMe8KnVYyvmsjAAkuFunr76ABQR6c4jpwVTnMK8EeLksP\nZUbl+DArlznHcXtLy31xhZIPH+kQvv2LFiZh+ZIvCpMtpY7r0gOdOibnS/JA+wPm\nzd8YIY0AGi5SuHXUFk1pFF1J1wKBgQC4Hn7ZpPa/QFj1PtNuq8JJpteIGLbPViQu\nYxV+buxbJ/tx5iG5IEox21XU14UUwE8XzEI0R14hUWXIF6nqM/xRf7lzTNr30lhY\n1AkNfWMcvIy7RE+RXYpQXuQIPMTndvZLIJV9KpwIrRsBXIWy7m3nbPBLcf5Rl7m9\nT3lCeI0DIwKBgQCC1IOuTEkAFPc4ep6EHuMyx3Ul/GWsI2TMpyfgRlC4++/wkSij\nVl9gqPUhY0Dp5v9GzXNyASyFFWwY/NrPj84OVm6uhGt85QHL0reaV3vxHH18Zlnz\nH2vvrG28CUpMrXeHCWwkklIrxdTfbSUlp15OaHyd5q6V4q2/xc6VLw9QawKBgEMY\nCc2yCaDECCbGkDHCMXi5bc1QhD2l/GVTAiAit8q4FS76V8uocqEcdnirWPmo4qmf\na3i1kR2/FcIGrYqFCyt/ycq0dQ7d/gfQrMPXr2hnZTlQuVYVqjODgMFns7FNbo8N\n/quv/VBEFJU4bBg6Pp6Y2jAECFMfYTYVYfDREUHVAoGAGh1CL0U/yTf6xMG1SQki\nbECTuXM34M0cnCet9o80DLt3ieLstJCFs5xI+tUi2z5CrFZhwYUzHE1m9eFl6wr9\n5bgUUeDEzgsFXm06EiF8YqyxzUiB5V90Gkjivqp7Re0W7YzQ+in9TiiL02GgMAXx\n1VgcqNcr45mfGK0xtqOuu9c=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-kco1a@pushnotification-58f61.iam.gserviceaccount.com",
  client_id: "112296425304318195039",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kco1a%40pushnotification-58f61.iam.gserviceaccount.com",
};

admin.initializeApp({
  credential: admin.credential.cert(path),
  databaseURL: "https://pushnotification-58f61.firebaseio.com",
});

export default admin;
