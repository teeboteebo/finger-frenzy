<template>
  <div
    class="key"
    :dark="active"
    :style="{
      border: `2px solid ${$vuetify.theme.currentTheme.primary}`,
      background: active ? $vuetify.theme.currentTheme.primary : 'transparent',
    }"
  >
    <span class="symbol">{{ keyName }}</span>
  </div>
</template>
<script>
export default {
  name: "key",
  props: {
    keyName: {
      default: "n/a",
      required: true,
    },
  },
  computed: {
    active() {
      return this.$store.state.currentLetter === this.keyName;
    },
  },
};
</script>
<style lang="scss" scoped>
$size: calc(10% - 5px * 2);
.key {
  margin: 5px;
  width: $size;
  max-width: $size;
  padding-bottom: $size;
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  position: relative;
  .symbol {
    font-size: 24px;
    position: absolute;
    top: calc(50% - 18px);
  }
}
</style>