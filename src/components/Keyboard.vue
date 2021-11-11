<template>
  <div class="keyboard">
    <div class="d-flex" v-for="(row, i) in layout" :key="`row_${i}`" style="">
      <QuarterSpacer
        v-for="(spacer, spacerIndex) in i"
        :key="`spacer_${spacerIndex}`"
      />
      <Key :keyName="key" v-for="key in row" :key="key" />
    </div>
  </div>
</template>
<script>
import Key from "./Key.vue";
import QuarterSpacer from "./QuarterSpacer.vue";
export default {
  name: "Keyboard",
  data() {
    return {
      layout: [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M"],
      ],
    };
  },

  components: {
    Key,
    QuarterSpacer,
  },
};
</script>
<style lang="scss" scoped>
</style>