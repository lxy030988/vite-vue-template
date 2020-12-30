<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <img alt="Vue logo" src="/@/assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite1" />
  <Messagea></Messagea>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Messagea from './components/Messagea.vue'
import { getSystemDomainLogo } from '/@/api/user'
import { Slider } from '/@/typings/user'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    Messagea
  },
  setup() {
    // const res = await getSystemDomainLogo<any>()

    // console.log(res)
    console.log(import.meta.env.VITE_BASE_URL)
    return {}
  }
})
</script>
