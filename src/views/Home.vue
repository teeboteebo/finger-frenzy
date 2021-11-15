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
    <v-row v-if="gameFinished">
      <v-col>
        <table>
          <thead>
            <td>#</td>
            <td>Score</td>
          </thead>
          <tbody>
            <tr v-for="(score, i) in highscore" :key="`${score}_${i}`">
              <td>{{i+1}}</td>
              <td>{{score}}s</td>
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
