import Vue from 'vue'

const component = {
	//外部的配置项。
	props: {
		active: Boolean,
		propOne: String,
	},
	template: `
		<div>
			<h1>$props</h1>
			<ul>
				<li v-for="(val,key) in this.$props">
					{{key}}：{{val}}
				</li>
			</ul>
			<h1>$data</h1>
			<ul>
				<li v-for="(val,key) in this.$data">
					{{key}}：{{val}}
				</li>
			</ul>
			<button @click="handleChange">点击我增加父组件的值</button>
		</div>
	`,
	data() {
		return {
			text: 0
		}
	},
	methods: {
		handleChange() {
			//通知父组件调用change方法。
			this.$emit('change');
		}
	},
	mounted() {
		console.log("comp mounted");
	}
};

const component2 = {
	extends: component,
	data() {
		return {
			text: 1,
		}
	},
	mounted() {
		console.log("comp2 mounted");
		this.$parent.text = 1234;
		console.log(this.$parent.$options.name);
	}
};
//
// const CompVue = Vue.extend(component);
//
// new CompVue({
// 	el: '#root',
// 	propsData: {
// 		propOne: 'xxx',
// 	},
// 	data: {
// 		text: '123',
// 	},
// 	mounted() {
// 		console.log("instance mounted");
// 	}
// });

new Vue({
	name: 'Root',
	el: '#root',
	components: {
		Comp: component2,
	},
	data: {
		text: 233333,
	},
	template: `
		<div>
			<span>{{text}}</span>
			<comp></comp>
		</div>
	`

});
