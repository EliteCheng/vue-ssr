//mutations不能做异步的操作。
//要做异步操作需要放到action去写。

export default {
	//只能接收两个参数，第三个参数无法读取。
	updateCount(state, payload) {
		state.count = payload;
	},
	fillTodos(state, todos) {
		state.todos = todos
	},
	addTodo(state, todo) {
		state.todos.unshift(todo)
	},
	updateTodo(state, {id, todo}) {
		state.todos.splice(
			state.todos.findIndex(t => t.id === id),
			1,
			todo
		)
	},
	deleteTodo(state, id) {
		state.todos.splice(
			state.todos.findIndex(t => t.id === id),
			1
		)
	},
	deleteAllCompleted(state) {
		state.todos = state.todos.filter(t => !t.completed)
	},
	doLogin(state, userInfo) {
		state.user = userInfo
	},
	startLoading(state) {
		state.loading = true
	},
	endLoading(state) {
		state.loading = false;
	}
}
