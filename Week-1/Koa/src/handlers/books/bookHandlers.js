const {
    getAll: getAllBooks,
    getOne: getOneBook,
    add: addBook,
    updateById: updateData,
    deleteById
} = require("../../database/bookRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}     
 */
async function getBooks(ctx) {
    try {
        const books = getAllBooks();

        ctx.body = {
            data: books
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

/**
 *
 * @param ctx
 * @returns {Promise<{data: {author: string, name: string, id: number}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
async function getBook(ctx) {
    try {
        const {id} = ctx.params;
        const getCurrentBook = getOneBook(id);
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

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function save(ctx) {
    try {
        const postData = ctx.request.body;
       await addBook(postData);

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
        const id = ctx.params.id;
        const newData = ctx.request.body;

       const dataNew =  await updateData(id, newData);
        ctx.status = 201;
        return ctx.body = {
            dataNew
        }
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

async function deleteBook(ctx) {
    try {
        const id = ctx.params.id;
        deleteById(id);

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

module.exports = {
    getBooks,
    getBook,
    save,
    update,
    deleteBook
};
