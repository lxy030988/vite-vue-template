<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/images/logo.png">
      行政执法授权平台
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户名下拉菜单 -->
        <a-dropdown>
          <span class="ant-dropdown-link">
            <img src="@/assets/images/avator.png" />
            {{ username }}
            <!-- <DownOutlined /> -->
          </span>
          <template #overlay>
            <a-menu @click="onClick">
              <a-menu-item :key="DropdownEnum.USER_INFO">个人信息</a-menu-item>
              <a-menu-item
                :key="DropdownEnum.UPDATE_PASSWORD"
                @click='updatePwd'
              >修改密码</a-menu-item>
              <a-menu-item :key="DropdownEnum.LOGOUT">退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <update-pwd v-model:visible="visible"></update-pwd>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import updatePwd from './updatePwd/index.vue'
import { MenuInfo } from '../model'
import { DropdownEnum } from '../enum'
import { useRouter } from 'vue-router'
import { useMyStore } from '@/hooks'

export default defineComponent({
  name: 'Header',
  components: {
    updatePwd
  },
  setup() {
    const router = useRouter()
    const { state, commit } = useMyStore()
    let username = computed(() => state.user.user?.userName)
    const onClick = ({ key }: MenuInfo) => {
      // console.log(`Click on item ${key}`)
      if (key === DropdownEnum.LOGOUT) {
        try {
          commit('user/SET_USER', null)
          router.push({ path: '/login' })
        } catch (error) {
          console.error(error)
        }
      }
      if (key === DropdownEnum.UPDATE_PASSWORD) {
      }
    }
    let visible = ref(false)
    const updatePwd = () => {
      visible.value = true
    }
    return {
      username,
      onClick,
      DropdownEnum,
      visible,
      updatePwd
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  background-color: $jc-header-bgColor;
  position: relative;
  box-sizing: border-box;
  height: $jc-header-height;
  font-size: $jc-font-size-larger;
  color: $jc-color-white;
  border-bottom: 1px solid $jc-color-line-primary;
}

.header .logo {
  float: left;
  line-height: $jc-header-height;
  padding-left: $jc-default-dis;
  img {
    margin-right: 10px;
  }
}

.header-right {
  float: right;
  padding-right: $jc-default-dis * 2;
}

.header-user-con {
  display: flex;
  height: $jc-header-height;
  font-size: $jc-font-size-medium;
  align-items: center;
}

.ant-dropdown-link {
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    margin-right: $jc-default-dis * 0.4;
    border-radius: 50%;
  }
}
.ant-dropdown-menu {
  margin-top: 5px;
  padding: 10px 18px;
  margin-left: -6px;
}
</style>
