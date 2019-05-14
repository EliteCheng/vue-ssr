import Vue from 'vue';

var globalVar = "11"; // eslint-disable-line

new Vue({
	el: "#root",
	template: `
	<div>
		<p>arr:[{{arr.join(',')}}]</p>
		<p>JS全局的变量:Date.now()={{Date.now()}}</p>
		<!--无法访问
		<p>{{globalVar}}</p>
		-->
		<p v-html="html"></p>
		<div :class="{ active:isActive }">class绑定</div>
		<div :class="[{active:isActive}]">class绑定</div>
		<div :style="[styles,styles2]">style绑定</div>
		<p>{{getJoinArr(arr)}}</p>
	</div>`,

	data: {
		isActive: true,
		arr: [1, 2, 3],
		html: '<span>123</span>',
		styles: {
			color: 'red',
			//vue会自动去加浏览器对应的前缀
			appearance: 'none',
		},
		styles2: {
			color: 'blue'
		}
	},
	methods: {
		getJoinArr(arr) {
			return arr.join("-");
		}
	}
});
