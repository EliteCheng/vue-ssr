import Vue from "vue";
import Child from "./child.vue";

const app = new Vue({
	components: {
		Child,
	},
	template: `<div ref='div'>
			<h1 ref="h1">{{text}} {{obj.a}}</h1>
			<Child ref="child"/>
		</div>`,
	//上面的template会转换成下面的render函数
	// render(h) {
	// 	return h('div', {
	// 		attrs: {
	// 			ref: "div",
	// 		},
	// 	}, [h('h1', {attrs: {ref: 'h1'}}, this.text + " " + this.obj.a)]);
	// },
	data: {
		text: 0,
		obj: {},
	},
}).$mount("#root");

let i = 0;
setInterval(function () {
	// app.text += 1;
	// app.$data.text += 1;


	// i++;
	// app.obj.a = i;
	// if (i < 5) {
	//强制更新数据;一旦停止，那么obj.a将不再改变
	//一般不建议这么做。
	// app.$forceUpdate();
	// }

	// if (i < 1) {
	//这种方式是直接将a代理到app.obj上，
	//并添加响应式（reactive），因此设置一次就生效了
	// app.$set(app.obj, 'a', i);
	// }
	// app.obj.a = i;
	// if (i === 5) {
	// 	app.$delete(app.obj, 'a');
	// }

}, 1000);


// console.log(app.$data);
// console.log(app.$props);
// console.log(app.$el);
// console.log(app.$options);

//在每次数据更新的时候执行一次，option的render方法
//h函数就是snabbdom中的vdom的
// app.$options.render = (h) => {
// 	return h('div', {
// 		attrs: {
// 			"name": 'root',
// 		}
// 	}, [h('div', {}, "child1"), h('div', {}, "child2")]);
// };

// console.log(app.$root === app);
// console.log(app.$children);
// console.log(app.$slots);
// console.log(app.$scopedSlots);

// console.log(app.$refs);//用于快速定位DOM元素和子组件对象。{h1: h1, child: VueComponent, div: div}

//console.log(app.$isServer);//用于服务端渲染;

//一般直接写在new Vue实例的option里头，
// 此时watch会自动在改实例销毁的时候注销watch方法，释放内存，
//下面的方式需要手动注销watch
// const unWatch = app.$watch('text', function (newVal, oldVal) {});
// unWatch();//注销watch


// app.$on('customEvent', (a, b) => {
// 	console.info(a, b);
// });
// 只触发一次
// app.$once('customEvent', (a, b) => {
// 	console.info(a, b);
// });
// setInterval(function () {
// 	app.$emit('customEvent', 1, 2);
// }, 1000);


