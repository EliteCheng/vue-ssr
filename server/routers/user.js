const Router = require('koa-router');

const userRouter = new Router({prefix: '/user'});

userRouter.post('/login', async ctx => {
	const user = ctx.request.body;
	if (user.username === 'admin' && user.password === 'admin') {
		ctx.session.user = {
			username: 'admin'
		};
		ctx.body = {
			success: true,
			data: {
				username: 'admin'
			}
		}
	} else {
		ctx.status = 400;
		ctx.body = {
			success: false,
			message: 'username or password error',
		}
	}
});

module.exports = userRouter;
