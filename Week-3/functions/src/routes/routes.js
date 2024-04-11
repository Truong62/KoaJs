const Router = require('koa-router');
const helloWorldController = require("../handlers/controller/helloWorldController")

// Prefix all routes with /books
const router = new Router({
    prefix: '/api'
});

router.get("/hello", (ctx) => {
    return (ctx.body = {
        massage: "helle world"
    })
})

module.exports = router;
