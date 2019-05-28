//和mutation一样只能传两个值，
//但是可以做一些异步的操作。
//例如ajax请求等

import model from '../../model/client-model.js'
import notify from '../../components/notification/function'
import bus from '../../util/bus'

const handleError = (err) => {
	if (err.code === 401) {
		//调用函数式组件，可以在任何地方进行显示。
		notify({
			content: '你得先登录啊！'
		});
		//通过Vue提供的事件机制，通知前端router修改定位为login
		bus.$emit('auth');
	}
};

const commitHandler = async (commit, mutationName, data) => {
	if (typeof mutationName === 'string') {
		if (mutationName === "endLoading") {
			await new Promise((resolve, reject) => {
				resolve();
				// setTimeout(resolve, 1000);
			});
		}
		commit(mutationName, data);
	}
};


export default {
	updateCountAsync(store, data) {
		setTimeout(() => {
			store.commit('updateCount', data.num);
		}, data.time);
	},
	fetchTodos({commit}) {
		commitHandler(commit, 'startLoading');
		return model.getAllTodos()
		.then(data => {
			commitHandler(commit, 'endLoading');
			commitHandler(commit, 'fillTodos', data);
		})
		.catch(err => {
			commitHandler(commit, 'endLoading');
			handleError(err)
		})
	},
	addTodo({commit}, todo) {
		commit('startLoading');
		model.createTodo(todo)
		.then(data => {
			commitHandler(commit, 'addTodo', data);
			commitHandler(commit, 'endLoading');
			notify({
				content: '你又多了一件事要做'
			})
		}).catch(err => {
			commitHandler(commit, 'endLoading');
			handleError(err)
		})
	},
	updateTodo({commit}, {id, todo}) {
		commitHandler(commit, 'startLoading');
		model.updateTodo(id, todo)
		.then(data => {
			commitHandler(commit, 'updateTodo', {id, todo: data});
			commitHandler(commit, 'endLoading');
		}).catch(err => {
			handleError(err);
			commitHandler(commit, 'endLoading');
		})
	},
	deleteTodo({commit}, id) {
		commitHandler(commit, 'startLoading');
		model.deleteTodo(id)
		.then(data => {
			commitHandler(commit, 'deleteTodo', id);
			notify({
				content: '你又少了一件事要做'
			});
			commitHandler(commit, 'endLoading')
		}).catch(err => {
			handleError(err);
			commitHandler(commit, 'endLoading')
		})
	},
	deleteAllCompleted({commit, state}) {
		commit('startLoading');
		const ids = state.todos.filter(t => t.completed).map(t => t.id)
		model.deleteAllCompleted(ids)
		.then(() => {
			commitHandler(commit, 'deleteAllCompleted');
			commitHandler(commit, 'endLoading');
			notify({
				content: '清理一下~~~'
			})
		}).catch(err => {
			handleError(err);
			commitHandler(commit, 'endLoading')
		})
	},
	login({commit}, {username, password}) {
		commit('startLoading');
		return new Promise((resolve, reject) => {
			model.login(username, password)
			.then(data => {
				commitHandler(commit, 'doLogin', data);
				notify({
					content: '登录成功'
				});
				resolve();
				commitHandler(commit, 'endLoading');
			}).catch(err => {
				handleError(err);
				reject(err);
				commitHandler(commit, 'endLoading');
			})
		})
	}
}
