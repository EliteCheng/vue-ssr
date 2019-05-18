import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from "./actions/actions";


const isDev = process.env.NODE_ENV === "development";


export default () => {
	const store = new Vuex.Store({
		strict: isDev,//表示不允许直接使用$store来修改变量
		state: defaultState,
		mutations,
		getters,
		actions,
		// plugins:[
		// 	store => {
		// 		store.watch((state) => state.count + 1, (newCount) => {
		// 			console.log("new Count:" + newCount);
		// 		});
		// 		store.subscribe((mutations, state) => {
		// 			console.log(mutations.type);
		// 			console.log(mutations.payload);
		// 		});
		// 		store.subscribeAction((action, state) => {
		// 			console.log(action.type);
		// 			console.log(action.payload);
		// 		});
		// 	}
		// ]
		// modules: {
		// 	a: {
		// 		namespaced: true,
		// 		state: {
		// 			text: 1
		// 		},
		// 		mutations: {
		// 			updateText(state, text) {
		// 				console.log(state);
		// 				state.text = text;
		// 			}
		// 		},
		// 		getters: {
		// 			//当前模块的state，getters,父级的state
		// 			textPlus(state, getters, rootState) {
		// 				return state.text + rootState.count;
		// 			}
		// 		}
		// 	},
		// 	b: {
		// 		state: {
		// 			text: 2
		// 		}
		// 	}
		//
		// }
	});
	if (module.hot) {
		module.hot.accept([
			'./state/state',
			'./mutations/mutations',
			'./getters/getters',
			"./actions/actions"
		], () => {
			const newState = require('./state/state').default;
			const newMutations = require('./mutations/mutations').default;
			const newGetters = require('./getters/getters').default;
			const newActions = require('./actions/actions').default;

			store.hotUpdate({
				state: newState,
				getters: newGetters,
				mutations: newMutations,
				actions: newActions,
			});
		})
	}
	return store;
};
