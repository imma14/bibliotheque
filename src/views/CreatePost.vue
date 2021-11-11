<template>
  <div class="admin create-post container">
      <Loading v-show="loading" />
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Erreurr:</span>{{ this.errorMsg }}</p>
      </div>
      <photo-preview :photoUrl="blogPhotoUrl" v-show="this.$store.state.blogPhotoPreview"/>
      <h1>Créer un article</h1>
      <div class="infos">
          <input type="text" class="title" placeholder="Titre" v-model="blogTitle"/>
          <div class="upload-photo">
              <input type="file" id="image" name="image" ref="blogPhoto" @change="changeFile" class="upload-file" accept=".png, .jpg"/>
              <label for="image">Image</label>
              <button :class="{'inactive' : !this.$store.state.blogPhotoUrl}" @click="displayPhotoPreview">Prévisualiser</button>
              <p>Image : {{blogPhotoCover}}</p>
          </div>
      </div>
      <div class="chapeau">
          <h3>Chapeau</h3>
          <vue-editor :editorOptions="editorSettings" v-model="blogExerpt"/>
      </div>
      <div class="editor">
          <h3>Contenu</h3>
        <vue-editor :editorOptions="editorSettings" v-model="blogHtml" useCustomImageHandler @image-added="imageHandler"/>
      </div>
      <div class="actions">
          <button @click="publishPost">Publier</button>
      </div>
      
  </div>
</template>

<script>
import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);
import photoPreview from '../components/PhotoPreview.vue'
import firebase from 'firebase/app';
import "firebase/storage";
import db from '../firebase/firebaseInit'
import Loading from '../components/Loading.vue'


export default {
    name : "createPost",
    data() {
        return {
            file : null,
            fileName : null,
            error : null,
            errorMsg : null,
            loading: null,
            editorSettings : {
                modules : {
                    imageResize : {}
                }
            }
        }
    },
    components : {
        photoPreview,
        Loading
    },
    methods : {
        changeFile() {
            this.file = this.$refs.blogPhoto.files[0];
            const filename = this.file.name;
            this.$store.commit("uploadImage", filename);
            this.$store.commit("createFileUrl", URL.createObjectURL(this.file))
        },
        displayPhotoPreview(){
            this.$store.commit("displayPhotoPreview", true)
        },
        imageHandler(file, Editor, cursorLocation, resetUploader) {
            const storageRef = firebase.storage().ref();
            const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);
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
        publishPost() {
            if (this.blogTitle.length !== 0 && this.blogHtml.length !== 0) {
                if (this.file) {
                this.loading = true;
                const storageRef = firebase.storage().ref();
                const docRef = storageRef.child(`documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`);
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
                    const downloadURL =  await docRef.getDownloadURL();
                    const timestamp = await Date.now();
                    const dataBase = await db.collection("blogPosts").doc();
                    await dataBase.set({
                        blogID: dataBase.id,
                        blogHTML: this.blogHtml,
                        blogCoverPhoto: downloadURL,
                        blogCoverPhotoName: this.blogPhotoCover,
                        blogTitle: this.blogTitle,
                        blogExerpt : this.blogExerpt,
                        profileId: this.profileId,
                        date: timestamp,
                    });
                    this.loading = false;
                    this.$router.push({ name: "Home" });
                    }
                );
                return;
                }
                this.error = true;
                this.errorMsg = "Merci d'uploader une photo";
                setTimeout(() => {
                this.error = false;
                }, 5000);
                return;
            }
            this.error = true;
            this.errorMsg = "Les champs Titre et Contenu doivent être remplis";
            setTimeout(() => {
                this.error = false;
            }, 5000);
            return;
        }
    },
    computed : {
            profileId(){
                return this.$store.state.profileId;
            },
            blogPhotoCover(){
                return this.$store.state.blogPhotoName;
            },
            blogPhotoUrl() {
                return this.$store.state.blogPhotoUrl;
            },
            blogTitle : {
                get() {
                    return this.$store.state.blogTitle;
                },
                set(payload) {
                    this.$store.commit("uploadPostTitle", payload)
                }
            },
            blogExerpt : {
                get() {
                    return this.$store.state.blogExerpt;
                },
                set(payload) {
                    this.$store.commit("uploadPostExerpt", payload)
                }
            },
            blogHtml : {
                get() {
                    return this.$store.state.blogHtml;
                },
                set(payload) {
                    this.$store.commit("uploadPostHtml", payload)
                }
            }
        
    }
}
</script>

<style lang="scss" src="../css/admin.scss">

</style>