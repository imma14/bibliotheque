import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Books from '../views/Books.vue';
import Blog from '../views/Blog.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import Profile from '../views/Profile.vue';
import ViewBlog from '../views/ViewBlog.vue';
import CreatePost from '../views/CreatePost.vue';
import EditPost from '../views/EditPost.vue';
import CreateBook from '../views/CreateBook.vue';
import EditBook from '../views/EditBook.vue';
import firebase from 'firebase/app';
import "firebase/auth";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta : {
      title : 'Bibliothèque | Accueil'
    }
  },
  {
    path: "/livres",
    name: "Books",
    component: Books,
    meta : {
      title : 'Bibliothèque | Livres'
    }
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
    meta : {
      title : 'Bibliothèque | Blog'
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta : {
      title : 'Bibliothèque | Connexion'
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta : {
      title : 'Bibliothèque | Créer un compte'
    }
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta : {
      title : 'Bibliothèque | Réinisialiser le mot de passe'
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta : {
      title : 'Bibliothèque | Profile',
      requiresAuth: true,
    }
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta : {
      title : 'Bibliothèque | Créer un article',
      requiresAuth: true,
    }
  },
  {
    path: "/view-blog/:blogid",
    name: "ViewBlog",
    component: ViewBlog,
    meta: {
      title: "Bibliothèque | Article",
      requiresAuth: false,
    },
  },
  {
    path: "/edit-blog/:blogid",
    name: "EditPost",
    component: EditPost,
    meta: {
      title: "Bibliothèque | Editer",
      requiresAuth: true,
    },
  },
  {
    path: "/create-book",
    name: "CreateBook",
    component: CreateBook,
    meta: {
      title: "Bibliothèque | Créer un livre",
      requiresAuth: true,
    },
  },
  {
    path: "/edit-book/:bookid",
    name: "EditBook",
    component: EditBook,
    meta: {
      title: "Bibliothèque | Editer",
      requiresAuth: true,
    },
  },
  { path: "*", 
  component: Home }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
})

router.beforeEach(async (to, from, next) => {
  let user = firebase.auth().currentUser;
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      return next();
    }
    return next({ name: "Home" });
  }
  return next();
});

export default router;
