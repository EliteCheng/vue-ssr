<template>
	<div>
		<h1>Child</h1>
		<h2>{{cnt}}</h2>
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
					list: [4, 5, 6],
				}
			};
		},
		methods: {
			clickTest() {
				this.data.list[1] = arr[1];
				this.$set(this.data.list, 1, arr[1]);
				// for (let i = 0; i < 100; i++) {
				// 	(function (i, that) {
				// 		setTimeout(() => {
				// 			that.cnt = i;
				// 			that.$nextTick(() => {
				// 				console.log(that.cnt);
				// 			});
				// 		}, 0);
				// 	})(i, this);
				// }
			},
			resetZero() {
				this.data.list = [4, 5, 6];
				this.cnt = 0;
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
