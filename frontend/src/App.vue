<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h1>Tuya Server</h1>
      </div>
    </v-app-bar>

    <v-main>
      <LandingPage/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import LandingPage from './components/LandingPage.vue';

export default Vue.extend({
  name: 'App',

  components: {
    LandingPage,
  },

  data: () => ({
    //
  }),
});
</script>
