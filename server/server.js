const Koa = require('koa');
const send = require('koa-send');
const path = require('path');
const koaBody = require('koa-body');
const koaSession = require('koa-session');

const staticRouter = require('./routers/static.js');
const apiRouter = require('./routers/api.js');
const createDb = require('./db/db.js');
const config = require('../app.config.js');
const userRouter = require('./routers/user.js');

const db = createDb(config.db.appId, config.db.appKey);

const app = new Koa();

app.keys = ['vue ssr tech'];
app.use(koaSession({
	key: 'v-ssr-id',
	maxAge: 2 * 3600 * 1000,//两个小时的过期时间
}, app));

const isDev = process.env.NODE_ENV === 'development';

app.use(async (ctx, next) => {
	try {
		console.log(`request with path ${ctx.path}`);
		await next();
	} catch (err) {
		console.error(err);
		ctx.status = 500;
		if (isDev) {
			ctx.body = err.message;
		} else {
			ctx.body = 'please try again later';
		}
	}
});
//添加DataBase中间件
app.use(async (ctx, next) => {
	ctx.db = db;
	await next();
});
app.use(async (ctx, next) => {
	if (ctx.path === '/favicon.ico') {
		await send(ctx, '/favicon.ico', {root: path.join(__dirname, '../')})
	} else {
		await next();
	}
});

app.use(koaBody());
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(staticRouter.routes()).use(staticRouter.allowedMethods());
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

let pageRouter;
if (isDev) {
	pageRouter = require('./routers/dev-ssr.js');
} else {
	pageRouter = require('./routers/ssr.js');
}


app.use(pageRouter.routes()).use(pageRouter.allowedMethods());

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3333;

app.listen(PORT, HOST, () => {
	console.log(`server is listenng on ${HOST}:${PORT}`);
});


