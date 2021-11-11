<template>
  <div class="books-page">
    <h1>Livres</h1>
    <div class="books-filter">
      <div class="filter-block">
        <label for="filter">Filtrer</label>
        <select id="filter" @change="refreshRead">
          <option value="0">Tous</option>
          <option value="1">Lus</option>
          <option value="2">&Agrave; lire</option>
        </select>
      </div>
      <div class="search-block">
        <label for="search">Rechercher</label>
        <input type="text" id="search" v-model="search" placeholder="Titre, Auteur"/>
      </div>
    </div>
    <div class="books">
      <book v-for="(book, index) in filteredBooks" :key="index" :book="book" 
      v-show="book.bookRead == isRead || isRead == null "/>
    </div>
    <div class="totop" @click="toTop">&#10148;</div>
  </div>
</template>
<script>
import Book from "../components/Book.vue";
export default {
  name: "books",
  data(){
      return {
          books : this.getBooks(),
          search : "",
          isRead : null
      }
  },
  components: {
    Book,
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book => {
        return book.bookTitle.toLowerCase().includes(this.search.toLowerCase()) 
        || book.bookAuthorFirstname.toLowerCase().includes(this.search.toLowerCase()) 
        || book.bookAuthorLastname.toLowerCase().includes(this.search.toLowerCase())
      });
    },
  },
  mounted() {
    window.scrollTo(0,0); 
  },
  methods : {
      getBooks(){   
          return this.$store.state.Books;
      },
      toTop(){
          window.scrollTo({top: 0, behavior: 'smooth'});
      },
    refreshRead(e){
        if(e.target.value === "1"){
            this.isRead = true
        }
        else if(e.target.value === "2"){
            this.isRead = false
        }
        else if(e.target.value === "0"){
            this.isRead = null
        }
    }
  }
};
</script>
<style lang="scss" scoped>
.books-page {
  max-width: 1440px;
  margin: auto;
  .books-filter {
    display: flex;
    background: white;
    width: 100%;
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-bottom: 35px;
    .filter-block, .search-block {
        margin: 0 10px;
        label {
            margin-right: 8px;
        }
        input, select {
            background: white;
            border: 1px solid #757474;
            border-radius: 5px;
            padding: 4px 15px;
        }
    }
  }
  h1 {
    text-align: center;
    margin: 40px;
  }
  .books {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .totop {
      background: gray;
    width: 60px;
    height: 60px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    position: fixed;
    bottom: 10px;
    right: 10px;
    opacity: 0.5;
    transform: rotate(-90deg);
    cursor: pointer;
    font-size: 26px;
    &:hover {
        opacity: 1;
    }
  }
  @media(max-width:600px){
    .books-filter {
      flex-direction: column;
      .filter-block {
        margin-bottom: 20px;
      }
    }
  }
}
</style>