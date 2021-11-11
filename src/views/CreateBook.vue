<template>
  <div class="create-book admin">
    <Loading v-show="loading" />
    <div :class="{ invisible: !error }" class="err-message">
      <p><span>Erreur:</span>{{ this.errorMsg }}</p>
    </div>
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
    <h3>Auteur</h3>
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
      <vue-editor
        :editorOptions="editorSettings"
        v-model="bookContent"
        useCustomImageHandler
        @image-added="imageHandler"
      />
    </div>
    <button @click="publishBook">Publier</button>
  </div>
</template>

<script>
import Loading from "../components/Loading.vue";
import firebase from "firebase/app";
import "firebase/storage";
import db from "../firebase/firebaseInit";
import PhotoPreview from "../components/PhotoPreview.vue";

export default {
  name: "createBook",
  components: {
    Loading,
    PhotoPreview,
  },
  data() {
    return {
      file: null,
      loading: false,
      error: null,
      errorMsg: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
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
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/bookPhotos/${file.name}`);
      docRef.put(file).on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          Editor.insertEmbed(cursorLocation, "image", downloadURL);
          resetUploader();
        }
      );
    },
    publishBook() {
      if (this.file) {
        this.loading = true;
        const storageRef = firebase.storage().ref();
        const docRef = storageRef.child(
          `documents/bookCovers/${this.$store.state.bookImage}`
        );
        docRef.put(this.file).on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot);
          },
          (err) => {
            console.log(err);
            this.loading = false;
          },
          async () => {
            const downloadURL = await docRef.getDownloadURL();
            const timestamp = await Date.now();
            const dataBase = await db.collection("books").doc();
            await dataBase.set({
              bookID: dataBase.id,
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
              date: timestamp,
            });
            this.loading = false;
            this.$store.commit("cleanBooks");
            this.$router.push({ name: "Home" });
          }
        );
      } else {
        this.error = true;
        this.errorMsg = "Merci d'uploader une photo";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }
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

<style lang="scss" scoped>
.create-book {
  width: 100%;
  max-width: 1200px;
  margin: 30px auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  input[type="text"] {
    display: block;
    margin: 10px 0;
    width: 90%;
    padding: 6px;
    border: 1px solid #a3a1a1;
    border-radius: 5px;
  }
  input[type="checkbox"] {
    display: block;
    margin: 10px 0;
  }
}
</style>