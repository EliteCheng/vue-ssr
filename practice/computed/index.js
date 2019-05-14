import Vue from 'vue';

const app = new Vue({
	el: "#root",
	template: `
	<div>
		<p>Name: {{firstName+" "+lastName}}</p>
		<p>Name[computed]: {{name}}</p>
		<p>Name[methods]: {{getName()}}</p>
		<p>Number: {{number}}</p>
		<p>FullName[watch]: {{fullName}}</p>
		<p><input type="text" v-model="number"></p>
		<p>FirstName:<input type="text" v-model="firstName"></p>
		<p>LastName:<input type="text" v-model="lastName"></p>
		<p>Obj.a:<input type="text" v-model="obj.a"></p>
	</div>`,

	data: {
		firstName: 'Jokcy',
		lastName: 'Lou',
		fullName: '',
		number: 0,
		obj: {
			a: '123',
		}
	},
	//computed属性会被缓存，
	// 直到该计算属性所依赖到的data属性【这里指firstName和lastName】
	//发生改变的时候重新更新缓存。
	computed: {
		name() {
			console.log('new name');
			return `${this.firstName} ${this.lastName}`;
		},
		name2: {
			get() {
				console.log('get name');
				return `${this.firstName} ${this.lastName}`;
			},
			//不到万不得已不要用set方法，逻辑混乱
			// set(name2) {
			// 	const names = name2.split(' ');
			// 	this.firstName = names[0];
			// 	this.lastName = names[1];
			// }
		}
	},
	beforeUpdate() {
		console.log(`beforeUpdate`);
	},
	updated() {
		console.log(`updated`);
	},
	methods: {
		//只要data中的属性变化
		// getName就会执行，
		// 然后再执行beforeUpdate()和updated()
		getName() {
			console.log(`getName invoked`);
			return `${this.firstName} ${this.lastName}`;
		}
	},
	watch: {
		firstName: {
			//immediate表示在这个watch注册前
			//会执行handler函数一次,
			immediate: true,
			handler(newVal, oldVal) {
				this.fullName = newVal + " " + this.lastName;
			},
		},
		// obj: {
		// 	handler(newVal, oldVal) {
		// 		console.log('Obj.a changed');
		// 	},
		// 	//深度监控
		// 	deep: true,
		// },
		'obj.a': {
			handler(newVal, oldVal) {
				console.log('Obj.a changed');
			},
		}
	}
});

//watch 和computed里面不要对依赖的属性进行修改，
// 否则会导致无限循环。
