<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
  <div id="calendar">
    <PageLink 
      v-for="link in links" 
      :key="link.text" 
      :linkText="link.text" 
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
        { text: "WebDevPortfolio" },
        { text: "Authentication" },
        { text: "Ammokrates" },
      ]
    }
  },
  methods: {
    handleClick(linkText) {
      switch (linkText) {
        case 'Authentication': {
          const isLoggedIn = localStorage.getItem('authToken') !== null;
          this.$router.push(isLoggedIn ? '/authenticated-page' : '/login');
          break;
        }
      }
    },
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
