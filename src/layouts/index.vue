<template>
  <div class="hello">
    <a-layout id="components-layout-demo-custom-trigger">
			<a-layout-sider v-model="collapsed" :trigger="null" collapsible>
				<div class="logo" />
				<div class="side-menu">
					<a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
						<a-menu-item v-for="item in subAppLists" :key="item.homePath">
							<router-link :to="item.homePath">
								<a-icon type="user" />
								<span>{{item.name}}</span>
							</router-link>
						</a-menu-item>
					</a-menu>
				</div>
			</a-layout-sider>
			<a-layout>
				<a-layout-header style="background: #fff; padding: 0">
					<a-icon
						class="trigger"
						:type="collapsed ? 'menu-unfold' : 'menu-fold'"
						@click="() => (collapsed = !collapsed)"
					/>
          <h3>头部</h3>
				</a-layout-header>
				<a-layout-content
					:style="{ margin: '24px 16px', padding: '24px', background: '#fff' }"
				>
					<!-- 主体内容渲染部分 -->
					<router-view></router-view>

					<!-- 子应用入口 -->
					<div id="subAppContainer"></div>
				</a-layout-content>
			</a-layout>
		</a-layout>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Layout',
  props: {
    msg: String
  },
  setup (props) {
    // 第一个参数是 props,即父组件传来的参数
    const collapsed = ref(false)
    const subAppLists = [
		{
			name: 'vue app',
			homePath: '/vue'
		},
		{
			name: 'login',
			homePath: '/login'
		},
		{
			name: 'home',
			homePath: '/home'
		}
	]

    return {
      collapsed,
      subAppLists
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#layouts {
	width: 100%;
	height: 100%;
}
	#components-layout-demo-custom-trigger {
		position: relative;
		height: 100%;
		margin: 0;
		padding: 0;
	}
	#components-layout-demo-custom-trigger .trigger {
		font-size: 18px;
		line-height: 64px;
		padding: 0 24px;
		cursor: pointer;
		transition: color 0.3s;
	}
	#components-layout-demo-custom-trigger .trigger:hover {
		color: #1890ff;
	}
	#components-layout-demo-custom-trigger .logo {
		height: 32px;
		background: rgba(255, 255, 255, 0.2);
		margin: 16px;
	}

	.ant-layout-sider {
		overflow-y: scroll;
	}
	.ant-layout-sider::-webkit-scrollbar {
		display:none;
	}
</style>
