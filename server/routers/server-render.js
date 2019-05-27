const ejs = require('ejs');


module.exports = async (ctx, renderer, template) => {
	ctx.headers['Content-Type'] = 'text/html';

	//用于传入到vue-server-render里头的
	const context = {url: ctx.path};


	try {
		const appString = await renderer.renderToString(context);

		const html = ejs.render(template, {
			appString,
			style: context.renderStyles(),
			scripts: context.renderScripts(),
		});

		ctx.body = html;

	} catch (e) {
		console.log('render error', e);
		throw e;
	}

};
