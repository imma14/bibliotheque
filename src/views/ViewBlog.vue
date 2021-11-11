<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <div class="post-header">
        <h2 v-html="this.currentBlog[0].blogTitle"></h2>
        <div v-if="isConnected" class="post-action">
          <Trash @click="deletePost"/>
          <router-link :to="{name : 'EditPost', params : {blogid : this.currentBlog[0].blogID}}"><Edit /></router-link>
        </div>
      </div>
      <h4>Posté le {{ new Date(this.currentBlog[0].blogDate).toLocaleString("fr-fr", { dateStyle: "long" }) }}</h4>
      <div class="post-content ql-editor" v-html="this.currentBlog[0].blogHTML"></div>
    </div>
  </div>
</template>

<script>
import Trash from '../assets/Icons/trash-regular.svg';
import Edit from '../assets/Icons/edit-regular.svg';

export default {
  name: "ViewBlog",
  data() {
    return {
      currentBlog: null,
    };
  },
  components : {
    Trash,
    Edit
  },
  computed : {
    isConnected(){
            return this.$store.state.user
        },
  },
  async mounted() {
    this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
      return post.blogID === this.$route.params.blogid;
    });
    window.scrollTo(0,0); 
  },
  methods : {
    deletePost(){
      this.$store.dispatch("deletePost", this.currentBlog[0].blogID);
      this.$router.push({name : 'Home'})
    },
  }
};
</script>

<style lang="scss">
.post-view {
  width: 100%;
  max-width: 960px;
  background: white;
  padding: 20px;
  margin: 30px auto;
  border-radius: 10px;
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
  .post-header {
    display : flex;
    align-items: center;
    justify-content: space-between;
    svg {
      height: 24px;
      cursor: pointer;
      margin: 0 6px;
    }
    a {
      color: #333;
    }
  }
  .post-content p{
    text-align: justify;
    line-height: 26px;
  }
}
@media(max-width:600px){
  .post-view {
    .post-content {
      img {
        width : 100%;
      }
    }
  }
}
</style>