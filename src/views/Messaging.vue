<template>
  <section>
    <div id="dashboard">
    <div class="col2">
      <button class="button" @click="newMessage()">Message</button>
        <div v-if="messages.length">
          <div v-for="message in messages" :key="message.id" class="post">
              <h5>{{ message.username }}</h5>
            <span>{{ message.createdOn | formatDate }}</span>
            <p>{{ message.content | trimLength }}</p>
            <a @click="viewConversation(messages)">View full conversation</a>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no messages</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment"; 
// import { messageCollection } from "@/firebase";

export default {
  data() {
    return {
      messages: {
        content: "",
        image: ""
      },
    }
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
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
    }
  },
}

</script>

<style>

</style>