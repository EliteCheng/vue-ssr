import Vue from "vue";
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component);
const instanceArray = [];
let seed = 1;

const removeInstance = (instance) => {
	if (!instance) return;
	const len = instanceArray.length;
	const index = instanceArray.findIndex(inst => instance.id === inst.id);
	instanceArray.splice(index, 1);
	if (len <= 1) return;
	const removeHeight = instance.vm.height;
	for (let i = index; i < len - 1; i++) {
		instanceArray[i].verticalOffset =
			parseInt(instanceArray[i].verticalOffset)
			- removeHeight - 16;
	}


};

const notify = (options) => {
	if (Vue.prototype.$isServer) return;

	const {
		autoClose,
		...rest
	} = options;


	const instance = new NotificationConstructor({
		propsData: {
			...rest,
		},
		data: {
			autoClose: autoClose === undefined ? 3000 : autoClose,
		}
	});

	const id = `notification_${seed++}`;
	instance.id = id;
	instance.vm = instance.$mount();
	document.body.appendChild(instance.vm.$el);
	instance.vm.visible = true;

	let verticalOffset = 0;
	instanceArray.forEach(item => {
		verticalOffset += item.$el.offsetHeight + 16;
	});
	verticalOffset += 16;
	instance.verticalOffset = verticalOffset;
	instanceArray.push(instance);
	instance.vm.$on('closed', () => {
		removeInstance(instance);
		document.body.removeChild(instance.vm.$el);
		//这句不会去删除dom节点，因此需要先删除dom节点，
		//再删除vue实例
		instance.vm.$destroy();
	});
	instance.vm.$on('close', () => {
		instance.vm.visible = false;
	});
	return instance.vm;
};


export default notify;
