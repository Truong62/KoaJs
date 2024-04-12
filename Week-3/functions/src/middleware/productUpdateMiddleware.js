const yup = require('yup');

async function productUpdateMiddleware(ctx, next) {
    try {
        const postData = ctx.request.body;
        let schema = yup.object().shape({
            id: yup.number().positive().integer().required(),
            name: yup.string().required(),
            description: yup.string().required(),
            product: yup.string().required(),
            color: yup.string().required(),
            createdAt: yup.string().required(),
            image: yup.string().required(),
            price: yup.number().positive().integer().required(),
        });

        await schema.validate(postData);
        next();
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            errors: e.errors,
            errorName: e.name
        }
    }

}

module.exports = productUpdateMiddleware;
