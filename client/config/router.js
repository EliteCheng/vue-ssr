import Router from 'vue-router'
import routes from './routes'


//方便服务端渲染的时候，防止出现内存溢出，
//因为我们每次服务端渲染的时候，
//如果每次的vue router都是一样的，
// 那么服务端就会每次都做缓存，就会出现内存溢出，
export default () => {
	return new Router({
		routes,
	});
}
