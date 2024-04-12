const yup = require('yup');

async function productInputCheckJsonMiddleware(ctx, next) {
    try {
        const postData = ctx.request.body;

        const itemSchema = yup.lazy(value => {
            if (Array.isArray(value)) {
                return yup.array().of(yup.object().shape({
                    id: yup.number().positive().integer().required(),
                    name: yup.string().required(),
                    description: yup.string().required(),
                    product: yup.string().required(),
                    color: yup.string().required(),
                    createdAt: yup.string().required(),
                    image: yup.string().required(),
                    price: yup.number().positive().integer().required(),
                }));
            } else {
                return yup.object().shape({
                    id: yup.number().positive().integer().required(),
                    name: yup.string().required(),
                    description: yup.string().required(),
                    product: yup.string().required(),
                    color: yup.string().required(),
                    createdAt: yup.string().required(),
                    image: yup.string().required(),
                    price: yup.number().positive().integer().required(),
                });
            }
        });

        const schema = yup.array().of(itemSchema);

        await schema.validate(postData);
        next();
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            errors: e.errors,
            errorName: e.name
        };
    }
}

module.exports = productInputCheckJsonMiddleware;
