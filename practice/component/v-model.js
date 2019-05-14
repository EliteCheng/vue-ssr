import Vue from 'vue'

const component = {
	model: {
		prop: 'value1',
		event: 'changeV1',
	},
	//外部的配置项。
	props: ['value1',],
	template: `
		<div>
			<input type="text" @input="handleChange">
		</div>
	`,
	methods: {
		handleChange(e) {
			this.$emit('changeV1', e.target.value);
		}
	}
};

//在全局注册这个组件
// Vue.component('CompOne', component);

const app = new Vue({
	el: "#root",
	components: {
		Comp: component,
	},
	data() {
		return {
			value: 0,
		}
	},
	template: `
	<div>
		<!--<comp :value="value" @changeV1="value=arguments[0]"/>-->
		<comp v-model="value"/>
		<div>父组件中的value={{value}}</div>		
	</div>
	`,
});

