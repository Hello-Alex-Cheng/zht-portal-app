<template>
  <div class="layout">
    <a-layout>
			<a-layout-header class="header">
				<div class="logo">
					<icon-font type="icon-bow" style="font-size: 2em"></icon-font>
				</div>
				<div class="header">
					<a-button type="default" size="small" @click="$router.push('/')">导航portal</a-button>
					<a-button type="default" size="small" @click="$router.push('/vue-base')">导航vue-base</a-button>
					<a-button class="logout" type="danger" size="small" @click="logoutExcutor">退出</a-button>
				</div>
			</a-layout-header>
			<a-layout>
				<a-layout-sider width="200" style="background: #fff">
					<a-menu
						mode="inline"
						v-model:selectedKeys="activeMenuKey"
						v-model:openKeys="openKeys"
						:style="{ height: '100%', borderRight: 0 }"
					>
						<template v-for="menu in application.appMenus" :key="menu.id">
							<!-- 二级菜单 -->
							<a-sub-menu v-if="menu.childMenus && menu.childMenus.length" :key="menu.id">
								<template #title>
									<span>
										<user-outlined />
										{{menu.menuName}}
									</span>
								</template>
								<a-menu-item v-for="childMenu in menu.childMenus" :key="childMenu.id">
									<router-link :to="childMenu.path">{{childMenu.menuName}}</router-link>
								</a-menu-item>
							</a-sub-menu>

							<!-- 一级菜单 -->
							<a-menu-item v-else :key="menu.id">
								<router-link :to="menu.path">
										<span>
											<user-outlined />
											{{menu.menuName}}
										</span>
								</router-link>
							</a-menu-item>
						</template>
					</a-menu>
				</a-layout-sider>
				<a-layout style="padding: 0 24px 24px">
					<a-breadcrumb style="margin: 16px 0">
						<a-breadcrumb-item>Home</a-breadcrumb-item>
						<a-breadcrumb-item>List</a-breadcrumb-item>
						<a-breadcrumb-item>App</a-breadcrumb-item>
					</a-breadcrumb>
					<a-layout-content
						:style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
					>
						<!-- 内容渲染部分 -->
						<router-view></router-view>

						<div id="subAppContainer"></div>
					</a-layout-content>
				</a-layout>
			</a-layout>
		</a-layout>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { UserOutlined, LaptopOutlined } from '@ant-design/icons-vue'
import { computed, defineComponent, onMounted, ref, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
import { removeToken } from '@/utils/auth'
import { message } from 'ant-design-vue'
import { useStore } from '@/store'
import useSingleSpa from  '@/single-spa'

export default defineComponent({
  name: 'Layout',
  props: {
    msg: String
  },
	components: {
		UserOutlined,
    LaptopOutlined
	},
  setup () {
		const router = useRouter()
		const store = useStore()
		useSingleSpa()

		onMounted(() => {})

		const logoutExcutor = () => {
			removeToken()
			router.push('/login')
			message.success('logout success!')
		}

		const activeMenuKey = ref<string[]>([])

		watch(() => activeMenuKey.value, (old, now) => {
			console.log(old.values().next(), now.values(), Object.keys(activeMenuKey.value))
		})

		console.log('数据', store.state.loginModule.applitions)

    return {
      activeMenuKey: activeMenuKey,
      collapsed: ref<boolean>(false),
      openKeys: ref<string[]>([]),
			logoutExcutor,
			globalCount: computed(() => store.state.count),
			publicPath: process.env.BASE_URL,
			application: store.state.loginModule.applitions
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.layout {
	font-size: 14px;
	background-color: #999;
	height: 100vh;
	.header {
		display: flex;
		align-items: center;
		overflow: auto;
		width: 100%;
		padding-left: 5.2em;
	}
	.header * + * {
		margin-left: 1em;
	}
	.logout {
		margin-left: auto;
		margin-right: 1.7em;
	}
	.logo {
		float: left;
		padding: .5em 1em;
		margin: 1em 1.7em 1em 1em;
		text-align: center;
		line-height: 1.2em;
		font-weight: bold;
		font-size: 1.2em;
		text-transform: capitalize;
		letter-spacing: -0.02em;
	}

	// 新版 /deep/ 语法
	:deep(.ant-layout-header) {
		overflow: hidden;
		padding: 0;
	}
	:deep(.ant-layout) {
		min-height: 100%;
	}
}
</style>
