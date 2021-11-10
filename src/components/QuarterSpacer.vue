<template>
  <div class="spacer"></div>
</template>
<script>
export default {
  name: "quarterspacer",
};
</script>
<style lang="scss" scoped>
$size: calc(10% / 4);
.spacer {
  width: $size;
  max-width: $size;
  padding-bottom: $size;
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
}
</style>