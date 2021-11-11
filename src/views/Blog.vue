<template>
  <div class="blog-posts">
    <book-post v-for="(post, index) in BlogPosts" :key="index" :post="post" />
  </div>
</template>
<script>
import BookPost from "../components/BookPost.vue";

export default {
  name: "blog",
  components: {
    BookPost,
  },
  computed: {
    BlogPosts() {
      return this.$store.state.blogPosts;
    },
  },
  mounted() {
    window.scrollTo(0,0); 
  },
};
</script>
<style lang="scss" scoped>
</style>