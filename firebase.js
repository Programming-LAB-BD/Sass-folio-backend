require("dotenv").config();
const config = require("config");

exports.firebaseConfig = {
  apiKey: config.get("api-key"),
  authDomain: config.get("auth-domain"),
  projectId: config.get("project-id"),
  storageBucket: config.get("storage-bucket"),
  messagingSenderId: config.get("messaging-sender-id"),
  appId: config.get("app-id"),
};
