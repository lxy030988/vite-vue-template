<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <img alt="Vue logo" src="../../assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite1" />
  <Messagea></Messagea>
  <div class="jc-svg-icon">
    <div>图标测试</div>
    <svg-icon name="qingsaoche-3"></svg-icon>
    <svg-icon name="sun"></svg-icon>
    <svg-icon name="moon"></svg-icon>
    <hr />
    <svg-icon name="test2-dynamic-avatar-2"></svg-icon>
    <svg-icon name="test2-dynamic-avatar-3"></svg-icon>
    <hr />
    <svg-icon name="test1-dynamic-avatar-1"></svg-icon>
    <hr />
    <svg-icon name="test1-test11-download-count"></svg-icon>
  </div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import Messagea from '@/components/Messagea.vue'
import { defineComponent } from 'vue'

// import { GlobleState } from '@/store'
// import { useStore } from 'vuex'
import { useMyStore } from '@/hooks/use-store'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    Messagea
  },
  setup() {
    // console.log(import.meta.env.VITE_BASE_URL)
    // const store = useStore<GlobleState>()
    // console.log(store.state.home.name)

    const { state, getters } = useMyStore()
    console.log('vuex state', state.user.loading)
    console.log('getters', getters['user/isLogin'])
    return {}
  }
})
</script>
<style lang="scss" scoped>
.jc-svg-icon {
  color: red;
}
</style>
