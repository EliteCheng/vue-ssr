/**
 beforeRouteLeave//组件内部，离开该组件

 beforeEach //全局
 beforeEnter //router内部

 //如果触发了beforeRouteUpdate就不会触发beforeRouteEnter，
 //beforeRouteUpdate是在组件被复用的时候触发，
 //例如：/app/:id id不同，渲染不同的组件
 beforeRouteEnter //组件内部
 beforeRouteUpdate //组件内部

 beforeResolve //全局
 afterEach //全局
 */



export default [
	{
		path: '/',
		redirect: '/app',
	},
	{
		path: '/app',
		// path: '/app/:id',
		//会把这个id直接作为prop传入Todo组件中
		// props: true,
		// props: (route) => ({id: route.query.b}),
		component: () => import('../views/todo/todo.vue'),
		name: 'app',
		//路由的元信息
		//有利于SEO
		meta: {
			title: 'this is app',
			description: 'absdkkfl',
		},
		beforeEnter(to, from, next) {
			console.log('app beforeEnter');
			next();
		}
		// children: [
		// 	{
		// 		path: 'test',
		// 		component: Login,
		// 	}
		// ]
	},
	{
		path: '/login',
		component: () => import('../views/login/login.vue'),
		// components: {
		// 	default: Login,
		// a: Todo
		// },
	},
]
