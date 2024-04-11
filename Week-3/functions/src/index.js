const functions = require("firebase-functions")
const apiHandlers = require("./handlers/app");

exports.api = functions.https.onRequest(apiHandlers.callback());
