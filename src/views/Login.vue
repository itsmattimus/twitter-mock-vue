<template>
  <div id="login">
    <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
    <section id="login-form">
      <div class="col1">
        <h1>Vuegram</h1>
        <p>Welcome to a sample social media web app powered by Vue.js and Firebase.</p>
      </div>
      <div :class="{ 'signup-form': !showLoginForm }" class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>
          <div>
            <b-field label="Email">
            <b-input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
            </b-field>
          </div>
          <div>
            <b-field label="Password">
            <b-input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
            </b-field>
          </div>
          <b-button @click="login()" class="button">Log In</b-button>
          <div class="extras">
            <a @click="togglePasswordReset()">Forgot Password?</a>
            <a @click="toggleForm()">Create an Account</a>
          </div>
        </form>
        <form v-else @submit.prevent>
          <h1>Get Started</h1>
          <div>
            <b-field label="Name">
            <b-input v-model.trim="signupForm.name" type="text" placeholder="Your Name" id="name" />
            </b-field>
          </div>
          <div>
            <b-field label="Title">
            <b-input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title" />
            </b-field>
          </div>
          <div>
            <b-field label="Email">
            <b-input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />
            </b-field>
          </div>
          <div>
            <b-field label="Password">
            <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />
            </b-field>
          </div>
          <b-button @click="signup()" class="button">Sign Up</b-button>
          <div class="extras">
            <a @click="toggleForm()">Back to Log In</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import PasswordReset from '@/components/PasswordReset'
export default {
  components: {
    PasswordReset
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      },
      showLoginForm: true,
      showPasswordReset: false
    }
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.title
      })
    }
  }
}
</script>

<style scoped>
  .login-form {
    display: flex;
  }
</style>