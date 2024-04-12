const fs = require('fs');
const {data: products} = require('./products.json');

function pick(obj, fields) {
    const fieldArr = fields.split(',');
    const pickedObj = {};
    fieldArr.forEach(field => pickedObj[field] = obj[field]);
    return pickedObj;
}

function getAll({limit = 10, sort, fields}) {
    const filteredProduct = {};
    let newProducts = [...products];
    if (sort === 'asc') {
        newProducts.sort((a, b) => a.id - b.id);
    }
    if (sort === 'desc') {
        newProducts.sort((a, b) => b.id - a.id);
    }
    if (newProducts.length >= parseInt(limit)) {
        newProducts = newProducts.slice(0, parseInt(limit));
    }
    if (fields) {
        newProducts = newProducts.map(product => pick(product, fields));
    }
    return newProducts;
}

function getOne(id) {
    return products.find(product => product.id === parseInt(id));
}

function getAllToView() {
    return products;
}

function add(data) {
    const updatedBooks = [data, ...products];
    return fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: updatedBooks
    }));
}

function multipleAdd(data) {
    return fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: data.concat(products)
    }));
}

function updateUser(productId, newData) {
    const product = products.find(product => product.id === parseInt(productId));
    console.log(product)
    if (product) {
        Object.assign(product, newData);
        return fs.writeFile('./src/database/products.json', JSON.stringify({data: products}), (err) => {
        });
    }
}

function deleteProduct(id) {
    const newData = products.filter(product => product.id !== parseInt(id));
    if (newData.length !== products.length) {
        return fs.writeFile('./src/database/products.json', JSON.stringify({data: newData}), (err) => {
        });
    }
}

module.exports = {
    getOne,
    getAll,
    add,
    updateUser,
    multipleAdd,
    deleteProduct,
    getAllToView
};
