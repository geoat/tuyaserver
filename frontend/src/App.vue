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
      <v-spacer></v-spacer>
      <div>
        <v-btn icon @click="quit()">
          <v-icon>mdi-power</v-icon>
        </v-btn></div>
    </v-app-bar>

    <v-main>
      <LandingPage/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import LandingPage from './components/LandingPage.vue';
import DevicesService from './services/DevicesService'

export default Vue.extend({
  name: 'App',

  components: {
    LandingPage,
  },
  methods: {
      quit: function() {
        if (confirm("Are you sure you want to quit the server.?")) {
          DevicesService.quit().finally(() => {
            console.log('Destroying')
            this.$destroy();
            window.close();
          });
        } 
      }
  },

  data: () => ({

  }),
});
</script>
