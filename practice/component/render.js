import Vue from 'vue';


const panel = {
	name: 'panel',
	props: ['props1'],
	// template: `
	// 	<div :style="style">
	// 		<slot ></slot>
	// 	</div>
	// `,
	render(h) {
		console.log(this.$createElement === h);//true
		return h('div', {
			style: this.style,
			// on:{
			// 	click:()=>{this.$emit('pClick')}
			// }
		}, [
			this.$slots.default,//匿名<slot></slot>
			this.$slots.header,//具名<slot name='header'></slot>
			h('p', {}, "parentProps1:" + this.props1),
		]);
	},
	data() {
		return {
			style: {
				width: '200px',
				height: '200px',
				border: '1px solid #aaa'
			},
		}
	}
};

new Vue({
	components: {
		Comp: panel,
	},
	el: "#root",
	data: {
		value: '666',
	},
	// template: `
	// 	<comp ref="comp">
	// 		<span ref="span">
	// 			<p>{{value}}</p>
	// 		</span>
	// 	</comp>
	// `,
	render(h) {
		return h(
			'comp', {
				ref: 'comp',
				props: {
					props1: this.value,
				},
				// on:{
				// 	pClick: this.handleClick,
				// },
				nativeOn: {
					click: this.handleClick,
				}
			}, [
				h('span', {
					ref: 'span',
					slot: 'header',
					domProps: {
						innerHTML: '<span>345</span>',
					},
					attrs: {
						id: 'testId',
						name: 'testName'
					}
				}, this.value)
			])
	},
	methods: {
		handleClick() {
			console.log('click');
		}
	}
});


