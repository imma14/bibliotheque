<template>
  <div class="book-modal" @click.self="closeModal">
    <div class="modal-content scale-in-center">
      <div class="book-action" :class="{'not-connected' : !isConnected}">
        <div class="admin-action" v-if="isConnected">
          <Trash @click="deleteBook" />
          <router-link
            :to="{ name: 'EditBook', params: { bookid: this.book.bookID } }"
            ><Edit
          /></router-link>
        </div>
        <div class="btn-close" @click="closeModal">&#10005;</div>
      </div>
      <div class="book-infos">
        <img :src="book.bookPhotoUrl" :alt="book.bookImage" />
        <div class="book-infos-content">
          <h2>{{ book.bookTitle }}</h2>
          <h3>{{book.bookAuthorFirstname}} {{book.bookAuthorLastname}}</h3>
          <h5>{{ book.bookDate }}</h5>
          <div class="book-content" v-html="book.bookContent"></div>
          <div v-if="book.bookRead" class="book-read">&#10003;&nbsp;Lu</div>
          <div v-else class="book-read">&#9755;&nbsp;A lire</div>
          <div class="book-lend" v-if="book.bookLend">
            Prêté à {{ book.bookLendTo }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Trash from "../assets/Icons/trash-regular.svg";
import Edit from "../assets/Icons/edit-regular.svg";

export default {
  name: "bookModal",
  computed: {
    isConnected() {
      return this.$store.state.user;
    },
  },
  props: {
    book: {
      type: Object,
    },
  },
  components: {
    Trash,
    Edit,
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    deleteBook() {
      this.$store.dispatch("deleteBook", this.book.bookID);
      this.closeModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.book-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow: auto;
    .book-action {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin: 5px 0 15px;
      &.not-connected {
          flex-direction: row-reverse;
      }
      svg {
        height: 25px;
        margin: 0 6px;
        cursor: pointer;
      }
      .btn-close {
        font-size: 26px;
        cursor: pointer;
      }
    }
    .book-infos {
      img {
        width: 170px;
        float: left;
        margin-right: 14px;
        margin-bottom: 14px;
      }
      h2 {
        font-size: 26px;
      }
      .book-content {
        margin: 20px 0;
      }
    }
  }
}
.scale-in-center {
  -webkit-animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@-webkit-keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}
@media(max-width:600px){
  .book-modal {
    .modal-content {
      width: 100%;
      height: 100vh;
      max-height: none;
      border-radius: 0;
      .book-infos {
        img {
          width: 120px;
        }
        h2 {
          font-size: 21px;
        }
        h3 {
          font-size: 16px;
        }
      }
    }
  }
}
</style>