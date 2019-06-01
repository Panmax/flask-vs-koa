const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const controllers = require('./controllers/index.js');

const app = new Koa();
app.keys = ['keys', 'keykeys'];

controllers.init(router);

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log('app started at port 3000...');
