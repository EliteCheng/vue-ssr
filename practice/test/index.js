import Vue from "vue";
import Child from "./child.vue";

const app = new Vue({
	components: {
		Child,
	},

	template:
		`<div ref='div'>
			<h1 ref="h1">{{text}} {{obj.a}}</h1>
			<Child ref="child"/>
		</div>`,
	data: {
		text: 0,
		obj: {},
	},
}).$mount("#root");



