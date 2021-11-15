<template>
  <v-container class="hello">
    <v-row class="game-header">
      <v-col v-if="!gameFinished" class="d-flex align-center justify-center">
        <div style="width: 100%" class="text-center">
          <LetterCarousel />
          <br />
          <div class="d-flex align-center justify-center">
            {{ timeElapsed }}s
          </div>
        </div>
      </v-col>
      <v-col v-else class="d-flex align-center justify-center text-center">
        <div>
          <h3>🎉{{ timeElapsed }}s🎉</h3>
          <br />
          <b class="d-block"
            ><span v-if="errors > 0">{{ errors }} errors...</span
            ><span v-else>Flawless.</span></b
          >
          <br />
          Press SPACE to play again
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <Keyboard />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center flex-column align-center">
        <h2 class="flex-1">HIGHSCORE</h2> <br>
        <table >
          <thead>
            <td><b>#</b></td>
            <td><b>Score</b></td>
          </thead>
          <tbody>
            <tr v-for="(score, i) in highscore" :key="`${score}_${i}`">
              <td style="min-width: 100px;">{{ i+1 }}.</td>
              <td>{{ score / 1000 }}s</td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LetterCarousel from "@/components/LetterCarousel.vue";
import Keyboard from "@/components/Keyboard.vue";
import { useSound } from "@vueuse/sound";
import punch from "@/assets/punch.mp3";
export default {
  name: "Home",
  setup() {
    const { play } = useSound(punch);
    return { play };
  },
  mounted() {
    document.addEventListener("keydown", async (e) => {
      const { key } = e;
      if (key === " ") {
        e.preventDefault() // prevent scrolling
        this.$store.dispatch("restart");
        return;
      }
      const correct = await this.$store.dispatch("handleKeyDown", key);
      if (correct) {
        this.play();
      }
    });
  },
  computed: {
    highscore() {
      return this.$store.state.highscore;
    },
    errors() {
      return this.$store.state.errors;
    },
    gameFinished() {
      return this.$store.state.gameFinished;
    },
    timeElapsed() {
      return this.$store.state.timeElapsed / 1000;
    },
  },
  components: { LetterCarousel, Keyboard },
};
</script>
<style lang="scss" scoped>
.hello {
  max-width: 800px !important;
}
.game-header {
  height: 300px;
}
</style>
