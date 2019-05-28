<template>
	<section class="real-app">
		<div class="tab-container">
			<tabs :value="filter" @change="handleChangeTab">
				<tab v-for="tab in states" :key="tab"
					 :label="tab" :index="tab"
				/>
			</tabs>
		</div>
		<input
				type="text"
				class="add-input"
				autofocus="autofocus"
				placeholder="接下去要做什么？"
				@keyup.enter="addTodo"
		>
		<item
				:todo="todo"
				v-for="todo in filteredTodos"
				:key="todo.id"
				@del="deleteTodo"
		/>
		<Helper
				:filter="filter"
				:todos="todos"
				@clearAllCompleted="clearAllCompleted"
		/>
		<!--<router-view/>-->
	</section>
</template>

<script>
	import Item from './item.vue'
	import Helper from './helper.vue'

	let id = 0;
	export default {
		metaInfo: {
			title: 'The Todo App',
		},
		beforeRouteEnter(to, from, next) {
			console.log("beforeRouteEnter");
			next(vm => {
				//TODO:这个日志会在服务端渲染进行一层层剥开并打印，所以会非常非常非常耗时。
				// console.log(vm);
			});
		},
		beforeRouteUpdate(to, from, next) {
			console.log("beforeRouteUpdate");
			next();
		},
		beforeRouteLeave(to, from, next) {
			console.log("beforeRouteLeave");
			//用来判断如果填写的form数据太多用户一下
			// 不小心退出了，结果需要重新填写，
			// 那么就给这么一个提示
			// if(global.confirm('are you OK???')){
			next();
			// }
		},
		// props:['id'],
		mounted() {

		},
		data() {
			return {
				todos: [],
				filter: 'all',
				states: ['all', 'active', 'completed'],
			}
		},
		components: {
			Item,
			Helper,
		},
		computed: {
			filteredTodos() {
				if (this.filter === 'all') {
					return this.todos
				}
				const completed = this.filter === 'completed';
				return this.todos.filter(todo => completed === todo.completed)
			}
		},
		methods: {
			addTodo(e) {
				this.todos.unshift({
					id: id++,
					content: e.target.value.trim(),
					completed: false
				});
				e.target.value = ''
			},
			deleteTodo(id) {
				this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
			},
			clearAllCompleted() {
				this.todos = this.todos.filter(todo => !todo.completed)
			},
			handleChangeTab(value) {
				this.filter = value;
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.real-app {
		width 600px
		margin 0 auto
		box-shadow 0 0 5px #666
	}

	.add-input {
		position: relative;
		margin: 0;
		width: 100%;
		font-size: 24px;
		font-family: inherit;
		font-weight: inherit;
		line-height: 1.4em;
		border: 0;
		outline: none;
		color: inherit;
		padding: 6px;
		border: 1px solid #999;
		box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
		font-smoothing: antialiased;
		padding: 16px 16px 16px 60px;
		border: none;
		box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
	}

	.tab-container
		background-color #fff
		padding 0 15px
</style>


