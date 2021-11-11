<template>
    <div class="login credentials">
        <h1>Connexion</h1>
        <div class="error" v-if="errorMsg">{{errorMsg}}</div>
        <div v-if="!isConnected">
            <form>
                <label for="login">Login</label>
                <input type="email" id="login" name="login" v-model="login"/>
                <label for="password">Mot de passe</label>
                <input type="password" id="password" name="password" v-model="password"/>
                <button @click.prevent="signIn">Connexion</button>
            </form>
            <router-link :to="{name : 'ForgotPassword'}">Mot de passe oublié ?</router-link>
            <div class="to-register">
                Pas encore de compte ?
                <router-link :to="{name : 'Register'}">Créer un compte</router-link>
            </div>
        </div>
        <div v-else>
            <h2>Vous êtes déjà connecté</h2>
        </div>
        
    </div>
</template>
<script> 
import firebase from 'firebase/app';
import "firebase/auth";
    export default {
        name : "login",
        data() {
            return {
                login : "",
                password : "",
                errorMsg : null
            }
        },
        computed : {
            isConnected(){
                return this.$store.state.user
            }
        },
        beforeCreate : {
            redirectConnected(){
                if(this.isConnected){
                    this.$route.push({name : 'Home'})
                }
            }
        },
        methods : {
            signIn(){
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.login, this.password)
                    .then(() => {
                        this.$router.push({ name: "Home" });
                    })
                    .catch(err => {
                        this.errorMsg = err.message;
                    });
            }
        }

    }
</script>
<style lang="scss" scoped src="../css/login.scss">

</style>