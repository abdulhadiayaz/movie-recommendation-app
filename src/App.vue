<template>
  <v-app>
    <HorizontalNavbar />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import HorizontalNavbar from './components/HorizontalNavbar.vue';

export default {
  components: {
    HorizontalNavbar,
  },
};
</script>
