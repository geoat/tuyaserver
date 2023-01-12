import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify, {
  iconfont: 'mdi'
});

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#fc5603',
        secondary: '#3D84F5',
      },
    },
  },
})

export default vuetify
