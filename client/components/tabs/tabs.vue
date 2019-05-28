<!--有jsx就不能写template
	使用jsx需要在Vue-loader中添加
	option:{
		loader:{
			'jsx':'babel-loader',
		}
	},
	在这个项目上是去build/vue-loader.config中添加。
-->
<script lang="jsx">
	import TabContainer from './tab-container.vue';

	export default {
		name: "Tabs",
		components: {
			TabContainer,
		},
		props: {
			value: {
				type: [String, Number],
				require: true,
			}
		},
		data() {
			return {
				panes: [],
			}
		},
		render() {
			return (
					<div class="tabs">
						<ul class="tabs-header">
							{this.$slots.default}
						</ul>
						{//这里涉及到一个vue数据更新的规则
							// 因为这里渲染的是一个插槽，
							//插槽本来就不是reactive，所以需要定义组件来做。
						}
						<tab-container panes={this.panes}/>
					</div>
			);
		},
		methods: {
			onChange(index) {
				this.$emit('change', index);
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.tabs-header
		display flex
		list-style none
		margin 0
		padding 0
		border-bottom 2px solid #ededed
</style>
