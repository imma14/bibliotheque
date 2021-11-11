<template>
  <div class="profile">
      <Modal v-if="modalActive" :modalMsg="modalMessage" v-on:closeModal="closeModal" />
    <div class="container">
      <h2>Mon compte</h2>
      <div class="profile-info">
        <div class="initials">{{ $store.state.profileInitials }}</div>
        <div class="admin-badge">
          <adminIcon class="icon" />
          <span>admin</span>
        </div>
        <div class="input">
          <label for="firstName">Prénom:</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div class="input">
          <label for="lastName">Nom:</label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>
        <div class="input">
          <label for="userName">Utilisateur:</label>
          <input type="text" id="userName" v-model="userName" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="email" />
        </div>
        <button @click="updateProfile">Valider</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal";
import adminIcon from "../assets/Icons/user-crown-light.svg";

export default {
    name : "profile",
    components: {
    Modal,
    adminIcon,
  },
  data() {
    return {
      modalMessage: "Changements sauvegardés",
      modalActive: null,
    };
  },
  computed: {
    firstName: {
      get() {
        return this.$store.state.profileFirstName;
      },
      set(payload) {
        this.$store.commit("changeFirstName", payload);
      },
    },
    lastName: {
      get() {
        return this.$store.state.profileLastName;
      },
      set(payload) {
        this.$store.commit("changeLastName", payload);
      },
    },
    userName: {
      get() {
        return this.$store.state.profileUsername;
      },
      set(payload) {
        this.$store.commit("changeUsername", payload);
      },
    },
    email() {
      return this.$store.state.profileEmail;
    },
  },
  methods : {
     updateProfile() {
      this.$store.dispatch("updateUserSettings");
      this.modalActive = !this.modalActive;
    },
    closeModal() {
      this.modalActive = !this.modalActive;
    },
  }

}
</script>

<style lang="scss" src="../css/profile.scss" scoped>

</style>