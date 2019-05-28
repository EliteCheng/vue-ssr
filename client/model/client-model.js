import axios from 'axios'
import {createError} from './util'
import notify from '../components/notification/function'

const request = axios.create({
	baseURL: '/'
});

const handleRequest = (request) => {
	return new Promise((resolve, reject) => {
		request.then(resp => {
			const data = resp.data;
			if (!data) {
				return reject(createError(400, 'no data'))
			}
			if (!data.success) {
				return reject(createError(400, data.message))
			}
			resolve(data.data)
		}).catch(err => {
			const resp = err.response;
			//调用函数式组件，可以在任何地方进行显示。
			notify({
				content: JSON.stringify({
					msg: resp.data.message,
					status: resp.status,
				}, null, 4),
			});
			console.log('---------------', resp);
			if (resp.status === 401) {
				reject(createError(401, 'need auth'))
			}
		})
	})
};

export default {
	getAllTodos() {
		return handleRequest(request.get('/api/todos'))
	},
	login(username, password) {
		return handleRequest(request.post('/user/login', {username, password}))
	},
	updateTodo(id, todo) {
		return handleRequest(request.put(`/api/todo/${id}`, todo))
	},
	createTodo(todo) {
		return handleRequest(request.post('/api/todo', todo))
	},
	deleteTodo(id) {
		return handleRequest(request.delete(`/api/todo/${id}`))
	},
	deleteAllCompleted(ids) {
		return handleRequest(request.post('/api/delete/completed', {ids}))
	}
}
