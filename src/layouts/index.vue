<template>
  <div class="layout">
    <a-layout>
			<a-layout-header class="header">
				<div class="logo">
					hello_AlexCc1 {{$store.state.count}}
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
						v-model:selectedKeys="selectedKeys2"
						v-model:openKeys="openKeys"
						:style="{ height: '100%', borderRight: 0 }"
					>
						<a-sub-menu key="sub1">
							<template #title>
								<span>
									<user-outlined />
									subnav 1
								</span>
							</template>
							<a-menu-item key="1">option1</a-menu-item>
							<a-menu-item key="2">option2</a-menu-item>
							<a-menu-item key="3">option3</a-menu-item>
							<a-menu-item key="4">option4</a-menu-item>
						</a-sub-menu>
						<a-sub-menu key="sub2">
							<template #title>
								<span>
									<laptop-outlined />
									subnav 2
								</span>
							</template>
							<a-menu-item key="5">option5</a-menu-item>
							<a-menu-item key="6">option6</a-menu-item>
							<a-menu-item key="7">option7</a-menu-item>
							<a-menu-item key="8">option8</a-menu-item>
						</a-sub-menu>
						<a-sub-menu key="sub3">
							<template #title>
								<span>
									<notification-outlined />
									subnav 3
								</span>
							</template>
							<a-menu-item key="9">option9</a-menu-item>
							<a-menu-item key="10">option10</a-menu-item>
							<a-menu-item key="11">option11</a-menu-item>
							<a-menu-item key="12">option12</a-menu-item>
						</a-sub-menu>
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
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { computed, defineComponent, ref } from 'vue'
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
    LaptopOutlined,
    NotificationOutlined
	},
  setup (props) {
		console.log('这里')
    // 第一个参数是 props,即父组件传来的参数
		console.log('layout props', props)
		const router = useRouter()
		const store = useStore()
		useSingleSpa()

		const logoutExcutor = () => {
			removeToken()
			router.push('/login')
			message.success('logout success!')
		}
    return {
      selectedKeys2: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
      openKeys: ref<string[]>(['sub1']),
			logoutExcutor,
			globalCount: computed(() => store.state.count)
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
		background: #fff;
		text-align: center;
		line-height: 1.2em;
		font-weight: bold;
		font-size: 1.2em;
		text-transform: capitalize;
		letter-spacing: -0.02em;
	}

	:deep .ant-layout-header {
		overflow: hidden;
		padding: 0;
	}
	:deep .ant-layout {
		min-height: 100%;
	}
}
</style>
