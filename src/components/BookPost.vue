<template>
     <div class="post welcome" v-if="post.welcomeScreen">
        <div class="image">
            <img v-lazy="require(`../assets/biblio-welcome.jpg`)" /> 
        </div>
        <div class="content">
            <h3>Bienvenue dans la bibliothèque</h3>
            <p>{{post.blogPost}}</p>
        </div>
    </div>
     <div class="post" v-else>
     <div class="image">
         <img v-lazy="post.blogPhotoUrl" /> 
        </div>
        <div class="content">
            <h3 v-html="post.blogTitle"></h3>
            <p v-html="post.blogExerpt"></p>
            <router-link :to="{name : 'ViewBlog', params : {blogid : this.post.blogID}}">En savoir plus</router-link>
        </div>
    </div>
</template>
<script>
export default{
   name : "book-post",
   props : {
       post : {
           type : Object
       }
   },
}
</script>
<style lang="scss" scoped src="../css/book-post.scss">
    
</style>