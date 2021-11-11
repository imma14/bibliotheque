import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Books: [],
    BooksHome : [],
    blogPosts: [],
    postLoaded: null,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
    blogTitle: "",
    blogExerpt: "",
    blogHtml: "Saisir du texte...",
    blogPhotoName: "",
    blogPhotoUrl: "",
    blogPhotoPreview: false,
    bookImage: "",
    bookPhotoUrl: "",
    bookTitle: "",
    bookAuthorLastname: "",
    bookAuthorFirstname: "",
    bookDate: "",
    bookRead: false,
    bookLend: false,
    bookLendTo: "",
    bookContent: "",
    bookLoaded: null,
    bookPhotoPreview: false,
  },
  mutations: {
    uploadPostTitle(state, payload) {
      state.blogTitle = payload;
    },
    uploadPostExerpt(state, payload) {
      state.blogExerpt = payload;
    },
    uploadPostHtml(state, payload) {
      state.blogHtml = payload;
    },
    uploadImage(state, payload) {
      state.blogPhotoName = payload;
    },
    uploadBookTitle(state, payload) {
      state.bookTitle = payload;
    },
    uploadBookAuthorLastname(state, payload) {
      state.bookAuthorLastname = payload;
    },
    uploadBookAuthorFirstname(state, payload) {
      state.bookAuthorFirstname = payload;
    },
    uploadBookDate(state, payload) {
      state.bookDate = payload;
    },
    uploadBookRead(state, payload) {
      state.bookRead = payload;
    },
    uploadBookLend(state, payload) {
      state.bookLend = payload;
    },
    uploadBookLendTo(state, payload) {
      state.bookLendTo = payload;
    },
    uploadBookContent(state, payload) {
      state.bookContent = payload;
    },
    createFileUrl(state, payload) {
      state.blogPhotoUrl = payload;
    },
    uploadBookImage(state, payload) {
      state.bookImage = payload;
    },
    createBookFileUrl(state, payload) {
      state.bookPhotoUrl = payload;
    },
    displayPhotoPreview(state, payload) {
      state.blogPhotoPreview = payload;
    },
    displayBookPhotoPreview(state, payload) {
      state.bookPhotoPreview = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().userName;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
    filterPost(state, payload) {
      state.blogPosts = state.blogPosts.filter(
        (post) => post.blogID !== payload
      );
    },
    filterBook(state, payload) {
      state.Books = state.Books.filter((book) => book.blogID !== payload);
    },
    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHtml = payload.blogHTML;
      state.blogExerpt = payload.blogExerpt;
      state.blogPhotoUrl = payload.blogPhotoUrl;
      state.blogPhotoName = payload.blogPhotoName;
    },
    setBookState(state, payload) {
      state.bookTitle = payload.bookTitle;
      state.bookAuthorLastname = payload.bookAuthorLastname;
      state.bookAuthorFirstname = payload.bookAuthorFirstname;
      state.bookDate = payload.bookDate;
      state.bookContent = payload.bookContent;
      state.bookImage = payload.bookImage;
      state.bookLend = payload.bookLend;
      state.bookLendTo = payload.bookLendTo;
      state.bookPhotoUrl = payload.bookPhotoUrl;
      state.bookRead = payload.bookRead;
    },
    cleanBooks(state){
      state.bookTitle = "";
      state.bookAuthorLastname = "";
      state.bookAuthorFirstname = "";
      state.bookDate = "";
      state.bookContent = "";
      state.bookImage = "";
      state.bookLend = "";
      state.bookLendTo = "";
      state.bookPhotoUrl = "";
      state.bookRead = "";
    }
  },
  getters: {
    blogPostsHome(state) {
      return state.blogPosts.slice(0, 2);
    },
    booksHome(state) {
      return state.BooksHome.slice(0, 8);
    }
  },
  actions: {
    async getCurrentUser({ commit }) {
      const dataBase = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
    },
    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });
      commit("setProfileInitials");
    },
    async getPost({ state }) {
      const dataBase = await db.collection("blogPosts").orderBy("date", "desc");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogExerpt: doc.data().blogExerpt,
            blogHTML: doc.data().blogHTML,
            blogPhotoUrl: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
            blogPhotoName: doc.data().blogCoverPhotoName,
          };
          state.blogPosts.push(data);
        }
      });
      state.postLoaded = true;
    },
    async getBooks({ state }) {
      const dataBase = await db
        .collection("books")
        .orderBy("bookAuthorLastname", "asc");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        if (!state.Books.some((book) => book.bookID === doc.id)) {
          const data = {
            bookID: doc.data().bookID,
            bookTitle: doc.data().bookTitle,
            bookAuthorLastname: doc.data().bookAuthorLastname,
            bookAuthorFirstname: doc.data().bookAuthorFirstname,
            bookContent: doc.data().bookContent,
            bookDate: doc.data().bookDate,
            bookImage: doc.data().bookImage,
            bookLend: doc.data().bookLend,
            bookLendTo: doc.data().bookLendTo,
            bookPhotoUrl: doc.data().bookPhotoUrl,
            bookRead: doc.data().bookRead,
          };
          state.Books.push(data);
        }
      });
      state.bookLoaded = true;
    },
    async getBooksHome({ state }) {
      const dataBase = await db
        .collection("books")
        .orderBy("date", "desc");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        if (!state.BooksHome.some((book) => book.bookID === doc.id)) {
          const data = {
            bookID: doc.data().bookID,
            bookTitle: doc.data().bookTitle,
            bookAuthorLastname: doc.data().bookAuthorLastname,
            bookAuthorFirstname: doc.data().bookAuthorFirstname,
            bookContent: doc.data().bookContent,
            bookDate: doc.data().bookDate,
            bookImage: doc.data().bookImage,
            bookLend: doc.data().bookLend,
            bookLendTo: doc.data().bookLendTo,
            bookPhotoUrl: doc.data().bookPhotoUrl,
            bookRead: doc.data().bookRead,
          };
          state.BooksHome.push(data);
        }
      });
      state.bookLoaded = true;
    },
    async deletePost({ commit }, payload) {
      const getPost = await db.collection("blogPosts").doc(payload);
      await getPost.delete();
      commit("filterPost", payload);
    },
    async deleteBook({ commit }, payload) {
      const getPost = await db.collection("books").doc(payload);
      await getPost.delete();
      commit("filterBook", payload);
    },
    async updatePost({ commit, dispatch }, payload) {
      commit("filterPost", payload);
      await dispatch("getPost");
    },
    async updateBook({ commit, dispatch }, payload) {
      commit("filterBook", payload);
      await dispatch("getBooks");
    },
  },
  modules: {},
});
