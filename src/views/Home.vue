<template>
  <div id="dashboard">
    <transition name="fade">
      <CommentModal v-if="showCommentModal" :post="selectedPost" @close="toggleCommentModal()"></CommentModal>
    </transition>
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <p>{{ userProfile.title }}</p>
          <img :src="userProfile.pfp" />
          <div class="create-post">
            <p>Create a post</p>
            <form @submit.prevent>
              <textarea v-model.trim="post.content" placeholder="Whats on your mind?"></textarea>
              <input v-model.trim="post.image" placeholder="Add image url here!" />
              <button @click="createPost()" :disabled="post.content === ''" class="button">Post</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col2">
        <div v-if="posts.length">
          <div v-for="post in posts" :key="post.id" class="post">
            <router-link :to="'profile/' + post.userId" :post="selectedUser">
              <h5>{{ post.username }}</h5>
            </router-link>
            <span>{{ post.createdOn | formatDate }}</span>
            <img v-if="post.image" :src="post.image" />
            <p>{{ post.content | trimLength }}</p>
            <ul>
              <li>
                <a @click="toggleCommentModal(post)">Comments {{ post.comments }}</a>
              </li>
              <li>
                <a @click="likePost(post.id, post.likes)">Likes {{ post.likes }}</a>
              </li>
              <li>
                <a @click="viewPost(post)">View full post</a>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>

    <!-- full post modal -->
    <transition name="fade">
      <div v-if="showPostModal" class="p-modal">
        <div class="p-container">
          <a @click="closePostModal()" class="close">Close</a>
          <div class="post">
            <h5>{{ fullPost.username }}</h5>
            <span>{{ fullPost.createdOn | formatDate }}</span>
            <p>{{ fullPost.content }}</p>
            <ul>
              <li>
                <a>Comments {{ fullPost.comments }}</a>
              </li>
              <li>
                <a>Likes {{ fullPost.likes }}</a>
              </li>
            </ul>
          </div>
          <div v-show="postComments.length" class="comments">
            <div v-for="comment in postComments" :key="comment.id" class="comment">
              <p>{{ comment.username }}</p>
              <span>{{ comment.createdOn | formatDate }}</span>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { commentsCollection } from "@/firebase";
// import { usersCollection } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
import CommentModal from "@/components/CommentModal";

export default { 
  components: {
    CommentModal,
  },
  data() {
    return {
      post: {
        content: "",
        image: "",
      },
      showCommentModal: false,
      userId: "",
      selectedPost: {},
      selectedUser: {},
      showPostModal: false,
      fullPost: {},
      postComments: [],
    };
  },
  computed: {
    ...mapState(["userProfile", "posts"]),
  },
  created() {
    // this.getUser();
  },
  methods: {
    createPost() {
      this.$store.dispatch("createPost", {
        content: this.post.content,
        image: this.post.image,
      });
      (this.post.content = ""), (this.post.image = "");
    },
    toggleCommentModal(post) {
      this.showCommentModal = !this.showCommentModal;
      // if opening modal set selectedPost, else clear
      if (this.showCommentModal) {
        this.selectedPost = post;
      } else {
        this.selectedPost = {};
      }
    },
    likePost(id, likesCount) {
      this.$store.dispatch("likePost", { id, likesCount });
    },
    async viewPost(post) {
      const docs = await commentsCollection
        .where("postId", "==", post.id)
        .get();
      docs.forEach((doc) => {
        let comment = doc.data();
        comment.id = doc.id;
        this.postComments.push(comment);
      });
      this.fullPost = post;
      this.showPostModal = true;
    },
    closePostModal() {
      this.postComments = [];
      this.showPostModal = false;
    },
    // async getUser(post) {
    //   const docs = await usersCollection.where("userId", "==", post.userId).get();
    //   docs.forEach((doc) => {
    //     if (doc.exists) {
    //       return post.userId;
    //     }
    //   });
    // },
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      let date = val.toDate();
      return moment(date).fromNow();
    },
    trimLength(val) {
      if (val.length < 200) {
        return val;
      }
      return `${val.substring(0, 200)}...`;
    },
  },
};
</script>

<style>
</style>
