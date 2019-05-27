const Router = require('koa-router');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const VueServerRenderer = require('vue-server-renderer');

const serverRender = require('./server-render');
const serverConfig = require('../../build/webpack.config.server');

const serverCompiler = webpack(serverConfig);
const mfs = new MemoryFS();
serverCompiler.outputFileSystem = mfs;

let bundle;
// 这里用watch方法类似于webpack-dev-server那样，
// 可以监听文件的修改，进而自动更新页面。
serverCompiler.watch({}, (err, stats) => {
	if (err) throw err;
	stats = stats.toJson();
	stats.errors.forEach(err => console.error(err));
	stats.warnings.forEach(err => console.warn(err));

	const bundlePath = path.join(
		serverConfig.output.path,
		'vue-ssr-server-bundle.json'
	);
	bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
	console.log("new bundle generated");
});

const handleSSR = async (ctx) => {
	if (!bundle) {
		ctx.body = '你等一会，别着急......';
		return;
	}

	const clientManifestResp = await axios.get(
		'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json');
	const clientManifest = clientManifestResp.data;

	const template = fs.readFileSync(
		path.join(__dirname, '../server.template.ejs'),
		'utf-8'
	);

	const renderer = VueServerRenderer
	.createBundleRenderer(bundle, {
		inject: false,
		clientManifest,
	});
	await serverRender(ctx, renderer, template);
};

const router = new Router();
router.get('*', handleSSR);


module.exports = router;
