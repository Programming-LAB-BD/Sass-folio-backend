require("dotenv").config();

// const config = require("config");

// exports.firebaseConfig = {
//   apiKey: config.get("api-key"),
//   authDomain: config.get("auth-domain"),
//   projectId: config.get("project-id"),
//   storageBucket: config.get("storage-bucket"),
//   messagingSenderId: config.get("messaging-sender-id"),
//   appId: config.get("app-id"),
// };

exports.firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};
