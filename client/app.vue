<template>
	<div id="app">
		<div id="cover"></div>
		<div id="loading" v-show="loading">
			<loading></loading>
		</div>
		<Header></Header>
		<!--<p>{{fullName}} {{counter}}</p>-->
		<!--<router-link to="/app">app</router-link>-->
		<!--<router-link to="/login">login</router-link>-->
		<transition name="fade" mode="out-in">
			<router-view/>
		</transition>
		<!--<button @click="notify">click notify</button>-->
		<Footer></Footer>
		<!--<router-view name="a"/>-->
	</div>
</template>

<script>
	import Header from './layout/header.vue'
	import Footer from './layout/footer.jsx'
	import Loading from './components/loading/loading.vue'
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
			Loading,
		},
		mounted() {
			// this.updateCountAsync({
			// 	num: 5,
			// 	time: 1000
			// });
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
			// ...mapMutations({
			// 	updateCount: 'updateCount',
			// updateText: 'a/updateText',
			// }),
			// ...mapActions(['updateCountAsync']),
		},
		computed: {
			...mapState({
				counter: (state) => state.count,
				text: (state) => state.a.text,
				loading: (state) => state.loading,
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
	#loading{
		position fixed
		top 0
		right 0
		bottom 0
		left 0
		background-color rgba(255,255,255,.3)
		z-index 99
		display flex
		align-items center
		justify-content center
	}
</style>


