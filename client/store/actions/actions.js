//和mutation一样只能传两个值，
//但是可以做一些异步的操作。
//例如ajax请求等


export default {
	updateCountAsync(store, data) {
		setTimeout(() => {
			store.commit('updateCount', data.num);
		}, data.time);
	}
}
