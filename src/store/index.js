import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('setPosts', postsArray)
})

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: []
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPosts(state, val) {
      state.posts = val
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val
    }
  },
  actions: {
    async login({ dispatch }, form) {
      //sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

      //fetch profile
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {

      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())

      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

      // create user profile object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        title: form.title,
        pfp: ""
      })

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async logout({ commit }) {
      await fb.auth.signOut()

      // clear userProfile and redirect to /login
      commit('setUserProfile', {})
      router.push('/login')
    },
    async createPost({ state }, post) {
      await fb.postsCollection.add({
        createdOn: new Date(),
        content: post.content,
        image: post.image,
        userId: fb.auth.currentUser.uid,
        username: state.userProfile.name,
        comments: 0,
        likes: 0
      })
    },
    async likePost({ commit }, post) {
      const userId = fb.auth.currentUser.uid
      const docId = `${userId}_${post.id}`

      // check if user has liked post
      const doc = await fb.likesCollection.doc(docId).get()
      if (doc.exists) { return }

      // create post
      await fb.likesCollection.doc(docId).set({
        postId: post.id,
        userId: userId
      })
      // update post likes count
      fb.postsCollection.doc(post.id).update({
        likes: post.likesCount + 1
      })
      commit('doc');
    },
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid
      // update user object
      await fb.usersCollection.doc(userId).update({
        name: user.name,
        title: user.title,
        pfp: user.pfp
      })

      dispatch('fetchUserProfile', { uid: userId })

      // update all posts by user
      const postDocs = await fb.postsCollection.where('userId', '==', userId).get()
      postDocs.forEach(doc => {
        fb.postsCollection.doc(doc.id).update({
          username: user.name
        })
      })
      // update all comments by user
      const commentDocs = await fb.commentsCollection.where('userId', '==', userId).get()
      commentDocs.forEach(doc => {
        fb.commentsCollection.doc(doc.id).update({
          username: user.name
        })
      })
    }
  },
  modules: {
  }
})

export default store
