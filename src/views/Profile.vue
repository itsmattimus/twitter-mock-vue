<template>
  <section>
    <div>
      <h1>bob, do something</h1>
      <h1>bob, do something</h1>
      <h1>bob, do something</h1>
      <h1>bob, do something</h1>
      <h1>bob, do something</h1>
      <h1>bob, do something</h1>
    </div>
  </section>
</template>

<script>
import { usersCollection } from "@/firebase";

export default {
  props: ['userId'],
  data() {
    return {}
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const userDocs = await usersCollection
        .where("userId")
        .get();
      userDocs.forEach((doc) => {
        if (doc.exists) {
          return;
        }
      });
    },
  },
};
</script>

<style>
</style>