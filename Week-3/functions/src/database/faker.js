const fs = require('fs');

const faker = require('faker');

function createRandomProduct(id) {
    return {
        id,
        name: faker.commerce.productName,
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
    };
}

const products = [];
for (let i = 1; i <= 1000; i++) {
    const product = createRandomProduct(i);
    products.push(product);
}

fs.writeFileSync(__dirname + "/product.json",
    JSON.stringify({ data: products }),
    (e) => {
        if (e) {
            console.log(e)
        }

    });
