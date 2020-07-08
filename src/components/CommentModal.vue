<template>
  <div class="c-container">
    <p>Add a comment</p>
    <form @submit.prevent>
      <textarea v-model.trim="comment"></textarea>
      <button @click="addComment()" :disabled="comment == ''" class="button">Add comment</button>
      <a id="close" @click="$emit('close')">Close</a>
      <hr/>
    </form>
  </div>
</template>

<script>
import { commentsCollection, postsCollection, auth } from '@/firebase'

export default {
  props: ['post'],
  data() {
    return {
      comment: ''
    }
  },
  methods: {
    async addComment() {
      // create comment
      await commentsCollection.add({
        createdOn: new Date(),
        content: this.comment,
        postId: this.post.id,
        userId: auth.currentUser.uid,
        userName: this.$store.state.userProfile.name
      })

      // update comment count on post
      await postsCollection.doc(this.post.id).update({
        comments: parseInt(this.post.comments) + 1
      })

      // close modal
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
div.c-container {
  margin: 10px;
}
hr {
  margin-left: 10px;
  margin-right: 10px;
}
</style>