import {createApp} from './create-app'

export default context => {
	return new Promise((resolve, reject) => {
		const {app, router} = createApp();

		router.push(context.url);

		//在调用router.push之后触发改方法，
		//主要用于服务端渲染中的一些异步操作【异步加载组件】
		router.onReady(() => {
			const matchedComponents = router.getMatchedComponents();
			if (!matchedComponents.length) {
				return reject(new Error('no component matched'));
			}
			resolve(app);
		});
	})
}
