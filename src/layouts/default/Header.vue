<template>
  <div class="header">
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户名下拉菜单 -->
        <a-dropdown>
          <span class="ant-dropdown-link">
            <img src="@/assets/logo.png" />
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
import { defineComponent, ref } from 'vue'

import { DownOutlined } from '@ant-design/icons-vue'
import { MenuInfo } from './model'
import { DropdownEnum } from './enum'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Header',
  components: {
    DownOutlined
  },
  setup() {
    const router = useRouter()
    let username = ref('admin')
    const onClick = ({ key }: MenuInfo) => {
      console.log(`Click on item ${key}`)
      if (key === DropdownEnum.LOGOUT) {
        router.push({ path: '/login' })
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
  // width: 100%;
  height: 50px;
  font-size: 22px;
  // color: #fff;
  border-bottom: 1px solid #eee;
}

.header .logo {
  float: left;
  width: 250px;
  line-height: 50px;
}

.header-right {
  float: right;
  padding-right: 50px;
}

.header-user-con {
  display: flex;
  height: 50px;
  align-items: center;
}

.ant-dropdown-link {
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
  }
}
</style>
