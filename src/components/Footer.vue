<template>
    <footer>
        <div class="container">
            <div class="footer-links">
                <div class="external-links">
                    <a href="https://thomas-lallier.fr" target="_blank">Site perso</a>
                    <a href="https://thomas-lallier.fr/romans/" target="_blank">Romans et nouvelles</a>
                    <a href="https://www.linkedin.com/in/thomas-lallier-1314ab85/" target="_blank">Linkedin</a>
                </div>
                <div class="internal-links">
                    <router-link :to="{name : 'Home'}">Accueil</router-link>
                    <router-link :to="{name : 'Books'}">Livres</router-link>
                    <router-link :to="{name : 'Blog'}">Blog</router-link>
                    <router-link :to="{name : 'Login'}">Connexion</router-link>
                </div>
            </div>
            <div class="mentions">
                <div class="stack">2021 - Vue.js / Firebase</div>
                <a href="#">Dépôt Github</a>
            </div>
        </div>
        
    </footer>
</template>
<script>
export default {
   name : "footer-app"
}
</script>
<style lang="scss" scoped src="../css/footer.scss">
    
</style>