import Vue from 'vue'

const component = {
	//外部的配置项。
	props: {
		active: {
			// type:Boolean,
			require: true,
			validator(value) {
				return typeof value === 'boolean';
			}
		},
		text: {
			type: Number,
			default: 0,
		},
		propsOne: String,
	},
	template: `
		<div>
			<ul>
				<li v-for="(val,key) in this.$props" :key="key">
					{{key}}：{{item}}
				</li>
			</ul>
			<button @click="handleChange">点击我增加父组件的值</button>
		</div>
	`,
	//data定义成function是用来避免该组件被使用两次的时候，
	// 数据只有一份，也就会导致修改其中一个组件中的数据会影响
	// 另外一个组件。
	data() {
		return {
			//会被props覆盖掉
			// text: "abckd"
		}
	},
	methods: {
		handleChange() {
			//通知父组件调用change方法。
			this.$emit('change');
		}
	}
};

//在全局注册这个组件
// Vue.component('CompOne', component);

const app = new Vue({
	el: "#root",
	components: {
		CompOne: component,
	},
	data: {
		num: 0,
	},
	methods: {
		handleChange() {
			this.num += 1;
		}
	},
	mounted() {
		console.info(this.$refs.comp1);
	},
	template: `
	<div>
		<comp-one 
		:active="true" 
		:text="123" 
		props-one="elite cheng"
		@change="handleChange"
		ref="comp1"
		></comp-one>
		<div>父组件中的num={{num}}</div>		
	</div>
	`,
})

