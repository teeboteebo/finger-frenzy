<template>
  <v-container>
    <v-row class="game-header">
      <v-col v-if="!gameFinished" class="d-flex align-center">
        <!-- <div>Time: {{ timeElapsed }}ms</div> -->
        <LetterCarousel />
      </v-col>
      <v-col v-else class="d-flex align-center justify-center">
        WOW! {{ totalTime }}s
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Keyboard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LetterCarousel from "@/components/LetterCarousel.vue";
import Keyboard from "@/components/Keyboard.vue";
export default {
  name: "Home",
  mounted() {
    document.addEventListener("keydown", (e) => {
      const { key } = e;
      if (key === " ") {
        this.$store.dispatch("restart");
        return;
      }

      this.$store.dispatch("handleKeyDown", key);
    });
  },
  computed: {
    gameFinished() {
      return this.$store.state.gameFinished;
    },
    timeElapsed() {
      const { timeStarted } = this.$store.state;

      const timeElapsed = new Date().getTime() - timeStarted;
      return timeElapsed;
    },
    totalTime() {
      const { timeStarted, timeEnded } = this.$store.state;

      const totalTime = timeEnded - timeStarted;
      return totalTime / 1000;
    },
  },
  components: { LetterCarousel, Keyboard },
};
</script>
<style lang="scss" scoped>
.game-header {
  height: 300px;
}
</style>
