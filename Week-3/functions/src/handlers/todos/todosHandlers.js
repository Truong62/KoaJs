const {
    getAll,
    getOne,
    add,
    updates,
    deleteById,
    multipleDelete
} = require("../../database/toDoRepository");


async function getTodos(ctx) {
    try {
        const books = await getAll();
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

async function getTodo(ctx) {
    try {
        const { id } = ctx.params;
        const getCurrentBook = await getOne(id);
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
        const postData = await ctx.req.body;
        const req = await add(postData);
        ctx.status = 201;
        return ctx.body = {
            success: true,
            data: req
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
        const newData = ctx.req.body;
        const req = await updates(newData);
        ctx.status = 201;
        return ctx.body = {
            data: req
        }
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}
async function deletes(ctx) {
    try {
        const id = ctx.request.body;
        const dataNew = await multipleDelete(id);
        ctx.status = 201;
        return ctx.body = {
            data: dataNew
        }
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

async function deleteTodo(ctx) {
    try {
        const id = ctx.params.id;
        const dataNew = await deleteById(id);
        ctx.status = 201;
        return ctx.body = {
            success: true,
            data: dataNew
        }
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

module.exports = {
    getTodos,
    getTodo,
    save,
    update,
    deleteTodo,
    deletes
};
