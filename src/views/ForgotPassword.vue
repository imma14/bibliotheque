<template>
    <div class="forgot-password credentials">
        <Loading v-if="displayLoading" />
        <Modal :modalMsg="modalMsg" v-if="displayModal" v-on:closeModal="toggleModal"/>
        <h1>Mot de passe oublié ?</h1>
        <form>
            <label for="email">Saisissez votre email</label>
            <input type="email" id="email" name="email" v-model="email"/>
            <button @click.prevent="resetPassword">Réinitialiser</button>
        </form>
        <router-link :to="{name : 'Login'}">Retour</router-link>
    
    </div>
</template>
<script> 
import Modal from '../components/Modal.vue'
import Loading from '../components/Loading.vue'
import firebase from 'firebase/app';
import "firebase/auth";

    export default {
        name : "forgotPassword",
        components : {
            Modal,
            Loading
        },
        data() {
            return {
                email : "",
                modalMsg : "",
                displayLoading : false,
                displayModal : false
            }
        },
        methods : {
            resetPassword(){
                this.displayLoading = true;
                firebase.auth().sendPasswordResetEmail(this.email).then(()=>{
                 this.modalMsg = "Si votre compte existe, vous allez recevoir un email";
                 this.displayModal = true;
                 this.displayLoading = false;   
                }).catch(err=>{
                    this.modalMsg = err.message;
                    this.displayModal = true;
                    this.displayLoading = false;   
                })
            },
            toggleModal(){
                this.displayModal = !this.displayModal;
                this.email = ""
            }
        }

    }
</script>
<style lang="scss" scoped src="../css/login.scss">

</style>