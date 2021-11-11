<template>
  <div class="preview">
      <img :src="photoUrl"/>
      <button @click="closePreview">Fermer</button>
  </div>
</template>

<script>
export default {
    name : "photoPreview",
    props : ['photoUrl'],
    methods : {
        closePreview(){
            this.$store.commit("displayPhotoPreview", false)
            this.$store.commit("displayBookPhotoPreview", false)
        }
    }

}
</script>

<style lang="scss" scoped>
.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  flex-direction: column;
    img {
        max-width: 60vw;
        max-height: 60vh;
    }
    button {
            width: 200px;
            margin: 16px auto;
            font-size: 18px;
            padding: 5px;
            border-radius: 100px;
            border: none;
            color: white;
            background: #333;
            cursor: pointer;
            &:hover {
                background: rgb(82, 81, 81);
            }
        }
  }


</style>