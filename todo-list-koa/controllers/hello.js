module.exports.init = async router => {
    router.get("/hello", hello);
}

var hello = async (ctx, next) => {
    ctx.body = "hello koa."
}
