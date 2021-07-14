<template>
  <div class="wrapper">
    <v-head></v-head>
    <div class="wrapper-con">
      <div class="left">
        <v-sidebar></v-sidebar>
      </div>
      <div class="right">
        <div class="content-box">
          <router-view v-slot="{ Component }">
            <transition>
              <div class="content">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </div>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import VSidebar from './Sidebar/index.vue'
import VHead from './Header.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    VSidebar,
    VHead
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  flex-direction: column;
  .wrapper-con {
    flex: 1;
    display: flex;
    height: 0;
  }
}
.left {
  width: 240px;
  background: #001529;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.right {
  width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  .content-box {
    flex: 1;
    background: #f0f2f5;
    padding: 10px 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: auto;
    .content {
      box-sizing: border-box;
      background: white;
    }
  }
}
</style>