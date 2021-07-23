<template>
  <div class="header">
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户名下拉菜单 -->
        <a-dropdown>
          <span class="ant-dropdown-link">
            <img src="@/assets/images/avator.png" />
            {{ username }}
            <DownOutlined />
          </span>
          <template #overlay>
            <a-menu @click="onClick">
              <a-menu-item :key="DropdownEnum.USER_INFO">个人信息</a-menu-item>
              <a-menu-item :key="DropdownEnum.UPDATE_PASSWORD">修改密码</a-menu-item>
              <a-menu-item :key="DropdownEnum.LOGOUT">退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import { DownOutlined } from '@ant-design/icons-vue'
import { MenuInfo } from './model'
import { DropdownEnum } from './enum'
import { useRouter } from 'vue-router'
import { useMyStore } from '@/hooks'

export default defineComponent({
  name: 'Header',
  components: {
    DownOutlined
  },
  setup() {
    const router = useRouter()
    const { state, commit } = useMyStore()
    let username = computed(() => state.user.user?.userName)
    const onClick = ({ key }: MenuInfo) => {
      console.log(`Click on item ${key}`)
      if (key === DropdownEnum.LOGOUT) {
        try {
          commit('user/SET_USER', null)
          router.push({ path: '/login' })
        } catch (error) {
          console.error(error)
        }
      }
    }
    return {
      username,
      onClick,
      DropdownEnum
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  background-color: white;
  position: relative;
  box-sizing: border-box;
  height: $jc-header-height;
  font-size: $jc-font-size-larger;
  border-bottom: 1px solid $jc-color-line-primary;
}

.header .logo {
  float: left;
  line-height: $jc-header-height;
  padding-left: $jc-default-dis;
}

.header-right {
  float: right;
  padding-right: $jc-default-dis;
}

.header-user-con {
  display: flex;
  height: $jc-header-height;
  align-items: center;
}

.ant-dropdown-link {
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;
    margin-right: $jc-default-dis * 0.5;
    border-radius: 50%;
  }
}
</style>
