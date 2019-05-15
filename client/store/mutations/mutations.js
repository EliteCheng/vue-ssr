//mutations不能做异步的操作。
//要做异步操作需要放到action去写。

export default {
	//只能接收两个参数，第三个参数无法读取。
	updateCount(state, payload) {
		state.count = payload;
	}
}
