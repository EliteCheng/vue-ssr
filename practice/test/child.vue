<template>
	<div>
		<h1>Child</h1>
		<h2>{{cnt}}</h2>
		<!--<h3>{{data.list.a.b}}h3>-->
		<ol>
			<li v-for="item in data.list" :key="item">
				{{item}}
			</li>
		</ol>
		<button @click="clickTest">点击触发</button>
		<button @click="resetZero">归零</button>
	</div>
</template>

<script>
	const arr = [1, 2, 3];

	export default {
		name: "child",
		data() {
			return {
				cnt: 0,
				data: {
					list: [1, 2, 3]
				}
			};
		},
		methods: {
			clickTest() {
				this.data.list[0] = 10;
				console.log(this.data.list);
				// this.data.list[1] = arr[1];
				// this.$set(this.data.list, 1, 10);
				for (let i = 0; i < 100; i++) {
					// setTimeout(() => {
						this.cnt = i;
					// }, 0);
				}
			},
			resetZero() {
				// this.data.list = [4, 5, 6];
				// this.cnt = 0;
			},
		}
	}
</script>

<style scoped>
	button {
		border: none;
		padding: 5px 10px;
		font-family: 楷体, serif;
		font-size: large;
	}
</style>
