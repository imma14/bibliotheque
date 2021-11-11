<template>
    <div class="resgister credentials">
        <h1>Connexion</h1>
        <div class="error" v-if="errorMsg">{{errorMsg}}</div>
        <form>
            <label for="first-name">Prénom</label>
            <input type="text" id="first-name" name="first-name" v-model="firstName"/>
            <label for="last-name">Nom</label>
            <input type="text" id="last-name" name="last-name" v-model="lastName"/>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model="email"/>
            <label for="userName">Nom d'utilisateur</label>
            <input type="text" id="userName" name="userName" v-model="userName"/>
            <label for="password">Mot de passe</label>
            <input type="password" id="password" name="password" v-model="password"/>
            <button @click.prevent="register">Valider</button>
        </form>
        <div class="to-register">
            Déjà inscrit ?
            <router-link :to="{name : 'Login'}">Connexion</router-link>
        </div>
    </div>
</template>
<script> 
import firebase from 'firebase/app';
import "firebase/auth";
import db from '../firebase/firebaseInit'


    export default {
        name : "register",
        data() {
            return {
                userName : "",
                password : "",
                email : "",
                lastName : "",
                firstName : "",
                errorMsg : null
            }
        },
        methods : {
            async register(){
                if(this.userName !== "" &&
                    this.password !== "" &&
                    this.email !== "" &&
                    this.lastName !== "" &&
                    this.firstName !== ""){

                        this.errorMsg = "";
                        const firebaseAuth = await firebase.auth();
                        const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
                        const result = await createUser;
                        const dataBase = db.collection("users").doc(result.user.uid);
                        await dataBase.set({
                            firstName : this.firstName,
                            lastName : this.lastName,
                            email : this.email,
                            userName : this.userName,
                        })
                        this.$router.push({name : 'Home'})
                        return;
                    }
                else {
                    this.errorMsg = "Veuillez remplir tous les champs";
                    return;
                }
            }
        }

    }
</script>
<style lang="scss" scoped src="../css/login.scss">

</style>