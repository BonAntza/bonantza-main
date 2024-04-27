<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
  <div id="navbar">
    <PageLink 
      v-for="link in links" 
      :key="link.text" 
      :linkText="link.text" 
      :icon="link.icon"
      @click="handleClick(link.text)"
    />
  </div>
</template>

<script>
import PageLink from './uielems/PageLink.vue'

export default {
  name: 'MainPage',
  props: {
    msg: String
  },
  components: {
    PageLink
  },
  data() {
    return {
      links: [
        { text: "GameDevPortfolio" },
        // { text: "WebDevPortfolio" },
        { text: "Ammokrates", icon: true },
        { text: "Calendar" },
        { text: "Log in" },
      ]
    }
  },
  methods: {
    handleClick(linkText) {
      switch (linkText) {
        case 'Log in': {
          const isLoggedIn = localStorage.getItem('authToken') !== null;
          this.$router.push(isLoggedIn ? '/authenticated-page' : '/login');
          break;
        }
        case 'Calendar': {
          const isLoggedIn = localStorage.getItem('authToken') !== null;
          this.$router.push(isLoggedIn ? '/calendar' : '/login');
          break;
        }
        case 'Ammokrates': {
          window.open('https://www.ammokrates.com', '_blank');
        }
      }
    },
  }
}
</script>

<style>
#page {
  background-color: black;
}
</style>
