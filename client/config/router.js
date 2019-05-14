import Router from 'vue-router'
import routes from './routes'


//方便服务端渲染的时候，防止出现内存溢出，
//因为我们每次服务端渲染的时候，
//如果每次的vue router都是一样的，
// 那么服务端就会每次都做缓存，就会出现内存溢出，
export default () => {
	return new Router({
		mode: 'history',
		routes,
		// base: '/vue-SSR/',

		//例如选择了/login/abc ,
		// 那么父路径/login也会显示active-link
		linkActiveClass: 'active-link',
		linkExactActiveClass: 'exact-active-link',
		scrollBehavior(to, from, savePosition) {
			if (savePosition) {
				return savePosition;
			} else {
				return {x: 0, y: 0};
			}
		},

		// fallback: true,
		// parseQuery(query){
		//
		// },
		// stringifyQuery(obj){
		//
		// }

	});
}
