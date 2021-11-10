<template>
  <v-row class="carousel">
    <v-col cols="5" dir="rtl" class="before align-center d-flex">
      <span
        v-for="(letter, i) in before"
        :key="letter"
        :class="{
          third: i === 0,
          second: i === 1,
          first: i === 2,
        }"
        >{{ letter }}</span
      >
    </v-col>
    <v-col cols="2" class="current text-center">
      {{ currentLetter }}
    </v-col>
    <v-col cols="5" class="after align-center d-flex">
      <span
        v-for="(letter, i) in after"
        :key="letter"
        :class="{
          third: i === 0,
          second: i === 1,
          first: i === 2,
        }"
        >{{ letter }}</span
      >
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "LetterCarousel",
  computed: {
    currentLetter() {
      return this.$store.state.currentLetter;
    },
    before() {
      const { alphabet } = this.$store.state;
      const before = [...alphabet].slice(
        0,
        alphabet.indexOf(this.currentLetter)
      );

      return before.reverse();
    },
    after() {
      const { alphabet } = this.$store.state;
      const after = [...alphabet].slice(
        alphabet.indexOf(this.currentLetter) + 1,
        -1
      );

      return after;
    },
  },
};
</script>
<style lang="scss" scoped>
.carousel {
  .third {
    font-size: 2.5rem;
  }
  .second {
    font-size: 2rem;
  }
  .first {
    font-size: 1.5rem;
  }
  .before {
  }
  .current {
    font-size: 4rem;
  }
}
</style>