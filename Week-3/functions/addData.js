const serviceAccount = require("../serviceAccount.json")
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const faker = require('faker');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = db;

function createRandomProduct() {
    return {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
    };
}

(async () => {
    for (let i = 1; i <= 1000; i++) {
        const product = createRandomProduct();
        const res = await db.collection('Products').add(product);
    }
})()




