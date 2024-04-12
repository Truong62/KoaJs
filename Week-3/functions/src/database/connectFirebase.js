const serviceAccount = require("../serviceAccount.json")
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = db;


