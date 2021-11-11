<template>
  <div class="create-book admin">
    <loading v-show="loading" />
    <photo-preview
      :photoUrl="bookPhotoUrl"
      v-show="this.$store.state.bookPhotoPreview"
    />
    <h1>Ajouter un livre</h1>
    <input type="text" class="title" placeholder="Titre" v-model="bookTitle" />
    <div class="upload-photo">
      <input
        type="file"
        id="image"
        name="image"
        ref="bookPhoto"
        @change="changeFile"
        class="upload-file"
        accept=".png, .jpg"
      />
      <label for="image">Image</label>
      <button
        :class="{ inactive: !this.$store.state.bookPhotoUrl }"
        @click="displayPhotoPreview"
      >
        Prévisualiser
      </button>
      <p>Image : {{ bookImage }}</p>
    </div>
    <h3>AUuteur</h3>
    <input
      type="text"
      class="author"
      placeholder="Nom"
      v-model="bookAuthorLastname"
    />
    <input
      type="text"
      class="author"
      placeholder="Prénom"
      v-model="bookAuthorFirstname"
    />
    <input type="text" class="date" placeholder="Date" v-model="bookDate" />
    <div class="switch-container">
      <p>Lu ?</p>
      <label class="switch">
        <input type="checkbox" id="read" class="read" v-model="bookRead" />
        <span class="slider round"></span>
      </label>
    </div>
    <div class="switch-container">
      <p>Prêté ?</p>
      <label class="switch">
        <input type="checkbox" id="lend" class="lend" v-model="bookLend" />
        <span class="slider round"></span>
      </label>
    </div>
    <input
      v-show="bookLend"
      type="text"
      class="lend-to"
      placeholder="Prêté à"
      v-model="bookLendTo"
    />
    <div class="editor">
      <h3>Résumé</h3>
      <vue-editor :editorOptions="editorSettings" v-model="bookContent" />
    </div>
    <button @click="updateBook">Publier</button>
  </div>
</template>

<script>
import Loading from "../components/Loading.vue";
import firebase from "firebase/app";
import "firebase/storage";
import db from "../firebase/firebaseInit";
import PhotoPreview from "../components/PhotoPreview.vue";

export default {
  name: "editBook",
  components: {
    Loading,
    PhotoPreview,
  },
  data() {
    return {
      file: this.bookPhotoUrl,
      loading: false,
      currentBook: null,
      routeID: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  async mounted() {
    this.routeID = this.$route.params.bookid;
    this.currentBook = await this.$store.state.Books.filter((book) => {
      return book.bookID === this.routeID;
    });
    this.$store.commit("setBookState", this.currentBook[0]);
    window.scrollTo(0, 0);
  },
  methods: {
    changeFile() {
      this.file = this.$refs.bookPhoto.files[0];
      const filename = this.file.name;
      this.$store.commit("uploadBookImage", filename);
      this.$store.commit("createBookFileUrl", URL.createObjectURL(this.file));
    },
    displayPhotoPreview() {
      this.$store.commit("displayBookPhotoPreview", true);
    },

    async updateBook() {
      this.loading = true;
      const dataBase = await db.collection("books").doc(this.routeID);
      if (this.file) {
        const storageRef = firebase.storage().ref();
        const docRef = storageRef.child(
          `documents/bookCovers/${this.$store.state.bookImage}`
        );
        docRef.put(this.file).then((snapshot) => {
          console.log(snapshot);
        });
        const downloadURL = await docRef.getDownloadURL();
        await dataBase.update({
          bookContent: this.bookContent,
          bookPhotoUrl: downloadURL,
          bookImage: this.bookImage,
          bookTitle: this.bookTitle,
          bookAuthorLastname: this.bookAuthorLastname,
          bookAuthorFirstname: this.bookAuthorFirstname,
          bookDate: this.bookDate,
          bookLend: this.bookLend,
          bookLendTo: this.bookLendTo,
          bookRead: this.bookRead,
          profileId: this.profileId,
        });
      } else {
        await dataBase.update({
          bookContent: this.bookContent,
          bookImage: this.bookImage,
          bookTitle: this.bookTitle,
           bookAuthorLastname: this.bookAuthorLastname,
          bookAuthorFirstname: this.bookAuthorFirstname,
          bookDate: this.bookDate,
          bookLend: this.bookLend,
          bookLendTo: this.bookLendTo,
          bookRead: this.bookRead,
          profileId: this.profileId,
        });
      }

      await this.$store.dispatch("updateBook", this.routeID);
      this.loading = false;
      this.$router.push({ name: "Home" });
      return;
    },
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    bookImage() {
      return this.$store.state.bookImage;
    },
    bookPhotoUrl() {
      return this.$store.state.bookPhotoUrl;
    },
    bookTitle: {
      get() {
        return this.$store.state.bookTitle;
      },
      set(payload) {
        this.$store.commit("uploadBookTitle", payload);
      },
    },
    bookAuthorLastname: {
      get() {
        return this.$store.state.bookAuthorLastname;
      },
      set(payload) {
        this.$store.commit("uploadBookAuthorLastname", payload);
      },
    },
    bookAuthorFirstname: {
      get() {
        return this.$store.state.bookAuthorFirstname;
      },
      set(payload) {
        this.$store.commit("uploadBookAuthorFirstname", payload);
      },
    },
    bookDate: {
      get() {
        return this.$store.state.bookDate;
      },
      set(payload) {
        this.$store.commit("uploadBookDate", payload);
      },
    },
    bookRead: {
      get() {
        return this.$store.state.bookRead;
      },
      set(payload) {
        this.$store.commit("uploadBookRead", payload);
      },
    },
    bookLend: {
      get() {
        return this.$store.state.bookLend;
      },
      set(payload) {
        this.$store.commit("uploadBookLend", payload);
      },
    },
    bookLendTo: {
      get() {
        return this.$store.state.bookLendTo;
      },
      set(payload) {
        this.$store.commit("uploadBookLendTo", payload);
      },
    },
    bookContent: {
      get() {
        return this.$store.state.bookContent;
      },
      set(payload) {
        this.$store.commit("uploadBookContent", payload);
      },
    },
  },
};
</script>

<style>

</style>