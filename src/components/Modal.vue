<template>
    <div class="modal">
    <div class="modal-content">
      <p>{{ modalMsg }}</p>
      <button @click="closeModal()">Fermer</button>
    </div>
  </div>
</template>
<script> 
export default {
    name : "modal",
    props : ['modalMsg'],
    methods : {
        closeModal(){
            this.$emit('closeModal');
        }
    }

}
</script>
<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    width: 300px;
    padding: 40px 30px;
    background-color: #fff;
    p {
      text-align: center;
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
}
</style>