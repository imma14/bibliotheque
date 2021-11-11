<template>
  <div class="app-wrapper">
    <div class="app" v-if="this.$store.state.postLoaded">
      <navigation/>
        <transition 
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
        mode="out-in"
        >
    <router-view></router-view>
  </transition>

      <footer-app/>
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import firebase from 'firebase/app';
import "firebase/auth";
import 'animate.css';

export default {
  name: "app",
  components: {
    Navigation,
    'footer-app' : Footer
  },
  data() {
    return {};
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit('updateUser', user)
      if(user){
        this.$store.dispatch("getCurrentUser")
      }
    })
    this.$store.dispatch("getPost")
    this.$store.dispatch("getBooks")
    this.$store.dispatch("getBooksHome")
  },
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #e6e6e6;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}
.quillWrapper {
  max-width: 900px;
}
.animate__animated {
  animation-duration: 0.5s;
}
</style>
