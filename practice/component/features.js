import Vue from 'vue';

const ChildComponent = {
	template: `<div>
		ChildComponent
		<p>yeye.value：{{data.value}}</p>
	</div>
	`,
	inject: ['yeye', 'data'],
	mounted() {
		// console.log(this.$parent.$options.name);
		console.log(this.yeye);
		console.log(this.data.value);
	}
};


const panel = {
	name: 'panel',
	components: {
		ChildComponent,
	},
	// template: `
	// 	<div :style="style">
	// 		<div class="header">
	// 			<slot name="header"></slot>
	// 		</div>
	// 		<div class="body">
	// 			<slot name="body"></slot>
	// 		</div>
	// 	</div>
	// `,
	template: `
		<div :style="style">
			<slot :value="value" :aaa="aaa"></slot>
			<child-component/>
		</div>
	`,
	data() {
		return {
			style: {
				width: '200px',
				height: '200px',
				border: '1px solid #aaa'
			},
			value: 10,
			aaa: 1000
		}
	}
};

new Vue({
	components: {
		Comp: panel,
	},
	//provide表示给所有的子组件提供inject变量。
	//必须使用函数式声明.
	//因为provide在初始化的时候
	// 这个vue实例并没有初始化成功，所以this是undefined，
	//函数式声明方式会在vue实例初始化成功之后再调用这个方法。
	//就像函数式的data那样。
	provide() {
		const data = {};
		Object.defineProperty(data, 'value', {
			get: () => this.value,
			enumerable: true,//可读
		});
		return {
			yeye: this,
			data,
		}
	},
	el: "#root",
	data: {
		value: '123',
	},
	template: `
		<div>
			<comp ref="comp">
				<span ref="span" slot-scope="props">
					<p>{{props.value}}</p>
					<p>{{props.aaa}}</p>
					<p>{{value}}</p>
				</span>
			</comp>
			<input type="text" v-model="value">
		</div>
	`,
	mounted() {
		console.log(this.$refs);
	},
});


