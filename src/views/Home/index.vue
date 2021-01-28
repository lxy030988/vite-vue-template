<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <img alt="Vue logo" src="../../assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite1" />
  <Messagea></Messagea>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import Messagea from '@/components/Messagea.vue'

import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    Messagea
  },
  setup() {
    // console.log(import.meta.env.VITE_BASE_URL)
    const store = useStore()
    console.log(store.state.home.name)
    return {}
  }
})
</script>
