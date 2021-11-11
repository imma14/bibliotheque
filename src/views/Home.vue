<template>
  <div class="home">
    <book-post :post="WelcomeScreen"/>
    <book-post v-for="(post, index) in BlogPosts" :key="index" :post="post"/>
    <div class="books-list">
      <div class="title">
        <h2>Derniers livres</h2>
        <router-link class="see-all" :to="{name : 'Books'}">Voir tout</router-link>
      </div>
      <div class="books">
        <book v-for="(book, index) in Books" :key="index" :book="book" />
      </div>
    </div>
  </div>
</template>

<script>
import BookPost from '../components/BookPost.vue';
import Book from '../components/Book.vue';


export default {
  name: "Home",
  components: { 
    BookPost,
    Book
  },
  data(){
    return {
      WelcomeScreen : {
        title : "Bienvenue dans la bibliothèque !",
        blogPost : "Vous trouverez ici la liste des livres disponibles, des auteurs, des articles, et plein d'autres choses encore.",
        welcomeScreen : true,
        photo : "home-books"
      },
      
    }
  },
  mounted() {  
    window.scrollTo(0,0); 
  },
  computed : {
    Books() {
      return this.$store.getters.booksHome;
    },
    BlogPosts() {
      return this.$store.getters.blogPostsHome;
    }
  }
};
</script>
<style lang="scss">
 .post:nth-child(odd){
    flex-direction : row-reverse
  }
  @media(max-width : 600px) {
     .post:nth-child(odd){
    flex-direction : column
  }
  }
  .books-list {
    padding: 60px 20px;
    .title {
      max-width: 1440px;
      margin: 15px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        text-decoration: none;
        color: black;
        padding: 4px 12px;
        background: white;
        border-radius: 100px;
        font-size: 14px;
      }
    }
    .books {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      max-width : 1440px;
      margin: 20px auto;
    }
  }
  </style>
