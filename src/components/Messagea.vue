<template>
  <div :class="$style.a">
    <span :class="$style.b">aaaaa</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Message',
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped module>
.a {
  display: flex;
  box-shadow: 0px 0px 3px #121212 inset;
  background: rebeccapurple;
  .b {
    font-size: 28px;
  }
}
::placeholder {
  color: gray;
}
</style>
