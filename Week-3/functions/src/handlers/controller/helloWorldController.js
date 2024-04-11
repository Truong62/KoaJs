async function hello(ctx) {
    console.log("hahahha");
    return ctx.body = {
        massage: "helle world"
    }
}

module.exports ={
    hello
}