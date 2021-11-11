<template>
     <header>
        <nav class="container">
            <div class="branding">
                <router-link :to="{name : 'Home'}">Bibliothèque</router-link>
            </div>
            <div class="top-links">
                <router-link :to="{name : 'Books'}">Livres</router-link>
                <router-link :to="{name : 'Blog'}">Blog</router-link>
                <div class="add" v-if="isConnected" v-popover:createActions>Ajouter</div>
                <popover name="createActions">
                    <router-link class="option add-blog" :to="{name : 'CreateBook'}">Livre</router-link>
                    <router-link class="option add-book" :to="{name : 'CreatePost'}">Article</router-link>
                </popover>
                <router-link :to="{name : 'Login'}" v-if="!isConnected">Connexion</router-link>
                <div v-if="isConnected" class="initials" v-popover:userMenu>{{initials}}</div>
                <popover name="userMenu">
                    <div class="option logout" @click="logout">Déconnexion</div>
                    <router-link class="option profile" :to="{name : 'Profile'}">Profil</router-link>
                </popover>

            </div>
            <BarsRegular @click="showMenu"/>
        </nav>
        <transition name="slide">
        <div class="top-links-mobile" v-show="visibleMenu" @click="showMenu">
                <router-link :to="{name : 'Home'}">Accueil</router-link>
                <router-link :to="{name : 'Books'}">Livres</router-link>
                <router-link :to="{name : 'Blog'}">Blog</router-link>
                <router-link v-if="isConnected" :to="{name : 'CreatePost'}">Ajouter un article</router-link>
                <router-link v-if="isConnected" :to="{name : 'CreateBook'}">Ajouter un livre</router-link>
                <router-link :to="{name : 'Login'}" v-if="!isConnected">Connexion</router-link>
                <router-link :to="{name : 'Home'}" v-if="isConnected" @click="logout">Déconnexion</router-link>
                
        </div>
        </transition>
    </header>
</template>
<script>
import BarsRegular from '../assets/Icons/bars-regular.svg';
import firebase from 'firebase/app';
import "firebase/auth";

export default {
    name : "navigation",
    data(){
        return {
            visibleMenu : false,
        }
    },
    components : {
        BarsRegular
    },
    computed : {
        isConnected(){
            return this.$store.state.user
        },
        initials(){
            return this.$store.state.profileInitials
        }
    },
    methods : {
        showMenu(){
            console.log(this.visibleMenu)
            this.visibleMenu  ? this.visibleMenu = false : this.visibleMenu = true
        },
        logout(){
            firebase.auth().signOut();
           window.location.reload();
        }
    }
}
</script>

<style lang="sss" scoped src="../css/navigation.scss">
 

</style>
