<template>
  <div class="layout">
    <a-layout>
			<a-layout-header class="header">
				<div class="logo">
					<icon-font type="icon-bow" style="font-size: 2em"></icon-font>
				</div>
				<div class="header">
					<a-select
						ref="select"
						v-model:value="appKey"
						style="width: 120px"
						@change="handleChange"
					>
						<a-select-option v-for="app in applications" :key="app.appPrefix">
							{{app.appInstructions}}
						</a-select-option>
					</a-select>
					<a-button class="logout" type="danger" size="small" @click="logoutExcutor">退出</a-button>
				</div>
			</a-layout-header>
			<a-layout>
				<a-layout-sider width="200" style="background: #fff">
					<a-menu
						mode="inline"
						v-model:selectedKeys="activeMenuKey"
						:style="{ height: '100%', borderRight: 0 }"
					>
						<template v-for="menu in currentApp.appMenus">
							<a-sub-menu v-if="menu.childMenus && menu.childMenus.length" :key="menu.id">
								<template #title>
									<span>
										<icon-font :type="menu.menuIcon"></icon-font>
										{{menu.menuName}}
									</span>
								</template>
								<a-menu-item v-for="childMenu in menu.childMenus" :key="childMenu.id">
									<router-link :to="childMenu.path">
										<icon-font :type="childMenu.menuIcon"></icon-font>
										{{childMenu.menuName}}
									</router-link>
								</a-menu-item>
							</a-sub-menu>

							<a-menu-item v-else :key="menu.id">
								<router-link :to="menu.path">
									<span>
										<icon-font :type="menu.menuIcon"></icon-font>
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

						<!-- 子应用渲染区域 -->
						<div id="subAppContainer"></div>
					</a-layout-content>
				</a-layout>
			</a-layout>
		</a-layout>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { computed, defineComponent, ref, watch } from 'vue'
import { Select } from "ant-design-vue"
import { useRouter } from 'vue-router'
import { removeToken } from '@/utils/auth'
import { useStore } from '@/store'
import useSingleSpa from  '@/single-spa'
import { ApplicationType } from '@/store/modules/user/interface-types'
import { MutationTypes } from "@/store/modules/user/index"

// @ts-ignore
import applications from "/public/base-admin/menus"

export default defineComponent({
  name: 'Layout',
  props: {
    msg: String
  },
	components: {
		'a-select-option': Select.Option
	},
  setup () {
		const router = useRouter()
		const store = useStore()
		const activeMenuKey = ref<number[]>([1])
		const appKey = ref<string>('/zht-base-admin')

		useSingleSpa()

		watch(() => store.state.userModule.currentApp, (app, old) => {
			router.push({
				path: (app.path as string)
			})
		})

    const handleChange = (value: string) => {
			const selected = applications.find((app: ApplicationType) => app.appPrefix === value)

			activeMenuKey.value = [1]

			appKey.value = selected.appPrefix

			store.commit(`userModule/${MutationTypes.SetCurrentApp}`, selected)
		}

		// handleChange('/zht-base-admin')

		const logoutExcutor = () => {
			removeToken()
			router.push('/login')
		}

    return {
			applications: store.state.userModule.applications,
			currentApp: computed(() => store.state.userModule.currentApp),
      activeMenuKey: activeMenuKey,
      collapsed: ref<boolean>(false),
			logoutExcutor,
			appKey: appKey,
			handleChange
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
