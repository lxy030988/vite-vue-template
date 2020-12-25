<template>
  <div :class="$style.a">
    <span :class="$style.b">aaaaa</span>
  </div>
</template>

<script>
export default {
  name: 'Message',
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped module>
.a {
  background: rebeccapurple;
  .b {
    font-size: 28px;
  }
}
</style>
