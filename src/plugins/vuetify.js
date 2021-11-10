import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: localStorage.darkMode ? JSON.parse(localStorage.darkMode) : false,
  },
});
