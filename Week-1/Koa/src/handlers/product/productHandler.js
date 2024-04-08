const {
    getAll: getAll,
    getOne: getOneProduct,
    add: addProduct,
    multipleAdd: addMultipleProduct,
    updateUser: put,
    deleteProduct: deleteProduct,
    getAllToView
} = require("../../database/productRepository");
const { getAll: getAllBooks } = require("../../database/bookRepository");

async function getProducts(ctx) {
    try {
        const { limit, sort, fields } = ctx.request.query;
        const products = getAll({
            limit, sort, fields
        });

        ctx.body = {
            data: products
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}
async function getProduct(ctx) {
    try {
        const { id } = ctx.params;
        const getCurrentBook = getOneProduct(id);
        if (getCurrentBook) {
            return ctx.body = {
                data: getCurrentBook
            }
        }
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

async function save(ctx) {
    try {
        const postData = ctx.request.body;
        if (postData.length === 1) {
            addProduct(postData);
        }
        if (postData.length > 1)  {
            addMultipleProduct(postData)
        }
        ctx.status = 201;
        return ctx.body = {
            success: true
        }
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}
async function update(ctx) {
    try {
        const productId = ctx.params.id;
        const newData = ctx.request.body;
        await put(productId, newData);

        ctx.status = 200;
        ctx.body = {
            success: true,
        };
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            error: error.message
        };
    }
}

async function deleteProductById(ctx) {
    try {
        const id = ctx.params.id;
        console.log(id)
        deleteProduct(id)
        ctx.status = 200;
        ctx.body = {
            success: true,
        };
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            error: e.message
        };
    }
}

const viewALlProduct = async (ctx) => {
    try {
        const products = getAllToView();

        await ctx.render('Product', {
            data: products
        });
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}
const viewProductById = async (ctx) => {
    try {
        const { id } = ctx.params;
        const product = getOneProduct(id);
        await ctx.render('Product', {
            data: product
        });
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}
module.exports = {
    getProducts,
    getProduct,
    save,
    update,
    deleteProductById,
    viewALlProduct,
    viewProductById
};
