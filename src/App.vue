<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <!-- icon placeholder -->
        <h3>Frenzy Fingers</h3>
      </div>

      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-switch
          inset
          dense
          :dark="darkMode"
          hide-details
          color="secondary"
          v-model="$vuetify.theme.dark"
          :append-icon="
            $vuetify.theme.dark
              ? 'mdi-moon-waning-crescent'
              : 'mdi-white-balance-sunny'
          "
        ></v-switch>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
  watch: {
    darkMode: function () {
      localStorage.darkMode = this.$vuetify.theme.dark;
    },
  },
  computed: {
    darkMode() {
      return this.$vuetify.theme.dark;
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  font-family: monospace, monospace;
}
</style>