import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyA7sLwpPrdNh8PE7DFmOYxF4OJ5Z3CABi0",
    authDomain: "twitter-mock-vue.firebaseapp.com",
    databaseURL: "https://twitter-mock-vue.firebaseio.com",
    projectId: "twitter-mock-vue",
    storageBucket: "twitter-mock-vue.appspot.com",
    messagingSenderId: "857647185741",
    appId: "1:857647185741:web:aa0ae021a7bc8166430104",
    measurementId: "G-JSB0FN6S5F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//utils
const db = firebase.firestore();
const auth = firebase.auth();

//collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

//export utilis/refs
export {
    db,
    auth,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}




