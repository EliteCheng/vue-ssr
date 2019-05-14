import Vue from 'vue';

const app = new Vue({
	el: "#root",
	template: `
	<div>
		<p>{{text}}</p>
		<p v-html="html"></p>
		<p v-show="false">no Show</p>
		<p v-show="true">show</p>
		<!--
		v-if是直接把这个节点直接注释掉，
		如果v-if=的属性常常修改就会导致频繁的动态增删节点，
		性能消耗大，这种情况建议使用v-show。
		如果基本不怎么修改的属性可这么使用减少DOM节点数量，
		降低DOM流。 
		-->
		<p v-if="active">if content</p>
		<p v-else>else content</p>
		
		<!--
			v-for的key优化，因为v-for遍历的数据是响应式的，
			一旦做了修改，vue会去修改DOM，那么有了key之后，
			vue就能够更方便准确的找到是循环中的那个key节点
			发生改变，根据这个key去修改dom节点，这样会减少
			不必要的dom操作。其实主要是用在vdom中。
			而且带有key的vnode是会有缓存的，如果vue监听到
			数据变化，并且缓存中有这个vnode,会直接把这个vnode
			渲染到页面上去。
		-->
		<ul>
			<li><h3>遍历数组</h3></li>
			<li v-for="(item,index) in arr"
			:key="item"
			>{{item}}:{{index}}</li>
		</ul>
		<ul>
			<li><h3>遍历对象</h3></li>
			<li v-for="(val,key,index) in obj"
			:key="val"
			>{{index}} {{key}}:{{val}}</li>
		</ul>
		<div><input type="text" v-model="text"></div>
		<div>v-model.number:<input type="text" v-model.number="text"></div>
		<div>v-model.trim:<input type="text" v-model.trim="text"></div>
		<div>v-model.lazy:<input type="text" v-model.lazy="text"></div>
		
		<div>
			<h3>checkbox给Arr加值</h3>
			1:<input type="checkbox" :value="1" v-model="arr">	
			2:<input type="checkbox" :value="2" v-model="arr">	
			3:<input type="checkbox" :value="3" v-model="arr">	
		</div>
		
		<div>
			<h3>radio给picked选值={{picked}}</h3>
			<label>one:<input type="radio" value="one" v-model="picked"></label>	
			<label>two:<input type="radio" value="two" v-model="picked"></label>	
		</div>
		
	</div>`,
	data: {
		text: 0,
		active: true,
		html: `<span>this is html</span>`,
		arr: [1, 2, 3],
		picked: 'one',
		obj: {
			a: 123,
			b: 456,
			c: 789,
		}
	}
});

