<template>
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

<script setup>
import PageLink from './uielems/PageLink.vue'
import { useRouter } from 'vue-router';
const router = useRouter();

const links = [
  // Note: the first two are not in use yet.
  { text: "GameDevPortfolio" },
  { text: "WebDevPortfolio" },
  { text: "Ammokrates", icon: true },
  { text: "Calendar" },
  { text: "Log in" },
];

/**
 * Handle link clicks and routing.
 * @param {String} linkText - forward user to different urls for a given link text.
 */
const handleClick = (linkText) => {
  switch (linkText) {
    case 'Log in': {
      const isLoggedIn = localStorage.getItem('authToken') !== null;
      router.push(isLoggedIn ? '/authenticated-page' : '/login');
      break;
    }
    case 'Calendar': {
      const isLoggedIn = localStorage.getItem('authToken') !== null;
      router.push(isLoggedIn ? '/calendar' : '/login');
      break;
    }
    // Note: external link.
    case 'Ammokrates': {
      window.open('https://www.ammokrates.com', '_blank');
    }
  }
};
</script>

<style>
#page {
  background-color: black;
}
</style>
