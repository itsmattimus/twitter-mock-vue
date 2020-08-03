<template>
  <section id="settings">
    <div class="col1">
      <div class="top-page">
      <h3>Settings</h3>
      <p>Update your profile</p>
      <img id="userpfp" v-if="userProfile.pfp" :src="userProfile.pfp" />  
      </div>

      <transition name="fade">
        <p v-if="showSuccess" class="success">Profile Updated</p>
      </transition>

      <form @submit.prevent>
        <label for="name">Name</label>
        <input v-model.trim="name" type="text" :placeholder="userProfile.name" id="name" />

        <label for="title">Job Title</label>
        <input v-model.trim="title" type="text" :placeholder="userProfile.title" id="title" />

        <label for="pfp">Profile Picture Upload</label>
        <input type="file" id="pfpchange" accept="image/*" @change="processFile" />
        <br />
        <button @click="updateProfile()" class="button">Update Profile</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";

export default {
  data() {
    return {
      name: "",
      title: "",
      pfp: "",
      imageData: "",
      uploadValue: 0,
      showSuccess: false
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    updateProfile() {
      if (document.getElementById("pfpchange").files.length !== 0) {
        const user = firebase.auth().currentUser.uid;
        const storageRef = firebase
          .storage()
          .ref(user + "/profilePicture/" + `${this.imageData.name}`)
          .put(this.imageData);
        storageRef.on(
          `state_changed`,
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              this.pfp = url;
              console.log(this.pfp);

              this.$store.dispatch("updateProfile", {
                name: this.name !== "" ? this.name : this.userProfile.name,
                title: this.title !== "" ? this.title : this.userProfile.title,
                pfp: this.pfp,
              });
              console.log(this.pfp);

              this.name = "";
              this.title = "";
              this.pfp = "";
            });
          }
        );
      }
    },
    processFile(event) {
      this.imageData = event.target.files[0];
      this.pfp = null;
      this.uploadValue = 0;
      console.log(this.imageData);
    },
  },
};
</script>

<style>
</style>