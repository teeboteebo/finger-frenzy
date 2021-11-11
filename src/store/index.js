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
    timeElapsed: 0,
    gameFinished: false,
    errors: 0,
    interval: null,
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
      if (!state.timeStarted) {
        return;
      }
      state.errors = val;
    },
    setTimeElapsed(state, val) {
      state.timeElapsed = val;
    },
  },
  actions: {
    startTimer(context) {
      context.state.interval = setInterval(() => {
        const timeElapsed = new Date().getTime() - context.state.timeStarted;

        context.commit('setTimeElapsed', timeElapsed);
      }, 10);
    },
    clearTimer(context) {
      clearInterval(context.state.interval);
    },
    handleKeyDown(context, key) {
      if (context.state.gameFinished) {
        return;
      }
      if (
        key.toLowerCase() === context.state.currentLetter.toLocaleLowerCase()
      ) {
        if (context.state.currentLetter === 'A') {
          context.commit('setTimeStarted', new Date().getTime());
          context.dispatch('startTimer')
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
      const endTime = new Date().getTime();
      context.dispatch('clearTimer');

      context.commit('setTimeEnded', endTime);
      context.commit('setTimeElapsed', endTime - context.state.timeStarted)
      context.commit('setGameFinished', true);
    },
    restart(context) {
      context.commit('setErrors', 0)
      context.dispatch('clearTimer')
      context.commit('setTimeElapsed', 0);
      context.commit('setCurrentLetter', 'A');
      context.commit('setTimeStarted', null);
      context.commit('setTimeEnded', null);
      context.commit('setGameFinished', false);

    },
  },
});
