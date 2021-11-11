<template>
    <div class="book">
        <div class="image">
            <img v-lazy="book.bookPhotoUrl" /> 
        </div>
        <div class="content">
            <div class="infos">
                <h3 v-snip:css="3" v-html="book.bookTitle"></h3>
                <h4 v-snip:css="2" v-html="authorHTML(book)"></h4>
                <h5 v-html="book.bookDate"></h5>
            </div>
            <button @click="toggleBookModal" >Voir</button>
        </div>
        <BookModal v-show="displayBookModal" :book="book" v-on:closeModal="toggleBookModal"/>
    </div>
</template>
<script>
import BookModal from '../components/BookModal.vue'

export default {
    name : "book",
    components : {
        BookModal
    },
    props : {
        book : {
            type : Object
        }
    },
    data(){
        return {
            displayBookModal : false
        }
    },
    methods : {
        toggleBookModal(){
            this.displayBookModal = !this.displayBookModal
        },
        authorHTML: function(item) {
            return item.bookAuthorFirstname+" "+item.bookAuthorLastname;
        }
    }
}
</script>
<style lang="scss" scoped src="../css/book.scss">

</style>