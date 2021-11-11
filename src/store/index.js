import Vue from "vue";
import Vuex from "vuex";
// import { useSound } from '@vueuse/sound';
// import punch from '@/assets/punch.mp3'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentLetter: 'A',
    alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    timeStarted: null,
    timeEnded: null,
    gameFinished: false,
    errors: 0
  },
  mutations: {
    setCurrentLetter(state, letter) {
      state.currentLetter = letter;
    },
    setTimeStarted(state, val) {
      state.timeStarted = val;
    },
    setTimeEnded(state, val) {
      state.timeEnded = val;
    },
    setGameFinished(state, bool) {
      state.gameFinished = !!bool;
    },
    setErrors(state, val) {
      state.errors = val;
    },
  },
  actions: {
    handleKeyDown(context, key) {
      if (
        key.toLowerCase() === context.state.currentLetter.toLocaleLowerCase()
      ) {
        if (context.state.currentLetter === 'A') {
          context.commit('setTimeStarted', new Date().getTime());
        }
        if (context.state.currentLetter === 'Z') {
          context.dispatch('endGame');
          return;
        }
        // play nice sound
        const nextLetter = context.state.alphabet[context.state.alphabet.indexOf(context.state.currentLetter) + 1];
        context.commit('setCurrentLetter', nextLetter);
        return true;
      }
      context.commit('setErrors', context.state.errors + 1)
      return false;
    },
    endGame(context) {
      //play nicer sound
      context.commit('setTimeEnded', new Date().getTime());
      context.commit('setGameFinished', true);
    },
    restart(context) {
      context.commit('setCurrentLetter', 'A');
      context.commit('setTimeStarted', null);
      context.commit('setTimeEnded', null);
      context.commit('setGameFinished', false);
      context.commit('setErrors', 0)

    },
  },
});
