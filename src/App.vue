<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <img alt="Vue logo" src="/@/assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite1" />
  <Messagea></Messagea>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Messagea from './components/Messagea.vue'
import { getSliders } from '/@/api/home'
import { Slider } from '/@/typings/home'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    Messagea
  },
  async setup() {
    const sliders = await getSliders<Slider>()

    console.log(sliders)
    // console.log(import.meta.env.VITE_BASE_URL)
    return {}
  }
})
</script>
