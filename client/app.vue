<template>
	<div id="app">
		<div id="cover"></div>
		<Header></Header>
		<p>{{fullName}} {{counter}}</p>
		<router-link to="/app">app</router-link>
		<router-link to="/login">login</router-link>
		<transition name="fade" mode="out-in">
			<router-view/>
		</transition>
		<Footer></Footer>
		<router-view name="a"/>
	</div>
</template>

<script>
	import Header from './layout/header.vue'
	import Footer from './layout/footer.jsx'
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions,
	} from 'vuex'

	export default {
		metaInfo: {
			title: 'eliteCheng\'s Todo App',
		},
		components: {
			Header,
			Footer,
		},
		mounted() {
			this.updateCountAsync({
				num: 5,
				time: 1000
			});
			// this.updateText("ccjclkajlsdjkl");
			// this.$store.dispatch('updateCountAsync', {
			// 	num: 5,
			// 	time: 1000,
			// });
			// let i = 1;
			// setInterval(() => {
			// 	this.$store.commit('updateCount', i++);
			// }, 1000);
		},
		methods: {
			...mapMutations({
				updateCount: 'updateCount',
				// updateText: 'a/updateText',
			}),
			...mapActions(['updateCountAsync']),
		},
		computed: {
			...mapState({
				counter: (state) => state.count,
				text: (state) => state.a.text,
			}),
			...mapGetters(['fullName']),
		}
	}
</script>

<style lang="stylus" scoped>
	#app {
		position absolute
		left 0
		right 0
		top 0
		bottom 0
	}

	#cover {
		position absolute
		left 0
		top 0
		right 0
		bottom 0
		background-color #999
		opacity .9
		z-index -1
	}
</style>


