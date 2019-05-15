import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'


Vue.use(Vuex);
Vue.use(VueRouter);

const store = createStore();
const router = createRouter();

//动态注册模块
store.registerModule('c', {
	state: {
		text: 3,
	}
});


/**
 * 路由全局的导航钩子，守卫函数
 */
router.beforeEach((to, from, next) => {
	console.log('beforeEach invoked');
	next();
	// if (to.fullPath !== '/login') {
	// 	next({path: '/login', replace: true});
	// } else {
	// 	next();
	// }
});

router.beforeResolve((to, from, next) => {
	console.log('beforeResolve invoked');
	next();
});

router.afterEach((to, from) => {
	console.log('afterEach invoked');
});


new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#root');


// vuex 能够增强项目数据管理以及数据操作的规范性，
// 方便程序猿进行维护
