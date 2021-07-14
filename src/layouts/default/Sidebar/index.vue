<template>
  <div class="sidebar">
    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" class="sidebar-el-menu" mode="inline" theme="dark" @click="clickMenu">
      <sidebar-item v-for="item in navs" :key="item.id" :item="item" />
    </a-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MenuInfo } from '../model'

import SidebarItem from './SidebarItem.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  setup() {
    const state = reactive({
      collapsed: false,
      selectedKeys: ['home'],
      openKeys: [''],
      navs: [
        {
          id: 1,
          parentId: 0,
          icon: 'home',
          path: 'home',
          name: '系统首页'
        },
        {
          id: 2,
          parentId: 0,
          icon: 'setting',
          path: 'setting',
          name: '系统设置',
          children: [
            {
              id: 26,
              parentId: 2,
              path: 'plan',
              name: '计划页面'
            },
            {
              id: 27,
              parentId: 2,
              path: 'upload',
              name: '文件上传'
            }
          ]
        }
      ]
    })

    const router = useRouter()
    function clickMenu(v: MenuInfo) {
      console.log('clickMenu', v)
      router.push({ path: '/' + v.keyPath.join('/') })
    }

    const route = useRoute()
    // console.log('route', route.fullPath)
    const curs = route.path.slice(1).split('/')
    state.selectedKeys = [curs[curs.length - 1]]
    state.openKeys = curs.slice(0, curs.length - 1)

    return {
      ...toRefs(state),
      clickMenu
    }
  }
})
</script>

<style scoped lang="scss">
.sidebar {
  // display: block;
  // position: absolute;
  // left: 0;
  // top: 70px;
  // bottom: 0;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  flex: 1;
  ::v-deep(.svg-icon) {
    margin-right: 14px;
    font-size: 18px;
  }
}
// .sidebar::-webkit-scrollbar {
//   width: 0;
// }
// .sidebar-el-menu:not(.el-menu--collapse) {
//   width: 250px;
// }
.sidebar > ul {
  height: 100%;
}
::v-deep(.el-menu) {
  border-right: none;

  svg {
    color: #5192ee;
  }
  .el-menu-item.is-active {
    background: #4486e6 !important;
    background: linear-gradient(to right, #639ff7, #1d67d0) !important;
    svg {
      color: white;
    }
  }
}
::v-deep(.el-menu--collapse) {
  .el-submenu > .el-submenu__title > span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
  .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
}
</style>
