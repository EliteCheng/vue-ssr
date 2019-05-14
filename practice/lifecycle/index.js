import Vue from 'vue';

// beforeCreate
// created
// beforeMount
// render
// mounted
const app = new Vue({
	template: `<div name="root">{{text}}</div>`,
	render(h) {
		//h就是Vue中的vdom中的createElement函数,
		//返回值是一个vnode节点。这个学习vdom就知道有什么用了。
		//主要是通过vdom中的patch方法来渲染到页面上，
		//patch方法会涉及到diff算法。好了，自己去看vdom吧。
		console.info('render');
		return h('div', {
			attrs: {name: '123'}
		}, this.text);
	},

	//只在改Vue实例的render函数有效，
	//其子组件是无法捕获到错误的
	renderError(h, err) {
		return h('h1',{},"render程序发送错误");
	},
	//改vue实例的error和不屏蔽向上冒泡的
	//子组件的错误信息都可以捕获到。
	errorCaptured(){
		//会向上冒泡，并且正式环境可以使用。
	},


	el: '#root',
	data: {
		text: 0,
	},

	//Vue首先执行init方法，init方法中会
	//1.在vue实例上注册事件methods和生命周期函数，
	//2.调用beforeCreate方法，
	//然后给vue实例注入data中的所有属性，
	//并且判断是否所有属性都要做reactivity，
	//也就是我们所说的数据双向绑定，内部主要是通过get方法是否调用来识别的。
	//具体点就是如果一个属性get方法都没有调用，那么就可以不必添加set监听。
	//也就是不用做reactivity。
	//最后调用created()方法。
	beforeCreate() {
		console.info(this.$el, 'beforeCreate');//undefined
	},
	created() {
		console.info(this.$el, 'created');//undefined
	},

	//接着vue会判断option中是否有el属性，
	//如果没有，就等待app.$mount()的调用，
	//如果没有，init方法结束；
	//如果有el或者mount中的一个，或者两个都有
	// 【el优先级高，并且会调用两次beforeMount和mounted，
	// 同时在执行app.$mount()的时候还会调用beforeUpsate】
	//接着判断是否有render函数或者template这个属性
	// 【render函数的优先级高，因为template最终都要转换成render函数】
	//如果有template，就将template转换成render函数,
	//并且将render函数返回的vnode通过patch方法渲染到页面上，
	//渲染方式是直接覆盖掉el或者mount绑定的节点。
	//如果没有，那么就直接吧this.$el中的内容作为template执行上述步骤。
	//
	//绑定dom之前，服务端渲染是不会用到的。
	beforeMount() {
		console.info(this.$el, 'beforeMount');//<div id='root'></div>
	},
	mounted() {
		console.info(this.$el, 'mounted');//<div name='root'>0</div>
	},
	//更新数据之前
	beforeUpdate() {
		console.info('beforeUpdate');
	},
	updated() {
		console.info('updated');
	},

	//组件中的keep-alive
	activated() {
		console.info('activated');
	},
	deactivated() {
		console.info('deactivated');
	},

	//调用app.$destory()会执行下面两个函数。
	beforeDestroy() {
		console.info('beforeDestroy');
	},
	destoryed() {
		console.info('destoryed');
	},
});

// app.$mount('#root');


//数据更新，会调用render==>beforeUpdate==>updated
// setInterval(function () {
// 	app.text += 1;
// }, 1000);

